import SoundManager from "../../framewrok/SoundManager";
import SoundConfig from "../data/SoundConfig";
import GameUtils from "../../framewrok/utils/GameUtils";
import MsgCallUtils from "../../framewrok/utils/MsgCallUtils";
import GameEvent from "../data/GameEvent";
import GameManager from "../gameManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Fire extends cc.Component 
{
    private speedX:number = 0;
    private speedY:number = 0;

    private aniNames = [];
    private isInit:boolean = false;

    onLoad() 
    {
    }
    //回收
    unuse() 
    {
    }
    //重用
    reuse(data) 
    {
        if (!this.isInit) {
            this.isInit = true;
            this.aniNames = [];
        }
        this.node.angle = data.angle;
        let hd = this.node.angle * Math.PI / 180;
        this.speedX = Math.cos(hd) * this.node.width / 2;
        this.speedY = Math.sin(hd) * this.node.width / 2;
        this.node.x = data.v.x + this.speedX;
        this.node.y = data.v.y + this.speedY;
        let animation = this.node.getComponent(cc.Animation);//动画组件
        if (this.aniNames.indexOf(data.aniName) < 0) 
        {
            let spriteFrames = GameUtils.getSpriteFrames(data.bullet_atlas, data.aniName);
            let clip = cc.AnimationClip.createWithSpriteFrames(spriteFrames, 40);
            this.aniNames.push(data.aniName);
            clip.name = data.aniName;
            clip.wrapMode = cc.WrapMode.Normal;
            animation.addClip(clip);
        }
        animation.playAdditive(data.aniName, 0);
        animation.once("finished", function () 
        {
            MsgCallUtils.notifyObserver(GameEvent.END_FIRE,this.node);
        }.bind(this));
    }
    
 
}
