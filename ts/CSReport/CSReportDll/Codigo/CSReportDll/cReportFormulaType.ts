

namespace CSReportDll
{
    export class cReportFormulaType {


    {
        private name: string = "";
        private nameUser: string = "";
        private id: csRptFormulaType = 0;
        private decrip: string = "";
        private helpContextId: number = 0;

        public getName() {
            return this.name;
        }

        public setName(rhs: string) {
            this.name = rhs;
        }

        public getNameUser() {
            return this.nameUser;
        }

        public setNameUser(rhs: string) {
            this.nameUser = rhs;
        }

        public getId() {
            return this.id;
        }

        public setId(rhs: csRptFormulaType) {
            this.id = rhs;
        }

        public getDecrip() {
            return this.decrip;
        }

        public setDecrip(rhs: string) {
            this.decrip = rhs;
        }

        public getHelpContextId() {
            return this.helpContextId;
        }

        public setHelpContextId(rhs: csRptFormulaType) {
            this.helpContextId = rhs;
        }

        public setHelpContextId(rhs: number) {
            this.helpContextId = rhs;
        }



    }    }



}
