(function(globalObject) {

    // @ts-ignore
    globalObject.CSOAPI = globalObject.CSOAPI || {};

    globalObject.CSOAPI.createList = function<T>(itemConstructor: (index?: number) => T, parentCollection?: CSOAPI.IList<T>) {

        // @ts-ignore
        const that: CSOAPI.IList<T> = {};

        if(itemConstructor === undefined) {
            throw new Error("Can't create this collection because the itemConstructor function is undefined");
        }

        const newCollection = function() {
            return {
                items: [],
                keys: {},
                count: 0
            };
        };

        let self = newCollection();

        //
        // add the element and returns true if the element did NOT already exists
        // in the collection, otherwise returns false.
        //
        that.addIfNotExists = function(value: T, key: string): boolean {
            if(that.contains(key)) {
                return false;
            }
            else {
                add(value, key);
                return true;
            }
        };

        that.addBefore = function(index: number, value: T, key: string): T {
            return add(value, key, index);
        };

        that.add = function(value: T, key?: string): T {
            return add(value, key);
        };

        const add = function(value: T, key?: string, index?: number): T {

            //
            // if a key is present we need to validate it
            //
            if(key !== undefined) {
                //
                // key is alwas string
                //
                key = key.toString();
                if(self.keys[key] !== undefined) {
                    throw new Error("Can't add this item. There is already an object with this key [" + key + "] in the colletion.");
                }
            }
            //
            // update operation
            //
            if(index === undefined || index > self.count) {
                index = self.count;
            }
            //
            // insert operation
            //
            else if(index < self.count){

                let count = self.count;
                //
                // move all elements from index one position to the right
                // to make room for the new element
                //
                for(let i = count; i > index ; i -= 1) {
                    self.items[i] = self.items[i-1];
                    setIndexInItem(self.items[i], i);
                }
                //
                // update keys array
                //
                let keys = Object.keys(self.keys);
                for(let i = 0; i < keys.length; i += 1) {
                    if(self.keys[keys[i]] !== undefined) {
                        //
                        // update index for every key which references an element
                        // moved in this add operation
                        //
                        if(self.keys[keys[i]] >= index) {
                            self.keys[keys[i]] += 1;
                        }
                    }
                }
            }

            //
            // now that we have made room for the element, if a key is present we need register it
            //
            if(key !== undefined) {
                self.keys[key] = index;
            }

            value = value || itemConstructor(index+1);
            // @ts-ignore
            if(key !== undefined && value.setKeyCol !== undefined) {
                // @ts-ignore
                value.setKeyCol(key);
            }
            self.items[index] = value;
            setIndexInItem(value, index);
            self.count += 1;

            if(parentCollection !== undefined) {
                parentCollection.add(value, key);
            }

            return value;
        };

        const setIndexInItem = function(value: T, index: number): void {
            if(value !== undefined && value !== null && itemConstructor !== null) {
                // @ts-ignore
                if(value.setIndex !== undefined) {
                    // @ts-ignore
                    value.setIndex(index);
                }
            }
        };

        const checkIndex = function(index: number|string, noError?: boolean): number {
            if(noError === undefined) { noError = false; }
            if (typeof index === "number") {
                if (index < 0 || index >= self.count) {
                    if(noError) {
                        index = -1;
                    }
                    else {
                        throw new Error("Index out of bounds. Index: " + index.toString());
                    }
                }
            } else {
                let key = index ? index.toString() : "";
                index = self.keys[key];
                if (index === undefined) {
                    if(noError) {
                        index = -1;
                    }
                    else {
                        throw new Error("This key is not present in this collection. Key: " + key);
                    }
                }
            }
            // @ts-ignore
            return index;
        };

        that.contains = function(indexOrKey: number|string): boolean {
            return (checkIndex(indexOrKey, true) !== -1);
        };

        that.item = function(indexOrKey: number|string): T {
            const index = checkIndex(indexOrKey);
            return self.items[index];
        };

        that.getOrElse = function(indexOrKey: number|string, elseValue: T): T {
            const index = checkIndex(indexOrKey, true);
            return index !== -1 ? self.items[index] : elseValue;
        };

        that.get = that.item;

        that.remove = function(indexOrKey: number|string): void {
            const index = checkIndex(indexOrKey);
            const count = self.count;
            let value = null;

            // get a reference to this item to then
            // call to the parent collection remove
            // method
            //
            if(parentCollection !== undefined) {
                value = self.items[index];
            }

            //
            // move all elements from index to the beginning of the array
            //
            for(let i = index; i < count -1; i += 1) {
                self.items[i] = self.items[i + 1];
                setIndexInItem(self.items[i], i);
            }
            //
            // remove the last reference to allow the object be garbage collected
            //
            delete self.items[count -1];
            //
            // update size of items array
            //
            self.count -=1;
            //
            // update keys array
            //
            let keys = Object.keys(self.keys);
            for(let i = 0; i < keys.length; i += 1) {
                if(self.keys[keys[i]] !== undefined) {
                    //
                    // delete the key for this object
                    //
                    if(self.keys[keys[i]] === index) {
                        delete self.keys[keys[i]];
                    }
                        //
                        // update index for every key which references an element
                        // moved in this remove operation
                    //
                    else if(self.keys[keys[i]] > index) {
                        self.keys[keys[i]] -= 1;
                    }
                }
            }
            if(parentCollection !== undefined) {
                parentCollection.remove(value);
            }
        };

        that.removeObject = function(elem: T): void {
            const count = self.items.length;
            for(let i = 0; i < count; i += 1) {
                if(self.items[i] === elem) {
                    that.remove(i);
                    break;
                }
            }
        };

        const clearParentCollection = function(): void {
            if(parentCollection !== undefined) {
                const count = self.items.length;
                for(let i = 0; i < count; i += 1) {
                    parentCollection.removeObject(self.items[i]);
                }
            }
        };

        that.clear = function() {
            clearParentCollection();
            self = newCollection();
        };

        that.count = function(): number {
            return self.count;
        };

        that.size = that.count;

        that.each = function(f: (elem: T, number) => boolean): boolean {
            const args = Array.prototype.slice.call(arguments, 1);

            for(let i = 0, count = self.items.length; i < count; i += 1) {
                if(f.apply(null, [self.items[i], i].concat(args)) === false) {
                    return false;
                }
            }
            return true;
        };

        that.map = function<B>(f: (elem: T,...args: any[]) => B): B[] {
            const args = Array.prototype.slice.call(arguments, 1);
            const r = [];

            const count = self.items.length;
            for(let i = 0; i < count; i += 1) {
                r.push(f.apply(null, [self.items[i], i].concat(args)));
            }

            return r;
        };

        that.selectFirst = function(f: (elem: T,...args: any[]) => boolean): T {
            const args = Array.prototype.slice.call(arguments, 1);

            const count = self.items.length;
            for(let i = 0; i < count; i += 1) {
                let item = self.items[i];
                if(f.apply(null, [item, i].concat(args))) {
                    return item;
                }
            }

            return null;
        };

        that.select = function(f: (elem: T,...args: any[]) => boolean): CSOAPI.IList<T> {
            const args = Array.prototype.slice.call(arguments, 1);
            const selected = globalObject.CSOAPI.createList<T>(null);

            const count = self.items.length;
            for(let i = 0; i < count; i += 1) {
                let item = self.items[i];
                if(f.apply(null, [item, i].concat(args))) {
                    selected.add(item);
                }
            }

            return selected;
        };

        that.inspect = function(field: string): void {
            const printToLog = function(item: T, i: number) {
                try {
                    globalObject.log("item " + i.toString()
                        + ": " + item.toString()
                        // @ts-ignore
                        + " - Name: " + (item.getName ? item.getName() : "")
                        // @ts-ignore
                        + " - Text: " + (item.getText ? item.getText() : "")
                        + " - f: " + (field ? item[field].apply(item) : "")
                    );
                }
                catch(ignore) {}
                return true;
            };
            that.each(printToLog);
        };

        that.filter = function(f: (elem: T) => boolean): CSOAPI.IList<T> {
            const coll = globalObject.CSOAPI.createList<T>(null);
            that.each((e, i) => { if(f(e)) coll.add(e); return true; });
            return coll;
        };

        that.join = function(separator: string): string {
            let str = "";
            that.each((e, i) => { str += e.toString() + separator; return true; });
            return str.slice(0,-1);
        };

        return that;
    }

}(globalObject));

namespace CSOAPI {

    export interface IList<T> {

        addIfNotExists: (value: T, key: string) => boolean;
        addBefore: (index: number, value: T, key: string) => T;
        add: (value: T, key?: string) => T;
        contains: (indexOrKey: number|string) => boolean;
        item: (indexOrKey: number|string) => T;
        getOrElse: (indexOrKey: number|string, elseValue: T) => T;
        get: (indexOrKey: number|string) => T;
        remove: (indexOrKey: number|string) => void;
        removeObject: (elem: T) => void;
        clear: () => void;
        count: () => number;
        size: () => number;
        each: (f: (elem: T, index: number) => boolean) => boolean;
        map: <B>(f: (elem: T,...args: any[]) => B) => B[];
        selectFirst: (f: (elem: T,...args: any[]) => boolean) => T;
        select: (f: (elem: T,...args: any[]) => boolean) => CSOAPI.IList<T>;
        inspect: (field: string) => void;
        filter: (f: (elem: T) => boolean) => CSOAPI.IList<T>;
        join: (separator: string) => string;
    }
}
