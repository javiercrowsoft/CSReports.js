

namespace CSReportDll
{

    export class cReportCompiler {


    {

        // all the functions (c# code or internal functions) use colons as
        // a separator for parameters. The Spanish and other configurations 
        // use the colon as the decimal separator.
        //
        // because of that we need to replace every colon by a pipe
        // and after compiling every parameter and internal function
        // we replace every pipe by a colon and then send the code to
        // c# engine. (Microsoft.CSharp.CSharpCodeProvider)

        // http://stackoverflow.com/questions/137933/what-is-the-best-scripting-language-to-embed-in-a-c-desktop-application

        private C_MODULE: string = "cReportCompiler";

        private C_TEMPFUNCTIONB: string = "Option explicit";
        private C_TEMPFUNCTIONE: string = "\r\n";

        private C_MACRO_CTRL: string = "@@";

        private C_AVERAGE_SUM: string = "AverageSum";
        private C_AVERAGE_COUNT: string = "AverageCount";
        private C_SUM: string = "Sum";
        private C_SUM_TIME: string = "SumTime";
        private C_MAX: string = "Max";
        private C_MIN: string = "Min";
        private C_COUNT: string = "Count";
        private C_NUMBER_TO_STRING: string = "NumberToString";
        private C_GET_BARCODE: string = "GetBarcode";
        private C_GET_DATA_FROM_RS_AD: string = "GetDataFromRsAd";

        private C_ISEQUAL: string = "IsEqual";
        private C_ISNOTEQUAL: string = "IsNotEqual";
        private C_ISGREATERTHAN: string = "IsGreaterThan";
        private C_ISLESSTHAN: string = "IsLessThan";

        private C_GETDATAFROMRS: string = "GetDataFromRs";

        private C_GROUPTOTAL: string = "GroupTotal";
        private C_GROUPMIN: string = "GroupMin";
        private C_GROUPMAX: string = "GroupMax";
        private C_GROUPAVERAGE: string = "GroupAverage";
        private C_GROUPPERCENT: string = "GroupPercent";
        private C_GROUPPERCENTT: string = "GroupPercentT";
        private C_GROUPCOUNT: string = "GroupCount";
        private C_GROUPLINENUMBER: string = "GroupLineNumber";

        private C_ISINRS: string = "IsInRs";

        private C_SPANISH: number = 1;
        private C_ENGLISH: number = 2;
        private C_FRENCH: number = 3;

        private C_KEYFUNCINT: string = "$$$";

        private formulaTypes: cReportFormulaTypes = new cReportFormulaTypes();
        private report: cReport = null;
        private variables: cReportVariables = new cReportVariables();

        // the current formula we are compiling
        //
        private formula: cReportFormula = null;
        // the current internal formula we are compiling
        //
        private fint: cReportFormulaInt = null;

        private objGlobals: cReportCompilerGlobals = new cReportCompilerGlobals();

        private collTextReplace: Dictionary = new Dictionary();
        private ctrlName: string = "";

        private bCompile: boolean = null;
        private idxFormula: number = -1;

        public getReport() {
            return this.report;
        }

        public setReport(rhs: cReport) {
            this.report = rhs;
        }

        public clearVariables() {
            this.variables.clear();
        }

        public initGlobalObject() {
            this.objGlobals.clear();
            this.collTextReplace.Clear();
        }

        // it compiles the code of every formula
        // first it replaces every internal function by 
        // dummy return values (of the type of the internal function)
        // if after the replace there is code it call cReportScriptEngine.compileCode
        // if there are no errors it returns true
        // 
        public checkSyntax(formula: cReportFormula) {
            try {
                let code: string = "";

                this.formula = formula;
                this.formula.getFormulasInt().clear();

                // check syntax
                code = formula.getText();
                this.formula.setTextC(code);

                pCheckSyntax(code);

                return true;
            }
            catch (ex) {
                cError.mngError(ex, "checkSyntax", C_MODULE, "");

                this.formula = null;
                this.fint = null;

                return false;
            }

        }

        public initVariable(formula: cReportFormula) {
            let variable: cReportVariable = null;
            let fint: cReportFormulaInt = null;
            let st: cStructTime = null;

            for(var _i = 0; _i < formula.getFormulasInt().count(); _i++) {
                fint = formula.getFormulasInt().item(_i);
                for(var _j = 0; _j < fint.getVariables().count(); _j++) {
                    variable = fint.getVariables().item(_j);

                    let typeCode: System.TypeCode = System.Type.GetTypeCode(variable.getValue().GetType());
                    switch (typeCode)
                    {

                        case System.TypeCode.DBNull:
                            break;
                        case System.TypeCode.Decimal:
                        case System.TypeCode.Double:
                        case System.TypeCode.Int16:
                        case System.TypeCode.Int32:
                        case System.TypeCode.Int64:
                        case System.TypeCode.Single:
                        case System.TypeCode.UInt16:
                        case System.TypeCode.UInt32:
                        case System.TypeCode.UInt64:
                        case System.TypeCode.Byte:
                        case System.TypeCode.SByte:
                        case System.TypeCode.DateTime:
                        case System.TypeCode.Boolean:
                            variable.setValue(0);
                            break;
                        case System.TypeCode.Char:
                        case System.TypeCode.String:
                            variable.setValue("");
                            break;
                        case System.TypeCode.Object:
                            if (variable.getValue() is cStructTime) {
                                st = variable.getValue();
                                st.setHour(0);
                                st.setMinute(0);
                                st.setSecond(0);
                            }
                            break;
                        case System.TypeCode.Empty:
                            break;
                        default:
                            break;
                    }
                }
            }
        }

        private pEvalGroupFunctions(formula: cReportFormula) {
            let fint: cReportFormulaInt = null;

            for(var _i = 0; _i < formula.getFormulasInt().count(); _i++) {
                fint = formula.getFormulasInt().item(_i);

                switch (fint.getFormulaType())
                {
                    case csRptFormulaType.CSRPTF_GROUP_TOTAL:
                        evalGroupTotal(fint);

                        break;
                    case csRptFormulaType.CSRPTF_GROUP_MAX:
                        evalGroupMax(fint);

                        break;
                    case csRptFormulaType.CSRPTF_GROUP_MIN:
                        evalGroupMin(fint);

                        break;
                    case csRptFormulaType.CSRPTF_GROUP_AVERAGE:
                        evalGroupAverage(fint);

                        break;
                    case csRptFormulaType.CSRPTF_GROUP_PERCENT:
                        evalGroupPercent(fint);

                        break;
                    case csRptFormulaType.CSRPTF_GROUP_COUNT:
                        evalGroupCount(fint);

                        break;
                    case csRptFormulaType.CSRPTF_GROUP_LINE_NUMBER:
                        evalGroupLineNumber(fint);

                        break;
                }
            }
        }

        public resultFunction(formula: cReportFormula) {
            let code: string = "";
            let vResult: object[] = null;

            this.objGlobals.setMode(eReportCompilerMode.C_RESULT);
            this.ctrlName = formula.getControlName();

            vResult = new object[formula.getFormulasInt().count()];

            let fint: cReportFormulaInt = null;

            for(var _i = 0; _i < formula.getFormulasInt().count(); _i++) {
                fint = formula.getFormulasInt().item(_i);
                vResult[_i] = pResultFunctionInt(fint);
            }

            // we check if the code has scripting or is only 
            // calls to internal functions
            //
            code = formula.getTextC().Replace(C_KEYFUNCINT, "");
            code = code.Replace(" ", "");

            // if after removing calls to internal functions and spaces
            // there is only a number we don't have scripting
            //
            if (Utils.isNumber(code)) {
                if (vResult.length > 0) {
                    formula.setLastResult(vResult[0]);
                    formula.setHaveToEval(false);
                    return formula.getLastResult();
                }
                // the function can be only a constant (it is used in Cairo navigation)
                //
                else {
                    return code;
                }
            }
            else {
                code = formula.getTextC();
                let parameters: var = "";

                for(var i = 0; i < vResult.length; i++) {
                    // if one argument is null it means we don't have a row for this formula
                    // so we don't need to compile the code
                    //
                    if (vResult[i] === null)  {
                        return null; 
                    }

                    /* TODO: remove me
                    code = code.Replace(C_KEYFUNCINT + ReportGlobals.format(i + 1, "000"),
                                            getNumericVal(vResult[i].toString()));
                     * */

                    let parameter: var = "p__" + i + "__";
                    parameters += parameter + ",";
                    code = code.Replace(C_KEYFUNCINT + ReportGlobals.format(i + 1, "000"), parameter);

                    let paramValue: var = this.objGlobals.getVar(parameter);
                    if (paramValue === null) {
                        paramValue = this.objGlobals.addVar(parameter);
                    }
                    paramValue.setValue(vResult[i]);
                }

                if (parameters.length > 0) {
                    parameters = parameters.substring(0, parameters.length - 1);
                    code = insertParametersIntoFunction(code, parameters);
                }

                formula.setLastResult(pExecScriptCode(code, formula));
                formula.setHaveToEval(false);
                return formula.getLastResult();
            }
        }

