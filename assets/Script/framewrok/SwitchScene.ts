import MsgCallUtils from "./utils/MsgCallUtils";
import GameEvent from "../game/data/GameEvent";
import GameManager from "../game/gameManager";
import GameConst from "../game/data/GameConst";

const {ccclass, property} = cc._decorator;

//场景切换过渡类

@ccclass
export default class SwitchScene extends cc.Component 
{
    @property(cc.ProgressBar)
    loadingBar: cc.ProgressBar = null;

    @property(cc.Label)
    loadResText: cc.Label = null;

    @property(cc.Label)
    tipsText: cc.Label = null;

    @property(cc.Label)
    progressText:cc.Label = null;


    private curScene:string = "";
    private totalCount:number = 0;
    private completedCount:number = 0;

    onLoad () 
    {
        cc.game.addPersistRootNode(this.node);
        this.node.zIndex = 100;
        this.node.active = false;
        GameManager.instance.curScene = this.curScene = GameConst.LOGIN;
        MsgCallUtils.addObserver(GameEvent.SWITCH_SCENE,this,this.onSwitchScene);
    }

    onDestroy () 
    {
        MsgCallUtils.removeObserver(GameEvent.SWITCH_SCENE,this,this.onSwitchScene);
    }

    onSwitchScene(msg:string,obj:any) :void 
    {
        if(obj == null)return;
        let sceneName = obj as string;
        if(sceneName == GameManager.instance.curScene)return;
        this.node.active = true;
        GameManager.instance.curScene = this.curScene = sceneName;
        cc.director.preloadScene(sceneName,this.onProgress.bind(this),this.onCompleted.bind(this));
        if (this.loadingBar)this.loadingBar.progress = 0;
    }

    //加载完成
    onCompleted () :void 
    {
        cc.director.loadScene(this.curScene, function()
        {
            this.node.active = false;
        }.bind(this));
    }

    //加载场景进度
    onProgress(completedCount, totalCount, item) :void 
    {
        let id = item.id.substring(item.id.lastIndexOf('/') + 1, item.id.lastIndexOf("."));
        this.totalCount = totalCount;
        this.completedCount = completedCount;
        if (this.completedCount > this.totalCount) {
            this.completedCount = this.totalCount;
        }
        var progress = (this.completedCount / this.totalCount);
        if (this.loadingBar)this.loadingBar.progress = progress;
        if (this.progressText)this.progressText.string = Math.ceil(progress * 100) + "%";   
        if (this.loadResText)this.loadResText.string = item.id || "";   
    }

    start () 
    {

    }
}
