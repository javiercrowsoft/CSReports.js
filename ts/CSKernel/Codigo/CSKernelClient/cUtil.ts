

namespace CSKernelClient
{
    export class cUtil {


    {
        private C_MODULE: string = "cUtil";

        private String: static this.sepDecimal = "";

		private int: static _dpi = -1;

        public getToken(token: string, source: string) {
              let i: number = 0;
              let s: string = "";
UNKNOWN >>               string c;
UNKNOWN >>               int l;

              if (token.Substring(token.Length-1, 1) !== "=") token += "="; {

              l = source.Length;
              i = source.IndexOf(token);
              if (i === -1) return ""; {
              i += token.Length - 1;

              while(true) {
                i++;
                if (i > l) break; {
                c = source.Substring(i, 1);
                if (c !== ";") s += c; {
                else break; {
              }

              return s;
        }

        public tp(twips: number) {
            public nTwipsPerInch: number = 1440;
            let dpi: number = getDPI();
            return Convert.ToInt32((twips / (float)nTwipsPerInch) * dpi);
        }

        public pt(pixels: number) {
            public nTwipsPerInch: number = 1440;
            let dpi: number = getDPI();
            return Convert.ToInt32((pixels / (float)dpi) * nTwipsPerInch);
        }

        public mt(millimeters: number) {
            public nTwipsPerInch: number = 1440;
            return Convert.ToInt32(mi(millimeters) * nTwipsPerInch);
        }

        public mp(millimeters: number) {
            let dpi: number = getDPI();
            return Convert.ToInt32(mi(millimeters) * dpi);
        }

        public mi(millimeters: number) {
            return (millimeters * .03937);
        }

        private getDPI() {
			if (_dpi < 0) {
				let currentDPI: number = 0;
				{
					{
						currentDPI = g.DpiX;
					}
				}
				_dpi = currentDPI;
			}
			return _dpi;
        }

        public setEmailServer(rhs: string) {
            cGlobals.gEmailServer = rhs;
        }
        public setEmailAddress(rhs: string) {
            cGlobals.gEmailAddress = rhs;
        }
        public setEmailPort(rhs: number) {
            cGlobals.gEmailPort = rhs;
        }
        public setEmailUser(rhs: string) {
            cGlobals.gEmailUser = rhs;
        }
        public setEmailPwd(rhs: string) {
            cGlobals.gEmailPwd = rhs;
        }

        public setEmailErrDescrip(rhs: string) {
            cGlobals.gEmailErrDescrip = rhs;
        }

        public getEmailServer() {
            return cGlobals.gEmailServer;
        }
        public getEmailAddress() {
            return cGlobals.gEmailAddress;
        }
        public getEmailPort() {
            return cGlobals.gEmailPort;
        }
        public getEmailUser() {
            return cGlobals.gEmailUser;
        }
        public getEmailPwd() {
            return cGlobals.gEmailPwd;
        }

        public getErrorDB() {
            return cGlobals.gErrorDB;
        }
        public setErrorDB(rhs: string) {
            cGlobals.gErrorDB = rhs;
        }

        public arrayToString(v: number[]) {
            let i: number = 0;
            let s: string = "";
            for (i = 0; i < v.Length; i++) {
                s = s + v[i].ToString() + ",";
            }
            return removeLastColon(s);
        }

        public arrayToString(v: string[]) {
            let i: number = 0;
            let s: string = "";
            for (i = 0; i < v.Length; i++) {
                s = s + v[i] + ",";
            }
            return removeLastColon(s);
        }

        public existsFile(pathYName: string) {
            return File.Exists(pathYName);
        }

        /* TODO: remove me
        public static String getGetToken(String token, String source)
        {
            int i = 0;
            String s = "";
            String c = "";
            int l = 0;

            if (token.Substring(token.Length - 1) !== "=") 
            { 
                token = token + "="; 
            }

            l = source.Length;
            i = source.ToLower().IndexOf(token.ToLower(), 1);
            if (i === 0) { return ""; }
            i = i + token.Length - 1;

            do
            {
                i = i + 1;
                if (i > l) 
                { 
                    break; 
                }
                c = source.Substring(i, 1);
                if (c !== ";")
                {
                    s = s + c;
                }
                else
                {
                    break;
                }
            } while (true);

            return s;
        }
        */

        public setSepDecimal() {
UNKNOWN >>             float n;
            float.TryParse("1.000", n);
            if (n === 1) {
                this.sepDecimal = ".";
            }
            else {
                float.TryParse("1,000", n);
                if (n === 1) {
                    this.sepDecimal = ",";
                }
            }
            if (this.sepDecimal === "")  {
                throw new KernelException(
                    C_MODULE,
                    "The decimal symbol could not be determined." 
                    + "Check in 'control panel/reginal settings' "
                    + "that the values in the Numbers tab match the values "
                    + "in the Currency tab for field 'decimal symbol' and "
                    + "'Digit grouping symbol'. ");
            }
        }

        public getSepDecimal() {
            return this.sepDecimal;
        }

        public getValidPath(path: string) {
            if (path.Substring(path.Length - 1) !== Path.DirectorySeparatorChar.ToString()) { path = path + Path.DirectorySeparatorChar; }
            return path;
        }

        //--------------------------------------------------------------------------------------------------------------------
        public listAdd(list: ComboBox, value: string) {
            listAdd_(list, value);
        }
        public listAdd(list: ComboBox, value: string, id: number) {
            listAdd_(list, value, id);
        }
        public listID(list: ComboBox) {
            return listID_(list);
        }
        public listItemData(list: ComboBox, index: number) {
            return listItemData_(list, index);
        }
        public listSetListIndex(list: ComboBox, idx: number) {
            listSetListIndex_(list, idx);
        }
        public listSetListIndexForId(list: ComboBox, id: number) {
            listSetListIndexForId_(list, id);
        }
        public listSetListIndexForText(list: ComboBox, text: string) {
            listSetListIndexForText_(list, text);
        }
        public listChangeTextForSelected(list: ComboBox, value: string) {
            listChangeTextForSelected_(list, value);
        }
        public listChangeText(list: ComboBox, idx: number, value: string) {
            listChangeText_(list, idx, value);
        }
        public listGetIndexFromItemData(list: ComboBox, valueItemData: number) {
            return listGetIndexFromItemData_(list, valueItemData);
        }

        private listAdd_(list: ComboBox, value: string) {
            list.Items.Add(value);
        }
        private listAdd_(list: ComboBox, value: string, id: number) {
            list.Items.Add(new ListValueWithId(value, id));
        }
        private listID_(list: ComboBox) {
            if (list.SelectedIndex === -1) { return 0; }
            return (list.SelectedItem).Id;
        }
        private listItemData_(list: ComboBox, index: number) {
            let _rtn: number = 0;

            if (index < list.Items.Count) {
                if (index === -1) {
                    _rtn = listID_(list);
                }
                else {
                    _rtn = (list.Items[index]).Id;
                }
            }
            return _rtn;
        }
        private listSetListIndex_(list: ComboBox, idx: number) {
            if (list.Items.Count < 1) { return; }
            if (list.Items.Count > idx) { list.SelectedIndex = idx; }
        }
        private listSetListIndexForId_(list: ComboBox, id: number) {
            let i: number = 0;
            for (i = 0; i < list.Items.Count; i++) {
                if ((list.Items[i]).Id === id) {
                    list.SelectedIndex = i;
                    break;
                }
            }
        }
        private listSetListIndexForText_(list: ComboBox, text: string) {
            let i: number = 0;
            for (i = 0; i < list.Items.Count; i++) {
                if (list.Items[i].ToString() === text) {
                    list.SelectedIndex = i;
                    break;
                }
            }
        }
        private listChangeTextForSelected_(list: ComboBox, value: string) {
            listChangeText_(list, list.SelectedIndex, value);
        }
        private listChangeText_(list: ComboBox, idx: number, value: string) {
            if (idx < list.Items.Count && idx > -1) {
                let item: object = list.Items[idx];
                if (item is ListValueWithId) {
                    (item).Text = value;
                }
                else {
                    list.Items[idx] = value;
                }
            }
        }
        private listGetIndexFromItemData_(list: ComboBox, valueItemData: number) {
            for(var i = 0; i < list.Items.Count; i++) {

                if (list.Items[i] is ListValueWithId && (list.Items[i]).Id === valueItemData) {
                    return i;
                }
            }

            return -1;
        }

        /* 
        //--------------------------------------------------------------------------------------------------------------------
        public void setNodeForId(Object tree, int id) { // TODO: Use of ByRef founded Public Sub SetNodeForId(ByRef Tree As Object, ByVal Id As Long)
            mUtil.setNodeForId_(tree, id);
        }
        //--------------------------------------------------------------------------------------------------------------------
        public bool getPropertyFromParent(Object retValue, Object o, String propiedad) { // TODO: Use of ByRef founded Public Function GetPropertyFromParent(ByRef retValue As Variant, ByVal o As Object, ByVal propiedad As String) As Boolean
            return mUtil.getPropertyFromParent_(retValue, o, propiedad);
        }
        public bool getWindowState(Object retValue, Object o) { // TODO: Use of ByRef founded Public Function GetWindowState(ByRef retValue As Variant, ByVal o As Object) As Boolean
            return mUtil.getWindowState_(retValue, o);
        }

        */

        //--------------------------------------------------------------------------------------------------------------------
        public setInfoString(source: string, key: string, value: string) {
            key = "#" + key;

            let i: number = source.ToLower().IndexOf(key.ToLower(), 0);

            // the key can't apears more than one
            //
            if (source.ToLower().IndexOf(key.ToLower(), i + 1) !== -1)  {
                throw (new Exception("cUtil.getInfoString: the key can't apears more than one.")); 
            }

            // if the key is not present we add it to the end of the string
            //
            if (i === -1) {
                return source + key + "=" + value + ";";
            }
            else             {
                public c_errorstr: string = "cUtil.getInfoString: source invalid, the character {0} is not present.";

                let j: number = source.ToLower().IndexOf(";".ToLower(), i);
                if (j === -1)  {
                    throw (new Exception(String.Format(c_errorstr, ";"))); 
                }

                let k: number = source.Substring(i, j-i).ToLower().IndexOf("=".ToLower(), 0);
                if (k === -1)  {
                    throw (new Exception(String.Format(c_errorstr, "="))); 
                }
                k = k + i;
                return source.Substring(0, k) + value + source.Substring(j);
            }
        }

        public getInfoString(source: string, key: string, defaultValue: string) {

            if (String.IsNullOrEmpty(source)) {
                return defaultValue;
            }

            key = "#"+ key;

            let i: number = source.ToLower().IndexOf(key.ToLower(), 0);

            // the key can't apears more than one
            //
            if (source.ToLower().IndexOf(key.ToLower(), i + 1) !== -1)  {
                throw(new Exception("cUtil.getInfoString: the key can't apears more than one.")); 
            }

            // if the key is not present return default
            //
            if (i === -1)  {
              return defaultValue;
            } 
            else  {
              public c_errorstr: string = "cUtil.getInfoString: source invalid, the character {0} is not present.";

              let j: number = source.ToLower().IndexOf(";".ToLower(), i);
              if (j === -1)  {
                  throw(new Exception(String.Format(c_errorstr, ";"))); 
              }

              let k: number = source.Substring(i, j-i).ToLower().IndexOf("=".ToLower(), 0);
              if (k === -1)  {
                  throw(new Exception(String.Format(c_errorstr, "="))); 
              }
              k = k + i;
              return source.Substring(k + 1, j - k - 1);
            }
        }

        //--------------------------------------------------------------------------------------------------------------------
        public getInput(value: string, descrip: string, title: string) {
            let f: fInput = new fInput();
            f.setTitle(title);
            f.setDescrip(descrip);
            f.setText(value);
            f.ShowDialog();
            if (f.getOk()) {
                value = f.getText();
                return true;
            }
            else  {
                return false;
            }
        }
        /*
        public bool getInputEx(String value, String descrip) { // TODO: Use of ByRef founded Public Function GetInputEx(ByRef Value As String, Optional ByVal Descrip As String) As Boolean
            return mUtil.getInputEx_(value, descrip);
        }
         */ 
        public removeLastColon(list: string) {
            list = list.Trim();
            if (list.Substring(list.Length - 1) === ",") {
                return list.Substring(0, list.Length - 1);
            }
            else {
                return list;
            }
        }
        /*
        public void sleep(int dwMilliseconds) {
            SubSleep(dwMilliseconds);
        }
        */
        public setFocusControl(ctl: Control) {
            ctl.Select();
        }

        public getComputerName() {
            return System.Environment.MachineName;
        }

        /*
        public void showHelp(int hwnd, String helpFileFullName, String helpFile, int contextId) {
            mUtil.showHelp_(hwnd, helpFileFullName, helpFile, contextId);
        }

        public void sendEmailToCrowSoft(String subject, String body) {
            String text = "";

            if (!getInputEx(text, "Write your comments")) { return; }

            body = text + "\\n" + "\\n" + body + "\\n" + "\\n" + "Send by " + cGlobals.gEmailErrDescrip;
            mUtil.sendEmailToCrowSoft_(subject, body);
        }
        */
        public divideByZero(x1: number, x2: number) {
            if (x2 !== 0) {
                return x1 / x2;
            }
            else {
                return 0;
            }
        }

        public subString(text: string, start: number, length: number) {
            if (String.IsNullOrEmpty(text)) {
                return "";
            }
            else {
                if (text.Length - start < length) {
                    length = text.Length - start;
                }
                return text.Substring(start, length);
            }
        }

        public valAsInt(value: object) {
            return Convert.ToInt32(val(value));
        }

        public val(value: object) {
            if (value === null) {
                return 0;
            }
            else {

                let typeCode: System.TypeCode = System.Type.GetTypeCode(value.GetType());
                switch (typeCode)
                {
                    case System.TypeCode.Char:
                    case System.TypeCode.String:
                        let dbl: number = 0;
                        if (double.TryParse(value, dbl)) {
                            return dbl;
                        }
                        else {
                            return 0;
                        }
                    case System.TypeCode.Decimal:
                    case System.TypeCode.Double:
                    case System.TypeCode.Int16:
                    case System.TypeCode.Int32:
                    case System.TypeCode.Int64:
                    case System.TypeCode.Single:
                    case System.TypeCode.UInt16:
                    case System.TypeCode.UInt32:
                    case System.TypeCode.UInt64:
                        return Convert.ToDouble(value);
                    case System.TypeCode.DateTime:
                        return 0;
                    case System.TypeCode.Boolean:
                        if (value) {
                            return 1;
                        else {
                            return 0;
                    default:
                        return 0;
                }
            }
        }

        /* probably we will need it in the future
         * 
         * https://github.com/PintaProject/Pinta/blob/cc4a6960d65464f57fe23443ca8408d7e7fa3760/Pinta.Core/Managers/SystemManager.cs
         * 
        public static bool IsRunningOnMac()
        {
            IntPtr buf = IntPtr.Zero;
            try
            {
                buf = Marshal.AllocHGlobal(8192);
                // This is a hacktastic way of getting sysname from uname ()
                if (uname(buf) === 0)
                {
                    string os = Marshal.PtrToStringAnsi(buf);
                    if (os === "Darwin")
                        return true;
                }
            }
            catch
            {
            }
            finally
            {
                if (buf !== IntPtr.Zero)
                    Marshal.FreeHGlobal(buf);
            }
            return false;
        }
         * */


    }    }



    export class ListValueWithId {


        private value: string = null;
        private id: number = null;

        public constructor(value: string, id: number) {
            this.value = value;
            this.id = id;
        }

        public ToString() {
            return value;
        }

UNKNOWN >>         public int Id 
        {
UNKNOWN >>             get
            {
                return id;
            }
        }

UNKNOWN >>         public string Text
        {
UNKNOWN >>             set
            {
                Text = value;
            }
        }


    }    }
}
