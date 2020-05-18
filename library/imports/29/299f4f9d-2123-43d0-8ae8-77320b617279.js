"use strict";
cc._RF.push(module, '299f4+dISND0IrodzILYXJ5', 'LanguageMgr');
// Script/framewrok/utils/LanguageMgr.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SimpleDictionary_1 = require("./SimpleDictionary");
var StringUtls_1 = require("./StringUtls");
var GameConst_1 = require("../../game/data/GameConst");
var LanguageMgr = /** @class */ (function () {
    function LanguageMgr() {
    }
    //启动语言包加载
    LanguageMgr.setup = function (callFun) {
        cc.loader.loadRes(GameConst_1.default.LAN_PATH, function (err, res) {
            if (err) {
                cc.warn("lan load err");
                LanguageMgr.hasSetup = false;
                callFun(false);
                return;
            }
            ;
            LanguageMgr.analyzeLan(res, callFun);
        });
    };
    //解析【语言包】【并存放到字典中，解析成功标识启动】
    LanguageMgr.analyzeLan = function (res, callFun) {
        if (LanguageMgr.hasSetup) {
            callFun(true);
            return;
        }
        LanguageMgr.lanDic = new SimpleDictionary_1.default();
        var languages = res.toString();
        if (StringUtls_1.StringUtils.isNullOrUndefined(languages))
            return;
        if (StringUtls_1.StringUtils.isEmptyString(languages))
            return;
        var list = languages.split("\n");
        for (var i = 0; i < list.length; i++) {
            var s = list[i];
            if (s.indexOf("#") == 0)
                continue; //注：#开头表示标识，类似于注释   
            s = s.replace(LanguageMgr.nAllExp, "\n");
            var index = s.indexOf(":");
            if (index != -1) {
                var key = s.substring(0, index);
                var value = s.substr(index + 1);
                value = value.split("##")[0];
                value = StringUtls_1.StringUtils.trimRight(value);
                LanguageMgr.lanDic.addItem(key, value);
            }
        }
        LanguageMgr.hasSetup = true;
        callFun(true);
    };
    //获取【语言包】【根据key,以及匹配参数:0,1,2】
    LanguageMgr.getTranslation = function (lanKey) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!LanguageMgr.hasSetup)
            return "";
        var lanValue = LanguageMgr.lanDic.getItem(lanKey);
        if (lanValue == null)
            return "";
        var obj = LanguageMgr.paramReg.exec(lanValue);
        while (obj && args.length > 0) {
            var id = obj[1];
            if (id >= 0 && id < args.length) {
                lanValue = lanValue.replace(LanguageMgr.paramReg, args[id]);
            }
            else {
                lanValue = lanValue.replace(LanguageMgr.paramReg, "{}");
            }
            obj = LanguageMgr.paramReg.exec(lanValue);
        }
        return lanValue;
    };
    LanguageMgr.lanDic = null;
    LanguageMgr.hasSetup = false;
    LanguageMgr.nAllExp = /\\n/g;
    LanguageMgr.paramReg = new RegExp("\\{(\\d+)\\}");
    return LanguageMgr;
}());
exports.default = LanguageMgr;

cc._RF.pop();