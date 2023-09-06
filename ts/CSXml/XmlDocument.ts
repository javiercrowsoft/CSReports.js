namespace CSXml {

    export class XmlDocument {

        appendChild(node: CSXml.XmlNode) {

        }

        createNode(root: string, s: string) {
            return undefined;
        }

        save(s: string) {

        }

        getElementsByTagName(nodeTag: string): XmlNode[] {
            return [];
        }

        createAttribute(name: string): XmlAttribute {
            return new XmlAttribute(name);
        }

        load(file: string) {

        }
    }
}