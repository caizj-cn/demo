"use strict";
cc._RF.push(module, 'd6da3EFSNtN+55R7q1oFpbx', 'fire');
// Script/game/effect/fire.ts

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
var GameUtils_1 = require("../../framewrok/utils/GameUtils");
var MsgCallUtils_1 = require("../../framewrok/utils/MsgCallUtils");
var GameEvent_1 = require("../data/GameEvent");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Fire = /** @class */ (function (_super) {
    __extends(Fire, _super);
    function Fire() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.speedX = 0;
        _this.speedY = 0;
        _this.aniNames = [];
        _this.isInit = false;
        return _this;
    }
    Fire.prototype.onLoad = function () {
    };
    //回收
    Fire.prototype.unuse = function () {
    };
    //重用
    Fire.prototype.reuse = function (data) {
        if (!this.isInit) {
            this.isInit = true;
            this.aniNames = [];
        }
        this.node.angle = data.angle;
        var hd = this.node.angle * Math.PI / 180;
        this.speedX = Math.cos(hd) * this.node.width / 2;
        this.speedY = Math.sin(hd) * this.node.width / 2;
        this.node.x = data.v.x + this.speedX;
        this.node.y = data.v.y + this.speedY;
        var animation = this.node.getComponent(cc.Animation); //动画组件
        if (this.aniNames.indexOf(data.aniName) < 0) {
            var spriteFrames = GameUtils_1.default.getSpriteFrames(data.bullet_atlas, data.aniName);
            var clip = cc.AnimationClip.createWithSpriteFrames(spriteFrames, 40);
            this.aniNames.push(data.aniName);
            clip.name = data.aniName;
            clip.wrapMode = cc.WrapMode.Normal;
            animation.addClip(clip);
        }
        animation.playAdditive(data.aniName, 0);
        animation.once("finished", function () {
            MsgCallUtils_1.default.notifyObserver(GameEvent_1.default.END_FIRE, this.node);
        }.bind(this));
    };
    Fire = __decorate([
        ccclass
    ], Fire);
    return Fire;
}(cc.Component));
exports.default = Fire;

cc._RF.pop();