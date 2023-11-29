namespace CSKernelClient  {

    export class Callable {

        public static call<T extends Function>(t: object, f: T): T {
            return ((...args: any[]) => f.apply(t, [...args])) as unknown as T;
        }

        public static _<T>(result: T = null) {
            return new Promise<T>((resolve) => {
                return resolve(result);
            });
        }
    }
}
