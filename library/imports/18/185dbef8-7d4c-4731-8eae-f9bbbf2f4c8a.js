"use strict";
cc._RF.push(module, '185db74fUxHMY6u+bu/L0yK', 'StringUtls');
// Script/framewrok/utils/StringUtls.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StringUtils = /** @class */ (function () {
    function StringUtils() {
    }
    StringUtils.trimLeft = function (pString) {
        if (pString == null) {
            return '';
        }
        return pString.replace(/^\s+/, '');
    };
    StringUtils.trimRight = function (pString) {
        if (pString == null) {
            return '';
        }
        return pString.replace(/\s+$/, '');
    };
    StringUtils.trim = function (pString) {
        if (pString == null) {
            return '';
        }
        return pString.replace(/^\s+|\s+$/g, '');
    };
    StringUtils.isNullOrUndefined = function (pString) {
        if (pString == null || pString === undefined)
            return true;
        return false;
    };
    StringUtils.isEmptyString = function (pString) {
        if (pString === "")
            return true;
        return false;
    };
    /**ArrayBuffer转为字符串，或者字符串转为ArrayBuffer，。
     * 有一个前提，即字符串的编码方法是确定的;假定字符串采用UTF-16编码（JavaScript的内部编码方式）
     */
    // ArrayBuffer转为字符串，参数为ArrayBuffer对象
    StringUtils.abToStr = function (buf) {
        return String.fromCharCode.apply(null, new Uint16Array(buf));
    };
    // 字符串转为ArrayBuffer对象，参数为字符串
    StringUtils.StrToab = function (str) {
        var buf = new ArrayBuffer(str.length * 2); // 每个字符占用2个字节
        var bufView = new Uint16Array(buf);
        for (var i = 0, strLen = str.length; i < strLen; i++) {
            bufView[i] = str.charCodeAt(i);
        }
        return buf;
    };
    StringUtils.format = function (str) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (args == null || args.length <= 0) {
            return str;
        }
        for (var i = 0; i < args.length; i++) {
            str = str.replace("{" + i.toString() + "}", args[i]);
        }
        return str;
    };
    //根据参数最后一项来确定拼接后的字符串格式
    StringUtils.splitFormat = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var result = "";
        if (args == null || args.length <= 0) {
            return result;
        }
        var patten = args[args.length - 1];
        for (var i = 0; i < args.length - 1; i++) {
            result += args[i] + patten;
        }
        result = result.substring(0, result.lastIndexOf(patten));
        return result;
    };
    return StringUtils;
}());
exports.StringUtils = StringUtils;

cc._RF.pop();