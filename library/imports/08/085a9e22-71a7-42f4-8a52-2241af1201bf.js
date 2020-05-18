"use strict";
cc._RF.push(module, '085a94icadC9IpSIkGvEgG/', 'effectLayer');
// Script/game/effect/effectLayer.ts

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
var MsgCallUtils_1 = require("../../framewrok/utils/MsgCallUtils");
var GameEvent_1 = require("../data/GameEvent");
var bullet_1 = require("./bullet");
var fire_1 = require("./fire");
var roleBullet_1 = require("./roleBullet");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var EffectLayer = /** @class */ (function (_super) {
    __extends(EffectLayer, _super);
    function EffectLayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bulletPrefab = null; //工厂子弹类型
        _this.roleBulletPrefab = null; //玩家子弹类型
        _this.roleBullets = [];
        _this.firePrefab = null;
        _this.bullet_atlas = null;
        _this.bulletPool = null;
        _this.bulletInitCount = 10;
        _this.firePool = null;
        _this.fireInitCount = 1;
        _this.roleBulletPool = null;
        _this.roleBulletInitCount = 10;
        return _this;
    }
    EffectLayer.prototype.onLoad = function () {
        this.bulletPool = new cc.NodePool(bullet_1.default);
        for (var index = 0; index < this.bulletInitCount; index++) {
            var bullet = cc.instantiate(this.bulletPrefab);
            this.bulletPool.put(bullet);
        }
        this.roleBulletPool = new cc.NodePool(roleBullet_1.default);
        for (var index = 0; index < this.roleBulletInitCount; index++) {
            var roleBullet = cc.instantiate(this.roleBulletPrefab);
            this.roleBulletPool.put(roleBullet);
        }
        this.firePool = new cc.NodePool(fire_1.default);
        for (var index = 0; index < this.fireInitCount; index++) {
            var fire = cc.instantiate(this.firePrefab);
            this.firePool.put(fire);
        }
        MsgCallUtils_1.default.addObserver(GameEvent_1.default.PLAYER_SHOOT, this, this.createRoleBullet);
        MsgCallUtils_1.default.addObserver(GameEvent_1.default.PLAYER_END_SHOOT, this, this.onHeroBulletDestory);
        MsgCallUtils_1.default.addObserver(GameEvent_1.default.FIRE_MC, this, this.onBulletFire);
        MsgCallUtils_1.default.addObserver(GameEvent_1.default.END_FIRE, this, this.onFireDestory);
        MsgCallUtils_1.default.addObserver(GameEvent_1.default.FACTORY_SHOOT, this, this.createBullet);
        MsgCallUtils_1.default.addObserver(GameEvent_1.default.END_SHOOT, this, this.onBulletDestory);
    };
    EffectLayer.prototype.createRoleBullet = function (msg, obj) {
        var shootData = obj;
        var roleBullet = null;
        shootData["bullet_atlas"] = this.bullet_atlas;
        if (this.roleBulletPool.size() > 0) {
            roleBullet = this.roleBulletPool.get(shootData);
        }
        else { // 如果没有空闲对象，就用 cc.instantiate 重新创建,这里未调用reuse方法
            roleBullet = cc.instantiate(this.roleBulletPrefab);
            //可以用下面方式调用reuse方法
            var bulletComponent = roleBullet.getComponent(roleBullet_1.default);
            bulletComponent.reuse(shootData);
        }
        roleBullet.parent = this.node;
    };
    EffectLayer.prototype.createBullet = function (msg, obj) {
        var shootData = obj;
        var bullet = null;
        shootData["bullet_atlas"] = this.bullet_atlas;
        if (this.bulletPool.size() > 0) {
            bullet = this.bulletPool.get(shootData);
        }
        else { // 如果没有空闲对象，就用 cc.instantiate 重新创建,这里未调用reuse方法
            bullet = cc.instantiate(this.bulletPrefab);
            //可以用下面方式调用reuse方法
            var bulletComponent = bullet.getComponent(bullet_1.default);
            bulletComponent.reuse(shootData);
        }
        bullet.parent = this.node;
    };
    EffectLayer.prototype.onBulletFire = function (msg, obj) {
        var shootData = obj;
        var fire = null;
        shootData["bullet_atlas"] = this.bullet_atlas;
        if (this.firePool.size() > 0) {
            fire = this.firePool.get(shootData);
        }
        else { // 如果没有空闲对象，就用 cc.instantiate 重新创建,这里未调用reuse方法
            fire = cc.instantiate(this.firePrefab);
            //可以用下面方式调用reuse方法
            var fireComponent = fire.getComponent(fire_1.default);
            fireComponent.reuse(shootData);
        }
        fire.parent = this.node;
    };
    EffectLayer.prototype.onBulletDestory = function (msg, obj) {
        var bullet = obj;
        if (this.bulletPool) {
            // 将节点放进对象池，这个方法会同时调用节点的 removeFromParent();
            this.bulletPool.put(bullet);
        }
        else {
            bullet.removeFromParent(true);
            bullet.destroy();
        }
    };
    EffectLayer.prototype.onHeroBulletDestory = function (msg, obj) {
        var bullet = obj;
        if (this.roleBulletPool) {
            this.roleBulletPool.put(bullet); // 
        }
        else {
            bullet.removeFromParent(true);
            bullet.destroy();
        }
    };
    EffectLayer.prototype.onFireDestory = function (msg, obj) {
        var fire = obj;
        if (this.firePool) {
            this.firePool.put(fire); // 将节点放进对象池，这个方法会同时调用节点的 removeFromParent();
        }
        else {
            fire.removeFromParent(true);
            fire.destroy();
        }
    };
    EffectLayer.prototype.onDestroy = function () {
        MsgCallUtils_1.default.removeObserver(GameEvent_1.default.PLAYER_SHOOT, this, this.createRoleBullet);
        MsgCallUtils_1.default.removeObserver(GameEvent_1.default.END_SHOOT, this, this.onBulletDestory);
        MsgCallUtils_1.default.removeObserver(GameEvent_1.default.FIRE_MC, this, this.onBulletFire);
        MsgCallUtils_1.default.removeObserver(GameEvent_1.default.END_FIRE, this, this.onFireDestory);
        MsgCallUtils_1.default.removeObserver(GameEvent_1.default.FACTORY_SHOOT, this, this.createBullet);
        MsgCallUtils_1.default.removeObserver(GameEvent_1.default.PLAYER_END_SHOOT, this, this.onHeroBulletDestory);
    };
    __decorate([
        property(cc.Prefab)
    ], EffectLayer.prototype, "bulletPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], EffectLayer.prototype, "roleBulletPrefab", void 0);
    __decorate([
        property
    ], EffectLayer.prototype, "roleBullets", void 0);
    __decorate([
        property(cc.Prefab)
    ], EffectLayer.prototype, "firePrefab", void 0);
    __decorate([
        property(cc.SpriteAtlas)
    ], EffectLayer.prototype, "bullet_atlas", void 0);
    EffectLayer = __decorate([
        ccclass
    ], EffectLayer);
    return EffectLayer;
}(cc.Component));
exports.default = EffectLayer;

cc._RF.pop();