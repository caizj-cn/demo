import { StringUtils } from "./StringUtls";

export default class GameUtils
{
    public static getRotation(start:cc.Vec2, end:cc.Vec2):number
    {
        let angle = Math.atan2(end.y - start.y, end.x - start.x);
        if (angle < 0)
            angle = angle + Math.PI * 2;
        else if (angle > Math.PI * 2)
            angle = angle - Math.PI * 2;
        //var rotation = 360.0-angle * 180.0 / Math.PI;//原图的初始角度是向右用360- 向左则用180-
        let rotation = angle * 180.0 / Math.PI;//原图的初始角度是向右用360- 向左则用180-
        return rotation;
    }

    public static standardRotation(rotation:number) 
    {
        if (rotation > 180) {
            rotation = rotation - 360;
        }
        else if (rotation < -180) {
            rotation = rotation + 360;
        }
        return rotation;
    }

    public static limitRotation(rotation:number, start:number, end:number) 
    {
        var a = Math.abs(rotation - start);
        var b = Math.abs(end - rotation);
        return a < 180 && b < 180;
    }

    public static getSpriteFrames(atlas, textName) 
    {
        var frames = [];
        var i = 0;
        while (true) 
        {
            var frameName = StringUtils.splitFormat(textName,i,"_")
            var frame = atlas.getSpriteFrame(frameName);
            if (frame) {
                frames.push(frame);
            }
            else if (i > 1) 
            {
                break;
            }
            i++;
        }
        return frames;
    }
   
}
