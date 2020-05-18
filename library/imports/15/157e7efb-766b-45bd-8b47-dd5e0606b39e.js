"use strict";
cc._RF.push(module, '157e777dmtFvYtH3V4GBrOe', 'factoryNode');
// Script/game/factory/factoryNode.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
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
var gameManager_1 = require("../gameManager");
var MsgCallUtils_1 = require("../../framewrok/utils/MsgCallUtils");
var UIConfig_1 = require("../data/UIConfig");
var GameEvent_1 = require("../data/GameEvent");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FactoryNode = /** @class */ (function (_super) {
    __extends(FactoryNode, _super);
    function FactoryNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hpBar = null;
        _this.totalHp = 100;
        return _this;
    }
    FactoryNode.prototype.start = function () {
        this.curHp = this.totalHp;
    };
    FactoryNode.prototype.onCollisionEnter = function (other, self) {
        if (gameManager_1.default.instance.isOver)
            return;
        if (other.node.name == "roleBullet" && self.node.name == "rightFactory") {
            this.curHp -= 5;
            this.hpBar.progress = this.curHp / this.totalHp;
            if (this.curHp <= 0) {
                gameManager_1.default.instance.isOver = true;
                var info = UIConfig_1.default.getUIInfo("winUI");
                MsgCallUtils_1.default.notifyObserver(GameEvent_1.default.SHOW_UIVIEW, info);
            }
        }
    };
    __decorate([
        property(cc.ProgressBar)
    ], FactoryNode.prototype, "hpBar", void 0);
    __decorate([
        property
    ], FactoryNode.prototype, "totalHp", void 0);
    FactoryNode = __decorate([
        ccclass
    ], FactoryNode);
    return FactoryNode;
}(cc.Component));
exports.default = FactoryNode;

cc._RF.pop();