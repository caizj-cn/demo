export enum RoleMoveDir {
    left = -1,
    none = 0,
    right = 1
}

export enum RoleState {
    idel   = 0,
    walk   = 1,
    jump   = 2,
    attack = 3
}

export enum RoleAction {
    idle   = "idle",
    run    = "run",
    jump   = "jump",
    attack = "attack",
}

export enum BulletType
{
    gun1            = "bullet1",
    gun2            = "bullet2",
    gun3            = "bullet3",
    gun4            = "bullet4",
    selfTower       = "bullet5",
    selfFactory     = "bullet6",
    enemyFactory    = "bullet7",
}

export default class GameConst
{
    public static readonly SCREEN_HEIGHT = 1334;
    public static readonly SCREEN_WIDTH  = 760;

    public static readonly AUDIO_PATH = "audio/";
    public static readonly CONFIG_PATH = "config/";
    public static readonly PREFAB_UI_PATH = "prefab/ui/";

    public static LAN_PATH:string = "language";//res/language
    public static WIN_W   :number = cc.winSize.width;
    public static WIN_H   :number = cc.winSize.height;

    public static readonly OPEN_RECEIVE_SWITCH:boolean = false; //是否开启服务器长时间未推送数据则断开连接
    public static readonly OPEN_REQUEST_LIST:boolean = false;   //是否开启客户端请求队列

    public static readonly SHOW_SOCKET_ALERT:boolean = true;   //是否显示socket连接相关界面

    //游戏场景类型
    public static LOGIN:string = "login";
    public static HALL :string = "hall";
    public static GAME :string = "game";

    public static VIEW1:string = "/prefab/view1";
    public static VIEW2:string = "/prefab/view2";
   
}