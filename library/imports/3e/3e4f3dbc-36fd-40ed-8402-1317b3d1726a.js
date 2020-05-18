"use strict";
cc._RF.push(module, '3e4f328Nv1A7YQCExez0XJq', 'MsgCallUtils');
// Script/framewrok/utils/MsgCallUtils.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SimpleDictionary_1 = require("./SimpleDictionary");
/**
 * 信息回调，类似于事件机制
 */
var MsgCallUtils = /** @class */ (function () {
    function MsgCallUtils() {
    }
    MsgCallUtils.addObserver = function (msgType, context, callFun) {
        var observerAry = MsgCallUtils.observerDic.getItem(msgType);
        if (observerAry && observerAry.length > 0) {
            for (var index = 0; index < observerAry.length; index++) {
                if (callFun == observerAry[index].fun)
                    return; //已经存在的监听不在重复添加
            }
            observerAry.push({ context: context, fun: callFun });
        }
        else {
            MsgCallUtils.observerDic.addItem(msgType, [{ context: context, fun: callFun }]);
        }
    };
    MsgCallUtils.removeObserver = function (msgType, context, callFun) {
        var observerAry = MsgCallUtils.observerDic.getItem(msgType);
        if (observerAry != null && observerAry.length > 0) {
            for (var index = 0; index < observerAry.length; index++) {
                if (context == observerAry[index].context && callFun == (observerAry[index].fun)) {
                    observerAry.splice(index, 1);
                    MsgCallUtils.observerDic.updateItem(msgType, observerAry);
                    if (observerAry.length < 1) {
                        MsgCallUtils.observerDic.deleteItem(msgType);
                    }
                    return;
                }
            }
        }
    };
    MsgCallUtils.notifyObserver = function (msgType, body) {
        if (body === void 0) { body = null; }
        var observerAry = MsgCallUtils.observerDic.getItem(msgType);
        if (observerAry != null) {
            var tempAry = [];
            tempAry = tempAry.concat(observerAry);
            tempAry.forEach(function (msgObj) {
                if (msgObj.fun)
                    msgObj.fun.apply(msgObj.context, [msgType, body]);
            });
        }
    };
    MsgCallUtils.observerDic = new SimpleDictionary_1.default();
    return MsgCallUtils;
}());
exports.default = MsgCallUtils;

cc._RF.pop();