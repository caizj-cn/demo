import SimpleDictionary from "./SimpleDictionary";

/**
 * 信息回调，类似于事件机制
 */
export default class MsgCallUtils
{
    protected static observerDic:SimpleDictionary = new SimpleDictionary();

    public static addObserver(msgType:string,context:any,callFun:Function)
    {
        let observerAry:Array<any> = MsgCallUtils.observerDic.getItem(msgType);
        if(observerAry && observerAry.length > 0)
        {
            for (let index = 0; index < observerAry.length; index++) {
                if(callFun == observerAry[index].fun)return;//已经存在的监听不在重复添加
            }
            observerAry.push({context:context,fun:callFun});
        }
        else
        {
            MsgCallUtils.observerDic.addItem(msgType,[{context:context,fun:callFun}]);
        }
    }

    public static removeObserver(msgType:string,context:any,callFun:Function)
    {
        let observerAry:Array<any> = MsgCallUtils.observerDic.getItem(msgType);
        if (observerAry != null && observerAry.length > 0){
            for (let index = 0; index < observerAry.length; index++) {
                if(context == observerAry[index].context && callFun == (observerAry[index].fun )){
                    observerAry.splice(index,1);
                    MsgCallUtils.observerDic.updateItem(msgType,observerAry);
                    if(observerAry.length < 1){
                        MsgCallUtils.observerDic.deleteItem(msgType);
                    }
                    return;
                }
            }
            
        }
    }

    public static notifyObserver(msgType:string,body:any = null)
    {
        let observerAry:Array<any> = MsgCallUtils.observerDic.getItem(msgType);
        if(observerAry != null)
        {
            let tempAry:Array<any> = [];
            tempAry = tempAry.concat(observerAry);
            tempAry.forEach(msgObj => {
                if(msgObj.fun)msgObj.fun.apply(msgObj.context,[msgType,body]);
            });
        }
    }
}