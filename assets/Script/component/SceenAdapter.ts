import MsgCallUtils from "../framewrok/utils/MsgCallUtils";
import GameEvent from "../game/data/GameEvent";
import GameManager from "../game/gameManager";

const {ccclass, property} = cc._decorator;

//屏幕分辨率适配
@ccclass
export default class SceenAdapter extends cc.Component
{
    onLoad()
    {
        cc.view.setResizeCallback(() => {
            this.onResize();
        });
        this.adapter();
    }

    onResize()
    {
        MsgCallUtils.notifyObserver(GameEvent.VIEW_RESIZE);
        this.adapter();
    }

    adapter()
    {
        cc.view.getFrameSize
       // 实际屏幕比例
       let screenRatio = cc.view.getCanvasSize().width / cc.view.getCanvasSize().height;
       // 设计比例
       let designRatio = cc.Canvas.instance.designResolution.width / cc.Canvas.instance.designResolution.height;
       // 判断实际屏幕宽高比
       if (screenRatio <= 1) {
           // 此时屏幕高度大于宽度
           if (screenRatio <= designRatio) {
               this.setFitWidth();
           } else {
               // 此时实际屏幕比例大于设计比例
               // 为了保证纵向的游戏内容不受影响，应使用 fitHeight 模式
               this.setFitHeight();
           }
       } else {
           // 此时屏幕高度小于宽度
           this.setFitHeight();
       }
    }

    setFitHeight()
    {
        cc.Canvas.instance.fitHeight = true;
        cc.Canvas.instance.fitWidth = false;
        GameManager.instance.scaleFactor = cc.view.getCanvasSize().height / cc.Canvas.instance.designResolution.height;

    }

    setFitWidth()
    {
        cc.Canvas.instance.fitHeight = false;
        cc.Canvas.instance.fitWidth = true;
        GameManager.instance.scaleFactor = cc.view.getCanvasSize().width / cc.Canvas.instance.designResolution.width;
    }
}
