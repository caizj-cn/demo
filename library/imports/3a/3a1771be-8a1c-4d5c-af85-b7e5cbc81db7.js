"use strict";
cc._RF.push(module, '3a177G+ihxNXK+Ft+XLyB23', 'EventManager');
// Script/framewrok/EventManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Delegate_1 = require("./Delegate");
var EventManager = /** @class */ (function () {
    function EventManager() {
        this.eListenerMap = new Map();
    }
    EventManager.getInstance = function () {
        if (this.instance == null) {
            this.instance = new EventManager();
        }
        return this.instance;
    };
    /**
     *
     * @param type 回调的方式触发事件
     * @param args
     */
    EventManager.prototype.trigger = function (type) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var _a;
        var delegates = [];
        var callers = [];
        var listenerMap = this.eListenerMap.get(type);
        if (listenerMap) {
            listenerMap.forEach(function (delegateList, caller) {
                for (var _i = 0, delegateList_1 = delegateList; _i < delegateList_1.length; _i++) {
                    var delegate = delegateList_1[_i];
                    delegates.push(delegate);
                    callers.push(caller);
                }
                for (var index = delegateList.length - 1; index >= 0; --index) {
                    if (delegateList[index].isOnce) {
                        delegateList.splice(index, 1);
                    }
                }
                if (delegateList.length <= 0) {
                    listenerMap.delete(caller);
                }
            });
            if (listenerMap.size <= 0) {
                this.eListenerMap.delete(type);
            }
        }
        var length = delegates.length;
        for (var index = 0; index < length; index++) {
            var delegate = delegates[index];
            (_a = delegate.listener).call.apply(_a, [callers[index]].concat(delegate.eArgs, args));
        }
    };
    EventManager.prototype.hasEvent = function (type, caller, listener) {
        return this.find(type, caller, listener) !== null;
    };
    EventManager.prototype.add = function (type, caller, listener) {
        var argArray = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            argArray[_i - 3] = arguments[_i];
        }
        this.addListener(type, caller, listener, false, argArray);
    };
    EventManager.prototype.addOnce = function (type, caller, listener) {
        var argArray = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            argArray[_i - 3] = arguments[_i];
        }
        this.addListener(type, caller, listener, true, argArray);
    };
    EventManager.prototype.addListener = function (type, caller, listener, isOnce) {
        var args = [];
        for (var _i = 4; _i < arguments.length; _i++) {
            args[_i - 4] = arguments[_i];
        }
        var delegate = this.find(type, caller, listener);
        if (delegate) {
            delegate.isOnce = isOnce;
            cc.log("listener is exist!");
        }
        else {
            var delegate_1 = new Delegate_1.Delegate(listener, args, isOnce);
            this.eListenerMap.get(type).get(caller).push(delegate_1);
        }
    };
    EventManager.prototype.remove = function (type, caller, listener, onceOnly) {
        var listenerMap = this.eListenerMap.get(type);
        if (listenerMap == null) {
            cc.log("type is not in ElistenerMap");
        }
        else {
            var delegateAry = listenerMap.get(caller);
            if (delegateAry == null) {
                cc.log("caller is not in listenerMap");
            }
            else {
                for (var index = 0; index < delegateAry.length; index++) {
                    if (delegateAry[index] == listener) {
                        delegateAry.splice(index, 1);
                    }
                }
                if (delegateAry.length <= 0) {
                    listenerMap.delete(caller);
                }
            }
            if (listenerMap.size <= 0) {
                this.eListenerMap.delete(type);
            }
        }
    };
    EventManager.prototype.removeAll = function (caller) {
        var _this = this;
        this.eListenerMap.forEach(function (listenerMap, type) {
            listenerMap.delete(caller);
            if (listenerMap.size <= 0) {
                _this.eListenerMap.delete(type);
            }
        });
    };
    EventManager.prototype.find = function (type, caller, listener) {
        if (!type) {
            console.error("Listener type is null!");
            return null;
        }
        if (!caller) {
            console.error("Caller type is null!");
            return null;
        }
        if (!listener) {
            console.error("Listener is null!");
            return null;
        }
        var listenerMap;
        if (this.eListenerMap.has(type)) {
            listenerMap = this.eListenerMap.get(type);
        }
        else {
            listenerMap = new Map();
            this.eListenerMap.set(type, listenerMap);
        }
        var listenerList;
        if (listenerMap.has(caller)) {
            listenerList = listenerMap.get(caller);
        }
        else {
            listenerList = [];
            listenerMap.set(caller, listenerList);
        }
        for (var _i = 0, listenerList_1 = listenerList; _i < listenerList_1.length; _i++) {
            var delegate = listenerList_1[_i];
            if (delegate.eListener === listener) {
                return delegate;
            }
        }
        return null;
    };
    return EventManager;
}());
exports.EventManager = EventManager;

cc._RF.pop();