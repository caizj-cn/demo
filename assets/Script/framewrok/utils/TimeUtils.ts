/**
 * 时间工具类
 */
export class TimeUtils
{
    public static getDate():Date
    {
        return new Date();
    }

    public static getTime():number
    {
        return TimeUtils.getDate().getTime();
    }

    /**
     * 返回17:00:00的格式
     * showLen:1：时分;2：分秒；3：时分秒
     * @param pdate 
     */
    public static timeFormat(pNum:number,showLen:number):String
    {
        var hour:number = Math.floor(pNum / 3600);
        var minute:number = Math.floor((pNum % 3600) / 60);
        var second:number = Math.floor(((pNum % 3600) % 60));
        
        var str:String = "";
        if(showLen == 3)
        {
            str = TimeUtils.getIntStrAtLength(hour, 2);
            str += ":" + TimeUtils.getIntStrAtLength(minute, 2);
            str += ":" + TimeUtils.getIntStrAtLength(second, 2);
        }
        else if(showLen == 2)
        {
            str = TimeUtils.getIntStrAtLength(minute, 2);
            str += ":" + TimeUtils.getIntStrAtLength(second, 2);
        }
        else if(showLen == 1)
        {
            str = TimeUtils.getIntStrAtLength(hour, 2);
            str += ":" + TimeUtils.getIntStrAtLength(minute, 2);
        }
        return str;
    }


    /**
     * 返回2019-10-11 17:00:00的格式
     * @param pdate 
     */
    public static dateFormat(pdate:Date) : String
    {
        var str:String = "";
        str += "" + pdate.getFullYear();
        str += "-" + (pdate.getMonth() + 1);
        str += "-" + pdate.getDate();
        str += "  " + TimeUtils.getIntStrAtLength(pdate.getHours(), 2);
        str += ":" + TimeUtils.getIntStrAtLength(pdate.getMinutes(), 2);
        str += ":" + TimeUtils.getIntStrAtLength(pdate.getSeconds(), 2);
        return str;
    }
        
    /**
     * 返回指定数字中从第0位开始len长度的数字的字符串形式
     * 比如getIntStrAtLength(10221,3)返回102
     * @param figure
     * @param len
     */
    public static getIntStrAtLength(figure:number, len:number): String
    {
        var _loc_3:string = figure.toString();
        if (len > 1)
        {
            if (_loc_3.length > len)
            {
                _loc_3 = _loc_3.substr(-len);//取后两位
            }
            else
            {
                while (_loc_3.length < len)
                {
                    
                    _loc_3 = "0" + _loc_3;
                }
            }
        }
        return _loc_3;
    }
}