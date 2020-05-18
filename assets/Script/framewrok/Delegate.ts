/**
 * 事件代理类
 */

export class Delegate
{
    public eArgs:any[];
    public eListener:Function;
    public once:boolean;//是否监听一次

    public constructor(listener:Function,args:any[],isOnce:boolean = false)
    {
        this.eListener = listener;
        this.eArgs = args;
        this.once = isOnce;
    }

    public get listener()
    {
        return this.eListener;
    }

    public set isOnce(value:boolean)
    {
        this.once = value;
    }
    public get isOnce():boolean
    {
        return this.once;
    }
}