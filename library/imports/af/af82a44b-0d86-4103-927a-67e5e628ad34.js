"use strict";
cc._RF.push(module, 'af82aRLDYZBA5J6Z+XmKK00', 'UIViewControl');
// Script/framewrok/UIViewControl.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SimpleDictionary_1 = require("./utils/SimpleDictionary");
var MsgCallUtils_1 = require("./utils/MsgCallUtils");
var GameEvent_1 = require("../game/data/GameEvent");
var ArrayUtil_1 = require("./utils/ArrayUtil");
//定义UIView视图数据格式
var UIViewType;
(function (UIViewType) {
    UIViewType[UIViewType["none"] = 0] = "none";
    UIViewType[UIViewType["main"] = 1] = "main";
    UIViewType[UIViewType["popup"] = 2] = "popup";
})(UIViewType = exports.UIViewType || (exports.UIViewType = {}));
var UIViewControl = /** @class */ (function () {
    function UIViewControl() {
        this.alphaBack = null; //通用遮罩背景
        this.hasSetup = false;
        this.baseZIndex = 10; //设置默认zInde
    }
    Object.defineProperty(UIViewControl, "instance", {
        get: function () {
            if (this._instance == null) {
                this._instance = new UIViewControl();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    UIViewControl.prototype.setup = function () {
        this.loadingDic = new SimpleDictionary_1.default();
        this.openViewDic = new SimpleDictionary_1.default();
        this.closeCacheViewDic = new SimpleDictionary_1.default();
        MsgCallUtils_1.default.addObserver(GameEvent_1.default.SHOW_UIVIEW, this, this.showUIView);
        MsgCallUtils_1.default.addObserver(GameEvent_1.default.CLOSE_UIVIEW, this, this.closeUIView);
        this.hasSetup = true;
    };
    UIViewControl.prototype.showViewTween = function (node, isPopup, callBack) {
        if (node == null) {
            return;
        }
        if (isPopup == true) {
            node.opacity = 0;
            node.setScale(0.1);
            var fadeIn = cc.fadeIn(0.2);
            var scaleTo = cc.scaleTo(0.2, 1);
            cc.tween(node).
                then(fadeIn).
                then(scaleTo).
                call(function () {
                if (callBack)
                    callBack();
            }.bind(node)).start();
        }
        else {
            node.opacity = 1;
            node.setScale(1);
            var fadeOut = cc.fadeOut(0.2);
            var scaleTo = cc.scaleTo(0.2, 0.1);
            cc.tween(node).
                then(fadeOut).
                then(scaleTo).
                call(function () {
                if (callBack)
                    callBack();
            }.bind(node)).start();
        }
    };
    //调用界面关闭
    UIViewControl.prototype.closeUIView = function (msg, obj) {
        if (!this.hasSetup) {
            cc.log("UIViewControl has not setup");
            return;
        }
        var url = obj;
        var uiInfo = this.openViewDic.getItem(url);
        if (uiInfo == null)
            return;
        this.openViewDic.deleteItem(uiInfo.url);
        this.showViewTween(uiInfo.view, false, function () {
            if (uiInfo.isCache) {
                this.closeCacheViewDic.addItem(uiInfo.url, uiInfo);
                uiInfo.view.parent = null;
                if (uiInfo.alphaBackNode)
                    uiInfo.alphaBackNode.parent = null;
            }
            else {
                uiInfo.dispose();
            }
        }.bind(this));
        this.refreshViewIndex();
    };
    //外部派发事件，传递对应UIView参数即可打开界面
    UIViewControl.prototype.showUIView = function (msg, obj) {
        if (!this.hasSetup) {
            cc.log("UIViewControl has not setup");
            return;
        }
        var uiInfo = obj;
        if (uiInfo == null)
            return;
        var canvas = cc.director.getScene().getChildByName('Canvas');
        if (this.openViewDic.getItem(uiInfo.url)) //已经打开了，则重新设置zIndex
         {
            uiInfo = this.openViewDic.getItem(uiInfo.url);
            uiInfo.zIndex = this.getViewIndex();
            this.refreshViewIndex();
        }
        else {
            if (this.closeCacheViewDic.getItem(uiInfo.url)) //处于缓存关闭状态，移除缓存，添加到打开列表
             {
                uiInfo = this.closeCacheViewDic.getItem(uiInfo.url);
                this.closeCacheViewDic.deleteItem(uiInfo.url);
                this.openViewDic.addItem(uiInfo.url, uiInfo);
                this.resetView(uiInfo);
            }
            else //请求加载
             {
                this.loadUIView(uiInfo, function (viewNode) {
                    if (!viewNode) {
                        cc.log("prefab load error");
                        return;
                    }
                    //加载完成
                    this.loadingDic.deleteItem(uiInfo.url);
                    this.openViewDic.addItem(uiInfo.url, uiInfo);
                    //添加到舞台
                    uiInfo.view = viewNode;
                    uiInfo.zIndex = this.getViewIndex();
                    this.resetView(uiInfo);
                }.bind(this));
            }
        }
    };
    UIViewControl.prototype.resetView = function (uiInfo) {
        uiInfo.zIndex = this.getViewIndex();
        var canvas = cc.director.getScene().getChildByName('Canvas');
        if (uiInfo.needAlphaBg && uiInfo.alphaBackNode)
            uiInfo.alphaBackNode.parent = canvas;
        uiInfo.view.parent = canvas;
        if (uiInfo.needTween) {
            this.showViewTween(uiInfo.view, true, function () {
                this.refreshViewIndex();
            }.bind(this));
        }
    };
    //加载UI视图，loadPrefab
    UIViewControl.prototype.loadUIView = function (uiInfo, callBack) {
        var canvas = cc.director.getScene().getChildByName('Canvas');
        if (this.loadingDic[uiInfo.url]) //已经处于加载中了
         {
            // canvas.once(uiInfo.url, function (node) 
            // {
            //     callBack(node);
            // });
            // return;
        }
        else {
            this.loadingDic.addItem(uiInfo.url, uiInfo);
        }
        cc.loader.loadRes(uiInfo.url, cc.Prefab, function (err, prefab) {
            if (!err) {
                this.loadingDic.deleteItem(uiInfo.url);
                var node = cc.instantiate(prefab);
                node.group = "ui";
                callBack(node);
            }
            else {
                callBack(null);
            }
        }.bind(this));
    };
    UIViewControl.prototype.getViewIndex = function () {
        var result = 0;
        for (var key in this.openViewDic) {
            var info = this.openViewDic.getItem(key);
            if (!info)
                continue;
            if (info.needAlphaBg && info.alphaBackNode) {
                result += 2;
            }
            else {
                result += 1;
            }
        }
        return result;
    };
    UIViewControl.prototype.refreshViewIndex = function () {
        var openAry = this.openViewDic.getValues();
        openAry.sort(ArrayUtil_1.default.sortOn("zIndex"));
        var zIndex = -1;
        for (var index = 0; index < openAry.length; index++) {
            var info = openAry[index];
            var node = info.view;
            if (info.needAlphaBg && info.alphaBackNode) {
                zIndex += 2;
                info.alphaBackNode.zIndex = zIndex - 1;
                node.zIndex = zIndex;
            }
            else {
                zIndex += 1;
                node.zIndex = zIndex;
            }
        }
    };
    UIViewControl.prototype.dispose = function () {
        this.hasSetup = false;
        this.loadingDic.clear();
        this.openViewDic.clear();
        this.closeCacheViewDic.clear();
        MsgCallUtils_1.default.removeObserver(GameEvent_1.default.SHOW_UIVIEW, this, this.showUIView);
        MsgCallUtils_1.default.removeObserver(GameEvent_1.default.CLOSE_UIVIEW, this, this.closeUIView);
    };
    return UIViewControl;
}());
exports.default = UIViewControl;

cc._RF.pop();