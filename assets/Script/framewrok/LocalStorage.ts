export default class LocalStorage
{
    private localData:object = {};
    private static _instance:LocalStorage;
    public static get instance():LocalStorage
    {
        if(this._instance == null)
        {
            this._instance = new LocalStorage(); 
        }
        return this._instance;
    }
    
    setItem(key, value) :void
    {
        this.localData[key] = value;
        try 
        {
            value = JSON.stringify(value);
        } catch (e) 
        {
            value = value;
        }
        cc.sys.localStorage.setItem(key, value);
    }

    getItem(key) 
    {
        if (this.localData[key])
        {
            return this.localData[key];
        }
        else
        {
            let value = cc.sys.localStorage.getItem(key);
            if (value) 
            {
                try 
                {
                    value = JSON.parse(value);
                } catch (e) 
                {
                    value = value;
                }
                this.localData[key] = value;
                return value;
            }
            return null;
        }
    }

    clear () 
    {
        this.localData = {};
        cc.sys.localStorage.clear();
    }
    removeItem (key) 
    {
        cc.sys.localStorage.removeItem(key);
        delete this.localData[key];
    }
}