        private insertParametersIntoFunction(code: string, parameters: string) {
            let n: number = code.IndexOf("(") + 1;
            let code: return = code.substring(0, n) + parameters + code.substring(n);
        }

        private pEvalFunctionGroup(fint: cReportFormulaInt) {
            let value: number = 0;
            let total: number = 0;

            if (fint.getVariables().count() > 0) {
                if (fint.getParameters().item(ReportGlobals.C_KEYINDEXCOL2) === null) {
                    value = 0;
                }
                else {
                    let columnIndex: number = Utils.parseInt(fint.getParameters().item(ReportGlobals.C_KEYINDEXCOL2).getValue());
                    value = Utils.val(this.report.getValueFromRs(columnIndex).toString());
                }

                let variable: cReportVariable = fint.getVariables().item(C_GROUPPERCENTT);
                total = Utils.val(variable.getValue().toString());
                value = cUtil.divideByZero(value, total);
                variable.setValue(value);

            }

        }

        public evalFunctionGroup(formula: cReportFormula) {
            let fint: cReportFormulaInt = null;

            for(var _i = 0; _i < formula.getFormulasInt().count(); _i++) {
                fint = formula.getFormulasInt().item(_i);
                pEvalFunctionGroup(fint);
            }
        }

        public evalFunction(formula: cReportFormula) {
            let codeC: string = "";

            this.objGlobals.setMode(eReportCompilerMode.C_EVAL);

            pEvalGroupFunctions(formula);

            cReportError.gDebugSection = formula.getSectionName();
            cReportError.gDebugSectionLine = formula.getSectionLineIndex();
            cReportError.gDebugControl = formula.getControlName();

            this.formula = formula;

            pCompile(formula.getText(), false, codeC);

            if (formula.getFormulasInt().count() > 0) {
                if (Utils.isNumber(codeC)) {
                    pEvalSyntax("", codeC, false, formula);
                }
                else {
                    if (cUtil.substring(codeC.Trim(), 0, 8).toLowerCase() === "function") {
                        pEvalSyntax("", codeC, false, formula);
                    }
                }
            }
            else {
                pEvalSyntax("", codeC, false, formula);
            }
            this.formula = null;
        }

        private pCompile(code: string, bCompile: boolean, codeC: string) {
            this.bCompile = bCompile;
            this.idxFormula = -1;

            code = pColonToPipe(code);

            return pCompileAux(code, codeC);
        }

        private pColonToPipe(code: string) {
            return code.Replace(",", "|");
        }

        private pPipeToColon(code: string) {
            return code.Replace("|", ",");
        }

        private pIsFunction(word: string) {
            let f: cReportFormulaType = null;

            for(var _i = 0; _i < this.formulaTypes.count(); _i++) {
                f = this.formulaTypes.item(_i);
                if (word.toLowerCase() === f.getName().toLowerCase()) {
                    return true;
                }
            }
            return false;
        }

        private pAddFormulaInt(functionName: string, code: string) {
            // the firs thing we need to do is add this internal formula 
            // to the internal formula collection of this formula
            //
            this.fint = this.formula.getFormulasInt().add();
            return pEvalSyntax(functionName, code, true, null);
        }

        private pEvalFunctionInt(fint: cReportFormulaInt) {
            switch (fint.getFormulaType())
            {
                case csRptFormulaType.CSRPTF_AVERAGE:
                    evalAverage(fint);
                    break;

                case csRptFormulaType.CSRPTF_SUM:
                    evalSum(fint);
                    break;

                case csRptFormulaType.CSRPTF_SUM_TIME:
                    evalSumTime(fint);
                    break;

                case csRptFormulaType.CSRPTF_MAX:
                    evalMax(fint);
                    break;

                case csRptFormulaType.CSRPTF_MIN:
                    evalMin(fint);
                    break;

                case csRptFormulaType.CSRPTF_COUNT:
                    evalCount(fint);
                    break;

                case csRptFormulaType.CSRPTF_NUMBER_TO_STRING:
                    evalNumberToString(fint);
                    break;

                case csRptFormulaType.CSRPTF_IS_EQUAL:
                    evalIsEqual(fint);
                    break;

                case csRptFormulaType.CSRPTF_IS_NOT_EQUAL:
                    evalIsNotEqual(fint);
                    break;

                case csRptFormulaType.CSRPTF_IS_GREATER_THAN:
                    evalIsGreaterThan(fint);
                    break;

                case csRptFormulaType.CSRPTF_IS_LESS_THAN:
                    evalIsLessThan(fint);
                    break;

                case csRptFormulaType.CSRPTF_CALCULO:
                    // nothing to do
                    break;

                case csRptFormulaType.CSRPTF_DECLARE_VAR:
                    evalDeclareVar(fint);
                    break;

                case csRptFormulaType.CSRPTF_GET_VAR:
                    // nothing to do
                    break;

                case csRptFormulaType.CSRPTF_GET_PARAM:
                    // nothing to do
                    break;

                case csRptFormulaType.CSRPTF_SET_VAR:
                    evalSetVar(fint);
                    break;

                case csRptFormulaType.CSRPTF_GET_BARCODE:
                    evalGetBarcode(fint);
                    break;

                case csRptFormulaType.CSRPTF_ADD_TO_VAR:
                    evalAddToVar(fint);
                    break;

                case csRptFormulaType.CSRPTF_GET_DATA_FROM_RS_AD:
                    evalGetDataFromRsAd(fint);
                    break;

                case csRptFormulaType.CSRPTF_GET_DATA_FROM_RS:
                    evalGetDataFromRs(fint);
                    break;

                case csRptFormulaType.CSRPTF_IS_IN_RS:
                    evalIsInRs(fint);
                    break;
            }
        }

