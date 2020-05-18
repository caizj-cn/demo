//管理游戏全局相关数据
export default class GameManager
{
    private static _instance:GameManager = null;

    public curScene:string = "";
    public touchDown:boolean = false;

    public cameraPos:cc.Vec2;

    public scaleFactor:number = 1;//当前缩放因子

    public chapterNum:number = 1;
    public chapterNodeIndex:number = 5;

    public isOver:boolean = false;

    public mapRect:cc.Rect;

    public static get instance():GameManager
    {
        if(this._instance == null)
        {
            this._instance = new GameManager();
        }
        return this._instance;
    }
}