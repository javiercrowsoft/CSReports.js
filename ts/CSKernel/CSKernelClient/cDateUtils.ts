namespace CSKernelClient {

    export class cDateUtils {

        public static isDate(value: any) {
            if (this.isValidDate(value)) {
                return true;
            }
            else {
                let t: string = typeof value;
                if (t === "string") {
                    return this.isValidDate(Date.parse(value));
                }
                else {
                    return false;
                }
            }
        }

        private static isValidDate(date: any): boolean {
            return date && Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date);
        }
    }
}
