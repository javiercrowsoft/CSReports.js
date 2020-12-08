(function(globalObject) {

    globalObject.CSKernelClient = globalObject.CSKernelClient || {};

    globalObject.CSKernelClient.createCUtil = function() {

        const self = {};
        const C_MODULE = "cUtil";

        let String m_sepDecimal = "";

		let int _dpi = -1;

        self.getToken = function(token, source) {
              let i = 0;
              let s = "";
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
        };

        self.tp = function(twips) {
            self.int nTwipsPerInch = 1440;
            let dpi = getDPI();
            return Convert.ToInt32((twips / (float)nTwipsPerInch) * dpi);
        };

        self.pt = function(pixels) {
            self.int nTwipsPerInch = 1440;
            let dpi = getDPI();
            return Convert.ToInt32((pixels / (float)dpi) * nTwipsPerInch);
        };

        self.mt = function(millimeters) {
            self.int nTwipsPerInch = 1440;
            return Convert.ToInt32(mi(millimeters) * nTwipsPerInch);
        };

        self.mp = function(millimeters) {
            let dpi = getDPI();
            return Convert.ToInt32(mi(millimeters) * dpi);
        };

        self.mi = function(millimeters) {
            return (millimeters * .03937);
        };

        const getDPI = function() {
			if (_dpi < 0) {
				let currentDPI = 0;
				{
					{
						currentDPI = g.DpiX;
					}
				}
				_dpi = currentDPI;
			}
			return _dpi;
        };

        self.setEmailServer = function(rhs) {
            cGlobals.gEmailServer = rhs;
        };
        self.setEmailAddress = function(rhs) {
            cGlobals.gEmailAddress = rhs;
        };
        self.setEmailPort = function(rhs) {
            cGlobals.gEmailPort = rhs;
        };
        self.setEmailUser = function(rhs) {
            cGlobals.gEmailUser = rhs;
        };
        self.setEmailPwd = function(rhs) {
            cGlobals.gEmailPwd = rhs;
        };

        self.setEmailErrDescrip = function(rhs) {
            cGlobals.gEmailErrDescrip = rhs;
        };

        self.getEmailServer = function() {
            return cGlobals.gEmailServer;
        };
        self.getEmailAddress = function() {
            return cGlobals.gEmailAddress;
        };
        self.getEmailPort = function() {
            return cGlobals.gEmailPort;
        };
        self.getEmailUser = function() {
            return cGlobals.gEmailUser;
        };
        self.getEmailPwd = function() {
            return cGlobals.gEmailPwd;
        };

        self.getErrorDB = function() {
            return cGlobals.gErrorDB;
        };
        self.setErrorDB = function(rhs) {
            cGlobals.gErrorDB = rhs;
        };

        self.arrayToString = function(v) {
            let i = 0;
            let s = "";
            for (i = 0; i < v.Length; i++) {
                s = s + v[i].ToString() + ",";
            }
            return removeLastColon(s);
        };

        self.arrayToString = function(v) {
            let i = 0;
            let s = "";
            for (i = 0; i < v.Length; i++) {
                s = s + v[i] + ",";
            }
            return removeLastColon(s);
        };

        self.existsFile = function(pathYName) {
            return File.Exists(pathYName);
        };

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

        self.setSepDecimal = function() {
UNKNOWN >>             float n;
            float.TryParse("1.000", n);
            if (n === 1) {
                m_sepDecimal = ".";
            }
            else {
                float.TryParse("1,000", n);
                if (n === 1) {
                    m_sepDecimal = ",";
                }
            }
            if (m_sepDecimal === "")  {
                throw new KernelException(
                    C_MODULE,
                    "The decimal symbol could not be determined." 
                    + "Check in 'control panel/reginal settings' "
                    + "that the values in the Numbers tab match the values "
                    + "in the Currency tab for field 'decimal symbol' and "
                    + "'Digit grouping symbol'. ");
            }
        };

        self.getSepDecimal = function() {
            return m_sepDecimal;
        };

        self.getValidPath = function(path) {
            if (path.Substring(path.Length - 1) !== Path.DirectorySeparatorChar.ToString()) { path = path + Path.DirectorySeparatorChar; }
            return path;
        };

        //--------------------------------------------------------------------------------------------------------------------
        self.listAdd = function(list, value) {
            listAdd_(list, value);
        };
        self.listAdd = function(list, value, id) {
            listAdd_(list, value, id);
        };
        self.listID = function(list) {
            return listID_(list);
        };
        self.listItemData = function(list, index) {
            return listItemData_(list, index);
        };
        self.listSetListIndex = function(list, idx) {
            listSetListIndex_(list, idx);
        };
        self.listSetListIndexForId = function(list, id) {
            listSetListIndexForId_(list, id);
        };
        self.listSetListIndexForText = function(list, text) {
            listSetListIndexForText_(list, text);
        };
        self.listChangeTextForSelected = function(list, value) {
            listChangeTextForSelected_(list, value);
        };
        self.listChangeText = function(list, idx, value) {
            listChangeText_(list, idx, value);
        };
        self.listGetIndexFromItemData = function(list, valueItemData) {
            return listGetIndexFromItemData_(list, valueItemData);
        };

        const listAdd_ = function(list, value) {
            list.Items.Add(value);
        };
        const listAdd_ = function(list, value, id) {
            list.Items.Add(new ListValueWithId(value, id));
        };
        const listID_ = function(list) {
            if (list.SelectedIndex === -1) { return 0; }
            return (list.SelectedItem).Id;
        };
        const listItemData_ = function(list, index) {
            let _rtn = 0;

            if (index < list.Items.Count) {
                if (index === -1) {
                    _rtn = listID_(list);
                }
                else {
                    _rtn = (list.Items[index]).Id;
                }
            }
            return _rtn;
        };
        const listSetListIndex_ = function(list, idx) {
            if (list.Items.Count < 1) { return; }
            if (list.Items.Count > idx) { list.SelectedIndex = idx; }
        };
        const listSetListIndexForId_ = function(list, id) {
            let i = 0;
            for (i = 0; i < list.Items.Count; i++) {
                if ((list.Items[i]).Id === id) {
                    list.SelectedIndex = i;
                    break;
                }
            }
        };
        const listSetListIndexForText_ = function(list, text) {
            let i = 0;
            for (i = 0; i < list.Items.Count; i++) {
                if (list.Items[i].ToString() === text) {
                    list.SelectedIndex = i;
                    break;
                }
            }
        };
        const listChangeTextForSelected_ = function(list, value) {
            listChangeText_(list, list.SelectedIndex, value);
        };
        const listChangeText_ = function(list, idx, value) {
            if (idx < list.Items.Count && idx > -1) {
                let item = list.Items[idx];
                if (item is ListValueWithId) {
                    (item).Text = value;
                }
                else {
                    list.Items[idx] = value;
                }
            }
        };
        const listGetIndexFromItemData_ = function(list, valueItemData) {
            for(var i = 0; i < list.Items.Count; i++) {

                if (list.Items[i] is ListValueWithId && (list.Items[i]).Id === valueItemData) {
                    return i;
                }
            }

            return -1;
        };

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
        self.setInfoString = function(source, key, value) {
            key = "#" + key;

            let i = source.ToLower().IndexOf(key.ToLower(), 0);

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
                self.string c_errorstr = "cUtil.getInfoString: source invalid, the character {0} is not present.";

                let j = source.ToLower().IndexOf(";".ToLower(), i);
                if (j === -1)  {
                    throw (new Exception(String.Format(c_errorstr, ";"))); 
                }

                let k = source.Substring(i, j-i).ToLower().IndexOf("=".ToLower(), 0);
                if (k === -1)  {
                    throw (new Exception(String.Format(c_errorstr, "="))); 
                }
                k = k + i;
                return source.Substring(0, k) + value + source.Substring(j);
            }
        };

        self.getInfoString = function(source, key, defaultValue) {

            if (String.IsNullOrEmpty(source)) {
                return defaultValue;
            }

            key = "#"+ key;

            let i = source.ToLower().IndexOf(key.ToLower(), 0);

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
              self.string c_errorstr = "cUtil.getInfoString: source invalid, the character {0} is not present.";

              let j = source.ToLower().IndexOf(";".ToLower(), i);
              if (j === -1)  {
                  throw(new Exception(String.Format(c_errorstr, ";"))); 
              }

              let k = source.Substring(i, j-i).ToLower().IndexOf("=".ToLower(), 0);
              if (k === -1)  {
                  throw(new Exception(String.Format(c_errorstr, "="))); 
              }
              k = k + i;
              return source.Substring(k + 1, j - k - 1);
            }
        };

        //--------------------------------------------------------------------------------------------------------------------
        self.getInput = function(value, descrip, title) {
            let f = new fInput();
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
        };
        /*
        public bool getInputEx(String value, String descrip) { // TODO: Use of ByRef founded Public Function GetInputEx(ByRef Value As String, Optional ByVal Descrip As String) As Boolean
            return mUtil.getInputEx_(value, descrip);
        }
         */ 
        self.removeLastColon = function(list) {
            list = list.Trim();
            if (list.Substring(list.Length - 1) === ",") {
                return list.Substring(0, list.Length - 1);
            }
            else {
                return list;
            }
        };
        /*
        public void sleep(int dwMilliseconds) {
            SubSleep(dwMilliseconds);
        }
        */
        self.setFocusControl = function(ctl) {
            ctl.Select();
        };

        self.getComputerName = function() {
            return System.Environment.MachineName;
        };

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
        self.divideByZero = function(x1, x2) {
            if (x2 !== 0) {
                return x1 / x2;
            }
            else {
                return 0;
            }
        };

        self.subString = function(text, start, length) {
            if (String.IsNullOrEmpty(text)) {
                return "";
            }
            else {
                if (text.Length - start < length) {
                    length = text.Length - start;
                }
                return text.Substring(start, length);
            }
        };

        self.valAsInt = function(value) {
            return Convert.ToInt32(val(value));
        };

        self.val = function(value) {
            if (value === null) {
                return 0;
            }
            else {

                let typeCode = System.Type.GetTypeCode(value.GetType());
                switch (typeCode)
                {
                    case System.TypeCode.Char:
                    case System.TypeCode.String:
                        let dbl = 0;
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
        };

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
        return self;

    }

    self.createListValueWithId = function() {

        const self = {};
        let value = null;
        let id = null;

        const ListValueWithId = function(value, id) {
            this.value = value;
            this.id = id;
        };

        self. = function() {
            return value;
        };

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
        return self;

    }
}(globalObject));
