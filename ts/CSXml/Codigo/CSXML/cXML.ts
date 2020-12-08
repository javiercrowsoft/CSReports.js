(function(globalObject) {

    globalObject.CSXml = globalObject.CSXml || {};


    globalObject.CSXml.createCXml = function() {

        const self = {};

        const C_MODULE: string= "cXml";

        let m_name: string= "";
        let m_path: string= "";
        let m_domDoc: XmlDocument= new XmlDocument();
        let m_commDialog: object= null;
        let m_filter: string= "";

        self.getName = function() {
            return m_name;
        };

        self.setName = function(rhs) {
            m_name = rhs;
        };

        self.getPath = function() {
            let _rtn: string= "";
            if (m_path.Substring(m_path.Length - 1) === Path.DirectorySeparatorChar.ToString()) {
                _rtn = m_path;
            }
            else {
                _rtn = m_path + Path.DirectorySeparatorChar;
            }
            return _rtn;
        };

        self.setPath = function(rhs) {
            m_path = rhs;
        };

        self.getFilter = function() {
            return m_filter;
        };

        self.setFilter = function(rhs) {
            m_filter = rhs;
        };

        self.init = function(commDialog) {
            m_commDialog = commDialog;
        };

        self.openXmlWithDialog = function() {
            try {
                let file: CSKernelFile.cFile= new CSKernelFile.cFile();
                file.setFilter(m_filter);
                file.init("OpenXmlWithDialog", C_MODULE, m_commDialog);

                if (!file.open(m_name,
                                eFileMode.eRead, 
                                false, 
                                false, 
                                eFileAccess.eLockReadWrite, 
                                true, 
                                true))  {
                    return false; 
                }

                m_name = file.getName();
                m_path = file.getPath();

                file.close();

                file = null;

                return openXml();

            }
            catch (ex) {
                cError.mngError(ex, "OpenXmlWithDialog", C_MODULE, "There was an error trying to open file: " + m_name);
                return false;
            }
        };

        self.openXml = function() {
            try {
                let file: string= "";
                m_domDoc =  globalObject.CSReportDll.createXmlDocument();
                file = getPath() + m_name;

                let fileEx: CSKernelFile.cFileEx= new CSKernelFile.cFileEx();
                if (fileEx.fileExists(file)) {
                    if (!loadXml(file)) {
                        return false;
                    }
                }
                else {
                    cWindow.msgWarning("The file;;" + file + ";;doesnt exists.");
                    return false;
                }

                return true;
            }
            catch (ex) {
                cError.mngError(ex, "OpenXml", C_MODULE, "There was an error trying to open the file: " + m_name);
                return false;
            }
        };

        self.newXmlWithDialog = function() {
            try {
                let msg: string= "";
                let file: CSKernelFile.cFile= new CSKernelFile.cFile();

                file.init("NewXmlWithDialog", C_MODULE, m_commDialog);
                file.setFilter(m_filter);

                let bExists: boolean= false;
                let bReadonly: boolean= false;

                if (!file.save(m_name, bExists, bReadonly, ""))  {
                    return false; 
                }

                if (bExists && bReadonly) {
                    msg = "There is already a file with this name and it is read only. Do you want to replace this file?";
                }
                else if (bExists) {
                    if (m_name !== file.getName()) {
                        msg = "There is already a file with this name. Do you want to replace this file?";
                    }
                }

                if (msg !== "") {
                    if (!cWindow.ask(msg, MessageBoxDefaultButton.Button2, "Saving"))  {
                        return false; 
                    }
                }

                m_name = file.getName();
                m_path = file.getPath();

                file = null;

                return newXml();
            }
            catch (ex) {
                cError.mngError(ex, "NewXmlWithDialog", C_MODULE, "There was an error trying to create the file: " + m_name);
                return false;
            }
        };

        self.newXml = function() {
            try {
                m_domDoc =  globalObject.CSReportDll.createXmlDocument();
                let node: XmlNode= m_domDoc.CreateNode(XmlNodeType.Element, "Root", "");
                m_domDoc.AppendChild(node);

                return true;
            }
            catch (ex) {
                cError.mngError(ex, "NewXml", C_MODULE, "There was an error trying to create the file: " + m_name);
                return false;
            }
        };

        self.saveWithDialog = function() {
            try {
                let file: CSKernelFile.cFile= new CSKernelFile.cFile();

                if (!file.open(m_name, eFileMode.eWrite, false, false, eFileAccess.eLockWrite, false, false))  {
                    return false; 
                }

                m_name = file.getName();
                m_path = file.getPath();

                file = null;

                return save();
            }
            catch (ex) {
                cError.mngError(ex, "SaveWithDialog", C_MODULE, "There was an error trying to save the file: " + m_name);
                return false;
            }            
        };

        self.setNodeText = function(node, text) {
            node.Value = text;
        };

        self.save = function() {
            try {
                m_domDoc.Save(getPath() + m_name);
                return true;
            }
            catch (ex) {
                cError.mngError(ex, "Save", C_MODULE, "There was an error trying to save the file: " + m_name);
                return false;
            }
        };

        self.addProperty = function(xProperty) {
            return addPropertyToNodeByTag("Root", xProperty);
        };

        self.addPropertyToNodeByTag = function(nodeTag, xProperty) {
            let w_element: XmlNodeList= m_domDoc.GetElementsByTagName(nodeTag);
            return addPropertyToNode(w_element.Item(0), xProperty);
        };

        self.addPropertyToNode = function(node, xProperty) {
            let attr: XmlAttribute= m_domDoc.CreateAttribute(xProperty.getName());
            attr.Value = xProperty.getValueString(eTypes.eVariant);
            node.Attributes.Append(attr);
            return true;
        };

        self.addBinaryPropertyToNode = function(node, xProperty) {
            let attr: XmlAttribute= m_domDoc.CreateAttribute(xProperty.getName());
            attr.Value = Convert.ToBase64String(xProperty.getBinaryValue());
            node.Attributes.Append(attr);
            return true;
        };

        self.addNode = function(xProperty) {
            return addNodeToNodeByTag("Root", xProperty);
        };

        self.addNodeToNodeByTag = function(nodeTag, xProperty) {
            let w_element: XmlNodeList= m_domDoc.GetElementsByTagName(nodeTag);
            return addNodeToNode(w_element[0], xProperty);
        };

        self.addNodeToNode = function(nodeFather, xProperty) {
            let node: XmlNode= m_domDoc.CreateNode(XmlNodeType.Element, xProperty.getName(), "");
            nodeFather.AppendChild(node);
            return node;
        };

        self.getRootNode = function() {
            if (m_domDoc.GetElementsByTagName("Root").Count > 0) {
                return m_domDoc.GetElementsByTagName("Root")[0];
            }
            else {
                return null;
            }
        };

        self.getNode = function(nodeTag) {
            if (m_domDoc.GetElementsByTagName(nodeTag).Count > 0) {
                return m_domDoc.GetElementsByTagName(nodeTag)[0];
            }
            else {
                return null;
            }
        };

        self.getNodeFromNode = function(node, nodeTag) {
            return node.SelectSingleNode(nodeTag);
        };

        self.getNodeChild = function(node) {
            if (nodeHasChild(node)) {
                return node.ChildNodes[0];
            }
            else {
                return null;
            }
        };

        self.getNextNode = function(node) {
            return node.NextSibling;
        };

        self.getNodeValue = function(node) {
            let o: cXmlProperty= null;
            o =  globalObject.CSReportDll.createCXmlProperty();
            o.setValue(eTypes.eText, node.Name);
            return o;
        };

        self.getNodeProperty = function(node, propertyName) {
            let o: cXmlProperty= new cXmlProperty();
            let txt: string= "";

            if (node.Attributes[propertyName] !== null) {
                txt = node.Attributes[propertyName].Value;
            }

            // TODO: remove after testing
            //txt = txt.Replace("\n", "\\n");
            o.setValue(eTypes.eVariant, txt);
            return o;
        };

        self.getBinaryNodeProperty = function(node, propertyName) {
            let attr: XmlAttribute= null;
            let o: cXmlProperty= new cXmlProperty();
            let vBuffer: byte[]= null;

            let element: XmlElement= node;
            attr = element.GetAttributeNode(propertyName);
            if (attr !== null) {
                vBuffer = System.Convert.FromBase64String(attr.Value);
            }
            else {
                G.redim(vBuffer, 0);
            }

            o.setBinaryValue(vBuffer);
            return o;
        };

        self.nodeHasChild = function(node) {
            return node.ChildNodes.Count > 0;
        };

        const loadXml = function(file) {
            try {
                m_domDoc.Load(file);
                return true;
            }
            catch (ex) {
                cWindow.msgWarning("Open file has failded.;;" 
                                    + file 
                                    + ";;Error: " 
                                    + ex.Message);
                return false;
            }
        };

        self.Dispose = function() {
            m_domDoc = null;
            m_commDialog = null;
        };
        return self;

    }
}(globalObject));
