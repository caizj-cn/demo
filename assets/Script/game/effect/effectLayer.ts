import MsgCallUtils from "../../framewrok/utils/MsgCallUtils";
import GameEvent from "../data/GameEvent";
import Bullet from "./bullet";
import Fire from "./fire";
import RoleBullet from "./roleBullet";

const {ccclass, property} = cc._decorator;

@ccclass
export default class EffectLayer extends cc.Component 
{
    @property(cc.Prefab)
    bulletPrefab:cc.Prefab = null;//工厂子弹类型

    @property(cc.Prefab)
    roleBulletPrefab:cc.Prefab = null;//玩家子弹类型

    @property
    roleBullets:number[] = [];

    @property(cc.Prefab)
    firePrefab:cc.Prefab = null;

    @property(cc.SpriteAtlas)
    bullet_atlas:cc.SpriteAtlas = null;

    private bulletPool:cc.NodePool = null;
    private bulletInitCount:number = 10;

    private firePool:cc.NodePool = null;
    private fireInitCount:number = 1;

    private roleBulletPool:cc.NodePool = null;
    private roleBulletInitCount:number = 10;

    onLoad()
    {
        this.bulletPool = new cc.NodePool(Bullet);
        for (let index = 0; index < this.bulletInitCount; index++) 
        {
            let bullet = cc.instantiate(this.bulletPrefab);
            this.bulletPool.put(bullet);
        }

        this.roleBulletPool = new cc.NodePool(RoleBullet);
        for (let index = 0; index < this.roleBulletInitCount; index++) 
        {
            let roleBullet = cc.instantiate(this.roleBulletPrefab);
            this.roleBulletPool.put(roleBullet);
        }

        this.firePool = new cc.NodePool(Fire);
        for (let index = 0; index < this.fireInitCount; index++) 
        {
            let fire = cc.instantiate(this.firePrefab);
            this.firePool.put(fire);
        }
        MsgCallUtils.addObserver(GameEvent.PLAYER_SHOOT,this,this.createRoleBullet);
        MsgCallUtils.addObserver(GameEvent.PLAYER_END_SHOOT,this,this.onHeroBulletDestory);
        MsgCallUtils.addObserver(GameEvent.FIRE_MC,this,this.onBulletFire);
        MsgCallUtils.addObserver(GameEvent.END_FIRE,this,this.onFireDestory);
        MsgCallUtils.addObserver(GameEvent.FACTORY_SHOOT,this,this.createBullet);
        MsgCallUtils.addObserver(GameEvent.END_SHOOT,this,this.onBulletDestory);
    }

    createRoleBullet(msg:string,obj:object) 
    {
        let shootData = obj;
        let roleBullet:cc.Node = null;
        shootData["bullet_atlas"] = this.bullet_atlas;
        if (this.roleBulletPool.size() > 0)
        {
            roleBullet = this.roleBulletPool.get(shootData);
        } 
        else 
        { // 如果没有空闲对象，就用 cc.instantiate 重新创建,这里未调用reuse方法
            roleBullet = cc.instantiate(this.roleBulletPrefab);
            //可以用下面方式调用reuse方法
            let bulletComponent = roleBullet.getComponent(RoleBullet);
            bulletComponent.reuse(shootData);
        }
        roleBullet.parent = this.node;
    }

    createBullet(msg:string,obj:object) 
    {
        let shootData = obj;
        let bullet:cc.Node = null;
        shootData["bullet_atlas"] = this.bullet_atlas;
        if (this.bulletPool.size() > 0)
        {
            bullet = this.bulletPool.get(shootData);
        } 
        else 
        { // 如果没有空闲对象，就用 cc.instantiate 重新创建,这里未调用reuse方法
            bullet = cc.instantiate(this.bulletPrefab);
            //可以用下面方式调用reuse方法
            let bulletComponent = bullet.getComponent(Bullet);
            bulletComponent.reuse(shootData);
        }
        bullet.parent = this.node;
    }

    onBulletFire(msg:string,obj:object) 
    {
        let shootData = obj;
        let fire:cc.Node = null;
        shootData["bullet_atlas"] = this.bullet_atlas;
        if (this.firePool.size() > 0)
        {
            fire = this.firePool.get(shootData);
        } 
        else 
        { // 如果没有空闲对象，就用 cc.instantiate 重新创建,这里未调用reuse方法
            fire = cc.instantiate(this.firePrefab);

            //可以用下面方式调用reuse方法
            let fireComponent = fire.getComponent(Fire);
            fireComponent.reuse(shootData);
        }
        fire.parent = this.node;
    }

    onBulletDestory(msg:string,obj:object)
    {
        let bullet = obj as cc.Node;
        if (this.bulletPool) 
        {
            // 将节点放进对象池，这个方法会同时调用节点的 removeFromParent();
            this.bulletPool.put(bullet);
        }
        else 
        {
            bullet.removeFromParent(true);
            bullet.destroy();
        }
    }

    onHeroBulletDestory(msg:string,obj:object)
    {
        let bullet = obj as cc.Node;
        if (this.roleBulletPool) 
        {
            this.roleBulletPool.put(bullet);// 
        }
        else 
        {
            bullet.removeFromParent(true);
            bullet.destroy();
        }
    }

    onFireDestory(msg:string,obj:object)
    {
        let fire = obj as cc.Node;
        if (this.firePool) 
        {
            this.firePool.put(fire);// 将节点放进对象池，这个方法会同时调用节点的 removeFromParent();
        }
        else 
        {
            fire.removeFromParent(true);
            fire.destroy();
        }
    }

    onDestroy()
    {
        MsgCallUtils.removeObserver(GameEvent.PLAYER_SHOOT,this,this.createRoleBullet);
        MsgCallUtils.removeObserver(GameEvent.END_SHOOT,this,this.onBulletDestory);
        MsgCallUtils.removeObserver(GameEvent.FIRE_MC,this,this.onBulletFire);
        MsgCallUtils.removeObserver(GameEvent.END_FIRE,this,this.onFireDestory);
        MsgCallUtils.removeObserver(GameEvent.FACTORY_SHOOT,this,this.createBullet);
        MsgCallUtils.removeObserver(GameEvent.PLAYER_END_SHOOT,this,this.onHeroBulletDestory);
    }
}
