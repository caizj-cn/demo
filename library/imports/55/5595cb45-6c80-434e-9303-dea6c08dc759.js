"use strict";
cc._RF.push(module, '5595ctFbIBDTpMD3qbAjcdZ', 'PhysicsManager');
// Script/component/PhysicsManager.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
//物理组件控制
var PhysicsManager = /** @class */ (function (_super) {
    __extends(PhysicsManager, _super);
    function PhysicsManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.active = true;
        _this.aabb = true;
        _this.joint = true;
        _this.shape = true;
        _this.gravity = cc.v2(0, 0);
        return _this;
    }
    PhysicsManager.prototype.onEnable = function () {
        var physicsManager = cc.director.getPhysicsManager();
        cc.director.getCollisionManager().enabled = true;
        if (!this.active)
            return;
        //根据状态开启或者关闭物理系统
        physicsManager.enabled = this.active;
        // physicsManager.gravity = this.gravity;
        //设置调试标志
        var drawBits = cc.PhysicsManager.DrawBits;
        if (CC_PREVIEW) {
            physicsManager.debugDrawFlags =
                (this.aabb && drawBits.e_aabbBit) |
                    (this.joint && drawBits.e_jointBit) |
                    (this.shape && drawBits.e_shapeBit);
        }
        else {
            physicsManager.debugDrawFlags = 0;
        }
    };
    PhysicsManager.prototype.onDisable = function () {
        var physicsManager = cc.director.getPhysicsManager();
        physicsManager.debugDrawFlags = 0;
        physicsManager.enabled = false;
    };
    __decorate([
        property({ tooltip: "是否开启物理引擎" })
    ], PhysicsManager.prototype, "active", void 0);
    __decorate([
        property({ tooltip: "是否显示包围盒" })
    ], PhysicsManager.prototype, "aabb", void 0);
    __decorate([
        property({ tooltip: "是否显示关节连接线" })
    ], PhysicsManager.prototype, "joint", void 0);
    __decorate([
        property({ tooltip: "是否填充形状" })
    ], PhysicsManager.prototype, "shape", void 0);
    __decorate([
        property({ tooltip: "重力值" })
    ], PhysicsManager.prototype, "gravity", void 0);
    PhysicsManager = __decorate([
        ccclass
    ], PhysicsManager);
    return PhysicsManager;
}(cc.Component));
exports.default = PhysicsManager;

cc._RF.pop();