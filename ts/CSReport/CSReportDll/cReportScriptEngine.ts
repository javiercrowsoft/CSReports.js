namespace CSReportDll {

    import cReportCompilerGlobals = CSReportScript.cReportCompilerGlobals;

    export class cReportScriptEngine {

        private getFunctionCall(code: string, formula: cReportFormula) {
            let n: number = code.indexOf("(");
            let functionName = code.substring(8, n-8);
            let parameters = "";
            for(let _i = 0; _i < formula.getFormulasInt().count(); _i++) {
                let fint = formula.getFormulasInt().item(_i);
                parameters += "globals.getVar(\"p__" + _i + "__\").getValue(),";
            }
            if (parameters.length > 0) {
                parameters = parameters.substring(0, parameters.length - 1);
            }
            return functionName + "(" + parameters + ")";
        }

        private putCodeInClass(code: string, formula: cReportFormula) {
            if (code.substring(0, 8).toLowerCase() === "function") {
                return "Public Class util\r\n"
                     + "Implements CSReportScript.cIReportScriptType\r\n"
                     + code + "\r\n"
                     + "Public Function RunScript(globals As CSReportScript.cReportCompilerGlobals) As String Implements CSReportScript.cIReportScriptType.RunScript\r\n"
                     + "  dim value__ = " + this.getFunctionCall(code, formula) + "\r\n"

                     // TODO: remove debug info
                     /*
                     + "  System.Console.WriteLine(\"" + formula.getName() + "\")\r\n"
                     + "  Dim var__\r\nFor Each var__ In globals\r\n System.Console.WriteLine(var__.toString() + \" : \" + globals.getVar(var__).getValue().toString())\r\nNext\r\n"
                     + "  System.Console.WriteLine(value__.toString())\r\n"
                     + "  System.Console.WriteLine(\"---------------\")\r\n"
                      */ 
                     // end debug info

                     + "  Select Case Microsoft.VisualBasic.Information.VarType(value__)\r\n"
                     + "    Case 11\r\n"
                     + "      RunScript = System.Math.trunc(value__)\r\n"
                     + "    Case 7\r\n"
                     + "      RunScript = String.Format(\"{0:MM/dd/yyyy}\", value__)\r\n"
                     + "    Case Else\r\n"
                     + "      RunScript = value__\r\n"
                     + "  End Select\r\n"
                     + "End Function\r\n"
                     + "Function Now()\r\n"
                     + "  Now = Microsoft.VisualBasic.Now\r\n"
                     + "End Function\r\n"
                     + "Function UCase(text)\r\n"
                     + "  UCase = text.toUpperCase()\r\n"
                     + "End Function\r\n"
                     + "Function Mid(text, start, len) As String\r\n"
                     + "  Mid = Microsoft.VisualBasic.Strings.Mid(text, start, len)\r\n"
                     + "End Function\r\n"
                     + "Function Chr(code) As String\r\n"
                     + "  Chr = Microsoft.VisualBasic.Strings.Chr(code)\r\n"
                     + "End Function\r\n"
                     + "Function FormatNumber(expression, digits) As String\r\n"
                     + "  FormatNumber = Microsoft.VisualBasic.Strings.FormatNumber(expression, digits)\r\n"
                     + "End Function\r\n"
                     + "Function FormatDateTime(aDate, format) As String\r\n"
                     + "    FormatDateTime = Microsoft.VisualBasic.Strings.FormatDateTime(aDate, format)\r\n"
                     + "End Function\r\n"
                     + "End Class";
            }
            else {
                // TODO: implement c# scripting
                //
            }
        }

        public static compileCode(code: string, formula: cReportFormula) {

        }

        public static eval(script: object, globals: cReportCompilerGlobals): any {
            return "";
        }
    } 
}
