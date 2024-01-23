///<reference path="../CSOAPI/ArgumentException.ts"/>

namespace CSOAPI {

    import KeyAlreadyExistsInCollection = CSOAPI.KeyAlreadyExistsInCollection;

    export class Map<T> {

        private keys: string[] = [];
        private values: T[] = [];
        private isReadOnly: boolean = false;
        private length: number = 0;
        private readonly construct: { new() };
        private keyIndex = 1;

        public constructor(map: Map<T> = null, readOnly: boolean = false, construct: { new() } = null) {
            if(map !== null) {
                for(let i_ = 0; i_ < map.getKeys().length; i_++) {
                    const de = map.item(map.getKeys[i_]);
                    this.add(de, map.getKeys[i_]);
                }
            }
            this.isReadOnly = readOnly;
            this.construct = construct;
        }

        public getKeys(): string[] {
            return this.keys;
        }

        public getValues(): T[] {
            return this.values;
        }

        // add if key not present
        public add(value: T, key?: string): T {
            return this.baseAdd(value, key);
        }

        public baseAdd(value: T, key: string): T {
            if(this.keys.indexOf(key) > -1) {
                throw new KeyAlreadyExistsInCollection("The key " + key + " is already present in this Map.");
            }
            if(value === null && this.construct) {
                value = new this.construct();
                // @ts-ignore
                if(value.setKey !== undefined) value.setKey(key);
            }
            if(key === undefined || key === null || key === "") {
                key = "___k" + this.keyIndex++;
            }
            this.keys.push(key);
            this.values.push(value);
            this.length++;
            return value;
        }

        // add or update
        public put(value: T, key: string): T {
            const index = this.keys.indexOf(key);
            if(index > -1) {
                this.values[index] = value;
            }
            else {
                this.keys.push(key);
                this.values.push(value);
            }
            return value;
        }

        public baseRemove(indexOrKey: string|number): void {
            if(typeof indexOrKey === "string")
                this.removeByKey(indexOrKey);
            else
                this.removeByIndex(indexOrKey);
        }

        public remove(indexOrKey: string|number): void {
            this.baseRemove(indexOrKey);
        }

        public removeByObject(obj: T): void {
            for(let i = 0; i < this.length; i++) {
                if(obj === this.values[i]) {
                    this.removeByIndex(i);
                    break;
                }
            }
        }

        private removeByKey(key: string): void {
            this.removeByIndex(this.keys.indexOf(key));
        }

        private removeByIndex(index: number): void {
            if(index > -1) {
                this.keys.splice(index,1);
                this.values.splice(index,1);
                this.length -= 1;
            }
        }

        public baseClear(): void {
            this.length = 0;
            this.keys = [];
            this.values = [];
        }

        public clear(): void {
            this.baseClear();
        }

        public size() {
            return this.count();
        }

        public count() {
            return this.length;
        }

        public baseItem(indexOrKey: string|number) {
            try {
                if(typeof indexOrKey === "string")
                    return this.itemByKey(indexOrKey);
                else
                    return this.itemByIndex(indexOrKey);
            }
            catch(ignore) {
                return null;
            }
        }

        public item(indexOrKey: string|number) {
            return this.baseItem(indexOrKey);
        }

        public update(index: number, value: T) {
            if(index > -1 && index < this.length) {
                this.values[index] = value;
            }
        }

        public containsKey(key: string) {
            return this.keys.indexOf(key) > -1;
        }

        private itemByKey(key: string): T {
            return this.itemByIndex(this.keys.indexOf(key));
        }

        private indexByKey(key: string): number {
            return this.keys.indexOf(key);
        }

        private keyByIndex(index: number): string {
            return this.keys[index];
        }

        private itemByIndex(index: number): T {
            if(index > -1)
                return this.values[index];
            else
                return null;
        }

        public forEach(f:(k: string, v: T) => void) {
            for(let i = 0; i < this.length; i++) {
                f(this.keys[i], this.values[i]);
            }
        }

        public anyMatch(f:(k: string, v: T) => boolean) {
            for(let i = 0; i < this.length; i++) {
                if (f(this.keys[i], this.values[i])) return true;
            }
            return false;
        }

        public find(f:(k: string, v: T) => boolean) {
            for(let i = 0; i < this.length; i++) {
                if (f(this.keys[i], this.values[i])) return this.values[i];
            }
            return null;
        }

        public forEachValue(f: (v: T) => void) {
            this.values.forEach(f);
        }

        public map<U>(f: (v: T) => U): U[] {
            return this.values.map(f);
        }

        public getChunk(start: number, size: number) {
            const map = new Map<T>();
            map.keys = this.keys.slice(start, start + size);
            map.values = this.values.slice(start, start + size);
            map.length = map.keys.length;
            return map;
        }

        public concat(map: Map<T>) {
            this.keys = this.keys.concat(map.keys);
            this.values = this.values.concat(map.values);
            this.length = this.values.length;
            this.keyIndex = this.length;
        }

        public copy(from: any) {
            this.keys = from.keys;
            this.values = from.values;
            this.length = from.values.length;
            this.keyIndex = this.length;
        }

    }
}