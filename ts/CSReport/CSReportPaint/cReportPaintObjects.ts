namespace CSReportPaint {

    import Map = CSOAPI.Map;

    export class cReportPaintObjects extends Map<cReportPaintObject> {

        private zorder: string[] = [];

        constructor() {
            super(null, false, cReportPaintObject);
        }

        public remove(indexOrKey: string|number): void {
            this.baseRemove(indexOrKey);
            // @ts-ignore
            let key: string = (typeof indexOrKey == "string") ? indexOrKey: this.keyByIndex(indexOrKey);
            this.removeZOrder(key);
        }

        // Clears all the elements in the collection.
        public clear() {
            this.baseClear();
            this.zorder = [];
        }

        public add(c: cReportPaintObject, key: string): cReportPaintObject {
            try {
                if(c == null) { c = new cReportPaintObject(); }
                if(key == "") { key = cGlobals.getNextKey().toString(); }

                key = cGlobals.getKey(key);
                this.baseAdd(c, key);

                c.setKey(key);
                this.zorder[this.count()-1] = key;

                return c;
            }
            catch(ignore) {
                return null;
            }
        }

        public bringToFront(key: string) {
            this.setZorder(key, true);
        }

        public sendToBack(key: string) {
            this.setZorder(key, false);
        }

        // moves the element refered by key to the last position if top is true or
        // to the first position if top is false in this.zorder
        //
        // nZorder === 0 is the heap's bottom and the max nZorder is at
        // the heap's top
        //
        public setZorder(key: string, top: boolean) {
            let i: number;

            // first we search the element using key
            //
            for(i = 0; i < this.zorder.length; i++) {
                if(this.zorder[i] === key) {
                    break;
                }
            }

            if(i >= this.zorder.length-1 && top)  {
                return;
            }
            if(i === 0 && !top)  {
                return;
            }

            if(top) {
                for(; i < this.zorder.length - 1; i++) {
                    this.zorder[i] = this.zorder[i + 1];
                    this.item(this.zorder[i]).getAspect().setNZOrder(i);
                }
                this.zorder[this.zorder.length-1] = key;
                this.item(key).getAspect().setNZOrder(this.zorder.length-1);
            }
            else {
                for(; i > 0; i--) {
                    this.zorder[i] = this.zorder[i - 1];
                    this.item(this.zorder[i]).getAspect().setNZOrder(i);
                }
                this.zorder[0] = key;
                this.item(key).getAspect().setNZOrder(0);
            }
        }

        public getZOrderForKey(key: string) {
            for(let i = 0; i < this.zorder.length; i++) {
                if(this.zorder[i] === key) {
                    return i;
                }
            }
            return -1;
        }

        public getNextKeyForZOrder(index: number) {
            return this.zorder[index];
        }

        public getNextPaintObjForZOrder(index: number) {
            return this.item(this.getNextKeyForZOrder(index));
        }

        private removeZOrder(sKey: string) {
            for(let i = 0; i < this.zorder.length; i++) {
                if(this.zorder[i] === sKey) {
                    this.zorder.splice(i, 1);
                    return;
                }
            }
        }
    }
}
