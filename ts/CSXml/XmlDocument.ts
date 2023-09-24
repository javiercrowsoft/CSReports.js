namespace CSXml {

    export class XmlDocument {

        private xmlDoc: Document;

        appendChild(node: CSXml.XmlNode) {

        }

        createNode(root: string, s: string) {
            return undefined;
        }

        save(s: string) {

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