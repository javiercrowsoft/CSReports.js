namespace CSKernelNumberToString {

    import Maths = CSOAPI.Maths;

    export class cNumberToString {

        private C_MODULE: string = "cNumberToString";

        public secondsToString(count: number) {
            let hours: number = 0;
            let minutes: number = 0;
            let second: number = 0;

            hours = count / 3600;
            minutes = (count % 3600) / 60;
            second = (count % 3600) % 60;

            return this.pad(hours,"00",2)
                + ":" + this.pad(minutes,"00",2)
                + ":" + this.pad(second,"00",2);
        }

        private pad(value, pad, size) {
            return pad + value.toString().slice(-size);
        }

        public spanishNumberToString(num: number) {
            let iMillion: number = 0;
            let iThousand: number = 0;
            let rtn: string = "";

            num = Maths.round(num, 2);

            if (num >= 1000000) {
                iMillion = this.getValue(num, 1000000);
                if (num >= 2000000) {
                    rtn = this.spanishGetNumber(iMillion, true) + " Millones ";
                }
                else {
                    rtn = this.spanishGetNumber(iMillion, true) + " Millon ";
                }
                num = num - (iMillion * 1000000);
            }

            if (num >= 1000) {
                iThousand = this.getValue(num, 1000);
                rtn = rtn + this.spanishGetNumber(iThousand, true) + " Mil ";
                num = num - (iThousand * 1000);
            }

            rtn = rtn + this.spanishGetNumber(Maths.trunc(num), false);
            rtn = rtn + this.spanishGetDecimal(num);

            return rtn.substring(0, 1).toUpperCase() + rtn.substring(1).toLowerCase();
        }

        public frenchNumberToString(num: number) {
            let iMillion: number = 0;
            let iThousand: number = 0;
            let rtn: string = "";

            num = Maths.round(num, 2);

            if (num >= 1000000) {
                iMillion = this.getValue(num, 1000000);
                if (num >= 2000000) {
                    rtn = this.frenchGetNumber(iMillion) + " Millions ";
                }
                else {
                    rtn = this.frenchGetNumber(iMillion) + " Million ";
                }
                num = num - (iMillion * 1000000);
            }

            if (num >= 1000) {
                iThousand = this.getValue(num, 1000);
                if (iThousand === 1) {
                    rtn = " Mil ";
                }
                else {
                    rtn = rtn + this.frenchGetNumber(iThousand) + " Mil ";
                }
                num = num - (iThousand * 1000);
            }

            rtn = rtn + this.frenchGetNumber(Maths.trunc(num));
            rtn = rtn + this.frenchGetDecimal(num);

            return rtn.substring(0, 1).toUpperCase() + rtn.substring(2).toLowerCase();
        }

        public englishNumberToString(num: number) {
            let iMillion: number = 0;
            let iThousand: number = 0;
            let rtn: string = "";

            num = Maths.round(num, 2);

            if (num >= 1000000) {
                iMillion = this.getValue(num, 1000000);
                rtn = this.englishGetNumber(iMillion) + " Million ";
                num = num - (iMillion * 1000000);
            }

            if (num >= 1000) {
                iThousand = this.getValue(num, 1000);
                rtn = rtn + this.englishGetNumber(iThousand) + " Thousand ";
                num = num - (iThousand * 1000);
            }

            rtn = rtn + this.englishGetNumber(Maths.trunc(num));
            rtn = rtn + this.englishGetDecimal(num);

            return rtn.substring(0, 1).toUpperCase() + rtn.substring(2).toLowerCase();
        }

        /////////////////////////////////////////////////////////////////////////////////////
        // Spanish

        private spanishGetNumber(num: number, bPutOne: boolean) {
            let rtn: string = "";
            let iTens: number = 0;
            let iUnit: number = 0;
            let iNumAux: number = 0;
            let bPutOneAux: boolean = false;

            if (num === 100) {
                rtn = "Cien ";
            }
            else {
                if (num > 100) {
                    iNumAux = num;
                    rtn = this.spanishGetNameHundred(iNumAux) + " ";
                    iTens = this.getHundred(iNumAux);
                    bPutOne = false;
                }
                else {
                    iTens = num;
                }
            }

            if (iTens !== 0) {
                if (iTens >= 1 && iTens <= 15) {
                    bPutOneAux = bPutOne;
                    rtn = rtn + this.spanishGetNameNumber(iTens, bPutOneAux);
                }
                else {
                    if (iTens >= 16 && iTens <= 19) {
                        rtn = rtn + "Dieci" + this.spanishGetNameNumber(Maths.trunc(iTens - 10), bPutOne);
                    }
                    else {
                        if (iTens === 20) {
                            rtn = rtn + "Veinte";
                        }
                        else {
                            if (iTens >= 21 && iTens <= 29) {
                                rtn = rtn + "Venti" + this.spanishGetNameNumber(Maths.trunc(iTens - 20), bPutOne);
                            }
                            else {
                                if (iTens >= 30) {
                                    rtn = rtn + this.spanishGetNameTens(iTens);
                                    iUnit = this.getUnit(iTens);
                                    rtn = rtn + (iUnit === 0 ? "" : " y ");
                                    rtn = rtn + this.spanishGetNameNumber(iUnit, bPutOne);
                                }
                            }
                        }
                    }
                }
            }

            return rtn;
        }

        private spanishGetNameNumber(num: number, bPutOne: boolean) {
            switch (num)
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
        }

        private spanishGetNameHundred(num: number) {
            let number: number = num;

            if (number >= 900) return "Novecientos"; 
            else if (number >= 800) return "Ochocientos"; 
            else if (number >= 700) return "Setecientos"; 
            else if (number >= 600) return "Seiscientos"; 
            else if (number >= 500) return "Quinientos"; 
            else if (number >= 400) return "Cuatrocientos"; 
            else if (number >= 300) return "trescientos"; 
            else if (number >= 200) return "Doscientos"; 
            else if (number >= 100) return "Ciento"; 
            else return ""; 
        }

        private spanishGetNameTens(num: number) {
            let number: number = num;

            if (number >= 90) return "Noventa"; 
            else if (number >= 80) return "Ochenta"; 
            else if (number >= 70) return "Setenta"; 
            else if (number >= 60) return "Sesenta"; 
            else if (number >= 50) return "Cincuenta"; 
            else if (number >= 40) return "Cuarenta"; 
            else if (number >= 30) return "Treinta"; 
            else return ""; 
        }

        private spanishGetDecimal(num: number) {
            return this.getDecimalAux(num, "con");
        }

        /////////////////////////////////////////////////////////////////////////////////////
        // French

        private frenchGetNumber(num: number) {
            let rtn: string = "";
            let iTens: number = 0;
            let iUnit: number = 0;
            let iNumAux: number = 0;

            if (num === 100) {
                rtn = "Cent ";
            }
            else {
                if (num > 100) {
                    iNumAux = num;
                    rtn = this.frenchGetNameHundred(iNumAux) + " ";
                    iTens = this.getHundred(iNumAux);
                }
                else {
                    iTens = num;
                }
            }

            if (iTens !== 0) {
                if (iTens >= 1 && iTens <= 16) {
                    rtn = rtn + this.frenchGetNameNumber(iTens);
                }
                else {
                    if (iTens >= 17 && iTens <= 19) {
                        rtn = rtn + "Dix " + this.frenchGetNameNumber(Maths.trunc(iTens - 10));
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
                                    rtn = rtn + "Vingt " + this.frenchGetNameNumber(Maths.trunc(iTens - 20));
                                }
                            }
                            else {
                                iUnit = this.getUnit(iTens);
                                if (!(iTens >= 70 && iTens < 80) && !(iTens >= 90)) {
                                    rtn = rtn + this.frenchGetNameTens(iTens);
                                    if (iUnit === 1) {
                                        rtn = rtn + " et ";
                                    }
                                    if (iUnit > 1) {
                                        rtn = rtn + " ";
                                    }
                                    rtn = rtn + this.frenchGetNameNumber(iUnit);
                                }
                                else {
                                    rtn = rtn + this.frenchGetNameTens(iTens) + this.frenchGetNameNumber(iUnit + 10);
                                }
                            }
                        }
                    }
                }
            }

            return rtn;
        }

        private frenchGetNameNumber(num: number) {
            switch (num)
            {
                case 1: return "Un";
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
                case 19: return "Dix " + this.frenchGetNameNumber(Maths.trunc(num - 10));
                default: return "";
            }
        }

        private frenchGetNameHundred(num: number) {
            let rtn: string = "";
            let number: number = num;

            if (number >= 900) rtn = "Neuf "; 
            else if (number >= 800) rtn = "Huit "; 
            else if (number >= 700) rtn = "Sept "; 
            else if (number >= 600) rtn = "Six "; 
            else if (number >= 500) rtn = "Cinq "; 
            else if (number >= 400) rtn = "Quatre "; 
            else if (number >= 300) rtn = "Trois "; 
            else if (number >= 200) rtn = "Deux "; 
            else if (number >= 100) rtn = ""; 

            if (number >= 200) {
                rtn = rtn + "Cents";
            }
            else {
                rtn = rtn + "Cent";
            }

            return rtn;
        }

        private frenchGetNameTens(num: number) {
            let number: number = num;

            if (number >= 90) return "Quatre Vingt "; 
            else if (number >= 80) return "Quatre Vingt"; 
            else if (number >= 70) return "Soixante "; 
            else if (number >= 60) return "Soixante"; 
            else if (number >= 50) return "Cinquante"; 
            else if (number >= 40) return "Quarante"; 
            else if (number >= 30) return "Treinte"; 
            else return "";
        }

        private frenchGetDecimal(num: number) {
            return this.getDecimalAux(num, "Avec");
        }

        /////////////////////////////////////////////////////////////////////////////////////
        // English

        private englishGetNumber(num: number) {
            let rtn: string = "";
            let iTens: number = 0;
            let iUnit: number = 0;
            let iNumAux: number = 0;

            if (num === 100) {
                rtn = "Hundred ";
            }
            else {
                if (num > 100) {
                    iNumAux = num;
                    rtn = this.englishGetNameHundred(iNumAux) + " ";
                    iTens = this.getHundred(iNumAux);
                }
                else {
                    iTens = num;
                }
            }

            if (iTens !== 0) {
                if (iTens >= 1 && iTens <= 15) {
                    rtn = rtn + this.englishGetNameNumber(iTens);
                }
                else {
                    if (iTens >= 16 && iTens <= 19) {
                        rtn = rtn + this.englishGetNameNumber(Maths.trunc(iTens - 10)) + "teen";
                    }
                    else {
                        if (iTens === 20) {
                            rtn = rtn + "twenty";
                        }
                        else {
                            rtn = rtn + this.englishGetNameTens(iTens);
                            iUnit = this.getUnit(iTens);
                            rtn = rtn + " ";
                            rtn = rtn + this.englishGetNameNumber(iUnit);
                        }
                    }
                }
            }

            return rtn;
        }

        private englishGetNameNumber(num: number) {
            switch (num)
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
        }

        private englishGetNameHundred(num: number) {
            return this.englishGetNameNumber(num) + " Hundred";
        }

        private englishGetNameTens(num: number) {
            let number: number = num;

            if (number >= 90) return "Ninety"; 
            else if (number >= 80) return "Eighty"; 
            else if (number >= 70) return "Seventy"; 
            else if (number >= 60) return "Sixty"; 
            else if (number >= 50) return "Fifty"; 
            else if (number >= 40) return "Forty"; 
            else if (number >= 30) return "Thirty"; 
            else if (number >= 20) return "Twenty"; 
            else return ""; 
        }

        private englishGetDecimal(num: number) {
            return this.getDecimalAux(num, "with");
        }

        // generics
        //
        private getDecimalAux(num: number, word: string) {
            let iDecimal: number = 0;

            num = Maths.round(num, 2);
            iDecimal = Maths.round((num - Maths.trunc(num)) * 100, 2);
            if (iDecimal !== 0) 
                return " " + word + " " + iDecimal.toString() + "/100";
            else 
                return "";
        }

        private getUnit(iTens: number) {
            return iTens - (Maths.trunc(iTens / 10) * 10);
        }

        private getHundred(iHundred: number) {
            return iHundred - (Maths.trunc(iHundred / 100) * 100);
        }

        private getValue(num: number, iDividing: number) {
            return Maths.trunc(Maths.trunc(num) / iDividing);
        }

    }
}
