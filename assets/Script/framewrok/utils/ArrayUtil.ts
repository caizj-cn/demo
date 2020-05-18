/**
 * 数组工具
 */
export default class ArrayUtil 
{
    //数组转换字符串连接
    public static stringify(ary:any[]):string
    {
        let str = "";
        for (let iterator of ary) {
            str = str + " " + str.toString();
        }
        return str;
    }

    //给数组sort调用
    public static sortOn(prop)
    {
        return function (obj1, obj2) 
        {
            var val1 = obj1[prop];
            var val2 = obj2[prop];
            if (!isNaN(Number(val1)) && !isNaN(Number(val2)))
            {
                val1 = Number(val1);
                val2 = Number(val2);
            }
            if (val1 < val2) 
            {
                return -1;
            } 
            else if (val1 > val2) 
            {
                return 1;
            } 
            else 
            {
                return 0;
            }  
        } 
    }
    /**
     * 复制二维数组
     * @param array 目标数组 
     */
    public static copy2DArray(array: any[][]) 
    {
        let newArray: any[][] = [];
        for (let i = 0; i < array.length; i++) {
            newArray.push(array[i].concat());
        }
        return newArray;
    }

    /**
    * Fisher-Yates Shuffle 随机置乱算法
    * @param array 目标数组
    */
    public static fisherYatesShuffle(array: []): any[] {
        let count = array.length;
        while (count) {
            let index = Math.floor(Math.random() * count--);
            let temp = array[count];
            array[count] = array[index];
            array[index] = temp;
        }
        return array;
    }

    /**
    * 混淆数组
    * @param array 目标数组
    */
    public static confound(array: []): any[] {
        let result = array.slice().sort(() => Math.random() - .5);
        return result;
    }

    /**
     * 数组扁平化
     * @param array 目标数组
     */
    public static flattening(array: any[]) {
        for (; array.some(v => Array.isArray(v));) {    // 判断 array 中是否有数组
            array = [].concat.apply([], array); // 压扁数组
        }
        return array;
    }

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
    public static combineArrays(array1: [], array2: []): any[] {
        let newArray = [...array1, ...array2];
        return newArray;
    }

    /**
    * 获取随机数组成员
    * @param array 目标数组
    */
    public static getRandomValueInArray(array: []): any {
        let newArray = array[Math.floor(Math.random() * array.length)];
        return newArray;
    }
}
