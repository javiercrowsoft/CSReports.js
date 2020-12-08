(function(globalObject) {

    globalObject.CSKernelClient = globalObject.CSKernelClient || {}; //@@@: namespace CSKernelClient
 //@@@: {
    globalObject.CSKernelClient.createCUtil = function() {

        const self = {}; //@@@: public static class cUtil
        const C_MODULE = "cUtil"; //@@@: private const String C_MODULE = "cUtil";

        let String m_sepDecimal = ""; //@@@: private static String m_sepDecimal = "";

		let int _dpi = -1; //@@@: private static int _dpi = -1;

        self.getToken = function(token, source) { //@@@: public static string getToken(string token, string source)
              let i = 0; //@@@: int i = 0;
              let s = ""; //@@@: string s = "";
UNKNOWN >>               string c; //@@@: string c;
UNKNOWN >>               int l; //@@@: int l;

              if (token.Substring(token.Length-1, 1) !== "=") token += "="; { //@@@: if (token.Substring(token.Length-1, 1) != "=") token += "=";

              l = source.Length; //@@@: l = source.Length;
              i = source.IndexOf(token); //@@@: i = source.IndexOf(token);
              if (i === -1) return ""; { //@@@: if (i == -1) return "";
              i += token.Length - 1; //@@@: i += token.Length - 1;

              while(true) { //@@@: while(true)
                i++; //@@@: i++;
                if (i > l) break; { //@@@: if (i > l) break;
                c = source.Substring(i, 1); //@@@: c = source.Substring(i, 1);
                if (c !== ";") s += c; { //@@@: if (c != ";") s += c;
                else break; { //@@@: else break;
              } //@@@: }

              return s; //@@@: return s;
        }; //@@@: }

        self.tp = function(twips) { //@@@: public static int tp(int twips)
            self.int nTwipsPerInch = 1440; //@@@: const int nTwipsPerInch = 1440;
            let dpi = getDPI(); //@@@: int dpi = getDPI();
            return Convert.ToInt32((twips / (float)nTwipsPerInch) * dpi); //@@@: return Convert.ToInt32((twips / (float)nTwipsPerInch) * dpi);
        }; //@@@: }

        self.pt = function(pixels) { //@@@: public static int pt(int pixels) {
            self.int nTwipsPerInch = 1440; //@@@: const int nTwipsPerInch = 1440;
            let dpi = getDPI(); //@@@: int dpi = getDPI();
            return Convert.ToInt32((pixels / (float)dpi) * nTwipsPerInch); //@@@: return Convert.ToInt32((pixels / (float)dpi) * nTwipsPerInch);
        }; //@@@: }

        self.mt = function(millimeters) { //@@@: public static int mt(int millimeters) {
            self.int nTwipsPerInch = 1440; //@@@: const int nTwipsPerInch = 1440;
            return Convert.ToInt32(mi(millimeters) * nTwipsPerInch); //@@@: return Convert.ToInt32(mi(millimeters) * nTwipsPerInch);
        }; //@@@: }

        self.mp = function(millimeters) { //@@@: public static int mp(int millimeters)
            let dpi = getDPI(); //@@@: int dpi = getDPI();
            return Convert.ToInt32(mi(millimeters) * dpi); //@@@: return Convert.ToInt32(mi(millimeters) * dpi);
        }; //@@@: }

        self.mi = function(millimeters) { //@@@: public static double mi(double millimeters)
            return (millimeters * .03937); //@@@: return (millimeters * .03937);
        }; //@@@: }

        const getDPI = function() { //@@@: private static int getDPI()
			if (_dpi < 0) { //@@@: if (_dpi < 0)
				let currentDPI = 0; //@@@: int currentDPI = 0;
				{ //@@@: {
					{ //@@@: {
						currentDPI = g.DpiX; //@@@: currentDPI = (int)g.DpiX;
					} //@@@: }
				} //@@@: }
				_dpi = currentDPI; //@@@: _dpi = currentDPI;
			} //@@@: }
			return _dpi; //@@@: return _dpi;
        }; //@@@: }

        self.setEmailServer = function(rhs) { //@@@: public static void setEmailServer(String rhs) {
            cGlobals.gEmailServer = rhs; //@@@: cGlobals.gEmailServer = rhs;
        }; //@@@: }
        self.setEmailAddress = function(rhs) { //@@@: public static void setEmailAddress(String rhs)
            cGlobals.gEmailAddress = rhs; //@@@: cGlobals.gEmailAddress = rhs;
        }; //@@@: }
        self.setEmailPort = function(rhs) { //@@@: public static void setEmailPort(int rhs)
            cGlobals.gEmailPort = rhs; //@@@: cGlobals.gEmailPort = rhs;
        }; //@@@: }
        self.setEmailUser = function(rhs) { //@@@: public static void setEmailUser(String rhs)
            cGlobals.gEmailUser = rhs; //@@@: cGlobals.gEmailUser = rhs;
        }; //@@@: }
        self.setEmailPwd = function(rhs) { //@@@: public static void setEmailPwd(String rhs)
            cGlobals.gEmailPwd = rhs; //@@@: cGlobals.gEmailPwd = rhs;
        }; //@@@: }

        self.setEmailErrDescrip = function(rhs) { //@@@: public static void setEmailErrDescrip(String rhs)
            cGlobals.gEmailErrDescrip = rhs; //@@@: cGlobals.gEmailErrDescrip = rhs;
        }; //@@@: }

        self.getEmailServer = function() { //@@@: public static String getEmailServer()
            return cGlobals.gEmailServer; //@@@: return cGlobals.gEmailServer;
        }; //@@@: }
        self.getEmailAddress = function() { //@@@: public static String getEmailAddress()
            return cGlobals.gEmailAddress; //@@@: return cGlobals.gEmailAddress;
        }; //@@@: }
        self.getEmailPort = function() { //@@@: public static int getEmailPort()
            return cGlobals.gEmailPort; //@@@: return cGlobals.gEmailPort;
        }; //@@@: }
        self.getEmailUser = function() { //@@@: public static String getEmailUser()
            return cGlobals.gEmailUser; //@@@: return cGlobals.gEmailUser;
        }; //@@@: }
        self.getEmailPwd = function() { //@@@: public static String getEmailPwd()
            return cGlobals.gEmailPwd; //@@@: return cGlobals.gEmailPwd;
        }; //@@@: }

        self.getErrorDB = function() { //@@@: public static String getErrorDB()
            return cGlobals.gErrorDB; //@@@: return cGlobals.gErrorDB;
        }; //@@@: }
        self.setErrorDB = function(rhs) { //@@@: public static void setErrorDB(String rhs)
            cGlobals.gErrorDB = rhs; //@@@: cGlobals.gErrorDB = rhs;
        }; //@@@: }

        self.arrayToString = function(v) { //@@@: public static String arrayToString(int[] v) {
            let i = 0; //@@@: int i = 0;
            let s = ""; //@@@: String s = "";
            for (i = 0; i < v.Length; i++) { //@@@: for (i = 0; i < v.Length; i++)
                s = s + v[i].ToString() + ","; //@@@: s = s + v[i].ToString() + ",";
            } //@@@: }
            return removeLastColon(s); //@@@: return removeLastColon(s);
        }; //@@@: }

        self.arrayToString = function(v) { //@@@: public static String arrayToString(String[] v)
            let i = 0; //@@@: int i = 0;
            let s = ""; //@@@: String s = "";
            for (i = 0; i < v.Length; i++) { //@@@: for (i = 0; i < v.Length; i++)
                s = s + v[i] + ","; //@@@: s = s + v[i] + ",";
            } //@@@: }
            return removeLastColon(s); //@@@: return removeLastColon(s);
        }; //@@@: }

        self.existsFile = function(pathYName) { //@@@: public static bool existsFile(String pathYName)
            return File.Exists(pathYName); //@@@: return File.Exists(pathYName);
        }; //@@@: }

        /* TODO: remove me //@@@: /* TODO: remove me
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

        self.setSepDecimal = function() { //@@@: public static void setSepDecimal()
UNKNOWN >>             float n; //@@@: float n;
            float.TryParse("1.000", n); //@@@: float.TryParse("1.000", out n);
            if (n === 1) { //@@@: if (n == 1)
                m_sepDecimal = "."; //@@@: m_sepDecimal = ".";
            } //@@@: }
            else { //@@@: else
                float.TryParse("1,000", n); //@@@: float.TryParse("1,000", out n);
                if (n === 1) { //@@@: if (n == 1)
                    m_sepDecimal = ","; //@@@: m_sepDecimal = ",";
                } //@@@: }
            } //@@@: }
            if (m_sepDecimal === "")  { //@@@: if (m_sepDecimal == "")
                throw new KernelException( //@@@: throw new KernelException(
                    C_MODULE, //@@@: C_MODULE,
                    "The decimal symbol could not be determined."  //@@@: "The decimal symbol could not be determined."
                    + "Check in 'control panel/reginal settings' " //@@@: + "Check in 'control panel/reginal settings' "
                    + "that the values in the Numbers tab match the values " //@@@: + "that the values in the Numbers tab match the values "
                    + "in the Currency tab for field 'decimal symbol' and " //@@@: + "in the Currency tab for field 'decimal symbol' and "
                    + "'Digit grouping symbol'. "); //@@@: + "'Digit grouping symbol'. ");
            } //@@@: }
        }; //@@@: }

        self.getSepDecimal = function() { //@@@: public static String getSepDecimal()
            return m_sepDecimal; //@@@: return m_sepDecimal;
        }; //@@@: }

        self.getValidPath = function(path) { //@@@: public static String getValidPath(String path) {
            if (path.Substring(path.Length - 1) !== Path.DirectorySeparatorChar.ToString()) { path = path + Path.DirectorySeparatorChar; } //@@@: if (path.Substring(path.Length - 1) != Path.DirectorySeparatorChar.ToString()) { path = path + Path.DirectorySeparatorChar; }
            return path; //@@@: return path;
        }; //@@@: }

        //--------------------------------------------------------------------------------------------------------------------
        self.listAdd = function(list, value) { //@@@: public static void listAdd(ComboBox list, String value)
            listAdd_(list, value); //@@@: listAdd_(list, value);
        }; //@@@: }
        self.listAdd = function(list, value, id) { //@@@: public static void listAdd(ComboBox list, String value, int id)
            listAdd_(list, value, id); //@@@: listAdd_(list, value, id);
        }; //@@@: }
        self.listID = function(list) { //@@@: public static long listID(ComboBox list)
            return listID_(list); //@@@: return listID_(list);
        }; //@@@: }
        self.listItemData = function(list, index) { //@@@: public static long listItemData(ComboBox list, int index)
            return listItemData_(list, index); //@@@: return listItemData_(list, index);
        }; //@@@: }
        self.listSetListIndex = function(list, idx) { //@@@: public static void listSetListIndex(ComboBox list, int idx)
            listSetListIndex_(list, idx); //@@@: listSetListIndex_(list, idx);
        }; //@@@: }
        self.listSetListIndexForId = function(list, id) { //@@@: public static void listSetListIndexForId(ComboBox list, int id)
            listSetListIndexForId_(list, id); //@@@: listSetListIndexForId_(list, id);
        }; //@@@: }
        self.listSetListIndexForText = function(list, text) { //@@@: public static void listSetListIndexForText(ComboBox list, String text)
            listSetListIndexForText_(list, text); //@@@: listSetListIndexForText_(list, text);
        }; //@@@: }
        self.listChangeTextForSelected = function(list, value) { //@@@: public static void listChangeTextForSelected(ComboBox list, String value)
            listChangeTextForSelected_(list, value); //@@@: listChangeTextForSelected_(list, value);
        }; //@@@: }
        self.listChangeText = function(list, idx, value) { //@@@: public static void listChangeText(ComboBox list, int idx, String value)
            listChangeText_(list, idx, value); //@@@: listChangeText_(list, idx, value);
        }; //@@@: }
        self.listGetIndexFromItemData = function(list, valueItemData) { //@@@: public static int listGetIndexFromItemData(ComboBox list, int valueItemData)
            return listGetIndexFromItemData_(list, valueItemData); //@@@: return listGetIndexFromItemData_(list, valueItemData);
        }; //@@@: }

        const listAdd_ = function(list, value) { //@@@: private static void listAdd_(ComboBox list, String value)
            list.Items.Add(value); //@@@: list.Items.Add(value);
        }; //@@@: }
        const listAdd_ = function(list, value, id) { //@@@: private static void listAdd_(ComboBox list, String value, int id)
            list.Items.Add(new ListValueWithId(value, id)); //@@@: list.Items.Add(new ListValueWithId(value, id));
        }; //@@@: }
        const listID_ = function(list) { //@@@: private static long listID_(ComboBox list)
            if (list.SelectedIndex === -1) { return 0; } //@@@: if (list.SelectedIndex == -1) { return 0; }
            return (list.SelectedItem).Id; //@@@: return ((ListValueWithId)list.SelectedItem).Id;
        }; //@@@: }
        const listItemData_ = function(list, index) { //@@@: private static long listItemData_(ComboBox list, int index)
            let _rtn = 0; //@@@: long _rtn = 0;

            if (index < list.Items.Count) { //@@@: if (index < list.Items.Count)
                if (index === -1) { //@@@: if (index == -1)
                    _rtn = listID_(list); //@@@: _rtn = listID_(list);
                } //@@@: }
                else { //@@@: else
                    _rtn = (list.Items[index]).Id; //@@@: _rtn = ((ListValueWithId)list.Items[index]).Id;
                } //@@@: }
            } //@@@: }
            return _rtn; //@@@: return _rtn;
        }; //@@@: }
        const listSetListIndex_ = function(list, idx) { //@@@: private static void listSetListIndex_(ComboBox list, int idx)
            if (list.Items.Count < 1) { return; } //@@@: if (list.Items.Count < 1) { return; }
            if (list.Items.Count > idx) { list.SelectedIndex = idx; } //@@@: if (list.Items.Count > idx) { list.SelectedIndex = idx; }
        }; //@@@: }
        const listSetListIndexForId_ = function(list, id) { //@@@: private static void listSetListIndexForId_(ComboBox list, int id)
            let i = 0; //@@@: int i = 0;
            for (i = 0; i < list.Items.Count; i++) { //@@@: for (i = 0; i < list.Items.Count; i++)
                if ((list.Items[i]).Id === id) { //@@@: if (((ListValueWithId)list.Items[i]).Id == id)
                    list.SelectedIndex = i; //@@@: list.SelectedIndex = i;
                    break; //@@@: break;
                } //@@@: }
            } //@@@: }
        }; //@@@: }
        const listSetListIndexForText_ = function(list, text) { //@@@: private static void listSetListIndexForText_(ComboBox list, String text)
            let i = 0; //@@@: int i = 0;
            for (i = 0; i < list.Items.Count; i++) { //@@@: for (i = 0; i < list.Items.Count; i++)
                if (list.Items[i].ToString() === text) { //@@@: if (list.Items[i].ToString() == text)
                    list.SelectedIndex = i; //@@@: list.SelectedIndex = i;
                    break; //@@@: break;
                } //@@@: }
            } //@@@: }
        }; //@@@: }
        const listChangeTextForSelected_ = function(list, value) { //@@@: private static void listChangeTextForSelected_(ComboBox list, String value)
            listChangeText_(list, list.SelectedIndex, value); //@@@: listChangeText_(list, list.SelectedIndex, value);
        }; //@@@: }
        const listChangeText_ = function(list, idx, value) { //@@@: private static void listChangeText_(ComboBox list, int idx, String value)
            if (idx < list.Items.Count && idx > -1) { //@@@: if (idx < list.Items.Count && idx > -1)
                let item = list.Items[idx]; //@@@: object item = list.Items[idx];
                if (item is ListValueWithId) { //@@@: if (item is ListValueWithId)
                    (item).Text = value; //@@@: ((ListValueWithId)item).Text = value;
                } //@@@: }
                else { //@@@: else
                    list.Items[idx] = value; //@@@: list.Items[idx] = value;
                } //@@@: }
            } //@@@: }
        }; //@@@: }
        const listGetIndexFromItemData_ = function(list, valueItemData) { //@@@: private static int listGetIndexFromItemData_(ComboBox list, int valueItemData)
            for(var i = 0; i < list.Items.Count; i++) { //@@@: for (int i = 0; i < list.Items.Count; i++)

                if (list.Items[i] is ListValueWithId && (list.Items[i]).Id === valueItemData) { //@@@: if (list.Items[i] is ListValueWithId && ((ListValueWithId)list.Items[i]).Id == valueItemData)
                    return i; //@@@: return i;
                } //@@@: }
            } //@@@: }

            return -1; //@@@: return -1;
        }; //@@@: }

        /*  //@@@: /*
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
        self.setInfoString = function(source, key, value) { //@@@: public static String setInfoString(String source, String key, String value)
            key = "#" + key; //@@@: key = "#" + key;

            let i = source.ToLower().IndexOf(key.ToLower(), 0); //@@@: int i = source.ToLower().IndexOf(key.ToLower(), 0);

            // the key can't apears more than one
            //
            if (source.ToLower().IndexOf(key.ToLower(), i + 1) !== -1)  { //@@@: if (source.ToLower().IndexOf(key.ToLower(), i + 1) != -1)
                throw (new Exception("cUtil.getInfoString: the key can't apears more than one."));  //@@@: throw (new Exception("cUtil.getInfoString: the key can't apears more than one."));
            } //@@@: }

            // if the key is not present we add it to the end of the string
            //
            if (i === -1) { //@@@: if (i == -1)
                return source + key + "=" + value + ";"; //@@@: return source + key + "=" + value + ";";
            } //@@@: }
            else             { //@@@: else
                self.string c_errorstr = "cUtil.getInfoString: source invalid, the character {0} is not present."; //@@@: const string c_errorstr = "cUtil.getInfoString: source invalid, the character {0} is not present.";

                let j = source.ToLower().IndexOf(";".ToLower(), i); //@@@: int j = source.ToLower().IndexOf(";".ToLower(), i);
                if (j === -1)  { //@@@: if (j == -1)
                    throw (new Exception(String.Format(c_errorstr, ";")));  //@@@: throw (new Exception(String.Format(c_errorstr, ";")));
                } //@@@: }

                let k = source.Substring(i, j-i).ToLower().IndexOf("=".ToLower(), 0); //@@@: int k = source.Substring(i, j-i).ToLower().IndexOf("=".ToLower(), 0);
                if (k === -1)  { //@@@: if (k == -1)
                    throw (new Exception(String.Format(c_errorstr, "=")));  //@@@: throw (new Exception(String.Format(c_errorstr, "=")));
                } //@@@: }
                k = k + i; //@@@: k = k + i;
                return source.Substring(0, k) + value + source.Substring(j); //@@@: return source.Substring(0, k) + value + source.Substring(j);
            } //@@@: }
        }; //@@@: }

        self.getInfoString = function(source, key, defaultValue) { //@@@: public static String getInfoString(String source, String key, String defaultValue)

            if (String.IsNullOrEmpty(source)) { //@@@: if (String.IsNullOrEmpty(source)) {
                return defaultValue; //@@@: return defaultValue;
            } //@@@: }

            key = "#"+ key; //@@@: key = "#"+ key;

            let i = source.ToLower().IndexOf(key.ToLower(), 0); //@@@: int i = source.ToLower().IndexOf(key.ToLower(), 0);

            // the key can't apears more than one
            //
            if (source.ToLower().IndexOf(key.ToLower(), i + 1) !== -1)  { //@@@: if (source.ToLower().IndexOf(key.ToLower(), i + 1) != -1)
                throw(new Exception("cUtil.getInfoString: the key can't apears more than one."));  //@@@: throw(new Exception("cUtil.getInfoString: the key can't apears more than one."));
            } //@@@: }

            // if the key is not present return default
            //
            if (i === -1)  { //@@@: if (i == -1)
              return defaultValue; //@@@: return defaultValue;
            }  //@@@: }
            else  { //@@@: else
              self.string c_errorstr = "cUtil.getInfoString: source invalid, the character {0} is not present."; //@@@: const string c_errorstr = "cUtil.getInfoString: source invalid, the character {0} is not present.";

              let j = source.ToLower().IndexOf(";".ToLower(), i); //@@@: int j = source.ToLower().IndexOf(";".ToLower(), i);
              if (j === -1)  { //@@@: if (j == -1)
                  throw(new Exception(String.Format(c_errorstr, ";")));  //@@@: throw(new Exception(String.Format(c_errorstr, ";")));
              } //@@@: }

              let k = source.Substring(i, j-i).ToLower().IndexOf("=".ToLower(), 0); //@@@: int k = source.Substring(i, j-i).ToLower().IndexOf("=".ToLower(), 0);
              if (k === -1)  { //@@@: if (k == -1)
                  throw(new Exception(String.Format(c_errorstr, "=")));  //@@@: throw(new Exception(String.Format(c_errorstr, "=")));
              } //@@@: }
              k = k + i; //@@@: k = k + i;
              return source.Substring(k + 1, j - k - 1); //@@@: return source.Substring(k + 1, j - k - 1);
            } //@@@: }
        }; //@@@: }

        //--------------------------------------------------------------------------------------------------------------------
        self.getInput = function(value, descrip, title) { //@@@: public static bool getInput(ref string value, String descrip, String title) {
            let f = new fInput(); //@@@: fInput f = new fInput();
            f.setTitle(title); //@@@: f.setTitle(title);
            f.setDescrip(descrip); //@@@: f.setDescrip(descrip);
            f.setText(value); //@@@: f.setText(value);
            f.ShowDialog(); //@@@: f.ShowDialog();
            if (f.getOk()) { //@@@: if (f.getOk())
                value = f.getText(); //@@@: value = f.getText();
                return true; //@@@: return true;
            } //@@@: }
            else  { //@@@: else
                return false; //@@@: return false;
            } //@@@: }
        }; //@@@: }
        /* //@@@: /*
        public bool getInputEx(String value, String descrip) { // TODO: Use of ByRef founded Public Function GetInputEx(ByRef Value As String, Optional ByVal Descrip As String) As Boolean
            return mUtil.getInputEx_(value, descrip);
        }
         */ 
        self.removeLastColon = function(list) { //@@@: public static String removeLastColon(String list) {
            list = list.Trim(); //@@@: list = list.Trim();
            if (list.Substring(list.Length - 1) === ",") { //@@@: if (list.Substring(list.Length - 1) == ",")
                return list.Substring(0, list.Length - 1); //@@@: return list.Substring(0, list.Length - 1);
            } //@@@: }
            else { //@@@: else
                return list; //@@@: return list;
            } //@@@: }
        }; //@@@: }
        /* //@@@: /*
        public void sleep(int dwMilliseconds) {
            SubSleep(dwMilliseconds);
        }
        */
        self.setFocusControl = function(ctl) { //@@@: public static void setFocusControl(Control ctl)
            ctl.Select(); //@@@: ctl.Select();
        }; //@@@: }

        self.getComputerName = function() { //@@@: public static String getComputerName()
            return System.Environment.MachineName; //@@@: return System.Environment.MachineName;
        }; //@@@: }

        /* //@@@: /*
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
        self.divideByZero = function(x1, x2) { //@@@: public static double divideByZero(double x1, double x2)
            if (x2 !== 0) { //@@@: if (x2 != 0)
                return x1 / x2; //@@@: return x1 / x2;
            } //@@@: }
            else { //@@@: else
                return 0; //@@@: return 0;
            } //@@@: }
        }; //@@@: }

        self.subString = function(text, start, length) { //@@@: public static string subString(string text, int start, int length)
            if (String.IsNullOrEmpty(text)) { //@@@: if (String.IsNullOrEmpty(text))
                return ""; //@@@: return "";
            } //@@@: }
            else { //@@@: else
                if (text.Length - start < length) { //@@@: if (text.Length - start < length)
                    length = text.Length - start; //@@@: length = text.Length - start;
                } //@@@: }
                return text.Substring(start, length); //@@@: return text.Substring(start, length);
            } //@@@: }
        }; //@@@: }

        self.valAsInt = function(value) { //@@@: public static int valAsInt(object value)
            return Convert.ToInt32(val(value)); //@@@: return Convert.ToInt32(val(value));
        }; //@@@: }

        self.val = function(value) { //@@@: public static double val(object value)
            if (value === null) { //@@@: if (value == null)
                return 0; //@@@: return 0;
            } //@@@: }
            else { //@@@: else

                let typeCode = System.Type.GetTypeCode(value.GetType()); //@@@: System.TypeCode typeCode = System.Type.GetTypeCode(value.GetType());
                switch (typeCode) //@@@: switch (typeCode)
                { //@@@: {
                    case System.TypeCode.Char: //@@@: case System.TypeCode.Char:
                    case System.TypeCode.String: //@@@: case System.TypeCode.String:
                        let dbl = 0; //@@@: double dbl = 0;
                        if (double.TryParse(value, dbl)) { //@@@: if (double.TryParse((String)value, out dbl))
                            return dbl; //@@@: return dbl;
                        } //@@@: }
                        else { //@@@: else
                            return 0; //@@@: return 0;
                        } //@@@: }
                    case System.TypeCode.Decimal: //@@@: case System.TypeCode.Decimal:
                    case System.TypeCode.Double: //@@@: case System.TypeCode.Double:
                    case System.TypeCode.Int16: //@@@: case System.TypeCode.Int16:
                    case System.TypeCode.Int32: //@@@: case System.TypeCode.Int32:
                    case System.TypeCode.Int64: //@@@: case System.TypeCode.Int64:
                    case System.TypeCode.Single: //@@@: case System.TypeCode.Single:
                    case System.TypeCode.UInt16: //@@@: case System.TypeCode.UInt16:
                    case System.TypeCode.UInt32: //@@@: case System.TypeCode.UInt32:
                    case System.TypeCode.UInt64: //@@@: case System.TypeCode.UInt64:
                        return Convert.ToDouble(value); //@@@: return Convert.ToDouble(value);
                    case System.TypeCode.DateTime: //@@@: case System.TypeCode.DateTime:
                        return 0; //@@@: return 0;
                    case System.TypeCode.Boolean: //@@@: case System.TypeCode.Boolean:
                        if (value) { //@@@: if ((bool)value)
                            return 1; //@@@: return 1;
                        else { //@@@: else
                            return 0; //@@@: return 0;
                    default: //@@@: default:
                        return 0; //@@@: return 0;
                } //@@@: }
            } //@@@: }
        }; //@@@: }

        /* probably we will need it in the future //@@@: /* probably we will need it in the future
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

    } //@@@: }

    self.createListValueWithId = function() {

        const self = {}; //@@@: public class ListValueWithId {
        let value = null; //@@@: private string value;
        let id = null; //@@@: private int id;

        const ListValueWithId = function(value, id) { //@@@: public ListValueWithId(string value, int id)
            this.value = value; //@@@: this.value = value;
            this.id = id; //@@@: this.id = id;
        }; //@@@: }

        self. = function() { //@@@: public override string ToString()
            return value; //@@@: return value;
        }; //@@@: }

UNKNOWN >>         public int Id  //@@@: public int Id
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return id; //@@@: return id;
            } //@@@: }
        } //@@@: }

UNKNOWN >>         public string Text //@@@: public string Text
        { //@@@: {
UNKNOWN >>             set //@@@: set
            { //@@@: {
                Text = value; //@@@: Text = value;
            } //@@@: }
        } //@@@: }
        return self;

    } //@@@: }
}(globalObject)); //@@@: }
