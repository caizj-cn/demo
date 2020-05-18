"use strict";
cc._RF.push(module, 'dd1093wW51A26Hm7MreWGEP', 'GameUtils');
// Script/framewrok/utils/GameUtils.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StringUtls_1 = require("./StringUtls");
var GameUtils = /** @class */ (function () {
    function GameUtils() {
    }
    GameUtils.getRotation = function (start, end) {
        var angle = Math.atan2(end.y - start.y, end.x - start.x);
        if (angle < 0)
            angle = angle + Math.PI * 2;
        else if (angle > Math.PI * 2)
            angle = angle - Math.PI * 2;
        //var rotation = 360.0-angle * 180.0 / Math.PI;//原图的初始角度是向右用360- 向左则用180-
        var rotation = angle * 180.0 / Math.PI; //原图的初始角度是向右用360- 向左则用180-
        return rotation;
    };
    GameUtils.standardRotation = function (rotation) {
        if (rotation > 180) {
            rotation = rotation - 360;
        }
        else if (rotation < -180) {
            rotation = rotation + 360;
        }
        return rotation;
    };
    GameUtils.limitRotation = function (rotation, start, end) {
        var a = Math.abs(rotation - start);
        var b = Math.abs(end - rotation);
        return a < 180 && b < 180;
    };
    GameUtils.getSpriteFrames = function (atlas, textName) {
        var frames = [];
        var i = 0;
        while (true) {
            var frameName = StringUtls_1.StringUtils.splitFormat(textName, i, "_");
            var frame = atlas.getSpriteFrame(frameName);
            if (frame) {
                frames.push(frame);
            }
            else if (i > 1) {
                break;
            }
            i++;
        }
        return frames;
    };
    return GameUtils;
}());
exports.default = GameUtils;

cc._RF.pop();