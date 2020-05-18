import LocalStorage from "./LocalStorage";

export default class SoundManager
{
    private _musicVolume: number = 1;//背景音乐音量控制
    private _musicMute: boolean = false;//是否背景音乐静音
    private _effectVolume: number = 1;//音效音量控制
    private _effectMute: boolean = false;//是否音效静音
    private _curMusicId:number = 0;
    
    private static _instance:SoundManager;

    public static get instance():SoundManager
    {
        if(this._instance == null)
        {
            this._instance = new SoundManager(); 
        }
        return this._instance;
    }

    public setup()
    {
        if(LocalStorage.instance.getItem("musicVolume"))
        {
            this.musicVolume = LocalStorage.instance.getItem("musicVolume");
        }
        if(LocalStorage.instance.getItem("musicMute"))
        {
            this.musicMute = LocalStorage.instance.getItem("musicMute");
        }
        if(LocalStorage.instance.getItem("effectMute"))
        {
            this.effectMute = LocalStorage.instance.getItem("effectMute");
        }
        if(LocalStorage.instance.getItem("effectVolume"))
        {
            this.effectVolume = LocalStorage.instance.getItem("effectVolume");
        }
    }

    public get musicMute(): boolean 
    {
        return this._musicMute;
    }
    public set musicMute(value: boolean) 
    {
        if (this._musicMute != value) {
            LocalStorage.instance.setItem("musicMute", value);
            this._musicMute = value;
            if (value)this.stopMusic();
        }
    }

    public get effectMute(): boolean 
    {
        return this._effectMute;
    }
    public set effectMute(value: boolean) 
    {
        if (this._effectMute != value) 
        {
            LocalStorage.instance.setItem("effectMute", value);
            this._effectMute = value;
            if (value)this.stopAllEffect();
        }
    }

    public get musicVolume(): number 
    {
        return this._musicVolume;
    }
    public set musicVolume(value: number) 
    {
        if(this._musicVolume != value)
        {
            LocalStorage.instance.setItem("musicVolume", value);
            this._musicVolume = value;
            cc.audioEngine.setMusicVolume(value);
        }
    }

    public get effectVolume(): number 
    {
        return this._effectVolume;
    }
    public set effectVolume(value: number) 
    {
        if(this._effectVolume != value)
        {
            LocalStorage.instance.setItem("effectVolume", value);
            this._effectVolume = value;
            cc.audioEngine.setEffectsVolume(value);
        }
    }

    /**
     * 播放背景音乐
     */
    playMusic(url, loop) 
    {
        if (this.musicMute) return;
        cc.loader.loadRes(url, cc.AudioClip, function (err, clip) 
        {
            if(err)
            {
                cc.error("play bgm error");
                return;
            }
            if (this._curMusicId) cc.audioEngine.stop(this._curMusicId);
            this._curMusicId = cc.audioEngine.playMusic(clip, loop);
        }.bind(this));
    }

    /**暂停播放背景音乐 */
    pauseMusic() 
    {
        cc.audioEngine.pauseMusic();
    }

    /**继续播放背景音乐 */
    resumeMusic() 
    {
        cc.audioEngine.resumeMusic();
    }
    /**停止背景音乐 */
    stopMusic() 
    {
        cc.audioEngine.stopMusic();
    }

    /**
     * 播放音效
     * @param audioName 音乐文件名称，不需要填文件后缀
     * @param loop 是否循环播放
     */
    playEffect(url, loop) 
    {
        loop = loop || false;
        if (this.effectMute) return;
        cc.loader.loadRes(url, cc.AudioClip, function (err, clip) 
        {
            if(err)
            {
                cc.error("play bgm error");
                return;
            }
            cc.audioEngine.play(clip, loop, this.effectVolume);
        }.bind(this));
    }
    
    /**停止所有音效 */
    stopAllEffect() 
    {
        cc.audioEngine.stopAllEffects();
    }
}