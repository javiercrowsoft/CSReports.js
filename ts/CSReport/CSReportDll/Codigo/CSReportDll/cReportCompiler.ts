(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {};


    globalObject.CSReportDll.createCReportCompiler = function() {

        const self = {};

        // all the functions (c# code or internal functions) use colons as
        // a separator for parameters. The Spanish and other configurations 
        // use the colon as the decimal separator.
        //
        // because of that we need to replace every colon by a pipe
        // and after compiling every parameter and internal function
        // we replace every pipe by a colon and then send the code to
        // c# engine. (Microsoft.CSharp.CSharpCodeProvider)

        // http://stackoverflow.com/questions/137933/what-is-the-best-scripting-language-to-embed-in-a-c-desktop-application

        const C_MODULE: string= "cReportCompiler";

        const C_TEMPFUNCTIONB: string= "Option explicit";
        const C_TEMPFUNCTIONE: string= "\r\n";

        const C_MACRO_CTRL: string= "@@";

        const C_AVERAGE_SUM: string= "AverageSum";
        const C_AVERAGE_COUNT: string= "AverageCount";
        const C_SUM: string= "Sum";
        const C_SUM_TIME: string= "SumTime";
        const C_MAX: string= "Max";
        const C_MIN: string= "Min";
        const C_COUNT: string= "Count";
        const C_NUMBER_TO_STRING: string= "NumberToString";
        const C_GET_BARCODE: string= "GetBarcode";
        const C_GET_DATA_FROM_RS_AD: string= "GetDataFromRsAd";

        const C_ISEQUAL: string= "IsEqual";
        const C_ISNOTEQUAL: string= "IsNotEqual";
        const C_ISGREATERTHAN: string= "IsGreaterThan";
        const C_ISLESSTHAN: string= "IsLessThan";

        const C_GETDATAFROMRS: string= "GetDataFromRs";

        const C_GROUPTOTAL: string= "GroupTotal";
        const C_GROUPMIN: string= "GroupMin";
        const C_GROUPMAX: string= "GroupMax";
        const C_GROUPAVERAGE: string= "GroupAverage";
        const C_GROUPPERCENT: string= "GroupPercent";
        const C_GROUPPERCENTT: string= "GroupPercentT";
        const C_GROUPCOUNT: string= "GroupCount";
        const C_GROUPLINENUMBER: string= "GroupLineNumber";

        const C_ISINRS: string= "IsInRs";

        const C_SPANISH: number= 1;
        const C_ENGLISH: number= 2;
        const C_FRENCH: number= 3;

        const C_KEYFUNCINT: string= "$$$";

        let m_formulaTypes: cReportFormulaTypes= new cReportFormulaTypes();
        let m_report: cReport = null;
        let m_variables: cReportVariables= new cReportVariables();

        // the current formula we are compiling
        //
        let m_formula: cReportFormula = null;
        // the current internal formula we are compiling
        //
        let m_fint: cReportFormulaInt = null;

        let m_objGlobals: cReportCompilerGlobals= new cReportCompilerGlobals();

        let m_collTextReplace: Dictionary= new Dictionary();
        let m_ctrlName: string= "";

        let m_bCompile: boolean = null;
        let m_idxFormula: number= -1;

        self.getReport = function() {
            return m_report;
        };

        self.setReport = function(rhs) {
            m_report = rhs;
        };

        self.clearVariables = function() {
            m_variables.clear();
        };

        self.initGlobalObject = function() {
            m_objGlobals.clear();
            m_collTextReplace.Clear();
        };

        // it compiles the code of every formula
        // first it replaces every internal function by 
        // dummy return values (of the type of the internal function)
        // if after the replace there is code it call cReportScriptEngine.compileCode
        // if there are no errors it returns true
        // 
        self.checkSyntax = function(formula) {
            try {
                let code: string= "";

                m_formula = formula;
                m_formula.getFormulasInt().clear();

                // check syntax
                code = formula.getText();
                m_formula.setTextC(code);

                pCheckSyntax(code);

                return true;
            }
            catch (ex) {
                cError.mngError(ex, "checkSyntax", C_MODULE, "");

                m_formula = null;
                m_fint = null;

                return false;
            }

        };

        self.initVariable = function(formula) {
            let variable: cReportVariable= null;
            let fint: cReportFormulaInt= null;
            let st: cStructTime= null;

            for(var _i = 0; _i < formula.getFormulasInt().count(); _i++) {
                fint = formula.getFormulasInt().item(_i);
                for(var _j = 0; _j < fint.getVariables().count(); _j++) {
                    variable = fint.getVariables().item(_j);

                    let typeCode: System.TypeCode= System.Type.GetTypeCode(variable.getValue().GetType());
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
        };

        const pEvalGroupFunctions = function(formula) {
            let fint: cReportFormulaInt= null;

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
        };

        self.resultFunction = function(formula) {
            let code: string= "";
            let vResult: object[]= null;

            m_objGlobals.setMode(eReportCompilerMode.C_RESULT);
            m_ctrlName = formula.getControlName();

            vResult =  globalObject.CSReportDll.createObject[formula.getFormulasInt().count()];

            let fint: cReportFormulaInt= null;

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
            if (G.isNumeric(code)) {
                if (vResult.Length > 0) {
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
                let parameters: var= "";

                for(var i = 0; i < vResult.Length; i++) {
                    // if one argument is null it means we don't have a row for this formula
                    // so we don't need to compile the code
                    //
                    if (vResult[i] === null)  {
                        return null; 
                    }

                    /* TODO: remove me
                    code = code.Replace(C_KEYFUNCINT + cReportGlobals.format(i + 1, "000"), 
                                            getNumericVal(vResult[i].ToString()));
                     * */

                    let parameter: var= "p__" + i + "__";
                    parameters += parameter + ",";
                    code = code.Replace(C_KEYFUNCINT + cReportGlobals.format(i + 1, "000"), parameter);

                    let paramValue: var= m_objGlobals.getVar(parameter);
                    if (paramValue === null) {
                        paramValue = m_objGlobals.addVar(parameter);
                    }
                    paramValue.setValue(vResult[i]);
                }

                if (parameters.Length > 0) {
                    parameters = parameters.Substring(0, parameters.Length - 1);
                    code = insertParametersIntoFunction(code, parameters);
                }

                formula.setLastResult(pExecScriptCode(code, formula));
                formula.setHaveToEval(false);
                return formula.getLastResult();
            }
        };

        const insertParametersIntoFunction = function(code, parameters) {
            let n: number= code.IndexOf("(") + 1;
            let code: return= code.Substring(0, n) + parameters + code.Substring(n);
        };

        const pEvalFunctionGroup = function(fint) {
            let value: number= 0;
            let total: number= 0;

            if (fint.getVariables().count() > 0) {
                if (fint.getParameters().item(cReportGlobals.C_KEYINDEXCOL2) === null) {
                    value = 0;
                }
                else {
                    let columnIndex: number= int.Parse(fint.getParameters().item(cReportGlobals.C_KEYINDEXCOL2).getValue());
                    value = cUtil.val(m_report.getValueFromRs(columnIndex).ToString());
                }

                let variable: cReportVariable= fint.getVariables().item(C_GROUPPERCENTT);
                total = cUtil.val(variable.getValue().ToString());
                value = cUtil.divideByZero(value, total);
                variable.setValue(value);

            }

        };

        self.evalFunctionGroup = function(formula) {
            let fint: cReportFormulaInt= null;

            for(var _i = 0; _i < formula.getFormulasInt().count(); _i++) {
                fint = formula.getFormulasInt().item(_i);
                pEvalFunctionGroup(fint);
            }
        };

        self.evalFunction = function(formula) {
            let codeC: string= "";

            m_objGlobals.setMode(eReportCompilerMode.C_EVAL);

            pEvalGroupFunctions(formula);

            cReportError.gDebugSection = formula.getSectionName();
            cReportError.gDebugSectionLine = formula.getSectionLineIndex();
            cReportError.gDebugControl = formula.getControlName();

            m_formula = formula;

            pCompile(formula.getText(), false, codeC);

            if (formula.getFormulasInt().count() > 0) {
                if (G.isNumeric(codeC)) {
                    pEvalSyntax("", codeC, false, formula);
                }
                else {
                    if (cUtil.subString(codeC.Trim(), 0, 8).ToLower() === "function") {
                        pEvalSyntax("", codeC, false, formula);
                    }
                }
            }
            else {
                pEvalSyntax("", codeC, false, formula);
            }
            m_formula = null;
        };

        const pCompile = function(code, bCompile, codeC) {
            m_bCompile = bCompile;
            m_idxFormula = -1;

            code = pColonToPipe(code);

            return pCompileAux(code, codeC);
        };

        const pColonToPipe = function(code) {
            return code.Replace(",", "|");
        };

        const pPipeToColon = function(code) {
            return code.Replace("|", ",");
        };

        const pIsFunction = function(word) {
            let f: cReportFormulaType= null;

            for(var _i = 0; _i < m_formulaTypes.count(); _i++) {
                f = m_formulaTypes.item(_i);
                if (word.ToLower() === f.getName().ToLower()) {
                    return true;
                }
            }
            return false;
        };

        const pAddFormulaInt = function(functionName, code) {
            // the firs thing we need to do is add this internal formula 
            // to the internal formula collection of this formula
            //
            m_fint = m_formula.getFormulasInt().add();
            return pEvalSyntax(functionName, code, true, null);
        };

        const pEvalFunctionInt = function(fint) {
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
        };

        const pResultFunctionInt = function(fint) {
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
        };

        const pEvalSyntax = function(functionName, code, bParam, formula) {
            let i: number= 0;
            let s: string= "";

            code = removeReturns(code);

            if (functionName.Length > 0) {
                return pCheckInternalFunction(functionName, code);
            }
            else if (code.Length === 0) {
                return "";
            }
            else if (code === "\"\"") {
                return "";
            }
            else if (G.isNumeric(code)) {
                return code;
            }
            else if (cReportGlobals.isDate(code)) {
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

                let vParams: String[]= null;
                let parameters: string= "";

                parameters = code.Trim();
                if (parameters.Length > 2) {
                    parameters = parameters.Substring(2, parameters.Length - 2);
                    parameters = parameters.Trim();
                    vParams = parameters.Split('|');
                }

                try {
                    for (i = 0; i < vParams.Length; i++) {
                        try {
                            // if it is a number we don't need to evaluate it
                            //
                            if (!G.isNumeric(vParams[i])) {

                                if (!pIsControl(vParams[i])) {
                                    // Si se produce un error es por que se trata
                                    // de un parametro a la funcion, la asignacion
                                    // no se llevara a cabo, y no perdere el valor
                                    // del parametro
                                    s = C_TEMPFUNCTIONB + vParams[i] + C_TEMPFUNCTIONE;
                                    vParams[i] = pExecScriptCode(s, formula).ToString();
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
        };

        const pIsTime = function(code) {
            let vTime: String[]= null;

            code = code.Trim();
            if (code.IndexOf(":", 0) === 0)  {
                return false; 
            }

            vTime = code.Split(':');
            if (vTime.Length !== 1)  {
                return false; 
            }

            if (!(G.isNumeric(vTime[0]) && G.isNumeric(vTime[1])))  {
                return false; 
            }
            return true;
        };

        const pCheckSyntax = function(code) {
            pCompile(code, true, "");
        };

        const pExecScriptCode = function(code, formula) {
            try {
                code = pPipeToColon(code);
                if (formula.getCompiledScript() === null) {
                    formula.setCompiledScript(cReportScriptEngine.compileCode(code, formula));
                }
                return cReportScriptEngine.eval(formula.getCompiledScript(), m_objGlobals);
            }
            catch (ex) {
                let msg: string= ex.Source;
                            + ex.Message + "\n\nCode:\n=====\n\n" + code + "\n\n"
                            + ex.HelpLink;
                throw new ReportException(csRptErrors.ERROR_IN_SCRIPT, C_MODULE, msg);
            }
        };

        const pIsControl = function(param) {
            let ctrl: cReportControl= null;
            for(var _i = 0; _i < m_report.getControls().count(); _i++) {
                ctrl = m_report.getControls().item(_i);
                if (ctrl.getName().ToUpper() === param.ToUpper()) {
                    return true;
                }
            }
            return false;
        };

        const pGetControl = function(param) {
            let ctrl: cReportControl= null;
            for(var _i = 0; _i < m_report.getControls().count(); _i++) {
                ctrl = m_report.getControls().item(_i);
                if (ctrl.getName().ToUpper() === param.ToUpper()) {
                    return ctrl;
                }
            }
            return null;
        };

        const pGetSubName = function(code) {
            let pos: number= 0;
            let i: number= 0;
            let c: string= "";

            pos = code.IndexOf(" ", 0) + 1;
            i = pos;
            while (i < code.Length) {
                c = code.Substring(i, 1);
                if (pIsSeparator(c)) {
                    break;
                }
                i++;
            }
            return code.Substring(pos, i - pos);
        };

        const pGetParameter = function(parameters, paramIndex, funName) {
            let param: string= "";
            let vParam: String[]= null;

            vParam = parameters.Split('|');

            if (paramIndex > vParam.Length + 1) {
                throw new ReportArgumentMissingException(
                    C_MODULE,
                    cReportError.errGetDescript(
                                    csRptErrors.CSRPTERRMISSINGPARAM,
                                    paramIndex.ToString(),
                                    funName));
            }
            else {
                param = vParam[paramIndex];
            }

            return param.Replace(")", "").Trim();
        };

        const pCheckInternalFunction = function(functionName, code) {
            let name: string= "";
            let parameters: string= "";
            let idFunction: csRptFormulaType= 0;

            let r: number= 0;
            let q: number= 0;
            let tc: string= "";

            name = functionName;
            parameters = code.Trim();
            if (parameters.Length > 2) {
                parameters = parameters.Substring(1, parameters.Length - 2);
            }

            // we need to replace in m_formula.getTextC() the function name by its key
            // 
            tc = m_formula.getTextC();
            q = name.Length;
            r = tc.ToLower().IndexOf(name.ToLower(), 0);
            q = tc.ToLower().IndexOf(")".ToLower(), r) + 1;

            m_formula.setTextC((tc.Substring(0, r)).ToString()
                                + C_KEYFUNCINT
                                + cReportGlobals.format(m_formula.getFormulasInt().count(), "000")
                                + tc.Substring(q));

            idFunction = pGetIdFunction(name);
            m_fint.setFormulaType(idFunction);

            switch (idFunction)
            {

                case csRptFormulaType.CSRPTF_PAGE_NUMBER:

                    // in compiling time we need to return a value which is consistent
                    // with the return type of the internal function
                    //
                    if (m_report === null) {
                        return 0;
                    }
                    else {
                        return m_report.getCurrenPage();
                    }

                case csRptFormulaType.CSRPTF_TEXT_REPLACE:
                    // in compiling time we need to return a value which is consistent
                    // with the return type of the internal function
                    //
                    return "";

                case csRptFormulaType.CSRPTF_TOTAL_PAGES:
                    return m_report.getTotalPages();

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
        };

        const resultGetString = function(fint) {
            let param: string= "";

            param = fint.getParameters().item(0).getValue();

            if (param === "\"\"") {
                return param;
            }
            else {
                if (pIsControl(param)) {
                    return "\"" + m_report.getValueString(param).Replace("\"", "\"\"") + "\"";
                }
                else {
                    return "\"" + param.Replace("\"", "\"\"") + "\"";
                }
            }
        };

        const resultSumTime = function(fint) {
            if (fint.getVariables().count() === 0)  {
                return ""; 
            }
            let st: cStructTime= null;
            st = fint.getVariables().item(C_SUM_TIME).getValue();
            if (cUtil.val(fint.getParameters().item(1).getValue()) !== 0) {
                return cReportGlobals.format(st.getHour(), "00")
                        + ":" + cReportGlobals.format(st.getMinute(), "00")
                        + ":" + cReportGlobals.format(st.getSecond(), "00");
            }
            else {
                return cReportGlobals.format(st.getHour(), "00") + ":" + cReportGlobals.format(st.getMinute(), "00");
            }
        };

        const resultSum = function(fint) {
            if (fint.getVariables().count() === 0) { return 0; }
            return Convert.ToDouble(fint.getVariables().item(C_SUM).getValue());
        };

        const resultGetDataFromRsAd = function(fint) {
            return null;
        };

        const resultGetDataFromRs = function(fint) {
            return null;
        };

        const resultGetVar = function(fint) {
            let varName: string= "";
            varName = fint.getParameters().item(0).getValue();

            if (m_variables.item(varName) === null) {
                throw new ReportArgumentMissingException(
                    C_MODULE,
                    cReportError.errGetDescript(
                                    csRptErrors.CSRPTERRMISSINGPARAM,
                                    varName,
                                    "_getVar()"));
            }
            return m_variables.item(varName).getValue();
        };

        const resultGetParam = function(fint) {
            let param: cParameter= null;
            let paramName: string= "";

            paramName = fint.getParameters().item(0).getValue();

            for(var _i = 0; _i < m_report.getConnect().getParameters().count(); _i++) {
                param = m_report.getConnect().getParameters().item(_i);
                if (param.getName().ToLower() === paramName.ToLower()) {
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
        };

        const resultMax = function(fint) {
            if (fint.getVariables().count() === 0) { return 0; }
            return fint.getVariables().item(C_MAX).getValue();
        };

        const resultMin = function(fint) {
            if (fint.getVariables().count() === 0) { return 0; }
            return fint.getVariables().item(C_MIN).getValue();
        };

        const resultCount = function(fint) {
            if (fint.getVariables().count() === 0) { return null; }
            return fint.getVariables().item(C_COUNT).getValue();
        };

        const resultNumberToString = function(fint) {
            if (fint.getVariables().count() > 0) {
                return fint.getVariables().item(C_NUMBER_TO_STRING).getValue();
            }
            else {
                return "";
            }
        };

        const resultGetBarcode = function(fint) {
            if (fint.getVariables().count() > 0) {
                return fint.getVariables().item(C_GET_BARCODE).getValue();
            }
            else {
                return "";
            }
        };

        const resultIsEqual = function(fint) {
            if (fint.getVariables().count() > 0) {
                return fint.getVariables().item(C_ISEQUAL).getValue();
            }
            else {
                return 0;
            }
        };

        const resultIsNotEqual = function(fint) {
            if (fint.getVariables().count() > 0) {
                return fint.getVariables().item(C_ISNOTEQUAL).getValue();
            }
            else {
                return 0;
            }
        };

        const resultIsGreaterThan = function(fint) {
            if (fint.getVariables().count() > 0) {
                return fint.getVariables().item(C_ISGREATERTHAN).getValue();
            }
            else {
                return 0;
            }
        };

        const resultIsLessThan = function(fint) {
            if (fint.getVariables().count() > 0) {
                return fint.getVariables().item(C_ISLESSTHAN).getValue();
            }
            else {
                return 0;
            }
        };

        const resultAverage = function(fint) {
            if (fint.getVariables().count() === 0)  {
                return 0; 
            }
            let sum: number= fint.getVariables().item(C_AVERAGE_SUM).getValue();
            let count: number= fint.getVariables().item(C_AVERAGE_COUNT).getValue();
            return sum / count;
        };

        const resultCalculo = function(fint) {
            let control: string= "";
            let value1: number= 0;
            let value2: number= 0;
            let oper: number= 0;

            control = fint.getParameters().item(1).getValue();

            value1 = Convert.ToDouble(m_report.getValue(fint.getParameters().item(0).getValue(), true));

            if (control !== "\"\"") {
                value2 = Convert.ToDouble(m_report.getValue(control, true));
            }
            else {
                value2 = double.Parse(fint.getParameters().item(2).getValue());
            }

            oper = int.Parse(fint.getParameters().item(3).getValue());

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
        };

        const resultLength = function(fint) {
            return m_report.getValueString(fint.getParameters().item(0).getValue()).Length;
        };

        const resultTextReplace = function(fint) {
            let i: number= 0;
            let ctrl: cReportControl= null;
            let text: string= "";
            let collCtrlsToReplace: List= null;

            ctrl = pGetControl(m_ctrlName);
            if (ctrl === null) {
                return "";
            }

            text = ctrl.getLabel().getText();

            try {
                collCtrlsToReplace = m_collTextReplace[m_ctrlName];
            }
            catch(ex) {
                let lenText: number= 0;
                let pos: number= 0;
                let endpos: number= 0;

                collCtrlsToReplace =  globalObject.CSReportDll.createList();

                lenText = text.Length;
                while (i < lenText) {
                    pos = text.IndexOf(C_MACRO_CTRL, i + 1);
                    if (pos > 0) {
                        endpos = text.IndexOf(C_MACRO_CTRL, pos + 1);

                        if (endpos > 0) {
                            collCtrlsToReplace.Add(text.Substring(pos + 2, endpos - pos - 2));
                        }
                        i = endpos + 1;
                    }
                    else {
                        i = lenText + 1;
                    }
                }

                m_collTextReplace.Add(m_ctrlName, collCtrlsToReplace);
            }

            let ctrlValue: cReportControl= null;
            for (i = 0; i < collCtrlsToReplace.Count; i++) {
                ctrlValue = pGetControl(collCtrlsToReplace[i]);
                if (ctrlValue !== null) {
                    text = text.Replace(C_MACRO_CTRL + collCtrlsToReplace[i] + C_MACRO_CTRL,
                                        m_report.getValue(ctrlValue.getName(), false).ToString());
                }
            }
            return text;
        };

        const resultValue = function(fint) {
            return m_report.getValue(fint.getParameters().item(0).getValue(), true);
        };

        const resultPageNumber = function() {
            return m_report.getCurrenPage();
        };

        const resultTotalPages = function() {
            return m_report.getTotalPages();
        };

        const resultGroupTotal = function(fint) {
            if (fint.getVariables().count() > 0) {
                return fint.getVariables().item(C_GROUPTOTAL).getValue();
            }
            else {
                return 0;
            }
        };

        const resultGroupMax = function(fint) {
            if (fint.getVariables().count() > 0) {
                return fint.getVariables().item(C_GROUPMAX).getValue();
            }
            else {
                return 0;
            }
        };

        const resultGroupMin = function(fint) {
            if (fint.getVariables().count() > 0) {
                return fint.getVariables().item(C_GROUPMIN).getValue();
            }
            else {
                return 0;
            }
        };

        const resultGroupAverage = function(fint) {
            if (fint.getVariables().count() > 0) {
                return fint.getVariables().item(C_GROUPAVERAGE).getValue();
            }
            else {
                return 0;
            }
        };

        const resultGroupPercent = function(fint) {
            if (fint.getVariables().count() > 0) {
                return fint.getVariables().item(C_GROUPPERCENT).getValue();
            }
            else {
                return 0;
            }
        };

        const resultGroupCount = function(fint) {
            if (fint.getVariables().count() > 0) {
                return fint.getVariables().item(C_GROUPCOUNT).getValue();
            }
            else {
                return 0;
            }
        };

        const resultGroupLineNumber = function(fint) {
            if (fint.getVariables().count() > 0) {
                return fint.getVariables().item(C_GROUPLINENUMBER).getValue();
            }
            else {
                return 0;
            }
        };

        const resultIsInRs = function(fint) {
            if (fint.getVariables().count() > 0) {
                return fint.getVariables().item(C_ISINRS).getValue();
            }
            else {
                return 0;
            }
        };

        const evalAverage = function(fint) {
            if (fint.getVariables().item(C_AVERAGE_SUM) === null) {
                fint.getVariables().add(null, C_AVERAGE_SUM);
                fint.getVariables().add(null, C_AVERAGE_COUNT);
            }

            let item: cReportVariable= fint.getVariables().item(C_AVERAGE_SUM);
            // the average function is for numbers
            //
            item.setValue(item.getValue()
                + pGetNumber(m_report.getValue(fint.getParameters().item(0).getValue(), true)));

            item = fint.getVariables().item(C_AVERAGE_COUNT);
            // the average function is for numbers
            //
            item.setValue(item.getValue() + 1);
        };

        const pGetNumber = function(number) {
            let strNumber: string= number.ToString();
            let rtn: number= 0;
            let sepDecimal: string= "";

            if (G.isNumeric(strNumber)) {
                sepDecimal = cUtil.getSepDecimal();
                if (sepDecimal !== ".") {
                    strNumber = strNumber.Replace(".", sepDecimal);
                }
                rtn = cUtil.val(strNumber);

            }

            return rtn;
        };

        const evalSum = function(fint) {
            if (fint.getVariables().item(C_SUM) === null) {
                fint.getVariables().add(null, C_SUM).setValue(0);
            }

            let item: cReportVariable= fint.getVariables().item(C_SUM);
            // the sum function is for numbers
            //
            item.setValue(Convert.ToDouble(item.getValue())
                + pGetNumber(m_report.getValue(fint.getParameters().item(0).getValue(), true)));
        };

        const evalDeclareVar = function(fint) {
            let varName: string= "";

            varName = fint.getParameters().item(0).getValue();

            if (m_variables.item(varName) === null) {
                m_variables.add(null, varName);
            }
        };

        const evalSetVar = function(fint) {
            let varName: string= "";

            varName = fint.getParameters().item(0).getValue();

            if (m_variables.item(varName) === null) {
                throw new ReportArgumentMissingException(
                    C_MODULE,
                    cReportError.errGetDescript(
                                    csRptErrors.CSRPTERRMISSINGPARAM,
                                    varName,
                                    "_setVar"));
            }

            let item: cReportVariable= m_variables.item(varName);
            item.setValue(fint.getParameters().item(1).getValue());
        };

        const evalGetDataFromRsAd = function(fint) {

        };

        const evalGetDataFromRs = function(fint) {

        };

        const evalAddToVar = function(fint) {
            let varName: string= "";

            varName = fint.getParameters().item(0).getValue();

            if (m_variables.item(varName) === null) {
                throw new ReportArgumentMissingException(
                    C_MODULE,
                    cReportError.errGetDescript(
                                    csRptErrors.CSRPTERRMISSINGPARAM,
                                    varName,
                                    "_evalAddToVar"));
            }

            let item: cReportVariable= m_variables.item(varName);
            // the EvalAddToVar function is for numbers
            //
            item.setValue(item.getValue() 
                                + pGetNumber(fint.getParameters().item(1).getValue()));
        };

        const evalSumTime = function(fint) {
            if (fint.getVariables().item(C_SUM_TIME) === null) {
                fint.getVariables().add(null, C_SUM_TIME).setValue(new cStructTime());
            }

            let item: cReportVariable= fint.getVariables().item(C_SUM_TIME);
            // the SumTime if for dates
            //
            pSumTimes(item.getValue(),
                        DateTime.Parse(m_report.getValue(fint.getParameters().item(0).getValue(), true).ToString()));
        };

        const evalMax = function(fint) {
            let value: object= null;

            if (fint.getVariables().item(C_MAX) === null) {
                fint.getVariables().add(null, C_MAX);
            }

            let item: cReportVariable= fint.getVariables().item(C_MAX);
            // the Max function if for numbers and strings
            //
            value = m_report.getValue(fint.getParameters().item(0).getValue());

            if (value.GetType() === typeof(String)) {
                if (String.Compare(item.getValue().ToString(), 
                                    value.ToString(), 
                                    StringComparison.CurrentCulture) < 0) {
                    item.setValue(value);
                }
            }
            else {
                if (item.getValue() < value) {
                    item.setValue(value);
                }
            }
        };

        const evalMin = function(fint) {
            let value: object= null;

            if (fint.getVariables().item(C_MIN) === null) {
                fint.getVariables().add(null, C_MIN);
            }

            let item: cReportVariable= fint.getVariables().item(C_MIN);
            // The Min function is for numbers and strings
            //
            value = m_report.getValue(fint.getParameters().item(0).getValue());

            if (value.GetType() === typeof(String)) {
                if (String.Compare(item.getValue().ToString(),
                                    value.ToString(),
                                    StringComparison.CurrentCulture) > 0) {
                    item.setValue(value);
                }
            }
            else {
                if (item.getValue() > value) {
                    item.setValue(value);
                }
            }
        };

        const evalCount = function(fint) {
            if (fint.getVariables().item(C_COUNT) === null) {
                fint.getVariables().add(null, C_COUNT);
            }

            let item: cReportVariable= fint.getVariables().item(C_COUNT);
            // the Count functio is for numbers
            //
            item.setValue(item.getValue() + 1);
        };

        const evalNumberToString = function(fint) {
            if (fint.getVariables().item(C_NUMBER_TO_STRING) === null) {
                fint.getVariables().add(null, C_NUMBER_TO_STRING);
            }

            let item: cReportVariable= fint.getVariables().item(C_NUMBER_TO_STRING);
            // the NumberToString funciton is for numbres
            //
            let iNumber: number= 0;
            let iLenguage: number= 0;

            iNumber = pGetNumber(m_report.getValue(fint.getParameters().item(0).getValue(), true));
            iLenguage = cUtil.valAsInt(fint.getParameters().item(1).getValue());

            let ntos: cNumberToString= new cNumberToString();

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
        };

        const evalIsEqual = function(fint) {
            if (fint.getVariables().item(C_ISEQUAL) === null) {
                fint.getVariables().add(null, C_ISEQUAL);
            }

            let item: cReportVariable= fint.getVariables().item(C_ISEQUAL);
            // the IsEqual function is for numbers
            //
            let strValue: string= "";
            let strConstValue: string= "";

            strValue = m_report.getValue(fint.getParameters().item(0).getValue(), true).ToString();
            strConstValue = fint.getParameters().item(1).getValue();

            item.setValue(strValue === strConstValue);
        };

        const evalIsNotEqual = function(fint) {
            if (fint.getVariables().item(C_ISNOTEQUAL) === null) {
                fint.getVariables().add(null, C_ISNOTEQUAL);
            }

            let item: cReportVariable= fint.getVariables().item(C_ISNOTEQUAL);
            // the IsNotEqual function is for numbers
            //
            let strValue: string= "";
            let strConstValue: string= "";

            strValue = m_report.getValue(fint.getParameters().item(0).getValue(), true);
            strConstValue = fint.getParameters().item(1).getValue();

            item.setValue(strValue !== strConstValue);
        };

        const evalIsGreaterThan = function(fint) {
            if (fint.getVariables().item(C_ISGREATERTHAN) === null) {
                fint.getVariables().add(null, C_ISGREATERTHAN);
            }

            let item: cReportVariable= fint.getVariables().item(C_ISGREATERTHAN);
            // the IsGreaterThan function is for numbers
            //
            let value: object= m_report.getValue(fint.getParameters().item(0).getValue(), true);
            const constValue: object= fint.getParameters().item(1).getValue();

            if (value.GetType() === typeof(String)) {
                let strValue: string= value.ToString();
                const strConstValue: string= constValue.ToString();

                if (String.Compare(strValue.ToString(),
                                    strConstValue.ToString(),
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
        };

        const evalIsLessThan = function(fint) {
            if (fint.getVariables().item(C_ISLESSTHAN) === null) {
                fint.getVariables().add(null, C_ISLESSTHAN);
            }

            let item: cReportVariable= fint.getVariables().item(C_ISLESSTHAN);
            // the IsLessThan function is for numbers
            //
            let value: object= m_report.getValue(fint.getParameters().item(0).getValue(), true);
            const constValue: object= fint.getParameters().item(1).getValue();

            if (value.GetType() === typeof(String)) {
                let strValue: string= value.ToString();
                const strConstValue: string= constValue.ToString();

                if (String.Compare(strValue.ToString(),
                                    strConstValue.ToString(),
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
        };

        const evalGroupTotal = function(fint) {
            if (fint.getVariables().item(C_GROUPTOTAL) === null) {
                fint.getVariables().add(null, C_GROUPTOTAL);
            }

            let item: cReportVariable= fint.getVariables().item(C_GROUPTOTAL);
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
            if (fint.getParameters().item(cReportGlobals.C_KEYINDEXCOL) === null) {
                item.setValue(0);
            }
            else {
                item.setValue(
                    m_report.getGroupTotal(
                        int.Parse(fint.getParameters().item(cReportGlobals.C_KEYINDEXCOL).getValue()),
                        int.Parse(fint.getParameters().item(cReportGlobals.C_KEYINDEXGROUP).getValue())));
            }
        };

        const evalGroupMax = function(fint) {
            if (fint.getVariables().item(C_GROUPMAX) === null) {
                fint.getVariables().add(null, C_GROUPMAX);
            }

            let item: cReportVariable= fint.getVariables().item(C_GROUPMAX);
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
            if (fint.getParameters().item(cReportGlobals.C_KEYINDEXCOL) === null) {
                item.setValue(0);
            }
            else {
                item.setValue(
                    m_report.getGroupMax(
                                int.Parse(fint.getParameters().item(cReportGlobals.C_KEYINDEXCOL).getValue()),
                                int.Parse(fint.getParameters().item(cReportGlobals.C_KEYINDEXGROUP).getValue())));
            }
        };

        const evalGroupMin = function(fint) {
            if (fint.getVariables().item(C_GROUPMIN) === null) {
                fint.getVariables().add(null, C_GROUPMIN);
            }

            let item: cReportVariable= fint.getVariables().item(C_GROUPMIN);
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
            if (fint.getParameters().item(cReportGlobals.C_KEYINDEXCOL) === null) {
                item.setValue(0);
            }
            else {
                item.setValue(
                    m_report.getGroupMin(
                        int.Parse(fint.getParameters().item(cReportGlobals.C_KEYINDEXCOL).getValue()),
                        int.Parse(fint.getParameters().item(cReportGlobals.C_KEYINDEXGROUP).getValue())));
            }
        };

        const evalGroupAverage = function(fint) {
            if (fint.getVariables().item(C_GROUPAVERAGE) === null) {
                fint.getVariables().add(null, C_GROUPAVERAGE);
            }

            let item: cReportVariable= fint.getVariables().item(C_GROUPAVERAGE);
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
            if (fint.getParameters().item(cReportGlobals.C_KEYINDEXCOL) === null) {
                item.setValue(0);
            }
            else {
                item.setValue(
                    m_report.getGroupAverage(
                        int.Parse(fint.getParameters().item(cReportGlobals.C_KEYINDEXCOL).getValue()),
                        int.Parse(fint.getParameters().item(cReportGlobals.C_KEYINDEXGROUP).getValue())));
            }
        };

        // this function only get the total of the group
        // the percent is calculated in the function ResultGroupPercent
        //
        const evalGroupPercent = function(fint) {
            if (fint.getVariables().item(C_GROUPPERCENTT) === null) {
                fint.getVariables().add(null, C_GROUPPERCENTT);
            }

            if (fint.getVariables().item(C_GROUPPERCENT) === null) {
                fint.getVariables().add(null, C_GROUPPERCENT);
            }

            let item: cReportVariable= fint.getVariables().item(C_GROUPPERCENTT);
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
            if (fint.getParameters().item(cReportGlobals.C_KEYINDEXCOL) === null) {
                item.setValue(0);
            }
            else {
                item.setValue(
                    m_report.getGroupTotal(
                        int.Parse(fint.getParameters().item(cReportGlobals.C_KEYINDEXCOL).getValue()), 
                        int.Parse(fint.getParameters().item(cReportGlobals.C_KEYINDEXGROUP).getValue())));
            }
            pEvalFunctionGroup(fint);
        };

        const evalGroupCount = function(fint) {
            if (fint.getVariables().item(C_GROUPCOUNT) === null) {
                fint.getVariables().add(null, C_GROUPCOUNT);
            }

            let item: cReportVariable= fint.getVariables().item(C_GROUPCOUNT);
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
            if (fint.getParameters().item(cReportGlobals.C_KEYINDEXCOL) === null) {
                item.setValue(0);
            }
            else {
                item.setValue(
                    m_report.getGroupCount(
                        int.Parse(fint.getParameters().item(cReportGlobals.C_KEYINDEXCOL).getValue()),
                        int.Parse(fint.getParameters().item(cReportGlobals.C_KEYINDEXGROUP).getValue())));
            }
        };

        const evalGroupLineNumber = function(fint) {
            if (fint.getVariables().item(C_GROUPLINENUMBER) === null) {
                fint.getVariables().add(null, C_GROUPLINENUMBER);
            }

            let item: cReportVariable= fint.getVariables().item(C_GROUPLINENUMBER);
            // the LineNumber function is for numbers
            item.setValue(
                m_report.getGroupLineNumber(
                    int.Parse(fint.getParameters().item(cReportGlobals.C_KEYINDEXGROUP).getValue())));
        };

        const evalIsInRs = function(fint) {
            if (fint.getVariables().item(C_ISINRS) === null) {
                fint.getVariables().add(null, C_ISINRS);
            }

            let item: cReportVariable= fint.getVariables().item(C_ISINRS);
            // TODO: finish coding evalIsInRs
            //
            item.setValue(true);
        };

        const evalGetBarcode = function(fint) {
            if (fint.getVariables().item(C_GET_BARCODE) === null) {
                fint.getVariables().add(null, C_GET_BARCODE);
            }

            let item: cReportVariable= fint.getVariables().item(C_GET_BARCODE);

            let barcodeGen: var= new CSReportBarcode.cReportBarcode();
            let value: var= fint.getParameters().item(0).getValue();
            let barcode: var= barcodeGen.encodeTo128(value);

            if (barcode.Contains("Ã‚")) barcode = barcodeGen.code128a(value); {

            item.setValue(barcode);
        };

        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //
        const pCheckParameters = function(cantParams, parameters, name) {
            for(var i = 0; i < cantParams; i++) {
                // It must receive the control name
                //
                let param: string= pGetParameter(parameters, i, name);

                if (param.Length === 0) {
                    throw new ReportArgumentMissingException(
                        C_MODULE,
                        cReportError.errGetDescript(
                                        csRptErrors.CSRPTERRMISSINGPARAM,
                                        i.ToString(),
                                        name));
                }

                m_fint.getParameters().add(param);
            }
        };

        const pGetIdFunction = function(name) {
            let f: cReportFormulaType= null;

            name = name.ToLower();
            for(var _i = 0; _i < m_formulaTypes.count(); _i++) {
                f = m_formulaTypes.item(_i);
                if (name === f.getName().ToLower()) {
                    return f.getId();
                }
            }
            return 0;
        };

        const pIsSeparator = function(c) {
            return " |:+()/-*=\r\n".IndexOf(c, 0) > -1 && c !== "";
        };

        const removeReturns = function(code) {
            let c: string= "";
            for(var i = 0; i < code.Length; i++) {
                c = code.Substring(i, 1);
                if (c !== " " && c !== "\r" && c !== "\n") {
                    code = code.Substring(i);
                    break; 
                }
            }

            return code;
        };

        // Dates start 1-1-1900 00:00:00
        //
        const pSumTimes = function(st, date2) {
            let n2: number= 0;
            let h2: number= 0;
            let s2: number= 0;

            let n: number= 0;
            let h: number= 0;
            let s: number= 0;
            let d: number= 0;

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
        };

        const pCompileAux = function(code, codeC) {
            let codeCallFunction: string= "";
            let codeCallFunctionC: string= "";
            let functionName: string= "";
            let word: string= "";

            let nStart: number= 0;
            let nLenCode: number= code.Length;

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
        };

        const pGetWord = function(code, nStart) {
            let c: string= "";
            let nLenCode: number= 0;
            let word: string= "";

            nLenCode = code.Length;

            c = code.Substring(nStart, 1);

            do {
                word += c;
                nStart += 1;
                if (pIsSeparator(c)) break; {
                c = cUtil.subString(code, nStart, 1);
            } while (!pIsSeparator(c) && nStart < nLenCode);

            return word;
        };

        const pIsFunctionAux = function(word, functionName) {
            if (!pIsFunction(word)) { return false; }
            functionName = word;
            return true;
        };

        const pGetCallFunction = function(code, nStart) {
            let c: string= "";
            let nLenCode: number= 0;
            let word: string= "";
            let nInner: number= 0;

            nLenCode = code.Length;
            nInner = -1;

            do {
                c = code.Substring(nStart, 1);
                word = word + c;
                nStart = nStart + 1;
            } while (!pIsEndCallFunction(c, nInner) && nStart < nLenCode);

            return word;
        };

        const pIsEndCallFunction = function(c, nInner) {
            let _rtn: boolean= false;
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
            if (m_bCompile)
            {
                return pAddFormulaInt(functionName, parameters).ToString();
            }
            else
            {
                cReportFormulaInt fint = null;
                m_idxFormula = m_idxFormula + 1;
                fint = m_formula.getFormulasInt().item(m_idxFormula);
                pSetParams(fint, parameters);
                pEvalFunctionInt(fint);
                object value = pResultFunctionInt(fint);
                if (value !== null)
                {
                    return getNumericVal(value.ToString());
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
            if (parameters.Length > 2)
            {
                parameters = parameters.Substring(1, parameters.Length - 2);
                parameters = parameters.Trim();
                vParams = parameters.Split('|');

                for (i = 0; i < vParams.Length; i++)
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

        return self;

    }

}(globalObject)); {
