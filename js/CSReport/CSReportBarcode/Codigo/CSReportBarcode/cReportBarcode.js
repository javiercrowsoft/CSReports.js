(function(globalObject) {

    globalObject.CSReportBarcode = globalObject.CSReportBarcode || {}; //@@@: namespace CSReportBarcode
 //@@@: {
    globalObject.CSReportBarcode.createCReportBarcode = function() {

        const self = {}; //@@@: public class cReportBarcode

        self.encodeTo128 = function(dataToEncode) { //@@@: public String encodeTo128(String dataToEncode) {
            return code128b(dataToEncode); //@@@: return code128b(dataToEncode);
        }; //@@@: }

        self.code128a = function(dataToEncode) { //@@@: public String code128a(String dataToEncode) {
            let printableString = char.ConvertFromUtf32(203); //@@@: String printableString = char.ConvertFromUtf32(203);
            let weightedTotal = 103; //@@@: int weightedTotal = 103;
            let currentValue = 0; //@@@: int currentValue = 0;
UNKNOWN >>             int currentCharNum; //@@@: int currentCharNum;
            let c128CheckDigit = ""; //@@@: String c128CheckDigit = "";
            let charData = dataToEncode.ToCharArray(); //@@@: char[] charData = dataToEncode.ToCharArray();
            let stringLength = dataToEncode.Length; //@@@: int stringLength = dataToEncode.Length;

            for(var i = 0; i < stringLength; i++) { //@@@: for (int i = 0; i < stringLength; i++) {

                currentCharNum = charData[i]; //@@@: currentCharNum = (int)charData[i];

                if (currentCharNum < 135) currentValue = currentCharNum - 32; { //@@@: if (currentCharNum < 135) currentValue = currentCharNum - 32;
                if (currentCharNum > 134) currentValue = currentCharNum - 100; { //@@@: if (currentCharNum > 134) currentValue = currentCharNum - 100;

UNKNOWN >>                 currentValue *= i; //@@@: currentValue *= i;
                weightedTotal += currentValue; //@@@: weightedTotal += currentValue;

                if (currentCharNum === 32) currentCharNum = 194; { //@@@: if (currentCharNum == 32) currentCharNum = 194;

                printableString += char.ConvertFromUtf32(currentCharNum); //@@@: printableString += char.ConvertFromUtf32(currentCharNum);
            } //@@@: }

            let checkDigitValue = weightedTotal % 103; //@@@: int checkDigitValue = weightedTotal % 103;

            if (checkDigitValue < 95 && checkDigitValue > 0) c128CheckDigit = char.ConvertFromUtf32(checkDigitValue + 32); { //@@@: if (checkDigitValue < 95 && checkDigitValue > 0) c128CheckDigit = char.ConvertFromUtf32(checkDigitValue + 32);
            if (checkDigitValue > 94) c128CheckDigit = char.ConvertFromUtf32(checkDigitValue + 100); { //@@@: if (checkDigitValue > 94) c128CheckDigit = char.ConvertFromUtf32(checkDigitValue + 100);
            if (checkDigitValue === 0) c128CheckDigit = char.ConvertFromUtf32(194); { //@@@: if (checkDigitValue == 0) c128CheckDigit = char.ConvertFromUtf32(194);

            return printableString + c128CheckDigit + char.ConvertFromUtf32(206); //@@@: return printableString + c128CheckDigit + char.ConvertFromUtf32(206);
        }; //@@@: }

        const isNumeric = function(value) { //@@@: private bool isNumeric(string value)
            double dummyNumber; { //@@@: double dummyNumber;
            return Double.TryParse(value, dummyNumber); //@@@: return Double.TryParse(value, out dummyNumber);
        }; //@@@: }

UNKNOWN >>         public String code128c(String dataToEncode, int returnType = 0) { //@@@: public String code128c(String dataToEncode, int returnType = 0) {
UNKNOWN >>             int currentValue; //@@@: int currentValue;
            let c128CheckDigit = ""; //@@@: String c128CheckDigit = "";
            let stringLength = dataToEncode.Length; ; //@@@: int stringLength = dataToEncode.Length; ;
            let onlyCorrectData = ""; //@@@: String onlyCorrectData = "";

            // additional logic needed in case ReturnType is not entered

            if (returnType !== 0 && returnType !== 1 && returnType !== 2) returnType = 0; { //@@@: if (returnType != 0 && returnType != 1 && returnType != 2) returnType = 0;

            for(var i = 0; i < stringLength; i++) { //@@@: for (int i = 0; i < stringLength; i++) {

                if (isNumeric(dataToEncode.Substring(i, 1))) onlyCorrectData = onlyCorrectData + dataToEncode.Substring(i, 1); { //@@@: if (isNumeric(dataToEncode.Substring(i, 1))) onlyCorrectData = onlyCorrectData + dataToEncode.Substring(i, 1);

            } //@@@: }

            dataToEncode = onlyCorrectData; //@@@: dataToEncode = onlyCorrectData;

            if (dataToEncode.Length % 2 === 1) dataToEncode = "0" + dataToEncode; { //@@@: if (dataToEncode.Length % 2 == 1) dataToEncode = "0" + dataToEncode;

            let printableString = char.ConvertFromUtf32(205); //@@@: String printableString = char.ConvertFromUtf32(205);

            let weightedTotal = 105; //@@@: int weightedTotal = 105;
            let weightValue = 1; //@@@: int weightValue = 1;

            stringLength = dataToEncode.Length; //@@@: stringLength = dataToEncode.Length;

            for(var i = 1; i < stringLength; i += 2) { //@@@: for (int i = 1; i < stringLength; i += 2) {

                currentValue = int.Parse(dataToEncode.Substring(i, 2)); //@@@: currentValue = int.Parse(dataToEncode.Substring(i, 2));

                if (currentValue < 95 && currentValue > 0) printableString += char.ConvertFromUtf32(currentValue + 32); { //@@@: if (currentValue < 95 && currentValue > 0) printableString += char.ConvertFromUtf32(currentValue + 32);
                if (currentValue > 94) printableString += char.ConvertFromUtf32(currentValue + 100); { //@@@: if (currentValue > 94) printableString += char.ConvertFromUtf32(currentValue + 100);
                if (currentValue === 0) printableString += char.ConvertFromUtf32(194); { //@@@: if (currentValue == 0) printableString += char.ConvertFromUtf32(194);

UNKNOWN >>                 currentValue *= weightValue; //@@@: currentValue *= weightValue;
                weightedTotal += currentValue; //@@@: weightedTotal += currentValue;
                weightValue += 1; //@@@: weightValue += 1;
            } //@@@: }

            let checkDigitValue = weightedTotal % 103; //@@@: int checkDigitValue = weightedTotal % 103;

            if (checkDigitValue < 95 && checkDigitValue > 0) c128CheckDigit = char.ConvertFromUtf32(checkDigitValue + 32); { //@@@: if (checkDigitValue < 95 && checkDigitValue > 0) c128CheckDigit = char.ConvertFromUtf32(checkDigitValue + 32);

            if (checkDigitValue > 94) c128CheckDigit = char.ConvertFromUtf32(checkDigitValue + 100); { //@@@: if (checkDigitValue > 94) c128CheckDigit = char.ConvertFromUtf32(checkDigitValue + 100);

            if (checkDigitValue === 0) c128CheckDigit = char.ConvertFromUtf32(194); { //@@@: if (checkDigitValue == 0) c128CheckDigit = char.ConvertFromUtf32(194);

            if (returnType === 0) return printableString + c128CheckDigit + char.ConvertFromUtf32(206); { //@@@: if (returnType == 0) return printableString + c128CheckDigit + char.ConvertFromUtf32(206);
            if (returnType === 1) return dataToEncode + checkDigitValue; { //@@@: if (returnType == 1) return dataToEncode + checkDigitValue;
            /* returnType === 2*/ return checkDigitValue.ToString(); //@@@: /* returnType == 2*/ return checkDigitValue.ToString();
        }

        public String code128b(String dataToEncode)
        {
            int currentValue = 0;
            int currentCharNum;
            int checkDigitValue;
            String c128CheckDigit = "";

            int weightedTotal = 104;
            String printableString = char.ConvertFromUtf32(204);
            char[] charData = dataToEncode.ToCharArray();
            int stringLength = dataToEncode.Length;

            for (int i = 0; i < stringLength; i++)
            {

                currentCharNum = charData[i];
                if (currentCharNum < 135) currentValue = currentCharNum - 32;
                if (currentCharNum > 134) currentValue = currentCharNum - 100;
                currentValue *= i;
                weightedTotal += currentValue;

                if (currentCharNum === 32) currentCharNum = 194;

                printableString += char.ConvertFromUtf32(currentCharNum);
            }

            checkDigitValue = weightedTotal % 103;
            if (checkDigitValue < 95 && checkDigitValue > 0) c128CheckDigit = char.ConvertFromUtf32(checkDigitValue + 32);
            if (checkDigitValue > 94) c128CheckDigit = char.ConvertFromUtf32(checkDigitValue + 100);
            if (checkDigitValue === 0) c128CheckDigit = char.ConvertFromUtf32(194);

            return printableString + c128CheckDigit + char.ConvertFromUtf32(206);
        }
    }
}
