

export default class UIViewInfo
{
    public url:string          = "";//对应prefab路径
    public name:string         = "";//对应prefab名字
    public viewTpye:number     = 0 ;//对应视图类型，同一类型则关闭其他 
    public zIndex:number       = 0 ;//视图所在zIndex
    public view:cc.Node        = null;//对应生成节点视图
    public needTween:boolean   = false;//是否需要弹窗动画
    public needAlphaBg:boolean = false;//是否需要遮罩背景
    public isCache:boolean     = false;//是否需要缓存数据

    private alphaBack:cc.Node  = null;//当前界面遮罩背景
    //创建界面aphle遮罩层
    public get alphaBackNode() :cc.Node
    {
       if(!this.needAlphaBg)return null;
       if(this.alphaBack != null)return this.alphaBack;
       this.alphaBack = new cc.Node()
       this.alphaBack.name = 'alphaBack';
       this.alphaBack.setContentSize(cc.winSize);
       this.alphaBack.on(cc.Node.EventType.TOUCH_START, function (event: cc.Event.EventCustom) {
            event.stopPropagation();
        }, this.alphaBack);
        return this.alphaBack;
    }

    public dispose()
    {
        if(this.alphaBack)
        {
            this.alphaBack.removeFromParent();
            this.alphaBack.removeAllChildren();
            this.alphaBack = null;
        }
        if(this.view)
        {
            this.view.removeFromParent();
            this.view.removeAllChildren();
            this.view.destroy();
            cc.loader.release(this.url);
        }
    }

    
}
