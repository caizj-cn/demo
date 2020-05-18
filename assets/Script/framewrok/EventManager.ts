import { Delegate } from "./Delegate";


export class EventManager
{
    private static instance:EventManager;
    private eListenerMap:Map<string,any>;

    public constructor()
    {
        this.eListenerMap = new Map<string,Map<any,Delegate[]>>();
    }

    public static getInstance():EventManager
    {
        if(this.instance == null)
        {
            this.instance = new EventManager();
        }
        return this.instance;
    }

    /**
     * 
     * @param type 回调的方式触发事件
     * @param args 
     */
    public trigger(type:string,...args:any[])
    {
        let delegates:Delegate[] = [];
        let callers:any[] = [];
        let listenerMap = this.eListenerMap.get(type);
        if(listenerMap)
        {
            listenerMap.forEach((delegateList, caller) => {
                for (let delegate of delegateList) {
					delegates.push(delegate);
					callers.push(caller);
				}
				for (let index = delegateList.length - 1; index >= 0; --index) {
					if (delegateList[index].isOnce) {
						delegateList.splice(index, 1);
					}
				}
				if (delegateList.length <= 0) {
					listenerMap.delete(caller);
				}
            });
			if (listenerMap.size <= 0) {
				this.eListenerMap.delete(type);
			}
        }
        let length = delegates.length;
		for (let index = 0; index < length; index++) {
			let delegate: Delegate = delegates[index];
			delegate.listener.call(callers[index], ...delegate.eArgs, ...args);
		}
    }

    public hasEvent(type:string,caller:any,listener:Function):boolean
    {
        return this.find(type,caller,listener) !== null;
    }

    public add(type: string, caller: any, listener: Function, ...argArray: any[]): void 
    {
        this.addListener(type,caller,listener,false,argArray);
    }
    public addOnce(type: string, caller: any, listener: Function, ...argArray: any[]): void 
    {
        this.addListener(type,caller,listener,true,argArray);
    }

    private addListener(type:string,caller:any,listener:Function,isOnce:boolean,...args:any[])
    {
        let delegate = this.find(type,caller,listener);
        if(delegate)
        {
            delegate.isOnce = isOnce;
            cc.log("listener is exist!");
        }
        else
        {
            let delegate = new Delegate(listener,args,isOnce);
            this.eListenerMap.get(type).get(caller).push(delegate);
        }
    }

    public remove(type: string, caller: any, listener: Function, onceOnly?: boolean): void 
    {
        let listenerMap = this.eListenerMap.get(type);
        if(listenerMap == null)
        {
            cc.log("type is not in ElistenerMap");
        }
        else
        {
            let delegateAry = listenerMap.get(caller);
            if(delegateAry == null)
            {
                cc.log("caller is not in listenerMap")
            }
            else
            {
                for (let index = 0; index < delegateAry.length; index++) {
                    if(delegateAry[index] == listener)
                    {
                        delegateAry.splice(index,1);
                    }
                }
                if(delegateAry.length <= 0)
                {
                    listenerMap.delete(caller);
                }
            }
            if(listenerMap.size <= 0)
            {
                this.eListenerMap.delete(type);
            }
        }    
    }

    public removeAll(caller: any): void
    {
		this.eListenerMap.forEach((listenerMap, type) => {
			listenerMap.delete(caller);
			if (listenerMap.size <= 0) {
				this.eListenerMap.delete(type);
			}
		});
	}

    private find(type:string,caller:any,listener:Function):Delegate
    {
        if (!type) {
			console.error("Listener type is null!");
			return null;
		}
		if (!caller) {
			console.error("Caller type is null!");
			return null;
		}
		if (!listener) {
			console.error("Listener is null!");
			return null;
        }
        let listenerMap:Map<any,Delegate[]>;
        if(this.eListenerMap.has(type))
        {
            listenerMap = this.eListenerMap.get(type);
        }
        else
        {
            listenerMap = new Map<any,Delegate[]>();
            this.eListenerMap.set(type, listenerMap);
        }

        let listenerList: Delegate[];
		if (listenerMap.has(caller)) {
			listenerList = listenerMap.get(caller);
		} else {
			listenerList = [];
			listenerMap.set(caller, listenerList);
		}

		for (let delegate of listenerList) {
			if (delegate.eListener === listener) {
				return delegate;
			}
		}
		return null;
    }
}
