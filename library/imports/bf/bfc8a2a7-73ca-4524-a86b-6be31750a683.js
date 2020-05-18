"use strict";
cc._RF.push(module, 'bfc8aKnc8pFJKhra+MXUKaD', 'EnemyData');
// Script/game/data/EnemyData.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//测试数据
var EnemyData = /** @class */ (function () {
    function EnemyData() {
    }
    EnemyData.enemyList = [
        {
            type: 1,
            hp: 1000,
            attack: 40,
            count: 10,
            findX: 40,
            shootArea: 1000,
        },
        {
            type: 2,
            hp: 1500,
            attack: 50,
            count: 10,
            findX: 40,
            shootArea: 1000,
        }
    ];
    return EnemyData;
}());
exports.default = EnemyData;

cc._RF.pop();