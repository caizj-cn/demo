import { RoleMoveDir, RoleState } from "../data/GameConst";
import MsgCallUtils from "../../framewrok/utils/MsgCallUtils";
import GameEvent from "../data/GameEvent";
import GameManager from "../gameManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RoleControl extends cc.Component 
{
    @property
    moveSpeed:number = 300;
    @property
    jumpSpeed:number = 500;
    @property
    jumpCount:number = 2;//可连续跳跃次数

    private moveDir:number;//当前朝向

    private roleState:number = RoleState.idel;
    private jumping:boolean = false;
    private body:cc.RigidBody;
    private mapRect:cc.Rect;
    private isDeath:boolean = false;

    onLoad () 
    {
        this.moveDir = RoleMoveDir.none;
        this.body = this.node.getComponent(cc.RigidBody);
        this.mapRect = GameManager.instance.mapRect
        MsgCallUtils.addObserver(GameEvent.SPINE_INITED,this,this.spineInited);
    }

    spineInited(msg:string,obj:object)
    {
        //监听键盘事件
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this);
    }


    onDestroy() 
    {
        MsgCallUtils.removeObserver(GameEvent.SPINE_INITED,this,this.spineInited);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this);
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

    onKeyDown(event) 
    {
        switch (event.keyCode) 
        {
            case cc.macro.KEY.left:
            case cc.macro.KEY.a:
                this.setDir(RoleMoveDir.left);
                break;
            case cc.macro.KEY.right:
            case cc.macro.KEY.d:
                this.setDir(RoleMoveDir.right);
                break;
            case cc.macro.KEY.up:
            case cc.macro.KEY.w:
                this.jumping = true;
                break;
            case cc.macro.KEY.enter:
                this.node.emit("switchSkin");
                break;
            case cc.macro.KEY.space:
                this.node.emit("fight");
                break;
        }
        
    }
    onKeyUp(event)
    {
        var roleSpeed = this.body.linearVelocity;
        switch (event.keyCode) 
        {
            case cc.macro.KEY.left:
            case cc.macro.KEY.a:
                this.setDir(RoleMoveDir.none);
                break;
            case cc.macro.KEY.right:
            case cc.macro.KEY.d:
                this.setDir(RoleMoveDir.none);
                break;
            case cc.macro.KEY.up:
            case cc.macro.KEY.w:
                this.jumping = false;
                break;
            case cc.macro.KEY.enter:
                // this.node.emit("switchSkin");//更改方向
                break;
            case cc.macro.KEY.space:
                // this.node.emit("switchSkin");//更改方向
                break;
        }
    }

    update(dt)
    {
        if(this.isDeath)return;
        if(GameManager.instance.isOver)return;
        let moveSpeed = this.body.linearVelocity;
        moveSpeed.x = this.moveDir*this.moveSpeed;
        if (Math.abs(moveSpeed.y) < 1) {
            this.jumpCount = 2;
        }
        if(this.jumpCount > 0 && this.jumping)
        {
            moveSpeed.y = this.jumpSpeed;
            this.jumpCount--;
        }
        if(this.jumping)    
        {
            this.setState(RoleState.jump);
        }
        else
        {
            if(moveSpeed.x != 0)
            {
                this.setState(RoleState.walk);
            }
            else
            {
                this.setState(RoleState.idel);
            }
        }

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

    //设置方向
    setDir(value)
    {
        if(this.moveDir == value)return;
        this.moveDir = value;
        if(this.moveDir != RoleMoveDir.none)this.node.emit("changeDir", this.moveDir);//更改方向
    }

    //设置角色动作
    setState(value) 
    {
        if (this.roleState == value) return;
        this.roleState = value;
        this.node.emit("changeState", this.roleState);//更改动作
        
    }
}
