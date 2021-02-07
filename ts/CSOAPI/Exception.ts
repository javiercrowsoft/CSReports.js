namespace CSOAPI {

    export class Exception {

        private message: string;

        public constructor(message: string) {
            this.message = message;
        }

        public getMessage(): string {
            return this.message;
        }
    }
}