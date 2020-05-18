import MsgCallUtils from "../framewrok/utils/MsgCallUtils";
import GameEvent from "./data/GameEvent";
import GameConst from "./data/GameConst";
import UIViewControl from "../framewrok/UIViewControl";
import SoundManager from "../framewrok/SoundManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Login extends cc.Component 
{
    onLoad() 
    {
        SoundManager.instance.setup();
        UIViewControl.instance.setup();
    }

    onStart ()
    {
        //派发切换场景事件
        MsgCallUtils.notifyObserver(GameEvent.SWITCH_SCENE,GameConst.HALL);
    }
}
