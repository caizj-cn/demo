import MsgCallUtils from "../../framewrok/utils/MsgCallUtils";
import GameEvent from "../data/GameEvent";
import GameManager from "../gameManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class mapTouch extends cc.Component {

    @property(cc.Node)
    curCamera:cc.Node = null;

    private touchPos:cc.Vec2 = null;

    onLoad()
    {
        this.touchPos = cc.v2();

        this.node.on(cc.Node.EventType.TOUCH_START,this.touchStart,this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE,this.touchMove,this);
        this.node.on(cc.Node.EventType.TOUCH_END,this.touchEnd,this);
    }

    onDestroy() 
    {
        this.node.off(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.touchMove, this);
        this.node.off(cc.Node.EventType.TOUCH_END,this.touchEnd,this);
    }

    touchStart(event)
    {
        let pos = event.getLocation();
        let realPos = this.node.convertToNodeSpaceAR(pos);
        this.touchPos.x = realPos.x + this.curCamera.x;
        this.touchPos.y = realPos.y + this.curCamera.y;

        GameManager.instance.touchDown = true;
        MsgCallUtils.notifyObserver(GameEvent.TOUCH_MAP,this.touchPos);
    }
    touchMove(event)
    {
        let pos = event.getLocation();
        let realPos = this.node.convertToNodeSpaceAR(pos);
        this.touchPos.x = realPos.x + this.curCamera.x;
        this.touchPos.y = realPos.y + this.curCamera.y;

        GameManager.instance.touchDown = true;
        MsgCallUtils.notifyObserver(GameEvent.TOUCH_MAP,this.touchPos);
    }
    touchEnd(event)
    {
        GameManager.instance.touchDown = false;
    }

}
