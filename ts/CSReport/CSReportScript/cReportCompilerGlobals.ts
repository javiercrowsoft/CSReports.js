namespace CSReportScript {

    import Map = CSOAPI.Map;

    export class cReportCompilerGlobals extends Map<cReportCompilerVar> {

        private mode: eReportCompilerMode = eReportCompilerMode.C_EVAL;

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
            } catch(e) {
                return null;
            }
        }

        public getVar(varName: string): cReportCompilerVar {
            try  {
                return this.item(varName);
            } catch(e) {
                return null;
            }
        }
    }

    export enum eReportCompilerMode {
        C_EVAL,
        C_RESULT
    }
}
