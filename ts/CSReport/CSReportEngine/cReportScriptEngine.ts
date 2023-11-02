namespace CSReportEngine {

    import cReportCompilerGlobals = CSReportScript.cReportCompilerGlobals;

    export class cReportScriptEngine {

        private static getFunctionCall(code: string, formula: cReportFormula) {
            let n: number = code.indexOf("(");
            let functionName = code.substring(8, n);
            let parameters = "";
            for(let _i = 0; _i < formula.getFormulasInt().count(); _i++) {
                parameters += "globals.getVar(\"p__" + _i + "__\").getValue(),";
            }
            if(parameters.length > 0) {
                parameters = parameters.substring(0, parameters.length - 1);
            }
            return functionName + "(" + parameters + ")";
        }

        private static putCodeInClass(code: string, formula: cReportFormula) {

            return    "(()= > {"
                    + "\n\n"
                    + "\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"
                    + "\n\n"
                    + code
                    + "\n\n"
                    + "\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"
                    + "\n\n"
                    + "    const runScript = (globals) => {"
                    + "\n\n"
                    + "        return " + this.getFunctionCall(code, formula)
                    + "\n\n"
                    + "    };"
                    + "\n\n"
                    + "    return {runScript};"
                    + "\n\n"
                    + "};)()";

        }

        public static compileCode(code: string, formula: cReportFormula) {
            const codeInClass = this.putCodeInClass(code, formula);
            return eval?.(`"use string";(${codeInClass})`);
        }

        public static eval(script: any, globals: cReportCompilerGlobals): any {
            return script.runScript(globals);
        }
    }
}
