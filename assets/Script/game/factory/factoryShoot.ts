import { BulletType } from "../data/GameConst";
import MathUtils from "../../framewrok/utils/MathUtils";
import MsgCallUtils from "../../framewrok/utils/MsgCallUtils";
import GameEvent from "../data/GameEvent";
import GameManager from "../gameManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FactoryShoot extends cc.Component 
{
    @property(cc.Node)
    shootPos: cc.Node = null;

    @property
    scaleX:number = 1;

    angle:number = 0;
    angleDir:number = 0;//0:向下，1：向上

    private shootData:Object;

    onLoad () 
    {
        this.angle =  MathUtils.randomInt(-30,30);
        this.node.angle = this.angle;    
    }

    start () 
    {
        this.schedule(this.updateAngle,0.5);
    }

    updateAngle()
    {
        if(GameManager.instance.isOver)return;
        if(this.angle <= -30)
        {
            this.angleDir = 1;
        }
        else if(this.angle >= 30)
        {
            this.angleDir = 0;
        }
        this.angleDir > 0  ? this.angle += 5 : this.angle -= 5;
        this.node.angle = this.angle;

        if (!this.shootData) this.shootData = {};
        this.shootData["prefabName"] = "bullet1";//预制体名称
        this.shootData["v"] = this.node.convertToWorldSpaceAR(this.shootPos.position); //位置
        this.shootData["angle"] = this.angle;//角度cc.
        this.shootData["group"] = "mybull"; //组
        this.shootData["attack"] = 20;
        this.shootData["scaleX"] = this.scaleX;

        MsgCallUtils.notifyObserver(GameEvent.FACTORY_SHOOT,this.shootData);
    }

    update (dt) 
    {
        

    }
}
