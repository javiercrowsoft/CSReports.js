namespace CSOAPI {

    import KeyAlreadyExistsInCollection = CSOAPI.KeyAlreadyExistsInCollection;

    export class Map<T> {

        private keys: string[] = [];
        private values: T[] = [];
        private isReadOnly: boolean = false;
        private length: number = 0;

        public constructor(map: Map<T> = null, readOnly: boolean = false) {
            if(map != null) {
                for (let i_ = 0; i_ < map.getKeys().length; i_++) {
                    const de = map.item(map.getKeys[i_]);
                    this.add(de.getKey(), de.getValue());
                }
            }
            this.isReadOnly = readOnly;
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
            this.keys.push(key);
            this.values.push(value);
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

        private removeByKey(key: string): void {
            this.removeByIndex(this.keys.indexOf(key));
        }

        private removeByIndex(index: number): void {
            if (index > -1) {
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

        public count() {
            return this.length;
        }

        public baseItem(indexOrKey: string|number) {
            return this.item(indexOrKey);
        }

        public item(indexOrKey: string|number) {
            try {
                if(typeof indexOrKey === "string")
                    this.itemByKey(indexOrKey);
                else
                    this.itemByIndex(indexOrKey);
            }
            catch (ex) {
                return null;
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
            if (index > -1)
                return this.values[index];
            else
                return null;
        }

        public forEach(f:(string, T) => void) {
            for(let i = 0; i < this.length; i++) {
                f(this.keys[i], this.values[i]);
            }
        }

        public forEachValue(f: (T) => void) {
            this.values.forEach(f);
        }
    }
}