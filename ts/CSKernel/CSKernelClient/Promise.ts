namespace CSKernelClient  {

    export class Callable {

        public static call<T extends Function>(t: object, f: T): T {
            return ((...args: any[]) => f.apply(t, [...args])) as unknown as T;
        }

        /*public static ifTrue<T extends Function>(t: object, f: T): T {
            return ((...args: any[]) => {
                if(args[0] === true) return f.apply(t, [...args])
                else                 return false;
            }) as unknown as T;
        }*/

        public static ifTrue = this.call;

        public static _<T>(result: T = null) {
            return new Promise<T>((resolve) => {
                return resolve(result);
            });
        }
    }
}
