import GameManager from "../gameManager";
import MsgCallUtils from "../../framewrok/utils/MsgCallUtils";
import GameEvent from "../data/GameEvent";
import EnemyData from "../data/EnemyData";
import EnemyRole from "./EnemyRole";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RoleLayer extends cc.Component {

    @property(cc.Node)
    enemyFactory: cc.Node = null;
    @property(cc.Prefab)
    enemyPrefab:cc.Prefab = null;
    @property
    deltaEnemyTime:number = 10;

    private timeCount:number = 0;

    private enemyInitCount:number = 5;
    private enemyList = [];
    private enemyPool:cc.NodePool = null;

    onLoad()
    {
        this.enemyList = EnemyData.enemyList;
        this.enemyPool = new cc.NodePool(EnemyRole);
        for (let index = 0; index < this.enemyInitCount; index++) 
        {
            let enemy = cc.instantiate(this.enemyPrefab);
            this.enemyPool.put(enemy);
        }
    }

    start () 
    {

    }

    update (dt) 
    {
        return;
        if(GameManager.instance.isOver)return;
        this.timeCount += dt;
        if(this.timeCount < this.deltaEnemyTime)return;
        let enemyInfo = this.enemyList.shift();
        this.createEnemy(enemyInfo);
        this.timeCount = 0;       
    }

    createEnemy(enemyInfo:object)
    {
        let enemyRole;
        if (this.enemyPool.size() > 0)
        {
            enemyRole = this.enemyPool.get(EnemyRole);
        } 
        else 
        { // 如果没有空闲对象，就用 cc.instantiate 重新创建,这里未调用reuse方法
            enemyRole = cc.instantiate(this.enemyPrefab);
            //可以用下面方式调用reuse方法
            let bulletComponent = enemyRole.getComponent(EnemyRole);
            bulletComponent.reuse(enemyInfo);
        }
        enemyRole.x = this.enemyFactory.x;
        enemyRole.y = this.enemyFactory.y;
        enemyRole.parent = this.node;
    }
}
