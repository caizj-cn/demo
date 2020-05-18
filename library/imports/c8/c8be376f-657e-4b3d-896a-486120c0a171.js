"use strict";
cc._RF.push(module, 'c8be3dvZX5LPYlqSGEgwKFx', 'roleSpine');
// Script/game/role/roleSpine.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var GameConst_1 = require("../data/GameConst");
var MsgCallUtils_1 = require("../../framewrok/utils/MsgCallUtils");
var GameEvent_1 = require("../data/GameEvent");
var gameManager_1 = require("../gameManager");
var GameUtils_1 = require("../../framewrok/utils/GameUtils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RoleSpine = /** @class */ (function (_super) {
    __extends(RoleSpine, _super);
    function RoleSpine() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hpBar = null;
        _this.roleDir = 1;
        _this.roleState = 0;
        _this.action = GameConst_1.RoleAction.idle;
        _this.animations = {}; //解析完的动画数据
        _this.boneDatas = {}; //解析完的动画数据
        _this.skinDatas = {}; //解析完的动画数据
        _this.slotDatas = {}; //解析完的动画数据
        _this.trackIndex = 0; //当前执行的动画
        _this.trackIndex2 = 0; //当前执行的动画
        _this.weaponIndex = 0;
        _this.sendTime = 0;
        _this.rotationLimit = 0;
        _this.rotationLimit1 = 0;
        _this.rotationLimit2 = 0;
        _this.armRotation = 0;
        _this.armPos = null;
        _this.weaponPos = null;
        _this.isInit = false;
        return _this;
    }
    RoleSpine.prototype.onLoad = function () {
        this.sp = this.getComponent(sp.Skeleton);
        //解析动画数据
        for (var key in this.sp["_skeleton"].data.animations) {
            var animation = this.sp["_skeleton"].data.animations[key];
            this.animations[animation.name] = {
                trackIndex: parseInt(key),
                name: animation.name,
                duration: animation.duration
            };
        }
        for (var key in this.sp["_skeleton"].data.bones) {
            var boneData = this.sp["_skeleton"].data.bones[key];
            this.boneDatas[boneData.name] = {
                index: boneData.index,
                x: boneData.x,
                y: boneData.y,
                skinRequired: false
            };
        }
        for (var key in this.sp["_skeleton"].data.skins) {
            var skinData = this.sp["_skeleton"].data.skins[key];
            this.skinDatas[skinData.name] = {
                name: skinData.name,
                bones: [],
                attachments: []
            };
        }
        for (var key in this.sp["_skeleton"].data.slots) {
            var slotsData = this.sp["_skeleton"].data.slots[key];
            this.boneDatas[slotsData.name] = {
                index: slotsData.index,
                name: slotsData.name,
                boneData: null,
            };
        }
        this.scheduleOnce(this.init, 1);
    };
    RoleSpine.prototype.init = function () {
        this.hpBar.scaleX = 1;
        this.roleState = GameConst_1.RoleState.idel;
        this.trackIndex = this.animations["idle"].trackIndex;
        this.arm = this.sp.findBone("root_qiang");
        this.armPos = cc.v2(this.arm.worldX, this.arm.worldY);
        this.armRotation = GameUtils_1.default.standardRotation(this.arm.rotation);
        this.rotationLimit = -65;
        this.rotationLimit1 = GameUtils_1.default.standardRotation(this.rotationLimit - 90);
        this.rotationLimit2 = GameUtils_1.default.standardRotation(this.rotationLimit + 90);
        this.switchSkin();
        this.changeAction(this.action);
        this.sp.setMix('run', 'attack2', 0.1);
        this.sp.setMix('run', 'attack1', 0.1);
        this.sp.setMix('idle', 'attack2', 0.2);
        this.sp.setMix('idle', 'attack1', 0.2);
        this.sp.setStartListener(function (trackEntry) {
            var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            switch (animationName) {
                case "attack1":
                    break;
            }
        }.bind(this));
        this.sp.setCompleteListener(function (trackEntry) {
            var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            switch (animationName) {
                case "attack1":
                case "attack2":
                    this.sp.clearTrack(this.trackIndex2);
                    this.changeAction(GameConst_1.RoleState.idel);
                    break;
            }
        }.bind(this));
        this.isInit = true;
        this.addEvent();
        MsgCallUtils_1.default.notifyObserver(GameEvent_1.default.SPINE_INITED);
    };
    RoleSpine.prototype.addEvent = function () {
        this.node.on("changeState", this.changeState, this);
        this.node.on("changeDir", this.changeDirection, this);
        this.node.on("switchSkin", this.switchSkin, this);
        this.node.on("fight", this.switchSkin, this);
        MsgCallUtils_1.default.addObserver(GameEvent_1.default.TOUCH_MAP, this, this.touchDownHandler);
    };
    RoleSpine.prototype.onDestroy = function () {
        this.node.off("changeState", this.changeState, this);
        this.node.off("changeDir", this.changeDirection, this);
        this.node.off("switchSkin", this.switchSkin, this);
        this.node.off("fight", this.switchSkin, this);
        MsgCallUtils_1.default.removeObserver(GameEvent_1.default.TOUCH_MAP, this, this.touchDownHandler);
    };
    RoleSpine.prototype.changeAction = function (value) {
        if (this.sp.animation == value)
            return;
        switch (value) {
            case GameConst_1.RoleAction.idle: //静止
                this.sp.clearTrack(this.trackIndex);
                this.sp.clearTrack(this.trackIndex2);
                this.trackIndex = this.animations["idle"].trackIndex;
                this.sp.addAnimation(this.trackIndex, "idle", true);
                break;
            case GameConst_1.RoleAction.run: //移动
                this.sp.clearTrack(this.trackIndex);
                this.sp.clearTrack(this.trackIndex2);
                this.trackIndex = this.animations["run"].trackIndex;
                this.sp.addAnimation(this.trackIndex, "run", true);
                break;
            case GameConst_1.RoleAction.jump: //跳跃
                this.action = "jump";
                this.sp.clearTrack(this.trackIndex);
                this.trackIndex = this.animations["jump"].trackIndex;
                this.sp.addAnimation(this.trackIndex, "jump", true);
                break;
            case GameConst_1.RoleAction.attack: //攻击
                this.sp.clearTrack(this.trackIndex2);
                if (this.trackIndex == this.animations["idle"].trackIndex
                    || this.trackIndex == this.animations["jump"].trackIndex) {
                    this.sp.clearTrack(this.trackIndex);
                }
                var weapon = weaponConfig[this.weaponIndex];
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
    };
    RoleSpine.prototype.changeState = function (value) {
        this.roleState = value; //角色状态  0=静止 1=移动 2=跳跃
        switch (value) {
            case 0: //静止
                this.action = "idle";
                this.changeAction(this.action);
                break;
            case 1: //移动
                this.action = "run";
                this.changeAction(this.action);
                break;
            case 2: //跳跃
                this.action = "jump";
                this.changeAction(this.action);
                break;
        }
    };
    RoleSpine.prototype.touchDownHandler = function (msg, obj) {
        var pos = obj;
        var realArmPos = this.node.convertToWorldSpaceAR(this.armPos);
        var rotation = GameUtils_1.default.getRotation(realArmPos, pos);
        if (this.node.scaleX < 0) {
            rotation = rotation - 90 - weaponConfig[this.weaponIndex].rotation;
            rotation = 360 - rotation;
        }
        else {
            rotation = rotation - 90 + weaponConfig[this.weaponIndex].rotation;
        }
        rotation = GameUtils_1.default.standardRotation(rotation);
        if (GameUtils_1.default.limitRotation(rotation, this.rotationLimit1, this.rotationLimit2)) {
            this.arm.rotation = rotation;
            this.armRotation = GameUtils_1.default.standardRotation(this.arm.rotation);
        }
        else {
            this.changeDirection(this.node.scaleX * -1);
        }
    };
    RoleSpine.prototype.changeDirection = function (value) {
        this.node.scaleX = this.roleDir * value;
        this.hpBar.scaleX = this.roleDir * value;
    };
    RoleSpine.prototype.aimPos = function (pos) {
        if (!this.isInit)
            return;
        pos.y += weaponConfig[this.weaponIndex].aimY;
        var p = this.node.convertToWorldSpaceAR(this.armPos);
        var rotation = GameUtils_1.default.getRotation(p, pos);
        if (this.node.scaleX < 0) {
            rotation = rotation - 90 - weaponConfig[this.weaponIndex].rotation;
            rotation = 360 - rotation;
        }
        else {
            rotation = rotation - 90 + weaponConfig[this.weaponIndex].rotation;
        }
        rotation = GameUtils_1.default.standardRotation(rotation);
        if (GameUtils_1.default.limitRotation(rotation, this.rotationLimit1, this.rotationLimit2)) {
            this.arm.rotation = rotation;
            this.armRotation = GameUtils_1.default.standardRotation(this.arm.rotation);
        }
    };
    //切换皮肤 武器
    RoleSpine.prototype.switchSkin = function () {
        this.weaponIndex += 1;
        if (this.weaponIndex > 4)
            this.weaponIndex = 1;
        var weapon = weaponConfig[this.weaponIndex];
        this.sp.setSkin(weapon.name);
        this.weapon = this.sp.findBone("root_weapons" + this.weaponIndex);
        this.weaponPos = cc.v2(this.weapon.worldX, this.weapon.worldY);
        var testPos = this.node.convertToWorldSpaceAR(this.weaponPos);
    };
    RoleSpine.prototype.update = function (dt) {
        if (gameManager_1.default.instance.isOver)
            return;
        if (!this.isInit)
            return;
        this.sendTime += dt;
        if (!gameManager_1.default.instance.touchDown)
            return;
        var weapon = weaponConfig[this.weaponIndex];
        if (this.sendTime > weapon.sendTime) {
            this.sendTime = 0;
            this.changeAction(GameConst_1.RoleState.attack);
            var realArmPos = this.node.convertToWorldSpaceAR(this.armPos);
            var realWeaponPos = this.node.convertToWorldSpaceAR(cc.v2(this.weapon.worldX, this.weapon.worldY));
            var rotation = GameUtils_1.default.getRotation(realArmPos, realWeaponPos);
            // let bulletName = "bullet" + this.weaponIndex;
            if (!this.shootData)
                this.shootData = {};
            this.shootData["prefabName"] = "roleBullte"; //预制体名称
            this.shootData["v"] = cc.v2(realWeaponPos.x - 12, realWeaponPos.y); //位置
            this.shootData["angle"] = rotation; //角度cc.
            this.shootData["group"] = "mybull"; //组
            this.shootData["attack"] = weapon.attack;
            MsgCallUtils_1.default.notifyObserver(GameEvent_1.default.PLAYER_SHOOT, this.shootData);
        }
    };
    __decorate([
        property(cc.Node)
    ], RoleSpine.prototype, "hpBar", void 0);
    RoleSpine = __decorate([
        ccclass
    ], RoleSpine);
    return RoleSpine;
}(cc.Component));
exports.default = RoleSpine;
var weaponConfig = {
    hp: 300000,
    "1": {
        name: "weapons1",
        rotation: 20,
        sendTime: 0.3,
        attackId: 1,
        attack: 10,
        bid: 1,
        aimY: 0
    },
    "2": {
        name: "weapons2",
        rotation: 22,
        sendTime: 0.6,
        attackId: 2,
        attack: 3000,
        bid: 1,
        aimY: 0
    },
    "3": {
        name: "weapons3",
        rotation: 25,
        sendTime: 0.6,
        attackId: 2,
        attack: 120,
        bid: 1,
        aimY: -50
    },
    "4": {
        name: "weapons4",
        rotation: 25,
        sendTime: 0.6,
        attackId: 2,
        attack: 180,
        bid: 1,
        aimY: 0
    } //火箭筒
};

cc._RF.pop();