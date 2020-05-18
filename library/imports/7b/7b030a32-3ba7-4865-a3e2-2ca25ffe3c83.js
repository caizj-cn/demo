"use strict";
cc._RF.push(module, '7b030oyO6dIZaPiLKJf/jyD', 'SoundManager');
// Script/framewrok/SoundManager.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LocalStorage_1 = require("./LocalStorage");
var SoundManager = /** @class */ (function () {
    function SoundManager() {
        this._musicVolume = 1; //背景音乐音量控制
        this._musicMute = false; //是否背景音乐静音
        this._effectVolume = 1; //音效音量控制
        this._effectMute = false; //是否音效静音
        this._curMusicId = 0;
    }
    Object.defineProperty(SoundManager, "instance", {
        get: function () {
            if (this._instance == null) {
                this._instance = new SoundManager();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    SoundManager.prototype.setup = function () {
        if (LocalStorage_1.default.instance.getItem("musicVolume")) {
            this.musicVolume = LocalStorage_1.default.instance.getItem("musicVolume");
        }
        if (LocalStorage_1.default.instance.getItem("musicMute")) {
            this.musicMute = LocalStorage_1.default.instance.getItem("musicMute");
        }
        if (LocalStorage_1.default.instance.getItem("effectMute")) {
            this.effectMute = LocalStorage_1.default.instance.getItem("effectMute");
        }
        if (LocalStorage_1.default.instance.getItem("effectVolume")) {
            this.effectVolume = LocalStorage_1.default.instance.getItem("effectVolume");
        }
    };
    Object.defineProperty(SoundManager.prototype, "musicMute", {
        get: function () {
            return this._musicMute;
        },
        set: function (value) {
            if (this._musicMute != value) {
                LocalStorage_1.default.instance.setItem("musicMute", value);
                this._musicMute = value;
                if (value)
                    this.stopMusic();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoundManager.prototype, "effectMute", {
        get: function () {
            return this._effectMute;
        },
        set: function (value) {
            if (this._effectMute != value) {
                LocalStorage_1.default.instance.setItem("effectMute", value);
                this._effectMute = value;
                if (value)
                    this.stopAllEffect();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoundManager.prototype, "musicVolume", {
        get: function () {
            return this._musicVolume;
        },
        set: function (value) {
            if (this._musicVolume != value) {
                LocalStorage_1.default.instance.setItem("musicVolume", value);
                this._musicVolume = value;
                cc.audioEngine.setMusicVolume(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoundManager.prototype, "effectVolume", {
        get: function () {
            return this._effectVolume;
        },
        set: function (value) {
            if (this._effectVolume != value) {
                LocalStorage_1.default.instance.setItem("effectVolume", value);
                this._effectVolume = value;
                cc.audioEngine.setEffectsVolume(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 播放背景音乐
     */
    SoundManager.prototype.playMusic = function (url, loop) {
        if (this.musicMute)
            return;
        cc.loader.loadRes(url, cc.AudioClip, function (err, clip) {
            if (err) {
                cc.error("play bgm error");
                return;
            }
            if (this._curMusicId)
                cc.audioEngine.stop(this._curMusicId);
            this._curMusicId = cc.audioEngine.playMusic(clip, loop);
        }.bind(this));
    };
    /**暂停播放背景音乐 */
    SoundManager.prototype.pauseMusic = function () {
        cc.audioEngine.pauseMusic();
    };
    /**继续播放背景音乐 */
    SoundManager.prototype.resumeMusic = function () {
        cc.audioEngine.resumeMusic();
    };
    /**停止背景音乐 */
    SoundManager.prototype.stopMusic = function () {
        cc.audioEngine.stopMusic();
    };
    /**
     * 播放音效
     * @param audioName 音乐文件名称，不需要填文件后缀
     * @param loop 是否循环播放
     */
    SoundManager.prototype.playEffect = function (url, loop) {
        loop = loop || false;
        if (this.effectMute)
            return;
        cc.loader.loadRes(url, cc.AudioClip, function (err, clip) {
            if (err) {
                cc.error("play bgm error");
                return;
            }
            cc.audioEngine.play(clip, loop, this.effectVolume);
        }.bind(this));
    };
    /**停止所有音效 */
    SoundManager.prototype.stopAllEffect = function () {
        cc.audioEngine.stopAllEffects();
    };
    return SoundManager;
}());
exports.default = SoundManager;

cc._RF.pop();