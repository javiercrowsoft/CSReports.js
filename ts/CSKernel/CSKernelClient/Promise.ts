namespace CSKernelClient  {

    export class Callable {

        public static call<T extends Function>(t: object, f: T, ...curryArgs: any[]): T {
            return ((...args: any[]) => f.apply(t, [...curryArgs.concat(args)])) as unknown as T;
        }

        public static _<T>(result: T = null) {
            return new Promise<T>((resolve) => {
                return resolve(result);
            });
        }
    }
}
