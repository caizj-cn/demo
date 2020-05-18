"use strict";
cc._RF.push(module, 'acecdE9cjRMu5p4bfjTZf2v', 'loseUI');
// Script/game/ui/loseUI.ts

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
var GameConst_1 = require("../data/GameConst");
var GameEvent_1 = require("../data/GameEvent");
var MsgCallUtils_1 = require("../../framewrok/utils/MsgCallUtils");
var UIConfig_1 = require("../data/UIConfig");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LoseUI = /** @class */ (function (_super) {
    __extends(LoseUI, _super);
    function LoseUI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoseUI.prototype.homeClick = function () {
        MsgCallUtils_1.default.notifyObserver(GameEvent_1.default.SWITCH_SCENE, GameConst_1.default.HALL);
        var info = UIConfig_1.default.getUIInfo("loseUI");
        MsgCallUtils_1.default.notifyObserver(GameEvent_1.default.CLOSE_UIVIEW, info.url);
    };
    LoseUI.prototype.restartClick = function () {
        MsgCallUtils_1.default.notifyObserver(GameEvent_1.default.SWITCH_SCENE, GameConst_1.default.GAME);
        var info = UIConfig_1.default.getUIInfo("loseUI");
        MsgCallUtils_1.default.notifyObserver(GameEvent_1.default.CLOSE_UIVIEW, info.url);
    };
    LoseUI = __decorate([
        ccclass
    ], LoseUI);
    return LoseUI;
}(cc.Component));
exports.default = LoseUI;

cc._RF.pop();