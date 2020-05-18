const {ccclass, property} = cc._decorator;

@ccclass
export default class Floor extends cc.Component 
{
    private points:cc.Vec2[];

    onLoad()
    {
        let pc = this.node.getComponent(cc.PolygonCollider);
        this.points = pc.points;

        let ppc = this.node.getComponent(cc.PhysicsPolygonCollider);
        ppc.points = this.points;
    }

}
