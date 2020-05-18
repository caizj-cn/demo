"use strict";
cc._RF.push(module, '5bbe5aLSIFM/oxW2KdmlLHh', 'SwitchScene');
// Script/framewrok/SwitchScene.ts

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
var MsgCallUtils_1 = require("./utils/MsgCallUtils");
var GameEvent_1 = require("../game/data/GameEvent");
var gameManager_1 = require("../game/gameManager");
var GameConst_1 = require("../game/data/GameConst");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
//场景切换过渡类
var SwitchScene = /** @class */ (function (_super) {
    __extends(SwitchScene, _super);
    function SwitchScene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loadingBar = null;
        _this.loadResText = null;
        _this.tipsText = null;
        _this.progressText = null;
        _this.curScene = "";
        _this.totalCount = 0;
        _this.completedCount = 0;
        return _this;
    }
    SwitchScene.prototype.onLoad = function () {
        cc.game.addPersistRootNode(this.node);
        this.node.zIndex = 100;
        this.node.active = false;
        gameManager_1.default.instance.curScene = this.curScene = GameConst_1.default.LOGIN;
        MsgCallUtils_1.default.addObserver(GameEvent_1.default.SWITCH_SCENE, this, this.onSwitchScene);
    };
    SwitchScene.prototype.onDestroy = function () {
        MsgCallUtils_1.default.removeObserver(GameEvent_1.default.SWITCH_SCENE, this, this.onSwitchScene);
    };
    SwitchScene.prototype.onSwitchScene = function (msg, obj) {
        if (obj == null)
            return;
        var sceneName = obj;
        if (sceneName == gameManager_1.default.instance.curScene)
            return;
        this.node.active = true;
        gameManager_1.default.instance.curScene = this.curScene = sceneName;
        cc.director.preloadScene(sceneName, this.onProgress.bind(this), this.onCompleted.bind(this));
        if (this.loadingBar)
            this.loadingBar.progress = 0;
    };
    //加载完成
    SwitchScene.prototype.onCompleted = function () {
        cc.director.loadScene(this.curScene, function () {
            this.node.active = false;
        }.bind(this));
    };
    //加载场景进度
    SwitchScene.prototype.onProgress = function (completedCount, totalCount, item) {
        var id = item.id.substring(item.id.lastIndexOf('/') + 1, item.id.lastIndexOf("."));
        this.totalCount = totalCount;
        this.completedCount = completedCount;
        if (this.completedCount > this.totalCount) {
            this.completedCount = this.totalCount;
        }
        var progress = (this.completedCount / this.totalCount);
        if (this.loadingBar)
            this.loadingBar.progress = progress;
        if (this.progressText)
            this.progressText.string = Math.ceil(progress * 100) + "%";
        if (this.loadResText)
            this.loadResText.string = item.id || "";
    };
    SwitchScene.prototype.start = function () {
    };
    __decorate([
        property(cc.ProgressBar)
    ], SwitchScene.prototype, "loadingBar", void 0);
    __decorate([
        property(cc.Label)
    ], SwitchScene.prototype, "loadResText", void 0);
    __decorate([
        property(cc.Label)
    ], SwitchScene.prototype, "tipsText", void 0);
    __decorate([
        property(cc.Label)
    ], SwitchScene.prototype, "progressText", void 0);
    SwitchScene = __decorate([
        ccclass
    ], SwitchScene);
    return SwitchScene;
}(cc.Component));
exports.default = SwitchScene;

cc._RF.pop();