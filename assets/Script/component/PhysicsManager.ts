const {ccclass, property} = cc._decorator;

//物理组件控制
@ccclass
export default class PhysicsManager extends cc.Component 
{
    @property({tooltip:"是否开启物理引擎"})
    active:boolean = true;

    @property({tooltip:"是否显示包围盒"})
    aabb:boolean = true;

    @property({tooltip:"是否显示关节连接线"})
    joint:boolean = true;

    @property({tooltip:"是否填充形状"})
    shape:boolean = true;

    @property({tooltip:"重力值"})
    gravity:cc.Vec2 = cc.v2(0,0);

    onEnable()
    {
        let physicsManager = cc.director.getPhysicsManager();
        cc.director.getCollisionManager().enabled = true;
        if (!this.active) return;
        //根据状态开启或者关闭物理系统
        physicsManager.enabled = this.active;
        // physicsManager.gravity = this.gravity;

        //设置调试标志
        let drawBits = cc.PhysicsManager.DrawBits;
        if (CC_PREVIEW) {
            physicsManager.debugDrawFlags = 
            (this.aabb && drawBits.e_aabbBit) |
            (this.joint && drawBits.e_jointBit) |
            (this.shape && drawBits.e_shapeBit);
        } else {
            physicsManager.debugDrawFlags = 0;
        }  
    }

    onDisable () 
    {
        let physicsManager = cc.director.getPhysicsManager();
        physicsManager.debugDrawFlags = 0;
        physicsManager.enabled = false;
    }

}
