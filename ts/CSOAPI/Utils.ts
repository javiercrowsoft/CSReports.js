namespace CSOAPI {

    import ComboBox = CSForms.ComboBox;
    import RefWrapper = CSKernelClient.RefWrapper;

    export class Utils {

        private static formInput: FormInput = null;

        private static _dpi = -1;

        //#region parse to int/double functions

        public static parseInt(value: any): number {
            return parseInt(value.toString());
        }

        public static isNumber(value: any): boolean {
            try {
                return ! isNaN(parseFloat(value.toString()));
            }
            catch(ignore) {
                return false;
            }
        }

        // this function will convert any value into a number
        // but if the value is NaN it will be translated as 0
        // for a more flexible function use valEx which handles
        // booleans when true is -1 and false is 0
        //
        public static val(value: any): number {
            if(value === null || value === undefined) return 0;
            else {
                try {
                    value = parseFloat(value);
                    return isNaN(value) ? 0 : value;
                } catch(ignore) {
                    return 0;
                }
            }
        }

        // this function will convert any value into a number
        // with an special treatment of booleans
        // if value is boolean it will be translated as:
        // false => 0
        // true  => -1
        //
        public static valEx(value: any): number {
            if(value === null || value === undefined) return 0;
            else if(value === true)                   return -1;
            else if(value === false)                  return 0;
            else {
                try {
                    value = parseFloat(value);
                    return isNaN(value) ? 0 : value;
                } catch(ignore) {
                    return 0;
                }
            }
        }

        public static valInt(value: any): number {
            return parseInt(this.val(value) as any);
        }

        public static divideByZero(x1: number, x2: number) {
            if(x2 !== 0) {
                return x1 / x2;
            } else {
                return 0;
            }
        }

        private static _sepDecimal = "";

        public static setSepDecimal() {
            const decimalSeparator = 1.1;
            Utils._sepDecimal = decimalSeparator.toLocaleString().substring(1, 2);
        }

        static getSepDecimal() {
            return (1.1).toLocaleString().substring(1, 2);
        }

        //#endregion

        //#region string functions

        public static removeLastColon(list: string) {
            list = list.trim();
            if(list.substring(list.length - 1) === ",") {
                return list.substring(0, list.length - 1);
            } else {
                return list;
            }
        }

        public static setInfoString(source: string, key: string, value: string) {
            key = "#" + key;

            let i = source.toLowerCase().indexOf(key.toLowerCase(), 0);

            // the key can't apears more than one
            //
            if(source.toLowerCase().indexOf(key.toLowerCase(), i + 1) !== -1) {
                throw (new Exception("cUtil.getInfoString: the key can't apears more than one."));
            }

            // if the key is not present we add it to the end of the string
            //
            if(i === -1) {
                return source + key + "=" + value + ";";
            }
            else {
                const c_errorstr = "cUtil.getInfoString: source invalid, the character {0} is not present.";

                let j = source.toLowerCase().indexOf(";".toLowerCase(), i);
                if(j === -1) {
                    throw (new Exception(this.format(c_errorstr, ";")));
                }
                debugger; // seguro que este substring esta mal
                let k = source.substring(i, j-i).toLowerCase().indexOf("=".toLowerCase(), 0);
                if(k === -1)
                {
                    throw (new Exception(this.format(c_errorstr, "=")));
                }
                k = k + i;
                debugger; // seguro que este substring esta mal
                return source.substring(0, k) + value + source.substring(j);
            }
        }

        static format(text: string, ...args: string[]): string {
            return text.replace(/{(\d+)}/g, (match, num) => {
                return typeof args[num] !== 'undefined' ? args[num] : match;
            });
        }

        public static isNullOrEmpty(value: string) {
            return value === null || value === undefined || value.toString().trim().length === 0;
        }

        public static getInfoString(source: string, key: string, defaultValue: string) {

            if(this.isNullOrEmpty(source)) {
                return defaultValue;
            }

            key = "#"+ key;

            let i = source.toLowerCase().indexOf(key.toLowerCase(), 0);

            // the key can't apears more than one
            //
            if(source.toLowerCase().indexOf(key.toLowerCase(), i + 1) !== -1) {
                throw(new Exception("cUtil.getInfoString: the key can't apears more than one."));
            }

            // if the key is not present return default
            //
            if(i === -1) {
                return defaultValue;
            }
            else {
                const c_errorstr = "cUtil.getInfoString: source invalid, the character {0} is not present.";

                let j = source.toLowerCase().indexOf(";".toLowerCase(), i);
                if(j === -1) {
                    throw(new Exception(this.format(c_errorstr, ";")));
                }
                let k = source.substring(i, j).toLowerCase().indexOf("=".toLowerCase(), 0);
                if(k === -1) {
                    throw(new Exception(this.format(c_errorstr, "=")));
                }
                k = k + i;
                return source.substring(k + 1, j);
            }
        }

        public static getToken(token: string, source: string) {
            let i: number = 0;
            let s: string = "";
            debugger; // seguro que este substring esta mal
            if(token.substring(token.length - 1, 1) !== "=") token += "=";
            let l = source.length;
            i = source.indexOf(token);
            if(i === -1) return "";
            i += token.length - 1;

            while (true) {
                i++;
                if(i > l) break;
                debugger; // seguro que este substring esta mal
                let c = source.substring(i, 1);
                if(c !== ";") s += c;
                else break;
            }
            return s;
        }

        //#endregion

        //#region dpi functions

        public static tp(twips: number) {
            const nTwipsPerInch: number = 1440;
            let dpi: number = Utils.getDPI();
            return Math.round((twips / nTwipsPerInch) * dpi);
        }

        public static pt(pixels: number) {
            const nTwipsPerInch: number = 1440;
            let dpi: number = Utils.getDPI();
            return Math.round((pixels / dpi) * nTwipsPerInch);
        }

        private static getDPI() {
            if(Utils._dpi < 0) {
                Utils._dpi = 96; // default HTML canvas DPI
            }
            return Utils._dpi;
        }

        //#endregion

        //#region visibility functions

        public static isVisible(el) {
            return ! this.isHidden(el);
        }

        public static isHidden(el) {
            try {
                return (window.getComputedStyle(el).display === 'none');
            }
            catch(ex) {
                debugger;
                console.log(ex);
                return false;
            }
        }

        //#endregion

        //#region list functions

        public static listAdd(list: ComboBox, value: string, id: number = 0) {
            this.listAdd_(list, value, id);
        }
        public static listID(list: ComboBox): any {
            return this.listID_(list);
        }
        public static listItemData(list: ComboBox, index: number) {
            return this.listItemData_(list, index);
        }
        public static listSetListIndex(list: ComboBox, idx: number) {
            this.listSetListIndex_(list, idx);
        }
        public static listSetListIndexForId(list: ComboBox, id: any) {
            this.listSetListIndexForId_(list, id);
        }
        public static listSetListIndexForText(list: ComboBox, text: string) {
            this.listSetListIndexForText_(list, text);
        }
        public static listChangeTextForSelected(list: ComboBox, value: string) {
            this.listChangeTextForSelected_(list, value);
        }
        public static listChangeText(list: ComboBox, idx: number, value: string) {
            this.listChangeText_(list, idx, value);
        }
        public static listGetIndexFromItemData(list: ComboBox, valueItemData: number) {
            return this.listGetIndexFromItemData_(list, valueItemData);
        }

        private static listAdd_(list: ComboBox, value: string, id: string|number) {
            // TODO: implement
            // list.Items.Add(new ListValueWithId(value, id));
        }
        private static listID_(list: ComboBox): string {
            return list.getOptions()[list.getSelectedIndex()].value;
        }
        private static listItemData_(list: ComboBox, index: number) {
            // TODO: implement
            /*
            let _rtn: number = 0;

            if(index < list.Items.Count) {
                if(index === -1) {
                    _rtn = this.listID_(list);
                }
                else {
                    _rtn = (list.Items[index]).Id;
                }
            }
            return _rtn;
            */
        }
        private static listSetListIndex_(list: ComboBox, idx: number) {
            // TODO: implement
            /*
            if(list.Items.Count < 1) { return; }
            if(list.Items.Count > idx) { list.SelectedIndex = idx; }
            */
        }
        private static listSetListIndexForId_(list: ComboBox, id: number) {
            // TODO: implement
            /*
            let i: number = 0;
            for(i = 0; i < list.Items.Count; i++) {
                if((list.Items[i]).Id === id) {
                    list.SelectedIndex = i;
                    break;
                }
            }
            */
        }
        private static listSetListIndexForText_(list: ComboBox, text: string) {
            // TODO: implement
            /*
            let i: number = 0;
            for(i = 0; i < list.Items.Count; i++) {
                if(list.Items[i].toString() === text) {
                    list.SelectedIndex = i;
                    break;
                }
            }
            */
        }
        private static listChangeTextForSelected_(list: ComboBox, value: string) {
            // TODO: implement
            // this.listChangeText_(list, list.SelectedIndex, value);
        }
        private static listChangeText_(list: ComboBox, idx: number, value: string) {
            // TODO: implement
            /*
            if(idx < list.Items.Count && idx > -1) {
                let item: object = list.Items[idx];
                if(item is ListValueWithId) {
                    (item).setText(value);
                }
                else {
                    list.Items[idx] = value;
                }
            }
            */
        }
        private static listGetIndexFromItemData_(list: ComboBox, valueItemData: number) {
            // TODO: implement
            /*
            for(var i = 0; i < list.Items.Count; i++) {

                if(list.Items[i] is ListValueWithId && (list.Items[i]).Id === valueItemData) {
                    return i;
                }
            }
            return -1;
            */
        }

        //#endregion

        static getInput(input: string, description: string, title: string, inputType = 'text'): Promise<{success: boolean, value: string}> {
            if(this.formInput === null) this.formInput = new FormInput();
            this.formInput.setDetails(description);
            this.formInput.setTitle(title);
            this.formInput.setInput(input);
            this.formInput.setInputType(inputType);
            return this.formInput.showDialog();
        }

        static getValidPath(path: string) {
            return "";
        }

        //#region select html element functions

        static inputEl(id: string) {
            return this.el(id) as HTMLInputElement;
        }

        static imageEl(id: string) {
            return this.el(id) as HTMLImageElement;
        }

        static labelEl(id: string) {
            return this.el(id) as HTMLLabelElement;
        }

        static divEl(id: string) {
            return this.el(id) as HTMLDivElement;
        }

        static selectEl(id: string) {
            return this.el(id) as HTMLSelectElement;
        }

        static el(id: string) {
            const el = document.getElementById(id);
            if(el === null || el === undefined) console.log(id + ' was not found');
            return el;
        }

        static inputElc(className: string, node: HTMLElement) {
            return this.elc(className, node) as HTMLInputElement;
        }

        static imageElc(className: string, node: HTMLElement) {
            return this.elc(className, node) as HTMLImageElement;
        }

        static labelElc(className: string, node: HTMLElement) {
            return this.elc(className, node) as HTMLLabelElement;
        }

        static divElc(className: string, node: HTMLElement) {
            return this.elc(className, node) as HTMLDivElement;
        }

        static selectElc(className: string, node: HTMLElement) {
            return this.elc(className, node) as HTMLSelectElement;
        }

        static elc(className: string, node: HTMLElement) {
            const elements = node.querySelectorAll('.' + className);
            if(elements === null || elements === undefined) {
                console.log(className + ' in node ' + node.toString() + ' was not found');
                return null;
            }
            else {
                return elements[0] as HTMLElement;
            }
        }

        //#endregion

        //#region array functions

        public static newArrayOfInts(size: number): number[] {
            return Array.apply(null, {length: size}).map(() => 0);
        }

        public static newArrayOfObjects<T>(size: number, f:() => T): T[] {
            return Array.apply(null, {length: size}).map(() => f.call(null));
        }

        //#endregion
    }

    export class Maths {

        public static trunc = Math.trunc;

        public static round(num: number, decimals: number): number {
            const offset = 10 * decimals;
            return Math.round((num + Number.EPSILON) * offset) / offset;
        }
    }
}