        private pResultFunctionInt(fint: cReportFormulaInt) {
            switch (fint.getFormulaType())
            {
                case csRptFormulaType.CSRPTF_AVERAGE:
                    return resultAverage(fint);

                case csRptFormulaType.CSRPTF_SUM:
                    return resultSum(fint);

                case csRptFormulaType.CSRPTF_GET_STRING:
                    return resultGetString(fint);

                case csRptFormulaType.CSRPTF_SUM_TIME:
                    return resultSumTime(fint);

                case csRptFormulaType.CSRPTF_MAX:
                    return resultMax(fint);

                case csRptFormulaType.CSRPTF_MIN:
                    return resultMin(fint);

                case csRptFormulaType.CSRPTF_COUNT:
                    return resultCount(fint);

                case csRptFormulaType.CSRPTF_NUMBER_TO_STRING:
                    return resultNumberToString(fint);

                case csRptFormulaType.CSRPTF_IS_EQUAL:
                    return resultIsEqual(fint);

                case csRptFormulaType.CSRPTF_IS_NOT_EQUAL:
                    return resultIsNotEqual(fint);

                case csRptFormulaType.CSRPTF_IS_GREATER_THAN:
                    return resultIsGreaterThan(fint);

                case csRptFormulaType.CSRPTF_IS_LESS_THAN:
                    return resultIsLessThan(fint);

                case csRptFormulaType.CSRPTF_PAGE_NUMBER:
                    return resultPageNumber();

                case csRptFormulaType.CSRPTF_TOTAL_PAGES:
                    return resultTotalPages();

                case csRptFormulaType.CSRPTF_VAL:
                    return resultValue(fint);

                case csRptFormulaType.CSRPTF_LENGTH:
                    return resultLength(fint);

                case csRptFormulaType.CSRPTF_TEXT_REPLACE:
                    return resultTextReplace(fint);

                case csRptFormulaType.CSRPTF_CALCULO:
                    return resultCalculo(fint);

                case csRptFormulaType.CSRPTF_DECLARE_VAR:
                    // nothing to do
                    break;

                case csRptFormulaType.CSRPTF_GET_VAR:
                    return resultGetVar(fint);

                case csRptFormulaType.CSRPTF_GET_PARAM:
                    return resultGetParam(fint);

                case csRptFormulaType.CSRPTF_SET_VAR:
                    // nothing to do
                    break;

                case csRptFormulaType.CSRPTF_ADD_TO_VAR:
                    // nothing to do
                    break;

                case csRptFormulaType.CSRPTF_GET_DATA_FROM_RS_AD:
                    return resultGetDataFromRsAd(fint);

                case csRptFormulaType.CSRPTF_GET_DATA_FROM_RS:
                    return resultGetDataFromRs(fint);

                case csRptFormulaType.CSRPTF_GROUP_TOTAL:
                    return resultGroupTotal(fint);

                case csRptFormulaType.CSRPTF_GROUP_MAX:
                    return resultGroupMax(fint);

                case csRptFormulaType.CSRPTF_GROUP_MIN:
                    return resultGroupMin(fint);

                case csRptFormulaType.CSRPTF_GROUP_AVERAGE:
                    return resultGroupAverage(fint);

                case csRptFormulaType.CSRPTF_GROUP_PERCENT:
                    return resultGroupPercent(fint);

                case csRptFormulaType.CSRPTF_GROUP_COUNT:
                    return resultGroupCount(fint);

                case csRptFormulaType.CSRPTF_GROUP_LINE_NUMBER:
                    return resultGroupLineNumber(fint);

                case csRptFormulaType.CSRPTF_IS_IN_RS:
                    return resultIsInRs(fint);

                case csRptFormulaType.CSRPTF_GET_BARCODE:
                    return resultGetBarcode(fint);
            }
            return null;
        }

        private pEvalSyntax(functionName: string, code: string, bParam: boolean, formula: cReportFormula) {
            let i: number = 0;
            let s: string = "";

            code = removeReturns(code);

            if (functionName.length > 0) {
                return pCheckInternalFunction(functionName, code);
            }
            else if (code.length === 0) {
                return "";
            }
            else if (code === "\"\"") {
                return "";
            }
            else if (Utils.isNumber(code)) {
                return code;
            }
            else if (ReportGlobals.isDate(code)) {
                return code;
            }
            else if (pIsTime(code)) {
                return code;
            }
            else if (!bParam) {
                pExecScriptCode(code, formula);
                return code;
            }
            else {

                let vParams: string[] = null;
                let parameters: string = "";

                parameters = code.Trim();
                if (parameters.length > 2) {
                    parameters = parameters.substring(2, parameters.length - 2);
                    parameters = parameters.Trim();
                    vParams = parameters.Split('|');
                }

                try {
                    for (i = 0; i < vParams.length; i++) {
                        try {
                            // if it is a number we don't need to evaluate it
                            //
                            if (!Utils.isNumber(vParams[i])) {

                                if (!pIsControl(vParams[i])) {
                                    // Si se produce un error es por que se trata
                                    // de un parametro a la funcion, la asignacion
                                    // no se llevara a cabo, y no perdere el valor
                                    // del parametro
                                    s = C_TEMPFUNCTIONB + vParams[i] + C_TEMPFUNCTIONE;
                                    vParams[i] = pExecScriptCode(s, formula).toString();
                                }
                            }
                            code = vParams[i] + "|";
                        }
                        catch (ex) {
                            // we don't care about errors here
                        }
                    }

                    code = cUtil.removeLastColon(code);
                    return code;
                }
                catch(ex) {
                    // we don't care about errors here
                }
            }
            return null;
        }

        private pIsTime(code: string) {
            let vTime: string[] = null;

            code = code.Trim();
            if (code.IndexOf(":", 0) === 0)  {
                return false; 
            }

            vTime = code.Split(':');
            if (vTime.length !== 1)  {
                return false; 
            }

            if (!(Utils.isNumber(vTime[0]) && Utils.isNumber(vTime[1])))  {
                return false; 
            }
            return true;
        }

        private pCheckSyntax(code: string) {
            pCompile(code, true, "");
        }

        private pExecScriptCode(code: string, formula: cReportFormula) {
            try {
                code = pPipeToColon(code);
                if (formula.getCompiledScript() === null) {
                    formula.setCompiledScript(cReportScriptEngine.compileCode(code, formula));
                }
                return cReportScriptEngine.eval(formula.getCompiledScript(), this.objGlobals);
            }
            catch (ex) {
                let msg: string = ex.Source;
                            + ex.Message + "\n\nCode:\n=====\n\n" + code + "\n\n"
                            + ex.HelpLink;
                throw new ReportException(csRptErrors.ERROR_IN_SCRIPT, C_MODULE, msg);
            }
        }

        private pIsControl(param: string) {
            let ctrl: cReportControl = null;
            for(var _i = 0; _i < this.report.getControls().count(); _i++) {
                ctrl = this.report.getControls().item(_i);
                if (ctrl.getName().toUpperCase() === param.toUpperCase()) {
                    return true;
                }
            }
            return false;
        }

        private pGetControl(param: string) {
            let ctrl: cReportControl = null;
            for(var _i = 0; _i < this.report.getControls().count(); _i++) {
                ctrl = this.report.getControls().item(_i);
                if (ctrl.getName().toUpperCase() === param.toUpperCase()) {
                    return ctrl;
                }
            }
            return null;
        }

        private pGetSubName(code: string) {
            let pos: number = 0;
            let i: number = 0;
            let c: string = "";

            pos = code.IndexOf(" ", 0) + 1;
            i = pos;
            while (i < code.length) {
                c = code.substring(i, 1);
                if (pIsSeparator(c)) {
                    break;
                }
                i++;
            }
            return code.substring(pos, i - pos);
        }

        private pGetParameter(parameters: string, paramIndex: number, funName: string) {
            let param: string = "";
            let vParam: string[] = null;

            vParam = parameters.Split('|');

            if (paramIndex > vParam.length + 1) {
                throw new ReportArgumentMissingException(
                    C_MODULE,
                    cReportError.errGetDescript(
                                    csRptErrors.CSRPTERRMISSINGPARAM,
                                    paramIndex.toString(),
                                    funName));
            }
            else {
                param = vParam[paramIndex];
            }

            return param.Replace(")", "").Trim();
        }

