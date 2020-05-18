"use strict";
cc._RF.push(module, '04b79qBZxpP9rmKTj8Yo54n', 'roleLayer');
// Script/game/role/roleLayer.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var gameManager_1 = require("../gameManager");
var EnemyData_1 = require("../data/EnemyData");
var EnemyRole_1 = require("./EnemyRole");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RoleLayer = /** @class */ (function (_super) {
    __extends(RoleLayer, _super);
    function RoleLayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.enemyFactory = null;
        _this.enemyPrefab = null;
        _this.deltaEnemyTime = 10;
        _this.timeCount = 0;
        _this.enemyInitCount = 5;
        _this.enemyList = [];
        _this.enemyPool = null;
        return _this;
    }
    RoleLayer.prototype.onLoad = function () {
        this.enemyList = EnemyData_1.default.enemyList;
        this.enemyPool = new cc.NodePool(EnemyRole_1.default);
        for (var index = 0; index < this.enemyInitCount; index++) {
            var enemy = cc.instantiate(this.enemyPrefab);
            this.enemyPool.put(enemy);
        }
    };
    RoleLayer.prototype.start = function () {
    };
    RoleLayer.prototype.update = function (dt) {
        return;
        if (gameManager_1.default.instance.isOver)
            return;
        this.timeCount += dt;
        if (this.timeCount < this.deltaEnemyTime)
            return;
        var enemyInfo = this.enemyList.shift();
        this.createEnemy(enemyInfo);
        this.timeCount = 0;
    };
    RoleLayer.prototype.createEnemy = function (enemyInfo) {
        var enemyRole;
        if (this.enemyPool.size() > 0) {
            enemyRole = this.enemyPool.get(EnemyRole_1.default);
        }
        else { // 如果没有空闲对象，就用 cc.instantiate 重新创建,这里未调用reuse方法
            enemyRole = cc.instantiate(this.enemyPrefab);
            //可以用下面方式调用reuse方法
            var bulletComponent = enemyRole.getComponent(EnemyRole_1.default);
            bulletComponent.reuse(enemyInfo);
        }
        enemyRole.x = this.enemyFactory.x;
        enemyRole.y = this.enemyFactory.y;
        enemyRole.parent = this.node;
    };
    __decorate([
        property(cc.Node)
    ], RoleLayer.prototype, "enemyFactory", void 0);
    __decorate([
        property(cc.Prefab)
    ], RoleLayer.prototype, "enemyPrefab", void 0);
    __decorate([
        property
    ], RoleLayer.prototype, "deltaEnemyTime", void 0);
    RoleLayer = __decorate([
        ccclass
    ], RoleLayer);
    return RoleLayer;
}(cc.Component));
exports.default = RoleLayer;

cc._RF.pop();