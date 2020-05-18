"use strict";
cc._RF.push(module, '88baaRxzgZGYr5UJCiXKhn9', 'factoryShoot');
// Script/game/factory/factoryShoot.ts

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
var MathUtils_1 = require("../../framewrok/utils/MathUtils");
var MsgCallUtils_1 = require("../../framewrok/utils/MsgCallUtils");
var GameEvent_1 = require("../data/GameEvent");
var gameManager_1 = require("../gameManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FactoryShoot = /** @class */ (function (_super) {
    __extends(FactoryShoot, _super);
    function FactoryShoot() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.shootPos = null;
        _this.scaleX = 1;
        _this.angle = 0;
        _this.angleDir = 0; //0:向下，1：向上
        return _this;
    }
    FactoryShoot.prototype.onLoad = function () {
        this.angle = MathUtils_1.default.randomInt(-30, 30);
        this.node.angle = this.angle;
    };
    FactoryShoot.prototype.start = function () {
        this.schedule(this.updateAngle, 0.5);
    };
    FactoryShoot.prototype.updateAngle = function () {
        if (gameManager_1.default.instance.isOver)
            return;
        if (this.angle <= -30) {
            this.angleDir = 1;
        }
        else if (this.angle >= 30) {
            this.angleDir = 0;
        }
        this.angleDir > 0 ? this.angle += 5 : this.angle -= 5;
        this.node.angle = this.angle;
        if (!this.shootData)
            this.shootData = {};
        this.shootData["prefabName"] = "bullet1"; //预制体名称
        this.shootData["v"] = this.node.convertToWorldSpaceAR(this.shootPos.position); //位置
        this.shootData["angle"] = this.angle; //角度cc.
        this.shootData["group"] = "mybull"; //组
        this.shootData["attack"] = 20;
        this.shootData["scaleX"] = this.scaleX;
        MsgCallUtils_1.default.notifyObserver(GameEvent_1.default.FACTORY_SHOOT, this.shootData);
    };
    FactoryShoot.prototype.update = function (dt) {
    };
    __decorate([
        property(cc.Node)
    ], FactoryShoot.prototype, "shootPos", void 0);
    __decorate([
        property
    ], FactoryShoot.prototype, "scaleX", void 0);
    FactoryShoot = __decorate([
        ccclass
    ], FactoryShoot);
    return FactoryShoot;
}(cc.Component));
exports.default = FactoryShoot;

cc._RF.pop();