        private pCheckInternalFunction(functionName: string, code: string) {
            let name: string = "";
            let parameters: string = "";
            let idFunction: csRptFormulaType = 0;

            let r: number = 0;
            let q: number = 0;
            let tc: string = "";

            name = functionName;
            parameters = code.Trim();
            if (parameters.length > 2) {
                parameters = parameters.substring(1, parameters.length - 2);
            }

            // we need to replace in this.formula.getTextC() the function name by its key
            // 
            tc = this.formula.getTextC();
            q = name.length;
            r = tc.toLowerCase().IndexOf(name.toLowerCase(), 0);
            q = tc.toLowerCase().IndexOf(")".toLowerCase(), r) + 1;

            this.formula.setTextC((tc.substring(0, r)).toString()
                                + C_KEYFUNCINT
                                + ReportGlobals.format(this.formula.getFormulasInt().count(), "000")
                                + tc.substring(q));

            idFunction = pGetIdFunction(name);
            this.fint.setFormulaType(idFunction);

            switch (idFunction)
            {

                case csRptFormulaType.CSRPTF_PAGE_NUMBER:

                    // in compiling time we need to return a value which is consistent
                    // with the return type of the internal function
                    //
                    if (this.report === null) {
                        return 0;
                    }
                    else {
                        return this.report.getCurrenPage();
                    }

                case csRptFormulaType.CSRPTF_TEXT_REPLACE:
                    // in compiling time we need to return a value which is consistent
                    // with the return type of the internal function
                    //
                    return "";

                case csRptFormulaType.CSRPTF_TOTAL_PAGES:
                    return this.report.getTotalPages();

                // all this functions have the same amount of parameters
                //
                case csRptFormulaType.CSRPTF_AVERAGE:
                case csRptFormulaType.CSRPTF_SUM:
                case csRptFormulaType.CSRPTF_MAX:
                case csRptFormulaType.CSRPTF_MIN:
                case csRptFormulaType.CSRPTF_LENGTH:
                case csRptFormulaType.CSRPTF_VAL:
                    // in this evaluation we load the parameters of the function
                    //
                    pCheckParameters(1, parameters, name);
                    // in compiling time we need to return a value which is consistent
                    // with the return type of the internal function
                    //
                    return 0;

                case csRptFormulaType.CSRPTF_GROUP_TOTAL:
                case csRptFormulaType.CSRPTF_GROUP_MAX:
                case csRptFormulaType.CSRPTF_GROUP_MIN:
                case csRptFormulaType.CSRPTF_GROUP_AVERAGE:
                    // in this evaluation we load the parameters of the function
                    //
                    pCheckParameters(2, parameters, name);
                    // in compiling time we need to return a value which is consistent
                    // with the return type of the internal function
                    //
                    return 0;

                // all this functions have the same amount of parameters
                //
                case csRptFormulaType.CSRPTF_GROUP_COUNT:
                case csRptFormulaType.CSRPTF_GROUP_PERCENT:
                    // in this evaluation we load the parameters of the function
                    //
                    pCheckParameters(3, parameters, name);
                    // in compiling time we need to return a value which is consistent
                    // with the return type of the internal function
                    //
                    return 0;

                case csRptFormulaType.CSRPTF_GET_STRING:
                    // in this evaluation we load the parameters of the function
                    //
                    pCheckParameters(1, parameters, name);
                    // in compiling time we need to return a value which is consistent
                    // with the return type of the internal function
                    //
                    return "\"\"";

                case csRptFormulaType.CSRPTF_SUM_TIME:
                    // in this evaluation we load the parameters of the function
                    //
                    pCheckParameters(2, parameters, name);
                    // in compiling time we need to return a value which is consistent
                    // with the return type of the internal function
                    //
                    return 0;

                case csRptFormulaType.CSRPTF_COUNT:
                    // in compiling time we need to return a value which is consistent
                    // with the return type of the internal function
                    //
                    return 0;

                case csRptFormulaType.CSRPTF_NUMBER_TO_STRING:
                    // in this evaluation we load the parameters of the function
                    //
                    pCheckParameters(2, parameters, name);
                    // in compiling time we need to return a value which is consistent
                    // with the return type of the internal function
                    //
                    return "\"\"";

                // all this functions have the same amount of parameters
                //
                case csRptFormulaType.CSRPTF_IS_EQUAL:
                case csRptFormulaType.CSRPTF_IS_NOT_EQUAL:
                case csRptFormulaType.CSRPTF_IS_GREATER_THAN:
                case csRptFormulaType.CSRPTF_IS_LESS_THAN:
                case csRptFormulaType.CSRPTF_IS_IN_RS:
                    // in this evaluation we load the parameters of the function
                    //
                    pCheckParameters(2, parameters, name);
                    // in compiling time we need to return a value which is consistent
                    // with the return type of the internal function
                    //
                    return 0;

                // all this functions have the same amount of parameters
                //
                case csRptFormulaType.CSRPTF_CALCULO:
                case csRptFormulaType.CSRPTF_GET_DATA_FROM_RS_AD:
                case csRptFormulaType.CSRPTF_GET_DATA_FROM_RS:
                    // in this evaluation we load the parameters of the function
                    //
                    pCheckParameters(4, parameters, name);
                    // in compiling time we need to return a value which is consistent
                    // with the return type of the internal function
                    //
                    return 0;

                // all this functions have the same amount of parameters
                //
                case csRptFormulaType.CSRPTF_DECLARE_VAR:
                case csRptFormulaType.CSRPTF_GET_VAR:
                    // in this evaluation we load the parameters of the function
                    //
                    pCheckParameters(1, parameters, name);
                    // in compiling time we need to return a value which is consistent
                    // with the return type of the internal function
                    //
                    return 0;

                case csRptFormulaType.CSRPTF_GET_PARAM:
                    // in this evaluation we load the parameters of the function
                    //
                    pCheckParameters(1, parameters, name);
                    // in compiling time we need to return a value which is consistent
                    // with the return type of the internal function
                    //
                    return 0;

                // all this functions have the same amount of parameters
                //
                case csRptFormulaType.CSRPTF_ADD_TO_VAR:
                case csRptFormulaType.CSRPTF_SET_VAR:
                    // in this evaluation we load the parameters of the function
                    //
                    pCheckParameters(2, parameters, name);
                    // in compiling time we need to return a value which is consistent
                    // with the return type of the internal function
                    //
                    return 0;

                case csRptFormulaType.CSRPTF_GET_BARCODE:
                    // in this evaluation we load the parameters of the function
                    //
                    pCheckParameters(1, parameters, name);
                    // in compiling time we need to return a value which is consistent
                    // with the return type of the internal function
                    //
                    return "\"\"";

                default:
                    throw new ReportNotDefinedFunctionException(
                        C_MODULE,
                        cReportError.errGetDescript(csRptErrors.CSRPTERRINDEFINEDFUNCTION,name));
            }
        }

        private resultGetString(fint: cReportFormulaInt) {
            let param: string = "";

            param = fint.getParameters().item(0).getValue();

            if (param === "\"\"") {
                return param;
            }
            else {
                if (pIsControl(param)) {
                    return "\"" + this.report.getValueString(param).Replace("\"", "\"\"") + "\"";
                }
                else {
                    return "\"" + param.Replace("\"", "\"\"") + "\"";
                }
            }
        }

        private resultSumTime(fint: cReportFormulaInt) {
            if (fint.getVariables().count() === 0)  {
                return ""; 
            }
            let st: cStructTime = null;
            st = fint.getVariables().item(C_SUM_TIME).getValue();
            if (Utils.val(fint.getParameters().item(1).getValue()) !== 0) {
                return ReportGlobals.format(st.getHour(), "00")
                        + ":" + ReportGlobals.format(st.getMinute(), "00")
                        + ":" + ReportGlobals.format(st.getSecond(), "00");
            }
            else {
                return ReportGlobals.format(st.getHour(), "00") + ":" + ReportGlobals.format(st.getMinute(), "00");
            }
        }

        private resultSum(fint: cReportFormulaInt) {
            if (fint.getVariables().count() === 0) { return 0; }
            return Convert.ToDouble(fint.getVariables().item(C_SUM).getValue());
        }

        private resultGetDataFromRsAd(fint: cReportFormulaInt) {
            return null;
        }

        private resultGetDataFromRs(fint: cReportFormulaInt) {
            return null;
        }

        private resultGetVar(fint: cReportFormulaInt) {
            let varName: string = "";
            varName = fint.getParameters().item(0).getValue();

            if (this.variables.item(varName) === null) {
                throw new ReportArgumentMissingException(
                    C_MODULE,
                    cReportError.errGetDescript(
                                    csRptErrors.CSRPTERRMISSINGPARAM,
                                    varName,
                                    "_getVar()"));
            }
            return this.variables.item(varName).getValue();
        }

