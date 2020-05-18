export default class SimpleDictionary
{
    public constructor ();
    public constructor (object: Object);
    public constructor (object?)
    {
        if (object != null) {
            for (let property in object) {
                if (object.hasOwnProperty(property)) {
                    this[property] = object[property];
                }
            }
        }
    }

    public clone(): SimpleDictionary 
    {
        let result = new SimpleDictionary(this);
        return result;
    }


    public getKeys(): string[] {
        let result = [];
        for (let key in this) {
            if (this.hasOwnProperty(key)) {
                result.push(key);
            }
        }
        return result;
    }

    public getValues(): any[] {
        let result = [];
        for (let item in this) {
            if (this.hasOwnProperty(item)) {
                result.push(this[item]);
            }
        }
        return result;
    }

    public addItem(key: string, value: any): boolean
    {
        let isAddItem = !this.hasOwnProperty(key) && typeof(value) !== 'undefined';
        if (isAddItem) {
            this[key] = value;
        }
        return isAddItem;
    }

    public updateItem(key: string, value: any): boolean 
    {
        let isUpdateItem = this.hasOwnProperty(key) && typeof(value) !== 'undefined';
        if (isUpdateItem) {
            this[key] = value;
        }
        return isUpdateItem;
    }

    public deleteItem(key: string): boolean 
    {
        let isDeleteItem = this.hasOwnProperty(key);
        if (isDeleteItem) {
            delete this[key];
        }
        return isDeleteItem;
    }

    public getItem(key:string):any
    {
        let hasItem = this.hasOwnProperty(key);
        if(hasItem) {
            return this[key];
        }
        return null;
    }

    public get length():number
    {
        return this.getKeys().length;
    }

    public clear()
    {
        for (const key in this) 
        {
            if (this.hasOwnProperty(key)) 
            {
                this.deleteItem(key);
            }
        }
    }
}
