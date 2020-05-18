// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameManager from "../gameManager";
import MsgCallUtils from "../../framewrok/utils/MsgCallUtils";
import UIConfig from "../data/UIConfig";
import GameEvent from "../data/GameEvent";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FactoryNode extends cc.Component {

    @property(cc.ProgressBar)
    hpBar:cc.ProgressBar = null;
    @property
    totalHp:number = 100;

    private curHp:number;
    start () {
        this.curHp = this.totalHp;
    }

    onCollisionEnter(other,self) 
    {
        if(GameManager.instance.isOver)return;
        if(other.node.name == "roleBullet" && self.node.name == "rightFactory")
        {
            this.curHp -= 5;
            this.hpBar.progress = this.curHp / this.totalHp;
            if(this.curHp <= 0)
            {
                GameManager.instance.isOver = true;
                let info = UIConfig.getUIInfo("winUI");
                MsgCallUtils.notifyObserver(GameEvent.SHOW_UIVIEW,info);
            }
        }

    }

}