        private resultGetParam(fint: cReportFormulaInt) {
            let param: cParameter = null;
            let paramName: string = "";

            paramName = fint.getParameters().item(0).getValue();

            for(var _i = 0; _i < this.report.getConnect().getParameters().count(); _i++) {
                param = this.report.getConnect().getParameters().item(_i);
                if (param.getName().toLowerCase() === paramName.toLowerCase()) {
                    break;
                }
            }

            if (param === null) {
                throw new ReportArgumentMissingException(
                    C_MODULE,
                    cReportError.errGetDescript(
                                    csRptErrors.CSRPTERRMISSINGPARAM,
                                    paramName,
                                    "_getParameter()"));
            }

            return param.getValue();
        }

        private resultMax(fint: cReportFormulaInt) {
            if (fint.getVariables().count() === 0) { return 0; }
            return fint.getVariables().item(C_MAX).getValue();
        }

        private resultMin(fint: cReportFormulaInt) {
            if (fint.getVariables().count() === 0) { return 0; }
            return fint.getVariables().item(C_MIN).getValue();
        }

        private resultCount(fint: cReportFormulaInt) {
            if (fint.getVariables().count() === 0) { return null; }
            return fint.getVariables().item(C_COUNT).getValue();
        }

        private resultNumberToString(fint: cReportFormulaInt) {
            if (fint.getVariables().count() > 0) {
                return fint.getVariables().item(C_NUMBER_TO_STRING).getValue();
            }
            else {
                return "";
            }
        }

        private resultGetBarcode(fint: cReportFormulaInt) {
            if (fint.getVariables().count() > 0) {
                return fint.getVariables().item(C_GET_BARCODE).getValue();
            }
            else {
                return "";
            }
        }

        private resultIsEqual(fint: cReportFormulaInt) {
            if (fint.getVariables().count() > 0) {
                return fint.getVariables().item(C_ISEQUAL).getValue();
            }
            else {
                return 0;
            }
        }

        private resultIsNotEqual(fint: cReportFormulaInt) {
            if (fint.getVariables().count() > 0) {
                return fint.getVariables().item(C_ISNOTEQUAL).getValue();
            }
            else {
                return 0;
            }
        }

        private resultIsGreaterThan(fint: cReportFormulaInt) {
            if (fint.getVariables().count() > 0) {
                return fint.getVariables().item(C_ISGREATERTHAN).getValue();
            }
            else {
                return 0;
            }
        }

        private resultIsLessThan(fint: cReportFormulaInt) {
            if (fint.getVariables().count() > 0) {
                return fint.getVariables().item(C_ISLESSTHAN).getValue();
            }
            else {
                return 0;
            }
        }

        private resultAverage(fint: cReportFormulaInt) {
            if (fint.getVariables().count() === 0)  {
                return 0; 
            }
            let sum: number = fint.getVariables().item(C_AVERAGE_SUM).getValue();
            let count: number = fint.getVariables().item(C_AVERAGE_COUNT).getValue();
            return sum / count;
        }

        private resultCalculo(fint: cReportFormulaInt) {
            let control: string = "";
            let value1: number = 0;
            let value2: number = 0;
            let oper: number = 0;

            control = fint.getParameters().item(1).getValue();

            value1 = Convert.ToDouble(this.report.getValue(fint.getParameters().item(0).getValue(), true));

            if (control !== "\"\"") {
                value2 = Convert.ToDouble(this.report.getValue(control, true));
            }
            else {
                value2 = double.Parse(fint.getParameters().item(2).getValue());
            }

            oper = Utils.parseInt(fint.getParameters().item(3).getValue());

            switch (oper)
            {
                // addition
                case 1:
                    return value1 + value2;

                // substraction
                case 2:
                    return value1 - value2;

                // multiplication
                case 3:
                    return value1 * value2;

                // division
                case 4:
                    return cUtil.divideByZero(value1, value2);

                // power
                case 5:
                    return Math.Pow(value1, (value2));

                default:
                    return 0;                    
            }
        }

        private resultLength(fint: cReportFormulaInt) {
            return this.report.getValueString(fint.getParameters().item(0).getValue()).length;
        }

        private resultTextReplace(fint: cReportFormulaInt) {
            let i: number = 0;
            let ctrl: cReportControl = null;
            let text: string = "";
            let collCtrlsToReplace: List = null;

            ctrl = pGetControl(this.ctrlName);
            if (ctrl === null) {
                return "";
            }

            text = ctrl.getLabel().getText();

            try {
                collCtrlsToReplace = this.collTextReplace[this.ctrlName];
            }
            catch(ex) {
                let lenText: number = 0;
                let pos: number = 0;
                let endpos: number = 0;

                collCtrlsToReplace = new List();

                lenText = text.length;
                while (i < lenText) {
                    pos = text.IndexOf(C_MACRO_CTRL, i + 1);
                    if (pos > 0) {
                        endpos = text.IndexOf(C_MACRO_CTRL, pos + 1);

                        if (endpos > 0) {
                            collCtrlsToReplace.Add(text.substring(pos + 2, endpos - pos - 2));
                        }
                        i = endpos + 1;
                    }
                    else {
                        i = lenText + 1;
                    }
                }

                this.collTextReplace.Add(this.ctrlName, collCtrlsToReplace);
            }

            let ctrlValue: cReportControl = null;
            for (i = 0; i < collCtrlsToReplace.Count; i++) {
                ctrlValue = pGetControl(collCtrlsToReplace[i]);
                if (ctrlValue !== null) {
                    text = text.Replace(C_MACRO_CTRL + collCtrlsToReplace[i] + C_MACRO_CTRL,
                                        this.report.getValue(ctrlValue.getName(), false).toString());
                }
            }
            return text;
        }

        private resultValue(fint: cReportFormulaInt) {
            return this.report.getValue(fint.getParameters().item(0).getValue(), true);
        }

        private resultPageNumber() {
            return this.report.getCurrenPage();
        }

        private resultTotalPages() {
            return this.report.getTotalPages();
        }

        private resultGroupTotal(fint: cReportFormulaInt) {
            if (fint.getVariables().count() > 0) {
                return fint.getVariables().item(C_GROUPTOTAL).getValue();
            }
            else {
                return 0;
            }
        }

        private resultGroupMax(fint: cReportFormulaInt) {
            if (fint.getVariables().count() > 0) {
                return fint.getVariables().item(C_GROUPMAX).getValue();
            }
            else {
                return 0;
            }
        }

        private resultGroupMin(fint: cReportFormulaInt) {
            if (fint.getVariables().count() > 0) {
                return fint.getVariables().item(C_GROUPMIN).getValue();
            }
            else {
                return 0;
            }
        }

        private resultGroupAverage(fint: cReportFormulaInt) {
            if (fint.getVariables().count() > 0) {
                return fint.getVariables().item(C_GROUPAVERAGE).getValue();
            }
            else {
                return 0;
            }
        }

        private resultGroupPercent(fint: cReportFormulaInt) {
            if (fint.getVariables().count() > 0) {
                return fint.getVariables().item(C_GROUPPERCENT).getValue();
            }
            else {
                return 0;
            }
        }

        private resultGroupCount(fint: cReportFormulaInt) {
            if (fint.getVariables().count() > 0) {
                return fint.getVariables().item(C_GROUPCOUNT).getValue();
            }
            else {
                return 0;
            }
        }

        private resultGroupLineNumber(fint: cReportFormulaInt) {
            if (fint.getVariables().count() > 0) {
                return fint.getVariables().item(C_GROUPLINENUMBER).getValue();
            }
            else {
                return 0;
            }
        }

        private resultIsInRs(fint: cReportFormulaInt) {
            if (fint.getVariables().count() > 0) {
                return fint.getVariables().item(C_ISINRS).getValue();
            }
            else {
                return 0;
            }
        }

