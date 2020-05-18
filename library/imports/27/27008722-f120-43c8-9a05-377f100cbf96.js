"use strict";
cc._RF.push(module, '27008ci8SBDyJoFN38QDL+W', 'enemyControl');
// Script/game/role/enemyControl.ts

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
var gameManager_1 = require("../gameManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var EnemyControl = /** @class */ (function (_super) {
    __extends(EnemyControl, _super);
    function EnemyControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.moveSpeed = 300;
        _this.sendTime = 0;
        _this.isDeath = false;
        return _this;
    }
    EnemyControl.prototype.onLoad = function () {
        this.body = this.node.getComponent(cc.RigidBody);
        this.mapRect = gameManager_1.default.instance.mapRect;
    };
    EnemyControl.prototype.onDestroy = function () {
    };
    // 只在两个碰撞体开始接触时被调用一次
    EnemyControl.prototype.onBeginContact = function (contact, selfCollider, otherCollider) {
    };
    // 只在两个碰撞体结束接触时被调用一次
    EnemyControl.prototype.onEndContact = function (contact, selfCollider, otherCollider) {
    };
    // 每次将要处理碰撞体接触逻辑时被调用
    EnemyControl.prototype.onPreSolve = function (contact, selfCollider, otherCollider) {
    };
    // 每次处理完碰撞体接触逻辑时被调用
    EnemyControl.prototype.onPostSolve = function (contact, selfCollider, otherCollider) {
    };
    EnemyControl.prototype.update = function (dt) {
        if (gameManager_1.default.instance.isOver)
            return;
        if (this.isDeath)
            return;
        this.sendTime += dt;
        if (this.checkCanShoot()) { //有目标
            if (this.sendTime > 10) {
                this.sendTime = 0;
                this.node.emit("attack");
            }
        }
        else {
            this.roleMove();
        }
    };
    EnemyControl.prototype.checkCanShoot = function () {
        return true;
    };
    EnemyControl.prototype.roleMove = function () {
        var moveSpeed = this.body.linearVelocity;
        moveSpeed.x = -this.moveSpeed;
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
    __decorate([
        property
    ], EnemyControl.prototype, "moveSpeed", void 0);
    EnemyControl = __decorate([
        ccclass
    ], EnemyControl);
    return EnemyControl;
}(cc.Component));
exports.default = EnemyControl;

cc._RF.pop();