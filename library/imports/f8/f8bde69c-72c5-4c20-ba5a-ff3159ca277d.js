"use strict";
cc._RF.push(module, 'f8bdeaccsVMILpa/zFZyid9', 'GameConst');
// Script/game/data/GameConst.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RoleMoveDir;
(function (RoleMoveDir) {
    RoleMoveDir[RoleMoveDir["left"] = -1] = "left";
    RoleMoveDir[RoleMoveDir["none"] = 0] = "none";
    RoleMoveDir[RoleMoveDir["right"] = 1] = "right";
})(RoleMoveDir = exports.RoleMoveDir || (exports.RoleMoveDir = {}));
var RoleState;
(function (RoleState) {
    RoleState[RoleState["idel"] = 0] = "idel";
    RoleState[RoleState["walk"] = 1] = "walk";
    RoleState[RoleState["jump"] = 2] = "jump";
    RoleState[RoleState["attack"] = 3] = "attack";
})(RoleState = exports.RoleState || (exports.RoleState = {}));
var RoleAction;
(function (RoleAction) {
    RoleAction["idle"] = "idle";
    RoleAction["run"] = "run";
    RoleAction["jump"] = "jump";
    RoleAction["attack"] = "attack";
})(RoleAction = exports.RoleAction || (exports.RoleAction = {}));
var BulletType;
(function (BulletType) {
    BulletType["gun1"] = "bullet1";
    BulletType["gun2"] = "bullet2";
    BulletType["gun3"] = "bullet3";
    BulletType["gun4"] = "bullet4";
    BulletType["selfTower"] = "bullet5";
    BulletType["selfFactory"] = "bullet6";
    BulletType["enemyFactory"] = "bullet7";
})(BulletType = exports.BulletType || (exports.BulletType = {}));
var GameConst = /** @class */ (function () {
    function GameConst() {
    }
    GameConst.SCREEN_HEIGHT = 1334;
    GameConst.SCREEN_WIDTH = 760;
    GameConst.AUDIO_PATH = "audio/";
    GameConst.CONFIG_PATH = "config/";
    GameConst.PREFAB_UI_PATH = "prefab/ui/";
    GameConst.LAN_PATH = "language"; //res/language
    GameConst.WIN_W = cc.winSize.width;
    GameConst.WIN_H = cc.winSize.height;
    GameConst.OPEN_RECEIVE_SWITCH = false; //是否开启服务器长时间未推送数据则断开连接
    GameConst.OPEN_REQUEST_LIST = false; //是否开启客户端请求队列
    GameConst.SHOW_SOCKET_ALERT = true; //是否显示socket连接相关界面
    //游戏场景类型
    GameConst.LOGIN = "login";
    GameConst.HALL = "hall";
    GameConst.GAME = "game";
    GameConst.VIEW1 = "/prefab/view1";
    GameConst.VIEW2 = "/prefab/view2";
    return GameConst;
}());
exports.default = GameConst;

cc._RF.pop();