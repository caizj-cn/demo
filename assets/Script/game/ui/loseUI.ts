import GameConst from "../data/GameConst";
import GameEvent from "../data/GameEvent";
import MsgCallUtils from "../../framewrok/utils/MsgCallUtils";
import UIConfig from "../data/UIConfig";


const {ccclass, property} = cc._decorator;

@ccclass
export default class LoseUI extends cc.Component {

    homeClick()
    {
        MsgCallUtils.notifyObserver(GameEvent.SWITCH_SCENE,GameConst.HALL);
        let info = UIConfig.getUIInfo("loseUI");
        MsgCallUtils.notifyObserver(GameEvent.CLOSE_UIVIEW,info.url);
    }

    restartClick()
    {
        MsgCallUtils.notifyObserver(GameEvent.SWITCH_SCENE,GameConst.GAME);
        let info = UIConfig.getUIInfo("loseUI");
        MsgCallUtils.notifyObserver(GameEvent.CLOSE_UIVIEW,info.url);
    }
  
}
