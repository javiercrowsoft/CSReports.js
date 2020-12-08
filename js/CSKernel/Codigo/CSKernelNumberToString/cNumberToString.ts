(function(globalObject) {

    globalObject.CSKernelNumberToString = globalObject.CSKernelNumberToString || {};

    globalObject.CSKernelNumberToString.createCNumberToString = function() {

        const self = {};

        const C_MODULE = "cNumberToString";

        self.secondsToString = function(count) {
            let hours = 0;
            let minutes = 0;
            let second = 0;

            hours = count / 3600;
            minutes =  / 60;
            second =  % 60;

            return hours.ToString("{0:00}")
                + ":" + minutes.ToString("{0:00}")
                + ":" + second.ToString("{0:00}");
        };

        self.spanishNumberToString = function(iNumber) {
            let iMillion = 0;
            let iThousand = 0;
            let rtn = "";

            iNumber = Math.Round(iNumber, 2);

            if (iNumber >= 1000000) {
                iMillion = pGetValue(iNumber, 1000000);
                if (iNumber >= 2000000) {
                    rtn = pSpanishGetNumber(iMillion, true) + " Millones ";
                }
                else {
                    rtn = pSpanishGetNumber(iMillion, true) + " Millon ";
                }
                iNumber = iNumber - (iMillion * 1000000);
            }

            if (iNumber >= 1000) {
                iThousand = pGetValue(iNumber, 1000);
                rtn = rtn + pSpanishGetNumber(iThousand, true) + " Mil ";
                iNumber = iNumber - (iThousand * 1000);
            }

            rtn = rtn + pSpanishGetNumber(Math.Truncate(iNumber), false);
            rtn = rtn + pSpanishGetDecimal(iNumber);

            return rtn.Substring(0, 1).ToUpper() + rtn.Substring(1).ToLower();
        };

        self.frenchNumberToString = function(iNumber) {
            let iMillion = 0;
            let iThousand = 0;
            let rtn = "";

            iNumber = Math.Round(iNumber, 2);

            if (iNumber >= 1000000) {
                iMillion = pGetValue(iNumber, 1000000);
                if (iNumber >= 2000000) {
                    rtn = pFrenchGetNumber(iMillion, true) + " Millions ";
                }
                else {
                    rtn = pFrenchGetNumber(iMillion, true) + " Million ";
                }
                iNumber = iNumber - (iMillion * 1000000);
            }

            if (iNumber >= 1000) {
                iThousand = pGetValue(iNumber, 1000);
                if (iThousand === 1) {
                    rtn = " Mil ";
                }
                else {
                    rtn = rtn + pFrenchGetNumber(iThousand, false) + " Mil ";
                }
                iNumber = iNumber - (iThousand * 1000);
            }

            rtn = rtn + pFrenchGetNumber(Math.Truncate(iNumber), false);
            rtn = rtn + pFrenchGetDecimal(iNumber);

            return rtn.Substring(0, 1).ToUpper() + rtn.Substring(2).ToLower();
        };

        self.englishNumberToString = function(iNumber) {
            let iMillion = 0;
            let iThousand = 0;
            let rtn = "";

            iNumber = Math.Round(iNumber, 2);

            if (iNumber >= 1000000) {
                iMillion = pGetValue(iNumber, 1000000);
                rtn = pEnglishGetNumber(iMillion, true) + " Million ";
                iNumber = iNumber - (iMillion * 1000000);
            }

            if (iNumber >= 1000) {
                iThousand = pGetValue(iNumber, 1000);
                rtn = rtn + pEnglishGetNumber(iThousand, true) + " Thousand ";
                iNumber = iNumber - (iThousand * 1000);
            }

            rtn = rtn + pEnglishGetNumber(Math.Truncate(iNumber), false);
            rtn = rtn + pEnglishGetDecimal(iNumber);

            return rtn.Substring(0, 1).ToUpper() + rtn.Substring(2).ToLower();
        };

        /////////////////////////////////////////////////////////////////////////////////////
        // Spanish

        const pSpanishGetNumber = function(iNumber, bPutOne) {
            let rtn = "";
            let iTens = 0;
            let iUnit = 0;
            let iNumAux = 0;
            let bPutOneAux = false;

            if (iNumber === 100) {
                rtn = "Cien ";
            }
            else {
                if (iNumber > 100) {
                    iNumAux = iNumber;
                    rtn = pSpanishGetNameHundred(iNumAux) + " ";
                    iTens = pGetHundred(iNumAux);
                    bPutOne = false;
                }
                else {
                    iTens = iNumber;
                }
            }

            if (iTens !== 0) {
                if (iTens >= 1 && iTens <= 15) {
                    bPutOneAux = bPutOne;
                    rtn = rtn + pSpanishGetNameNumber(iTens, bPutOneAux);
                }
                else {
                    if (iTens >= 16 && iTens <= 19) {
                        rtn = rtn + "Dieci" + pSpanishGetNameNumber(Math.Truncate(iTens - 10), bPutOne);
                    }
                    else {
                        if (iTens === 20) {
                            rtn = rtn + "Veinte";
                        }
                        else {
                            if (iTens >= 21 && iTens <= 29) {
                                rtn = rtn + "Venti" + pSpanishGetNameNumber(Math.Truncate(iTens - 20), bPutOne);
                            }
                            else {
                                if (iTens >= 30) {
                                    rtn = rtn + pSpanishGetNameTens(iTens);
                                    iUnit = pGetUnit(iTens);
                                    rtn = rtn + (iUnit === 0 ? "" : " y ");
                                    rtn = rtn + pSpanishGetNameNumber(iUnit, bPutOne);
                                }
                            }
                        }
                    }
                }
            }

            return rtn;
        };

        const pSpanishGetNameNumber = function(iNumber, bPutOne) {
            switch (iNumber)
            {
                case 1:
                    if (bPutOne) {
                        return "Un";
                    }
                    else {
                        return "Uno";
                    }
                case 2: return "Dos";
                case 3: return "Tres";
                case 4: return "Cuatro";
                case 5: return "Cinco";
                case 6: return "Seis";
                case 7: return "Siete";
                case 8: return "Ocho";
                case 9: return "Nueve";
                case 10: return "Diez";
                case 11: return "Once";
                case 12: return "Doce";
                case 13: return "Trece";
                case 14: return "Catorce";
                case 15: return "Quince";
                default: return "";
            }
        };

        const pSpanishGetNameHundred = function(iNumber) {
            let number = iNumber;

            if (number >= 900) return "Novecientos"; {
            else if (number >= 800) return "Ochocientos"; {
            else if (number >= 700) return "Setecientos"; {
            else if (number >= 600) return "Seiscientos"; {
            else if (number >= 500) return "Quinientos"; {
            else if (number >= 400) return "Cuatrocientos"; {
            else if (number >= 300) return "trescientos"; {
            else if (number >= 200) return "Doscientos"; {
            else if (number >= 100) return "Ciento"; {
            else return ""; {
        };

        const pSpanishGetNameTens = function(iNumber) {
            let number = iNumber;

            if (number >= 90) return "Noventa"; {
            else if (number >= 80) return "Ochenta"; {
            else if (number >= 70) return "Setenta"; {
            else if (number >= 60) return "Sesenta"; {
            else if (number >= 50) return "Cincuenta"; {
            else if (number >= 40) return "Cuarenta"; {
            else if (number >= 30) return "Treinta"; {
            else return ""; {
        };

        const pSpanishGetDecimal = function(iNumber) {
            return pGetDecimalAux(iNumber, "con");
        };

        /////////////////////////////////////////////////////////////////////////////////////
        // French

        const pFrenchGetNumber = function(iNumber, bPutOne) {
            let rtn = "";
            let iTens = 0;
            let iUnit = 0;
            let iNumAux = 0;
            let bPutOneAux = false;

            if (iNumber === 100) {
                rtn = "Cent ";
            }
            else {
                if (iNumber > 100) {
                    iNumAux = iNumber;
                    rtn = pFrenchGetNameHundred(iNumAux) + " ";
                    iTens = pGetHundred(iNumAux);
                    bPutOne = false;
                }
                else {
                    iTens = iNumber;
                }
            }

            if (iTens !== 0) {
                if (iTens >= 1 && iTens <= 16) {
                    bPutOneAux = bPutOne;
                    rtn = rtn + pFrenchGetNameNumber(iTens, bPutOneAux);
                }
                else {
                    if (iTens >= 17 && iTens <= 19) {
                        rtn = rtn + "Dix " + pFrenchGetNameNumber(Math.Truncate(iTens - 10), bPutOne);
                    }
                    else {
                        if (iTens === 20) {
                            rtn = rtn + "Vingt";
                        }
                        else {
                            if (iTens >= 21 && iTens <= 29) {
                                if (iTens === 21) {
                                    rtn = rtn + "Vingt et un";
                                }
                                else {
                                    rtn = rtn + "Vingt " + pFrenchGetNameNumber(Math.Truncate(iTens - 20), bPutOne);
                                }
                            }
                            else {
                                iUnit = pGetUnit(iTens);
                                if (!(iTens >= 70 && iTens < 80) && !(iTens >= 90)) {
                                    rtn = rtn + pFrenchGetNameTens(iTens);
                                    if (iUnit === 1) {
                                        rtn = rtn + " et ";
                                    }
                                    if (iUnit > 1) {
                                        rtn = rtn + " ";
                                    }
                                    rtn = rtn + pFrenchGetNameNumber(iUnit, bPutOne);
                                }
                                else {
                                    rtn = rtn + pFrenchGetNameTens(iTens) + pFrenchGetNameNumber(iUnit + 10, true);
                                }
                            }
                        }
                    }
                }
            }

            return rtn;
        };

        const pFrenchGetNameNumber = function(iNumber, bPutOne) {
            switch (iNumber)
            {
                case 1:
                    if (bPutOne) {
                        return "Un";
                    }
                    else {
                        return "Un";
                    }
                case 2: return "Deux";
                case 3: return "Trois";
                case 4: return "Quatre";
                case 5: return "Cinq";
                case 6: return "Six";
                case 7: return "Sept";
                case 8: return "Huit";
                case 9: return "Neuf";
                case 10: return "Dix";
                case 11: return "Onze";
                case 12: return "Douze";
                case 13: return "Treize";
                case 14: return "Quatorze";
                case 15: return "Quinze";
                case 16: return "Seize";
                case 17:
                case 18:
                case 19: return "Dix " + pFrenchGetNameNumber(Math.Truncate(iNumber - 10), bPutOne);
                default: return "";
            }
        };

        const pFrenchGetNameHundred = function(iNumber) {
            let rtn = "";
            let number = iNumber;

            if (number >= 900) rtn = "Neuf "; {
            else if (number >= 800) rtn = "Huit "; {
            else if (number >= 700) rtn = "Sept "; {
            else if (number >= 600) rtn = "Six "; {
            else if (number >= 500) rtn = "Cinq "; {
            else if (number >= 400) rtn = "Quatre "; {
            else if (number >= 300) rtn = "Trois "; {
            else if (number >= 200) rtn = "Deux "; {
            else if (number >= 100) rtn = ""; {

            if (number >= 200) {
                rtn = rtn + "Cents";
            }
            else {
                rtn = rtn + "Cent";
            }

            return rtn;
        };

        const pFrenchGetNameTens = function(iNumber) {
            let number = iNumber;

            if (number >= 90) return "Quatre Vingt "; {
            else if (number >= 80) return "Quatre Vingt"; {
            else if (number >= 70) return "Soixante "; {
            else if (number >= 60) return "Soixante"; {
            else if (number >= 50) return "Cinquante"; {
            else if (number >= 40) return "Quarante"; {
            else if (number >= 30) return "Treinte"; {
            else return ""; {
        };

        const pFrenchGetDecimal = function(iNumber) {
            return pGetDecimalAux(iNumber, "Avec");
        };

        /////////////////////////////////////////////////////////////////////////////////////
        // English

        const pEnglishGetNumber = function(iNumber, bPutOne) {
            let rtn = "";
            let iTens = 0;
            let iUnit = 0;
            let iNumAux = 0;
            let bPutOneAux = false;

            if (iNumber === 100) {
                rtn = "Hundred ";
            }
            else {
                if (iNumber > 100) {
                    iNumAux = iNumber;
                    rtn = pEnglishGetNameHundred(iNumAux) + " ";
                    iTens = pGetHundred(iNumAux);
                    bPutOne = false;
                }
                else {
                    iTens = iNumber;
                }
            }

            if (iTens !== 0) {
                if (iTens >= 1 && iTens <= 15) {
                    bPutOneAux = bPutOne;
                    rtn = rtn + pEnglishGetNameNumber(iTens);
                }
                else {
                    if (iTens >= 16 && iTens <= 19) {
                        rtn = rtn + pEnglishGetNameNumber(Math.Truncate(iTens - 10)) + "teen";
                    }
                    else {
                        if (iTens === 20) {
                            rtn = rtn + "twenty";
                        }
                        else {
                            rtn = rtn + pEnglishGetNameTens(iTens);
                            iUnit = pGetUnit(iTens);
                            rtn = rtn + " ";
                            rtn = rtn + pEnglishGetNameNumber(iUnit);
                        }
                    }
                }
            }

            return rtn;
        };

        const pEnglishGetNameNumber = function(iNumber) {
            switch (iNumber)
            {
                case 1: return "One";
                case 2: return "Two";
                case 3: return "Three";
                case 4: return "Four";
                case 5: return "Five";
                case 6: return "Six";
                case 7: return "Seven";
                case 8: return "Eight";
                case 9: return "Nine";
                case 10: return "Ten";
                case 11: return "Eleven";
                case 12: return "Twelve";
                case 13: return "Thirteen";
                case 14: return "Fourteen";
                case 15: return "Fifteen";
                default: return "";
            }
        };

        const pEnglishGetNameHundred = function(iNumber) {
            return pEnglishGetNameNumber() + " Hundred";
        };

        const pEnglishGetNameTens = function(iNumber) {
            let number = iNumber;

            if (number >= 90) return "Ninety"; {
            else if (number >= 80) return "Eighty"; {
            else if (number >= 70) return "Seventy"; {
            else if (number >= 60) return "Sixty"; {
            else if (number >= 50) return "Fifty"; {
            else if (number >= 40) return "Forty"; {
            else if (number >= 30) return "Thirty"; {
            else if (number >= 20) return "Twenty"; {
            else return ""; {
        };

        const pEnglishGetDecimal = function(iNumber) {
            return pGetDecimalAux(iNumber, "with");
        };

        // generics
        //
        const pGetDecimalAux = function(iNumber, word) {
            let iDecimal = 0;

            iNumber = Math.Round(iNumber, 2);
            iDecimal = Math.Round((iNumber - Math.Truncate(iNumber)) * 100, 2);
            if (iDecimal !== 0) {
                return " " + word + " " + iDecimal.ToString() + "/100";
            else {
                return "";
        };

        const pGetUnit = function(iTens) {
            return iTens - (Math.Truncate(iTens / 10) * 10);
        };

        const pGetHundred = function(iHundred) {
            return iHundred - (Math.Truncate(iHundred / 100) * 100);
        };

        const pGetValue = function(iNumber, iDividing) {
            return Math.Truncate(Math.Truncate(iNumber) / iDividing);
        };

        return self;

    }

}(globalObject));
