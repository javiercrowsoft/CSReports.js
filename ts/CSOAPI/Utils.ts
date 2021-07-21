namespace CSOAPI {

    export class Utils {

        public static parseInt(value: any): number {
            return parseInt(value.toString());
        }

        public static isNumber(value: any): boolean {
            value = value.toString();
            try {
                value = parseFloat(value);
                return isNaN(value) ? false : true;
            }
            catch(ignore) {
                return false;
            }
        }

        public static val(value: any): number {
            if(value === null || value === undefined) return 0;
            else {
                try {
                    value = parseFloat(value);
                    return isNaN(value) ? 0 : value;
                }
                catch(ignore) {
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
            }
            else {
                return 0;
            }
        }

        public static removeLastColon(list: string) {
            list = list.trim();
            if (list.substring(list.length - 1) === ",") {
                return list.substring(0, list.length - 1);
            }
            else {
                return list;
            }
        }

        static getSepDecimal() {
            return (1.1).toLocaleString().substring(1, 2);
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