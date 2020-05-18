import GameConst from "../data/GameConst";
import MsgCallUtils from "../../framewrok/utils/MsgCallUtils";
import GameEvent from "../data/GameEvent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ChapterItem extends cc.Component {

    @property(cc.Sprite)
    bg:cc.Sprite = null;
    @property(cc.Label)
    indexText:cc.Label = null;
    @property(cc.Node)
    starCon:cc.Node = null;

    bgAtlas:cc.SpriteAtlas = null;

    onLoad() 
    {
        this.node.on(cc.Node.EventType.TOUCH_END,this.touchEndHandler);
    }

    onDestroy() 
    {
        this.node.off(cc.Node.EventType.TOUCH_END,this.touchEndHandler);
    }

    start () 
    {

    }

    setData(info:object,bgAtlas:cc.SpriteAtlas) 
    {
        this.indexText.string = info["index"];
        let spirteName = "gk-guka" + info["bg"];
        this.bg.spriteFrame = bgAtlas.getSpriteFrame(spirteName); 
        let starNum = info["star"];
        this.starCon.removeAllChildren();
        for (let index = 0; index < starNum; index++) {
            let star = new cc.Node();
            let starSprite = star.addComponent(cc.Sprite);
            starSprite.spriteFrame = bgAtlas.getSpriteFrame("gk-start0"); 
            this.starCon.addChild(star);
        } 
    }

    touchEndHandler(evt) 
    {
        //派发切换场景事件
        MsgCallUtils.notifyObserver(GameEvent.SWITCH_SCENE,GameConst.GAME);
    }

    // update (dt) {}
}
