import SoundManager from "../../framewrok/SoundManager";
import SoundConfig from "../data/SoundConfig";
import GameUtils from "../../framewrok/utils/GameUtils";
import MsgCallUtils from "../../framewrok/utils/MsgCallUtils";
import GameEvent from "../data/GameEvent";
import GameManager from "../gameManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RoleBullet extends cc.Component 
{
    @property
    speed:number = 1000;

    @property
    range:number = 1000;

    private state:string = "";
    private idx:number = 0;
    private curRange:number = 0;
    private speedX:number = 0;
    private speedY:number = 0;

    private isInit:boolean = false;

    private scaleX:number = 1;

    unuse() 
    {
        
    }
    reuse(data) 
    {
        SoundManager.instance.playEffect(SoundConfig.qing_xing_qiang_jie2,false);
        this.state = "ready";
        this.idx = 0;
        this.curRange = this.range;
        if (data.group) this.node.group = data.group;
        this.scaleX = data.scaleX;
        this.node.angle = data.angle;
        
        let hd = this.node.angle * Math.PI / 180;
        this.speedX = Math.cos(hd) * this.node.width / 2;
        this.speedY = Math.sin(hd) * this.node.width / 2;
        // let scaleFactor = GameManager.instance.scaleFactor;
        // this.node.x = (data.v.x + this.speedX - GameManager.instance.cameraPos.x) * scaleFactor;
        // this.node.y = (data.v.y + this.speedY - GameManager.instance.cameraPos.y) * scaleFactor;
        this.node.x = (data.v.x + this.speedX);
        this.node.y = (data.v.y + this.speedY);
        this.speedX = Math.cos(hd) * this.speed;
        this.speedY = Math.sin(hd) * this.speed;

        let animation = this.node.getComponent(cc.Animation);//动画组件
        if (!this.isInit) 
        {
            let spriteFrames = GameUtils.getSpriteFrames(data.bullet_atlas, data.prefabName);
            let readyClip = cc.AnimationClip.createWithSpriteFrames(spriteFrames, 20);
            readyClip.name = 'move';
            readyClip.wrapMode = cc.WrapMode.Loop;
            animation.addClip(readyClip);
            animation.play("move");
            this.isInit = true;
        }
        else 
        {
            animation.playAdditive('move', 0);
        }
        this.state = "move";
        this.init(data);
    }

    init(data)
    {
        let obj = {aniName: "eff1", v: data.v, angle: data.angle};
        MsgCallUtils.notifyObserver(GameEvent.FIRE_MC, obj);//开火动画
    }

    end() 
    {
        if (this.state == "end") return;
        this.state = "end";
        // var curPos = cc.v2(this.node.x, this.node.y);
        // var angle = this.node.angle;
        // let obj = {aniName: "eff2", v: curPos, angle: angle};
        // MsgCallUtils.notifyObserver(GameEvent.FIRE_MC, obj);//开火动画
        MsgCallUtils.notifyObserver(GameEvent.PLAYER_END_SHOOT,this.node);
    }
    onDestroy() 
    {
    }
    onCollisionEnter(other, self) 
    {
        this.end();
    }
    update(dt)
    {
        if (this.state != "move")return;
        this.idx++;
        this.curRange -= this.speed * dt;
        if (this.curRange <= 0) {
            this.end();
            return;
        }
        this.node.x += this.speedX * dt;
        this.node.y += this.speedY * dt;
        
    }
 
}
