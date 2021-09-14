namespace CSReportDll {

    import Map = CSOAPI.Map;
    import cReportCompilerGlobals = CSReportScript.cReportCompilerGlobals;
    import csRptErrors = CSReportGlobals.csRptErrors;
    import csRptFormulaType = CSReportGlobals.csRptFormulaType;
    import cError = CSKernelClient.cError;
    import ReportGlobals = CSReportGlobals.ReportGlobals;
    import Utils = CSOAPI.Utils;
    import eReportCompilerMode = CSReportScript.eReportCompilerMode;
    import cDateUtils = CSKernelClient.cDateUtils;
    import cNumberToString = CSKernelNumberToString.cNumberToString;
    import RefWrapper = CSKernelClient.RefWrapper;

    export class cReportCompiler {

        // all the functions (c# code or internal functions) use colons as
        // a separator for parameters. The Spanish and other configurations 
        // use the colon as the decimal separator.
        //
        // because of that we need to replace every colon by a pipe
        // and after compiling every parameter and internal function
        // we replace every pipe by a colon and then send the code to
        // c# engine. (Microsoft.CSharp.CSharpCodeProvider)

        // http://stackoverflow.com/questions/137933/what-is-the-best-scripting-language-to-embed-in-a-c-desktop-application

        private static C_TEMP_FUNCTION_B: string = "Option explicit";
        private static C_TEMP_FUNCTION_E: string = "\r\n";

        private static C_MACRO_CTRL: string = "@@";

        private static C_AVERAGE_SUM: string = "AverageSum";
        private static C_AVERAGE_COUNT: string = "AverageCount";
        private static C_SUM: string = "Sum";
        private static C_SUM_TIME: string = "SumTime";
        private static C_MAX: string = "Max";
        private static C_MIN: string = "Min";
        private static C_COUNT: string = "Count";
        private static C_NUMBER_TO_STRING: string = "NumberToString";
        private static C_GET_BARCODE: string = "GetBarcode";
        private static C_GET_DATA_FROM_RS_AD: string = "GetDataFromRsAd";

        private static C_IS_EQUAL: string = "IsEqual";
        private static C_IS_NOT_EQUAL: string = "IsNotEqual";
        private static C_IS_GREATER_THAN: string = "IsGreaterThan";
        private static C_IS_LESS_THAN: string = "IsLessThan";

        private static C_GET_DATA_FROM_RS: string = "GetDataFromRs";

        private static C_GROUP_TOTAL: string = "GroupTotal";
        private static C_GROUP_MIN: string = "GroupMin";
        private static C_GROUP_MAX: string = "GroupMax";
        private static C_GROUP_AVERAGE: string = "GroupAverage";
        private static C_GROUP_PERCENT: string = "GroupPercent";
        private static C_GROUP_PERCENT_T: string = "GroupPercentT";
        private static C_GROUP_COUNT: string = "GroupCount";
        private static C_GROUP_LINE_NUMBER: string = "GroupLineNumber";

        private static C_IS_IN_RS: string = "IsInRs";

        private static C_SPANISH: number = 1;
        private static C_ENGLISH: number = 2;
        private static C_FRENCH: number = 3;

        private static C_KEY_FUNC_INT: string = "$$$";

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

        private collTextReplace = new Map<string>();
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
            this.collTextReplace.clear();
        }

        // it compiles the code of every formula
        // first it replaces every internal function by 
        // dummy return values (of the type of the internal function)
        // if after the replace there is code it call cReportScriptEngine.compileCode
        // if there are no errors it returns true
        // 
        public checkSyntax(formula: cReportFormula) {
            try {
                this.formula = formula;
                this.formula.getFormulasInt().clear();

                // check syntax
                let code = formula.getText();
                this.formula.setTextC(code);

                this.pCheckSyntax(code);

                return true;
            }
            catch (ex) {
                cError.mngError(ex);

                this.formula = null;
                this.fint = null;

                return false;
            }
        }

        public initVariable(formula: cReportFormula) {
            for(let i = 0; i < formula.getFormulasInt().count(); i++) {
                let fint = formula.getFormulasInt().item(i);

                for(let j = 0; j < fint.getVariables().count(); j++) {
                    let variable = fint.getVariables().item(j);
                    let typeCode = typeof variable.getValue();
                    switch (typeCode) {
                        case "number":
                            variable.setValue(0);
                            break;
                        case "string":
                            variable.setValue("");
                            break;
                        case "object":
                            if(variable.getValue() === null) break;

                            if (variable.getValue().constructor.name === cStructTime.constructor.name) {
                                let st = variable.getValue();
                                st.setHour(0);
                                st.setMinute(0);
                                st.setSecond(0);
                            }
                            break;
                        default:
                            break;
                    }
                }
            }
        }

        private evalGroupFunctions(formula: cReportFormula) {
            let fint: cReportFormulaInt = null;

            for(let _i = 0; _i < formula.getFormulasInt().count(); _i++) {
                fint = formula.getFormulasInt().item(_i);

                switch (fint.getFormulaType())
                {
                    case csRptFormulaType.CSRPTF_GROUP_TOTAL:
                        this.evalGroupTotal(fint);
                        break;

                    case csRptFormulaType.CSRPTF_GROUP_MAX:
                        this.evalGroupMax(fint);
                        break;

                    case csRptFormulaType.CSRPTF_GROUP_MIN:
                        this.evalGroupMin(fint);
                        break;

                    case csRptFormulaType.CSRPTF_GROUP_AVERAGE:
                        this.evalGroupAverage(fint);
                        break;

                    case csRptFormulaType.CSRPTF_GROUP_PERCENT:
                        this.evalGroupPercent(fint);
                        break;

                    case csRptFormulaType.CSRPTF_GROUP_COUNT:
                        this.evalGroupCount(fint);
                        break;

                    case csRptFormulaType.CSRPTF_GROUP_LINE_NUMBER:
                        this.evalGroupLineNumber(fint);
                        break;
                }
            }
        }

        public resultFunction(formula: cReportFormula) {
            this.objGlobals.setMode(eReportCompilerMode.C_RESULT);
            this.ctrlName = formula.getControlName();

            let vResult = [];

            let fint: cReportFormulaInt = null;

            for(let i = 0; i < formula.getFormulasInt().count(); i++) {
                fint = formula.getFormulasInt().item(i);
                vResult[i] = this.pResultFunctionInt(fint);
            }

            // we check if the code has scripting or is only 
            // calls to internal functions
            //
            let code = formula.getTextC().replace(cReportCompiler.C_KEY_FUNC_INT, "");
            code = code.replace(" ", "");

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
                let parameters = "";

                for(let i = 0; i < vResult.length; i++) {
                    // if one argument is null it means we don't have a row for this formula
                    // so we don't need to compile the code
                    //
                    if (vResult[i] === null)  {
                        return null; 
                    }

                    let parameter = "p__" + i + "__";
                    parameters += parameter + ",";
                    code = code.replace(cReportCompiler.C_KEY_FUNC_INT + ReportGlobals.format(i + 1, "000"), parameter);

                    let paramValue = this.objGlobals.getVar(parameter);
                    if (paramValue === null) {
                        paramValue = this.objGlobals.addVar(parameter);
                    }
                    paramValue.setValue(vResult[i]);
                }

                if (parameters.length > 0) {
                    parameters = parameters.substring(0, parameters.length - 1);
                    code = this.insertParametersIntoFunction(code, parameters);
                }

                formula.setLastResult(this.pExecScriptCode(code, formula));
                formula.setHaveToEval(false);
                return formula.getLastResult();
            }
        }

        private insertParametersIntoFunction(code: string, parameters: string) {
            let n: number = code.indexOf("(") + 1;
            return code.substring(0, n) + parameters + code.substring(n);
        }

        private pEvalFunctionGroup(fint: cReportFormulaInt) {
            let value: number = 0;
            let total: number = 0;

            if (fint.getVariables().count() > 0) {
                if (fint.getParameters().item(ReportGlobals.C_KEY_INDEX_COL2) === null) {
                    value = 0;
                }
                else {
                    let columnIndex: number = Utils.parseInt(fint.getParameters().item(ReportGlobals.C_KEY_INDEX_COL2).getValue());
                    value = Utils.val(this.report.getValueFromRs(columnIndex).toString());
                }

                let variable: cReportVariable = fint.getVariables().item(cReportCompiler.C_GROUP_PERCENT_T);
                total = Utils.val(variable.getValue().toString());
                value = Utils.divideByZero(value, total);
                variable.setValue(value);

            }

        }

        public evalFunctionGroup(formula: cReportFormula) {
            let fint: cReportFormulaInt = null;

            for(let i = 0; i < formula.getFormulasInt().count(); i++) {
                fint = formula.getFormulasInt().item(i);
                this.pEvalFunctionGroup(fint);
            }
        }

        public evalFunction(formula: cReportFormula) {
            let codeC: string = "";

            this.objGlobals.setMode(eReportCompilerMode.C_EVAL);

            this.evalGroupFunctions(formula);

            cReportError.gDebugSection = formula.getSectionName();
            cReportError.gDebugSectionLine = formula.getSectionLineIndex();
            cReportError.gDebugControl = formula.getControlName();

            this.formula = formula;

            this.pCompile(formula.getText(), false, codeC);

            if (formula.getFormulasInt().count() > 0) {
                if (Utils.isNumber(codeC)) {
                    this.pEvalSyntax("", codeC, false, formula);
                }
                else {
                    if (codeC.trim().substring(0, 8).toLowerCase() === "function") {
                        this.pEvalSyntax("", codeC, false, formula);
                    }
                }
            }
            else {
                this.pEvalSyntax("", codeC, false, formula);
            }
            this.formula = null;
        }

        private pCompile(code: string, bCompile: boolean, codeC: string) {
            this.bCompile = bCompile;
            this.idxFormula = -1;

            code = this.pColonToPipe(code);

            return this.pCompileAux(code, codeC);
        }

        private pColonToPipe(code: string) {
            return code.replace(",", "|");
        }

        private pPipeToColon(code: string) {
            return code.replace("|", ",");
        }

        private pIsFunction(word: string) {
            let f: cReportFormulaType = null;

            for(let _i = 0; _i < this.formulaTypes.count(); _i++) {
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
            return this.pEvalSyntax(functionName, code, true, null);
        }

        private pEvalFunctionInt(fint: cReportFormulaInt) {
            switch (fint.getFormulaType()) {

                case csRptFormulaType.CSRPTF_AVERAGE:
                    this.evalAverage(fint);
                    break;

                case csRptFormulaType.CSRPTF_SUM:
                    this.evalSum(fint);
                    break;

                case csRptFormulaType.CSRPTF_SUM_TIME:
                    this.evalSumTime(fint);
                    break;

                case csRptFormulaType.CSRPTF_MAX:
                    this.evalMax(fint);
                    break;

                case csRptFormulaType.CSRPTF_MIN:
                    this.evalMin(fint);
                    break;

                case csRptFormulaType.CSRPTF_COUNT:
                    this.evalCount(fint);
                    break;

                case csRptFormulaType.CSRPTF_NUMBER_TO_STRING:
                    this.evalNumberToString(fint);
                    break;

                case csRptFormulaType.CSRPTF_IS_EQUAL:
                    this.evalIsEqual(fint);
                    break;

                case csRptFormulaType.CSRPTF_IS_NOT_EQUAL:
                    this.evalIsNotEqual(fint);
                    break;

                case csRptFormulaType.CSRPTF_IS_GREATER_THAN:
                    this.evalIsGreaterThan(fint);
                    break;

                case csRptFormulaType.CSRPTF_IS_LESS_THAN:
                    this.evalIsLessThan(fint);
                    break;

                case csRptFormulaType.CSRPTF_CALCULO:
                    // nothing to do
                    break;

                case csRptFormulaType.CSRPTF_DECLARE_VAR:
                    this.evalDeclareVar(fint);
                    break;

                case csRptFormulaType.CSRPTF_GET_VAR:
                    // nothing to do
                    break;

                case csRptFormulaType.CSRPTF_GET_PARAM:
                    // nothing to do
                    break;

                case csRptFormulaType.CSRPTF_SET_VAR:
                    this.evalSetVar(fint);
                    break;

                case csRptFormulaType.CSRPTF_GET_BARCODE:
                    this.evalGetBarcode(fint);
                    break;

                case csRptFormulaType.CSRPTF_ADD_TO_VAR:
                    this.evalAddToVar(fint);
                    break;

                case csRptFormulaType.CSRPTF_GET_DATA_FROM_RS_AD:
                    this.evalGetDataFromRsAd(fint);
                    break;

                case csRptFormulaType.CSRPTF_GET_DATA_FROM_RS:
                    this.evalGetDataFromRs(fint);
                    break;

                case csRptFormulaType.CSRPTF_IS_IN_RS:
                    this.evalIsInRs(fint);
                    break;
            }
        }

        private pResultFunctionInt(fint: cReportFormulaInt) {
            switch (fint.getFormulaType())
            {
                case csRptFormulaType.CSRPTF_AVERAGE:
                    return this.resultAverage(fint);

                case csRptFormulaType.CSRPTF_SUM:
                    return this.resultSum(fint);

                case csRptFormulaType.CSRPTF_GET_STRING:
                    return this.resultGetString(fint);

                case csRptFormulaType.CSRPTF_SUM_TIME:
                    return this.resultSumTime(fint);

                case csRptFormulaType.CSRPTF_MAX:
                    return this.resultMax(fint);

                case csRptFormulaType.CSRPTF_MIN:
                    return this.resultMin(fint);

                case csRptFormulaType.CSRPTF_COUNT:
                    return this.resultCount(fint);

                case csRptFormulaType.CSRPTF_NUMBER_TO_STRING:
                    return this.resultNumberToString(fint);

                case csRptFormulaType.CSRPTF_IS_EQUAL:
                    return this.resultIsEqual(fint);

                case csRptFormulaType.CSRPTF_IS_NOT_EQUAL:
                    return this.resultIsNotEqual(fint);

                case csRptFormulaType.CSRPTF_IS_GREATER_THAN:
                    return this.resultIsGreaterThan(fint);

                case csRptFormulaType.CSRPTF_IS_LESS_THAN:
                    return this.resultIsLessThan(fint);

                case csRptFormulaType.CSRPTF_PAGE_NUMBER:
                    return this.resultPageNumber();

                case csRptFormulaType.CSRPTF_TOTAL_PAGES:
                    return this.resultTotalPages();

                case csRptFormulaType.CSRPTF_VAL:
                    return this.resultValue(fint);

                case csRptFormulaType.CSRPTF_LENGTH:
                    return this.resultLength(fint);

                case csRptFormulaType.CSRPTF_TEXT_REPLACE:
                    return this.resultTextReplace(fint);

                case csRptFormulaType.CSRPTF_CALCULO:
                    return this.resultCalculo(fint);

                case csRptFormulaType.CSRPTF_DECLARE_VAR:
                    // nothing to do
                    break;

                case csRptFormulaType.CSRPTF_GET_VAR:
                    return this.resultGetVar(fint);

                case csRptFormulaType.CSRPTF_GET_PARAM:
                    return this.resultGetParam(fint);

                case csRptFormulaType.CSRPTF_SET_VAR:
                    // nothing to do
                    break;

                case csRptFormulaType.CSRPTF_ADD_TO_VAR:
                    // nothing to do
                    break;

                case csRptFormulaType.CSRPTF_GET_DATA_FROM_RS_AD:
                    return this.resultGetDataFromRsAd(fint);

                case csRptFormulaType.CSRPTF_GET_DATA_FROM_RS:
                    return this.resultGetDataFromRs(fint);

                case csRptFormulaType.CSRPTF_GROUP_TOTAL:
                    return this.resultGroupTotal(fint);

                case csRptFormulaType.CSRPTF_GROUP_MAX:
                    return this.resultGroupMax(fint);

                case csRptFormulaType.CSRPTF_GROUP_MIN:
                    return this.resultGroupMin(fint);

                case csRptFormulaType.CSRPTF_GROUP_AVERAGE:
                    return this.resultGroupAverage(fint);

                case csRptFormulaType.CSRPTF_GROUP_PERCENT:
                    return this.resultGroupPercent(fint);

                case csRptFormulaType.CSRPTF_GROUP_COUNT:
                    return this.resultGroupCount(fint);

                case csRptFormulaType.CSRPTF_GROUP_LINE_NUMBER:
                    return this.resultGroupLineNumber(fint);

                case csRptFormulaType.CSRPTF_IS_IN_RS:
                    return this.resultIsInRs(fint);

                case csRptFormulaType.CSRPTF_GET_BARCODE:
                    return this.resultGetBarcode(fint);
            }
            return null;
        }

        private pEvalSyntax(functionName: string, code: string, bParam: boolean, formula: cReportFormula) {
            let i: number = 0;
            let s: string = "";

            code = this.removeReturns(code);

            if (functionName.length > 0) {
                return this.pCheckInternalFunction(functionName, code);
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
            else if (cDateUtils.isDate(code)) {
                return code;
            }
            else if (this.pIsTime(code)) {
                return code;
            }
            else if (!bParam) {
                this.pExecScriptCode(code, formula);
                return code;
            }
            else {

                let vParams: string[] = null;
                let parameters = code.trim();
                if (parameters.length > 2) {
                    parameters = parameters.substring(2, parameters.length - 2);
                    parameters = parameters.trim();
                    vParams = parameters.split('|');
                }

                try {
                    for (i = 0; i < vParams.length; i++) {
                        try {
                            // if it is a number we don't need to evaluate it
                            //
                            if (!Utils.isNumber(vParams[i])) {

                                if (!this.pIsControl(vParams[i])) {
                                    // if an error is raised here, it will be caused by
                                    // a parameter passed to the internal function is wrong
                                    // the assignment will no be completed
                                    // the parameter value will no be lost
                                    s = cReportCompiler.C_TEMP_FUNCTION_B + vParams[i] + cReportCompiler.C_TEMP_FUNCTION_E;
                                    vParams[i] = this.pExecScriptCode(s, formula).toString();
                                }
                            }
                            code = vParams[i] + "|";
                        }
                        catch (ex) {
                            // we don't care about errors here
                        }
                    }

                    return Utils.removeLastColon(code);
                }
                catch(ex) {
                    // we don't care about errors here
                }
            }
            return null;
        }

        private pIsTime(code: string) {
            code = code.trim();
            if (code.indexOf(":", 0) === 0)  {
                return false; 
            }

            let vTime = code.split(':');
            if (vTime.length !== 1)  {
                return false; 
            }

            if (!(Utils.isNumber(vTime[0]) && Utils.isNumber(vTime[1])))  {
                return false; 
            }
            return true;
        }

        private pCheckSyntax(code: string) {
            this.pCompile(code, true, "");
        }

        private pExecScriptCode(code: string, formula: cReportFormula) {
            try {
                code = this.pPipeToColon(code);
                if (formula.getCompiledScript() === null) {
                    formula.setCompiledScript(cReportScriptEngine.compileCode(code, formula));
                }
                return cReportScriptEngine.eval(formula.getCompiledScript(), this.objGlobals);
            }
            catch (ex) {
                let msg: string = ex.stack + "\n\n"+ ex.message + "\n\nCode:\n=====\n\n" + code + "\n\n";
                throw new ReportException(csRptErrors.ERROR_IN_SCRIPT, msg);
            }
        }

        private pIsControl(param: string) {
            for(let i = 0; i < this.report.getControls().count(); i++) {
                let ctrl = this.report.getControls().item(i);
                if (ctrl.getName().toUpperCase() === param.toUpperCase()) {
                    return true;
                }
            }
            return false;
        }

        private pGetControl(param: string) {
            let ctrl: cReportControl = null;
            for(let _i = 0; _i < this.report.getControls().count(); _i++) {
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

            pos = code.indexOf(" ", 0) + 1;
            i = pos;
            while (i < code.length) {
                c = code.substring(i, 1);
                if (this.pIsSeparator(c)) {
                    break;
                }
                i++;
            }
            return code.substring(pos, i - pos);
        }

        private pGetParameter(parameters: string, paramIndex: number, funName: string) {
            let param: string = "";
            let vParam: string[] = null;

            vParam = parameters.split('|');

            if (paramIndex > vParam.length + 1) {
                throw new ReportArgumentMissingException(
                    cReportError.errGetDescription(
                                    csRptErrors.CS_RPT_ERR_MISSING_PARAM,
                                    [paramIndex.toString(), funName]));
            }
            else {
                param = vParam[paramIndex];
            }

            return param.replace(")", "").trim();
        }

        private pCheckInternalFunction(functionName: string, code: string) {
            let name = functionName;
            let parameters = code.trim();
            if (parameters.length > 2) {
                parameters = parameters.substring(1, parameters.length - 2);
            }

            // we need to replace in this.formula.getTextC() the function name by its key
            // 
            let tc = this.formula.getTextC();
            let r = tc.toLowerCase().indexOf(name.toLowerCase(), 0);
            let q = tc.toLowerCase().indexOf(")".toLowerCase(), r) + 1;

            this.formula.setTextC((tc.substring(0, r)).toString()
                                + cReportCompiler.C_KEY_FUNC_INT
                                + ReportGlobals.format(this.formula.getFormulasInt().count(), "000")
                                + tc.substring(q));

            let idFunction = this.pGetIdFunction(name);
            this.fint.setFormulaType(idFunction);

            switch (idFunction) {

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
                    this.pCheckParameters(1, parameters, name);
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
                    this.pCheckParameters(2, parameters, name);
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
                    this.pCheckParameters(3, parameters, name);
                    // in compiling time we need to return a value which is consistent
                    // with the return type of the internal function
                    //
                    return 0;

                case csRptFormulaType.CSRPTF_GET_STRING:
                    // in this evaluation we load the parameters of the function
                    //
                    this.pCheckParameters(1, parameters, name);
                    // in compiling time we need to return a value which is consistent
                    // with the return type of the internal function
                    //
                    return "\"\"";

                case csRptFormulaType.CSRPTF_SUM_TIME:
                    // in this evaluation we load the parameters of the function
                    //
                    this.pCheckParameters(2, parameters, name);
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
                    this.pCheckParameters(2, parameters, name);
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
                    this.pCheckParameters(2, parameters, name);
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
                    this.pCheckParameters(4, parameters, name);
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
                    this.pCheckParameters(1, parameters, name);
                    // in compiling time we need to return a value which is consistent
                    // with the return type of the internal function
                    //
                    return 0;

                case csRptFormulaType.CSRPTF_GET_PARAM:
                    // in this evaluation we load the parameters of the function
                    //
                    this.pCheckParameters(1, parameters, name);
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
                    this.pCheckParameters(2, parameters, name);
                    // in compiling time we need to return a value which is consistent
                    // with the return type of the internal function
                    //
                    return 0;

                case csRptFormulaType.CSRPTF_GET_BARCODE:
                    // in this evaluation we load the parameters of the function
                    //
                    this.pCheckParameters(1, parameters, name);
                    // in compiling time we need to return a value which is consistent
                    // with the return type of the internal function
                    //
                    return "\"\"";

                default:
                    throw new ReportNotDefinedFunctionException(
                        csRptErrors.CS_RPT_ERR_UNDEFINED_FUNCTION,
                        cReportError.errGetDescription(csRptErrors.CS_RPT_ERR_UNDEFINED_FUNCTION, [name]));
            }
        }

        private resultGetString(fint: cReportFormulaInt) {
            let param: string = "";

            param = fint.getParameters().item(0).getValue();

            if (param === "\"\"") {
                return param;
            }
            else {
                if (this.pIsControl(param)) {
                    return "\"" + this.report.getValueString(param).replace("\"", "\"\"") + "\"";
                }
                else {
                    return "\"" + param.replace("\"", "\"\"") + "\"";
                }
            }
        }

        private resultSumTime(fint: cReportFormulaInt) {
            if (fint.getVariables().count() === 0)  {
                return ""; 
            }
            let st = fint.getVariables().item(cReportCompiler.C_SUM_TIME).getValue();
            if (Utils.val(fint.getParameters().item(1).getValue()) !== 0) {
                return ReportGlobals.format(st.getHour(), "00")
                        + ":" + ReportGlobals.format(st.getMinute(), "00")
                        + ":" + ReportGlobals.format(st.getSecond(), "00");
            }
            else {
                return ReportGlobals.format(st.getHour(), "00")
                    + ":" + ReportGlobals.format(st.getMinute(), "00");
            }
        }

        private resultSum(fint: cReportFormulaInt) {
            if (fint.getVariables().count() === 0) { return 0; }
            return parseFloat(fint.getVariables().item(cReportCompiler.C_SUM).getValue());
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
                    cReportError.errGetDescription(
                                    csRptErrors.CS_RPT_ERR_MISSING_PARAM,
                                    [varName, "_getVar()"]));
            }
            return this.variables.item(varName).getValue();
        }

        private resultGetParam(fint: cReportFormulaInt) {
            let param: cParameter = null;
            let paramName: string = "";

            paramName = fint.getParameters().item(0).getValue();

            for(let _i = 0; _i < this.report.getConnect().getParameters().count(); _i++) {
                param = this.report.getConnect().getParameters().item(_i);
                if (param.getName().toLowerCase() === paramName.toLowerCase()) {
                    break;
                }
            }

            if (param === null) {
                throw new ReportArgumentMissingException(
                    cReportError.errGetDescription(
                                    csRptErrors.CS_RPT_ERR_MISSING_PARAM,
                                    [paramName, "_getParameter()"]));
            }

            return param.getValue();
        }

        private resultMax(fint: cReportFormulaInt) {
            if (fint.getVariables().count() === 0) { return 0; }
            return fint.getVariables().item(cReportCompiler.C_MAX).getValue();
        }

        private resultMin(fint: cReportFormulaInt) {
            if (fint.getVariables().count() === 0) { return 0; }
            return fint.getVariables().item(cReportCompiler.C_MIN).getValue();
        }

        private resultCount(fint: cReportFormulaInt) {
            if (fint.getVariables().count() === 0) { return null; }
            return fint.getVariables().item(cReportCompiler.C_COUNT).getValue();
        }

        private resultNumberToString(fint: cReportFormulaInt) {
            if (fint.getVariables().count() > 0) {
                return fint.getVariables().item(cReportCompiler.C_NUMBER_TO_STRING).getValue();
            }
            else {
                return "";
            }
        }

        private resultGetBarcode(fint: cReportFormulaInt) {
            if (fint.getVariables().count() > 0) {
                return fint.getVariables().item(cReportCompiler.C_GET_BARCODE).getValue();
            }
            else {
                return "";
            }
        }

        private resultIsEqual(fint: cReportFormulaInt) {
            if (fint.getVariables().count() > 0) {
                return fint.getVariables().item(cReportCompiler.C_IS_EQUAL).getValue();
            }
            else {
                return 0;
            }
        }

        private resultIsNotEqual(fint: cReportFormulaInt) {
            if (fint.getVariables().count() > 0) {
                return fint.getVariables().item(cReportCompiler.C_IS_NOT_EQUAL).getValue();
            }
            else {
                return 0;
            }
        }

        private resultIsGreaterThan(fint: cReportFormulaInt) {
            if (fint.getVariables().count() > 0) {
                return fint.getVariables().item(cReportCompiler.C_IS_GREATER_THAN).getValue();
            }
            else {
                return 0;
            }
        }

        private resultIsLessThan(fint: cReportFormulaInt) {
            if (fint.getVariables().count() > 0) {
                return fint.getVariables().item(cReportCompiler.C_IS_LESS_THAN).getValue();
            }
            else {
                return 0;
            }
        }

        private resultAverage(fint: cReportFormulaInt) {
            if (fint.getVariables().count() === 0)  {
                return 0; 
            }
            let sum: number = fint.getVariables().item(cReportCompiler.C_AVERAGE_SUM).getValue();
            let count: number = fint.getVariables().item(cReportCompiler.C_AVERAGE_COUNT).getValue();
            return sum / count;
        }

        private resultCalculo(fint: cReportFormulaInt) {

            let control = fint.getParameters().item(1).getValue();

            let value1 = parseFloat(this.report.getValue(fint.getParameters().item(0).getValue(), true).toString());
            let value2;
            if (control !== "\"\"") {
                value2 = parseFloat(this.report.getValue(control, true).toString());
            }
            else {
                value2 = parseFloat(fint.getParameters().item(2).getValue());
            }

            let operation = Utils.parseInt(fint.getParameters().item(3).getValue());

            switch (operation)
            {
                // addition
                case 1:
                    return value1 + value2;

                // subtraction
                case 2:
                    return value1 - value2;

                // multiplication
                case 3:
                    return value1 * value2;

                // division
                case 4:
                    return Utils.divideByZero(value1, value2);

                // power
                case 5:
                    return Math.pow(value1, value2);

                default:
                    return 0;                    
            }
        }

        private resultLength(fint: cReportFormulaInt) {
            return this.report.getValueString(fint.getParameters().item(0).getValue()).length;
        }

        private resultTextReplace(fint: cReportFormulaInt) {
            let text: string = "";
            let collCtrlsToReplace;

            let ctrl = this.pGetControl(this.ctrlName);
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
                let endPos: number = 0;

                collCtrlsToReplace = [];

                lenText = text.length;
                let i: number = 0;
                while (i < lenText) {
                    pos = text.indexOf(cReportCompiler.C_MACRO_CTRL, i + 1);
                    if (pos > 0) {
                        endPos = text.indexOf(cReportCompiler.C_MACRO_CTRL, pos + 1);

                        if (endPos > 0) {
                            collCtrlsToReplace.push(text.substring(pos + 2, endPos - pos - 2));
                        }
                        i = endPos + 1;
                    }
                    else {
                        i = lenText + 1;
                    }
                }

                this.collTextReplace.add(this.ctrlName, collCtrlsToReplace);
            }

            let ctrlValue: cReportControl = null;
            for (let i = 0; i < collCtrlsToReplace.Count; i++) {
                ctrlValue = this.pGetControl(collCtrlsToReplace[i]);
                if (ctrlValue !== null) {
                    text = text.replace(
                        cReportCompiler.C_MACRO_CTRL + collCtrlsToReplace[i] + cReportCompiler.C_MACRO_CTRL,
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
                return fint.getVariables().item(cReportCompiler.C_GROUP_TOTAL).getValue();
            }
            else {
                return 0;
            }
        }

        private resultGroupMax(fint: cReportFormulaInt) {
            if (fint.getVariables().count() > 0) {
                return fint.getVariables().item(cReportCompiler.C_GROUP_MAX).getValue();
            }
            else {
                return 0;
            }
        }

        private resultGroupMin(fint: cReportFormulaInt) {
            if (fint.getVariables().count() > 0) {
                return fint.getVariables().item(cReportCompiler.C_GROUP_MIN).getValue();
            }
            else {
                return 0;
            }
        }

        private resultGroupAverage(fint: cReportFormulaInt) {
            if (fint.getVariables().count() > 0) {
                return fint.getVariables().item(cReportCompiler.C_GROUP_AVERAGE).getValue();
            }
            else {
                return 0;
            }
        }

        private resultGroupPercent(fint: cReportFormulaInt) {
            if (fint.getVariables().count() > 0) {
                return fint.getVariables().item(cReportCompiler.C_GROUP_PERCENT).getValue();
            }
            else {
                return 0;
            }
        }

        private resultGroupCount(fint: cReportFormulaInt) {
            if (fint.getVariables().count() > 0) {
                return fint.getVariables().item(cReportCompiler.C_GROUP_COUNT).getValue();
            }
            else {
                return 0;
            }
        }

        private resultGroupLineNumber(fint: cReportFormulaInt) {
            if (fint.getVariables().count() > 0) {
                return fint.getVariables().item(cReportCompiler.C_GROUP_LINE_NUMBER).getValue();
            }
            else {
                return 0;
            }
        }

        private resultIsInRs(fint: cReportFormulaInt) {
            if (fint.getVariables().count() > 0) {
                return fint.getVariables().item(cReportCompiler.C_IS_IN_RS).getValue();
            }
            else {
                return 0;
            }
        }

        private evalAverage(fint: cReportFormulaInt) {
            if (fint.getVariables().item(cReportCompiler.C_AVERAGE_SUM) === null) {
                fint.getVariables().add(null, cReportCompiler.C_AVERAGE_SUM);
                fint.getVariables().add(null, cReportCompiler.C_AVERAGE_COUNT);
            }

            let item: cReportVariable = fint.getVariables().item(cReportCompiler.C_AVERAGE_SUM);
            // the average function is for numbers
            //
            item.setValue(item.getValue()
                + this.pGetNumber(
                    this.report.getValue(
                        fint.getParameters().item(0).getValue(),
                        true)));

            item = fint.getVariables().item(cReportCompiler.C_AVERAGE_COUNT);
            // the average function is for numbers
            //
            item.setValue(item.getValue() + 1);
        }

        private pGetNumber(number: any) {
            let strNumber: string = number.toString();
            let rtn: number = 0;
            let sepDecimal: string = "";

            if (Utils.isNumber(strNumber)) {
                sepDecimal = Utils.getSepDecimal();
                if (sepDecimal !== ".") {
                    strNumber = strNumber.replace(".", sepDecimal);
                }
                rtn = Utils.val(strNumber);

            }

            return rtn;
        }

        private evalSum(fint: cReportFormulaInt) {
            if (fint.getVariables().item(cReportCompiler.C_SUM) === null) {
                fint.getVariables().add(null, cReportCompiler.C_SUM).setValue(0);
            }

            let item: cReportVariable = fint.getVariables().item(cReportCompiler.C_SUM);
            // the sum function is for numbers
            //
            item.setValue(parseFloat(item.getValue())
                + this.pGetNumber(this.report.getValue(fint.getParameters().item(0).getValue(), true)));
        }

        private evalDeclareVar(fint: cReportFormulaInt) {
            let varName: string = "";

            varName = fint.getParameters().item(0).getValue();

            if (this.variables.item(varName) === null) {
                this.variables.add(null, varName);
            }
        }

        private evalSetVar(fint: cReportFormulaInt) {
            let varName = fint.getParameters().item(0).getValue();
            if (this.variables.item(varName) === null) {
                throw new ReportArgumentMissingException(
                    cReportError.errGetDescription(
                                    csRptErrors.CS_RPT_ERR_MISSING_PARAM,
                                    [varName, "_setVar"]));
            }
            let item: cReportVariable = this.variables.item(varName);
            item.setValue(fint.getParameters().item(1).getValue());
        }

        private evalGetDataFromRsAd(fint: cReportFormulaInt) {

        }

        private evalGetDataFromRs(fint: cReportFormulaInt) {

        }

        private evalAddToVar(fint: cReportFormulaInt) {
            let varName = fint.getParameters().item(0).getValue();

            if (this.variables.item(varName) === null) {
                throw new ReportArgumentMissingException(
                    cReportError.errGetDescription(
                                    csRptErrors.CS_RPT_ERR_MISSING_PARAM,
                                    [varName, "_evalAddToVar"]));
            }

            let item: cReportVariable = this.variables.item(varName);
            // the EvalAddToVar function is for numbers
            //
            item.setValue(item.getValue() 
                                + this.pGetNumber(
                                    fint.getParameters().item(1).getValue()));
        }

        private evalSumTime(fint: cReportFormulaInt) {
            if (fint.getVariables().item(cReportCompiler.C_SUM_TIME) === null) {
                fint.getVariables().add(null,
                    cReportCompiler.C_SUM_TIME).setValue(new cStructTime());
            }

            let item: cReportVariable = fint.getVariables().item(cReportCompiler.C_SUM_TIME);
            // the SumTime is for dates
            //
            this.pSumTimes(
                item.getValue(),
                new Date(Date.parse(
                    this.report.getValue(
                        fint.getParameters().item(0).getValue(), true
                    ).toString())));
        }

        private evalMax(fint: cReportFormulaInt) {
            if (fint.getVariables().item(cReportCompiler.C_MAX) === null) {
                fint.getVariables().add(null, cReportCompiler.C_MAX);
            }

            let item: cReportVariable = fint.getVariables().item(cReportCompiler.C_MAX);
            // the Max function if for numbers and strings
            //
            let value = this.report.getValue(fint.getParameters().item(0).getValue());

            if (typeof value === "string") {
                if (item.getValue().toString().localeCompare(value.toString()) < 0) {
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
            if (fint.getVariables().item(cReportCompiler.C_MIN) === null) {
                fint.getVariables().add(null, cReportCompiler.C_MIN);
            }

            let item: cReportVariable = fint.getVariables().item(cReportCompiler.C_MIN);
            // The Min function is for numbers and strings
            //
            let value = this.report.getValue(fint.getParameters().item(0).getValue());

            if (typeof value === "string") {
                if (item.getValue().toString().localeCompare(value.toString()) > 0) {
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
            if (fint.getVariables().item(cReportCompiler.C_COUNT) === null) {
                fint.getVariables().add(null, cReportCompiler.C_COUNT);
            }

            let item: cReportVariable = fint.getVariables().item(cReportCompiler.C_COUNT);
            // the Count function is for numbers
            //
            item.setValue(item.getValue() + 1);
        }

        private evalNumberToString(fint: cReportFormulaInt) {
            if (fint.getVariables().item(cReportCompiler.C_NUMBER_TO_STRING) === null) {
                fint.getVariables().add(null, cReportCompiler.C_NUMBER_TO_STRING);
            }

            let item: cReportVariable = fint.getVariables().item(cReportCompiler.C_NUMBER_TO_STRING);

            // the NumberToString function is for numbers
            //
            let iNumber = this.pGetNumber(
                this.report.getValue(fint.getParameters().item(0).getValue(), true));
            let iLanguage = Utils.valInt(fint.getParameters().item(1).getValue());

            let n2s: cNumberToString = new cNumberToString();

            switch (iLanguage)
            {
                case cReportCompiler.C_SPANISH:
                    item.setValue(n2s.spanishNumberToString(iNumber));
                    break;
                case cReportCompiler.C_ENGLISH:
                    item.setValue(n2s.englishNumberToString(iNumber));
                    break;
                case cReportCompiler.C_FRENCH:
                    item.setValue(n2s.frenchNumberToString(iNumber));
                    break;
            }
        }

        private evalIsEqual(fint: cReportFormulaInt) {
            if (fint.getVariables().item(cReportCompiler.C_IS_EQUAL) === null) {
                fint.getVariables().add(null, cReportCompiler.C_IS_EQUAL);
            }

            let item: cReportVariable = fint.getVariables().item(cReportCompiler.C_IS_EQUAL);

            // the IsEqual function is for numbers
            //
            let strValue = this.report.getValue(
                fint.getParameters().item(0).getValue(), true).toString();
            let strConstValue = fint.getParameters().item(1).getValue();

            item.setValue(strValue === strConstValue);
        }

        private evalIsNotEqual(fint: cReportFormulaInt) {
            if (fint.getVariables().item(cReportCompiler.C_IS_NOT_EQUAL) === null) {
                fint.getVariables().add(null, cReportCompiler.C_IS_NOT_EQUAL);
            }

            let item: cReportVariable = fint.getVariables().item(cReportCompiler.C_IS_NOT_EQUAL);

            // the IsNotEqual function is for numbers
            //
            let strValue = this.report.getValue(
                fint.getParameters().item(0).getValue(), true);
            let strConstValue = fint.getParameters().item(1).getValue();

            item.setValue(strValue !== strConstValue);
        }

        private evalIsGreaterThan(fint: cReportFormulaInt) {
            if (fint.getVariables().item(cReportCompiler.C_IS_GREATER_THAN) === null) {
                fint.getVariables().add(null, cReportCompiler.C_IS_GREATER_THAN);
            }

            let item: cReportVariable = fint.getVariables().item(cReportCompiler.C_IS_GREATER_THAN);
            // the IsGreaterThan function is for numbers
            //
            let value = this.report.getValue(fint.getParameters().item(0).getValue(), true);
            let constValue: object = fint.getParameters().item(1).getValue();

            if (typeof value === "string") {
                let strValue: string = value.toString();
                let strConstValue: string = constValue.toString();

                if (strValue.toString().localeCompare(strConstValue.toString()) > 0) {
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
            if (fint.getVariables().item(cReportCompiler.C_IS_LESS_THAN) === null) {
                fint.getVariables().add(null, cReportCompiler.C_IS_LESS_THAN);
            }

            let item: cReportVariable = fint.getVariables().item(cReportCompiler.C_IS_LESS_THAN);
            // the IsLessThan function is for numbers
            //
            let value = this.report.getValue(
                fint.getParameters().item(0).getValue(), true);
            let constValue: object = fint.getParameters().item(1).getValue();

            if (typeof value === "string") {
                let strValue: string = value.toString();
                let strConstValue: string = constValue.toString();

                if (strValue.toString().localeCompare(strConstValue.toString()) < 0) {
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
            if (fint.getVariables().item(cReportCompiler.C_GROUP_TOTAL) === null) {
                fint.getVariables().add(null, cReportCompiler.C_GROUP_TOTAL);
            }

            let item: cReportVariable = fint.getVariables().item(cReportCompiler.C_GROUP_TOTAL);
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
            if (fint.getParameters().item(ReportGlobals.C_KEY_INDEX_COL) === null) {
                item.setValue(0);
            }
            else {
                item.setValue(
                    this.report.getGroupTotal(
                        Utils.parseInt(fint.getParameters().item(ReportGlobals.C_KEY_INDEX_COL).getValue()),
                        Utils.parseInt(fint.getParameters().item(ReportGlobals.C_KEY_INDEX_GROUP).getValue())));
            }
        }

        private evalGroupMax(fint: cReportFormulaInt) {
            if (fint.getVariables().item(cReportCompiler.C_GROUP_MAX) === null) {
                fint.getVariables().add(null, cReportCompiler.C_GROUP_MAX);
            }

            let item: cReportVariable = fint.getVariables().item(cReportCompiler.C_GROUP_MAX);
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
            if (fint.getParameters().item(ReportGlobals.C_KEY_INDEX_COL) === null) {
                item.setValue(0);
            }
            else {
                item.setValue(
                    this.report.getGroupMax(
                                Utils.parseInt(fint.getParameters().item(ReportGlobals.C_KEY_INDEX_COL).getValue()),
                                Utils.parseInt(fint.getParameters().item(ReportGlobals.C_KEY_INDEX_GROUP).getValue())));
            }
        }

        private evalGroupMin(fint: cReportFormulaInt) {
            if (fint.getVariables().item(cReportCompiler.C_GROUP_MIN) === null) {
                fint.getVariables().add(null, cReportCompiler.C_GROUP_MIN);
            }

            let item: cReportVariable = fint.getVariables().item(cReportCompiler.C_GROUP_MIN);
            // the Group Min function is for numbers and strings

            // if param1 doesn't contain an index column is because we haven't
            // process the formulas yet. It happens because compileReport
            // is called before the InitColIndex in cReport's Launch function
            // and the order can not be changed because the function GetData 
            // is executed after the CompileReport function, and we don't want
            // to change this order because we are afraid of the collateral damage
            // it could produce :(
            //
            // In the future we can analyze it and modify the order and if this
            // doesn't produce any error we will remove this if :)
            //
            if (fint.getParameters().item(ReportGlobals.C_KEY_INDEX_COL) === null) {
                item.setValue(0);
            }
            else {
                item.setValue(
                    this.report.getGroupMin(
                        Utils.parseInt(fint.getParameters().item(ReportGlobals.C_KEY_INDEX_COL).getValue()),
                        Utils.parseInt(fint.getParameters().item(ReportGlobals.C_KEY_INDEX_GROUP).getValue())));
            }
        }

        private evalGroupAverage(fint: cReportFormulaInt) {
            if (fint.getVariables().item(cReportCompiler.C_GROUP_AVERAGE) === null) {
                fint.getVariables().add(null, cReportCompiler.C_GROUP_AVERAGE);
            }

            let item: cReportVariable = fint.getVariables().item(cReportCompiler.C_GROUP_AVERAGE);
            // the Average function is for numbers

            // if param1 doesn't contain an index column is because we haven't
            // process the formulas yet. It happens because compileReport
            // is called before the InitColIndex in cReport's Launch function
            // and the order can not be changed because the function GetData 
            // is executed after the CompileReport function, and we don't want
            // to change this order because we are afraid of the collateral damage
            // it could produce :(
            //
            // In the future we can analyze it and modify the order and if this
            // doesn't produce any error we will remove this if :)
            //
            if (fint.getParameters().item(ReportGlobals.C_KEY_INDEX_COL) === null) {
                item.setValue(0);
            }
            else {
                item.setValue(
                    this.report.getGroupAverage(
                        Utils.parseInt(fint.getParameters().item(ReportGlobals.C_KEY_INDEX_COL).getValue()),
                        Utils.parseInt(fint.getParameters().item(ReportGlobals.C_KEY_INDEX_GROUP).getValue())));
            }
        }

        // this function only get the total of the group
        // the percent is calculated in the function ResultGroupPercent
        //
        private evalGroupPercent(fint: cReportFormulaInt) {
            if (fint.getVariables().item(cReportCompiler.C_GROUP_PERCENT_T) === null) {
                fint.getVariables().add(null, cReportCompiler.C_GROUP_PERCENT_T);
            }

            if (fint.getVariables().item(cReportCompiler.C_GROUP_PERCENT) === null) {
                fint.getVariables().add(null, cReportCompiler.C_GROUP_PERCENT);
            }

            let item: cReportVariable = fint.getVariables().item(cReportCompiler.C_GROUP_PERCENT_T);
            // the Percent function is for numbers

            // if param1 doesn't contain an index column is because we haven't
            // process the formulas yet. It happens because compileReport
            // is called before the InitColIndex in cReport's Launch function
            // and the order can not be changed because the function GetData 
            // is executed after the CompileReport function, and we don't want
            // to change this order because we are afraid of the collateral damage
            // it could produce :(
            //
            // In the future we can analyze it and modify the order and if this
            // doesn't produce any error we will remove this if :)
            //
            if (fint.getParameters().item(ReportGlobals.C_KEY_INDEX_COL) === null) {
                item.setValue(0);
            }
            else {
                item.setValue(
                    this.report.getGroupTotal(
                        Utils.parseInt(fint.getParameters().item(ReportGlobals.C_KEY_INDEX_COL).getValue()),
                        Utils.parseInt(fint.getParameters().item(ReportGlobals.C_KEY_INDEX_GROUP).getValue())));
            }
            this.pEvalFunctionGroup(fint);
        }

        private evalGroupCount(fint: cReportFormulaInt) {
            if (fint.getVariables().item(cReportCompiler.C_GROUP_COUNT) === null) {
                fint.getVariables().add(null, cReportCompiler.C_GROUP_COUNT);
            }

            let item: cReportVariable = fint.getVariables().item(cReportCompiler.C_GROUP_COUNT);
            // the Count function is for numbers

            // if param1 doesn't contain an index column is because we haven't
            // process the formulas yet. It happens because compileReport
            // is called before the InitColIndex in cReport's Launch function
            // and the order can not be changed because the function GetData 
            // is executed after the CompileReport function, and we don't want
            // to change this order because we are afraid of the collateral damage
            // it could produce :(
            //
            // In the future we can analyze it and modify the order and if this
            // doesn't produce any error we will remove this if :)
            //
            if (fint.getParameters().item(ReportGlobals.C_KEY_INDEX_COL) === null) {
                item.setValue(0);
            }
            else {
                item.setValue(
                    this.report.getGroupCount(
                        Utils.parseInt(fint.getParameters().item(ReportGlobals.C_KEY_INDEX_COL).getValue()),
                        Utils.parseInt(fint.getParameters().item(ReportGlobals.C_KEY_INDEX_GROUP).getValue())));
            }
        }

        private evalGroupLineNumber(fint: cReportFormulaInt) {
            if (fint.getVariables().item(cReportCompiler.C_GROUP_LINE_NUMBER) === null) {
                fint.getVariables().add(null, cReportCompiler.C_GROUP_LINE_NUMBER);
            }

            let item: cReportVariable = fint.getVariables().item(cReportCompiler.C_GROUP_LINE_NUMBER);
            // the LineNumber function is for numbers
            item.setValue(
                this.report.getGroupLineNumber(
                    Utils.parseInt(fint.getParameters().item(ReportGlobals.C_KEY_INDEX_GROUP).getValue())));
        }

        private evalIsInRs(fint: cReportFormulaInt) {
            if (fint.getVariables().item(cReportCompiler.C_IS_IN_RS) === null) {
                fint.getVariables().add(null, cReportCompiler.C_IS_IN_RS);
            }

            let item: cReportVariable = fint.getVariables().item(cReportCompiler.C_IS_IN_RS);
            // TODO: finish coding evalIsInRs
            //
            item.setValue(true);
        }

        private evalGetBarcode(fint: cReportFormulaInt) {
            if (fint.getVariables().item(cReportCompiler.C_GET_BARCODE) === null) {
                fint.getVariables().add(null, cReportCompiler.C_GET_BARCODE);
            }

            let item: cReportVariable = fint.getVariables().item(cReportCompiler.C_GET_BARCODE);

            let barcodeGen = new CSReportBarcode.cReportBarcode();
            let value = fint.getParameters().item(0).getValue();
            let barcode = barcodeGen.encodeTo128(value);

            if (barcode.contains("Ã‚")) barcode = barcodeGen.code128a(value);

            item.setValue(barcode);
        }

        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //
        private pCheckParameters(cantParams: number, parameters: string, name: string) {
            for(let i = 0; i < cantParams; i++) {
                // It must receive the control name
                //
                let param: string = this.pGetParameter(parameters, i, name);

                if (param.length === 0) {
                    throw new ReportArgumentMissingException(
                        cReportError.errGetDescription(
                                        csRptErrors.CS_RPT_ERR_MISSING_PARAM,
                                        [i.toString(), name]));
                }

                this.fint.getParameters().add2(param);
            }
        }

        private pGetIdFunction(name: string) {
            let f: cReportFormulaType = null;

            name = name.toLowerCase();
            for(let _i = 0; _i < this.formulaTypes.count(); _i++) {
                f = this.formulaTypes.item(_i);
                if (name === f.getName().toLowerCase()) {
                    return f.getId();
                }
            }
            return 0;
        }

        private pIsSeparator(c: string) {
            return " |:+()/-*=\r\n".indexOf(c, 0) > -1 && c !== "";
        }

        private removeReturns(code: string) {
            let c: string = "";
            for(let i = 0; i < code.length; i++) {
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
        private pSumTimes(st: cStructTime, date2: Date) {
            let s2 = date2.getSeconds();
            let n2 = date2.getMinutes();
            let h2 = date2.getHours();

            // get seconds
            //
            let s = (st.getSecond() + s2) % 60;

            // get minutes
            //
            let n = ((st.getSecond() + s2) / 60);
            n = n + (st.getMinute() + n2) % 60;

            // get hours
            //
            let h = ((st.getMinute() + n2) / 60);
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
                word = this.pGetWord(code, nStart);
                let refFunctionName = new RefWrapper(functionName);
                if (this.pIsFunctionAux(word, refFunctionName)) {
                    functionName = refFunctionName.get();

                    codeCallFunction = this.pGetCallFunction(code, nStart);

                    if (!this.pCompileAux(codeCallFunction, codeCallFunctionC)) {
                        return false;
                    }

                    codeC = codeC + this.pExecFunction(functionName, codeCallFunctionC);
                }
                else {
                    codeC = codeC + word;
                }
            } while (nStart < nLenCode);

            return true;
        }

        private pGetWord(code: string, nStart: number) {
            let nLenCode = code.length;

            let c = code.substring(nStart, 1);
            let word = "";
            do {
                word += c;
                nStart += 1;
                if (this.pIsSeparator(c)) break;
                c = code.substring(nStart, 1);
            } while (!this.pIsSeparator(c) && nStart < nLenCode);

            return word;
        }

        private pIsFunctionAux(word: string, functionName: RefWrapper<string>) {
            if (!this.pIsFunction(word)) { return false; }
            functionName.set(word);
            return true;
        }

        private pGetCallFunction(code: string, nStart: number) {
            let c: string;
            let word: string = "";

            let nLenCode = code.length;
            let nInner = new RefWrapper(-1);
            do {
                c = code.substring(nStart, 1);
                word = word + c;
                nStart = nStart + 1;
            } while (!this.pIsEndCallFunction(c, nInner) && nStart < nLenCode);

            return word;
        }

        private pIsEndCallFunction(c: string, nInner: RefWrapper<number>) {
            let rslt: boolean = false;
            if (c === ")") {
                if (nInner.get() === 0) {
                    rslt = true;
                }
                else {
                    nInner.set(nInner.get() - 1);
                }
            }
            else if (c === "(") {
                nInner.set(nInner.get() + 1);
            }
            return rslt;
        }

        private pExecFunction(functionName: string, parameters: string): string {
            if (this.bCompile) {
                return this.pAddFormulaInt(functionName, parameters).toString();
            }
            else {
                this.idxFormula = this.idxFormula + 1;
                let fint = this.formula.getFormulasInt().item(this.idxFormula);
                this.pSetParams(fint, parameters);
                this.pEvalFunctionInt(fint);
                let value = this.pResultFunctionInt(fint);
                if (value !== null) {
                    return this.getNumericVal(value.toString());
                }
                else {
                    return "";
                }
            }
        }

        private pSetParams(fint: cReportFormulaInt, parameters: string) {
            let vParams: string[] = null;
            let i = 0;

            parameters = parameters.trim();
            if (parameters.length > 2) {
                parameters = parameters.substring(1, parameters.length - 2);
                parameters = parameters.trim();
                vParams = parameters.split('|');

                for (i = 0; i < vParams.length; i++) {
                    fint.getParameters().item(i).setValue(vParams[i].trim());
                }
            }
        }

        private getNumericVal(value: string): string {
            let decimalDigit: number = 0;
            decimalDigit = value.indexOf(",", 0);
            if (decimalDigit > 0) {
                value = value.replace(",", ".");
            }
            return value;
        }
    }
}
