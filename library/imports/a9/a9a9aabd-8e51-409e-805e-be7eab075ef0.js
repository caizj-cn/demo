"use strict";
cc._RF.push(module, 'a9a9aq9jlFAnoBevn6rB17w', 'Delegate');
// Script/framewrok/Delegate.ts

"use strict";
/**
 * 事件代理类
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Delegate = /** @class */ (function () {
    function Delegate(listener, args, isOnce) {
        if (isOnce === void 0) { isOnce = false; }
        this.eListener = listener;
        this.eArgs = args;
        this.once = isOnce;
    }
    Object.defineProperty(Delegate.prototype, "listener", {
        get: function () {
            return this.eListener;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Delegate.prototype, "isOnce", {
        get: function () {
            return this.once;
        },
        set: function (value) {
            this.once = value;
        },
        enumerable: true,
        configurable: true
    });
    return Delegate;
}());
exports.Delegate = Delegate;

cc._RF.pop();