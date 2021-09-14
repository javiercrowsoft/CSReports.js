namespace CSKernelClient {

    export class RefWrapper<T> {

        private value: T;

        public constructor(value: T = null) {
            this.value = value;
        }

        public set(value: T) {
            this.value = value;
        }

        public get(): T {
            return this.value;
        }
    }
}