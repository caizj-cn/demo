"use strict";
cc._RF.push(module, '47194JVkp9F/rFu4aSY6EsD', 'gameManager');
// Script/game/gameManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//管理游戏全局相关数据
var GameManager = /** @class */ (function () {
    function GameManager() {
        this.curScene = "";
        this.touchDown = false;
        this.scaleFactor = 1; //当前缩放因子
        this.chapterNum = 1;
        this.chapterNodeIndex = 5;
        this.isOver = false;
    }
    Object.defineProperty(GameManager, "instance", {
        get: function () {
            if (this._instance == null) {
                this._instance = new GameManager();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    GameManager._instance = null;
    return GameManager;
}());
exports.default = GameManager;

cc._RF.pop();