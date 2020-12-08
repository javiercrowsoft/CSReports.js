(function(globalObject) {

    globalObject.CSXml = globalObject.CSXml || {}; //@@@: namespace CSXml
 //@@@: {

    globalObject.CSXml.createCXml = function() {

        const self = {}; //@@@: public class cXml : IDisposable

        const C_MODULE = "cXml"; //@@@: private const string C_MODULE = "cXml";

        let m_name = ""; //@@@: private string m_name = "";
        let m_path = ""; //@@@: private string m_path = "";
        let m_domDoc = new XmlDocument(); //@@@: private XmlDocument m_domDoc = new XmlDocument();
        let m_commDialog = null; //@@@: private object m_commDialog = null;
        let m_filter = ""; //@@@: private string m_filter = "";

        self.getName = function() { //@@@: public string getName()
            return m_name; //@@@: return m_name;
        }; //@@@: }

        self.setName = function(rhs) { //@@@: public void setName(string rhs)
            m_name = rhs; //@@@: m_name = rhs;
        }; //@@@: }

        self.getPath = function() { //@@@: public string getPath()
            let _rtn = ""; //@@@: string _rtn = "";
            if (m_path.Substring(m_path.Length - 1) === Path.DirectorySeparatorChar.ToString()) { //@@@: if (m_path.Substring(m_path.Length - 1) == Path.DirectorySeparatorChar.ToString())
                _rtn = m_path; //@@@: _rtn = m_path;
            } //@@@: }
            else { //@@@: else
                _rtn = m_path + Path.DirectorySeparatorChar; //@@@: _rtn = m_path + Path.DirectorySeparatorChar;
            } //@@@: }
            return _rtn; //@@@: return _rtn;
        }; //@@@: }

        self.setPath = function(rhs) { //@@@: public void setPath(string rhs)
            m_path = rhs; //@@@: m_path = rhs;
        }; //@@@: }

        self.getFilter = function() { //@@@: public string getFilter()
            return m_filter; //@@@: return m_filter;
        }; //@@@: }

        self.setFilter = function(rhs) { //@@@: public void setFilter(string rhs)
            m_filter = rhs; //@@@: m_filter = rhs;
        }; //@@@: }

        self.init = function(commDialog) { //@@@: public void init(object commDialog)
            m_commDialog = commDialog; //@@@: m_commDialog = commDialog;
        }; //@@@: }

        self.openXmlWithDialog = function() { //@@@: public bool openXmlWithDialog()
            try { //@@@: try
                let file = new CSKernelFile.cFile(); //@@@: CSKernelFile.cFile file = new CSKernelFile.cFile();
                file.setFilter(m_filter); //@@@: file.setFilter(m_filter);
                file.init("OpenXmlWithDialog", C_MODULE, m_commDialog); //@@@: file.init("OpenXmlWithDialog", C_MODULE, m_commDialog);

                if (!file.open(m_name, //@@@: if (!file.open(m_name,
                                eFileMode.eRead,  //@@@: eFileMode.eRead,
                                false,  //@@@: false,
                                false,  //@@@: false,
                                eFileAccess.eLockReadWrite,  //@@@: eFileAccess.eLockReadWrite,
                                true,  //@@@: true,
                                true))  { //@@@: true))
                    return false;  //@@@: return false;
                } //@@@: }

                m_name = file.getName(); //@@@: m_name = file.getName();
                m_path = file.getPath(); //@@@: m_path = file.getPath();

                file.close(); //@@@: file.close();

                file = null; //@@@: file = null;

                return openXml(); //@@@: return openXml();

            } //@@@: }
            catch (ex) { //@@@: catch (Exception ex)
                cError.mngError(ex, "OpenXmlWithDialog", C_MODULE, "There was an error trying to open file: " + m_name); //@@@: cError.mngError(ex, "OpenXmlWithDialog", C_MODULE, "There was an error trying to open file: " + m_name);
                return false; //@@@: return false;
            } //@@@: }
        }; //@@@: }

        self.openXml = function() { //@@@: public bool openXml()
            try { //@@@: try
                let file = ""; //@@@: string file = "";
                m_domDoc = new XmlDocument(); //@@@: m_domDoc = new XmlDocument();
                file = getPath() + m_name; //@@@: file = getPath() + m_name;

                let fileEx = new CSKernelFile.cFileEx(); //@@@: CSKernelFile.cFileEx fileEx = new CSKernelFile.cFileEx();
                if (fileEx.fileExists(file)) { //@@@: if (fileEx.fileExists(file))
                    if (!loadXml(file)) { //@@@: if (!loadXml(file))
                        return false; //@@@: return false;
                    } //@@@: }
                } //@@@: }
                else { //@@@: else
                    cWindow.msgWarning("The file;;" + file + ";;doesnt exists."); //@@@: cWindow.msgWarning("The file;;" + file + ";;doesnt exists.");
                    return false; //@@@: return false;
                } //@@@: }

                return true; //@@@: return true;
            } //@@@: }
            catch (ex) { //@@@: catch (Exception ex)
                cError.mngError(ex, "OpenXml", C_MODULE, "There was an error trying to open the file: " + m_name); //@@@: cError.mngError(ex, "OpenXml", C_MODULE, "There was an error trying to open the file: " + m_name);
                return false; //@@@: return false;
            } //@@@: }
        }; //@@@: }

        self.newXmlWithDialog = function() { //@@@: public bool newXmlWithDialog()
            try { //@@@: try
                let msg = ""; //@@@: string msg = "";
                let file = new CSKernelFile.cFile(); //@@@: CSKernelFile.cFile file = new CSKernelFile.cFile();

                file.init("NewXmlWithDialog", C_MODULE, m_commDialog); //@@@: file.init("NewXmlWithDialog", C_MODULE, m_commDialog);
                file.setFilter(m_filter); //@@@: file.setFilter(m_filter);

                let bExists = false; //@@@: bool bExists = false;
                let bReadonly = false; //@@@: bool bReadonly = false;

                if (!file.save(m_name, bExists, bReadonly, ""))  { //@@@: if (!file.save(m_name, out bExists, out bReadonly, ""))
                    return false;  //@@@: return false;
                } //@@@: }

                if (bExists && bReadonly) { //@@@: if (bExists && bReadonly)
                    msg = "There is already a file with this name and it is read only. Do you want to replace this file?"; //@@@: msg = "There is already a file with this name and it is read only. Do you want to replace this file?";
                } //@@@: }
                else if (bExists) { //@@@: else if (bExists)
                    if (m_name !== file.getName()) { //@@@: if (m_name != file.getName())
                        msg = "There is already a file with this name. Do you want to replace this file?"; //@@@: msg = "There is already a file with this name. Do you want to replace this file?";
                    } //@@@: }
                } //@@@: }

                if (msg !== "") { //@@@: if (msg != "")
                    if (!cWindow.ask(msg, MessageBoxDefaultButton.Button2, "Saving"))  { //@@@: if (!cWindow.ask(msg, MessageBoxDefaultButton.Button2, "Saving"))
                        return false;  //@@@: return false;
                    } //@@@: }
                } //@@@: }

                m_name = file.getName(); //@@@: m_name = file.getName();
                m_path = file.getPath(); //@@@: m_path = file.getPath();

                file = null; //@@@: file = null;

                return newXml(); //@@@: return newXml();
            } //@@@: }
            catch (ex) { //@@@: catch (Exception ex)
                cError.mngError(ex, "NewXmlWithDialog", C_MODULE, "There was an error trying to create the file: " + m_name); //@@@: cError.mngError(ex, "NewXmlWithDialog", C_MODULE, "There was an error trying to create the file: " + m_name);
                return false; //@@@: return false;
            } //@@@: }
        }; //@@@: }

        self.newXml = function() { //@@@: public bool newXml()
            try { //@@@: try
                m_domDoc = new XmlDocument(); //@@@: m_domDoc = new XmlDocument();
                let node = m_domDoc.CreateNode(XmlNodeType.Element, "Root", ""); //@@@: XmlNode node = m_domDoc.CreateNode(XmlNodeType.Element, "Root", "");
                m_domDoc.AppendChild(node); //@@@: m_domDoc.AppendChild(node);

                return true; //@@@: return true;
            } //@@@: }
            catch (ex) { //@@@: catch (Exception ex)
                cError.mngError(ex, "NewXml", C_MODULE, "There was an error trying to create the file: " + m_name); //@@@: cError.mngError(ex, "NewXml", C_MODULE, "There was an error trying to create the file: " + m_name);
                return false; //@@@: return false;
            } //@@@: }
        }; //@@@: }

        self.saveWithDialog = function() { //@@@: public bool saveWithDialog()
            try { //@@@: try
                let file = new CSKernelFile.cFile(); //@@@: CSKernelFile.cFile file = new CSKernelFile.cFile();

                if (!file.open(m_name, eFileMode.eWrite, false, false, eFileAccess.eLockWrite, false, false))  { //@@@: if (!file.open(m_name, eFileMode.eWrite, false, false, eFileAccess.eLockWrite, false, false))
                    return false;  //@@@: return false;
                } //@@@: }

                m_name = file.getName(); //@@@: m_name = file.getName();
                m_path = file.getPath(); //@@@: m_path = file.getPath();

                file = null; //@@@: file = null;

                return save(); //@@@: return save();
            } //@@@: }
            catch (ex) { //@@@: catch (Exception ex)
                cError.mngError(ex, "SaveWithDialog", C_MODULE, "There was an error trying to save the file: " + m_name); //@@@: cError.mngError(ex, "SaveWithDialog", C_MODULE, "There was an error trying to save the file: " + m_name);
                return false; //@@@: return false;
            }             //@@@: }
        }; //@@@: }

        self.setNodeText = function(node, text) { //@@@: public void setNodeText(XmlNode node, string text)
            node.Value = text; //@@@: node.Value = text;
        }; //@@@: }

        self.save = function() { //@@@: public bool save()
            try { //@@@: try
                m_domDoc.Save(getPath() + m_name); //@@@: m_domDoc.Save(getPath() + m_name);
                return true; //@@@: return true;
            } //@@@: }
            catch (ex) { //@@@: catch (Exception ex)
                cError.mngError(ex, "Save", C_MODULE, "There was an error trying to save the file: " + m_name); //@@@: cError.mngError(ex, "Save", C_MODULE, "There was an error trying to save the file: " + m_name);
                return false; //@@@: return false;
            } //@@@: }
        }; //@@@: }

        self.addProperty = function(xProperty) { //@@@: public bool addProperty(cXmlProperty xProperty)
            return addPropertyToNodeByTag("Root", xProperty); //@@@: return addPropertyToNodeByTag("Root", xProperty);
        }; //@@@: }

        self.addPropertyToNodeByTag = function(nodeTag, xProperty) { //@@@: public bool addPropertyToNodeByTag(string nodeTag, cXmlProperty xProperty)
            let w_element = m_domDoc.GetElementsByTagName(nodeTag); //@@@: XmlNodeList w_element = m_domDoc.GetElementsByTagName(nodeTag);
            return addPropertyToNode(w_element.Item(0), xProperty); //@@@: return addPropertyToNode(w_element.Item(0), xProperty);
        }; //@@@: }

        self.addPropertyToNode = function(node, xProperty) { //@@@: public bool addPropertyToNode(XmlNode node, cXmlProperty xProperty)
            let attr = m_domDoc.CreateAttribute(xProperty.getName()); //@@@: XmlAttribute attr = m_domDoc.CreateAttribute(xProperty.getName());
            attr.Value = xProperty.getValueString(eTypes.eVariant); //@@@: attr.Value = xProperty.getValueString(eTypes.eVariant);
            node.Attributes.Append(attr); //@@@: node.Attributes.Append(attr);
            return true; //@@@: return true;
        }; //@@@: }

        self.addBinaryPropertyToNode = function(node, xProperty) { //@@@: public bool addBinaryPropertyToNode(XmlNode node, cXmlProperty xProperty)
            let attr = m_domDoc.CreateAttribute(xProperty.getName()); //@@@: XmlAttribute attr = m_domDoc.CreateAttribute(xProperty.getName());
            attr.Value = Convert.ToBase64String(xProperty.getBinaryValue()); //@@@: attr.Value = Convert.ToBase64String(xProperty.getBinaryValue());
            node.Attributes.Append(attr); //@@@: node.Attributes.Append(attr);
            return true; //@@@: return true;
        }; //@@@: }

        self.addNode = function(xProperty) { //@@@: public XmlNode addNode(cXmlProperty xProperty)
            return addNodeToNodeByTag("Root", xProperty); //@@@: return addNodeToNodeByTag("Root", xProperty);
        }; //@@@: }

        self.addNodeToNodeByTag = function(nodeTag, xProperty) { //@@@: public XmlNode addNodeToNodeByTag(string nodeTag, cXmlProperty xProperty)
            let w_element = m_domDoc.GetElementsByTagName(nodeTag); //@@@: XmlNodeList w_element = m_domDoc.GetElementsByTagName(nodeTag);
            return addNodeToNode(w_element[0], xProperty); //@@@: return addNodeToNode(w_element[0], xProperty);
        }; //@@@: }

        self.addNodeToNode = function(nodeFather, xProperty) { //@@@: public XmlNode addNodeToNode(XmlNode nodeFather, cXmlProperty xProperty)
            let node = m_domDoc.CreateNode(XmlNodeType.Element, xProperty.getName(), ""); //@@@: XmlNode node = m_domDoc.CreateNode(XmlNodeType.Element, xProperty.getName(), "");
            nodeFather.AppendChild(node); //@@@: nodeFather.AppendChild(node);
            return node; //@@@: return node;
        }; //@@@: }

        self.getRootNode = function() { //@@@: public XmlNode getRootNode()
            if (m_domDoc.GetElementsByTagName("Root").Count > 0) { //@@@: if (m_domDoc.GetElementsByTagName("Root").Count > 0)
                return m_domDoc.GetElementsByTagName("Root")[0]; //@@@: return m_domDoc.GetElementsByTagName("Root")[0];
            } //@@@: }
            else { //@@@: else
                return null; //@@@: return null;
            } //@@@: }
        }; //@@@: }

        self.getNode = function(nodeTag) { //@@@: public XmlNode getNode(string nodeTag)
            if (m_domDoc.GetElementsByTagName(nodeTag).Count > 0) { //@@@: if (m_domDoc.GetElementsByTagName(nodeTag).Count > 0)
                return m_domDoc.GetElementsByTagName(nodeTag)[0]; //@@@: return m_domDoc.GetElementsByTagName(nodeTag)[0];
            } //@@@: }
            else { //@@@: else
                return null; //@@@: return null;
            } //@@@: }
        }; //@@@: }

        self.getNodeFromNode = function(node, nodeTag) { //@@@: public XmlNode getNodeFromNode(XmlNode node, string nodeTag)
            return node.SelectSingleNode(nodeTag); //@@@: return node.SelectSingleNode(nodeTag);
        }; //@@@: }

        self.getNodeChild = function(node) { //@@@: public XmlNode getNodeChild(XmlNode node)
            if (nodeHasChild(node)) { //@@@: if (nodeHasChild(node))
                return node.ChildNodes[0]; //@@@: return node.ChildNodes[0];
            } //@@@: }
            else { //@@@: else
                return null; //@@@: return null;
            } //@@@: }
        }; //@@@: }

        self.getNextNode = function(node) { //@@@: public XmlNode getNextNode(XmlNode node)
            return node.NextSibling; //@@@: return node.NextSibling;
        }; //@@@: }

        self.getNodeValue = function(node) { //@@@: public cXmlProperty getNodeValue(XmlNode node)
            let o = null; //@@@: cXmlProperty o = null;
            o = new cXmlProperty(); //@@@: o = new cXmlProperty();
            o.setValue(eTypes.eText, node.Name); //@@@: o.setValue(eTypes.eText, node.Name);
            return o; //@@@: return o;
        }; //@@@: }

        self.getNodeProperty = function(node, propertyName) { //@@@: public cXmlProperty getNodeProperty(XmlNode node, string propertyName)
            let o = new cXmlProperty(); //@@@: cXmlProperty o = new cXmlProperty();
            let txt = ""; //@@@: string txt = "";

            if (node.Attributes[propertyName] !== null) { //@@@: if (node.Attributes[propertyName] != null)
                txt = node.Attributes[propertyName].Value; //@@@: txt = node.Attributes[propertyName].Value;
            } //@@@: }

            // TODO: remove after testing
            //txt = txt.Replace("\n", "\\n");
            o.setValue(eTypes.eVariant, txt); //@@@: o.setValue(eTypes.eVariant, txt);
            return o; //@@@: return o;
        }; //@@@: }

        self.getBinaryNodeProperty = function(node, propertyName) { //@@@: public cXmlProperty getBinaryNodeProperty(XmlNode node, string propertyName)
            let attr = null; //@@@: XmlAttribute attr = null;
            let o = new cXmlProperty(); //@@@: cXmlProperty o = new cXmlProperty();
            let vBuffer = null; //@@@: byte[] vBuffer = null;

            let element = node; //@@@: XmlElement element = (XmlElement)node;
            attr = element.GetAttributeNode(propertyName); //@@@: attr = element.GetAttributeNode(propertyName);
            if (attr !== null) { //@@@: if (attr != null)
                vBuffer = System.Convert.FromBase64String(attr.Value); //@@@: vBuffer = System.Convert.FromBase64String(attr.Value);
            } //@@@: }
            else { //@@@: else
                G.redim(vBuffer, 0); //@@@: G.redim(ref vBuffer, 0);
            } //@@@: }

            o.setBinaryValue(vBuffer); //@@@: o.setBinaryValue(vBuffer);
            return o; //@@@: return o;
        }; //@@@: }

        self.nodeHasChild = function(node) { //@@@: public bool nodeHasChild(XmlNode node)
            return node.ChildNodes.Count > 0; //@@@: return node.ChildNodes.Count > 0;
        }; //@@@: }

        const loadXml = function(file) { //@@@: private bool loadXml(string file)
            try { //@@@: try
                m_domDoc.Load(file); //@@@: m_domDoc.Load(file);
                return true; //@@@: return true;
            } //@@@: }
            catch (ex) { //@@@: catch (Exception ex)
                cWindow.msgWarning("Open file has failded.;;"  //@@@: cWindow.msgWarning("Open file has failded.;;"
                                    + file  //@@@: + file
                                    + ";;Error: "  //@@@: + ";;Error: "
                                    + ex.Message); //@@@: + ex.Message);
                return false; //@@@: return false;
            } //@@@: }
        }; //@@@: }

        self.Dispose = function() { //@@@: public void Dispose()
            m_domDoc = null; //@@@: m_domDoc = null;
            m_commDialog = null; //@@@: m_commDialog = null;
        }; //@@@: }
        return self;

    } //@@@: }
}(globalObject)); //@@@: }
