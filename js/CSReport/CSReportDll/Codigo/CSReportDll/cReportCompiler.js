(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {}; //@@@: namespace CSReportDll
 //@@@: {

    globalObject.CSReportDll.createCReportCompiler = function() {

        const self = {}; //@@@: public class cReportCompiler

        // all the functions (c# code or internal functions) use colons as
        // a separator for parameters. The Spanish and other configurations 
        // use the colon as the decimal separator.
        //
        // because of that we need to replace every colon by a pipe
        // and after compiling every parameter and internal function
        // we replace every pipe by a colon and then send the code to
        // c# engine. (Microsoft.CSharp.CSharpCodeProvider)

        // http://stackoverflow.com/questions/137933/what-is-the-best-scripting-language-to-embed-in-a-c-desktop-application

        const C_MODULE = "cReportCompiler"; //@@@: private const String C_MODULE = "cReportCompiler";

        const C_TEMPFUNCTIONB = "Option explicit"; //@@@: private const String C_TEMPFUNCTIONB = "Option explicit";
        const C_TEMPFUNCTIONE = "\r\n"; //@@@: private const String C_TEMPFUNCTIONE = "\r\n";

        const C_MACRO_CTRL = "@@"; //@@@: private const String C_MACRO_CTRL = "@@";

        const C_AVERAGE_SUM = "AverageSum"; //@@@: private const String C_AVERAGE_SUM = "AverageSum";
        const C_AVERAGE_COUNT = "AverageCount"; //@@@: private const String C_AVERAGE_COUNT = "AverageCount";
        const C_SUM = "Sum"; //@@@: private const String C_SUM = "Sum";
        const C_SUM_TIME = "SumTime"; //@@@: private const String C_SUM_TIME = "SumTime";
        const C_MAX = "Max"; //@@@: private const String C_MAX = "Max";
        const C_MIN = "Min"; //@@@: private const String C_MIN = "Min";
        const C_COUNT = "Count"; //@@@: private const String C_COUNT = "Count";
        const C_NUMBER_TO_STRING = "NumberToString"; //@@@: private const String C_NUMBER_TO_STRING = "NumberToString";
        const C_GET_BARCODE = "GetBarcode"; //@@@: private const String C_GET_BARCODE = "GetBarcode";
        const C_GET_DATA_FROM_RS_AD = "GetDataFromRsAd"; //@@@: private const String C_GET_DATA_FROM_RS_AD = "GetDataFromRsAd";

        const C_ISEQUAL = "IsEqual"; //@@@: private const String C_ISEQUAL = "IsEqual";
        const C_ISNOTEQUAL = "IsNotEqual"; //@@@: private const String C_ISNOTEQUAL = "IsNotEqual";
        const C_ISGREATERTHAN = "IsGreaterThan"; //@@@: private const String C_ISGREATERTHAN = "IsGreaterThan";
        const C_ISLESSTHAN = "IsLessThan"; //@@@: private const String C_ISLESSTHAN = "IsLessThan";

        const C_GETDATAFROMRS = "GetDataFromRs"; //@@@: private const String C_GETDATAFROMRS = "GetDataFromRs";

        const C_GROUPTOTAL = "GroupTotal"; //@@@: private const String C_GROUPTOTAL = "GroupTotal";
        const C_GROUPMIN = "GroupMin"; //@@@: private const String C_GROUPMIN = "GroupMin";
        const C_GROUPMAX = "GroupMax"; //@@@: private const String C_GROUPMAX = "GroupMax";
        const C_GROUPAVERAGE = "GroupAverage"; //@@@: private const String C_GROUPAVERAGE = "GroupAverage";
        const C_GROUPPERCENT = "GroupPercent"; //@@@: private const String C_GROUPPERCENT = "GroupPercent";
        const C_GROUPPERCENTT = "GroupPercentT"; //@@@: private const String C_GROUPPERCENTT = "GroupPercentT";
        const C_GROUPCOUNT = "GroupCount"; //@@@: private const String C_GROUPCOUNT = "GroupCount";
        const C_GROUPLINENUMBER = "GroupLineNumber"; //@@@: private const String C_GROUPLINENUMBER = "GroupLineNumber";

        const C_ISINRS = "IsInRs"; //@@@: private const String C_ISINRS = "IsInRs";

        const C_SPANISH = 1; //@@@: private const int C_SPANISH = 1;
        const C_ENGLISH = 2; //@@@: private const int C_ENGLISH = 2;
        const C_FRENCH = 3; //@@@: private const int C_FRENCH = 3;

        const C_KEYFUNCINT = "$$$"; //@@@: private const String C_KEYFUNCINT = "$$$";

        let m_formulaTypes = new cReportFormulaTypes(); //@@@: private cReportFormulaTypes m_formulaTypes = new cReportFormulaTypes();
        let m_report = null; //@@@: private cReport m_report;
        let m_variables = new cReportVariables(); //@@@: private cReportVariables m_variables = new cReportVariables();

        // the current formula we are compiling
        //
        let m_formula = null; //@@@: private cReportFormula m_formula;
        // the current internal formula we are compiling
        //
        let m_fint = null; //@@@: private cReportFormulaInt m_fint;

        let m_objGlobals = new cReportCompilerGlobals(); //@@@: private cReportCompilerGlobals m_objGlobals = new cReportCompilerGlobals();

        let m_collTextReplace = new Dictionary(); //@@@: private Dictionary<string, List<String>> m_collTextReplace = new Dictionary<string, List<String>>();
        let m_ctrlName = ""; //@@@: private String m_ctrlName = "";

        let m_bCompile = null; //@@@: private bool m_bCompile;
        let m_idxFormula = -1; //@@@: private int m_idxFormula = -1;

        self.getReport = function() { //@@@: internal cReport getReport()
            return m_report; //@@@: return m_report;
        }; //@@@: }

        self.setReport = function(rhs) { //@@@: internal void setReport(cReport rhs)
            m_report = rhs; //@@@: m_report = rhs;
        }; //@@@: }

        self.clearVariables = function() { //@@@: public void clearVariables()
            m_variables.clear(); //@@@: m_variables.clear();
        }; //@@@: }

        self.initGlobalObject = function() { //@@@: public void initGlobalObject()
            m_objGlobals.clear(); //@@@: m_objGlobals.clear();
            m_collTextReplace.Clear(); //@@@: m_collTextReplace.Clear();
        }; //@@@: }

        // it compiles the code of every formula
        // first it replaces every internal function by 
        // dummy return values (of the type of the internal function)
        // if after the replace there is code it call cReportScriptEngine.compileCode
        // if there are no errors it returns true
        // 
        self.checkSyntax = function(formula) { //@@@: public bool checkSyntax(cReportFormula formula)
            try { //@@@: try
                let code = ""; //@@@: String code = "";

                m_formula = formula; //@@@: m_formula = formula;
                m_formula.getFormulasInt().clear(); //@@@: m_formula.getFormulasInt().clear();

                // check syntax
                code = formula.getText(); //@@@: code = formula.getText();
                m_formula.setTextC(code); //@@@: m_formula.setTextC(code);

                pCheckSyntax(code); //@@@: pCheckSyntax(code);

                return true; //@@@: return true;
            } //@@@: }
            catch (ex) { //@@@: catch (Exception ex)
                cError.mngError(ex, "checkSyntax", C_MODULE, ""); //@@@: cError.mngError(ex, "checkSyntax", C_MODULE, "");

                m_formula = null; //@@@: m_formula = null;
                m_fint = null; //@@@: m_fint = null;

                return false; //@@@: return false;
            } //@@@: }

        }; //@@@: }

        self.initVariable = function(formula) { //@@@: public void initVariable(cReportFormula formula)
            let variable = null; //@@@: cReportVariable variable = null;
            let fint = null; //@@@: cReportFormulaInt fint = null;
            let st = null; //@@@: cStructTime st = null;

            for(var _i = 0; _i < formula.getFormulasInt().count(); _i++) { //@@@: for (int _i = 0; _i < formula.getFormulasInt().count(); _i++)
                fint = formula.getFormulasInt().item(_i); //@@@: fint = formula.getFormulasInt().item(_i);
                for(var _j = 0; _j < fint.getVariables().count(); _j++) { //@@@: for (int _j = 0; _j < fint.getVariables().count(); _j++)
                    variable = fint.getVariables().item(_j); //@@@: variable = fint.getVariables().item(_j);

                    let typeCode = System.Type.GetTypeCode(variable.getValue().GetType()); //@@@: System.TypeCode typeCode = System.Type.GetTypeCode(variable.getValue().GetType());
                    switch (typeCode) //@@@: switch (typeCode)
                    { //@@@: {

                        case System.TypeCode.DBNull: //@@@: case System.TypeCode.DBNull:
                            break; //@@@: break;
                        case System.TypeCode.Decimal: //@@@: case System.TypeCode.Decimal:
                        case System.TypeCode.Double: //@@@: case System.TypeCode.Double:
                        case System.TypeCode.Int16: //@@@: case System.TypeCode.Int16:
                        case System.TypeCode.Int32: //@@@: case System.TypeCode.Int32:
                        case System.TypeCode.Int64: //@@@: case System.TypeCode.Int64:
                        case System.TypeCode.Single: //@@@: case System.TypeCode.Single:
                        case System.TypeCode.UInt16: //@@@: case System.TypeCode.UInt16:
                        case System.TypeCode.UInt32: //@@@: case System.TypeCode.UInt32:
                        case System.TypeCode.UInt64: //@@@: case System.TypeCode.UInt64:
                        case System.TypeCode.Byte: //@@@: case System.TypeCode.Byte:
                        case System.TypeCode.SByte: //@@@: case System.TypeCode.SByte:
                        case System.TypeCode.DateTime: //@@@: case System.TypeCode.DateTime:
                        case System.TypeCode.Boolean: //@@@: case System.TypeCode.Boolean:
                            variable.setValue(0); //@@@: variable.setValue(0);
                            break; //@@@: break;
                        case System.TypeCode.Char: //@@@: case System.TypeCode.Char:
                        case System.TypeCode.String: //@@@: case System.TypeCode.String:
                            variable.setValue(""); //@@@: variable.setValue("");
                            break; //@@@: break;
                        case System.TypeCode.Object: //@@@: case System.TypeCode.Object:
                            if (variable.getValue() is cStructTime) { //@@@: if (variable.getValue() is cStructTime)
                                st = variable.getValue(); //@@@: st = (cStructTime)variable.getValue();
                                st.setHour(0); //@@@: st.setHour(0);
                                st.setMinute(0); //@@@: st.setMinute(0);
                                st.setSecond(0); //@@@: st.setSecond(0);
                            } //@@@: }
                            break; //@@@: break;
                        case System.TypeCode.Empty: //@@@: case System.TypeCode.Empty:
                            break; //@@@: break;
                        default: //@@@: default:
                            break; //@@@: break;
                    } //@@@: }
                } //@@@: }
            } //@@@: }
        }; //@@@: }

        const pEvalGroupFunctions = function(formula) { //@@@: private void pEvalGroupFunctions(cReportFormula formula)
            let fint = null; //@@@: cReportFormulaInt fint = null;

            for(var _i = 0; _i < formula.getFormulasInt().count(); _i++) { //@@@: for (int _i = 0; _i < formula.getFormulasInt().count(); _i++)
                fint = formula.getFormulasInt().item(_i); //@@@: fint = formula.getFormulasInt().item(_i);

                switch (fint.getFormulaType()) //@@@: switch (fint.getFormulaType())
                { //@@@: {
                    case csRptFormulaType.CSRPTF_GROUP_TOTAL: //@@@: case csRptFormulaType.CSRPTF_GROUP_TOTAL:
                        evalGroupTotal(fint); //@@@: evalGroupTotal(fint);

                        break; //@@@: break;
                    case csRptFormulaType.CSRPTF_GROUP_MAX: //@@@: case csRptFormulaType.CSRPTF_GROUP_MAX:
                        evalGroupMax(fint); //@@@: evalGroupMax(fint);

                        break; //@@@: break;
                    case csRptFormulaType.CSRPTF_GROUP_MIN: //@@@: case csRptFormulaType.CSRPTF_GROUP_MIN:
                        evalGroupMin(fint); //@@@: evalGroupMin(fint);

                        break; //@@@: break;
                    case csRptFormulaType.CSRPTF_GROUP_AVERAGE: //@@@: case csRptFormulaType.CSRPTF_GROUP_AVERAGE:
                        evalGroupAverage(fint); //@@@: evalGroupAverage(fint);

                        break; //@@@: break;
                    case csRptFormulaType.CSRPTF_GROUP_PERCENT: //@@@: case csRptFormulaType.CSRPTF_GROUP_PERCENT:
                        evalGroupPercent(fint); //@@@: evalGroupPercent(fint);

                        break; //@@@: break;
                    case csRptFormulaType.CSRPTF_GROUP_COUNT: //@@@: case csRptFormulaType.CSRPTF_GROUP_COUNT:
                        evalGroupCount(fint); //@@@: evalGroupCount(fint);

                        break; //@@@: break;
                    case csRptFormulaType.CSRPTF_GROUP_LINE_NUMBER: //@@@: case csRptFormulaType.CSRPTF_GROUP_LINE_NUMBER:
                        evalGroupLineNumber(fint); //@@@: evalGroupLineNumber(fint);

                        break; //@@@: break;
                } //@@@: }
            } //@@@: }
        }; //@@@: }

        self.resultFunction = function(formula) { //@@@: public object resultFunction(cReportFormula formula)
            let code = ""; //@@@: String code = "";
            let vResult = null; //@@@: object[] vResult = null;

            m_objGlobals.setMode(eReportCompilerMode.C_RESULT); //@@@: m_objGlobals.setMode(eReportCompilerMode.C_RESULT);
            m_ctrlName = formula.getControlName(); //@@@: m_ctrlName = formula.getControlName();

            vResult = new object[formula.getFormulasInt().count()]; //@@@: vResult = new object[formula.getFormulasInt().count()];

            let fint = null; //@@@: cReportFormulaInt fint = null;

            for(var _i = 0; _i < formula.getFormulasInt().count(); _i++) { //@@@: for (int _i = 0; _i < formula.getFormulasInt().count(); _i++)
                fint = formula.getFormulasInt().item(_i); //@@@: fint = formula.getFormulasInt().item(_i);
                vResult[_i] = pResultFunctionInt(fint); //@@@: vResult[_i] = pResultFunctionInt(fint);
            } //@@@: }

            // we check if the code has scripting or is only 
            // calls to internal functions
            //
            code = formula.getTextC().Replace(C_KEYFUNCINT, ""); //@@@: code = formula.getTextC().Replace(C_KEYFUNCINT, "");
            code = code.Replace(" ", ""); //@@@: code = code.Replace(" ", "");

            // if after removing calls to internal functions and spaces
            // there is only a number we don't have scripting
            //
            if (G.isNumeric(code)) { //@@@: if (G.isNumeric(code))
                if (vResult.Length > 0) { //@@@: if (vResult.Length > 0)
                    formula.setLastResult(vResult[0]); //@@@: formula.setLastResult(vResult[0]);
                    formula.setHaveToEval(false); //@@@: formula.setHaveToEval(false);
                    return formula.getLastResult(); //@@@: return formula.getLastResult();
                } //@@@: }
                // the function can be only a constant (it is used in Cairo navigation)
                //
                else { //@@@: else
                    return code; //@@@: return code;
                } //@@@: }
            } //@@@: }
            else { //@@@: else
                code = formula.getTextC(); //@@@: code = formula.getTextC();
                let parameters = ""; //@@@: var parameters = "";

                for(var i = 0; i < vResult.Length; i++) { //@@@: for (int i = 0; i < vResult.Length; i++)
                    // if one argument is null it means we don't have a row for this formula
                    // so we don't need to compile the code
                    //
                    if (vResult[i] === null)  { //@@@: if (vResult[i] == null)
                        return null;  //@@@: return null;
                    } //@@@: }

                    /* TODO: remove me //@@@: /* TODO: remove me
                    code = code.Replace(C_KEYFUNCINT + cReportGlobals.format(i + 1, "000"), 
                                            getNumericVal(vResult[i].ToString()));
                     * */

                    let parameter = "p__" + i + "__"; //@@@: var parameter = "p__" + i + "__";
                    parameters += parameter + ","; //@@@: parameters += parameter + ",";
                    code = code.Replace(C_KEYFUNCINT + cReportGlobals.format(i + 1, "000"), parameter); //@@@: code = code.Replace(C_KEYFUNCINT + cReportGlobals.format(i + 1, "000"), parameter);

                    let paramValue = m_objGlobals.getVar(parameter); //@@@: var paramValue = m_objGlobals.getVar(parameter);
                    if (paramValue === null) { //@@@: if (paramValue == null) {
                        paramValue = m_objGlobals.addVar(parameter); //@@@: paramValue = m_objGlobals.addVar(parameter);
                    } //@@@: }
                    paramValue.setValue(vResult[i]); //@@@: paramValue.setValue(vResult[i]);
                } //@@@: }

                if (parameters.Length > 0) { //@@@: if (parameters.Length > 0)
                    parameters = parameters.Substring(0, parameters.Length - 1); //@@@: parameters = parameters.Substring(0, parameters.Length - 1);
                    code = insertParametersIntoFunction(code, parameters); //@@@: code = insertParametersIntoFunction(code, parameters);
                } //@@@: }

                formula.setLastResult(pExecScriptCode(code, formula)); //@@@: formula.setLastResult(pExecScriptCode(code, formula));
                formula.setHaveToEval(false); //@@@: formula.setHaveToEval(false);
                return formula.getLastResult(); //@@@: return formula.getLastResult();
            } //@@@: }
        }; //@@@: }

        const insertParametersIntoFunction = function(code, parameters) { //@@@: private string insertParametersIntoFunction(string code, string parameters)
            let n = code.IndexOf("(") + 1; //@@@: int n = code.IndexOf("(") + 1;
            let code = code.Substring(0, n) + parameters + code.Substring(n); //@@@: return code = code.Substring(0, n) + parameters + code.Substring(n);
        }; //@@@: }

        const pEvalFunctionGroup = function(fint) { //@@@: private void pEvalFunctionGroup(cReportFormulaInt fint)
            let value = 0; //@@@: double value = 0;
            let total = 0; //@@@: double total = 0;

            if (fint.getVariables().count() > 0) { //@@@: if (fint.getVariables().count() > 0)
                if (fint.getParameters().item(cReportGlobals.C_KEYINDEXCOL2) === null) { //@@@: if (fint.getParameters().item(cReportGlobals.C_KEYINDEXCOL2) == null)
                    value = 0; //@@@: value = 0;
                } //@@@: }
                else { //@@@: else
                    let columnIndex = int.Parse(fint.getParameters().item(cReportGlobals.C_KEYINDEXCOL2).getValue()); //@@@: int columnIndex = int.Parse(fint.getParameters().item(cReportGlobals.C_KEYINDEXCOL2).getValue());
                    value = cUtil.val(m_report.getValueFromRs(columnIndex).ToString()); //@@@: value = cUtil.val(m_report.getValueFromRs(columnIndex).ToString());
                } //@@@: }

                let variable = fint.getVariables().item(C_GROUPPERCENTT); //@@@: cReportVariable variable = fint.getVariables().item(C_GROUPPERCENTT);
                total = cUtil.val(variable.getValue().ToString()); //@@@: total = cUtil.val(variable.getValue().ToString());
                value = cUtil.divideByZero(value, total); //@@@: value = cUtil.divideByZero(value, total);
                variable.setValue(value); //@@@: variable.setValue(value);

            } //@@@: }

        }; //@@@: }

        self.evalFunctionGroup = function(formula) { //@@@: public void evalFunctionGroup(cReportFormula formula)
            let fint = null; //@@@: cReportFormulaInt fint = null;

            for(var _i = 0; _i < formula.getFormulasInt().count(); _i++) { //@@@: for (int _i = 0; _i < formula.getFormulasInt().count(); _i++)
                fint = formula.getFormulasInt().item(_i); //@@@: fint = formula.getFormulasInt().item(_i);
                pEvalFunctionGroup(fint); //@@@: pEvalFunctionGroup(fint);
            } //@@@: }
        }; //@@@: }

        self.evalFunction = function(formula) { //@@@: public void evalFunction(cReportFormula formula)
            let codeC = ""; //@@@: String codeC = "";

            m_objGlobals.setMode(eReportCompilerMode.C_EVAL); //@@@: m_objGlobals.setMode(eReportCompilerMode.C_EVAL);

            pEvalGroupFunctions(formula); //@@@: pEvalGroupFunctions(formula);

            cReportError.gDebugSection = formula.getSectionName(); //@@@: cReportError.gDebugSection = formula.getSectionName();
            cReportError.gDebugSectionLine = formula.getSectionLineIndex(); //@@@: cReportError.gDebugSectionLine = formula.getSectionLineIndex();
            cReportError.gDebugControl = formula.getControlName(); //@@@: cReportError.gDebugControl = formula.getControlName();

            m_formula = formula; //@@@: m_formula = formula;

            pCompile(formula.getText(), false, codeC); //@@@: pCompile(formula.getText(), false, codeC);

            if (formula.getFormulasInt().count() > 0) { //@@@: if (formula.getFormulasInt().count() > 0)
                if (G.isNumeric(codeC)) { //@@@: if (G.isNumeric(codeC))
                    pEvalSyntax("", codeC, false, formula); //@@@: pEvalSyntax("", codeC, false, formula);
                } //@@@: }
                else { //@@@: else
                    if (cUtil.subString(codeC.Trim(), 0, 8).ToLower() === "function") { //@@@: if (cUtil.subString(codeC.Trim(), 0, 8).ToLower() == "function")
                        pEvalSyntax("", codeC, false, formula); //@@@: pEvalSyntax("", codeC, false, formula);
                    } //@@@: }
                } //@@@: }
            } //@@@: }
            else { //@@@: else
                pEvalSyntax("", codeC, false, formula); //@@@: pEvalSyntax("", codeC, false, formula);
            } //@@@: }
            m_formula = null; //@@@: m_formula = null;
        }; //@@@: }

        const pCompile = function(code, bCompile, codeC) { //@@@: private bool pCompile(String code, bool bCompile, String codeC)
            m_bCompile = bCompile; //@@@: m_bCompile = bCompile;
            m_idxFormula = -1; //@@@: m_idxFormula = -1;

            code = pColonToPipe(code); //@@@: code = pColonToPipe(code);

            return pCompileAux(code, codeC); //@@@: return pCompileAux(code, out codeC);
        }; //@@@: }

        const pColonToPipe = function(code) { //@@@: private String pColonToPipe(String code)
            return code.Replace(",", "|"); //@@@: return code.Replace(",", "|");
        }; //@@@: }

        const pPipeToColon = function(code) { //@@@: private String pPipeToColon(String code)
            return code.Replace("|", ","); //@@@: return code.Replace("|", ",");
        }; //@@@: }

        const pIsFunction = function(word) { //@@@: private bool pIsFunction(String word)
            let f = null; //@@@: cReportFormulaType f = null;

            for(var _i = 0; _i < m_formulaTypes.count(); _i++) { //@@@: for (int _i = 0; _i < m_formulaTypes.count(); _i++)
                f = m_formulaTypes.item(_i); //@@@: f = m_formulaTypes.item(_i);
                if (word.ToLower() === f.getName().ToLower()) { //@@@: if (word.ToLower() == f.getName().ToLower())
                    return true; //@@@: return true;
                } //@@@: }
            } //@@@: }
            return false; //@@@: return false;
        }; //@@@: }

        const pAddFormulaInt = function(functionName, code) { //@@@: private object pAddFormulaInt(String functionName, String code)
            // the firs thing we need to do is add this internal formula 
            // to the internal formula collection of this formula
            //
            m_fint = m_formula.getFormulasInt().add(); //@@@: m_fint = m_formula.getFormulasInt().add();
            return pEvalSyntax(functionName, code, true, null); //@@@: return pEvalSyntax(functionName, code, true, null);
        }; //@@@: }

        const pEvalFunctionInt = function(fint) { //@@@: private void pEvalFunctionInt(cReportFormulaInt fint)
            switch (fint.getFormulaType()) //@@@: switch (fint.getFormulaType())
            { //@@@: {
                case csRptFormulaType.CSRPTF_AVERAGE: //@@@: case csRptFormulaType.CSRPTF_AVERAGE:
                    evalAverage(fint); //@@@: evalAverage(fint);
                    break; //@@@: break;

                case csRptFormulaType.CSRPTF_SUM: //@@@: case csRptFormulaType.CSRPTF_SUM:
                    evalSum(fint); //@@@: evalSum(fint);
                    break; //@@@: break;

                case csRptFormulaType.CSRPTF_SUM_TIME: //@@@: case csRptFormulaType.CSRPTF_SUM_TIME:
                    evalSumTime(fint); //@@@: evalSumTime(fint);
                    break; //@@@: break;

                case csRptFormulaType.CSRPTF_MAX: //@@@: case csRptFormulaType.CSRPTF_MAX:
                    evalMax(fint); //@@@: evalMax(fint);
                    break; //@@@: break;

                case csRptFormulaType.CSRPTF_MIN: //@@@: case csRptFormulaType.CSRPTF_MIN:
                    evalMin(fint); //@@@: evalMin(fint);
                    break; //@@@: break;

                case csRptFormulaType.CSRPTF_COUNT: //@@@: case csRptFormulaType.CSRPTF_COUNT:
                    evalCount(fint); //@@@: evalCount(fint);
                    break; //@@@: break;

                case csRptFormulaType.CSRPTF_NUMBER_TO_STRING: //@@@: case csRptFormulaType.CSRPTF_NUMBER_TO_STRING:
                    evalNumberToString(fint); //@@@: evalNumberToString(fint);
                    break; //@@@: break;

                case csRptFormulaType.CSRPTF_IS_EQUAL: //@@@: case csRptFormulaType.CSRPTF_IS_EQUAL:
                    evalIsEqual(fint); //@@@: evalIsEqual(fint);
                    break; //@@@: break;

                case csRptFormulaType.CSRPTF_IS_NOT_EQUAL: //@@@: case csRptFormulaType.CSRPTF_IS_NOT_EQUAL:
                    evalIsNotEqual(fint); //@@@: evalIsNotEqual(fint);
                    break; //@@@: break;

                case csRptFormulaType.CSRPTF_IS_GREATER_THAN: //@@@: case csRptFormulaType.CSRPTF_IS_GREATER_THAN:
                    evalIsGreaterThan(fint); //@@@: evalIsGreaterThan(fint);
                    break; //@@@: break;

                case csRptFormulaType.CSRPTF_IS_LESS_THAN: //@@@: case csRptFormulaType.CSRPTF_IS_LESS_THAN:
                    evalIsLessThan(fint); //@@@: evalIsLessThan(fint);
                    break; //@@@: break;

                case csRptFormulaType.CSRPTF_CALCULO: //@@@: case csRptFormulaType.CSRPTF_CALCULO:
                    // nothing to do
                    break; //@@@: break;

                case csRptFormulaType.CSRPTF_DECLARE_VAR: //@@@: case csRptFormulaType.CSRPTF_DECLARE_VAR:
                    evalDeclareVar(fint); //@@@: evalDeclareVar(fint);
                    break; //@@@: break;

                case csRptFormulaType.CSRPTF_GET_VAR: //@@@: case csRptFormulaType.CSRPTF_GET_VAR:
                    // nothing to do
                    break; //@@@: break;

                case csRptFormulaType.CSRPTF_GET_PARAM: //@@@: case csRptFormulaType.CSRPTF_GET_PARAM:
                    // nothing to do
                    break; //@@@: break;

                case csRptFormulaType.CSRPTF_SET_VAR: //@@@: case csRptFormulaType.CSRPTF_SET_VAR:
                    evalSetVar(fint); //@@@: evalSetVar(fint);
                    break; //@@@: break;

                case csRptFormulaType.CSRPTF_GET_BARCODE: //@@@: case csRptFormulaType.CSRPTF_GET_BARCODE:
                    evalGetBarcode(fint); //@@@: evalGetBarcode(fint);
                    break; //@@@: break;

                case csRptFormulaType.CSRPTF_ADD_TO_VAR: //@@@: case csRptFormulaType.CSRPTF_ADD_TO_VAR:
                    evalAddToVar(fint); //@@@: evalAddToVar(fint);
                    break; //@@@: break;

                case csRptFormulaType.CSRPTF_GET_DATA_FROM_RS_AD: //@@@: case csRptFormulaType.CSRPTF_GET_DATA_FROM_RS_AD:
                    evalGetDataFromRsAd(fint); //@@@: evalGetDataFromRsAd(fint);
                    break; //@@@: break;

                case csRptFormulaType.CSRPTF_GET_DATA_FROM_RS: //@@@: case csRptFormulaType.CSRPTF_GET_DATA_FROM_RS:
                    evalGetDataFromRs(fint); //@@@: evalGetDataFromRs(fint);
                    break; //@@@: break;

                case csRptFormulaType.CSRPTF_IS_IN_RS: //@@@: case csRptFormulaType.CSRPTF_IS_IN_RS:
                    evalIsInRs(fint); //@@@: evalIsInRs(fint);
                    break; //@@@: break;
            } //@@@: }
        }; //@@@: }

        const pResultFunctionInt = function(fint) { //@@@: private object pResultFunctionInt(cReportFormulaInt fint)
            switch (fint.getFormulaType()) //@@@: switch (fint.getFormulaType())
            { //@@@: {
                case csRptFormulaType.CSRPTF_AVERAGE: //@@@: case csRptFormulaType.CSRPTF_AVERAGE:
                    return resultAverage(fint); //@@@: return resultAverage(fint);

                case csRptFormulaType.CSRPTF_SUM: //@@@: case csRptFormulaType.CSRPTF_SUM:
                    return resultSum(fint); //@@@: return resultSum(fint);

                case csRptFormulaType.CSRPTF_GET_STRING: //@@@: case csRptFormulaType.CSRPTF_GET_STRING:
                    return resultGetString(fint); //@@@: return resultGetString(fint);

                case csRptFormulaType.CSRPTF_SUM_TIME: //@@@: case csRptFormulaType.CSRPTF_SUM_TIME:
                    return resultSumTime(fint); //@@@: return resultSumTime(fint);

                case csRptFormulaType.CSRPTF_MAX: //@@@: case csRptFormulaType.CSRPTF_MAX:
                    return resultMax(fint); //@@@: return resultMax(fint);

                case csRptFormulaType.CSRPTF_MIN: //@@@: case csRptFormulaType.CSRPTF_MIN:
                    return resultMin(fint); //@@@: return resultMin(fint);

                case csRptFormulaType.CSRPTF_COUNT: //@@@: case csRptFormulaType.CSRPTF_COUNT:
                    return resultCount(fint); //@@@: return resultCount(fint);

                case csRptFormulaType.CSRPTF_NUMBER_TO_STRING: //@@@: case csRptFormulaType.CSRPTF_NUMBER_TO_STRING:
                    return resultNumberToString(fint); //@@@: return resultNumberToString(fint);

                case csRptFormulaType.CSRPTF_IS_EQUAL: //@@@: case csRptFormulaType.CSRPTF_IS_EQUAL:
                    return resultIsEqual(fint); //@@@: return resultIsEqual(fint);

                case csRptFormulaType.CSRPTF_IS_NOT_EQUAL: //@@@: case csRptFormulaType.CSRPTF_IS_NOT_EQUAL:
                    return resultIsNotEqual(fint); //@@@: return resultIsNotEqual(fint);

                case csRptFormulaType.CSRPTF_IS_GREATER_THAN: //@@@: case csRptFormulaType.CSRPTF_IS_GREATER_THAN:
                    return resultIsGreaterThan(fint); //@@@: return resultIsGreaterThan(fint);

                case csRptFormulaType.CSRPTF_IS_LESS_THAN: //@@@: case csRptFormulaType.CSRPTF_IS_LESS_THAN:
                    return resultIsLessThan(fint); //@@@: return resultIsLessThan(fint);

                case csRptFormulaType.CSRPTF_PAGE_NUMBER: //@@@: case csRptFormulaType.CSRPTF_PAGE_NUMBER:
                    return resultPageNumber(); //@@@: return resultPageNumber();

                case csRptFormulaType.CSRPTF_TOTAL_PAGES: //@@@: case csRptFormulaType.CSRPTF_TOTAL_PAGES:
                    return resultTotalPages(); //@@@: return resultTotalPages();

                case csRptFormulaType.CSRPTF_VAL: //@@@: case csRptFormulaType.CSRPTF_VAL:
                    return resultValue(fint); //@@@: return resultValue(fint);

                case csRptFormulaType.CSRPTF_LENGTH: //@@@: case csRptFormulaType.CSRPTF_LENGTH:
                    return resultLength(fint); //@@@: return resultLength(fint);

                case csRptFormulaType.CSRPTF_TEXT_REPLACE: //@@@: case csRptFormulaType.CSRPTF_TEXT_REPLACE:
                    return resultTextReplace(fint); //@@@: return resultTextReplace(fint);

                case csRptFormulaType.CSRPTF_CALCULO: //@@@: case csRptFormulaType.CSRPTF_CALCULO:
                    return resultCalculo(fint); //@@@: return resultCalculo(fint);

                case csRptFormulaType.CSRPTF_DECLARE_VAR: //@@@: case csRptFormulaType.CSRPTF_DECLARE_VAR:
                    // nothing to do
                    break; //@@@: break;

                case csRptFormulaType.CSRPTF_GET_VAR: //@@@: case csRptFormulaType.CSRPTF_GET_VAR:
                    return resultGetVar(fint); //@@@: return resultGetVar(fint);

                case csRptFormulaType.CSRPTF_GET_PARAM: //@@@: case csRptFormulaType.CSRPTF_GET_PARAM:
                    return resultGetParam(fint); //@@@: return resultGetParam(fint);

                case csRptFormulaType.CSRPTF_SET_VAR: //@@@: case csRptFormulaType.CSRPTF_SET_VAR:
                    // nothing to do
                    break; //@@@: break;

                case csRptFormulaType.CSRPTF_ADD_TO_VAR: //@@@: case csRptFormulaType.CSRPTF_ADD_TO_VAR:
                    // nothing to do
                    break; //@@@: break;

                case csRptFormulaType.CSRPTF_GET_DATA_FROM_RS_AD: //@@@: case csRptFormulaType.CSRPTF_GET_DATA_FROM_RS_AD:
                    return resultGetDataFromRsAd(fint); //@@@: return resultGetDataFromRsAd(fint);

                case csRptFormulaType.CSRPTF_GET_DATA_FROM_RS: //@@@: case csRptFormulaType.CSRPTF_GET_DATA_FROM_RS:
                    return resultGetDataFromRs(fint); //@@@: return resultGetDataFromRs(fint);

                case csRptFormulaType.CSRPTF_GROUP_TOTAL: //@@@: case csRptFormulaType.CSRPTF_GROUP_TOTAL:
                    return resultGroupTotal(fint); //@@@: return resultGroupTotal(fint);

                case csRptFormulaType.CSRPTF_GROUP_MAX: //@@@: case csRptFormulaType.CSRPTF_GROUP_MAX:
                    return resultGroupMax(fint); //@@@: return resultGroupMax(fint);

                case csRptFormulaType.CSRPTF_GROUP_MIN: //@@@: case csRptFormulaType.CSRPTF_GROUP_MIN:
                    return resultGroupMin(fint); //@@@: return resultGroupMin(fint);

                case csRptFormulaType.CSRPTF_GROUP_AVERAGE: //@@@: case csRptFormulaType.CSRPTF_GROUP_AVERAGE:
                    return resultGroupAverage(fint); //@@@: return resultGroupAverage(fint);

                case csRptFormulaType.CSRPTF_GROUP_PERCENT: //@@@: case csRptFormulaType.CSRPTF_GROUP_PERCENT:
                    return resultGroupPercent(fint); //@@@: return resultGroupPercent(fint);

                case csRptFormulaType.CSRPTF_GROUP_COUNT: //@@@: case csRptFormulaType.CSRPTF_GROUP_COUNT:
                    return resultGroupCount(fint); //@@@: return resultGroupCount(fint);

                case csRptFormulaType.CSRPTF_GROUP_LINE_NUMBER: //@@@: case csRptFormulaType.CSRPTF_GROUP_LINE_NUMBER:
                    return resultGroupLineNumber(fint); //@@@: return resultGroupLineNumber(fint);

                case csRptFormulaType.CSRPTF_IS_IN_RS: //@@@: case csRptFormulaType.CSRPTF_IS_IN_RS:
                    return resultIsInRs(fint); //@@@: return resultIsInRs(fint);

                case csRptFormulaType.CSRPTF_GET_BARCODE: //@@@: case csRptFormulaType.CSRPTF_GET_BARCODE:
                    return resultGetBarcode(fint); //@@@: return resultGetBarcode(fint);
            } //@@@: }
            return null; //@@@: return null;
        }; //@@@: }

        const pEvalSyntax = function(functionName, code, bParam, formula) { //@@@: private object pEvalSyntax(String functionName, String code, bool bParam, cReportFormula formula)
            let i = 0; //@@@: int i = 0;
            let s = ""; //@@@: String s = "";

            code = removeReturns(code); //@@@: code = removeReturns(code);

            if (functionName.Length > 0) { //@@@: if (functionName.Length > 0)
                return pCheckInternalFunction(functionName, code); //@@@: return pCheckInternalFunction(functionName, code);
            } //@@@: }
            else if (code.Length === 0) { //@@@: else if (code.Length == 0)
                return ""; //@@@: return "";
            } //@@@: }
            else if (code === "\"\"") { //@@@: else if (code == "\"\"")
                return ""; //@@@: return "";
            } //@@@: }
            else if (G.isNumeric(code)) { //@@@: else if (G.isNumeric(code))
                return code; //@@@: return code;
            } //@@@: }
            else if (cReportGlobals.isDate(code)) { //@@@: else if (cReportGlobals.isDate(code))
                return code; //@@@: return code;
            } //@@@: }
            else if (pIsTime(code)) { //@@@: else if (pIsTime(code))
                return code; //@@@: return code;
            } //@@@: }
            else if (!bParam) { //@@@: else if (!bParam)
                pExecScriptCode(code, formula); //@@@: pExecScriptCode(code, formula);
                return code; //@@@: return code;
            } //@@@: }
            else { //@@@: else

                let vParams = null; //@@@: String[] vParams = null;
                let parameters = ""; //@@@: String parameters = "";

                parameters = code.Trim(); //@@@: parameters = code.Trim();
                if (parameters.Length > 2) { //@@@: if (parameters.Length > 2)
                    parameters = parameters.Substring(2, parameters.Length - 2); //@@@: parameters = parameters.Substring(2, parameters.Length - 2);
                    parameters = parameters.Trim(); //@@@: parameters = parameters.Trim();
                    vParams = parameters.Split('|'); //@@@: vParams = parameters.Split('|');
                } //@@@: }

                try { //@@@: try
                    for (i = 0; i < vParams.Length; i++) { //@@@: for (i = 0; i < vParams.Length; i++)
                        try { //@@@: try
                            // if it is a number we don't need to evaluate it
                            //
                            if (!G.isNumeric(vParams[i])) { //@@@: if (!G.isNumeric(vParams[i]))

                                if (!pIsControl(vParams[i])) { //@@@: if (!pIsControl(vParams[i]))
                                    // Si se produce un error es por que se trata
                                    // de un parametro a la funcion, la asignacion
                                    // no se llevara a cabo, y no perdere el valor
                                    // del parametro
                                    s = C_TEMPFUNCTIONB + vParams[i] + C_TEMPFUNCTIONE; //@@@: s = C_TEMPFUNCTIONB + vParams[i] + C_TEMPFUNCTIONE;
                                    vParams[i] = pExecScriptCode(s, formula).ToString(); //@@@: vParams[i] = pExecScriptCode(s, formula).ToString();
                                } //@@@: }
                            } //@@@: }
                            code = vParams[i] + "|"; //@@@: code = vParams[i] + "|";
                        } //@@@: }
                        catch (ex) { //@@@: catch
                            // we don't care about errors here
                        } //@@@: }
                    } //@@@: }

                    code = cUtil.removeLastColon(code); //@@@: code = cUtil.removeLastColon(code);
                    return code; //@@@: return code;
                } //@@@: }
                catch(ex) { //@@@: catch
                    // we don't care about errors here
                } //@@@: }
            } //@@@: }
            return null; //@@@: return null;
        }; //@@@: }

        const pIsTime = function(code) { //@@@: private bool pIsTime(String code)
            let vTime = null; //@@@: String[] vTime = null;

            code = code.Trim(); //@@@: code = code.Trim();
            if (code.IndexOf(":", 0) === 0)  { //@@@: if (code.IndexOf(":", 0) == 0)
                return false;  //@@@: return false;
            } //@@@: }

            vTime = code.Split(':'); //@@@: vTime = code.Split(':');
            if (vTime.Length !== 1)  { //@@@: if (vTime.Length != 1)
                return false;  //@@@: return false;
            } //@@@: }

            if (!(G.isNumeric(vTime[0]) && G.isNumeric(vTime[1])))  { //@@@: if (!(G.isNumeric(vTime[0]) && G.isNumeric(vTime[1])))
                return false;  //@@@: return false;
            } //@@@: }
            return true; //@@@: return true;
        }; //@@@: }

        const pCheckSyntax = function(code) { //@@@: private void pCheckSyntax(String code)
            pCompile(code, true, ""); //@@@: pCompile(code, true, "");
        }; //@@@: }

        const pExecScriptCode = function(code, formula) { //@@@: private object pExecScriptCode(String code, cReportFormula formula)
            try { //@@@: try
                code = pPipeToColon(code); //@@@: code = pPipeToColon(code);
                if (formula.getCompiledScript() === null) { //@@@: if (formula.getCompiledScript() == null)
                    formula.setCompiledScript(cReportScriptEngine.compileCode(code, formula)); //@@@: formula.setCompiledScript(cReportScriptEngine.compileCode(code, formula));
                } //@@@: }
                return cReportScriptEngine.eval(formula.getCompiledScript(), m_objGlobals); //@@@: return cReportScriptEngine.eval(formula.getCompiledScript(), m_objGlobals);
            } //@@@: }
            catch (ex) { //@@@: catch (Exception ex)
                let msg = ex.Source; //@@@: String msg = ex.Source
                            + ex.Message + "\n\nCode:\n=====\n\n" + code + "\n\n" //@@@: + ex.Message + "\n\nCode:\n=====\n\n" + code + "\n\n"
                            + ex.HelpLink; //@@@: + ex.HelpLink;
                throw new ReportException(csRptErrors.ERROR_IN_SCRIPT, C_MODULE, msg); //@@@: throw new ReportException(csRptErrors.ERROR_IN_SCRIPT, C_MODULE, msg);
            } //@@@: }
        }; //@@@: }

        const pIsControl = function(param) { //@@@: private bool pIsControl(String param)
            let ctrl = null; //@@@: cReportControl ctrl = null;
            for(var _i = 0; _i < m_report.getControls().count(); _i++) { //@@@: for (int _i = 0; _i < m_report.getControls().count(); _i++)
                ctrl = m_report.getControls().item(_i); //@@@: ctrl = m_report.getControls().item(_i);
                if (ctrl.getName().ToUpper() === param.ToUpper()) { //@@@: if (ctrl.getName().ToUpper() == param.ToUpper())
                    return true; //@@@: return true;
                } //@@@: }
            } //@@@: }
            return false; //@@@: return false;
        }; //@@@: }

        const pGetControl = function(param) { //@@@: private cReportControl pGetControl(String param)
            let ctrl = null; //@@@: cReportControl ctrl = null;
            for(var _i = 0; _i < m_report.getControls().count(); _i++) { //@@@: for (int _i = 0; _i < m_report.getControls().count(); _i++)
                ctrl = m_report.getControls().item(_i); //@@@: ctrl = m_report.getControls().item(_i);
                if (ctrl.getName().ToUpper() === param.ToUpper()) { //@@@: if (ctrl.getName().ToUpper() == param.ToUpper())
                    return ctrl; //@@@: return ctrl;
                } //@@@: }
            } //@@@: }
            return null; //@@@: return null;
        }; //@@@: }

        const pGetSubName = function(code) { //@@@: private String pGetSubName(String code)
            let pos = 0; //@@@: int pos = 0;
            let i = 0; //@@@: int i = 0;
            let c = ""; //@@@: String c = "";

            pos = code.IndexOf(" ", 0) + 1; //@@@: pos = code.IndexOf(" ", 0) + 1;
            i = pos; //@@@: i = pos;
            while (i < code.Length) { //@@@: while (i < code.Length)
                c = code.Substring(i, 1); //@@@: c = code.Substring(i, 1);
                if (pIsSeparator(c)) { //@@@: if (pIsSeparator(c))
                    break; //@@@: break;
                } //@@@: }
                i++; //@@@: i++;
            } //@@@: }
            return code.Substring(pos, i - pos); //@@@: return code.Substring(pos, i - pos);
        }; //@@@: }

        const pGetParameter = function(parameters, paramIndex, funName) { //@@@: private String pGetParameter(String parameters, int paramIndex, String funName)
            let param = ""; //@@@: String param = "";
            let vParam = null; //@@@: String[] vParam = null;

            vParam = parameters.Split('|'); //@@@: vParam = parameters.Split('|');

            if (paramIndex > vParam.Length + 1) { //@@@: if (paramIndex > vParam.Length + 1)
                throw new ReportArgumentMissingException( //@@@: throw new ReportArgumentMissingException(
                    C_MODULE, //@@@: C_MODULE,
                    cReportError.errGetDescript( //@@@: cReportError.errGetDescript(
                                    csRptErrors.CSRPTERRMISSINGPARAM, //@@@: csRptErrors.CSRPTERRMISSINGPARAM,
                                    paramIndex.ToString(), //@@@: paramIndex.ToString(),
                                    funName)); //@@@: funName));
            } //@@@: }
            else { //@@@: else
                param = vParam[paramIndex]; //@@@: param = vParam[paramIndex];
            } //@@@: }

            return param.Replace(")", "").Trim(); //@@@: return param.Replace(")", "").Trim();
        }; //@@@: }

        const pCheckInternalFunction = function(functionName, code) { //@@@: private object pCheckInternalFunction(String functionName, String code)
            let name = ""; //@@@: String name = "";
            let parameters = ""; //@@@: String parameters = "";
            let idFunction = 0; //@@@: csRptFormulaType idFunction = 0;

            let r = 0; //@@@: int r = 0;
            let q = 0; //@@@: int q = 0;
            let tc = ""; //@@@: String tc = "";

            name = functionName; //@@@: name = functionName;
            parameters = code.Trim(); //@@@: parameters = code.Trim();
            if (parameters.Length > 2) { //@@@: if (parameters.Length > 2)
                parameters = parameters.Substring(1, parameters.Length - 2); //@@@: parameters = parameters.Substring(1, parameters.Length - 2);
            } //@@@: }

            // we need to replace in m_formula.getTextC() the function name by its key
            // 
            tc = m_formula.getTextC(); //@@@: tc = m_formula.getTextC();
            q = name.Length; //@@@: q = name.Length;
            r = tc.ToLower().IndexOf(name.ToLower(), 0); //@@@: r = tc.ToLower().IndexOf(name.ToLower(), 0);
            q = tc.ToLower().IndexOf(")".ToLower(), r) + 1; //@@@: q = tc.ToLower().IndexOf(")".ToLower(), r) + 1;

            m_formula.setTextC((tc.Substring(0, r)).ToString() //@@@: m_formula.setTextC((tc.Substring(0, r)).ToString()
                                + C_KEYFUNCINT //@@@: + C_KEYFUNCINT
                                + cReportGlobals.format(m_formula.getFormulasInt().count(), "000") //@@@: + cReportGlobals.format(m_formula.getFormulasInt().count(), "000")
                                + tc.Substring(q)); //@@@: + tc.Substring(q));

            idFunction = pGetIdFunction(name); //@@@: idFunction = pGetIdFunction(name);
            m_fint.setFormulaType(idFunction); //@@@: m_fint.setFormulaType(idFunction);

            switch (idFunction) //@@@: switch (idFunction)
            { //@@@: {

                case csRptFormulaType.CSRPTF_PAGE_NUMBER: //@@@: case csRptFormulaType.CSRPTF_PAGE_NUMBER:

                    // in compiling time we need to return a value which is consistent
                    // with the return type of the internal function
                    //
                    if (m_report === null) { //@@@: if (m_report == null)
                        return 0; //@@@: return 0;
                    } //@@@: }
                    else { //@@@: else
                        return m_report.getCurrenPage(); //@@@: return m_report.getCurrenPage();
                    } //@@@: }

                case csRptFormulaType.CSRPTF_TEXT_REPLACE: //@@@: case csRptFormulaType.CSRPTF_TEXT_REPLACE:
                    // in compiling time we need to return a value which is consistent
                    // with the return type of the internal function
                    //
                    return ""; //@@@: return "";

                case csRptFormulaType.CSRPTF_TOTAL_PAGES: //@@@: case csRptFormulaType.CSRPTF_TOTAL_PAGES:
                    return m_report.getTotalPages(); //@@@: return m_report.getTotalPages();

                // all this functions have the same amount of parameters
                //
                case csRptFormulaType.CSRPTF_AVERAGE: //@@@: case csRptFormulaType.CSRPTF_AVERAGE:
                case csRptFormulaType.CSRPTF_SUM: //@@@: case csRptFormulaType.CSRPTF_SUM:
                case csRptFormulaType.CSRPTF_MAX: //@@@: case csRptFormulaType.CSRPTF_MAX:
                case csRptFormulaType.CSRPTF_MIN: //@@@: case csRptFormulaType.CSRPTF_MIN:
                case csRptFormulaType.CSRPTF_LENGTH: //@@@: case csRptFormulaType.CSRPTF_LENGTH:
                case csRptFormulaType.CSRPTF_VAL: //@@@: case csRptFormulaType.CSRPTF_VAL:
                    // in this evaluation we load the parameters of the function
                    //
                    pCheckParameters(1, parameters, name); //@@@: pCheckParameters(1, parameters, name);
                    // in compiling time we need to return a value which is consistent
                    // with the return type of the internal function
                    //
                    return 0; //@@@: return 0;

                case csRptFormulaType.CSRPTF_GROUP_TOTAL: //@@@: case csRptFormulaType.CSRPTF_GROUP_TOTAL:
                case csRptFormulaType.CSRPTF_GROUP_MAX: //@@@: case csRptFormulaType.CSRPTF_GROUP_MAX:
                case csRptFormulaType.CSRPTF_GROUP_MIN: //@@@: case csRptFormulaType.CSRPTF_GROUP_MIN:
                case csRptFormulaType.CSRPTF_GROUP_AVERAGE: //@@@: case csRptFormulaType.CSRPTF_GROUP_AVERAGE:
                    // in this evaluation we load the parameters of the function
                    //
                    pCheckParameters(2, parameters, name); //@@@: pCheckParameters(2, parameters, name);
                    // in compiling time we need to return a value which is consistent
                    // with the return type of the internal function
                    //
                    return 0; //@@@: return 0;

                // all this functions have the same amount of parameters
                //
                case csRptFormulaType.CSRPTF_GROUP_COUNT: //@@@: case csRptFormulaType.CSRPTF_GROUP_COUNT:
                case csRptFormulaType.CSRPTF_GROUP_PERCENT: //@@@: case csRptFormulaType.CSRPTF_GROUP_PERCENT:
                    // in this evaluation we load the parameters of the function
                    //
                    pCheckParameters(3, parameters, name); //@@@: pCheckParameters(3, parameters, name);
                    // in compiling time we need to return a value which is consistent
                    // with the return type of the internal function
                    //
                    return 0; //@@@: return 0;

                case csRptFormulaType.CSRPTF_GET_STRING: //@@@: case csRptFormulaType.CSRPTF_GET_STRING:
                    // in this evaluation we load the parameters of the function
                    //
                    pCheckParameters(1, parameters, name); //@@@: pCheckParameters(1, parameters, name);
                    // in compiling time we need to return a value which is consistent
                    // with the return type of the internal function
                    //
                    return "\"\""; //@@@: return "\"\"";

                case csRptFormulaType.CSRPTF_SUM_TIME: //@@@: case csRptFormulaType.CSRPTF_SUM_TIME:
                    // in this evaluation we load the parameters of the function
                    //
                    pCheckParameters(2, parameters, name); //@@@: pCheckParameters(2, parameters, name);
                    // in compiling time we need to return a value which is consistent
                    // with the return type of the internal function
                    //
                    return 0; //@@@: return 0;

                case csRptFormulaType.CSRPTF_COUNT: //@@@: case csRptFormulaType.CSRPTF_COUNT:
                    // in compiling time we need to return a value which is consistent
                    // with the return type of the internal function
                    //
                    return 0; //@@@: return 0;

                case csRptFormulaType.CSRPTF_NUMBER_TO_STRING: //@@@: case csRptFormulaType.CSRPTF_NUMBER_TO_STRING:
                    // in this evaluation we load the parameters of the function
                    //
                    pCheckParameters(2, parameters, name); //@@@: pCheckParameters(2, parameters, name);
                    // in compiling time we need to return a value which is consistent
                    // with the return type of the internal function
                    //
                    return "\"\""; //@@@: return "\"\"";

                // all this functions have the same amount of parameters
                //
                case csRptFormulaType.CSRPTF_IS_EQUAL: //@@@: case csRptFormulaType.CSRPTF_IS_EQUAL:
                case csRptFormulaType.CSRPTF_IS_NOT_EQUAL: //@@@: case csRptFormulaType.CSRPTF_IS_NOT_EQUAL:
                case csRptFormulaType.CSRPTF_IS_GREATER_THAN: //@@@: case csRptFormulaType.CSRPTF_IS_GREATER_THAN:
                case csRptFormulaType.CSRPTF_IS_LESS_THAN: //@@@: case csRptFormulaType.CSRPTF_IS_LESS_THAN:
                case csRptFormulaType.CSRPTF_IS_IN_RS: //@@@: case csRptFormulaType.CSRPTF_IS_IN_RS:
                    // in this evaluation we load the parameters of the function
                    //
                    pCheckParameters(2, parameters, name); //@@@: pCheckParameters(2, parameters, name);
                    // in compiling time we need to return a value which is consistent
                    // with the return type of the internal function
                    //
                    return 0; //@@@: return 0;

                // all this functions have the same amount of parameters
                //
                case csRptFormulaType.CSRPTF_CALCULO: //@@@: case csRptFormulaType.CSRPTF_CALCULO:
                case csRptFormulaType.CSRPTF_GET_DATA_FROM_RS_AD: //@@@: case csRptFormulaType.CSRPTF_GET_DATA_FROM_RS_AD:
                case csRptFormulaType.CSRPTF_GET_DATA_FROM_RS: //@@@: case csRptFormulaType.CSRPTF_GET_DATA_FROM_RS:
                    // in this evaluation we load the parameters of the function
                    //
                    pCheckParameters(4, parameters, name); //@@@: pCheckParameters(4, parameters, name);
                    // in compiling time we need to return a value which is consistent
                    // with the return type of the internal function
                    //
                    return 0; //@@@: return 0;

                // all this functions have the same amount of parameters
                //
                case csRptFormulaType.CSRPTF_DECLARE_VAR: //@@@: case csRptFormulaType.CSRPTF_DECLARE_VAR:
                case csRptFormulaType.CSRPTF_GET_VAR: //@@@: case csRptFormulaType.CSRPTF_GET_VAR:
                    // in this evaluation we load the parameters of the function
                    //
                    pCheckParameters(1, parameters, name); //@@@: pCheckParameters(1, parameters, name);
                    // in compiling time we need to return a value which is consistent
                    // with the return type of the internal function
                    //
                    return 0; //@@@: return 0;

                case csRptFormulaType.CSRPTF_GET_PARAM: //@@@: case csRptFormulaType.CSRPTF_GET_PARAM:
                    // in this evaluation we load the parameters of the function
                    //
                    pCheckParameters(1, parameters, name); //@@@: pCheckParameters(1, parameters, name);
                    // in compiling time we need to return a value which is consistent
                    // with the return type of the internal function
                    //
                    return 0; //@@@: return 0;

                // all this functions have the same amount of parameters
                //
                case csRptFormulaType.CSRPTF_ADD_TO_VAR: //@@@: case csRptFormulaType.CSRPTF_ADD_TO_VAR:
                case csRptFormulaType.CSRPTF_SET_VAR: //@@@: case csRptFormulaType.CSRPTF_SET_VAR:
                    // in this evaluation we load the parameters of the function
                    //
                    pCheckParameters(2, parameters, name); //@@@: pCheckParameters(2, parameters, name);
                    // in compiling time we need to return a value which is consistent
                    // with the return type of the internal function
                    //
                    return 0; //@@@: return 0;

                case csRptFormulaType.CSRPTF_GET_BARCODE: //@@@: case csRptFormulaType.CSRPTF_GET_BARCODE:
                    // in this evaluation we load the parameters of the function
                    //
                    pCheckParameters(1, parameters, name); //@@@: pCheckParameters(1, parameters, name);
                    // in compiling time we need to return a value which is consistent
                    // with the return type of the internal function
                    //
                    return "\"\""; //@@@: return "\"\"";

                default: //@@@: default:
                    throw new ReportNotDefinedFunctionException( //@@@: throw new ReportNotDefinedFunctionException(
                        C_MODULE, //@@@: C_MODULE,
                        cReportError.errGetDescript(csRptErrors.CSRPTERRINDEFINEDFUNCTION,name)); //@@@: cReportError.errGetDescript(csRptErrors.CSRPTERRINDEFINEDFUNCTION,name));
            } //@@@: }
        }; //@@@: }

        const resultGetString = function(fint) { //@@@: private String resultGetString(cReportFormulaInt fint)
            let param = ""; //@@@: String param = "";

            param = fint.getParameters().item(0).getValue(); //@@@: param = fint.getParameters().item(0).getValue();

            if (param === "\"\"") { //@@@: if (param == "\"\"")
                return param; //@@@: return param;
            } //@@@: }
            else { //@@@: else
                if (pIsControl(param)) { //@@@: if (pIsControl(param))
                    return "\"" + m_report.getValueString(param).Replace("\"", "\"\"") + "\""; //@@@: return "\"" + m_report.getValueString(param).Replace("\"", "\"\"") + "\"";
                } //@@@: }
                else { //@@@: else
                    return "\"" + param.Replace("\"", "\"\"") + "\""; //@@@: return "\"" + param.Replace("\"", "\"\"") + "\"";
                } //@@@: }
            } //@@@: }
        }; //@@@: }

        const resultSumTime = function(fint) { //@@@: private String resultSumTime(cReportFormulaInt fint)
            if (fint.getVariables().count() === 0)  { //@@@: if (fint.getVariables().count() == 0)
                return "";  //@@@: return "";
            } //@@@: }
            let st = null; //@@@: cStructTime st = null;
            st = fint.getVariables().item(C_SUM_TIME).getValue(); //@@@: st = (cStructTime)fint.getVariables().item(C_SUM_TIME).getValue();
            if (cUtil.val(fint.getParameters().item(1).getValue()) !== 0) { //@@@: if (cUtil.val(fint.getParameters().item(1).getValue()) != 0)
                return cReportGlobals.format(st.getHour(), "00") //@@@: return cReportGlobals.format(st.getHour(), "00")
                        + ":" + cReportGlobals.format(st.getMinute(), "00") //@@@: + ":" + cReportGlobals.format(st.getMinute(), "00")
                        + ":" + cReportGlobals.format(st.getSecond(), "00"); //@@@: + ":" + cReportGlobals.format(st.getSecond(), "00");
            } //@@@: }
            else { //@@@: else
                return cReportGlobals.format(st.getHour(), "00") + ":" + cReportGlobals.format(st.getMinute(), "00"); //@@@: return cReportGlobals.format(st.getHour(), "00") + ":" + cReportGlobals.format(st.getMinute(), "00");
            } //@@@: }
        }; //@@@: }

        const resultSum = function(fint) { //@@@: private double resultSum(cReportFormulaInt fint)
            if (fint.getVariables().count() === 0) { return 0; } //@@@: if (fint.getVariables().count() == 0) { return 0; }
            return Convert.ToDouble(fint.getVariables().item(C_SUM).getValue()); //@@@: return Convert.ToDouble(fint.getVariables().item(C_SUM).getValue());
        }; //@@@: }

        const resultGetDataFromRsAd = function(fint) { //@@@: private object resultGetDataFromRsAd(cReportFormulaInt fint)
            return null; //@@@: return null;
        }; //@@@: }

        const resultGetDataFromRs = function(fint) { //@@@: private object resultGetDataFromRs(cReportFormulaInt fint)
            return null; //@@@: return null;
        }; //@@@: }

        const resultGetVar = function(fint) { //@@@: private object resultGetVar(cReportFormulaInt fint)
            let varName = ""; //@@@: String varName = "";
            varName = fint.getParameters().item(0).getValue(); //@@@: varName = fint.getParameters().item(0).getValue();

            if (m_variables.item(varName) === null) { //@@@: if (m_variables.item(varName) == null)
                throw new ReportArgumentMissingException( //@@@: throw new ReportArgumentMissingException(
                    C_MODULE, //@@@: C_MODULE,
                    cReportError.errGetDescript( //@@@: cReportError.errGetDescript(
                                    csRptErrors.CSRPTERRMISSINGPARAM, //@@@: csRptErrors.CSRPTERRMISSINGPARAM,
                                    varName, //@@@: varName,
                                    "_getVar()")); //@@@: "_getVar()"));
            } //@@@: }
            return m_variables.item(varName).getValue(); //@@@: return m_variables.item(varName).getValue();
        }; //@@@: }

        const resultGetParam = function(fint) { //@@@: private object resultGetParam(cReportFormulaInt fint)
            let param = null; //@@@: cParameter param = null;
            let paramName = ""; //@@@: String paramName = "";

            paramName = fint.getParameters().item(0).getValue(); //@@@: paramName = fint.getParameters().item(0).getValue();

            for(var _i = 0; _i < m_report.getConnect().getParameters().count(); _i++) { //@@@: for (int _i = 0; _i < m_report.getConnect().getParameters().count(); _i++)
                param = m_report.getConnect().getParameters().item(_i); //@@@: param = m_report.getConnect().getParameters().item(_i);
                if (param.getName().ToLower() === paramName.ToLower()) { //@@@: if (param.getName().ToLower() == paramName.ToLower())
                    break; //@@@: break;
                } //@@@: }
            } //@@@: }

            if (param === null) { //@@@: if (param == null)
                throw new ReportArgumentMissingException( //@@@: throw new ReportArgumentMissingException(
                    C_MODULE, //@@@: C_MODULE,
                    cReportError.errGetDescript( //@@@: cReportError.errGetDescript(
                                    csRptErrors.CSRPTERRMISSINGPARAM, //@@@: csRptErrors.CSRPTERRMISSINGPARAM,
                                    paramName, //@@@: paramName,
                                    "_getParameter()")); //@@@: "_getParameter()"));
            } //@@@: }

            return param.getValue(); //@@@: return param.getValue();
        }; //@@@: }

        const resultMax = function(fint) { //@@@: private double resultMax(cReportFormulaInt fint)
            if (fint.getVariables().count() === 0) { return 0; } //@@@: if (fint.getVariables().count() == 0) { return 0; }
            return fint.getVariables().item(C_MAX).getValue(); //@@@: return (double)fint.getVariables().item(C_MAX).getValue();
        }; //@@@: }

        const resultMin = function(fint) { //@@@: private double resultMin(cReportFormulaInt fint)
            if (fint.getVariables().count() === 0) { return 0; } //@@@: if (fint.getVariables().count() == 0) { return 0; }
            return fint.getVariables().item(C_MIN).getValue(); //@@@: return (double)fint.getVariables().item(C_MIN).getValue();
        }; //@@@: }

        const resultCount = function(fint) { //@@@: private object resultCount(cReportFormulaInt fint)
            if (fint.getVariables().count() === 0) { return null; } //@@@: if (fint.getVariables().count() == 0) { return null; }
            return fint.getVariables().item(C_COUNT).getValue(); //@@@: return fint.getVariables().item(C_COUNT).getValue();
        }; //@@@: }

        const resultNumberToString = function(fint) { //@@@: private object resultNumberToString(cReportFormulaInt fint)
            if (fint.getVariables().count() > 0) { //@@@: if (fint.getVariables().count() > 0)
                return fint.getVariables().item(C_NUMBER_TO_STRING).getValue(); //@@@: return fint.getVariables().item(C_NUMBER_TO_STRING).getValue();
            } //@@@: }
            else { //@@@: else
                return ""; //@@@: return "";
            } //@@@: }
        }; //@@@: }

        const resultGetBarcode = function(fint) { //@@@: private object resultGetBarcode(cReportFormulaInt fint)
            if (fint.getVariables().count() > 0) { //@@@: if (fint.getVariables().count() > 0)
                return fint.getVariables().item(C_GET_BARCODE).getValue(); //@@@: return fint.getVariables().item(C_GET_BARCODE).getValue();
            } //@@@: }
            else { //@@@: else
                return ""; //@@@: return "";
            } //@@@: }
        }; //@@@: }

        const resultIsEqual = function(fint) { //@@@: private object resultIsEqual(cReportFormulaInt fint)
            if (fint.getVariables().count() > 0) { //@@@: if (fint.getVariables().count() > 0)
                return fint.getVariables().item(C_ISEQUAL).getValue(); //@@@: return fint.getVariables().item(C_ISEQUAL).getValue();
            } //@@@: }
            else { //@@@: else
                return 0; //@@@: return 0;
            } //@@@: }
        }; //@@@: }

        const resultIsNotEqual = function(fint) { //@@@: private object resultIsNotEqual(cReportFormulaInt fint)
            if (fint.getVariables().count() > 0) { //@@@: if (fint.getVariables().count() > 0)
                return fint.getVariables().item(C_ISNOTEQUAL).getValue(); //@@@: return fint.getVariables().item(C_ISNOTEQUAL).getValue();
            } //@@@: }
            else { //@@@: else
                return 0; //@@@: return 0;
            } //@@@: }
        }; //@@@: }

        const resultIsGreaterThan = function(fint) { //@@@: private object resultIsGreaterThan(cReportFormulaInt fint)
            if (fint.getVariables().count() > 0) { //@@@: if (fint.getVariables().count() > 0)
                return fint.getVariables().item(C_ISGREATERTHAN).getValue(); //@@@: return fint.getVariables().item(C_ISGREATERTHAN).getValue();
            } //@@@: }
            else { //@@@: else
                return 0; //@@@: return 0;
            } //@@@: }
        }; //@@@: }

        const resultIsLessThan = function(fint) { //@@@: private object resultIsLessThan(cReportFormulaInt fint)
            if (fint.getVariables().count() > 0) { //@@@: if (fint.getVariables().count() > 0)
                return fint.getVariables().item(C_ISLESSTHAN).getValue(); //@@@: return fint.getVariables().item(C_ISLESSTHAN).getValue();
            } //@@@: }
            else { //@@@: else
                return 0; //@@@: return 0;
            } //@@@: }
        }; //@@@: }

        const resultAverage = function(fint) { //@@@: private double resultAverage(cReportFormulaInt fint)
            if (fint.getVariables().count() === 0)  { //@@@: if (fint.getVariables().count() == 0)
                return 0;  //@@@: return 0;
            } //@@@: }
            let sum = fint.getVariables().item(C_AVERAGE_SUM).getValue(); //@@@: double sum = (double)fint.getVariables().item(C_AVERAGE_SUM).getValue();
            let count = fint.getVariables().item(C_AVERAGE_COUNT).getValue(); //@@@: double count = (double)fint.getVariables().item(C_AVERAGE_COUNT).getValue();
            return sum / count; //@@@: return sum / count;
        }; //@@@: }

        const resultCalculo = function(fint) { //@@@: private double resultCalculo(cReportFormulaInt fint)
            let control = ""; //@@@: String control = "";
            let value1 = 0; //@@@: double value1 = 0;
            let value2 = 0; //@@@: double value2 = 0;
            let oper = 0; //@@@: int oper = 0;

            control = fint.getParameters().item(1).getValue(); //@@@: control = fint.getParameters().item(1).getValue();

            value1 = Convert.ToDouble(m_report.getValue(fint.getParameters().item(0).getValue(), true)); //@@@: value1 = Convert.ToDouble(m_report.getValue(fint.getParameters().item(0).getValue(), true));

            if (control !== "\"\"") { //@@@: if (control != "\"\"")
                value2 = Convert.ToDouble(m_report.getValue(control, true)); //@@@: value2 = Convert.ToDouble(m_report.getValue(control, true));
            } //@@@: }
            else { //@@@: else
                value2 = double.Parse(fint.getParameters().item(2).getValue()); //@@@: value2 = double.Parse(fint.getParameters().item(2).getValue());
            } //@@@: }

            oper = int.Parse(fint.getParameters().item(3).getValue()); //@@@: oper = int.Parse(fint.getParameters().item(3).getValue());

            switch (oper) //@@@: switch (oper)
            { //@@@: {
                // addition
                case 1: //@@@: case 1:
                    return value1 + value2; //@@@: return value1 + value2;

                // substraction
                case 2: //@@@: case 2:
                    return value1 - value2; //@@@: return value1 - value2;

                // multiplication
                case 3: //@@@: case 3:
                    return value1 * value2; //@@@: return value1 * value2;

                // division
                case 4: //@@@: case 4:
                    return cUtil.divideByZero(value1, value2); //@@@: return cUtil.divideByZero(value1, value2);

                // power
                case 5: //@@@: case 5:
                    return Math.Pow(value1, (value2)); //@@@: return Math.Pow(value1, ((int)value2));

                default: //@@@: default:
                    return 0;                     //@@@: return 0;
            } //@@@: }
        }; //@@@: }

        const resultLength = function(fint) { //@@@: private int resultLength(cReportFormulaInt fint)
            return m_report.getValueString(fint.getParameters().item(0).getValue()).Length; //@@@: return m_report.getValueString(fint.getParameters().item(0).getValue()).Length;
        }; //@@@: }

        const resultTextReplace = function(fint) { //@@@: private String resultTextReplace(cReportFormulaInt fint)
            let i = 0; //@@@: int i = 0;
            let ctrl = null; //@@@: cReportControl ctrl = null;
            let text = ""; //@@@: String text = "";
            let collCtrlsToReplace = null; //@@@: List<String> collCtrlsToReplace = null;

            ctrl = pGetControl(m_ctrlName); //@@@: ctrl = pGetControl(m_ctrlName);
            if (ctrl === null) { //@@@: if (ctrl == null)
                return ""; //@@@: return "";
            } //@@@: }

            text = ctrl.getLabel().getText(); //@@@: text = ctrl.getLabel().getText();

            try { //@@@: try
                collCtrlsToReplace = m_collTextReplace[m_ctrlName]; //@@@: collCtrlsToReplace = m_collTextReplace[m_ctrlName];
            } //@@@: }
            catch(ex) { //@@@: catch
                let lenText = 0; //@@@: int lenText = 0;
                let pos = 0; //@@@: int pos = 0;
                let endpos = 0; //@@@: int endpos = 0;

                collCtrlsToReplace = new List(); //@@@: collCtrlsToReplace = new List<String>();

                lenText = text.Length; //@@@: lenText = text.Length;
                while (i < lenText) { //@@@: while (i < lenText)
                    pos = text.IndexOf(C_MACRO_CTRL, i + 1); //@@@: pos = text.IndexOf(C_MACRO_CTRL, i + 1);
                    if (pos > 0) { //@@@: if (pos > 0)
                        endpos = text.IndexOf(C_MACRO_CTRL, pos + 1); //@@@: endpos = text.IndexOf(C_MACRO_CTRL, pos + 1);

                        if (endpos > 0) { //@@@: if (endpos > 0)
                            collCtrlsToReplace.Add(text.Substring(pos + 2, endpos - pos - 2)); //@@@: collCtrlsToReplace.Add(text.Substring(pos + 2, endpos - pos - 2));
                        } //@@@: }
                        i = endpos + 1; //@@@: i = endpos + 1;
                    } //@@@: }
                    else { //@@@: else
                        i = lenText + 1; //@@@: i = lenText + 1;
                    } //@@@: }
                } //@@@: }

                m_collTextReplace.Add(m_ctrlName, collCtrlsToReplace); //@@@: m_collTextReplace.Add(m_ctrlName, collCtrlsToReplace);
            } //@@@: }

            let ctrlValue = null; //@@@: cReportControl ctrlValue = null;
            for (i = 0; i < collCtrlsToReplace.Count; i++) { //@@@: for (i = 0; i < collCtrlsToReplace.Count; i++)
                ctrlValue = pGetControl(collCtrlsToReplace[i]); //@@@: ctrlValue = pGetControl(collCtrlsToReplace[i]);
                if (ctrlValue !== null) { //@@@: if (ctrlValue != null)
                    text = text.Replace(C_MACRO_CTRL + collCtrlsToReplace[i] + C_MACRO_CTRL, //@@@: text = text.Replace(C_MACRO_CTRL + collCtrlsToReplace[i] + C_MACRO_CTRL,
                                        m_report.getValue(ctrlValue.getName(), false).ToString()); //@@@: m_report.getValue(ctrlValue.getName(), false).ToString());
                } //@@@: }
            } //@@@: }
            return text; //@@@: return text;
        }; //@@@: }

        const resultValue = function(fint) { //@@@: private object resultValue(cReportFormulaInt fint)
            return m_report.getValue(fint.getParameters().item(0).getValue(), true); //@@@: return m_report.getValue(fint.getParameters().item(0).getValue(), true);
        }; //@@@: }

        const resultPageNumber = function() { //@@@: private int resultPageNumber()
            return m_report.getCurrenPage(); //@@@: return m_report.getCurrenPage();
        }; //@@@: }

        const resultTotalPages = function() { //@@@: private object resultTotalPages()
            return m_report.getTotalPages(); //@@@: return m_report.getTotalPages();
        }; //@@@: }

        const resultGroupTotal = function(fint) { //@@@: private object resultGroupTotal(cReportFormulaInt fint)
            if (fint.getVariables().count() > 0) { //@@@: if (fint.getVariables().count() > 0)
                return fint.getVariables().item(C_GROUPTOTAL).getValue(); //@@@: return fint.getVariables().item(C_GROUPTOTAL).getValue();
            } //@@@: }
            else { //@@@: else
                return 0; //@@@: return 0;
            } //@@@: }
        }; //@@@: }

        const resultGroupMax = function(fint) { //@@@: private object resultGroupMax(cReportFormulaInt fint)
            if (fint.getVariables().count() > 0) { //@@@: if (fint.getVariables().count() > 0)
                return fint.getVariables().item(C_GROUPMAX).getValue(); //@@@: return fint.getVariables().item(C_GROUPMAX).getValue();
            } //@@@: }
            else { //@@@: else
                return 0; //@@@: return 0;
            } //@@@: }
        }; //@@@: }

        const resultGroupMin = function(fint) { //@@@: private object resultGroupMin(cReportFormulaInt fint)
            if (fint.getVariables().count() > 0) { //@@@: if (fint.getVariables().count() > 0)
                return fint.getVariables().item(C_GROUPMIN).getValue(); //@@@: return fint.getVariables().item(C_GROUPMIN).getValue();
            } //@@@: }
            else { //@@@: else
                return 0; //@@@: return 0;
            } //@@@: }
        }; //@@@: }

        const resultGroupAverage = function(fint) { //@@@: private object resultGroupAverage(cReportFormulaInt fint)
            if (fint.getVariables().count() > 0) { //@@@: if (fint.getVariables().count() > 0)
                return fint.getVariables().item(C_GROUPAVERAGE).getValue(); //@@@: return fint.getVariables().item(C_GROUPAVERAGE).getValue();
            } //@@@: }
            else { //@@@: else
                return 0; //@@@: return 0;
            } //@@@: }
        }; //@@@: }

        const resultGroupPercent = function(fint) { //@@@: private object resultGroupPercent(cReportFormulaInt fint)
            if (fint.getVariables().count() > 0) { //@@@: if (fint.getVariables().count() > 0)
                return fint.getVariables().item(C_GROUPPERCENT).getValue(); //@@@: return fint.getVariables().item(C_GROUPPERCENT).getValue();
            } //@@@: }
            else { //@@@: else
                return 0; //@@@: return 0;
            } //@@@: }
        }; //@@@: }

        const resultGroupCount = function(fint) { //@@@: private object resultGroupCount(cReportFormulaInt fint)
            if (fint.getVariables().count() > 0) { //@@@: if (fint.getVariables().count() > 0)
                return fint.getVariables().item(C_GROUPCOUNT).getValue(); //@@@: return fint.getVariables().item(C_GROUPCOUNT).getValue();
            } //@@@: }
            else { //@@@: else
                return 0; //@@@: return 0;
            } //@@@: }
        }; //@@@: }

        const resultGroupLineNumber = function(fint) { //@@@: private object resultGroupLineNumber(cReportFormulaInt fint)
            if (fint.getVariables().count() > 0) { //@@@: if (fint.getVariables().count() > 0)
                return fint.getVariables().item(C_GROUPLINENUMBER).getValue(); //@@@: return fint.getVariables().item(C_GROUPLINENUMBER).getValue();
            } //@@@: }
            else { //@@@: else
                return 0; //@@@: return 0;
            } //@@@: }
        }; //@@@: }

        const resultIsInRs = function(fint) { //@@@: private object resultIsInRs(cReportFormulaInt fint)
            if (fint.getVariables().count() > 0) { //@@@: if (fint.getVariables().count() > 0)
                return fint.getVariables().item(C_ISINRS).getValue(); //@@@: return fint.getVariables().item(C_ISINRS).getValue();
            } //@@@: }
            else { //@@@: else
                return 0; //@@@: return 0;
            } //@@@: }
        }; //@@@: }

        const evalAverage = function(fint) { //@@@: private void evalAverage(cReportFormulaInt fint)
            if (fint.getVariables().item(C_AVERAGE_SUM) === null) { //@@@: if (fint.getVariables().item(C_AVERAGE_SUM) == null)
                fint.getVariables().add(null, C_AVERAGE_SUM); //@@@: fint.getVariables().add(null, C_AVERAGE_SUM);
                fint.getVariables().add(null, C_AVERAGE_COUNT); //@@@: fint.getVariables().add(null, C_AVERAGE_COUNT);
            } //@@@: }

            let item = fint.getVariables().item(C_AVERAGE_SUM); //@@@: cReportVariable item = fint.getVariables().item(C_AVERAGE_SUM);
            // the average function is for numbers
            //
            item.setValue(item.getValue() //@@@: item.setValue((double)item.getValue()
                + pGetNumber(m_report.getValue(fint.getParameters().item(0).getValue(), true))); //@@@: + pGetNumber(m_report.getValue(fint.getParameters().item(0).getValue(), true)));

            item = fint.getVariables().item(C_AVERAGE_COUNT); //@@@: item = fint.getVariables().item(C_AVERAGE_COUNT);
            // the average function is for numbers
            //
            item.setValue(item.getValue() + 1); //@@@: item.setValue((double)item.getValue() + 1);
        }; //@@@: }

        const pGetNumber = function(number) { //@@@: private double pGetNumber(object number)
            let strNumber = number.ToString(); //@@@: String strNumber = number.ToString();
            let rtn = 0; //@@@: double rtn = 0;
            let sepDecimal = ""; //@@@: String sepDecimal = "";

            if (G.isNumeric(strNumber)) { //@@@: if (G.isNumeric(strNumber))
                sepDecimal = cUtil.getSepDecimal(); //@@@: sepDecimal = cUtil.getSepDecimal();
                if (sepDecimal !== ".") { //@@@: if (sepDecimal != ".")
                    strNumber = strNumber.Replace(".", sepDecimal); //@@@: strNumber = strNumber.Replace(".", sepDecimal);
                } //@@@: }
                rtn = cUtil.val(strNumber); //@@@: rtn = cUtil.val(strNumber);

            } //@@@: }

            return rtn; //@@@: return rtn;
        }; //@@@: }

        const evalSum = function(fint) { //@@@: private void evalSum(cReportFormulaInt fint)
            if (fint.getVariables().item(C_SUM) === null) { //@@@: if (fint.getVariables().item(C_SUM) == null)
                fint.getVariables().add(null, C_SUM).setValue(0); //@@@: fint.getVariables().add(null, C_SUM).setValue(0);
            } //@@@: }

            let item = fint.getVariables().item(C_SUM); //@@@: cReportVariable item = fint.getVariables().item(C_SUM);
            // the sum function is for numbers
            //
            item.setValue(Convert.ToDouble(item.getValue()) //@@@: item.setValue(Convert.ToDouble(item.getValue())
                + pGetNumber(m_report.getValue(fint.getParameters().item(0).getValue(), true))); //@@@: + pGetNumber(m_report.getValue(fint.getParameters().item(0).getValue(), true)));
        }; //@@@: }

        const evalDeclareVar = function(fint) { //@@@: private void evalDeclareVar(cReportFormulaInt fint)
            let varName = ""; //@@@: String varName = "";

            varName = fint.getParameters().item(0).getValue(); //@@@: varName = fint.getParameters().item(0).getValue();

            if (m_variables.item(varName) === null) { //@@@: if (m_variables.item(varName) == null)
                m_variables.add(null, varName); //@@@: m_variables.add(null, varName);
            } //@@@: }
        }; //@@@: }

        const evalSetVar = function(fint) { //@@@: private void evalSetVar(cReportFormulaInt fint)
            let varName = ""; //@@@: String varName = "";

            varName = fint.getParameters().item(0).getValue(); //@@@: varName = fint.getParameters().item(0).getValue();

            if (m_variables.item(varName) === null) { //@@@: if (m_variables.item(varName) == null)
                throw new ReportArgumentMissingException( //@@@: throw new ReportArgumentMissingException(
                    C_MODULE, //@@@: C_MODULE,
                    cReportError.errGetDescript( //@@@: cReportError.errGetDescript(
                                    csRptErrors.CSRPTERRMISSINGPARAM, //@@@: csRptErrors.CSRPTERRMISSINGPARAM,
                                    varName, //@@@: varName,
                                    "_setVar")); //@@@: "_setVar"));
            } //@@@: }

            let item = m_variables.item(varName); //@@@: cReportVariable item = m_variables.item(varName);
            item.setValue(fint.getParameters().item(1).getValue()); //@@@: item.setValue(fint.getParameters().item(1).getValue());
        }; //@@@: }

        const evalGetDataFromRsAd = function(fint) { //@@@: private void evalGetDataFromRsAd(cReportFormulaInt fint)

        }; //@@@: }

        const evalGetDataFromRs = function(fint) { //@@@: private void evalGetDataFromRs(cReportFormulaInt fint)

        }; //@@@: }

        const evalAddToVar = function(fint) { //@@@: private void evalAddToVar(cReportFormulaInt fint)
            let varName = ""; //@@@: String varName = "";

            varName = fint.getParameters().item(0).getValue(); //@@@: varName = fint.getParameters().item(0).getValue();

            if (m_variables.item(varName) === null) { //@@@: if (m_variables.item(varName) == null)
                throw new ReportArgumentMissingException( //@@@: throw new ReportArgumentMissingException(
                    C_MODULE, //@@@: C_MODULE,
                    cReportError.errGetDescript( //@@@: cReportError.errGetDescript(
                                    csRptErrors.CSRPTERRMISSINGPARAM, //@@@: csRptErrors.CSRPTERRMISSINGPARAM,
                                    varName, //@@@: varName,
                                    "_evalAddToVar")); //@@@: "_evalAddToVar"));
            } //@@@: }

            let item = m_variables.item(varName); //@@@: cReportVariable item = m_variables.item(varName);
            // the EvalAddToVar function is for numbers
            //
            item.setValue(item.getValue()  //@@@: item.setValue((double)item.getValue()
                                + pGetNumber(fint.getParameters().item(1).getValue())); //@@@: + pGetNumber(fint.getParameters().item(1).getValue()));
        }; //@@@: }

        const evalSumTime = function(fint) { //@@@: private void evalSumTime(cReportFormulaInt fint)
            if (fint.getVariables().item(C_SUM_TIME) === null) { //@@@: if (fint.getVariables().item(C_SUM_TIME) == null)
                fint.getVariables().add(null, C_SUM_TIME).setValue(new cStructTime()); //@@@: fint.getVariables().add(null, C_SUM_TIME).setValue(new cStructTime());
            } //@@@: }

            let item = fint.getVariables().item(C_SUM_TIME); //@@@: cReportVariable item = fint.getVariables().item(C_SUM_TIME);
            // the SumTime if for dates
            //
            pSumTimes(item.getValue(), //@@@: pSumTimes((cStructTime)item.getValue(),
                        DateTime.Parse(m_report.getValue(fint.getParameters().item(0).getValue(), true).ToString())); //@@@: DateTime.Parse(m_report.getValue(fint.getParameters().item(0).getValue(), true).ToString()));
        }; //@@@: }

        const evalMax = function(fint) { //@@@: private void evalMax(cReportFormulaInt fint)
            let value = null; //@@@: object value = null;

            if (fint.getVariables().item(C_MAX) === null) { //@@@: if (fint.getVariables().item(C_MAX) == null)
                fint.getVariables().add(null, C_MAX); //@@@: fint.getVariables().add(null, C_MAX);
            } //@@@: }

            let item = fint.getVariables().item(C_MAX); //@@@: cReportVariable item = fint.getVariables().item(C_MAX);
            // the Max function if for numbers and strings
            //
            value = m_report.getValue(fint.getParameters().item(0).getValue()); //@@@: value = m_report.getValue(fint.getParameters().item(0).getValue());

            if (value.GetType() === typeof(String)) { //@@@: if (value.GetType() == typeof(String))
                if (String.Compare(item.getValue().ToString(),  //@@@: if (String.Compare(item.getValue().ToString(),
                                    value.ToString(),  //@@@: value.ToString(),
                                    StringComparison.CurrentCulture) < 0) { //@@@: StringComparison.CurrentCulture) < 0)
                    item.setValue(value); //@@@: item.setValue(value);
                } //@@@: }
            } //@@@: }
            else { //@@@: else
                if (item.getValue() < value) { //@@@: if ((double)item.getValue() < (double)value)
                    item.setValue(value); //@@@: item.setValue(value);
                } //@@@: }
            } //@@@: }
        }; //@@@: }

        const evalMin = function(fint) { //@@@: private void evalMin(cReportFormulaInt fint)
            let value = null; //@@@: object value = null;

            if (fint.getVariables().item(C_MIN) === null) { //@@@: if (fint.getVariables().item(C_MIN) == null)
                fint.getVariables().add(null, C_MIN); //@@@: fint.getVariables().add(null, C_MIN);
            } //@@@: }

            let item = fint.getVariables().item(C_MIN); //@@@: cReportVariable item = fint.getVariables().item(C_MIN);
            // The Min function is for numbers and strings
            //
            value = m_report.getValue(fint.getParameters().item(0).getValue()); //@@@: value = m_report.getValue(fint.getParameters().item(0).getValue());

            if (value.GetType() === typeof(String)) { //@@@: if (value.GetType() == typeof(String))
                if (String.Compare(item.getValue().ToString(), //@@@: if (String.Compare(item.getValue().ToString(),
                                    value.ToString(), //@@@: value.ToString(),
                                    StringComparison.CurrentCulture) > 0) { //@@@: StringComparison.CurrentCulture) > 0)
                    item.setValue(value); //@@@: item.setValue(value);
                } //@@@: }
            } //@@@: }
            else { //@@@: else
                if (item.getValue() > value) { //@@@: if ((double)item.getValue() > (double)value)
                    item.setValue(value); //@@@: item.setValue(value);
                } //@@@: }
            } //@@@: }
        }; //@@@: }

        const evalCount = function(fint) { //@@@: private void evalCount(cReportFormulaInt fint)
            if (fint.getVariables().item(C_COUNT) === null) { //@@@: if (fint.getVariables().item(C_COUNT) == null)
                fint.getVariables().add(null, C_COUNT); //@@@: fint.getVariables().add(null, C_COUNT);
            } //@@@: }

            let item = fint.getVariables().item(C_COUNT); //@@@: cReportVariable item = fint.getVariables().item(C_COUNT);
            // the Count functio is for numbers
            //
            item.setValue(item.getValue() + 1); //@@@: item.setValue((double)item.getValue() + 1);
        }; //@@@: }

        const evalNumberToString = function(fint) { //@@@: private void evalNumberToString(cReportFormulaInt fint)
            if (fint.getVariables().item(C_NUMBER_TO_STRING) === null) { //@@@: if (fint.getVariables().item(C_NUMBER_TO_STRING) == null)
                fint.getVariables().add(null, C_NUMBER_TO_STRING); //@@@: fint.getVariables().add(null, C_NUMBER_TO_STRING);
            } //@@@: }

            let item = fint.getVariables().item(C_NUMBER_TO_STRING); //@@@: cReportVariable item = fint.getVariables().item(C_NUMBER_TO_STRING);
            // the NumberToString funciton is for numbres
            //
            let iNumber = 0; //@@@: double iNumber = 0;
            let iLenguage = 0; //@@@: int iLenguage = 0;

            iNumber = pGetNumber(m_report.getValue(fint.getParameters().item(0).getValue(), true)); //@@@: iNumber = pGetNumber(m_report.getValue(fint.getParameters().item(0).getValue(), true));
            iLenguage = cUtil.valAsInt(fint.getParameters().item(1).getValue()); //@@@: iLenguage = cUtil.valAsInt(fint.getParameters().item(1).getValue());

            let ntos = new cNumberToString(); //@@@: cNumberToString ntos = new cNumberToString();

            switch (iLenguage) //@@@: switch (iLenguage)
            { //@@@: {
                case C_SPANISH: //@@@: case C_SPANISH:
                    item.setValue(ntos.spanishNumberToString(iNumber)); //@@@: item.setValue(ntos.spanishNumberToString(iNumber));
                    break; //@@@: break;
                case C_ENGLISH: //@@@: case C_ENGLISH:
                    item.setValue(ntos.englishNumberToString(iNumber)); //@@@: item.setValue(ntos.englishNumberToString(iNumber));
                    break; //@@@: break;
                case C_FRENCH: //@@@: case C_FRENCH:
                    item.setValue(ntos.frenchNumberToString(iNumber)); //@@@: item.setValue(ntos.frenchNumberToString(iNumber));
                    break; //@@@: break;
            } //@@@: }
        }; //@@@: }

        const evalIsEqual = function(fint) { //@@@: private void evalIsEqual(cReportFormulaInt fint)
            if (fint.getVariables().item(C_ISEQUAL) === null) { //@@@: if (fint.getVariables().item(C_ISEQUAL) == null)
                fint.getVariables().add(null, C_ISEQUAL); //@@@: fint.getVariables().add(null, C_ISEQUAL);
            } //@@@: }

            let item = fint.getVariables().item(C_ISEQUAL); //@@@: cReportVariable item = fint.getVariables().item(C_ISEQUAL);
            // the IsEqual function is for numbers
            //
            let strValue = ""; //@@@: String strValue = "";
            let strConstValue = ""; //@@@: String strConstValue = "";

            strValue = m_report.getValue(fint.getParameters().item(0).getValue(), true).ToString(); //@@@: strValue = m_report.getValue(fint.getParameters().item(0).getValue(), true).ToString();
            strConstValue = fint.getParameters().item(1).getValue(); //@@@: strConstValue = fint.getParameters().item(1).getValue();

            item.setValue(strValue === strConstValue); //@@@: item.setValue(strValue == strConstValue);
        }; //@@@: }

        const evalIsNotEqual = function(fint) { //@@@: private void evalIsNotEqual(cReportFormulaInt fint)
            if (fint.getVariables().item(C_ISNOTEQUAL) === null) { //@@@: if (fint.getVariables().item(C_ISNOTEQUAL) == null)
                fint.getVariables().add(null, C_ISNOTEQUAL); //@@@: fint.getVariables().add(null, C_ISNOTEQUAL);
            } //@@@: }

            let item = fint.getVariables().item(C_ISNOTEQUAL); //@@@: cReportVariable item = fint.getVariables().item(C_ISNOTEQUAL);
            // the IsNotEqual function is for numbers
            //
            let strValue = ""; //@@@: String strValue = "";
            let strConstValue = ""; //@@@: String strConstValue = "";

            strValue = m_report.getValue(fint.getParameters().item(0).getValue(), true); //@@@: strValue = (String)m_report.getValue(fint.getParameters().item(0).getValue(), true);
            strConstValue = fint.getParameters().item(1).getValue(); //@@@: strConstValue = fint.getParameters().item(1).getValue();

            item.setValue(strValue !== strConstValue); //@@@: item.setValue(strValue != strConstValue);
        }; //@@@: }

        const evalIsGreaterThan = function(fint) { //@@@: private void evalIsGreaterThan(cReportFormulaInt fint)
            if (fint.getVariables().item(C_ISGREATERTHAN) === null) { //@@@: if (fint.getVariables().item(C_ISGREATERTHAN) == null)
                fint.getVariables().add(null, C_ISGREATERTHAN); //@@@: fint.getVariables().add(null, C_ISGREATERTHAN);
            } //@@@: }

            let item = fint.getVariables().item(C_ISGREATERTHAN); //@@@: cReportVariable item = fint.getVariables().item(C_ISGREATERTHAN);
            // the IsGreaterThan function is for numbers
            //
            let value = m_report.getValue(fint.getParameters().item(0).getValue(), true); //@@@: object value = m_report.getValue(fint.getParameters().item(0).getValue(), true);
            const constValue = fint.getParameters().item(1).getValue(); //@@@: object constValue = fint.getParameters().item(1).getValue();

            if (value.GetType() === typeof(String)) { //@@@: if (value.GetType() == typeof(String))
                let strValue = value.ToString(); //@@@: String strValue = value.ToString();
                const strConstValue = constValue.ToString(); //@@@: String strConstValue = constValue.ToString();

                if (String.Compare(strValue.ToString(), //@@@: if (String.Compare(strValue.ToString(),
                                    strConstValue.ToString(), //@@@: strConstValue.ToString(),
                                    StringComparison.CurrentCulture) > 0) { //@@@: StringComparison.CurrentCulture) > 0)
                    item.setValue(true); //@@@: item.setValue(true);
                } //@@@: }
                else { //@@@: else
                    item.setValue(false); //@@@: item.setValue(false);
                } //@@@: }
            } //@@@: }
            else { //@@@: else
                if (value > constValue) { //@@@: if ((double)value > (double)constValue)
                    item.setValue(true); //@@@: item.setValue(true);
                } //@@@: }
                else  { //@@@: else
                    item.setValue(false); //@@@: item.setValue(false);
                } //@@@: }
            } //@@@: }
        }; //@@@: }

        const evalIsLessThan = function(fint) { //@@@: private void evalIsLessThan(cReportFormulaInt fint)
            if (fint.getVariables().item(C_ISLESSTHAN) === null) { //@@@: if (fint.getVariables().item(C_ISLESSTHAN) == null)
                fint.getVariables().add(null, C_ISLESSTHAN); //@@@: fint.getVariables().add(null, C_ISLESSTHAN);
            } //@@@: }

            let item = fint.getVariables().item(C_ISLESSTHAN); //@@@: cReportVariable item = fint.getVariables().item(C_ISLESSTHAN);
            // the IsLessThan function is for numbers
            //
            let value = m_report.getValue(fint.getParameters().item(0).getValue(), true); //@@@: object value = m_report.getValue(fint.getParameters().item(0).getValue(), true);
            const constValue = fint.getParameters().item(1).getValue(); //@@@: object constValue = fint.getParameters().item(1).getValue();

            if (value.GetType() === typeof(String)) { //@@@: if (value.GetType() == typeof(String))
                let strValue = value.ToString(); //@@@: String strValue = value.ToString();
                const strConstValue = constValue.ToString(); //@@@: String strConstValue = constValue.ToString();

                if (String.Compare(strValue.ToString(), //@@@: if (String.Compare(strValue.ToString(),
                                    strConstValue.ToString(), //@@@: strConstValue.ToString(),
                                    StringComparison.CurrentCulture) < 0) { //@@@: StringComparison.CurrentCulture) < 0)
                    item.setValue(true); //@@@: item.setValue(true);
                } //@@@: }
                else { //@@@: else
                    item.setValue(false); //@@@: item.setValue(false);
                } //@@@: }
            } //@@@: }
            else { //@@@: else
                if (value < constValue) { //@@@: if ((double)value < (double)constValue)
                    item.setValue(true); //@@@: item.setValue(true);
                } //@@@: }
                else { //@@@: else
                    item.setValue(false); //@@@: item.setValue(false);
                } //@@@: }
            } //@@@: }
        }; //@@@: }

        const evalGroupTotal = function(fint) { //@@@: private void evalGroupTotal(cReportFormulaInt fint)
            if (fint.getVariables().item(C_GROUPTOTAL) === null) { //@@@: if (fint.getVariables().item(C_GROUPTOTAL) == null)
                fint.getVariables().add(null, C_GROUPTOTAL); //@@@: fint.getVariables().add(null, C_GROUPTOTAL);
            } //@@@: }

            let item = fint.getVariables().item(C_GROUPTOTAL); //@@@: cReportVariable item = fint.getVariables().item(C_GROUPTOTAL);
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
            if (fint.getParameters().item(cReportGlobals.C_KEYINDEXCOL) === null) { //@@@: if (fint.getParameters().item(cReportGlobals.C_KEYINDEXCOL) == null)
                item.setValue(0); //@@@: item.setValue(0);
            } //@@@: }
            else { //@@@: else
                item.setValue( //@@@: item.setValue(
                    m_report.getGroupTotal( //@@@: m_report.getGroupTotal(
                        int.Parse(fint.getParameters().item(cReportGlobals.C_KEYINDEXCOL).getValue()), //@@@: int.Parse(fint.getParameters().item(cReportGlobals.C_KEYINDEXCOL).getValue()),
                        int.Parse(fint.getParameters().item(cReportGlobals.C_KEYINDEXGROUP).getValue()))); //@@@: int.Parse(fint.getParameters().item(cReportGlobals.C_KEYINDEXGROUP).getValue())));
            } //@@@: }
        }; //@@@: }

        const evalGroupMax = function(fint) { //@@@: private void evalGroupMax(cReportFormulaInt fint)
            if (fint.getVariables().item(C_GROUPMAX) === null) { //@@@: if (fint.getVariables().item(C_GROUPMAX) == null)
                fint.getVariables().add(null, C_GROUPMAX); //@@@: fint.getVariables().add(null, C_GROUPMAX);
            } //@@@: }

            let item = fint.getVariables().item(C_GROUPMAX); //@@@: cReportVariable item = fint.getVariables().item(C_GROUPMAX);
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
            if (fint.getParameters().item(cReportGlobals.C_KEYINDEXCOL) === null) { //@@@: if (fint.getParameters().item(cReportGlobals.C_KEYINDEXCOL) == null)
                item.setValue(0); //@@@: item.setValue(0);
            } //@@@: }
            else { //@@@: else
                item.setValue( //@@@: item.setValue(
                    m_report.getGroupMax( //@@@: m_report.getGroupMax(
                                int.Parse(fint.getParameters().item(cReportGlobals.C_KEYINDEXCOL).getValue()), //@@@: int.Parse(fint.getParameters().item(cReportGlobals.C_KEYINDEXCOL).getValue()),
                                int.Parse(fint.getParameters().item(cReportGlobals.C_KEYINDEXGROUP).getValue()))); //@@@: int.Parse(fint.getParameters().item(cReportGlobals.C_KEYINDEXGROUP).getValue())));
            } //@@@: }
        }; //@@@: }

        const evalGroupMin = function(fint) { //@@@: private void evalGroupMin(cReportFormulaInt fint)
            if (fint.getVariables().item(C_GROUPMIN) === null) { //@@@: if (fint.getVariables().item(C_GROUPMIN) == null)
                fint.getVariables().add(null, C_GROUPMIN); //@@@: fint.getVariables().add(null, C_GROUPMIN);
            } //@@@: }

            let item = fint.getVariables().item(C_GROUPMIN); //@@@: cReportVariable item = fint.getVariables().item(C_GROUPMIN);
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
            if (fint.getParameters().item(cReportGlobals.C_KEYINDEXCOL) === null) { //@@@: if (fint.getParameters().item(cReportGlobals.C_KEYINDEXCOL) == null)
                item.setValue(0); //@@@: item.setValue(0);
            } //@@@: }
            else { //@@@: else
                item.setValue( //@@@: item.setValue(
                    m_report.getGroupMin( //@@@: m_report.getGroupMin(
                        int.Parse(fint.getParameters().item(cReportGlobals.C_KEYINDEXCOL).getValue()), //@@@: int.Parse(fint.getParameters().item(cReportGlobals.C_KEYINDEXCOL).getValue()),
                        int.Parse(fint.getParameters().item(cReportGlobals.C_KEYINDEXGROUP).getValue()))); //@@@: int.Parse(fint.getParameters().item(cReportGlobals.C_KEYINDEXGROUP).getValue())));
            } //@@@: }
        }; //@@@: }

        const evalGroupAverage = function(fint) { //@@@: private void evalGroupAverage(cReportFormulaInt fint)
            if (fint.getVariables().item(C_GROUPAVERAGE) === null) { //@@@: if (fint.getVariables().item(C_GROUPAVERAGE) == null)
                fint.getVariables().add(null, C_GROUPAVERAGE); //@@@: fint.getVariables().add(null, C_GROUPAVERAGE);
            } //@@@: }

            let item = fint.getVariables().item(C_GROUPAVERAGE); //@@@: cReportVariable item = fint.getVariables().item(C_GROUPAVERAGE);
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
            if (fint.getParameters().item(cReportGlobals.C_KEYINDEXCOL) === null) { //@@@: if (fint.getParameters().item(cReportGlobals.C_KEYINDEXCOL) == null)
                item.setValue(0); //@@@: item.setValue(0);
            } //@@@: }
            else { //@@@: else
                item.setValue( //@@@: item.setValue(
                    m_report.getGroupAverage( //@@@: m_report.getGroupAverage(
                        int.Parse(fint.getParameters().item(cReportGlobals.C_KEYINDEXCOL).getValue()), //@@@: int.Parse(fint.getParameters().item(cReportGlobals.C_KEYINDEXCOL).getValue()),
                        int.Parse(fint.getParameters().item(cReportGlobals.C_KEYINDEXGROUP).getValue()))); //@@@: int.Parse(fint.getParameters().item(cReportGlobals.C_KEYINDEXGROUP).getValue())));
            } //@@@: }
        }; //@@@: }

        // this function only get the total of the group
        // the percent is calculated in the function ResultGroupPercent
        //
        const evalGroupPercent = function(fint) { //@@@: private void evalGroupPercent(cReportFormulaInt fint)
            if (fint.getVariables().item(C_GROUPPERCENTT) === null) { //@@@: if (fint.getVariables().item(C_GROUPPERCENTT) == null)
                fint.getVariables().add(null, C_GROUPPERCENTT); //@@@: fint.getVariables().add(null, C_GROUPPERCENTT);
            } //@@@: }

            if (fint.getVariables().item(C_GROUPPERCENT) === null) { //@@@: if (fint.getVariables().item(C_GROUPPERCENT) == null)
                fint.getVariables().add(null, C_GROUPPERCENT); //@@@: fint.getVariables().add(null, C_GROUPPERCENT);
            } //@@@: }

            let item = fint.getVariables().item(C_GROUPPERCENTT); //@@@: cReportVariable item = fint.getVariables().item(C_GROUPPERCENTT);
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
            if (fint.getParameters().item(cReportGlobals.C_KEYINDEXCOL) === null) { //@@@: if (fint.getParameters().item(cReportGlobals.C_KEYINDEXCOL) == null)
                item.setValue(0); //@@@: item.setValue(0);
            } //@@@: }
            else { //@@@: else
                item.setValue( //@@@: item.setValue(
                    m_report.getGroupTotal( //@@@: m_report.getGroupTotal(
                        int.Parse(fint.getParameters().item(cReportGlobals.C_KEYINDEXCOL).getValue()),  //@@@: int.Parse(fint.getParameters().item(cReportGlobals.C_KEYINDEXCOL).getValue()),
                        int.Parse(fint.getParameters().item(cReportGlobals.C_KEYINDEXGROUP).getValue()))); //@@@: int.Parse(fint.getParameters().item(cReportGlobals.C_KEYINDEXGROUP).getValue())));
            } //@@@: }
            pEvalFunctionGroup(fint); //@@@: pEvalFunctionGroup(fint);
        }; //@@@: }

        const evalGroupCount = function(fint) { //@@@: private void evalGroupCount(cReportFormulaInt fint)
            if (fint.getVariables().item(C_GROUPCOUNT) === null) { //@@@: if (fint.getVariables().item(C_GROUPCOUNT) == null)
                fint.getVariables().add(null, C_GROUPCOUNT); //@@@: fint.getVariables().add(null, C_GROUPCOUNT);
            } //@@@: }

            let item = fint.getVariables().item(C_GROUPCOUNT); //@@@: cReportVariable item = fint.getVariables().item(C_GROUPCOUNT);
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
            if (fint.getParameters().item(cReportGlobals.C_KEYINDEXCOL) === null) { //@@@: if (fint.getParameters().item(cReportGlobals.C_KEYINDEXCOL) == null)
                item.setValue(0); //@@@: item.setValue(0);
            } //@@@: }
            else { //@@@: else
                item.setValue( //@@@: item.setValue(
                    m_report.getGroupCount( //@@@: m_report.getGroupCount(
                        int.Parse(fint.getParameters().item(cReportGlobals.C_KEYINDEXCOL).getValue()), //@@@: int.Parse(fint.getParameters().item(cReportGlobals.C_KEYINDEXCOL).getValue()),
                        int.Parse(fint.getParameters().item(cReportGlobals.C_KEYINDEXGROUP).getValue()))); //@@@: int.Parse(fint.getParameters().item(cReportGlobals.C_KEYINDEXGROUP).getValue())));
            } //@@@: }
        }; //@@@: }

        const evalGroupLineNumber = function(fint) { //@@@: private void evalGroupLineNumber(cReportFormulaInt fint)
            if (fint.getVariables().item(C_GROUPLINENUMBER) === null) { //@@@: if (fint.getVariables().item(C_GROUPLINENUMBER) == null)
                fint.getVariables().add(null, C_GROUPLINENUMBER); //@@@: fint.getVariables().add(null, C_GROUPLINENUMBER);
            } //@@@: }

            let item = fint.getVariables().item(C_GROUPLINENUMBER); //@@@: cReportVariable item = fint.getVariables().item(C_GROUPLINENUMBER);
            // the LineNumber function is for numbers
            item.setValue( //@@@: item.setValue(
                m_report.getGroupLineNumber( //@@@: m_report.getGroupLineNumber(
                    int.Parse(fint.getParameters().item(cReportGlobals.C_KEYINDEXGROUP).getValue()))); //@@@: int.Parse(fint.getParameters().item(cReportGlobals.C_KEYINDEXGROUP).getValue())));
        }; //@@@: }

        const evalIsInRs = function(fint) { //@@@: private void evalIsInRs(cReportFormulaInt fint)
            if (fint.getVariables().item(C_ISINRS) === null) { //@@@: if (fint.getVariables().item(C_ISINRS) == null)
                fint.getVariables().add(null, C_ISINRS); //@@@: fint.getVariables().add(null, C_ISINRS);
            } //@@@: }

            let item = fint.getVariables().item(C_ISINRS); //@@@: cReportVariable item = fint.getVariables().item(C_ISINRS);
            // TODO: finish coding evalIsInRs
            //
            item.setValue(true); //@@@: item.setValue(true);
        }; //@@@: }

        const evalGetBarcode = function(fint) { //@@@: private void evalGetBarcode(cReportFormulaInt fint)
            if (fint.getVariables().item(C_GET_BARCODE) === null) { //@@@: if (fint.getVariables().item(C_GET_BARCODE) == null)
                fint.getVariables().add(null, C_GET_BARCODE); //@@@: fint.getVariables().add(null, C_GET_BARCODE);
            } //@@@: }

            let item = fint.getVariables().item(C_GET_BARCODE); //@@@: cReportVariable item = fint.getVariables().item(C_GET_BARCODE);

            let barcodeGen = new CSReportBarcode.cReportBarcode(); //@@@: var barcodeGen = new CSReportBarcode.cReportBarcode();
            let value = fint.getParameters().item(0).getValue(); //@@@: var value = fint.getParameters().item(0).getValue();
            let barcode = barcodeGen.encodeTo128(value); //@@@: var barcode = barcodeGen.encodeTo128(value);

            if (barcode.Contains("Ã‚")) barcode = barcodeGen.code128a(value); { //@@@: if (barcode.Contains("Ã‚")) barcode = barcodeGen.code128a(value);

            item.setValue(barcode); //@@@: item.setValue(barcode);
        }; //@@@: }

        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //
        const pCheckParameters = function(cantParams, parameters, name) { //@@@: private void pCheckParameters(int cantParams, String parameters, String name)
            for(var i = 0; i < cantParams; i++) { //@@@: for (int i = 0; i < cantParams; i++)
                // It must receive the control name
                //
                let param = pGetParameter(parameters, i, name); //@@@: string param = pGetParameter(parameters, i, name);

                if (param.Length === 0) { //@@@: if (param.Length == 0)
                    throw new ReportArgumentMissingException( //@@@: throw new ReportArgumentMissingException(
                        C_MODULE, //@@@: C_MODULE,
                        cReportError.errGetDescript( //@@@: cReportError.errGetDescript(
                                        csRptErrors.CSRPTERRMISSINGPARAM, //@@@: csRptErrors.CSRPTERRMISSINGPARAM,
                                        i.ToString(), //@@@: i.ToString(),
                                        name)); //@@@: name));
                } //@@@: }

                m_fint.getParameters().add(param); //@@@: m_fint.getParameters().add(param);
            } //@@@: }
        }; //@@@: }

        const pGetIdFunction = function(name) { //@@@: private csRptFormulaType pGetIdFunction(String name)
            let f = null; //@@@: cReportFormulaType f = null;

            name = name.ToLower(); //@@@: name = name.ToLower();
            for(var _i = 0; _i < m_formulaTypes.count(); _i++) { //@@@: for (int _i = 0; _i < m_formulaTypes.count(); _i++)
                f = m_formulaTypes.item(_i); //@@@: f = m_formulaTypes.item(_i);
                if (name === f.getName().ToLower()) { //@@@: if (name == f.getName().ToLower())
                    return f.getId(); //@@@: return f.getId();
                } //@@@: }
            } //@@@: }
            return 0; //@@@: return 0;
        }; //@@@: }

        const pIsSeparator = function(c) { //@@@: private bool pIsSeparator(String c)
            return " |:+()/-*=\r\n".IndexOf(c, 0) > -1 && c !== ""; //@@@: return " |:+()/-*=\r\n".IndexOf(c, 0) > -1 && c != "";
        }; //@@@: }

        const removeReturns = function(code) { //@@@: private String removeReturns(String code)
            let c = ""; //@@@: String c = "";
            for(var i = 0; i < code.Length; i++) { //@@@: for (int i = 0; i < code.Length; i++)
                c = code.Substring(i, 1); //@@@: c = code.Substring(i, 1);
                if (c !== " " && c !== "\r" && c !== "\n") { //@@@: if (c != " " && c != "\r" && c != "\n") {
                    code = code.Substring(i); //@@@: code = code.Substring(i);
                    break;  //@@@: break;
                } //@@@: }
            } //@@@: }

            return code; //@@@: return code;
        }; //@@@: }

        // Dates start 1-1-1900 00:00:00
        //
        const pSumTimes = function(st, date2) { //@@@: private void pSumTimes(cStructTime st, DateTime date2)
            let n2 = 0; //@@@: int n2 = 0;
            let h2 = 0; //@@@: int h2 = 0;
            let s2 = 0; //@@@: int s2 = 0;

            let n = 0; //@@@: int n = 0;
            let h = 0; //@@@: int h = 0;
            let s = 0; //@@@: int s = 0;
            let d = 0; //@@@: int d = 0;

            s2 = date2.Second; //@@@: s2 = date2.Second;
            n2 = date2.Minute; //@@@: n2 = date2.Minute;
            h2 = date2.Hour; //@@@: h2 = date2.Hour;

            // get seconds
            //
            s = (st.getSecond() + s2) % 60; //@@@: s = (st.getSecond() + s2) % 60;

            // get minutes
            //
            n = ((st.getSecond() + s2) / 60); //@@@: n = (int)((st.getSecond() + s2) / 60);
            n = n + (st.getMinute() + n2) % 60; //@@@: n = n + (st.getMinute() + n2) % 60;

            // get hours
            //
            h = ((st.getMinute() + n2) / 60); //@@@: h = (int)((st.getMinute() + n2) / 60);
            h = h + st.getHour() + h2; //@@@: h = h + st.getHour() + h2;

            st.setSecond(s); //@@@: st.setSecond(s);
            st.setMinute(n); //@@@: st.setMinute(n);
            st.setHour(h); //@@@: st.setHour(h);
        }; //@@@: }

        const pCompileAux = function(code, codeC) { //@@@: private bool pCompileAux(String code, out String codeC)
            let codeCallFunction = ""; //@@@: String codeCallFunction = "";
            let codeCallFunctionC = ""; //@@@: String codeCallFunctionC = "";
            let functionName = ""; //@@@: String functionName = "";
            let word = ""; //@@@: String word = "";

            let nStart = 0; //@@@: int nStart = 0;
            let nLenCode = code.Length; //@@@: int nLenCode = code.Length;

            codeC = ""; //@@@: codeC = "";

            do { //@@@: do
                word = pGetWord(code, nStart); //@@@: word = pGetWord(code, ref nStart);
                if (pIsFunctionAux(word, functionName)) { //@@@: if (pIsFunctionAux(word, ref functionName))

                    codeCallFunction = pGetCallFunction(code, nStart); //@@@: codeCallFunction = pGetCallFunction(code, ref nStart);

                    if (!pCompileAux(codeCallFunction, codeCallFunctionC)) { //@@@: if (!pCompileAux(codeCallFunction, out codeCallFunctionC))
                        return false; //@@@: return false;
                    } //@@@: }

                    codeC = codeC + pExecFunction(functionName, codeCallFunctionC); //@@@: codeC = codeC + pExecFunction(functionName, codeCallFunctionC);
                } //@@@: }
                else { //@@@: else
                    codeC = codeC + word; //@@@: codeC = codeC + word;
                } //@@@: }
            } while (nStart < nLenCode); //@@@: } while (nStart < nLenCode);

            return true; //@@@: return true;
        }; //@@@: }

        const pGetWord = function(code, nStart) { //@@@: private String pGetWord(String code, ref int nStart)
            let c = ""; //@@@: String c = "";
            let nLenCode = 0; //@@@: int nLenCode = 0;
            let word = ""; //@@@: String word = "";

            nLenCode = code.Length; //@@@: nLenCode = code.Length;

            c = code.Substring(nStart, 1); //@@@: c = code.Substring(nStart, 1);

            do { //@@@: do
                word += c; //@@@: word += c;
                nStart += 1; //@@@: nStart += 1;
                if (pIsSeparator(c)) break; { //@@@: if (pIsSeparator(c)) break;
                c = cUtil.subString(code, nStart, 1); //@@@: c = cUtil.subString(code, nStart, 1);
            } while (!pIsSeparator(c) && nStart < nLenCode); //@@@: } while (!pIsSeparator(c) && nStart < nLenCode);

            return word; //@@@: return word;
        }; //@@@: }

        const pIsFunctionAux = function(word, functionName) { //@@@: private bool pIsFunctionAux(String word, ref String functionName)
            if (!pIsFunction(word)) { return false; } //@@@: if (!pIsFunction(word)) { return false; }
            functionName = word; //@@@: functionName = word;
            return true; //@@@: return true;
        }; //@@@: }

        const pGetCallFunction = function(code, nStart) { //@@@: private String pGetCallFunction(String code, ref int nStart)
            let c = ""; //@@@: String c = "";
            let nLenCode = 0; //@@@: int nLenCode = 0;
            let word = ""; //@@@: String word = "";
            let nInner = 0; //@@@: int nInner = 0;

            nLenCode = code.Length; //@@@: nLenCode = code.Length;
            nInner = -1; //@@@: nInner = -1;

            do { //@@@: do
                c = code.Substring(nStart, 1); //@@@: c = code.Substring(nStart, 1);
                word = word + c; //@@@: word = word + c;
                nStart = nStart + 1; //@@@: nStart = nStart + 1;
            } while (!pIsEndCallFunction(c, nInner) && nStart < nLenCode); //@@@: } while (!pIsEndCallFunction(c, ref nInner) && nStart < nLenCode);

            return word; //@@@: return word;
        }; //@@@: }

        const pIsEndCallFunction = function(c, nInner) { //@@@: private bool pIsEndCallFunction(String c, ref int nInner)
            let _rtn = false; //@@@: bool _rtn = false;
            if (c === ")") { //@@@: if (c == ")")
                if (nInner === 0) { //@@@: if (nInner == 0)
                    _rtn = true; //@@@: _rtn = true;
                } //@@@: }
                else { //@@@: else
                    nInner = nInner - 1; //@@@: nInner = nInner - 1;
                } //@@@: }
            } //@@@: }
            else if (c === "(") //@@@: else if (c == "(")
            { //@@@: {
                nInner = nInner + 1; //@@@: nInner = nInner + 1;
            } //@@@: }
            return _rtn; //@@@: return _rtn;
        } //@@@: }

        private String pExecFunction(String functionName, String parameters) //@@@: private String pExecFunction(String functionName, String parameters)
        { //@@@: {
            if (m_bCompile) //@@@: if (m_bCompile)
            { //@@@: {
                return pAddFormulaInt(functionName, parameters).ToString(); //@@@: return pAddFormulaInt(functionName, parameters).ToString();
            } //@@@: }
            else //@@@: else
            { //@@@: {
                cReportFormulaInt fint = null; //@@@: cReportFormulaInt fint = null;
                m_idxFormula = m_idxFormula + 1; //@@@: m_idxFormula = m_idxFormula + 1;
                fint = m_formula.getFormulasInt().item(m_idxFormula); //@@@: fint = m_formula.getFormulasInt().item(m_idxFormula);
                pSetParams(fint, parameters); //@@@: pSetParams(fint, parameters);
                pEvalFunctionInt(fint); //@@@: pEvalFunctionInt(fint);
                object value = pResultFunctionInt(fint); //@@@: object value = pResultFunctionInt(fint);
                if (value !== null) //@@@: if (value != null)
                { //@@@: {
                    return getNumericVal(value.ToString()); //@@@: return getNumericVal(value.ToString());
                } //@@@: }
                else //@@@: else
                { //@@@: {
                    return ""; //@@@: return "";
                } //@@@: }
            } //@@@: }
        } //@@@: }

        private void pSetParams(cReportFormulaInt fint, String parameters) //@@@: private void pSetParams(cReportFormulaInt fint, String parameters)
        { //@@@: {
            String[] vParams = null; //@@@: String[] vParams = null;
            int i = 0; //@@@: int i = 0;

            parameters = parameters.Trim(); //@@@: parameters = parameters.Trim();
            if (parameters.Length > 2) //@@@: if (parameters.Length > 2)
            { //@@@: {
                parameters = parameters.Substring(1, parameters.Length - 2); //@@@: parameters = parameters.Substring(1, parameters.Length - 2);
                parameters = parameters.Trim(); //@@@: parameters = parameters.Trim();
                vParams = parameters.Split('|'); //@@@: vParams = parameters.Split('|');

                for (i = 0; i < vParams.Length; i++) //@@@: for (i = 0; i < vParams.Length; i++)
                { //@@@: {
                    fint.getParameters().item(i).setValue(vParams[i].Trim()); //@@@: fint.getParameters().item(i).setValue(vParams[i].Trim());
                } //@@@: }
            } //@@@: }
        } //@@@: }

        private String getNumericVal(String value) //@@@: private String getNumericVal(String value)
        { //@@@: {
            int decimalDigit = 0; //@@@: int decimalDigit = 0;
            decimalDigit = value.IndexOf(",", 0); //@@@: decimalDigit = value.IndexOf(",", 0);
            if (decimalDigit > 0) //@@@: if (decimalDigit > 0)
            { //@@@: {
                value = value.Replace(",", "."); //@@@: value = value.Replace(",", ".");
            } //@@@: }
            return value; //@@@: return value;
        } //@@@: }

        return self;

    } //@@@: }

}(globalObject)); { //@@@: }
