namespace CSKernelClient  {

    export class Callable {

        public static call(t, f) {
            return (...args: any[]) => f.apply(t, [...args]);
        }

        public static resolvedPromise<T>(result: T = null) {
            return new Promise<T>((resolve) => {
                return resolve(result);
            });            
        }
    }
}
