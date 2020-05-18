import GameManager from "../game/gameManager";

//摄像机跟随
const {ccclass, property} = cc._decorator;

@ccclass
export default class CameraFollow extends cc.Component {

    @property(cc.Node)
    target:cc.Node = null;

    @property(cc.Node)
    map:cc.Node = null;

    private mapRect:cc.Rect;
    private minX:number;
    private maxX:number;
    private minY:number;
    private maxY:number;

    onLoad () 
    {
        if (!this.target || !this.map) return;
        let  widget = this.node.getComponent(cc.Widget);
        if(widget)widget.updateAlignment();
        
        this.mapRect = this.map.getBoundingBox();
        this.minX = 0;
        this.maxX = this.mapRect.width - cc.winSize.width;
        this.minY = 0;
        this.maxY = this.mapRect.height - cc.winSize.height;

        GameManager.instance.cameraPos = cc.v2(this.node.x,this.node.y);
    }

    lateUpdate (dt) 
    {
        if (!this.target) return;
        let targetPos = this.target.convertToWorldSpaceAR(cc.Vec2.ZERO);
        let nodePos = this.node.parent.convertToNodeSpaceAR(targetPos);
        if (nodePos.x < this.minX) nodePos.x = this.minX;
        else if (nodePos.x > this.maxX) nodePos.x = this.maxX;

        if (nodePos.y < this.minY) nodePos.y = this.minY;
        else if (nodePos.y > this.maxY) nodePos.y = this.maxY;
        this.node.setPosition(nodePos);
        GameManager.instance.cameraPos = nodePos;
    }
}
