namespace CSKernelClient  {

    export class Callable {

        public static call(t, f) {
            return (r) => f.apply(t, [r]);
        }
    }
}
