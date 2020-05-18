"use strict";
cc._RF.push(module, '6ca09YjlrpHxoHCCYAWEuE1', 'NodePool');
// Script/framewrok/pool/NodePool.ts

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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NodePool = /** @class */ (function (_super) {
    __extends(NodePool, _super);
    function NodePool() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefab = null;
        return _this;
    }
    NodePool.prototype.ctor = function () {
        this.nodePool = new cc.NodePool();
    };
    //获取一个节点
    NodePool.prototype.getNode = function (data, parent) {
        var node = null;
        if (this.nodePool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            node = this.nodePool.get();
        }
        else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            node = cc.instantiate(this.prefab);
            node.pool = this;
        }
        if (parent)
            parent.addChild(node);
        var poolComponents = node.getComponentsInChildren("PoolComponent");
        for (var i in poolComponents) {
            var poolComponent = poolComponents[i];
            poolComponent.reuse(data); //启用
        }
        return node;
    };
    NodePool.prototype.put = function (node) {
        node.removeFromParent();
        this.nodePool.put(node); // 通过之前传入的管理类实例回收子弹
        var poolComponents = node.getComponentsInChildren("PoolComponent");
        for (var i in poolComponents) {
            var poolComponent = poolComponents[i];
            poolComponent.unuse(); //启用
        }
    };
    __decorate([
        property(cc.Prefab)
    ], NodePool.prototype, "prefab", void 0);
    NodePool = __decorate([
        ccclass
    ], NodePool);
    return NodePool;
}(cc.Component));
exports.default = NodePool;

cc._RF.pop();