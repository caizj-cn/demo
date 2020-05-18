"use strict";
cc._RF.push(module, '58d8d2KFpVP0L/NhzmKjBNs', 'UIConfig');
// Script/game/data/UIConfig.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UIViewControl_1 = require("../../framewrok/UIViewControl");
var UIViewInfo_1 = require("../../framewrok/UIViewInfo");
//测试数据
var UIConfig = /** @class */ (function () {
    function UIConfig() {
    }
    UIConfig.getUIInfo = function (name) {
        var info = new UIViewInfo_1.default();
        for (var index = 0; index < UIConfig.VIEW_LIST.length; index++) {
            var uiInfo = UIConfig.VIEW_LIST[index];
            if (uiInfo.name == name) {
                info.url = uiInfo.url;
                info.name = uiInfo.name;
                info.isCache = uiInfo.isCache;
                info.viewTpye = uiInfo.viewTpye;
                info.needTween = uiInfo.needTween;
                info.needAlphaBg = uiInfo.needAlphaBg;
                return info;
            }
        }
        return null;
    };
    UIConfig.VIEW_LIST = [
        {
            url: "/prefab/winUI",
            name: "winUI",
            isCache: true,
            viewTpye: UIViewControl_1.UIViewType.popup,
            needTween: true,
            needAlphaBg: true
        }, {
            url: "/prefab/loseUI",
            name: "loseUI",
            isCache: true,
            viewTpye: UIViewControl_1.UIViewType.none,
            needTween: true,
            needAlphaBg: true
        }
    ];
    return UIConfig;
}());
exports.default = UIConfig;

cc._RF.pop();