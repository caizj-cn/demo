import SimpleDictionary from "./utils/SimpleDictionary";
import MsgCallUtils from "./utils/MsgCallUtils";
import GameEvent from "../game/data/GameEvent";
import UIViewInfo from "./UIViewInfo";
import ArrayUtil from "./utils/ArrayUtil";

//定义UIView视图数据格式
export enum UIViewType {
    none  = 0,
    main  = 1,
    popup = 2
}

export default class UIViewControl
{
    private static _instance:UIViewControl;
    
    private loadingDic:SimpleDictionary;//UIView加载数据字典
    private openViewDic:SimpleDictionary;//已经打开的UIView
    private closeCacheViewDic:SimpleDictionary;//已经关闭但缓存了的UIView
    
    private alphaBack:cc.Node = null;//通用遮罩背景
    public hasSetup:boolean = false;
    public baseZIndex:number = 10;//设置默认zInde

    public static get instance():UIViewControl
    {
        if(this._instance == null)
        {
            this._instance = new UIViewControl();
        }
        return this._instance;
    }

    public setup():void
    {
        this.loadingDic = new SimpleDictionary();
        this.openViewDic = new SimpleDictionary(); 
        this.closeCacheViewDic = new SimpleDictionary(); 
        MsgCallUtils.addObserver(GameEvent.SHOW_UIVIEW,this,this.showUIView);
        MsgCallUtils.addObserver(GameEvent.CLOSE_UIVIEW,this,this.closeUIView);
        this.hasSetup   = true;
    }

    showViewTween(node, isPopup, callBack) {
        if (node == null) {
            return
        }
        if (isPopup == true) {
            node.opacity = 0;
            node.setScale(0.1);
            let fadeIn = cc.fadeIn(0.2);
            let scaleTo = cc.scaleTo(0.2, 1);
            cc.tween(node).
            then(fadeIn).
            then(scaleTo).
            call(function () {
                if (callBack) callBack();
            }.bind(node)).start();
        }
        else {
            node.opacity = 1;
            node.setScale(1);
            let fadeOut = cc.fadeOut(0.2);
            let scaleTo = cc.scaleTo(0.2, 0.1);
            cc.tween(node).
            then(fadeOut).
            then(scaleTo).
            call(function () {
                if (callBack) callBack();
            }.bind(node)).start();
        }
    }

    //调用界面关闭
    private closeUIView(msg:string,obj:any):void
    {
        if(!this.hasSetup)
        {
            cc.log("UIViewControl has not setup")
            return;
        }
        let url  = obj as string;
        let uiInfo = this.openViewDic.getItem(url);
        if(uiInfo == null)return;
        this.openViewDic.deleteItem(uiInfo.url);
        this.showViewTween(uiInfo.view,false,function()
        {
            if(uiInfo.isCache)
            {
                this.closeCacheViewDic.addItem(uiInfo.url,uiInfo);
                uiInfo.view.parent = null;
                if(uiInfo.alphaBackNode)uiInfo.alphaBackNode.parent = null;
            }
            else
            {
                uiInfo.dispose();
            }
        }.bind(this));
        this.refreshViewIndex();
    }

    //外部派发事件，传递对应UIView参数即可打开界面
    private showUIView(msg:string,obj:any):void
    {
        if(!this.hasSetup)
        {
            cc.log("UIViewControl has not setup")
            return;
        }
        let uiInfo = obj as UIViewInfo;
        if(uiInfo == null)return;
        let canvas = cc.director.getScene().getChildByName('Canvas');
        if(this.openViewDic.getItem(uiInfo.url))//已经打开了，则重新设置zIndex
        {
            uiInfo = this.openViewDic.getItem(uiInfo.url)
            uiInfo.zIndex = this.getViewIndex();
            this.refreshViewIndex();
        }
        else
        {
            if(this.closeCacheViewDic.getItem(uiInfo.url))//处于缓存关闭状态，移除缓存，添加到打开列表
            {
                uiInfo = this.closeCacheViewDic.getItem(uiInfo.url)
                this.closeCacheViewDic.deleteItem(uiInfo.url);
                this.openViewDic.addItem(uiInfo.url,uiInfo);         
                this.resetView(uiInfo);
            }
            else//请求加载
            {
                this.loadUIView(uiInfo,function(viewNode)
                {
                    if(!viewNode)
                    {
                        cc.log("prefab load error");
                        return;
                    }
                    //加载完成
                    this.loadingDic.deleteItem(uiInfo.url);
                    this.openViewDic.addItem(uiInfo.url,uiInfo);
                    //添加到舞台
                    uiInfo.view = viewNode;
                    uiInfo.zIndex = this.getViewIndex();
                    this.resetView(uiInfo);
                    
                }.bind(this));
            }
        }
        
    }

    private resetView(uiInfo):void
    {
        uiInfo.zIndex = this.getViewIndex();
        let canvas = cc.director.getScene().getChildByName('Canvas');
        if(uiInfo.needAlphaBg && uiInfo.alphaBackNode)uiInfo.alphaBackNode.parent = canvas;
        uiInfo.view.parent = canvas;
        if(uiInfo.needTween)
        {
            this.showViewTween(uiInfo.view, true, function() 
            {
                this.refreshViewIndex();
            }.bind(this));  
        }
    }

    //加载UI视图，loadPrefab
    private loadUIView(uiInfo,callBack):void
    {
        let canvas = cc.director.getScene().getChildByName('Canvas');
        if(this.loadingDic[uiInfo.url])//已经处于加载中了
        {
            // canvas.once(uiInfo.url, function (node) 
            // {
            //     callBack(node);
            // });
            // return;
        }
        else
        {
            this.loadingDic.addItem(uiInfo.url,uiInfo);
        }
        cc.loader.loadRes(uiInfo.url, cc.Prefab, function (err, prefab) 
        {
            if (!err) 
            {
                this.loadingDic.deleteItem(uiInfo.url);
                let node = cc.instantiate(prefab);
                node.group = "ui";
                callBack(node);
            }
            else
            {
                callBack(null);
            }
        }.bind(this));
    }

    private getViewIndex():number
    {
        let result:number = 0;
        for (const key in this.openViewDic) {
            let info = this.openViewDic.getItem(key);
            if(!info)continue;
            if(info.needAlphaBg && info.alphaBackNode)
            {
                result += 2;
            }
            else
            {
                result += 1;
            }
        }
        return result;
    }

    public refreshViewIndex():void
    {
        let openAry = this.openViewDic.getValues();
        openAry.sort(ArrayUtil.sortOn("zIndex"));
        let zIndex:number = -1;  
        for (let index = 0; index < openAry.length; index++)
        {
            let info = openAry[index];
            let node = info.view;
            if(info.needAlphaBg && info.alphaBackNode)
            {
                zIndex += 2;
                info.alphaBackNode.zIndex = zIndex - 1;
                node.zIndex = zIndex;
            }
            else
            {
                zIndex += 1;
                node.zIndex = zIndex;
            }
        }
    }

    public dispose()
    {
        this.hasSetup  = false;
        this.loadingDic.clear();
        this.openViewDic.clear();
        this.closeCacheViewDic.clear();
        MsgCallUtils.removeObserver(GameEvent.SHOW_UIVIEW,this,this.showUIView);
        MsgCallUtils.removeObserver(GameEvent.CLOSE_UIVIEW,this,this.closeUIView);
    }
}
