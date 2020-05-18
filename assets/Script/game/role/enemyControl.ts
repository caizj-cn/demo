import { RoleMoveDir, RoleState } from "../data/GameConst";
import MsgCallUtils from "../../framewrok/utils/MsgCallUtils";
import GameEvent from "../data/GameEvent";
import GameManager from "../gameManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class EnemyControl extends cc.Component 
{
    @property
    moveSpeed:number = 300;

    private sendTime:number = 0;
    private body:cc.RigidBody;
    private mapRect:cc.Rect;
    private isDeath:boolean = false;

    onLoad () 
    {

        this.body = this.node.getComponent(cc.RigidBody);
        this.mapRect = GameManager.instance.mapRect;
    }

    onDestroy() 
    {
        
    }

    // 只在两个碰撞体开始接触时被调用一次
    onBeginContact(contact, selfCollider, otherCollider)
    {
        
    }
    // 只在两个碰撞体结束接触时被调用一次
    onEndContact (contact, selfCollider, otherCollider) {
    }
    // 每次将要处理碰撞体接触逻辑时被调用
    onPreSolve (contact, selfCollider, otherCollider) {
    }
    // 每次处理完碰撞体接触逻辑时被调用
    onPostSolve (contact, selfCollider, otherCollider) {
    }

    update(dt)
    {
        if (GameManager.instance.isOver) return;
        if (this.isDeath) return;
        this.sendTime += dt;
        if (this.checkCanShoot()) 
        { //有目标
            if (this.sendTime > 10)
            {
                this.sendTime = 0;
                this.node.emit("attack");
            }
        }
        else 
        {
            this.roleMove();
        }
    }

    checkCanShoot()
    {
        return true;
    }

    roleMove()
    {
        let moveSpeed = this.body.linearVelocity;
        moveSpeed.x = -this.moveSpeed;
        if (moveSpeed.x != 0) 
        {
            if (moveSpeed.x < 0) {
                if (this.node.x < (this.mapRect.x + 150)) {
                    moveSpeed.x = 0;
                }
            }
            else {
                if (this.node.x > (this.mapRect.x + this.mapRect.width - 150)) {
                    moveSpeed.x = 0;
                }
            }
        }
        this.body.linearVelocity = moveSpeed;
    }

}
