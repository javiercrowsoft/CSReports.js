namespace CSXml {

    export class cXml {

        private name: string = "";
        private path: string = "";
        private domDoc: XmlDocument = new XmlDocument();
        private commDialog: object = null;
        private filter: string = "";

        public getName() {
            return this.name;
        }

        public setName(rhs: string) {
            this.name = rhs;
        }

        public getPath() {
            let _rtn: string = "";
            if (this.path.substring(this.path.length - 1) === Path.DirectorySeparatorChar.toString()) {
                _rtn = this.path;
            }
            else {
                _rtn = this.path + Path.DirectorySeparatorChar;
            }
            return _rtn;
        }

        public setPath(rhs: string) {
            this.path = rhs;
        }

        public getFilter() {
            return this.filter;
        }

        public setFilter(rhs: string) {
            this.filter = rhs;
        }

        public init(commDialog: object) {
            this.commDialog = commDialog;
        }

        public openXmlWithDialog() {
            try {
                let file: CSKernelFile.cFile = new CSKernelFile.cFile();
                file.setFilter(this.filter);
                file.init("OpenXmlWithDialog", C_MODULE, this.commDialog);

                if (!file.open(this.name,
                                eFileMode.eRead, 
                                false, 
                                false, 
                                eFileAccess.eLockReadWrite, 
                                true, 
                                true))  {
                    return false; 
                }

                this.name = file.getName();
                this.path = file.getPath();

                file.close();

                file = null;

                return openXml();

            }
            catch (ex) {
                cError.mngError(ex);
                return false;
            }
        }

        public openXml() {
            try {
                let file: string = "";
                this.domDoc = new XmlDocument();
                file = getPath() + this.name;

                let fileEx: CSKernelFile.cFileEx = new CSKernelFile.cFileEx();
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
                cError.mngError(ex);
                return false;
            }
        }

        public newXmlWithDialog() {
            try {
                let msg: string = "";
                let file: CSKernelFile.cFile = new CSKernelFile.cFile();

                file.init("NewXmlWithDialog", C_MODULE, this.commDialog);
                file.setFilter(this.filter);

                let bExists: boolean = false;
                let bReadonly: boolean = false;

                if (!file.save(this.name, bExists, bReadonly, ""))  {
                    return false; 
                }

                if (bExists && bReadonly) {
                    msg = "There is already a file with this name and it is read only. Do you want to replace this file?";
                }
                else if (bExists) {
                    if (this.name !== file.getName()) {
                        msg = "There is already a file with this name. Do you want to replace this file?";
                    }
                }

                if (msg !== "") {
                    if (!cWindow.ask(msg, MessageBoxDefaultButton.Button2, "Saving"))  {
                        return false; 
                    }
                }

                this.name = file.getName();
                this.path = file.getPath();

                file = null;

                return newXml();
            }
            catch (ex) {
                cError.mngError(ex);
                return false;
            }
        }

        public newXml() {
            try {
                this.domDoc = new XmlDocument();
                let node: XmlNode = this.domDoc.CreateNode(XmlNodeType.Element, "Root", "");
                this.domDoc.AppendChild(node);

                return true;
            }
            catch (ex) {
                cError.mngError(ex);
                return false;
            }
        }

        public saveWithDialog() {
            try {
                let file: CSKernelFile.cFile = new CSKernelFile.cFile();

                if (!file.open(this.name, eFileMode.eWrite, false, false, eFileAccess.eLockWrite, false, false))  {
                    return false; 
                }

                this.name = file.getName();
                this.path = file.getPath();

                file = null;

                return save();
            }
            catch (ex) {
                cError.mngError(ex);
                return false;
            }            
        }

        public setNodeText(node: XmlNode, text: string) {
            node.Value = text;
        }

        public save() {
            try {
                this.domDoc.Save(getPath() + this.name);
                return true;
            }
            catch (ex) {
                cError.mngError(ex);
                return false;
            }
        }

        public addProperty(xProperty: cXmlProperty) {
            return addPropertyToNodeByTag("Root", xProperty);
        }

        public addPropertyToNodeByTag(nodeTag: string, xProperty: cXmlProperty) {
            let w_element: XmlNodeList = this.domDoc.GetElementsByTagName(nodeTag);
            return addPropertyToNode(w_element.Item(0), xProperty);
        }

        public addPropertyToNode(node: XmlNode, xProperty: cXmlProperty) {
            let attr: XmlAttribute = this.domDoc.CreateAttribute(xProperty.getName());
            attr.Value = xProperty.getValueString(eTypes.eVariant);
            node.Attributes.Append(attr);
            return true;
        }

        public addBinaryPropertyToNode(node: XmlNode, xProperty: cXmlProperty) {
            let attr: XmlAttribute = this.domDoc.CreateAttribute(xProperty.getName());
            attr.Value = Convert.ToBase64String(xProperty.getBinaryValue());
            node.Attributes.Append(attr);
            return true;
        }

        public addNode(xProperty: cXmlProperty) {
            return this.addNodeToNodeByTag("Root", xProperty);
        }

        public addNodeToNodeByTag(nodeTag: string, xProperty: cXmlProperty) {
            let w_element: XmlNodeList = this.domDoc.GetElementsByTagName(nodeTag);
            return this.addNodeToNode(w_element[0], xProperty);
        }

        public addNodeToNode(nodeFather: XmlNode, xProperty: cXmlProperty) {
            let node: XmlNode = this.domDoc.CreateNode(XmlNodeType.Element, xProperty.getName(), "");
            nodeFather.AppendChild(node);
            return node;
        }

        public getRootNode() {
            if (this.domDoc.GetElementsByTagName("Root").Count > 0) {
                return this.domDoc.GetElementsByTagName("Root")[0];
            }
            else {
                return null;
            }
        }

        public getNode(nodeTag: string) {
            if (this.domDoc.GetElementsByTagName(nodeTag).Count > 0) {
                return this.domDoc.GetElementsByTagName(nodeTag)[0];
            }
            else {
                return null;
            }
        }

        public getNodeFromNode(node: XmlNode, nodeTag: string) {
            return node.SelectSingleNode(nodeTag);
        }

        public getNodeChild(node: XmlNode) {
            if (nodeHasChild(node)) {
                return node.ChildNodes[0];
            }
            else {
                return null;
            }
        }

        public getNextNode(node: XmlNode) {
            return node.NextSibling;
        }

        public getNodeValue(node: XmlNode) {
            let o: cXmlProperty = null;
            o = new cXmlProperty();
            o.setValue(eTypes.eText, node.Name);
            return o;
        }

        public getNodeProperty(node: XmlNode, propertyName: string) {
            let o: cXmlProperty = new cXmlProperty();
            let txt: string = "";

            if (node.Attributes[propertyName] !== null) {
                txt = node.Attributes[propertyName].Value;
            }

            // TODO: remove after testing
            //txt = txt.replace("\n", "\\n");
            o.setValue(eTypes.eVariant, txt);
            return o;
        }

        public getBinaryNodeProperty(node: XmlNode, propertyName: string) {
            let attr: XmlAttribute = null;
            let o: cXmlProperty = new cXmlProperty();
            let vBuffer: byte[] = null;

            let element: XmlElement = node;
            attr = element.GetAttributeNode(propertyName);
            if (attr !== null) {
                vBuffer = System.Convert.FromBase64String(attr.Value);
            }
            else {
                vBuffer = [];
            }

            o.setBinaryValue(vBuffer);
            return o;
        }

        public nodeHasChild(node: XmlNode) {
            return node.ChildNodes.Count > 0;
        }

        private loadXml(file: string) {
            try {
                this.domDoc.Load(file);
                return true;
            }
            catch (ex) {
                cWindow.msgWarning("Open file has failded.;;" 
                                    + file 
                                    + ";;Error: " 
                                    + ex.Message);
                return false;
            }
        }
    }
}
