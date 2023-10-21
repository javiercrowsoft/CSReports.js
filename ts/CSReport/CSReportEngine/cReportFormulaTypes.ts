namespace CSReportEngine {

    import Map = CSOAPI.Map;
    import csRptFormulaType = CSReportGlobals.csRptFormulaType;

    export class cReportFormulaTypes extends Map<cReportFormulaType> {

        public constructor() {
            super(null, false, cReportFormulaType);
            this.initialize();
        }

        private initialize() {

            const C_LANGUAGE_DESCRIPT: string = "language: 1 Spanish, 2 English y 3 French";
            const C_CONTROL_NAME_DESCRIPT: string = "control_name: an string which identifies the control.";
            const C_COMPARE_DESCRIPT: string = "It returns a boolean after comparing a control's value with the second argument ";
            const C_VALUE_TO_COMPARE_DESCRIPT: string = "value: a number or a text to by compared with.";
            const C_GROUP_FUNCTION_DESCRIPT: string = "It function calculates its value before processing the group."
                                                    + "\nWhen CSReport found this function it iterates through the "
                                                    + "main recordset to the last row in the group and calculates "
                                                    + "the $1  of the values in the column refered by the "
                                                    + "column_name parameter.";
            const C_COLUMN_NAME: string = "column_name: name of the column in the main recordset.\n";
            const C_GROUP_INDEX: string = "group_index: index of the group"
                                        + "\nWhen group_index is equal to -1 the index of the group section in which the control is contained will be used."
                                        + "\nWhen group_index is equal to 0 the $1 of the column of every row in the main recordset will be returned."
                                        + "\nWhen group_index is greater than zero the $1 of the column of every row in the main recordset contained in the group which index is equal to index_group will be returned.";

            const C_GROUP_FUNCTION_DESCRIPT2: string = "It function calculates its value before processing the group."
                                                    + "\nWhen CSReport found this function it iterates through the "
                                                    + "main recordset to the last row in the group and calculates "
                                                    + "the $1.";
            const C_COLUMN_NAME1: string = "column_name1: name of the column in the main recordset to summarize.\n";
            const C_COLUMN_NAME2: string = "column_name2: name of the column in the main recordset to compare with the total.\n";
            const C_GROUP_INDEX2: string = "group_index: index of the group"
                                        + "\nWhen group_index is equal to -1 the index of the group section in which the control is contained will be used."
                                        + "\nWhen group_index is equal to 0 the $1 will be evaluated using every row in the main recordset."
                                        + "\nWhen group_index is greater than zero the $1 will be evaluated using every row contained in the group which index is equal to index_group.\n";

            // we load the collection with all the predefined functions

            //----------------
            // A

            let fi: cReportFormulaType = this.add2(null, csRptFormulaType.CSRPTF_SET_VAR);
            fi.setName("_setvar");
            fi.setNameUser("Set a variable");
            fi.setDecrip("It sets the value of a variable.\n\nSyntax: _setVar(variable_name, value)");
            fi.setId(csRptFormulaType.CSRPTF_SET_VAR);
            fi.setHelpContextId(csRptFormulaType.CSRPTF_SET_VAR);

            //----------------
            // B

            fi = this.add2(null, csRptFormulaType.CSRPTF_GET_BARCODE);
            fi.setName("_getbarcode");
            fi.setNameUser("Takes an string and returns a barcode");
            fi.setDecrip("It returns a barcode.\n\nSyntax: _getBarcode(value)");
            fi.setId(csRptFormulaType.CSRPTF_GET_BARCODE);
            fi.setHelpContextId(csRptFormulaType.CSRPTF_GET_BARCODE);

            //----------------
            // C

            fi = this.add2(null, csRptFormulaType.CSRPTF_CALCULATE);
            fi.setName("_calculate");
            fi.setNameUser("Calculate");
            fi.setDecrip("It returns a double after applying an aritmetical operation to ther first two arguments.\n\nSyntax: _calc(control_1, control_2, value, operator)\n1 addition, 2 substraction, 3 multiplication, 4 division, 5 power");
            fi.setId(csRptFormulaType.CSRPTF_CALCULATE);
            fi.setHelpContextId(csRptFormulaType.CSRPTF_CALCULATE);

            fi = this.add2(null, csRptFormulaType.CSRPTF_TOTAL_PAGES);
            fi.setName("_totalPages");
            fi.setNameUser("Page count");
            fi.setDecrip("It returns an int with the amount of pages in the report.\n\nSyntax: _totalPages()");
            fi.setId(csRptFormulaType.CSRPTF_TOTAL_PAGES);
            fi.setHelpContextId(csRptFormulaType.CSRPTF_TOTAL_PAGES);

            fi = this.add2(null, csRptFormulaType.CSRPTF_COUNT);
            fi.setName("_count");
            fi.setNameUser("Record count");
            fi.setDecrip("It returns an int with the amount of rows in the main recordset of the report.\n\nSyntax: _count()");
            fi.setId(csRptFormulaType.CSRPTF_COUNT);
            fi.setHelpContextId(csRptFormulaType.CSRPTF_COUNT);

            //----------------
            // D

            fi = this.add2(null, csRptFormulaType.CSRPTF_DECLARE_VAR);
            fi.setName("_declareVar");
            fi.setNameUser("Declare a variable");
            fi.setDecrip("It declares a variable.\n\nSyntax: _declareVar(variable_name)");
            fi.setId(csRptFormulaType.CSRPTF_DECLARE_VAR);
            fi.setHelpContextId(csRptFormulaType.CSRPTF_DECLARE_VAR);

            //----------------
            // E

            fi = this.add2(null, csRptFormulaType.CSRPTF_IS_EQUAL);
            fi.setName("_isEqual");
            fi.setNameUser("Equal to");
            fi.setDecrip(C_COMPARE_DESCRIPT + "\n\nSyntax: _isEqual(control_name, value)\n" + C_CONTROL_NAME_DESCRIPT + "\n" + C_VALUE_TO_COMPARE_DESCRIPT);
            fi.setId(csRptFormulaType.CSRPTF_IS_EQUAL);
            fi.setHelpContextId(csRptFormulaType.CSRPTF_IS_EQUAL);

            fi = this.add2(null, csRptFormulaType.CSRPTF_IS_NOT_EQUAL);
            fi.setName("_isNotEqual");
            fi.setNameUser("It is not equal to");
            fi.setDecrip(C_COMPARE_DESCRIPT + "\n\nSyntax: _isNotEqual(control_name, value)\n" + C_CONTROL_NAME_DESCRIPT + "\n" + C_VALUE_TO_COMPARE_DESCRIPT);
            fi.setId(csRptFormulaType.CSRPTF_IS_NOT_EQUAL);
            fi.setHelpContextId(csRptFormulaType.CSRPTF_IS_NOT_EQUAL);

            fi = this.add2(null, csRptFormulaType.CSRPTF_IS_GREATER_THAN);
            fi.setName("_isGreaterThan");
            fi.setNameUser("It is greater than");
            fi.setDecrip(C_COMPARE_DESCRIPT + "\n\nSyntax: _isGreaterThan(control_name, value)\n" + C_CONTROL_NAME_DESCRIPT + "\n" + C_VALUE_TO_COMPARE_DESCRIPT);
            fi.setId(csRptFormulaType.CSRPTF_IS_GREATER_THAN);
            fi.setHelpContextId(csRptFormulaType.CSRPTF_IS_GREATER_THAN);

            fi = this.add2(null, csRptFormulaType.CSRPTF_IS_LESS_THAN);
            fi.setName("_iseLowerthan");
            fi.setNameUser("It is lower than");
            fi.setDecrip(C_COMPARE_DESCRIPT + "\n\nSyntax: _isLowerThan(control_name, value)\n" + C_CONTROL_NAME_DESCRIPT + "\n" + C_VALUE_TO_COMPARE_DESCRIPT);
            fi.setId(csRptFormulaType.CSRPTF_IS_LESS_THAN);
            fi.setHelpContextId(csRptFormulaType.CSRPTF_IS_LESS_THAN);

            fi = this.add2(null, csRptFormulaType.CSRPTF_IS_IN_RS);
            fi.setName("_isInRS");
            fi.setNameUser("It is contained in the main recordset");
            fi.setDecrip("It returns a boolean value after searching a constant value in a column of the main recordset.\r\n\r\nSyntax: _isInRS(column_name,\"value\")\ncolumn_name: the name of a column in the main recordset\nvalue: an string to be searched (it must be surrounded by double quotes).");
            fi.setId(csRptFormulaType.CSRPTF_IS_IN_RS);
            fi.setHelpContextId(csRptFormulaType.CSRPTF_IS_IN_RS);

            //----------------
            // G

            fi = this.add2(null, csRptFormulaType.CSRPTF_GROUP_TOTAL);
            fi.setName("_groupTotal");
            fi.setNameUser("Group) Group total");
            fi.setDecrip(C_GROUP_FUNCTION_DESCRIPT.replace("$1", "summatory")
                            + "\n\nSyntax: _groupTotal(column_name, group_index)"
                            + "\n\n" + C_COLUMN_NAME
                            + "\n" + C_GROUP_INDEX.replace("$1", "summatory"));
            fi.setId(csRptFormulaType.CSRPTF_GROUP_TOTAL);
            fi.setHelpContextId(csRptFormulaType.CSRPTF_GROUP_TOTAL);

            fi = this.add2(null, csRptFormulaType.CSRPTF_GROUP_MAX);
            fi.setName("_groupMax");
            fi.setNameUser("Group) Group maximum");
            fi.setDecrip(C_GROUP_FUNCTION_DESCRIPT.replace("$1", "maximum value")
                            + "\n\nSyntax: _groupTotal(column_name, group_index)"
                            + "\n\n" + C_COLUMN_NAME
                            + "\n" + C_GROUP_INDEX.replace("$1", "maximum value"));
            fi.setId(csRptFormulaType.CSRPTF_GROUP_MAX);
            fi.setHelpContextId(csRptFormulaType.CSRPTF_GROUP_MAX);

            fi = this.add2(null, csRptFormulaType.CSRPTF_GROUP_MIN);
            fi.setName("_groupMin");
            fi.setNameUser("Group) Group minimum");
            fi.setDecrip(C_GROUP_FUNCTION_DESCRIPT.replace("$1", "minimum value")
                            + "\n\nSyntax: _groupTotal(column_name, group_index)"
                            + "\n\n" + C_COLUMN_NAME
                            + "\n" + C_GROUP_INDEX.replace("$1", "minimum value"));
            fi.setId(csRptFormulaType.CSRPTF_GROUP_MIN);
            fi.setHelpContextId(csRptFormulaType.CSRPTF_GROUP_MIN);

            fi = this.add2(null, csRptFormulaType.CSRPTF_GROUP_AVERAGE);
            fi.setName("_groupAverage");
            fi.setNameUser("Group) Group average");
            fi.setDecrip(C_GROUP_FUNCTION_DESCRIPT.replace("$1", "average value")
                            + "\n\nSyntax: _groupAverage(column_name, group_index)"
                            + "\n\n" + C_COLUMN_NAME
                            + "\n" + C_GROUP_INDEX.replace("$1", "average value"));
            fi.setId(csRptFormulaType.CSRPTF_GROUP_AVERAGE);
            fi.setHelpContextId(csRptFormulaType.CSRPTF_GROUP_AVERAGE);

            fi = this.add2(null, csRptFormulaType.CSRPTF_GROUP_PERCENT);
            fi.setName("_groupPercent");
            fi.setNameUser("Group) Group percent");
            fi.setDecrip(C_GROUP_FUNCTION_DESCRIPT2.replace("$1", "percent value column_name2 represents in the summatory of column_name1")
                            + "\n\nSyntax: _groupTotal(column_name1, column_name2, group_index)"
                            + "\n\n" + C_COLUMN_NAME
                            + "\n" + C_COLUMN_NAME
                            + "\nNote: usually column_name1 and column_name2 have the same value because it is used to get the perecentage a value in a set represents."
                            + "\n" + C_GROUP_INDEX2.replace("$1", "percent value"));
            fi.setId(csRptFormulaType.CSRPTF_GROUP_PERCENT);
            fi.setHelpContextId(csRptFormulaType.CSRPTF_GROUP_PERCENT);

            fi = this.add2(null, csRptFormulaType.CSRPTF_GROUP_COUNT);
            fi.setName("_groupCount");
            fi.setNameUser("Group) Amount of lines in a group");
            fi.setDecrip(C_GROUP_FUNCTION_DESCRIPT2.replace("$1", "amunt of lines in the group")
                            + "\n\nSyntax: _groupCount(column_name, group_index)"
                            + "\n\n" + C_COLUMN_NAME
                            + "\n" + C_GROUP_INDEX2.replace("$1", "amunt of lines"));
            fi.setId(csRptFormulaType.CSRPTF_GROUP_COUNT);
            fi.setHelpContextId(csRptFormulaType.CSRPTF_GROUP_COUNT);

            fi = this.add2(null, csRptFormulaType.CSRPTF_GROUP_LINE_NUMBER);
            fi.setName("_groupLineNumber");
            fi.setNameUser("Group) Line number in a group");
            fi.setDecrip("It returns the line number in a Group, if when Group is zero it returns the line number in the report."
                            + "\n\nSyntax: _GroupLineNumber(group_index)"
                            + "\n\ngroup_index: Group's index"
                            + "\nWhen group_index is -1 the group's index where the control is contained will be used."
                            + "\nWhen group_index is 0 the line number in the report will be returned."
                            + "\nWhen group_index is > 0 the line number in the group will be returned.");

            fi.setDecrip(C_GROUP_FUNCTION_DESCRIPT2.replace("$1", "line number of the current line in the group.")
                            + "\n\nSyntax: _groupLineNumber(group_index)"
                            + "\n" + C_GROUP_INDEX2.replace("$1", "line number of the current line in the group"));

            fi.setId(csRptFormulaType.CSRPTF_GROUP_LINE_NUMBER);
            fi.setHelpContextId(csRptFormulaType.CSRPTF_GROUP_LINE_NUMBER);

            //----------------
            // M

            fi = this.add2(null, csRptFormulaType.CSRPTF_MAX);
            fi.setName("_max");
            fi.setNameUser("Maximum value in a column");
            fi.setDecrip("It returns a double with the maximun value in a column.\n\nSyntax: _max(control_name)\n" + C_CONTROL_NAME_DESCRIPT);
            fi.setId(csRptFormulaType.CSRPTF_MAX);
            fi.setHelpContextId(csRptFormulaType.CSRPTF_MAX);

            fi = this.add2(null, csRptFormulaType.CSRPTF_MIN);
            fi.setName("_min");
            fi.setNameUser("Minimum value in a column");
            fi.setDecrip("It returns a double with the minimu valie in a column.\n\nSyntax: _min(control_name)\n" + C_CONTROL_NAME_DESCRIPT);
            fi.setId(csRptFormulaType.CSRPTF_MIN);
            fi.setHelpContextId(csRptFormulaType.CSRPTF_MIN);

            //----------------
            // N

            fi = this.add2(null, csRptFormulaType.CSRPTF_NUMBER_TO_STRING);
            fi.setName("_numberToString");
            fi.setNameUser("Number to String");
            fi.setDecrip("It returns the number expressed in words.\n\nSyntax: _numberToString(control_name,nLanguage)\n" + C_CONTROL_NAME_DESCRIPT + "\n" + C_LANGUAGE_DESCRIPT);
            fi.setId(csRptFormulaType.CSRPTF_NUMBER_TO_STRING);
            fi.setHelpContextId(csRptFormulaType.CSRPTF_NUMBER_TO_STRING);

            fi = this.add2(null, csRptFormulaType.CSRPTF_PAGE_NUMBER);
            fi.setName("_currentPage");
            fi.setNameUser("Page number");
            fi.setDecrip("It returns an int with the number of the current page.\n\nSyntax: _currentPage()");
            fi.setId(csRptFormulaType.CSRPTF_PAGE_NUMBER);
            fi.setHelpContextId(csRptFormulaType.CSRPTF_PAGE_NUMBER);

            //----------------
            // O

            fi = this.add2(null, csRptFormulaType.CSRPTF_GET_PARAM);
            fi.setName("_getParam");
            fi.setNameUser("Get a parameter value");
            fi.setDecrip("It returns a the value of a parameter from the main connection\n\nSyntax: _getParam(parameter_name)");
            fi.setId(csRptFormulaType.CSRPTF_GET_PARAM);
            fi.setHelpContextId(csRptFormulaType.CSRPTF_GET_PARAM);

            fi = this.add2(null, csRptFormulaType.CSRPTF_GET_DATA_FROM_RS_AD);
            fi.setName("_getDataFromRSAd");
            fi.setNameUser("Get a value form a column of a row in an additional recordset");
            fi.setDecrip("It returns a value from a column of a row in an additional recordset. "
                            + "\n\nThe rows of the additional recordset are filtered comparing the value "
                            + "of the column refered by the parameter filter of "
                            + "the current row in the main recordset with the values of the column "
                            + "refered by filter_column_name_add_ds in the additional recordset."
                            + "\n\nSyntax: (ds means Data Source): "
                            + "_getDataFromRSAd(ds_name, ds_index, column_name, filter)"
                            + "\n\nds_name: name of the additioanl connection"
                            + "\nds_index: index of the recordset in the additioanl connection"
                            + "\ncolumn_name: name of the column in the additional recordset which contains the value to return"
                            + "\nfilter: an strng containing the relation between one or more columns of the main recordset and the additional recordset"
                            + "\n\texample of filter:"
                            + "\n\t\tpr_id=pr_id (tipical primary key to foreign key relation)"
                            + "\n\t\tpr_id=pr_id|fv_id=fv_id (a two column relation is separated by pipes)"
                            + "\n\t\tas_id=as_id_factura (the names of the columns can be differents)"
                            );
            fi.setId(csRptFormulaType.CSRPTF_GET_DATA_FROM_RS_AD);
            fi.setHelpContextId(csRptFormulaType.CSRPTF_GET_DATA_FROM_RS_AD);

            fi = this.add2(null, csRptFormulaType.CSRPTF_GET_DATA_FROM_RS);
            fi.setName("_getDataFromRS");
            fi.setNameUser("Get a value from a column of a row in the main recordset");
            fi.setDecrip("It returns a value from a column of a row in the main recordset. "
                            + "The rows are filtered comparing the value "
                            + "of the column refered by the parameter filter_column_name1 of "
                            + "the current row with the values of the column "
                            + "refered by filter_column_name2."
                            + "\n\nSyntax: getDataFromRS (column_name, filter_column_name1, filter_column_name2)"
                            + "\n\ncolumn_name: name of the column which contains the value to return"
                            + "\nfilter_column_name1: name of the column in the current record"
                            + "\nfilter_column_name2: name of the column in used to filter values");
            fi.setId(csRptFormulaType.CSRPTF_GET_DATA_FROM_RS);
            fi.setHelpContextId(csRptFormulaType.CSRPTF_GET_DATA_FROM_RS);

            fi = this.add2(null, csRptFormulaType.CSRPTF_GET_STRING);
            fi.setName("_getString");
            fi.setNameUser("Get an string");
            fi.setDecrip("It returns the value of the control refered by the control_name parameter surrounded by double quotes"
                            + "\n\nSyntax: _getString(control_name)\n" + C_CONTROL_NAME_DESCRIPT);
            fi.setId(csRptFormulaType.CSRPTF_GET_STRING);
            fi.setHelpContextId(csRptFormulaType.CSRPTF_GET_STRING);

            fi = this.add2(null, csRptFormulaType.CSRPTF_GET_VAR);
            fi.setName("_getVar");
            fi.setNameUser("Get the value of a user variable");
            fi.setDecrip("It returns the value of the variable refered by the variable_name parameter"
                            + "\n\nSyntax: _getVar(variable_name)");
            fi.setId(csRptFormulaType.CSRPTF_GET_VAR);
            fi.setHelpContextId(csRptFormulaType.CSRPTF_GET_VAR);

            //----------------
            // P

            fi = this.add2(null, csRptFormulaType.CSRPTF_AVERAGE);
            fi.setName("_average");
            fi.setNameUser("Average of a Column");
            fi.setDecrip("It returns a double with the average value of a column"
                            + "\n\nSyntax: _average(control_name)\n" + C_CONTROL_NAME_DESCRIPT);
            fi.setId(csRptFormulaType.CSRPTF_AVERAGE);
            fi.setHelpContextId(csRptFormulaType.CSRPTF_AVERAGE);

            //----------------
            // S

            fi = this.add2(null, csRptFormulaType.CSRPTF_ADD_TO_VAR);
            fi.setName("_addToVar");
            fi.setNameUser("Add a value to a user variable");
            fi.setDecrip("It adds the value of the parameter value to a user variable refered by the parameter variable_name"
                            + "\n\nSyntax: _addToVar(variable_name, value)");
            fi.setId(csRptFormulaType.CSRPTF_ADD_TO_VAR);
            fi.setHelpContextId(csRptFormulaType.CSRPTF_ADD_TO_VAR);

            fi = this.add2(null, csRptFormulaType.CSRPTF_SUM);
            fi.setName("_sum");
            fi.setNameUser("Totals of a column");
            fi.setDecrip("It returns the total of a column\n\nSyntax: _sum(control_name)\n" + C_CONTROL_NAME_DESCRIPT);
            fi.setId(csRptFormulaType.CSRPTF_SUM);
            fi.setHelpContextId(csRptFormulaType.CSRPTF_SUM);

            fi = this.add2(null, csRptFormulaType.CSRPTF_SUM_TIME);
            fi.setName("_sumTime");
            fi.setNameUser("Totals in time units of a column");
            fi.setDecrip("It returns the amount of hours, minutes and seconds from a column which contains hours and minutes in the format hh:nn"
                            + "\n\nSyntax: _sumTime(control_name, show_seconds)\n" + C_CONTROL_NAME_DESCRIPT);
            fi.setId(csRptFormulaType.CSRPTF_SUM_TIME);
            fi.setHelpContextId(csRptFormulaType.CSRPTF_SUM_TIME);

            //----------------
            // T

            fi = this.add2(null, csRptFormulaType.CSRPTF_LENGTH);
            fi.setName("_length");
            fi.setNameUser("Length of a control's value");
            fi.setDecrip("It returns an int with the length of a control's value\n\nSyntax: _length(control_name)\n\n" + C_CONTROL_NAME_DESCRIPT);
            fi.setId(csRptFormulaType.CSRPTF_LENGTH);
            fi.setHelpContextId(csRptFormulaType.CSRPTF_LENGTH);

            fi = this.add2(null, csRptFormulaType.CSRPTF_TEXT_REPLACE);
            fi.setName("_textReplace");
            fi.setNameUser("Replace a control name by its value in a string");
            fi.setDecrip("It replace every occurrence of a control name in the text property of another control. "
                        + "\n\nThis is the only function which is used in the text property of a control. "
                        + "the syntax is very weird because you don't call this function using its name "
                        + "but you put in the text property of a control the name of other control "
                        + "surrounded by two ats (@@control_name@@)\n\nSyntax: @@control_name@@\n\n" + C_CONTROL_NAME_DESCRIPT);
            fi.setId(csRptFormulaType.CSRPTF_TEXT_REPLACE);
            fi.setHelpContextId(csRptFormulaType.CSRPTF_TEXT_REPLACE);

            //----------------
            // V

            fi = this.add2(null, csRptFormulaType.CSRPTF_VAL);
            fi.setName("_value");
            fi.setNameUser("Value of a control");
            fi.setDecrip("It returns an string with the value of the control refered by the control_name parameter"
                            + "\n\nSyntax: _value(control_name)\n\n" + C_CONTROL_NAME_DESCRIPT);
            fi.setId(csRptFormulaType.CSRPTF_VAL);
            fi.setHelpContextId(csRptFormulaType.CSRPTF_VAL);
        }

        private add2(o, key) {
            return this.add(o, key.toString())
        }
    }
}
