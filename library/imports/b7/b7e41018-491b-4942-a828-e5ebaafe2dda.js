"use strict";
cc._RF.push(module, 'b7e41AYSRtJQqgo5euq/i3a', 'SimpleDictionary');
// Script/framewrok/utils/SimpleDictionary.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SimpleDictionary = /** @class */ (function () {
    function SimpleDictionary(object) {
        if (object != null) {
            for (var property in object) {
                if (object.hasOwnProperty(property)) {
                    this[property] = object[property];
                }
            }
        }
    }
    SimpleDictionary.prototype.clone = function () {
        var result = new SimpleDictionary(this);
        return result;
    };
    SimpleDictionary.prototype.getKeys = function () {
        var result = [];
        for (var key in this) {
            if (this.hasOwnProperty(key)) {
                result.push(key);
            }
        }
        return result;
    };
    SimpleDictionary.prototype.getValues = function () {
        var result = [];
        for (var item in this) {
            if (this.hasOwnProperty(item)) {
                result.push(this[item]);
            }
        }
        return result;
    };
    SimpleDictionary.prototype.addItem = function (key, value) {
        var isAddItem = !this.hasOwnProperty(key) && typeof (value) !== 'undefined';
        if (isAddItem) {
            this[key] = value;
        }
        return isAddItem;
    };
    SimpleDictionary.prototype.updateItem = function (key, value) {
        var isUpdateItem = this.hasOwnProperty(key) && typeof (value) !== 'undefined';
        if (isUpdateItem) {
            this[key] = value;
        }
        return isUpdateItem;
    };
    SimpleDictionary.prototype.deleteItem = function (key) {
        var isDeleteItem = this.hasOwnProperty(key);
        if (isDeleteItem) {
            delete this[key];
        }
        return isDeleteItem;
    };
    SimpleDictionary.prototype.getItem = function (key) {
        var hasItem = this.hasOwnProperty(key);
        if (hasItem) {
            return this[key];
        }
        return null;
    };
    Object.defineProperty(SimpleDictionary.prototype, "length", {
        get: function () {
            return this.getKeys().length;
        },
        enumerable: true,
        configurable: true
    });
    SimpleDictionary.prototype.clear = function () {
        for (var key in this) {
            if (this.hasOwnProperty(key)) {
                this.deleteItem(key);
            }
        }
    };
    return SimpleDictionary;
}());
exports.default = SimpleDictionary;

cc._RF.pop();