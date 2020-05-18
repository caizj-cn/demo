"use strict";
cc._RF.push(module, '0eb8eiVxqZAWovVcwH737Rk', 'winUI');
// Script/game/ui/winUI.ts

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
var GameConst_1 = require("../data/GameConst");
var UIConfig_1 = require("../data/UIConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var WinUI = /** @class */ (function (_super) {
    __extends(WinUI, _super);
    function WinUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.starCon = null;
        _this.uiAtlas = null;
        _this.starNum = 3;
        return _this;
    }
    WinUI.prototype.onLoad = function () {
        this.showStar();
    };
    WinUI.prototype.showStar = function () {
        for (var index = 0; index < this.starNum; index++) {
            var star = new cc.Node();
            var starSprite = star.addComponent(cc.Sprite);
            starSprite.spriteFrame = this.uiAtlas.getSpriteFrame("win-star1");
            this.starCon.addChild(star);
        }
    };
    WinUI.prototype.onDestroy = function () {
    };
    WinUI.prototype.homeClick = function () {
        MsgCallUtils_1.default.notifyObserver(GameEvent_1.default.SWITCH_SCENE, GameConst_1.default.HALL);
        var info = UIConfig_1.default.getUIInfo("winUI");
        MsgCallUtils_1.default.notifyObserver(GameEvent_1.default.CLOSE_UIVIEW, info.url);
    };
    WinUI.prototype.nextClick = function () {
        MsgCallUtils_1.default.notifyObserver(GameEvent_1.default.SWITCH_SCENE, GameConst_1.default.HALL);
        var info = UIConfig_1.default.getUIInfo("loseUI");
        MsgCallUtils_1.default.notifyObserver(GameEvent_1.default.SHOW_UIVIEW, info);
    };
    __decorate([
        property(cc.Node)
    ], WinUI.prototype, "starCon", void 0);
    __decorate([
        property(cc.SpriteAtlas)
    ], WinUI.prototype, "uiAtlas", void 0);
    __decorate([
        property
    ], WinUI.prototype, "starNum", void 0);
    WinUI = __decorate([
        ccclass
    ], WinUI);
    return WinUI;
}(cc.Component));
exports.default = WinUI;

cc._RF.pop();