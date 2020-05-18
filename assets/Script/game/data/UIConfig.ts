import { UIViewType } from "../../framewrok/UIViewControl";
import UIViewInfo from "../../framewrok/UIViewInfo";

//测试数据
export default class UIConfig
{

    public static VIEW_LIST = 
    [
        {
            url: "/prefab/winUI",
            name: "winUI",
            isCache: true,
            viewTpye:UIViewType.popup,
            needTween:true,
            needAlphaBg:true
            
        },{
            url: "/prefab/loseUI",
            name: "loseUI",
            isCache: true,
            viewTpye:UIViewType.none,
            needTween:true,
            needAlphaBg:true
            
        }
    ]

    public static getUIInfo(name)
    {
        let info = new UIViewInfo();
        for (let index = 0; index < UIConfig.VIEW_LIST.length; index++) 
        {
            let uiInfo = UIConfig.VIEW_LIST[index];
            if(uiInfo.name == name)
            {
                info.url = uiInfo.url;
                info.name = uiInfo.name;
                info.isCache = uiInfo.isCache;
                info.viewTpye = uiInfo.viewTpye;
                info.needTween = uiInfo.needTween;
                info.needAlphaBg = uiInfo.needAlphaBg;
                return info;
            }
        }
        return null;
    }
}
