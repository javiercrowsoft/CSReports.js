namespace CSXml {

    export class XmlNode {

        private node: Element;

        value: string;
        name: string;
        private childrenLoaded = false;
        private childNodes: XmlNode[];

        constructor(node: Element) {
            this.node = node;
        }

        getDomNode() {
            return this.node;
        }

        getChildNodes() {
            if(! this.childrenLoaded) {
                this.childNodes = Array.from(this.node.children).map(n => new XmlNode(n));
                this.childrenLoaded = true;
            }
            return this.childNodes;
        }

        getNextSibling() {
            let nextNode = this.node.nextSibling;
            while(true) {
                if(nextNode === null) return null;
                // @ts-ignore
                if(nextNode.nodeName !== "#text") return new XmlNode(nextNode);
                nextNode = nextNode.nextSibling;
            }
        }

        addAttribute(attr: CSXml.XmlAttribute) {
            this.node.setAttribute(attr.name, attr.value);
        }

        appendChild(node: CSXml.XmlNode) {
            this.node.appendChild(node.getDomNode())
        }

        selectSingleNode(nodeTag: string): XmlNode {
            const node = this.node.getElementsByTagName(nodeTag)[0];
            if(node) {
                return new XmlNode(node);
            }
            else {
                return null;
            }
        }

        attributeByName(propertyName: string): XmlAttribute {
            let value = this.node.getAttribute(propertyName)
            if(value) {
                let xmlAtt = new XmlAttribute(propertyName);
                xmlAtt.value = value;
                return xmlAtt;
            }
            else {
                return null;
            }
        }
    }

}
