
import MsgCallUtils from "../../framewrok/utils/MsgCallUtils";
import GameEvent from "../data/GameEvent";
import GameConst from "../data/GameConst";
import UIConfig from "../data/UIConfig";

const {ccclass, property} = cc._decorator;

@ccclass
export default class WinUI extends cc.Component {

    @property(cc.Node)
    starCon: cc.Node = null;
    @property(cc.SpriteAtlas)
    uiAtlas:cc.SpriteAtlas = null;

    @property
    starNum:number = 3;

    onLoad() 
    {
        this.showStar();
    }

    showStar() 
    {
        for (let index = 0; index < this.starNum; index++) {
            let star = new cc.Node();
            let starSprite = star.addComponent(cc.Sprite);
            starSprite.spriteFrame = this.uiAtlas.getSpriteFrame("win-star1"); 
            this.starCon.addChild(star);
        } 
    }

    onDestroy() 
    {

    }

    homeClick() 
    {
        MsgCallUtils.notifyObserver(GameEvent.SWITCH_SCENE,GameConst.HALL);
        let info = UIConfig.getUIInfo("winUI");
        MsgCallUtils.notifyObserver(GameEvent.CLOSE_UIVIEW,info.url);
    }

    nextClick() 
    {
        MsgCallUtils.notifyObserver(GameEvent.SWITCH_SCENE,GameConst.HALL);
        let info = UIConfig.getUIInfo("loseUI");
        MsgCallUtils.notifyObserver(GameEvent.SHOW_UIVIEW,info);
    }
}