        private evalAverage(fint: cReportFormulaInt) {
            if (fint.getVariables().item(C_AVERAGE_SUM) === null) {
                fint.getVariables().add(null, C_AVERAGE_SUM);
                fint.getVariables().add(null, C_AVERAGE_COUNT);
            }

            let item: cReportVariable = fint.getVariables().item(C_AVERAGE_SUM);
            // the average function is for numbers
            //
            item.setValue(item.getValue()
                + pGetNumber(this.report.getValue(fint.getParameters().item(0).getValue(), true)));

            item = fint.getVariables().item(C_AVERAGE_COUNT);
            // the average function is for numbers
            //
            item.setValue(item.getValue() + 1);
        }

        private pGetNumber(number: object) {
            let strNumber: string = number.toString();
            let rtn: number = 0;
            let sepDecimal: string = "";

            if (Utils.isNumber(strNumber)) {
                sepDecimal = cUtil.getSepDecimal();
                if (sepDecimal !== ".") {
                    strNumber = strNumber.Replace(".", sepDecimal);
                }
                rtn = Utils.val(strNumber);

            }

            return rtn;
        }

        private evalSum(fint: cReportFormulaInt) {
            if (fint.getVariables().item(C_SUM) === null) {
                fint.getVariables().add(null, C_SUM).setValue(0);
            }

            let item: cReportVariable = fint.getVariables().item(C_SUM);
            // the sum function is for numbers
            //
            item.setValue(Convert.ToDouble(item.getValue())
                + pGetNumber(this.report.getValue(fint.getParameters().item(0).getValue(), true)));
        }

        private evalDeclareVar(fint: cReportFormulaInt) {
            let varName: string = "";

            varName = fint.getParameters().item(0).getValue();

            if (this.variables.item(varName) === null) {
                this.variables.add(null, varName);
            }
        }

        private evalSetVar(fint: cReportFormulaInt) {
            let varName: string = "";

            varName = fint.getParameters().item(0).getValue();

            if (this.variables.item(varName) === null) {
                throw new ReportArgumentMissingException(
                    C_MODULE,
                    cReportError.errGetDescript(
                                    csRptErrors.CSRPTERRMISSINGPARAM,
                                    varName,
                                    "_setVar"));
            }

            let item: cReportVariable = this.variables.item(varName);
            item.setValue(fint.getParameters().item(1).getValue());
        }

        private evalGetDataFromRsAd(fint: cReportFormulaInt) {

        }

        private evalGetDataFromRs(fint: cReportFormulaInt) {

        }

        private evalAddToVar(fint: cReportFormulaInt) {
            let varName: string = "";

            varName = fint.getParameters().item(0).getValue();

            if (this.variables.item(varName) === null) {
                throw new ReportArgumentMissingException(
                    C_MODULE,
                    cReportError.errGetDescript(
                                    csRptErrors.CSRPTERRMISSINGPARAM,
                                    varName,
                                    "_evalAddToVar"));
            }

            let item: cReportVariable = this.variables.item(varName);
            // the EvalAddToVar function is for numbers
            //
            item.setValue(item.getValue() 
                                + pGetNumber(fint.getParameters().item(1).getValue()));
        }

        private evalSumTime(fint: cReportFormulaInt) {
            if (fint.getVariables().item(C_SUM_TIME) === null) {
                fint.getVariables().add(null, C_SUM_TIME).setValue(new cStructTime());
            }

            let item: cReportVariable = fint.getVariables().item(C_SUM_TIME);
            // the SumTime if for dates
            //
            pSumTimes(item.getValue(),
                        DateTime.Parse(this.report.getValue(fint.getParameters().item(0).getValue(), true).toString()));
        }

        private evalMax(fint: cReportFormulaInt) {
            let value: object = null;

            if (fint.getVariables().item(C_MAX) === null) {
                fint.getVariables().add(null, C_MAX);
            }

            let item: cReportVariable = fint.getVariables().item(C_MAX);
            // the Max function if for numbers and strings
            //
            value = this.report.getValue(fint.getParameters().item(0).getValue());

            if (value.GetType() === typeof(String)) {
                if (String.Compare(item.getValue().toString(), 
                                    value.toString(), 
                                    StringComparison.CurrentCulture) < 0) {
                    item.setValue(value);
                }
            }
            else {
                if (item.getValue() < value) {
                    item.setValue(value);
                }
            }
        }

        private evalMin(fint: cReportFormulaInt) {
            let value: object = null;

            if (fint.getVariables().item(C_MIN) === null) {
                fint.getVariables().add(null, C_MIN);
            }

            let item: cReportVariable = fint.getVariables().item(C_MIN);
            // The Min function is for numbers and strings
            //
            value = this.report.getValue(fint.getParameters().item(0).getValue());

            if (value.GetType() === typeof(String)) {
                if (String.Compare(item.getValue().toString(),
                                    value.toString(),
                                    StringComparison.CurrentCulture) > 0) {
                    item.setValue(value);
                }
            }
            else {
                if (item.getValue() > value) {
                    item.setValue(value);
                }
            }
        }

        private evalCount(fint: cReportFormulaInt) {
            if (fint.getVariables().item(C_COUNT) === null) {
                fint.getVariables().add(null, C_COUNT);
            }

            let item: cReportVariable = fint.getVariables().item(C_COUNT);
            // the Count functio is for numbers
            //
            item.setValue(item.getValue() + 1);
        }

        private evalNumberToString(fint: cReportFormulaInt) {
            if (fint.getVariables().item(C_NUMBER_TO_STRING) === null) {
                fint.getVariables().add(null, C_NUMBER_TO_STRING);
            }

            let item: cReportVariable = fint.getVariables().item(C_NUMBER_TO_STRING);
            // the NumberToString funciton is for numbres
            //
            let iNumber: number = 0;
            let iLenguage: number = 0;

            iNumber = pGetNumber(this.report.getValue(fint.getParameters().item(0).getValue(), true));
            iLenguage = cUtil.valAsInt(fint.getParameters().item(1).getValue());

            let ntos: cNumberToString = new cNumberToString();

            switch (iLenguage)
            {
                case C_SPANISH:
                    item.setValue(ntos.spanishNumberToString(iNumber));
                    break;
                case C_ENGLISH:
                    item.setValue(ntos.englishNumberToString(iNumber));
                    break;
                case C_FRENCH:
                    item.setValue(ntos.frenchNumberToString(iNumber));
                    break;
            }
        }

        private evalIsEqual(fint: cReportFormulaInt) {
            if (fint.getVariables().item(C_ISEQUAL) === null) {
                fint.getVariables().add(null, C_ISEQUAL);
            }

            let item: cReportVariable = fint.getVariables().item(C_ISEQUAL);
            // the IsEqual function is for numbers
            //
            let strValue: string = "";
            let strConstValue: string = "";

            strValue = this.report.getValue(fint.getParameters().item(0).getValue(), true).toString();
            strConstValue = fint.getParameters().item(1).getValue();

            item.setValue(strValue === strConstValue);
        }

        private evalIsNotEqual(fint: cReportFormulaInt) {
            if (fint.getVariables().item(C_ISNOTEQUAL) === null) {
                fint.getVariables().add(null, C_ISNOTEQUAL);
            }

            let item: cReportVariable = fint.getVariables().item(C_ISNOTEQUAL);
            // the IsNotEqual function is for numbers
            //
            let strValue: string = "";
            let strConstValue: string = "";

            strValue = this.report.getValue(fint.getParameters().item(0).getValue(), true);
            strConstValue = fint.getParameters().item(1).getValue();

            item.setValue(strValue !== strConstValue);
        }

        private evalIsGreaterThan(fint: cReportFormulaInt) {
            if (fint.getVariables().item(C_ISGREATERTHAN) === null) {
                fint.getVariables().add(null, C_ISGREATERTHAN);
            }

            let item: cReportVariable = fint.getVariables().item(C_ISGREATERTHAN);
            // the IsGreaterThan function is for numbers
            //
            let value: object = this.report.getValue(fint.getParameters().item(0).getValue(), true);
            private constValue: object = fint.getParameters().item(1).getValue();

            if (value.GetType() === typeof(String)) {
                let strValue: string = value.toString();
                private strConstValue: string = constValue.toString();

                if (String.Compare(strValue.toString(),
                                    strConstValue.toString(),
                                    StringComparison.CurrentCulture) > 0) {
                    item.setValue(true);
                }
                else {
                    item.setValue(false);
                }
            }
            else {
                if (value > constValue) {
                    item.setValue(true);
                }
                else  {
                    item.setValue(false);
                }
            }
        }

