namespace CSKernelClient  {

    export class Callable {

        public static call(t, f) {
            return (r) => f.apply(t, [r]);
        }

        public static resolvedPromise<T>(result: T = null) {
            return new Promise<T>((resolve) => {
                return resolve(result);
            });            
        }
    }
}
