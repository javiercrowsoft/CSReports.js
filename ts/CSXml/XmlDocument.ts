namespace CSXml {

    import NotImplementedException = CSOAPI.NotImplementedException;

    export class XmlDocument {

        private xmlDoc: Document;

        public constructor() {
            this.xmlDoc = new Document();
        }

        appendChild(node: CSXml.XmlNode) {
            this.xmlDoc.appendChild(node.getDomNode());
        }

        createNode(name: string, value: string) {
            let node = this.xmlDoc.createElement(name);
            node.nodeValue = value;
            return new XmlNode(node);
        }

        save(filename: string) {
            throw new NotImplementedException();
        }

        getElementsByTagName(nodeTag: string): XmlNode[] {
            // @ts-ignore
            return Array.from(this.xmlDoc.getElementsByTagName(nodeTag))
                .map(node => new XmlNode(node));
        }

        createAttribute(name: string): XmlAttribute {
            return new XmlAttribute(name);
        }

        load(xmlText: string) {
            const parser = new DOMParser();
            this.xmlDoc = parser.parseFromString(xmlText, "application/xml");
        }
    }
}