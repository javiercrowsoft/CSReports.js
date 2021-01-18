

namespace CSDataBase
{
    export class cJSONDataSource {


    {
        private name: string = null;
        private data: JObject = null;

        public constructor(name: string, data: JObject) {
            this.name = name;
            this.data = data;
        }

        public getName() {
            return this.name;
        }

        public getData() {
            return this.data;
        }


    }    }
}
