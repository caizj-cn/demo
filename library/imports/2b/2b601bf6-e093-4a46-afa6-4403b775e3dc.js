"use strict";
cc._RF.push(module, '2b601v24JNKRq+mRAO3dePc', 'chapterItem');
// Script/game/ui/chapterItem.ts

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
var MsgCallUtils_1 = require("../../framewrok/utils/MsgCallUtils");
var GameEvent_1 = require("../data/GameEvent");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ChapterItem = /** @class */ (function (_super) {
    __extends(ChapterItem, _super);
    function ChapterItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bg = null;
        _this.indexText = null;
        _this.starCon = null;
        _this.bgAtlas = null;
        return _this;
        // update (dt) {}
    }
    ChapterItem.prototype.onLoad = function () {
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEndHandler);
    };
    ChapterItem.prototype.onDestroy = function () {
        this.node.off(cc.Node.EventType.TOUCH_END, this.touchEndHandler);
    };
    ChapterItem.prototype.start = function () {
    };
    ChapterItem.prototype.setData = function (info, bgAtlas) {
        this.indexText.string = info["index"];
        var spirteName = "gk-guka" + info["bg"];
        this.bg.spriteFrame = bgAtlas.getSpriteFrame(spirteName);
        var starNum = info["star"];
        this.starCon.removeAllChildren();
        for (var index = 0; index < starNum; index++) {
            var star = new cc.Node();
            var starSprite = star.addComponent(cc.Sprite);
            starSprite.spriteFrame = bgAtlas.getSpriteFrame("gk-start0");
            this.starCon.addChild(star);
        }
    };
    ChapterItem.prototype.touchEndHandler = function (evt) {
        //派发切换场景事件
        MsgCallUtils_1.default.notifyObserver(GameEvent_1.default.SWITCH_SCENE, GameConst_1.default.GAME);
    };
    __decorate([
        property(cc.Sprite)
    ], ChapterItem.prototype, "bg", void 0);
    __decorate([
        property(cc.Label)
    ], ChapterItem.prototype, "indexText", void 0);
    __decorate([
        property(cc.Node)
    ], ChapterItem.prototype, "starCon", void 0);
    ChapterItem = __decorate([
        ccclass
    ], ChapterItem);
    return ChapterItem;
}(cc.Component));
exports.default = ChapterItem;

cc._RF.pop();