        private evalIsLessThan(fint: cReportFormulaInt) {
            if (fint.getVariables().item(C_ISLESSTHAN) === null) {
                fint.getVariables().add(null, C_ISLESSTHAN);
            }

            let item: cReportVariable = fint.getVariables().item(C_ISLESSTHAN);
            // the IsLessThan function is for numbers
            //
            let value: object = this.report.getValue(fint.getParameters().item(0).getValue(), true);
            private constValue: object = fint.getParameters().item(1).getValue();

            if (value.GetType() === typeof(String)) {
                let strValue: string = value.toString();
                private strConstValue: string = constValue.toString();

                if (String.Compare(strValue.toString(),
                                    strConstValue.toString(),
                                    StringComparison.CurrentCulture) < 0) {
                    item.setValue(true);
                }
                else {
                    item.setValue(false);
                }
            }
            else {
                if (value < constValue) {
                    item.setValue(true);
                }
                else {
                    item.setValue(false);
                }
            }
        }

        private evalGroupTotal(fint: cReportFormulaInt) {
            if (fint.getVariables().item(C_GROUPTOTAL) === null) {
                fint.getVariables().add(null, C_GROUPTOTAL);
            }

            let item: cReportVariable = fint.getVariables().item(C_GROUPTOTAL);
            // the Total function is for numbres

            // if param1 doesn't contain an index column is because we haven't
            // process the formulas yet. It happens because compilereport
            // is called before the InitColIndex in cReport's Launch function
            // and the order can not be changed because the function GetData 
            // is executed after the CompileReport function, and we don't want
            // to change this order because we are afraid of the collateral damage
            // it could produce :(
            //
            // In the future we can analize it and modify the order and if this
            // doesn't produce any error we will remove this if :)
            //
            if (fint.getParameters().item(ReportGlobals.C_KEYINDEXCOL) === null) {
                item.setValue(0);
            }
            else {
                item.setValue(
                    this.report.getGroupTotal(
                        Utils.parseInt(fint.getParameters().item(ReportGlobals.C_KEYINDEXCOL).getValue()),
                        Utils.parseInt(fint.getParameters().item(ReportGlobals.C_KEYINDEXGROUP).getValue())));
            }
        }

        private evalGroupMax(fint: cReportFormulaInt) {
            if (fint.getVariables().item(C_GROUPMAX) === null) {
                fint.getVariables().add(null, C_GROUPMAX);
            }

            let item: cReportVariable = fint.getVariables().item(C_GROUPMAX);
            // the Group Max function is for numbers and strings

            // if param1 doesn't contain an index column is because we haven't
            // process the formulas yet. It happens because compilereport
            // is called before the InitColIndex in cReport's Launch function
            // and the order can not be changed because the function GetData 
            // is executed after the CompileReport function, and we don't want
            // to change this order because we are afraid of the collateral damage
            // it could produce :(
            //
            // In the future we can analize it and modify the order and if this
            // doesn't produce any error we will remove this if :)
            //
            if (fint.getParameters().item(ReportGlobals.C_KEYINDEXCOL) === null) {
                item.setValue(0);
            }
            else {
                item.setValue(
                    this.report.getGroupMax(
                                Utils.parseInt(fint.getParameters().item(ReportGlobals.C_KEYINDEXCOL).getValue()),
                                Utils.parseInt(fint.getParameters().item(ReportGlobals.C_KEYINDEXGROUP).getValue())));
            }
        }

        private evalGroupMin(fint: cReportFormulaInt) {
            if (fint.getVariables().item(C_GROUPMIN) === null) {
                fint.getVariables().add(null, C_GROUPMIN);
            }

            let item: cReportVariable = fint.getVariables().item(C_GROUPMIN);
            // the Group Min function is for numbers and strings

            // if param1 doesn't contain an index column is because we haven't
            // process the formulas yet. It happens because compilereport
            // is called before the InitColIndex in cReport's Launch function
            // and the order can not be changed because the function GetData 
            // is executed after the CompileReport function, and we don't want
            // to change this order because we are afraid of the collateral damage
            // it could produce :(
            //
            // In the future we can analize it and modify the order and if this
            // doesn't produce any error we will remove this if :)
            //
            if (fint.getParameters().item(ReportGlobals.C_KEYINDEXCOL) === null) {
                item.setValue(0);
            }
            else {
                item.setValue(
                    this.report.getGroupMin(
                        Utils.parseInt(fint.getParameters().item(ReportGlobals.C_KEYINDEXCOL).getValue()),
                        Utils.parseInt(fint.getParameters().item(ReportGlobals.C_KEYINDEXGROUP).getValue())));
            }
        }

        private evalGroupAverage(fint: cReportFormulaInt) {
            if (fint.getVariables().item(C_GROUPAVERAGE) === null) {
                fint.getVariables().add(null, C_GROUPAVERAGE);
            }

            let item: cReportVariable = fint.getVariables().item(C_GROUPAVERAGE);
            // the Average function is for numbers

            // if param1 doesn't contain an index column is because we haven't
            // process the formulas yet. It happens because compilereport
            // is called before the InitColIndex in cReport's Launch function
            // and the order can not be changed because the function GetData 
            // is executed after the CompileReport function, and we don't want
            // to change this order because we are afraid of the collateral damage
            // it could produce :(
            //
            // In the future we can analize it and modify the order and if this
            // doesn't produce any error we will remove this if :)
            //
            if (fint.getParameters().item(ReportGlobals.C_KEYINDEXCOL) === null) {
                item.setValue(0);
            }
            else {
                item.setValue(
                    this.report.getGroupAverage(
                        Utils.parseInt(fint.getParameters().item(ReportGlobals.C_KEYINDEXCOL).getValue()),
                        Utils.parseInt(fint.getParameters().item(ReportGlobals.C_KEYINDEXGROUP).getValue())));
            }
        }

        // this function only get the total of the group
        // the percent is calculated in the function ResultGroupPercent
        //
        private evalGroupPercent(fint: cReportFormulaInt) {
            if (fint.getVariables().item(C_GROUPPERCENTT) === null) {
                fint.getVariables().add(null, C_GROUPPERCENTT);
            }

            if (fint.getVariables().item(C_GROUPPERCENT) === null) {
                fint.getVariables().add(null, C_GROUPPERCENT);
            }

            let item: cReportVariable = fint.getVariables().item(C_GROUPPERCENTT);
            // the Percent function is for numbers

            // if param1 doesn't contain an index column is because we haven't
            // process the formulas yet. It happens because compilereport
            // is called before the InitColIndex in cReport's Launch function
            // and the order can not be changed because the function GetData 
            // is executed after the CompileReport function, and we don't want
            // to change this order because we are afraid of the collateral damage
            // it could produce :(
            //
            // In the future we can analize it and modify the order and if this
            // doesn't produce any error we will remove this if :)
            //
            if (fint.getParameters().item(ReportGlobals.C_KEYINDEXCOL) === null) {
                item.setValue(0);
            }
            else {
                item.setValue(
                    this.report.getGroupTotal(
                        Utils.parseInt(fint.getParameters().item(ReportGlobals.C_KEYINDEXCOL).getValue()),
                        Utils.parseInt(fint.getParameters().item(ReportGlobals.C_KEYINDEXGROUP).getValue())));
            }
            pEvalFunctionGroup(fint);
        }

