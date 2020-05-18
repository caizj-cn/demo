"use strict";
cc._RF.push(module, '3e4faw0JFBIi49tyZocOsdH', 'hall');
// Script/game/hall.ts

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
var LocalStorage_1 = require("../framewrok/LocalStorage");
var gameManager_1 = require("./gameManager");
var ChapterData_1 = require("./data/ChapterData");
var MsgCallUtils_1 = require("../framewrok/utils/MsgCallUtils");
var UIConfig_1 = require("./data/UIConfig");
var GameEvent_1 = require("./data/GameEvent");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Hall = /** @class */ (function (_super) {
    __extends(Hall, _super);
    function Hall() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.scrollContent = null;
        _this.chatperText = null;
        _this.heroHead = null;
        _this.itemPrefab = null;
        _this.itemBgAltas = null;
        _this.nodeList = [];
        return _this;
    }
    Hall.prototype.onLoad = function () {
        var chapterNum = LocalStorage_1.default.instance.getItem("chapter_num");
        if (!chapterNum) {
            chapterNum = gameManager_1.default.instance.chapterNum;
            LocalStorage_1.default.instance.setItem("chapter_num", chapterNum);
        }
        var nodeIndex = LocalStorage_1.default.instance.getItem("chapter_node_index");
        if (!nodeIndex) {
            nodeIndex = gameManager_1.default.instance.chapterNodeIndex;
            LocalStorage_1.default.instance.setItem("chapter_node_index", nodeIndex);
        }
        this.chatperText.string = "第" + chapterNum + "章";
        this.nodeList = ChapterData_1.default.getNodeList(chapterNum);
        this.loadPlist();
    };
    Hall.prototype.loadPlist = function () {
        var self = this;
        cc.loader.loadRes("plist/ui", cc.SpriteAtlas, function (err, res) {
            if (err) {
                cc.log("uiPlist load error");
                return;
            }
            self.itemBgAltas = res;
            self.initScrollView();
        });
    };
    Hall.prototype.initScrollView = function () {
        for (var index = 0; index < this.nodeList.length; index++) {
            var nodeInfo = this.nodeList[index];
            var nodeItem = cc.instantiate(this.itemPrefab);
            var nodeScript = nodeItem.getComponent("chapterItem");
            nodeScript.setData(nodeInfo, this.itemBgAltas);
            nodeItem.x = nodeInfo.x;
            nodeItem.y = nodeInfo.y;
            if (gameManager_1.default.instance.chapterNodeIndex == index + 1) {
                this.heroHead.x = nodeItem.x;
                this.heroHead.y = nodeItem.y + 90;
            }
            nodeItem.parent = this.scrollContent;
        }
    };
    Hall.prototype.start = function () {
    };
    Hall.prototype.onPreClick = function (evt) {
        cc.log("waiting for chapter edit");
    };
    Hall.prototype.onNextClick = function (evt) {
        cc.log("waiting for chapter edit");
    };
    Hall.prototype.onSettingClick = function (evt) {
        var info = UIConfig_1.default.getUIInfo("winUI");
        MsgCallUtils_1.default.notifyObserver(GameEvent_1.default.SHOW_UIVIEW, info);
    };
    __decorate([
        property(cc.Node)
    ], Hall.prototype, "scrollContent", void 0);
    __decorate([
        property(cc.Label)
    ], Hall.prototype, "chatperText", void 0);
    __decorate([
        property(cc.Node)
    ], Hall.prototype, "heroHead", void 0);
    __decorate([
        property(cc.Prefab)
    ], Hall.prototype, "itemPrefab", void 0);
    Hall = __decorate([
        ccclass
    ], Hall);
    return Hall;
}(cc.Component));
exports.default = Hall;

cc._RF.pop();