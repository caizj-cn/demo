"use strict";
cc._RF.push(module, '3655c+VsEpAxpmhm0PrqYCW', 'SceenAdapter');
// Script/component/SceenAdapter.ts

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
var MsgCallUtils_1 = require("../framewrok/utils/MsgCallUtils");
var GameEvent_1 = require("../game/data/GameEvent");
var gameManager_1 = require("../game/gameManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
//屏幕分辨率适配
var SceenAdapter = /** @class */ (function (_super) {
    __extends(SceenAdapter, _super);
    function SceenAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SceenAdapter.prototype.onLoad = function () {
        var _this = this;
        cc.view.setResizeCallback(function () {
            _this.onResize();
        });
        this.adapter();
    };
    SceenAdapter.prototype.onResize = function () {
        MsgCallUtils_1.default.notifyObserver(GameEvent_1.default.VIEW_RESIZE);
        this.adapter();
    };
    SceenAdapter.prototype.adapter = function () {
        cc.view.getFrameSize;
        // 实际屏幕比例
        var screenRatio = cc.view.getCanvasSize().width / cc.view.getCanvasSize().height;
        // 设计比例
        var designRatio = cc.Canvas.instance.designResolution.width / cc.Canvas.instance.designResolution.height;
        // 判断实际屏幕宽高比
        if (screenRatio <= 1) {
            // 此时屏幕高度大于宽度
            if (screenRatio <= designRatio) {
                this.setFitWidth();
            }
            else {
                // 此时实际屏幕比例大于设计比例
                // 为了保证纵向的游戏内容不受影响，应使用 fitHeight 模式
                this.setFitHeight();
            }
        }
        else {
            // 此时屏幕高度小于宽度
            this.setFitHeight();
        }
    };
    SceenAdapter.prototype.setFitHeight = function () {
        cc.Canvas.instance.fitHeight = true;
        cc.Canvas.instance.fitWidth = false;
        gameManager_1.default.instance.scaleFactor = cc.view.getCanvasSize().height / cc.Canvas.instance.designResolution.height;
    };
    SceenAdapter.prototype.setFitWidth = function () {
        cc.Canvas.instance.fitHeight = false;
        cc.Canvas.instance.fitWidth = true;
        gameManager_1.default.instance.scaleFactor = cc.view.getCanvasSize().width / cc.Canvas.instance.designResolution.width;
    };
    SceenAdapter = __decorate([
        ccclass
    ], SceenAdapter);
    return SceenAdapter;
}(cc.Component));
exports.default = SceenAdapter;

cc._RF.pop();