"use strict";
cc._RF.push(module, 'c29b05/a0VNt6N4P8jhKzdy', 'view2');
// Script/game/ui/view2.ts

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
var UIViewControl_1 = require("../../framewrok/UIViewControl");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var View2 = /** @class */ (function (_super) {
    __extends(View2, _super);
    function View2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isCache = false;
        _this.viewTpye = UIViewControl_1.UIViewType.none;
        _this.needTween = false;
        _this.needAlphaBg = false;
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    View2.prototype.start = function () {
    };
    View2.prototype.onclick = function () {
        MsgCallUtils_1.default.notifyObserver(GameEvent_1.default.CLOSE_UIVIEW, GameConst_1.default.VIEW1);
    };
    __decorate([
        property
    ], View2.prototype, "isCache", void 0);
    __decorate([
        property({ type: cc.Enum(UIViewControl_1.UIViewType) })
    ], View2.prototype, "viewTpye", void 0);
    __decorate([
        property
    ], View2.prototype, "needTween", void 0);
    __decorate([
        property
    ], View2.prototype, "needAlphaBg", void 0);
    View2 = __decorate([
        ccclass
    ], View2);
    return View2;
}(cc.Component));
exports.default = View2;

cc._RF.pop();