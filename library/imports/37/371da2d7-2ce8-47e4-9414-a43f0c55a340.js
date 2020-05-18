"use strict";
cc._RF.push(module, '371daLXLOhH5JQUpD8MVaNA', 'CameraFollow');
// Script/component/CameraFollow.ts

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
var gameManager_1 = require("../game/gameManager");
//摄像机跟随
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var CameraFollow = /** @class */ (function (_super) {
    __extends(CameraFollow, _super);
    function CameraFollow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.target = null;
        _this.map = null;
        return _this;
    }
    CameraFollow.prototype.onLoad = function () {
        if (!this.target || !this.map)
            return;
        var widget = this.node.getComponent(cc.Widget);
        if (widget)
            widget.updateAlignment();
        this.mapRect = this.map.getBoundingBox();
        this.minX = 0;
        this.maxX = this.mapRect.width - cc.winSize.width;
        this.minY = 0;
        this.maxY = this.mapRect.height - cc.winSize.height;
        gameManager_1.default.instance.cameraPos = cc.v2(this.node.x, this.node.y);
    };
    CameraFollow.prototype.lateUpdate = function (dt) {
        if (!this.target)
            return;
        var targetPos = this.target.convertToWorldSpaceAR(cc.Vec2.ZERO);
        var nodePos = this.node.parent.convertToNodeSpaceAR(targetPos);
        if (nodePos.x < this.minX)
            nodePos.x = this.minX;
        else if (nodePos.x > this.maxX)
            nodePos.x = this.maxX;
        if (nodePos.y < this.minY)
            nodePos.y = this.minY;
        else if (nodePos.y > this.maxY)
            nodePos.y = this.maxY;
        this.node.setPosition(nodePos);
        gameManager_1.default.instance.cameraPos = nodePos;
    };
    __decorate([
        property(cc.Node)
    ], CameraFollow.prototype, "target", void 0);
    __decorate([
        property(cc.Node)
    ], CameraFollow.prototype, "map", void 0);
    CameraFollow = __decorate([
        ccclass
    ], CameraFollow);
    return CameraFollow;
}(cc.Component));
exports.default = CameraFollow;

cc._RF.pop();