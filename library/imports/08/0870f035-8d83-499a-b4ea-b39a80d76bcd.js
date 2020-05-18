"use strict";
cc._RF.push(module, '0870fA1jYNJmrTqs5qA12vN', 'view1');
// Script/game/ui/view1.ts

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
var UIViewInfo_1 = require("../../framewrok/UIViewInfo");
var GameConst_1 = require("../data/GameConst");
var MsgCallUtils_1 = require("../../framewrok/utils/MsgCallUtils");
var GameEvent_1 = require("../data/GameEvent");
var UIViewControl_1 = require("../../framewrok/UIViewControl");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var View1 = /** @class */ (function (_super) {
    __extends(View1, _super);
    function View1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isCache = false;
        _this.viewTpye = UIViewControl_1.UIViewType.none;
        _this.needTween = false;
        _this.needAlphaBg = false;
        return _this;
        // update (dt) {}
    }
    View1.prototype.start = function () {
    };
    View1.prototype.onclick = function () {
        var info = new UIViewInfo_1.default();
        info.url = GameConst_1.default.VIEW2;
        info.name = "view2";
        info.isCache = this.isCache;
        info.viewTpye = this.viewTpye;
        info.needTween = this.needTween;
        info.needAlphaBg = this.needAlphaBg;
        MsgCallUtils_1.default.notifyObserver(GameEvent_1.default.SHOW_UIVIEW, info);
    };
    __decorate([
        property
    ], View1.prototype, "isCache", void 0);
    __decorate([
        property({ type: cc.Enum(UIViewControl_1.UIViewType) })
    ], View1.prototype, "viewTpye", void 0);
    __decorate([
        property
    ], View1.prototype, "needTween", void 0);
    __decorate([
        property
    ], View1.prototype, "needAlphaBg", void 0);
    View1 = __decorate([
        ccclass
    ], View1);
    return View1;
}(cc.Component));
exports.default = View1;

cc._RF.pop();