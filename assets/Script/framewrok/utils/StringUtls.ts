export class StringUtils
{
    public static trimLeft(pString:string):string 
    {
        if (pString == null) { return ''; }
        return pString.replace(/^\s+/, '');
    }

    public static trimRight(pString:string):string 
    {
        if (pString == null) { return ''; }
        return pString.replace(/\s+$/, '');
    }

    public static trim(pString:string):string 
    {
        if (pString == null) { return ''; }
        return pString.replace(/^\s+|\s+$/g, '');
    }

    public static isNullOrUndefined(pString:string):boolean
    {
        if(pString == null || pString === undefined)return true;
        return false;
    }

    public static isEmptyString(pString:string):boolean
    {
        if(pString === "")return true;
        return false;
    }

    /**ArrayBuffer转为字符串，或者字符串转为ArrayBuffer，。
     * 有一个前提，即字符串的编码方法是确定的;假定字符串采用UTF-16编码（JavaScript的内部编码方式） 
     */
    // ArrayBuffer转为字符串，参数为ArrayBuffer对象
    public static abToStr(buf)
    {
        return String.fromCharCode.apply(null, new Uint16Array(buf));
    }
    // 字符串转为ArrayBuffer对象，参数为字符串
    public static StrToab(str)
    {
        var buf = new ArrayBuffer(str.length*2); // 每个字符占用2个字节
        var bufView = new Uint16Array(buf);
        for (var i=0, strLen=str.length; i<strLen; i++) 
        {
            bufView[i] = str.charCodeAt(i);
        }
     return buf;
    }

    public static format(str:String,...args):String
    {
        if(args == null || args.length <= 0)
        {
            return str;
        }
        for(var i:number = 0; i < args.length; i++)
        {
            str = str.replace("{"+i.toString()+"}",args[i]);
        }
        return str;
    }

    //根据参数最后一项来确定拼接后的字符串格式
    public static splitFormat(...args)
    {
        let result:string = "";
        if(args == null || args.length <= 0)
        {
            return result;
        }
        let patten:string = args[args.length-1];
        for(var i:number = 0; i < args.length - 1; i++)
        {
            result += args[i] + patten;
        }
        result = result.substring(0,result.lastIndexOf(patten));
        return result;
    }
}