import LocalStorage from "../framewrok/LocalStorage";
import GameManager from "./gameManager";
import ChapterInfo from "./data/ChapterData";
import ChapterData from "./data/ChapterData";
import UIViewControl from "../framewrok/UIViewControl";
import MsgCallUtils from "../framewrok/utils/MsgCallUtils";
import UIConfig from "./data/UIConfig";
import GameEvent from "./data/GameEvent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Hall extends cc.Component 
{
    @property(cc.Node)
    scrollContent:cc.Node = null;
    @property(cc.Label)
    chatperText:cc.Label= null;
    @property(cc.Node)
    heroHead:cc.Node= null;
    @property(cc.Prefab)
    itemPrefab:cc.Prefab= null;

    itemBgAltas:cc.SpriteAtlas = null;
    nodeList = [];

    onLoad () 
    {
        let chapterNum = LocalStorage.instance.getItem("chapter_num");
        if(!chapterNum)
        {
            chapterNum = GameManager.instance.chapterNum;
            LocalStorage.instance.setItem("chapter_num",chapterNum);
        }
        let nodeIndex = LocalStorage.instance.getItem("chapter_node_index");
        if(!nodeIndex)
        {
            nodeIndex = GameManager.instance.chapterNodeIndex;
            LocalStorage.instance.setItem("chapter_node_index",nodeIndex);
        }
        this.chatperText.string = "第" + chapterNum + "章";
        this.nodeList = ChapterData.getNodeList(chapterNum);
        this.loadPlist();
      
    }

    loadPlist() {
        let self = this;
        cc.loader.loadRes("plist/ui",cc.SpriteAtlas,function(err,res)
        {
            if(err)
            {
                cc.log("uiPlist load error")
                return;
            }
            self.itemBgAltas = res;
            self.initScrollView();
        });
    }

    initScrollView ()
    {
        for (let index = 0; index < this.nodeList.length; index++) 
        {
            let nodeInfo = this.nodeList[index];
            let nodeItem = cc.instantiate(this.itemPrefab);
            let nodeScript = nodeItem.getComponent("chapterItem");
            nodeScript.setData(nodeInfo,this.itemBgAltas);
            nodeItem.x = nodeInfo.x;
            nodeItem.y = nodeInfo.y;
            if(GameManager.instance.chapterNodeIndex == index + 1){
                this.heroHead.x = nodeItem.x;
                this.heroHead.y = nodeItem.y + 90;
            }
            nodeItem.parent = this.scrollContent;           
        }
    }

    start () 
    {
        
    }

    onPreClick(evt) 
    {
        cc.log("waiting for chapter edit");
    }

    onNextClick(evt) 
    {
        cc.log("waiting for chapter edit");
    }

    onSettingClick(evt) 
    {
        let info = UIConfig.getUIInfo("winUI");
        MsgCallUtils.notifyObserver(GameEvent.SHOW_UIVIEW,info);
    }

}
