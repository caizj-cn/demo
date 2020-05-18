
import UIViewInfo from "../../framewrok/UIViewInfo";
import GameConst from "../data/GameConst";
import MsgCallUtils from "../../framewrok/utils/MsgCallUtils";
import GameEvent from "../data/GameEvent";
import { UIViewType } from "../../framewrok/UIViewControl";

const {ccclass, property} = cc._decorator;

@ccclass
export default class View2 extends cc.Component {

    @property
    isCache:boolean = false;
    @property({type:cc.Enum(UIViewType)})
    viewTpye:number = UIViewType.none;
    @property
    needTween:boolean = false;
    @property
    needAlphaBg:boolean = false;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    onclick()
    {
        MsgCallUtils.notifyObserver(GameEvent.CLOSE_UIVIEW,GameConst.VIEW1);
    }
    // update (dt) {}
}
