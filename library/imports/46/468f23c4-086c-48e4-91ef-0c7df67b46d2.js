"use strict";
cc._RF.push(module, '468f2PECGxI5JHvDH32e0bS', 'ArrayUtil');
// Script/framewrok/utils/ArrayUtil.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 数组工具
 */
var ArrayUtil = /** @class */ (function () {
    function ArrayUtil() {
    }
    //数组转换字符串连接
    ArrayUtil.stringify = function (ary) {
        var str = "";
        for (var _i = 0, ary_1 = ary; _i < ary_1.length; _i++) {
            var iterator = ary_1[_i];
            str = str + " " + str.toString();
        }
        return str;
    };
    //给数组sort调用
    ArrayUtil.sortOn = function (prop) {
        return function (obj1, obj2) {
            var val1 = obj1[prop];
            var val2 = obj2[prop];
            if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
                val1 = Number(val1);
                val2 = Number(val2);
            }
            if (val1 < val2) {
                return -1;
            }
            else if (val1 > val2) {
                return 1;
            }
            else {
                return 0;
            }
        };
    };
    /**
     * 复制二维数组
     * @param array 目标数组
     */
    ArrayUtil.copy2DArray = function (array) {
        var newArray = [];
        for (var i = 0; i < array.length; i++) {
            newArray.push(array[i].concat());
        }
        return newArray;
    };
    /**
    * Fisher-Yates Shuffle 随机置乱算法
    * @param array 目标数组
    */
    ArrayUtil.fisherYatesShuffle = function (array) {
        var count = array.length;
        while (count) {
            var index = Math.floor(Math.random() * count--);
            var temp = array[count];
            array[count] = array[index];
            array[index] = temp;
        }
        return array;
    };
    /**
    * 混淆数组
    * @param array 目标数组
    */
    ArrayUtil.confound = function (array) {
        var result = array.slice().sort(function () { return Math.random() - .5; });
        return result;
    };
    /**
     * 数组扁平化
     * @param array 目标数组
     */
    ArrayUtil.flattening = function (array) {
        for (; array.some(function (v) { return Array.isArray(v); });) { // 判断 array 中是否有数组
            array = [].concat.apply([], array); // 压扁数组
        }
        return array;
    };
    // /**
    // * 数组去重
    // * @param array 目标数组
    // */
    // public static removeRepeated(array: []): any[] {
    //     let newArray = [...new Set(array)];
    //     return newArray;
    // }
    /**
    * 合并数组
    * @param array1 目标数组1
    * @param array2 目标数组2
    */
    ArrayUtil.combineArrays = function (array1, array2) {
        var newArray = array1.concat(array2);
        return newArray;
    };
    /**
    * 获取随机数组成员
    * @param array 目标数组
    */
    ArrayUtil.getRandomValueInArray = function (array) {
        var newArray = array[Math.floor(Math.random() * array.length)];
        return newArray;
    };
    return ArrayUtil;
}());
exports.default = ArrayUtil;

cc._RF.pop();