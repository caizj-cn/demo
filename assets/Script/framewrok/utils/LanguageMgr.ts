import SimpleDictionary from "./SimpleDictionary";
import { StringUtils } from "./StringUtls";
import GameConst from "../../game/data/GameConst";


export default class LanguageMgr{

    private static lanDic    :SimpleDictionary = null;
    private static hasSetup  :boolean = false;
    private static nAllExp   :RegExp = /\\n/g;
    private static paramReg  :RegExp = new RegExp("\\{(\\d+)\\}");

    //启动语言包加载
    public static setup(callFun:Function):void {
        cc.loader.loadRes(GameConst.LAN_PATH,function(err,res) {
            if(err) {
                cc.warn("lan load err")
                LanguageMgr.hasSetup = false;
                callFun(false);
                return;
            };
            LanguageMgr.analyzeLan(res,callFun);
        });
    }
    //解析【语言包】【并存放到字典中，解析成功标识启动】
    public static analyzeLan(res,callFun):void {
        if(LanguageMgr.hasSetup) {
            callFun(true);
            return;
        }
        LanguageMgr.lanDic = new SimpleDictionary();
        let languages = res.toString();
        if(StringUtils.isNullOrUndefined(languages))return;
        if(StringUtils.isEmptyString(languages))return;

        let list:string[] = languages.split("\n");
        for(let i:number = 0; i < list.length; i ++) {
            let s:String = list[i];
            if(s.indexOf("#") == 0)continue;  //注：#开头表示标识，类似于注释   
            s = s.replace(LanguageMgr.nAllExp,"\n");
            let index:number = s.indexOf(":");
            if(index != -1) {
                let key:string = s.substring(0,index);
                let value:string = s.substr(index + 1);
                value = value.split("##")[0];
                value = StringUtils.trimRight(value);
                LanguageMgr.lanDic.addItem(key,value);
            }
        }
        LanguageMgr.hasSetup = true;
        callFun(true);
    }

    //获取【语言包】【根据key,以及匹配参数:0,1,2】
    public static getTranslation(lanKey:string,...args:any):string{
        if(!LanguageMgr.hasSetup)return "";
        let lanValue = LanguageMgr.lanDic.getItem(lanKey);
        if(lanValue == null)return "";

        var obj:Object = LanguageMgr.paramReg.exec(lanValue);
        while(obj && args.length > 0)
        {
            let id:number = obj[1] as number;
            if(id >= 0 && id < args.length)
            {
                lanValue =lanValue.replace(LanguageMgr.paramReg,args[id]);
            }
            else
            {
                lanValue = lanValue.replace(LanguageMgr.paramReg,"{}");
            }
            obj = LanguageMgr.paramReg.exec(lanValue);
        }
        return lanValue;
    }
}