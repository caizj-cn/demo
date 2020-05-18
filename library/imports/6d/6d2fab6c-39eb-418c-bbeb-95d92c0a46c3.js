"use strict";
cc._RF.push(module, '6d2fatsOetBjLvrldksCkbD', 'roleControl');
// Script/game/role/roleControl.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RoleControl = /** @class */ (function (_super) {
    __extends(RoleControl, _super);
    function RoleControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.moveSpeed = 300;
        _this.jumpSpeed = 500;
        _this.jumpCount = 2; //可连续跳跃次数
        _this.roleState = GameConst_1.RoleState.idel;
        _this.jumping = false;
        _this.isDeath = false;
        return _this;
    }
    RoleControl.prototype.onLoad = function () {
        this.moveDir = GameConst_1.RoleMoveDir.none;
        this.body = this.node.getComponent(cc.RigidBody);
        this.mapRect = gameManager_1.default.instance.mapRect;
        MsgCallUtils_1.default.addObserver(GameEvent_1.default.SPINE_INITED, this, this.spineInited);
    };
    RoleControl.prototype.spineInited = function (msg, obj) {
        //监听键盘事件
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    };
    RoleControl.prototype.onDestroy = function () {
        MsgCallUtils_1.default.removeObserver(GameEvent_1.default.SPINE_INITED, this, this.spineInited);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    };
    // 只在两个碰撞体开始接触时被调用一次
    RoleControl.prototype.onBeginContact = function (contact, selfCollider, otherCollider) {
    };
    // 只在两个碰撞体结束接触时被调用一次
    RoleControl.prototype.onEndContact = function (contact, selfCollider, otherCollider) {
    };
    // 每次将要处理碰撞体接触逻辑时被调用
    RoleControl.prototype.onPreSolve = function (contact, selfCollider, otherCollider) {
    };
    // 每次处理完碰撞体接触逻辑时被调用
    RoleControl.prototype.onPostSolve = function (contact, selfCollider, otherCollider) {
    };
    RoleControl.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.left:
            case cc.macro.KEY.a:
                this.setDir(GameConst_1.RoleMoveDir.left);
                break;
            case cc.macro.KEY.right:
            case cc.macro.KEY.d:
                this.setDir(GameConst_1.RoleMoveDir.right);
                break;
            case cc.macro.KEY.up:
            case cc.macro.KEY.w:
                this.jumping = true;
                break;
            case cc.macro.KEY.enter:
                this.node.emit("switchSkin");
                break;
            case cc.macro.KEY.space:
                this.node.emit("fight");
                break;
        }
    };
    RoleControl.prototype.onKeyUp = function (event) {
        var roleSpeed = this.body.linearVelocity;
        switch (event.keyCode) {
            case cc.macro.KEY.left:
            case cc.macro.KEY.a:
                this.setDir(GameConst_1.RoleMoveDir.none);
                break;
            case cc.macro.KEY.right:
            case cc.macro.KEY.d:
                this.setDir(GameConst_1.RoleMoveDir.none);
                break;
            case cc.macro.KEY.up:
            case cc.macro.KEY.w:
                this.jumping = false;
                break;
            case cc.macro.KEY.enter:
                // this.node.emit("switchSkin");//更改方向
                break;
            case cc.macro.KEY.space:
                // this.node.emit("switchSkin");//更改方向
                break;
        }
    };
    RoleControl.prototype.update = function (dt) {
        if (this.isDeath)
            return;
        if (gameManager_1.default.instance.isOver)
            return;
        var moveSpeed = this.body.linearVelocity;
        moveSpeed.x = this.moveDir * this.moveSpeed;
        if (Math.abs(moveSpeed.y) < 1) {
            this.jumpCount = 2;
        }
        if (this.jumpCount > 0 && this.jumping) {
            moveSpeed.y = this.jumpSpeed;
            this.jumpCount--;
        }
        if (this.jumping) {
            this.setState(GameConst_1.RoleState.jump);
        }
        else {
            if (moveSpeed.x != 0) {
                this.setState(GameConst_1.RoleState.walk);
            }
            else {
                this.setState(GameConst_1.RoleState.idel);
            }
        }
        if (moveSpeed.x != 0) {
            if (moveSpeed.x < 0) {
                if (this.node.x < (this.mapRect.x + 150)) {
                    moveSpeed.x = 0;
                }
            }
            else {
                if (this.node.x > (this.mapRect.x + this.mapRect.width - 150)) {
                    moveSpeed.x = 0;
                }
            }
        }
        this.body.linearVelocity = moveSpeed;
    };
    //设置方向
    RoleControl.prototype.setDir = function (value) {
        if (this.moveDir == value)
            return;
        this.moveDir = value;
        if (this.moveDir != GameConst_1.RoleMoveDir.none)
            this.node.emit("changeDir", this.moveDir); //更改方向
    };
    //设置角色动作
    RoleControl.prototype.setState = function (value) {
        if (this.roleState == value)
            return;
        this.roleState = value;
        this.node.emit("changeState", this.roleState); //更改动作
    };
    __decorate([
        property
    ], RoleControl.prototype, "moveSpeed", void 0);
    __decorate([
        property
    ], RoleControl.prototype, "jumpSpeed", void 0);
    __decorate([
        property
    ], RoleControl.prototype, "jumpCount", void 0);
    RoleControl = __decorate([
        ccclass
    ], RoleControl);
    return RoleControl;
}(cc.Component));
exports.default = RoleControl;

cc._RF.pop();