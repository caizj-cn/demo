"use strict";
cc._RF.push(module, '0572ds6fiFDEZZmDwqPVWMr', 'bullet');
// Script/game/effect/bullet.ts

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
var SoundManager_1 = require("../../framewrok/SoundManager");
var SoundConfig_1 = require("../data/SoundConfig");
var GameUtils_1 = require("../../framewrok/utils/GameUtils");
var MsgCallUtils_1 = require("../../framewrok/utils/MsgCallUtils");
var GameEvent_1 = require("../data/GameEvent");
var gameManager_1 = require("../gameManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Bullet = /** @class */ (function (_super) {
    __extends(Bullet, _super);
    function Bullet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.speed = 1000;
        _this.range = 1000;
        _this.state = "";
        _this.idx = 0;
        _this.curRange = 0;
        _this.speedX = 0;
        _this.speedY = 0;
        _this.isInit = false;
        _this.scaleX = 1;
        return _this;
    }
    Bullet.prototype.unuse = function () {
    };
    Bullet.prototype.reuse = function (data) {
        SoundManager_1.default.instance.playEffect(SoundConfig_1.default.qing_xing_qiang_jie2, false);
        this.state = "ready";
        this.idx = 0;
        this.curRange = this.range;
        if (data.group)
            this.node.group = data.group;
        this.scaleX = data.scaleX;
        this.node.angle = this.scaleX == 1 ? data.angle : -data.angle;
        var hd = this.node.angle * Math.PI / 180;
        this.speedX = Math.cos(hd) * this.node.width / 2;
        this.speedY = Math.sin(hd) * this.node.width / 2;
        var scaleFactor = gameManager_1.default.instance.scaleFactor;
        // this.node.x = (data.v.x + this.speedX - GameManager.instance.cameraPos.x) * scaleFactor;
        // this.node.y = (data.v.y + this.speedY - GameManager.instance.cameraPos.y) * scaleFactor;
        this.node.x = (data.v.x + this.speedX);
        this.node.y = (data.v.y + this.speedY);
        this.speedX = Math.cos(hd) * this.speed;
        this.speedY = Math.sin(hd) * this.speed;
        var animation = this.node.getComponent(cc.Animation); //动画组件
        if (!this.isInit) {
            var spriteFrames = GameUtils_1.default.getSpriteFrames(data.bullet_atlas, data.prefabName);
            var readyClip = cc.AnimationClip.createWithSpriteFrames(spriteFrames, 20);
            readyClip.name = 'move';
            readyClip.wrapMode = cc.WrapMode.Loop;
            animation.addClip(readyClip);
            animation.play("move");
            this.isInit = true;
        }
        else {
            animation.playAdditive('move', 0);
        }
        this.state = "move";
        this.init(data);
    };
    Bullet.prototype.init = function (data) {
        var obj = { aniName: "eff1", v: data.v, angle: data.angle };
        MsgCallUtils_1.default.notifyObserver(GameEvent_1.default.FIRE_MC, obj); //开火动画
    };
    Bullet.prototype.end = function () {
        if (this.state == "end")
            return;
        this.state = "end";
        // var curPos = cc.v2(this.node.x, this.node.y);
        // var angle = this.node.angle;
        // let obj = {aniName: "eff2", v: curPos, angle: angle};
        // MsgCallUtils.notifyObserver(GameEvent.FIRE_MC, obj);//开火动画
        MsgCallUtils_1.default.notifyObserver(GameEvent_1.default.END_SHOOT, this.node);
    };
    Bullet.prototype.onDestroy = function () {
    };
    Bullet.prototype.onCollisionEnter = function (other, self) {
        this.end();
    };
    Bullet.prototype.update = function (dt) {
        if (this.state != "move")
            return;
        this.idx++;
        this.curRange -= this.speed * dt;
        if (this.curRange <= 0) {
            this.end();
            return;
        }
        if (this.scaleX == 1) {
            this.node.x += this.speedX * dt;
            this.node.y += this.speedY * dt;
        }
        else if (this.scaleX == -1) {
            this.node.x -= this.speedX * dt;
            this.node.y -= this.speedY * dt;
        }
    };
    __decorate([
        property
    ], Bullet.prototype, "speed", void 0);
    __decorate([
        property
    ], Bullet.prototype, "range", void 0);
    Bullet = __decorate([
        ccclass
    ], Bullet);
    return Bullet;
}(cc.Component));
exports.default = Bullet;

cc._RF.pop();