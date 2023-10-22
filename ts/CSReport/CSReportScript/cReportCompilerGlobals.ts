namespace CSReportScript {

    import Map = CSOAPI.Map;

    export class cReportCompilerGlobals extends Map<cReportCompilerVar> {

        private mode: eReportCompilerMode = eReportCompilerMode.C_EVAL;

        constructor() {
            super(null, false, cReportCompilerVar);
        }

        public getMode(): eReportCompilerMode {
            return this.mode;
        }

        public setMode(mode: eReportCompilerMode) {
            this.mode = mode;
        }

        public addVar(varName: string): cReportCompilerVar {
            try {
                this.add(new cReportCompilerVar(), varName);
                return this.getVar(varName);
            } catch(ignore) {
                return null;
            }
        }

        public getVar(varName: string): cReportCompilerVar {
            try  {
                return this.item(varName);
            } catch(ignore) {
                return null;
            }
        }
    }

    export enum eReportCompilerMode {
        C_EVAL,
        C_RESULT
    }
}
