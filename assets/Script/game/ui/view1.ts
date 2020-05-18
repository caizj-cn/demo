
import UIViewInfo from "../../framewrok/UIViewInfo";
import GameConst from "../data/GameConst";
import MsgCallUtils from "../../framewrok/utils/MsgCallUtils";
import GameEvent from "../data/GameEvent";
import { UIViewType } from "../../framewrok/UIViewControl";

const {ccclass, property} = cc._decorator;

@ccclass
export default class View1 extends cc.Component {

    @property
    isCache:boolean = false;
    @property({type:cc.Enum(UIViewType)})
    viewTpye:number = UIViewType.none;
    @property
    needTween:boolean = false;
    @property
    needAlphaBg:boolean = false;

    start () {

    }

    onclick()
    {
        var info = new UIViewInfo();
        info.url = GameConst.VIEW2;
        info.name = "view2";
        info.isCache = this.isCache;
        info.viewTpye = this.viewTpye;
        info.needTween = this.needTween;
        info.needAlphaBg = this.needAlphaBg;
        MsgCallUtils.notifyObserver(GameEvent.SHOW_UIVIEW,info);
    }
    // update (dt) {}
}
