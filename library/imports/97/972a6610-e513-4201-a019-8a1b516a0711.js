"use strict";
cc._RF.push(module, '972a6YQ5RNCAaAZihtRagcR', 'MathUtils');
// Script/framewrok/utils/MathUtils.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MathUtils = /** @class */ (function () {
    function MathUtils() {
    }
    /**
     * 根据两个数返回他们之间的整数值
     * @param min
     * @param max
     */
    MathUtils.randomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    /**
     * 求两个数的余数
     * @param x
     * @param y
     */
    MathUtils.mathFmod = function (x, y) {
        var temp = Math.floor(x / y);
        return x - y * temp;
    };
    //检查是不是n位数字，不足补全
    MathUtils.setNumberLength = function (num, length) {
        num = num.toString();
        while (num.length < length) {
            num = '0' + num;
        }
        return num;
    };
    /**
     * 按00:00:00时分秒格式返回时间
     * @param num
     */
    MathUtils.timeFormat = function (num) {
        var hour = MathUtils.setNumberLength(Math.floor(num / 3600), 2);
        num = num % 3600;
        var min = MathUtils.setNumberLength(Math.floor(num / 60), 2);
        var sec = MathUtils.setNumberLength(num % 60, 2);
        return hour + ":" + min + ":" + sec;
    };
    return MathUtils;
}());
exports.default = MathUtils;

cc._RF.pop();