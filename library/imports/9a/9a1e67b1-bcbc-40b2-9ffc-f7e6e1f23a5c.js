"use strict";
cc._RF.push(module, '9a1e6exvLxAsp/89+bh8jpc', 'floor');
// Script/game/map/floor.ts

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
var Floor = /** @class */ (function (_super) {
    __extends(Floor, _super);
    function Floor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Floor.prototype.onLoad = function () {
        var pc = this.node.getComponent(cc.PolygonCollider);
        this.points = pc.points;
        var ppc = this.node.getComponent(cc.PhysicsPolygonCollider);
        ppc.points = this.points;
    };
    Floor = __decorate([
        ccclass
    ], Floor);
    return Floor;
}(cc.Component));
exports.default = Floor;

cc._RF.pop();