import { RoleState ,RoleAction} from "../data/GameConst";
import MsgCallUtils from "../../framewrok/utils/MsgCallUtils";
import GameEvent from "../data/GameEvent";
import GameManager from "../gameManager";
import GameUtils from "../../framewrok/utils/GameUtils";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RoleSpine extends cc.Component {

    @property(cc.Node)
    hpBar:cc.Node = null;

    private sp:sp.Skeleton;

    private roleDir:number = 1;
    private roleState:number = 0;
    private action:string = RoleAction.idle;

    private animations = {};//解析完的动画数据
    private boneDatas = {};//解析完的动画数据
    private skinDatas = {}; //解析完的动画数据
    private slotDatas = {};//解析完的动画数据

    private trackIndex:number = 0;//当前执行的动画
    private trackIndex2:number = 0;//当前执行的动画
    private weaponIndex:number = 0;

    private sendTime:number = 0;
    private rotationLimit:number = 0;
    private rotationLimit1:number = 0;
    private rotationLimit2:number = 0;

    private armRotation:number = 0;
    private arm:any;
    private armPos:cc.Vec2 = null;
    private weapon:any;
    private weaponPos:cc.Vec2 = null;

    private shootData:Object;
    private isInit:boolean = false;

    onLoad () 
    {
        this.sp = this.getComponent(sp.Skeleton);
        
        //解析动画数据
        for (let key in this.sp["_skeleton"].data.animations) 
        {
            let animation = this.sp["_skeleton"].data.animations[key];
            this.animations[animation.name] = {
                trackIndex : parseInt(key),
                name       : animation.name,
                duration   : animation.duration
            };
        }

        for (let key in this.sp["_skeleton"].data.bones) 
        {
            let boneData = this.sp["_skeleton"].data.bones[key];
            this.boneDatas[boneData.name] = {
                index        : boneData.index,
                x            : boneData.x,
                y            : boneData.y,
                skinRequired : false
            };
        }

        for (let key in this.sp["_skeleton"].data.skins) 
        {
            let skinData = this.sp["_skeleton"].data.skins[key];
            this.skinDatas[skinData.name] = {
                name         : skinData.name,
                bones        : [],
                attachments  : []
            };
        }

        for (let key in this.sp["_skeleton"].data.slots) 
        {
            let slotsData = this.sp["_skeleton"].data.slots[key];
            this.boneDatas[slotsData.name] = {
                index        : slotsData.index,
                name         : slotsData.name,
                boneData     : null, //对应boneData
            };
        }
        
        
        this.scheduleOnce(this.init,1);
    }

    init()
    {
        this.hpBar.scaleX = 1;
        this.roleState = RoleState.idel;
        this.trackIndex = this.animations["idle"].trackIndex;

        this.arm = this.sp.findBone("root_qiang");
        this.armPos = cc.v2(this.arm.worldX, this.arm.worldY);
        this.armRotation = GameUtils.standardRotation(this.arm.rotation);

        this.rotationLimit = -65;
        this.rotationLimit1 = GameUtils.standardRotation(this.rotationLimit - 90);
        this.rotationLimit2 = GameUtils.standardRotation(this.rotationLimit + 90);

        this.switchSkin();
        this.changeAction(this.action);

        this.sp.setMix('run', 'attack2', 0.1);
        this.sp.setMix('run', 'attack1', 0.1);
        this.sp.setMix('idle', 'attack2', 0.2);
        this.sp.setMix('idle', 'attack1', 0.2);
    
        this.sp.setStartListener(function (trackEntry) 
        {
            let animationName = trackEntry.animation ? trackEntry.animation.name : "";
            switch (animationName) {
                case "attack1":
                    break;
            }
        }.bind(this));
        this.sp.setCompleteListener(function (trackEntry) 
        {
            let animationName = trackEntry.animation ? trackEntry.animation.name : "";
            switch (animationName) {
                case "attack1":
                case "attack2":
                    this.sp.clearTrack(this.trackIndex2);
                    this.changeAction(RoleState.idel);
                    break;
            }
        }.bind(this));
        this.isInit = true;

        this.addEvent();
        MsgCallUtils.notifyObserver(GameEvent.SPINE_INITED);

    }

    addEvent()
    {
        this.node.on("changeState",this.changeState,this);
        this.node.on("changeDir",this.changeDirection,this);
        this.node.on("switchSkin", this.switchSkin, this);
        this.node.on("fight", this.switchSkin, this);
        MsgCallUtils.addObserver(GameEvent.TOUCH_MAP,this,this.touchDownHandler);
    }

    onDestroy()
    {
        this.node.off("changeState",this.changeState,this);
        this.node.off("changeDir",this.changeDirection,this);
        this.node.off("switchSkin", this.switchSkin, this);
        this.node.off("fight", this.switchSkin, this);
        MsgCallUtils.removeObserver(GameEvent.TOUCH_MAP,this,this.touchDownHandler);
    }

    changeAction(value)
    {
        if(this.sp.animation == value)return;
        switch (value) 
        {
            case RoleAction.idle: //静止
                this.sp.clearTrack(this.trackIndex);
                this.sp.clearTrack(this.trackIndex2);
                this.trackIndex = this.animations["idle"].trackIndex;
                this.sp.addAnimation(this.trackIndex, "idle", true);
                break;
            case RoleAction.run://移动
                this.sp.clearTrack(this.trackIndex);
                this.sp.clearTrack(this.trackIndex2);
                this.trackIndex = this.animations["run"].trackIndex;
                this.sp.addAnimation(this.trackIndex, "run", true);
                break;
            case RoleAction.jump://跳跃
                this.action = "jump";
                this.sp.clearTrack(this.trackIndex);
                this.trackIndex = this.animations["jump"].trackIndex;
                this.sp.addAnimation(this.trackIndex, "jump", true);
                break;
            case RoleAction.attack: //攻击
                this.sp.clearTrack(this.trackIndex2);
                if (this.trackIndex == this.animations["idle"].trackIndex 
                    || this.trackIndex == this.animations["jump"].trackIndex) 
                {
                    this.sp.clearTrack(this.trackIndex);
                }
                let weapon = weaponConfig[this.weaponIndex];
                if (weapon.attackId == 1) {
                    this.trackIndex2 = this.animations["attack1"].trackIndex;
                    this.sp.addAnimation(this.trackIndex2, "attack1", false);
                }
                else if (weapon.attackId == 2) {
                    this.trackIndex2 = this.animations["attack2"].trackIndex;
                    this.sp.addAnimation(this.trackIndex2, "attack2", false);
                }
                break;
        }
    }

    changeState (value) 
    {
        this.roleState = value;//角色状态  0=静止 1=移动 2=跳跃
        switch (value) 
        {
            case 0: //静止
                this.action = "idle";
                this.changeAction(this.action);
                break;
            case 1://移动
                this.action = "run";
                this.changeAction(this.action);
                break;
            case 2: //跳跃
                this.action = "jump";
                this.changeAction(this.action);
                break;
        }
    }

    touchDownHandler(msg:string,obj:object)
    {
        let pos = obj as cc.Vec2;
        let realArmPos = this.node.convertToWorldSpaceAR(this.armPos);
        let rotation = GameUtils.getRotation(realArmPos,pos);

        if (this.node.scaleX < 0) 
        {
            rotation = rotation - 90 - weaponConfig[this.weaponIndex].rotation;
            rotation = 360 - rotation;
        }
        else {
            rotation = rotation - 90 + weaponConfig[this.weaponIndex].rotation;
        }
        rotation = GameUtils.standardRotation(rotation);
        if (GameUtils.limitRotation(rotation, this.rotationLimit1, this.rotationLimit2)) 
        {
            this.arm.rotation = rotation;
            this.armRotation = GameUtils.standardRotation(this.arm.rotation);
        }
        else 
        {
            this.changeDirection(this.node.scaleX * -1)
        }
    }

    changeDirection(value) 
    {
        this.node.scaleX = this.roleDir * value;
        this.hpBar.scaleX = this.roleDir * value;
    }

    aimPos(pos) 
    {
        if(!this.isInit)return;
        pos.y += weaponConfig[this.weaponIndex].aimY;
        let p = this.node.convertToWorldSpaceAR(this.armPos);
        let rotation = GameUtils.getRotation(p, pos);
        if (this.node.scaleX < 0) 
        {
            rotation = rotation - 90 - weaponConfig[this.weaponIndex].rotation;
            rotation = 360 - rotation
        }
        else {
            rotation = rotation - 90 + weaponConfig[this.weaponIndex].rotation;
        }
        rotation = GameUtils.standardRotation(rotation);
        if (GameUtils.limitRotation(rotation, this.rotationLimit1, this.rotationLimit2))
         {
            this.arm.rotation = rotation;
            this.armRotation = GameUtils.standardRotation(this.arm.rotation);
        }
    }

    //切换皮肤 武器
    switchSkin() 
    {
        this.weaponIndex += 1;
        if (this.weaponIndex > 4) this.weaponIndex = 1;
        let weapon = weaponConfig[this.weaponIndex];
        this.sp.setSkin(weapon.name);
        this.weapon = this.sp.findBone("root_weapons" + this.weaponIndex);
        this.weaponPos = cc.v2(this.weapon.worldX, this.weapon.worldY);
        let testPos = this.node.convertToWorldSpaceAR(this.weaponPos);
    }

    update (dt) 
    {
        if(GameManager.instance.isOver) return;
        if(!this.isInit)return;
        this.sendTime += dt;
        if(!GameManager.instance.touchDown)return;
        let weapon = weaponConfig[this.weaponIndex];
        if(this.sendTime > weapon.sendTime)
        {
            this.sendTime = 0;
            this.changeAction(RoleState.attack);
            let realArmPos = this.node.convertToWorldSpaceAR(this.armPos);

            let realWeaponPos = this.node.convertToWorldSpaceAR(cc.v2(this.weapon.worldX, this.weapon.worldY));
            let rotation = GameUtils.getRotation(realArmPos, realWeaponPos);
            // let bulletName = "bullet" + this.weaponIndex;
            if (!this.shootData) this.shootData = {};
            this.shootData["prefabName"] = "roleBullte";//预制体名称
            this.shootData["v"] = cc.v2(realWeaponPos.x - 12,realWeaponPos.y); //位置
            this.shootData["angle"] = rotation;//角度cc.
            this.shootData["group"] = "mybull"; //组
            this.shootData["attack"] = weapon.attack;
            MsgCallUtils.notifyObserver(GameEvent.PLAYER_SHOOT,this.shootData);
        }
    }
}

var weaponConfig = {
    hp: 300000, //初始血量
    "1": {
        name: "weapons1", //武器皮肤名称
        rotation: 20,
        sendTime: 0.3,//子弹发射时间
        attackId: 1,//攻击动作id
        attack: 10,//攻击力
        bid: 1,
        aimY: 0
    },//手枪
    "2": {
        name: "weapons2",
        rotation: 22,
        sendTime: 0.6,
        attackId: 2,
        attack: 3000,
        bid: 1,
        aimY: 0
    },//来福枪
    "3": {
        name: "weapons3",
        rotation: 25,
        sendTime: 0.6,
        attackId: 2,
        attack: 120, //
        bid: 1,
        aimY: -50
    },//闪电枪
    "4": {
        name: "weapons4",
        rotation: 25,
        sendTime: 0.6, //子弹发射时间
        attackId: 2,   //攻击动作id
        attack: 180,  //攻击力
        bid: 1,       //子弹id
        aimY: 0
    }//火箭筒
}

