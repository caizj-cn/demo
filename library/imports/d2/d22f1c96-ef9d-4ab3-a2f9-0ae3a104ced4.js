"use strict";
cc._RF.push(module, 'd22f1yW751Ks6L5CuOhBM7U', 'gameScene');
// Script/game/gameScene.ts

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
var SoundManager_1 = require("../framewrok/SoundManager");
var UIViewControl_1 = require("../framewrok/UIViewControl");
var gameManager_1 = require("./gameManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameScene = /** @class */ (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.map = null;
        return _this;
        // update (dt) {}
    }
    GameScene.prototype.onLoad = function () {
        gameManager_1.default.instance.mapRect = this.map.getBoundingBox();
        SoundManager_1.default.instance.setup();
        UIViewControl_1.default.instance.setup();
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
        gameManager_1.default.instance.isOver = false;
    };
    GameScene.prototype.start = function () {
        // SoundManager.instance.playMusic("/sound/bgm1_1",true);
        // let info = UIConfig.getUIInfo("winUI");
        // MsgCallUtils.notifyObserver(GameEvent.SHOW_UIVIEW,info);
    };
    GameScene.prototype.onDestroy = function () {
    };
    __decorate([
        property(cc.Node)
    ], GameScene.prototype, "map", void 0);
    GameScene = __decorate([
        ccclass
    ], GameScene);
    return GameScene;
}(cc.Component));
exports.default = GameScene;

cc._RF.pop();