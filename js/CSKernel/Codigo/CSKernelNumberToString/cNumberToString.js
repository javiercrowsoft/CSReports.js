(function(globalObject) {

    globalObject.CSKernelNumberToString = globalObject.CSKernelNumberToString || {}; //@@@: namespace CSKernelNumberToString
 //@@@: {
    globalObject.CSKernelNumberToString.createCNumberToString = function() {

        const self = {}; //@@@: public class cNumberToString

        const C_MODULE = "cNumberToString"; //@@@: private const String C_MODULE = "cNumberToString";

        self.secondsToString = function(count) { //@@@: public String secondsToString(int count)
            let hours = 0; //@@@: int hours = 0;
            let minutes = 0; //@@@: int minutes = 0;
            let second = 0; //@@@: int second = 0;

            hours = count / 3600; //@@@: hours = count / 3600;
            minutes =  / 60; //@@@: minutes = (count % 3600) / 60;
            second =  % 60; //@@@: second = (count % 3600) % 60;

            return hours.ToString("{0:00}") //@@@: return hours.ToString("{0:00}")
                + ":" + minutes.ToString("{0:00}") //@@@: + ":" + minutes.ToString("{0:00}")
                + ":" + second.ToString("{0:00}"); //@@@: + ":" + second.ToString("{0:00}");
        }; //@@@: }

        self.spanishNumberToString = function(iNumber) { //@@@: public String spanishNumberToString(double iNumber)
            let iMillion = 0; //@@@: double iMillion = 0;
            let iThousand = 0; //@@@: double iThousand = 0;
            let rtn = ""; //@@@: String rtn = "";

            iNumber = Math.Round(iNumber, 2); //@@@: iNumber = Math.Round(iNumber, 2);

            if (iNumber >= 1000000) { //@@@: if (iNumber >= 1000000)
                iMillion = pGetValue(iNumber, 1000000); //@@@: iMillion = pGetValue(iNumber, 1000000);
                if (iNumber >= 2000000) { //@@@: if (iNumber >= 2000000)
                    rtn = pSpanishGetNumber(iMillion, true) + " Millones "; //@@@: rtn = pSpanishGetNumber(iMillion, true) + " Millones ";
                } //@@@: }
                else { //@@@: else
                    rtn = pSpanishGetNumber(iMillion, true) + " Millon "; //@@@: rtn = pSpanishGetNumber(iMillion, true) + " Millon ";
                } //@@@: }
                iNumber = iNumber - (iMillion * 1000000); //@@@: iNumber = iNumber - (iMillion * 1000000);
            } //@@@: }

            if (iNumber >= 1000) { //@@@: if (iNumber >= 1000)
                iThousand = pGetValue(iNumber, 1000); //@@@: iThousand = pGetValue(iNumber, 1000);
                rtn = rtn + pSpanishGetNumber(iThousand, true) + " Mil "; //@@@: rtn = rtn + pSpanishGetNumber(iThousand, true) + " Mil ";
                iNumber = iNumber - (iThousand * 1000); //@@@: iNumber = iNumber - (iThousand * 1000);
            } //@@@: }

            rtn = rtn + pSpanishGetNumber(Math.Truncate(iNumber), false); //@@@: rtn = rtn + pSpanishGetNumber(Math.Truncate(iNumber), false);
            rtn = rtn + pSpanishGetDecimal(iNumber); //@@@: rtn = rtn + pSpanishGetDecimal(iNumber);

            return rtn.Substring(0, 1).ToUpper() + rtn.Substring(1).ToLower(); //@@@: return rtn.Substring(0, 1).ToUpper() + rtn.Substring(1).ToLower();
        }; //@@@: }

        self.frenchNumberToString = function(iNumber) { //@@@: public String frenchNumberToString(double iNumber)
            let iMillion = 0; //@@@: double iMillion = 0;
            let iThousand = 0; //@@@: double iThousand = 0;
            let rtn = ""; //@@@: String rtn = "";

            iNumber = Math.Round(iNumber, 2); //@@@: iNumber = Math.Round(iNumber, 2);

            if (iNumber >= 1000000) { //@@@: if (iNumber >= 1000000)
                iMillion = pGetValue(iNumber, 1000000); //@@@: iMillion = pGetValue(iNumber, 1000000);
                if (iNumber >= 2000000) { //@@@: if (iNumber >= 2000000)
                    rtn = pFrenchGetNumber(iMillion, true) + " Millions "; //@@@: rtn = pFrenchGetNumber(iMillion, true) + " Millions ";
                } //@@@: }
                else { //@@@: else
                    rtn = pFrenchGetNumber(iMillion, true) + " Million "; //@@@: rtn = pFrenchGetNumber(iMillion, true) + " Million ";
                } //@@@: }
                iNumber = iNumber - (iMillion * 1000000); //@@@: iNumber = iNumber - (iMillion * 1000000);
            } //@@@: }

            if (iNumber >= 1000) { //@@@: if (iNumber >= 1000)
                iThousand = pGetValue(iNumber, 1000); //@@@: iThousand = pGetValue(iNumber, 1000);
                if (iThousand === 1) { //@@@: if (iThousand == 1)
                    rtn = " Mil "; //@@@: rtn = " Mil ";
                } //@@@: }
                else { //@@@: else
                    rtn = rtn + pFrenchGetNumber(iThousand, false) + " Mil "; //@@@: rtn = rtn + pFrenchGetNumber(iThousand, false) + " Mil ";
                } //@@@: }
                iNumber = iNumber - (iThousand * 1000); //@@@: iNumber = iNumber - (iThousand * 1000);
            } //@@@: }

            rtn = rtn + pFrenchGetNumber(Math.Truncate(iNumber), false); //@@@: rtn = rtn + pFrenchGetNumber(Math.Truncate(iNumber), false);
            rtn = rtn + pFrenchGetDecimal(iNumber); //@@@: rtn = rtn + pFrenchGetDecimal(iNumber);

            return rtn.Substring(0, 1).ToUpper() + rtn.Substring(2).ToLower(); //@@@: return rtn.Substring(0, 1).ToUpper() + rtn.Substring(2).ToLower();
        }; //@@@: }

        self.englishNumberToString = function(iNumber) { //@@@: public String englishNumberToString(double iNumber)
            let iMillion = 0; //@@@: double iMillion = 0;
            let iThousand = 0; //@@@: double iThousand = 0;
            let rtn = ""; //@@@: String rtn = "";

            iNumber = Math.Round(iNumber, 2); //@@@: iNumber = Math.Round(iNumber, 2);

            if (iNumber >= 1000000) { //@@@: if (iNumber >= 1000000)
                iMillion = pGetValue(iNumber, 1000000); //@@@: iMillion = pGetValue(iNumber, 1000000);
                rtn = pEnglishGetNumber(iMillion, true) + " Million "; //@@@: rtn = pEnglishGetNumber(iMillion, true) + " Million ";
                iNumber = iNumber - (iMillion * 1000000); //@@@: iNumber = iNumber - (iMillion * 1000000);
            } //@@@: }

            if (iNumber >= 1000) { //@@@: if (iNumber >= 1000)
                iThousand = pGetValue(iNumber, 1000); //@@@: iThousand = pGetValue(iNumber, 1000);
                rtn = rtn + pEnglishGetNumber(iThousand, true) + " Thousand "; //@@@: rtn = rtn + pEnglishGetNumber(iThousand, true) + " Thousand ";
                iNumber = iNumber - (iThousand * 1000); //@@@: iNumber = iNumber - (iThousand * 1000);
            } //@@@: }

            rtn = rtn + pEnglishGetNumber(Math.Truncate(iNumber), false); //@@@: rtn = rtn + pEnglishGetNumber(Math.Truncate(iNumber), false);
            rtn = rtn + pEnglishGetDecimal(iNumber); //@@@: rtn = rtn + pEnglishGetDecimal(iNumber);

            return rtn.Substring(0, 1).ToUpper() + rtn.Substring(2).ToLower(); //@@@: return rtn.Substring(0, 1).ToUpper() + rtn.Substring(2).ToLower();
        }; //@@@: }

        /////////////////////////////////////////////////////////////////////////////////////
        // Spanish

        const pSpanishGetNumber = function(iNumber, bPutOne) { //@@@: private String pSpanishGetNumber(double iNumber, bool bPutOne)
            let rtn = ""; //@@@: String rtn = "";
            let iTens = 0; //@@@: double iTens = 0;
            let iUnit = 0; //@@@: double iUnit = 0;
            let iNumAux = 0; //@@@: double iNumAux = 0;
            let bPutOneAux = false; //@@@: bool bPutOneAux = false;

            if (iNumber === 100) { //@@@: if (iNumber == 100)
                rtn = "Cien "; //@@@: rtn = "Cien ";
            } //@@@: }
            else { //@@@: else
                if (iNumber > 100) { //@@@: if (iNumber > 100)
                    iNumAux = iNumber; //@@@: iNumAux = iNumber;
                    rtn = pSpanishGetNameHundred(iNumAux) + " "; //@@@: rtn = pSpanishGetNameHundred(iNumAux) + " ";
                    iTens = pGetHundred(iNumAux); //@@@: iTens = pGetHundred(iNumAux);
                    bPutOne = false; //@@@: bPutOne = false;
                } //@@@: }
                else { //@@@: else
                    iTens = iNumber; //@@@: iTens = iNumber;
                } //@@@: }
            } //@@@: }

            if (iTens !== 0) { //@@@: if (iTens != 0)
                if (iTens >= 1 && iTens <= 15) { //@@@: if (iTens >= 1 && iTens <= 15)
                    bPutOneAux = bPutOne; //@@@: bPutOneAux = bPutOne;
                    rtn = rtn + pSpanishGetNameNumber(iTens, bPutOneAux); //@@@: rtn = rtn + pSpanishGetNameNumber(iTens, bPutOneAux);
                } //@@@: }
                else { //@@@: else
                    if (iTens >= 16 && iTens <= 19) { //@@@: if (iTens >= 16 && iTens <= 19)
                        rtn = rtn + "Dieci" + pSpanishGetNameNumber(Math.Truncate(iTens - 10), bPutOne); //@@@: rtn = rtn + "Dieci" + pSpanishGetNameNumber(Math.Truncate(iTens - 10), bPutOne);
                    } //@@@: }
                    else { //@@@: else
                        if (iTens === 20) { //@@@: if (iTens == 20)
                            rtn = rtn + "Veinte"; //@@@: rtn = rtn + "Veinte";
                        } //@@@: }
                        else { //@@@: else
                            if (iTens >= 21 && iTens <= 29) { //@@@: if (iTens >= 21 && iTens <= 29)
                                rtn = rtn + "Venti" + pSpanishGetNameNumber(Math.Truncate(iTens - 20), bPutOne); //@@@: rtn = rtn + "Venti" + pSpanishGetNameNumber(Math.Truncate(iTens - 20), bPutOne);
                            } //@@@: }
                            else { //@@@: else
                                if (iTens >= 30) { //@@@: if (iTens >= 30)
                                    rtn = rtn + pSpanishGetNameTens(iTens); //@@@: rtn = rtn + pSpanishGetNameTens(iTens);
                                    iUnit = pGetUnit(iTens); //@@@: iUnit = pGetUnit(iTens);
                                    rtn = rtn + (iUnit === 0 ? "" : " y "); //@@@: rtn = rtn + (iUnit == 0 ? "" : " y ");
                                    rtn = rtn + pSpanishGetNameNumber(iUnit, bPutOne); //@@@: rtn = rtn + pSpanishGetNameNumber(iUnit, bPutOne);
                                } //@@@: }
                            } //@@@: }
                        } //@@@: }
                    } //@@@: }
                } //@@@: }
            } //@@@: }

            return rtn; //@@@: return rtn;
        }; //@@@: }

        const pSpanishGetNameNumber = function(iNumber, bPutOne) { //@@@: private String pSpanishGetNameNumber(double iNumber, bool bPutOne)
            switch (iNumber) //@@@: switch ((long)iNumber)
            { //@@@: {
                case 1: //@@@: case 1:
                    if (bPutOne) { //@@@: if (bPutOne)
                        return "Un"; //@@@: return "Un";
                    } //@@@: }
                    else { //@@@: else
                        return "Uno"; //@@@: return "Uno";
                    } //@@@: }
                case 2: return "Dos"; //@@@: case 2: return "Dos";
                case 3: return "Tres"; //@@@: case 3: return "Tres";
                case 4: return "Cuatro"; //@@@: case 4: return "Cuatro";
                case 5: return "Cinco"; //@@@: case 5: return "Cinco";
                case 6: return "Seis"; //@@@: case 6: return "Seis";
                case 7: return "Siete"; //@@@: case 7: return "Siete";
                case 8: return "Ocho"; //@@@: case 8: return "Ocho";
                case 9: return "Nueve"; //@@@: case 9: return "Nueve";
                case 10: return "Diez"; //@@@: case 10: return "Diez";
                case 11: return "Once"; //@@@: case 11: return "Once";
                case 12: return "Doce"; //@@@: case 12: return "Doce";
                case 13: return "Trece"; //@@@: case 13: return "Trece";
                case 14: return "Catorce"; //@@@: case 14: return "Catorce";
                case 15: return "Quince"; //@@@: case 15: return "Quince";
                default: return ""; //@@@: default: return "";
            } //@@@: }
        }; //@@@: }

        const pSpanishGetNameHundred = function(iNumber) { //@@@: private String pSpanishGetNameHundred(double iNumber)
            let number = iNumber; //@@@: long number = (long)iNumber;

            if (number >= 900) return "Novecientos"; { //@@@: if (number >= 900) return "Novecientos";
            else if (number >= 800) return "Ochocientos"; { //@@@: else if (number >= 800) return "Ochocientos";
            else if (number >= 700) return "Setecientos"; { //@@@: else if (number >= 700) return "Setecientos";
            else if (number >= 600) return "Seiscientos"; { //@@@: else if (number >= 600) return "Seiscientos";
            else if (number >= 500) return "Quinientos"; { //@@@: else if (number >= 500) return "Quinientos";
            else if (number >= 400) return "Cuatrocientos"; { //@@@: else if (number >= 400) return "Cuatrocientos";
            else if (number >= 300) return "trescientos"; { //@@@: else if (number >= 300) return "trescientos";
            else if (number >= 200) return "Doscientos"; { //@@@: else if (number >= 200) return "Doscientos";
            else if (number >= 100) return "Ciento"; { //@@@: else if (number >= 100) return "Ciento";
            else return ""; { //@@@: else return "";
        }; //@@@: }

        const pSpanishGetNameTens = function(iNumber) { //@@@: private String pSpanishGetNameTens(double iNumber)
            let number = iNumber; //@@@: long number = (long)iNumber;

            if (number >= 90) return "Noventa"; { //@@@: if (number >= 90) return "Noventa";
            else if (number >= 80) return "Ochenta"; { //@@@: else if (number >= 80) return "Ochenta";
            else if (number >= 70) return "Setenta"; { //@@@: else if (number >= 70) return "Setenta";
            else if (number >= 60) return "Sesenta"; { //@@@: else if (number >= 60) return "Sesenta";
            else if (number >= 50) return "Cincuenta"; { //@@@: else if (number >= 50) return "Cincuenta";
            else if (number >= 40) return "Cuarenta"; { //@@@: else if (number >= 40) return "Cuarenta";
            else if (number >= 30) return "Treinta"; { //@@@: else if (number >= 30) return "Treinta";
            else return ""; { //@@@: else return "";
        }; //@@@: }

        const pSpanishGetDecimal = function(iNumber) { //@@@: private String pSpanishGetDecimal(double iNumber)
            return pGetDecimalAux(iNumber, "con"); //@@@: return pGetDecimalAux(iNumber, "con");
        }; //@@@: }

        /////////////////////////////////////////////////////////////////////////////////////
        // French

        const pFrenchGetNumber = function(iNumber, bPutOne) { //@@@: private String pFrenchGetNumber(double iNumber, bool bPutOne)
            let rtn = ""; //@@@: String rtn = "";
            let iTens = 0; //@@@: double iTens = 0;
            let iUnit = 0; //@@@: double iUnit = 0;
            let iNumAux = 0; //@@@: double iNumAux = 0;
            let bPutOneAux = false; //@@@: bool bPutOneAux = false;

            if (iNumber === 100) { //@@@: if (iNumber == 100)
                rtn = "Cent "; //@@@: rtn = "Cent ";
            } //@@@: }
            else { //@@@: else
                if (iNumber > 100) { //@@@: if (iNumber > 100)
                    iNumAux = iNumber; //@@@: iNumAux = iNumber;
                    rtn = pFrenchGetNameHundred(iNumAux) + " "; //@@@: rtn = pFrenchGetNameHundred(iNumAux) + " ";
                    iTens = pGetHundred(iNumAux); //@@@: iTens = pGetHundred(iNumAux);
                    bPutOne = false; //@@@: bPutOne = false;
                } //@@@: }
                else { //@@@: else
                    iTens = iNumber; //@@@: iTens = iNumber;
                } //@@@: }
            } //@@@: }

            if (iTens !== 0) { //@@@: if (iTens != 0)
                if (iTens >= 1 && iTens <= 16) { //@@@: if (iTens >= 1 && iTens <= 16)
                    bPutOneAux = bPutOne; //@@@: bPutOneAux = bPutOne;
                    rtn = rtn + pFrenchGetNameNumber(iTens, bPutOneAux); //@@@: rtn = rtn + pFrenchGetNameNumber(iTens, bPutOneAux);
                } //@@@: }
                else { //@@@: else
                    if (iTens >= 17 && iTens <= 19) { //@@@: if (iTens >= 17 && iTens <= 19)
                        rtn = rtn + "Dix " + pFrenchGetNameNumber(Math.Truncate(iTens - 10), bPutOne); //@@@: rtn = rtn + "Dix " + pFrenchGetNameNumber(Math.Truncate(iTens - 10), bPutOne);
                    } //@@@: }
                    else { //@@@: else
                        if (iTens === 20) { //@@@: if (iTens == 20)
                            rtn = rtn + "Vingt"; //@@@: rtn = rtn + "Vingt";
                        } //@@@: }
                        else { //@@@: else
                            if (iTens >= 21 && iTens <= 29) { //@@@: if (iTens >= 21 && iTens <= 29)
                                if (iTens === 21) { //@@@: if (iTens == 21)
                                    rtn = rtn + "Vingt et un"; //@@@: rtn = rtn + "Vingt et un";
                                } //@@@: }
                                else { //@@@: else
                                    rtn = rtn + "Vingt " + pFrenchGetNameNumber(Math.Truncate(iTens - 20), bPutOne); //@@@: rtn = rtn + "Vingt " + pFrenchGetNameNumber(Math.Truncate(iTens - 20), bPutOne);
                                } //@@@: }
                            } //@@@: }
                            else { //@@@: else
                                iUnit = pGetUnit(iTens); //@@@: iUnit = pGetUnit(iTens);
                                if (!(iTens >= 70 && iTens < 80) && !(iTens >= 90)) { //@@@: if (!(iTens >= 70 && iTens < 80) && !(iTens >= 90))
                                    rtn = rtn + pFrenchGetNameTens(iTens); //@@@: rtn = rtn + pFrenchGetNameTens(iTens);
                                    if (iUnit === 1) { //@@@: if (iUnit == 1)
                                        rtn = rtn + " et "; //@@@: rtn = rtn + " et ";
                                    } //@@@: }
                                    if (iUnit > 1) { //@@@: if (iUnit > 1)
                                        rtn = rtn + " "; //@@@: rtn = rtn + " ";
                                    } //@@@: }
                                    rtn = rtn + pFrenchGetNameNumber(iUnit, bPutOne); //@@@: rtn = rtn + pFrenchGetNameNumber(iUnit, bPutOne);
                                } //@@@: }
                                else { //@@@: else
                                    rtn = rtn + pFrenchGetNameTens(iTens) + pFrenchGetNameNumber(iUnit + 10, true); //@@@: rtn = rtn + pFrenchGetNameTens(iTens) + pFrenchGetNameNumber(iUnit + 10, true);
                                } //@@@: }
                            } //@@@: }
                        } //@@@: }
                    } //@@@: }
                } //@@@: }
            } //@@@: }

            return rtn; //@@@: return rtn;
        }; //@@@: }

        const pFrenchGetNameNumber = function(iNumber, bPutOne) { //@@@: private String pFrenchGetNameNumber(double iNumber, bool bPutOne)
            switch (iNumber) //@@@: switch ((long)iNumber)
            { //@@@: {
                case 1: //@@@: case 1:
                    if (bPutOne) { //@@@: if (bPutOne)
                        return "Un"; //@@@: return "Un";
                    } //@@@: }
                    else { //@@@: else
                        return "Un"; //@@@: return "Un";
                    } //@@@: }
                case 2: return "Deux"; //@@@: case 2: return "Deux";
                case 3: return "Trois"; //@@@: case 3: return "Trois";
                case 4: return "Quatre"; //@@@: case 4: return "Quatre";
                case 5: return "Cinq"; //@@@: case 5: return "Cinq";
                case 6: return "Six"; //@@@: case 6: return "Six";
                case 7: return "Sept"; //@@@: case 7: return "Sept";
                case 8: return "Huit"; //@@@: case 8: return "Huit";
                case 9: return "Neuf"; //@@@: case 9: return "Neuf";
                case 10: return "Dix"; //@@@: case 10: return "Dix";
                case 11: return "Onze"; //@@@: case 11: return "Onze";
                case 12: return "Douze"; //@@@: case 12: return "Douze";
                case 13: return "Treize"; //@@@: case 13: return "Treize";
                case 14: return "Quatorze"; //@@@: case 14: return "Quatorze";
                case 15: return "Quinze"; //@@@: case 15: return "Quinze";
                case 16: return "Seize"; //@@@: case 16: return "Seize";
                case 17: //@@@: case 17:
                case 18: //@@@: case 18:
                case 19: return "Dix " + pFrenchGetNameNumber(Math.Truncate(iNumber - 10), bPutOne); //@@@: case 19: return "Dix " + pFrenchGetNameNumber(Math.Truncate(iNumber - 10), bPutOne);
                default: return ""; //@@@: default: return "";
            } //@@@: }
        }; //@@@: }

        const pFrenchGetNameHundred = function(iNumber) { //@@@: private String pFrenchGetNameHundred(double iNumber)
            let rtn = ""; //@@@: String rtn = "";
            let number = iNumber; //@@@: long number = (long)iNumber;

            if (number >= 900) rtn = "Neuf "; { //@@@: if (number >= 900) rtn = "Neuf ";
            else if (number >= 800) rtn = "Huit "; { //@@@: else if (number >= 800) rtn = "Huit ";
            else if (number >= 700) rtn = "Sept "; { //@@@: else if (number >= 700) rtn = "Sept ";
            else if (number >= 600) rtn = "Six "; { //@@@: else if (number >= 600) rtn = "Six ";
            else if (number >= 500) rtn = "Cinq "; { //@@@: else if (number >= 500) rtn = "Cinq ";
            else if (number >= 400) rtn = "Quatre "; { //@@@: else if (number >= 400) rtn = "Quatre ";
            else if (number >= 300) rtn = "Trois "; { //@@@: else if (number >= 300) rtn = "Trois ";
            else if (number >= 200) rtn = "Deux "; { //@@@: else if (number >= 200) rtn = "Deux ";
            else if (number >= 100) rtn = ""; { //@@@: else if (number >= 100) rtn = "";

            if (number >= 200) { //@@@: if (number >= 200)
                rtn = rtn + "Cents"; //@@@: rtn = rtn + "Cents";
            } //@@@: }
            else { //@@@: else
                rtn = rtn + "Cent"; //@@@: rtn = rtn + "Cent";
            } //@@@: }

            return rtn; //@@@: return rtn;
        }; //@@@: }

        const pFrenchGetNameTens = function(iNumber) { //@@@: private String pFrenchGetNameTens(double iNumber)
            let number = iNumber; //@@@: long number = (long)iNumber;

            if (number >= 90) return "Quatre Vingt "; { //@@@: if (number >= 90) return "Quatre Vingt ";
            else if (number >= 80) return "Quatre Vingt"; { //@@@: else if (number >= 80) return "Quatre Vingt";
            else if (number >= 70) return "Soixante "; { //@@@: else if (number >= 70) return "Soixante ";
            else if (number >= 60) return "Soixante"; { //@@@: else if (number >= 60) return "Soixante";
            else if (number >= 50) return "Cinquante"; { //@@@: else if (number >= 50) return "Cinquante";
            else if (number >= 40) return "Quarante"; { //@@@: else if (number >= 40) return "Quarante";
            else if (number >= 30) return "Treinte"; { //@@@: else if (number >= 30) return "Treinte";
            else return ""; { //@@@: else return "";
        }; //@@@: }

        const pFrenchGetDecimal = function(iNumber) { //@@@: private String pFrenchGetDecimal(double iNumber)
            return pGetDecimalAux(iNumber, "Avec"); //@@@: return pGetDecimalAux(iNumber, "Avec");
        }; //@@@: }

        /////////////////////////////////////////////////////////////////////////////////////
        // English

        const pEnglishGetNumber = function(iNumber, bPutOne) { //@@@: private String pEnglishGetNumber(double iNumber, bool bPutOne)
            let rtn = ""; //@@@: String rtn = "";
            let iTens = 0; //@@@: double iTens = 0;
            let iUnit = 0; //@@@: double iUnit = 0;
            let iNumAux = 0; //@@@: double iNumAux = 0;
            let bPutOneAux = false; //@@@: bool bPutOneAux = false;

            if (iNumber === 100) { //@@@: if (iNumber == 100)
                rtn = "Hundred "; //@@@: rtn = "Hundred ";
            } //@@@: }
            else { //@@@: else
                if (iNumber > 100) { //@@@: if (iNumber > 100)
                    iNumAux = iNumber; //@@@: iNumAux = iNumber;
                    rtn = pEnglishGetNameHundred(iNumAux) + " "; //@@@: rtn = pEnglishGetNameHundred(iNumAux) + " ";
                    iTens = pGetHundred(iNumAux); //@@@: iTens = pGetHundred(iNumAux);
                    bPutOne = false; //@@@: bPutOne = false;
                } //@@@: }
                else { //@@@: else
                    iTens = iNumber; //@@@: iTens = iNumber;
                } //@@@: }
            } //@@@: }

            if (iTens !== 0) { //@@@: if (iTens != 0)
                if (iTens >= 1 && iTens <= 15) { //@@@: if (iTens >= 1 && iTens <= 15)
                    bPutOneAux = bPutOne; //@@@: bPutOneAux = bPutOne;
                    rtn = rtn + pEnglishGetNameNumber(iTens); //@@@: rtn = rtn + pEnglishGetNameNumber(iTens);
                } //@@@: }
                else { //@@@: else
                    if (iTens >= 16 && iTens <= 19) { //@@@: if (iTens >= 16 && iTens <= 19)
                        rtn = rtn + pEnglishGetNameNumber(Math.Truncate(iTens - 10)) + "teen"; //@@@: rtn = rtn + pEnglishGetNameNumber(Math.Truncate(iTens - 10)) + "teen";
                    } //@@@: }
                    else { //@@@: else
                        if (iTens === 20) { //@@@: if (iTens == 20)
                            rtn = rtn + "twenty"; //@@@: rtn = rtn + "twenty";
                        } //@@@: }
                        else { //@@@: else
                            rtn = rtn + pEnglishGetNameTens(iTens); //@@@: rtn = rtn + pEnglishGetNameTens(iTens);
                            iUnit = pGetUnit(iTens); //@@@: iUnit = pGetUnit(iTens);
                            rtn = rtn + " "; //@@@: rtn = rtn + " ";
                            rtn = rtn + pEnglishGetNameNumber(iUnit); //@@@: rtn = rtn + pEnglishGetNameNumber(iUnit);
                        } //@@@: }
                    } //@@@: }
                } //@@@: }
            } //@@@: }

            return rtn; //@@@: return rtn;
        }; //@@@: }

        const pEnglishGetNameNumber = function(iNumber) { //@@@: private String pEnglishGetNameNumber(double iNumber)
            switch (iNumber) //@@@: switch ((long)iNumber)
            { //@@@: {
                case 1: return "One"; //@@@: case 1: return "One";
                case 2: return "Two"; //@@@: case 2: return "Two";
                case 3: return "Three"; //@@@: case 3: return "Three";
                case 4: return "Four"; //@@@: case 4: return "Four";
                case 5: return "Five"; //@@@: case 5: return "Five";
                case 6: return "Six"; //@@@: case 6: return "Six";
                case 7: return "Seven"; //@@@: case 7: return "Seven";
                case 8: return "Eight"; //@@@: case 8: return "Eight";
                case 9: return "Nine"; //@@@: case 9: return "Nine";
                case 10: return "Ten"; //@@@: case 10: return "Ten";
                case 11: return "Eleven"; //@@@: case 11: return "Eleven";
                case 12: return "Twelve"; //@@@: case 12: return "Twelve";
                case 13: return "Thirteen"; //@@@: case 13: return "Thirteen";
                case 14: return "Fourteen"; //@@@: case 14: return "Fourteen";
                case 15: return "Fifteen"; //@@@: case 15: return "Fifteen";
                default: return ""; //@@@: default: return "";
            } //@@@: }
        }; //@@@: }

        const pEnglishGetNameHundred = function(iNumber) { //@@@: private String pEnglishGetNameHundred(double iNumber)
            return pEnglishGetNameNumber() + " Hundred"; //@@@: return pEnglishGetNameNumber((long)(iNumber / 100)) + " Hundred";
        }; //@@@: }

        const pEnglishGetNameTens = function(iNumber) { //@@@: private String pEnglishGetNameTens(double iNumber)
            let number = iNumber; //@@@: long number = (long)iNumber;

            if (number >= 90) return "Ninety"; { //@@@: if (number >= 90) return "Ninety";
            else if (number >= 80) return "Eighty"; { //@@@: else if (number >= 80) return "Eighty";
            else if (number >= 70) return "Seventy"; { //@@@: else if (number >= 70) return "Seventy";
            else if (number >= 60) return "Sixty"; { //@@@: else if (number >= 60) return "Sixty";
            else if (number >= 50) return "Fifty"; { //@@@: else if (number >= 50) return "Fifty";
            else if (number >= 40) return "Forty"; { //@@@: else if (number >= 40) return "Forty";
            else if (number >= 30) return "Thirty"; { //@@@: else if (number >= 30) return "Thirty";
            else if (number >= 20) return "Twenty"; { //@@@: else if (number >= 20) return "Twenty";
            else return ""; { //@@@: else return "";
        }; //@@@: }

        const pEnglishGetDecimal = function(iNumber) { //@@@: private String pEnglishGetDecimal(double iNumber)
            return pGetDecimalAux(iNumber, "with"); //@@@: return pGetDecimalAux(iNumber, "with");
        }; //@@@: }

        // generics
        //
        const pGetDecimalAux = function(iNumber, word) { //@@@: private String pGetDecimalAux(double iNumber, String word)
            let iDecimal = 0; //@@@: double iDecimal = 0;

            iNumber = Math.Round(iNumber, 2); //@@@: iNumber = Math.Round(iNumber, 2);
            iDecimal = Math.Round((iNumber - Math.Truncate(iNumber)) * 100, 2); //@@@: iDecimal = Math.Round((iNumber - Math.Truncate(iNumber)) * 100, 2);
            if (iDecimal !== 0) { //@@@: if (iDecimal != 0)
                return " " + word + " " + iDecimal.ToString() + "/100"; //@@@: return " " + word + " " + iDecimal.ToString() + "/100";
            else { //@@@: else
                return ""; //@@@: return "";
        }; //@@@: }

        const pGetUnit = function(iTens) { //@@@: private double pGetUnit(double iTens)
            return iTens - (Math.Truncate(iTens / 10) * 10); //@@@: return iTens - (Math.Truncate(iTens / 10) * 10);
        }; //@@@: }

        const pGetHundred = function(iHundred) { //@@@: private double pGetHundred(double iHundred)
            return iHundred - (Math.Truncate(iHundred / 100) * 100); //@@@: return iHundred - (Math.Truncate(iHundred / 100) * 100);
        }; //@@@: }

        const pGetValue = function(iNumber, iDividing) { //@@@: private double pGetValue(double iNumber, double iDividing)
            return Math.Truncate(Math.Truncate(iNumber) / iDividing); //@@@: return Math.Truncate(Math.Truncate(iNumber) / iDividing);
        }; //@@@: }

        return self;

    } //@@@: }

}(globalObject)); //@@@: }
