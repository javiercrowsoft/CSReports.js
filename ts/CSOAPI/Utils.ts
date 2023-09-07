namespace CSOAPI {

    import ComboBox = CSReportEditor.ComboBox;
    import RefWrapper = CSKernelClient.RefWrapper;

    export class Utils {

        private static _dpi = -1;

        public static parseInt(value: any): number {
            return parseInt(value.toString());
        }

        public static isNumber(value: any): boolean {
            try {
                return isNaN(parseFloat(value.toString()));
            }
            catch (ignore) {
                return false;
            }
        }

        public static val(value: any): number {
            if (value === null || value === undefined) return 0;
            else {
                try {
                    value = parseFloat(value);
                    return isNaN(value) ? 0 : value;
                } catch (ignore) {
                    return 0;
                }
            }
        }

        public static valInt(value: any): number {
            return parseInt(this.val(value) as any);
        }

        public static divideByZero(x1: number, x2: number) {
            if (x2 !== 0) {
                return x1 / x2;
            } else {
                return 0;
            }
        }

        public static removeLastColon(list: string) {
            list = list.trim();
            if (list.substring(list.length - 1) === ",") {
                return list.substring(0, list.length - 1);
            } else {
                return list;
            }
        }

        static getSepDecimal() {
            return (1.1).toLocaleString().substring(1, 2);
        }

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
            if (Utils._dpi < 0) {
                Utils._dpi = 96; // default HTML canvas DPI
            }
            return Utils._dpi;
        }

        public static isVisible(el) {
            return ! this.isHidden(el);
        }

        public static isHidden(el) {
            return (window.getComputedStyle(el).display === 'none');
        }

        private static _sepDecimal = "";

        public static setSepDecimal() {
            const decimalSeparator = 1.1;
            Utils._sepDecimal = decimalSeparator.toLocaleString().substring(1, 2);
        }

        public static getToken(token: string, source: string) {
            let i: number = 0;
            let s: string = "";

            if (token.substring(token.length - 1, 1) !== "=") token += "=";
            let l = source.length;
            i = source.indexOf(token);
            if (i === -1) return "";
            i += token.length - 1;

            while (true) {
                i++;
                if (i > l) break;
                let c = source.substring(i, 1);
                if (c !== ";") s += c;
                else break;
            }
            return s;
        }

        //-------------------------------------------------------------------------

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
            // TODO: implement
            /*
            if (list.SelectedIndex === -1) { return 0; }
            return (list.SelectedItem).Id;
            */
            return "0";
        }
        private static listItemData_(list: ComboBox, index: number) {
            // TODO: implement
            /*
            let _rtn: number = 0;

            if (index < list.Items.Count) {
                if (index === -1) {
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
            if (list.Items.Count < 1) { return; }
            if (list.Items.Count > idx) { list.SelectedIndex = idx; }
            */
        }
        private static listSetListIndexForId_(list: ComboBox, id: number) {
            // TODO: implement
            /*
            let i: number = 0;
            for (i = 0; i < list.Items.Count; i++) {
                if ((list.Items[i]).Id === id) {
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
            for (i = 0; i < list.Items.Count; i++) {
                if (list.Items[i].ToString() === text) {
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
            if (idx < list.Items.Count && idx > -1) {
                let item: object = list.Items[idx];
                if (item is ListValueWithId) {
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

                if (list.Items[i] is ListValueWithId && (list.Items[i]).Id === valueItemData) {
                    return i;
                }
            }
            return -1;
            */
        }

        static getInput(input: RefWrapper<string>, description: string, title: string): Promise<boolean> {
            return Promise.resolve(false);
        }

        static getValidPath(path: string) {
            return "";
        }
    }

    export class Maths {

        public static trunc = Math.trunc;

        public static round(num: number, decimals: number): number {
            const offset = 10 * decimals;
            return Math.round((num + Number.EPSILON) * offset) / offset;
        }
    }
}