        private evalGroupCount(fint: cReportFormulaInt) {
            if (fint.getVariables().item(C_GROUPCOUNT) === null) {
                fint.getVariables().add(null, C_GROUPCOUNT);
            }

            let item: cReportVariable = fint.getVariables().item(C_GROUPCOUNT);
            // the Count function is for numbers

            // if param1 doesn't contain an index column is because we haven't
            // process the formulas yet. It happens because compilereport
            // is called before the InitColIndex in cReport's Launch function
            // and the order can not be changed because the function GetData 
            // is executed after the CompileReport function, and we don't want
            // to change this order because we are afraid of the collateral damage
            // it could produce :(
            //
            // In the future we can analize it and modify the order and if this
            // doesn't produce any error we will remove this if :)
            //
            if (fint.getParameters().item(ReportGlobals.C_KEYINDEXCOL) === null) {
                item.setValue(0);
            }
            else {
                item.setValue(
                    this.report.getGroupCount(
                        Utils.parseInt(fint.getParameters().item(ReportGlobals.C_KEYINDEXCOL).getValue()),
                        Utils.parseInt(fint.getParameters().item(ReportGlobals.C_KEYINDEXGROUP).getValue())));
            }
        }

        private evalGroupLineNumber(fint: cReportFormulaInt) {
            if (fint.getVariables().item(C_GROUPLINENUMBER) === null) {
                fint.getVariables().add(null, C_GROUPLINENUMBER);
            }

            let item: cReportVariable = fint.getVariables().item(C_GROUPLINENUMBER);
            // the LineNumber function is for numbers
            item.setValue(
                this.report.getGroupLineNumber(
                    Utils.parseInt(fint.getParameters().item(ReportGlobals.C_KEYINDEXGROUP).getValue())));
        }

        private evalIsInRs(fint: cReportFormulaInt) {
            if (fint.getVariables().item(C_ISINRS) === null) {
                fint.getVariables().add(null, C_ISINRS);
            }

            let item: cReportVariable = fint.getVariables().item(C_ISINRS);
            // TODO: finish coding evalIsInRs
            //
            item.setValue(true);
        }

        private evalGetBarcode(fint: cReportFormulaInt) {
            if (fint.getVariables().item(C_GET_BARCODE) === null) {
                fint.getVariables().add(null, C_GET_BARCODE);
            }

            let item: cReportVariable = fint.getVariables().item(C_GET_BARCODE);

            let barcodeGen: var = new CSReportBarcode.cReportBarcode();
            let value: var = fint.getParameters().item(0).getValue();
            let barcode: var = barcodeGen.encodeTo128(value);

            if (barcode.contains("Ã‚")) barcode = barcodeGen.code128a(value); {

            item.setValue(barcode);
        }

        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //
        private pCheckParameters(cantParams: number, parameters: string, name: string) {
            for(var i = 0; i < cantParams; i++) {
                // It must receive the control name
                //
                let param: string = pGetParameter(parameters, i, name);

                if (param.length === 0) {
                    throw new ReportArgumentMissingException(
                        C_MODULE,
                        cReportError.errGetDescript(
                                        csRptErrors.CSRPTERRMISSINGPARAM,
                                        i.toString(),
                                        name));
                }

                this.fint.getParameters().add(param);
            }
        }

        private pGetIdFunction(name: string) {
            let f: cReportFormulaType = null;

            name = name.toLowerCase();
            for(var _i = 0; _i < this.formulaTypes.count(); _i++) {
                f = this.formulaTypes.item(_i);
                if (name === f.getName().toLowerCase()) {
                    return f.getId();
                }
            }
            return 0;
        }

        private pIsSeparator(c: string) {
            return " |:+()/-*=\r\n".IndexOf(c, 0) > -1 && c !== "";
        }

        private removeReturns(code: string) {
            let c: string = "";
            for(var i = 0; i < code.length; i++) {
                c = code.substring(i, 1);
                if (c !== " " && c !== "\r" && c !== "\n") {
                    code = code.substring(i);
                    break; 
                }
            }

            return code;
        }

        // Dates start 1-1-1900 00:00:00
        //
        private pSumTimes(st: cStructTime, date2: DateTime) {
            let n2: number = 0;
            let h2: number = 0;
            let s2: number = 0;

            let n: number = 0;
            let h: number = 0;
            let s: number = 0;
            let d: number = 0;

            s2 = date2.Second;
            n2 = date2.Minute;
            h2 = date2.Hour;

            // get seconds
            //
            s = (st.getSecond() + s2) % 60;

            // get minutes
            //
            n = ((st.getSecond() + s2) / 60);
            n = n + (st.getMinute() + n2) % 60;

            // get hours
            //
            h = ((st.getMinute() + n2) / 60);
            h = h + st.getHour() + h2;

            st.setSecond(s);
            st.setMinute(n);
            st.setHour(h);
        }

        private pCompileAux(code: string, codeC: string) {
            let codeCallFunction: string = "";
            let codeCallFunctionC: string = "";
            let functionName: string = "";
            let word: string = "";

            let nStart: number = 0;
            let nLenCode: number = code.length;

            codeC = "";

            do {
                word = pGetWord(code, nStart);
                if (pIsFunctionAux(word, functionName)) {

                    codeCallFunction = pGetCallFunction(code, nStart);

                    if (!pCompileAux(codeCallFunction, codeCallFunctionC)) {
                        return false;
                    }

                    codeC = codeC + pExecFunction(functionName, codeCallFunctionC);
                }
                else {
                    codeC = codeC + word;
                }
            } while (nStart < nLenCode);

            return true;
        }

        private pGetWord(code: string, nStart: number) {
            let c: string = "";
            let nLenCode: number = 0;
            let word: string = "";

            nLenCode = code.length;

            c = code.substring(nStart, 1);

            do {
                word += c;
                nStart += 1;
                if (pIsSeparator(c)) break; {
                c = cUtil.substring(code, nStart, 1);
            } while (!pIsSeparator(c) && nStart < nLenCode);

            return word;
        }

        private pIsFunctionAux(word: string, functionName: string) {
            if (!pIsFunction(word)) { return false; }
            functionName = word;
            return true;
        }

        private pGetCallFunction(code: string, nStart: number) {
            let c: string = "";
            let nLenCode: number = 0;
            let word: string = "";
            let nInner: number = 0;

            nLenCode = code.length;
            nInner = -1;

            do {
                c = code.substring(nStart, 1);
                word = word + c;
                nStart = nStart + 1;
            } while (!pIsEndCallFunction(c, nInner) && nStart < nLenCode);

            return word;
        }

        private pIsEndCallFunction(c: string, nInner: number) {
            let _rtn: boolean = false;
            if (c === ")") {
                if (nInner === 0) {
                    _rtn = true;
                }
                else {
                    nInner = nInner - 1;
                }
            }
            else if (c === "(")
            {
                nInner = nInner + 1;
            }
            return _rtn;
        }

        private String pExecFunction(String functionName, String parameters)
        {
            if (this.bCompile)
            {
                return pAddFormulaInt(functionName, parameters).toString();
            }
            else
            {
                cReportFormulaInt fint = null;
                this.idxFormula = this.idxFormula + 1;
                fint = this.formula.getFormulasInt().item(this.idxFormula);
                pSetParams(fint, parameters);
                pEvalFunctionInt(fint);
                object value = pResultFunctionInt(fint);
                if (value !== null)
                {
                    return getNumericVal(value.toString());
                }
                else
                {
                    return "";
                }
            }
        }

        private void pSetParams(cReportFormulaInt fint, String parameters)
        {
            String[] vParams = null;
            int i = 0;

            parameters = parameters.Trim();
            if (parameters.length > 2)
            {
                parameters = parameters.substring(1, parameters.length - 2);
                parameters = parameters.Trim();
                vParams = parameters.Split('|');

                for (i = 0; i < vParams.length; i++)
                {
                    fint.getParameters().item(i).setValue(vParams[i].Trim());
                }
            }
        }

        private String getNumericVal(String value)
        {
            int decimalDigit = 0;
            decimalDigit = value.IndexOf(",", 0);
            if (decimalDigit > 0)
            {
                value = value.Replace(",", ".");
            }
            return value;
        }



    } 



}
