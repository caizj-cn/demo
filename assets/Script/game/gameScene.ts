import SoundManager from "../framewrok/SoundManager";
import UIViewControl from "../framewrok/UIViewControl";
import GameManager from "./gameManager";
import UIConfig from "./data/UIConfig";
import GameEvent from "./data/GameEvent";
import MsgCallUtils from "../framewrok/utils/MsgCallUtils";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameScene extends cc.Component 
{
    @property(cc.Node)
    map:cc.Node = null;
    
    onLoad() 
    {
        GameManager.instance.mapRect = this.map.getBoundingBox();
        SoundManager.instance.setup();
        UIViewControl.instance.setup();
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
        GameManager.instance.isOver = false;
    }

    start () 
    {
        // SoundManager.instance.playMusic("/sound/bgm1_1",true);
        // let info = UIConfig.getUIInfo("winUI");
        // MsgCallUtils.notifyObserver(GameEvent.SHOW_UIVIEW,info);
    }

    onDestroy()
    {
        
    }

    // update (dt) {}
}
