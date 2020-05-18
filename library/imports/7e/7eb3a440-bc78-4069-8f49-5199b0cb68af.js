"use strict";
cc._RF.push(module, '7eb3aRAvHhAaY9JUZmwy2iv', 'mapTouch');
// Script/game/map/mapTouch.ts

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
var gameManager_1 = require("../gameManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var mapTouch = /** @class */ (function (_super) {
    __extends(mapTouch, _super);
    function mapTouch() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.curCamera = null;
        _this.touchPos = null;
        return _this;
    }
    mapTouch.prototype.onLoad = function () {
        this.touchPos = cc.v2();
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
    };
    mapTouch.prototype.onDestroy = function () {
        this.node.off(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.touchMove, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
    };
    mapTouch.prototype.touchStart = function (event) {
        var pos = event.getLocation();
        var realPos = this.node.convertToNodeSpaceAR(pos);
        this.touchPos.x = realPos.x + this.curCamera.x;
        this.touchPos.y = realPos.y + this.curCamera.y;
        gameManager_1.default.instance.touchDown = true;
        MsgCallUtils_1.default.notifyObserver(GameEvent_1.default.TOUCH_MAP, this.touchPos);
    };
    mapTouch.prototype.touchMove = function (event) {
        var pos = event.getLocation();
        var realPos = this.node.convertToNodeSpaceAR(pos);
        this.touchPos.x = realPos.x + this.curCamera.x;
        this.touchPos.y = realPos.y + this.curCamera.y;
        gameManager_1.default.instance.touchDown = true;
        MsgCallUtils_1.default.notifyObserver(GameEvent_1.default.TOUCH_MAP, this.touchPos);
    };
    mapTouch.prototype.touchEnd = function (event) {
        gameManager_1.default.instance.touchDown = false;
    };
    __decorate([
        property(cc.Node)
    ], mapTouch.prototype, "curCamera", void 0);
    mapTouch = __decorate([
        ccclass
    ], mapTouch);
    return mapTouch;
}(cc.Component));
exports.default = mapTouch;

cc._RF.pop();