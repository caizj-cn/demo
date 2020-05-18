"use strict";
cc._RF.push(module, '3b0103lo/tCP6pzS8oaI06E', 'UIViewInfo');
// Script/framewrok/UIViewInfo.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UIViewInfo = /** @class */ (function () {
    function UIViewInfo() {
        this.url = ""; //对应prefab路径
        this.name = ""; //对应prefab名字
        this.viewTpye = 0; //对应视图类型，同一类型则关闭其他 
        this.zIndex = 0; //视图所在zIndex
        this.view = null; //对应生成节点视图
        this.needTween = false; //是否需要弹窗动画
        this.needAlphaBg = false; //是否需要遮罩背景
        this.isCache = false; //是否需要缓存数据
        this.alphaBack = null; //当前界面遮罩背景
    }
    Object.defineProperty(UIViewInfo.prototype, "alphaBackNode", {
        //创建界面aphle遮罩层
        get: function () {
            if (!this.needAlphaBg)
                return null;
            if (this.alphaBack != null)
                return this.alphaBack;
            this.alphaBack = new cc.Node();
            this.alphaBack.name = 'alphaBack';
            this.alphaBack.setContentSize(cc.winSize);
            this.alphaBack.on(cc.Node.EventType.TOUCH_START, function (event) {
                event.stopPropagation();
            }, this.alphaBack);
            return this.alphaBack;
        },
        enumerable: true,
        configurable: true
    });
    UIViewInfo.prototype.dispose = function () {
        if (this.alphaBack) {
            this.alphaBack.removeFromParent();
            this.alphaBack.removeAllChildren();
            this.alphaBack = null;
        }
        if (this.view) {
            this.view.removeFromParent();
            this.view.removeAllChildren();
            this.view.destroy();
            cc.loader.release(this.url);
        }
    };
    return UIViewInfo;
}());
exports.default = UIViewInfo;

cc._RF.pop();