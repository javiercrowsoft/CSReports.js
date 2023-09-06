namespace CSXml {

    export class XmlNode {
        value: string;
        childNodes: XmlNode[];
        nextSibling: XmlNode;
        name: string;
        attributes: XmlAttribute[];

        addAttribute(attr: CSXml.XmlAttribute) {

        }

        appendChild(node: CSXml.XmlNode) {

        }

        selectSingleNode(nodeTag: string): XmlNode {
            return null;
        }

        attributeByName(propertyName: string): XmlAttribute {
            return null;
        }
    }

}
