namespace CSDataBase
{
    export class cJSONDataSource {

        private readonly name: string = null;
        private readonly data: object = null;

        public constructor(name: string, data: object) {
            this.name = name;
            this.data = data;
        }

        public getName() {
            return this.name;
        }

        public getData() {
            return this.data;
        }
    }
}
