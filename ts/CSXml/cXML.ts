namespace CSXml {

    import NotImplementedException = CSOAPI.NotImplementedException;
    import cWindow = CSKernelClient.cWindow;
    import MessageBoxDefaultButton = CSKernelClient.MessageBoxDefaultButton;
    import cError = CSKernelClient.cError;
    import eFileMode = CSKernelClient.eFileMode;
    import eFileAccess = CSKernelClient.eFileAccess;
    import eTypes = CSKernelClient.eTypes;
    import cFile = CSKernelFile.cFile;
    import FileContent = CSKernelFile.FileContent;

    export class cXml {

        private name: string = "";
        private path: string = "";
        private domDoc: XmlDocument = new XmlDocument();
        private filter: string = "";

        public getName() {
            return this.name;
        }

        public setName(rhs: string) {
            this.name = rhs;
        }

        public getPath() {
            let _rtn: string = "";
            if(this.path.substring(this.path.length - 1) === cFile.directorySeparatorChar()) {
                _rtn = this.path;
            }
            else {
                _rtn = this.path + cFile.directorySeparatorChar();
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

        public init() {

        }

        public openXmlWithDialog() {
            let file: CSKernelFile.cFile = new CSKernelFile.cFile();
            file.setFilter(this.filter);
            file.init("OpenXmlWithDialog");

            return file.userOpenFile().then((fc: FileContent) => {
                this.path = "{{unknown: running in browser}}"
                this.name = fc.name;
                this.domDoc.load(fc.content);
                return true;
            });
        }

        public openXml(): boolean {
            throw new NotImplementedException();
        }

        public newXmlWithDialog() {
            try {
                let msg: string = "";
                let file: CSKernelFile.cFile = new CSKernelFile.cFile();

                file.init("NewXmlWithDialog");
                file.setFilter(this.filter);

                let bExists: boolean = false;
                let bReadonly: boolean = false;

                if(!file.save(this.name, bExists, bReadonly, ""))  {
                    return false;
                }

                if(bExists && bReadonly) {
                    msg = "There is already a file with this name and it is read only. Do you want to replace this file?";
                }
                else if(bExists) {
                    if(this.name !== file.getName()) {
                        msg = "There is already a file with this name. Do you want to replace this file?";
                    }
                }

                if(msg !== "") {
                    if(!cWindow.ask(msg, MessageBoxDefaultButton.Button2))  {
                        return false;
                    }
                }

                this.name = file.getName();
                this.path = file.getPath();

                file = null;

                return this.newXml();
            }
            catch(ex) {
                cError.mngError(ex);
                return false;
            }
        }

        public newXml() {
            try {
                this.domDoc = new XmlDocument();
                let node: XmlNode = this.domDoc.createNode("Root", "");
                this.domDoc.appendChild(node);

                return true;
            }
            catch(ex) {
                cError.mngError(ex);
                return false;
            }
        }

        public saveWithDialog() {
            try {
                let file: CSKernelFile.cFile = new CSKernelFile.cFile();

                if(!file.open(this.name, eFileMode.eWrite, false, false, eFileAccess.eLockWrite, false, false))  {
                    return false;
                }

                this.name = file.getName();
                this.path = file.getPath();

                file = null;

                return this.save();
            }
            catch(ex) {
                cError.mngError(ex);
                return false;
            }
        }

        public setNodeText(node: XmlNode, text: string) {
            node.value = text;
        }

        public save() {
            try {
                this.domDoc.save(this.getPath() + this.name);
                return true;
            }
            catch(ex) {
                cError.mngError(ex);
                return false;
            }
        }

        public addProperty(xProperty: cXmlProperty) {
            return this.addPropertyToNodeByTag("Root", xProperty);
        }

        public addPropertyToNodeByTag(nodeTag: string, xProperty: cXmlProperty) {
            let element = this.domDoc.getElementsByTagName(nodeTag);
            return this.addPropertyToNode(element[0], xProperty);
        }

        public addPropertyToNode(node: XmlNode, xProperty: cXmlProperty) {
            let attr = this.domDoc.createAttribute(xProperty.getName());
            attr.value = xProperty.getValueString(eTypes.eVariant);
            node.addAttribute(attr);
            return true;
        }

        public addBinaryPropertyToNode(node: XmlNode, xProperty: cXmlProperty) {
            let attr: XmlAttribute = this.domDoc.createAttribute(xProperty.getName());
            attr.value = btoa(xProperty.getBinaryValue());
            node.addAttribute(attr);
            return true;
        }

        public addNode(xProperty: cXmlProperty) {
            return this.addNodeToNodeByTag("Root", xProperty);
        }

        public addNodeToNodeByTag(nodeTag: string, xProperty: cXmlProperty) {
            let element = this.domDoc.getElementsByTagName(nodeTag);
            return this.addNodeToNode(element[0], xProperty);
        }

        public addNodeToNode(nodeFather: XmlNode, xProperty: cXmlProperty) {
            let node: XmlNode = this.domDoc.createNode(xProperty.getName(), "");
            nodeFather.appendChild(node);
            return node;
        }

        public getRootNode() {
            if(this.domDoc.getElementsByTagName("Root").length > 0) {
                return this.domDoc.getElementsByTagName("Root")[0];
            }
            else {
                return null;
            }
        }

        public getNode(nodeTag: string) {
            if(this.domDoc.getElementsByTagName(nodeTag).length > 0) {
                return this.domDoc.getElementsByTagName(nodeTag)[0];
            }
            else {
                return null;
            }
        }

        public getNodeFromNode(node: XmlNode, nodeTag: string) {
            return node.selectSingleNode(nodeTag);
        }

        public getNodeChild(node: XmlNode) {
            if(this.nodeHasChild(node)) {
                return node.getChildNodes()[0];
            }
            else {
                return null;
            }
        }

        public getNextNode(node: XmlNode) {
            return node.getNextSibling();
        }

        public getNodeValue(node: XmlNode) {
            let o = new cXmlProperty();
            o.setValue(eTypes.eText, node.name);
            return o;
        }

        public getNodeProperty(node: XmlNode, propertyName: string) {
            try {
                let o: cXmlProperty = new cXmlProperty();
                let txt: string = "";
                if(node.attributeByName(propertyName) !== null) {
                    txt = node.attributeByName(propertyName).value;
                }
                o.setValue(eTypes.eVariant, txt);
                return o;
            }
            catch(ex) {
                cError.mngError(ex);
                throw ex;
            }
        }

        public getBinaryNodeProperty(node: XmlNode, propertyName: string) {
            let o: cXmlProperty = new cXmlProperty();
            let vBuffer;

            let attr = node.attributeByName(propertyName);
            if(attr !== null) {
                vBuffer = cXml.base64ToArrayBuffer(attr.value);
            }
            else {
                vBuffer = [];
            }

            o.setBinaryValue(vBuffer);
            return o;
        }

        private static base64ToArrayBuffer(base64) {
            let binaryString = atob(base64);
            let bytes = new Uint8Array(binaryString.length);
            for(let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            return bytes.buffer;
        }

        public nodeHasChild(node: XmlNode) {
            return node.getChildNodes().length > 0;
        }

        private loadXml(file: string) {
            try {

                return true;
            }
            catch(ex) {
                cWindow.msgWarning("Open file has failded.;;"
                                    + file
                                    + ";;Error: "
                                    + ex.Message);
                return false;
            }
        }
    }
}
