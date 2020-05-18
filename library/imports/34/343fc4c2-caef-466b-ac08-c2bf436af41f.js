"use strict";
cc._RF.push(module, '343fcTCyu9Ga6wIwr9DavQf', 'LocalStorage');
// Script/framewrok/LocalStorage.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LocalStorage = /** @class */ (function () {
    function LocalStorage() {
        this.localData = {};
    }
    Object.defineProperty(LocalStorage, "instance", {
        get: function () {
            if (this._instance == null) {
                this._instance = new LocalStorage();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    LocalStorage.prototype.setItem = function (key, value) {
        this.localData[key] = value;
        try {
            value = JSON.stringify(value);
        }
        catch (e) {
            value = value;
        }
        cc.sys.localStorage.setItem(key, value);
    };
    LocalStorage.prototype.getItem = function (key) {
        if (this.localData[key]) {
            return this.localData[key];
        }
        else {
            var value = cc.sys.localStorage.getItem(key);
            if (value) {
                try {
                    value = JSON.parse(value);
                }
                catch (e) {
                    value = value;
                }
                this.localData[key] = value;
                return value;
            }
            return null;
        }
    };
    LocalStorage.prototype.clear = function () {
        this.localData = {};
        cc.sys.localStorage.clear();
    };
    LocalStorage.prototype.removeItem = function (key) {
        cc.sys.localStorage.removeItem(key);
        delete this.localData[key];
    };
    return LocalStorage;
}());
exports.default = LocalStorage;

cc._RF.pop();