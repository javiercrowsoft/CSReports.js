namespace CSXml {

    export class XmlNode {
        private node: Element;
        value: string;
        private childrenLoaded = false;
        private childNodes: XmlNode[];
        name: string;
        attributes: XmlAttribute[];

        constructor(node: Element) {
            this.node = node;            
        }

        getChildNodes() {
            if(! this.childrenLoaded) {
                this.childNodes = Array.from(this.node.children).map(n => new XmlNode(n));
                this.childrenLoaded = true;
            }
            return this.childNodes;
        }

        getNextSibling() {
            const nextNode = this.node.nextSibling;
            if(nextNode === null) return null;
            // @ts-ignore
            return new XmlNode(nextNode);
        }

        addAttribute(attr: CSXml.XmlAttribute) {

        }

        appendChild(node: CSXml.XmlNode) {

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
