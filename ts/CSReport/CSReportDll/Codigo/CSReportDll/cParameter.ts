

namespace CSReportDll
{

    export class cParameter {


    {
        private C_MODULE: string = "cParameter";

        private name: string = "";
        private columnType: csDataType = null;
        private value: string = "";
        private position: number = 0;
        private key: string = "";
        private hasDefault: boolean = null;
        private default: string = "";
        private isNullable: boolean = null;
        private maxLength: number = 0;

        public getKey() {
            return this.key;
        }

        public setKey(rhs: string) {
            this.key = rhs;
        }

        public getName() {
            return this.name;
        }

        public setName(rhs: string) {
            this.name = rhs;
        }

        public getColumnType() {
            return this.columnType;
        }

        public setColumnType(rhs: csDataType) {
            this.columnType = rhs;
        }

        public getValue() {
            return this.value;
        }

        public setValue(rhs: string) {
            this.value = rhs;
        }

        public getPosition() {
            return this.position;
        }

        public setPosition(rhs: number) {
            this.position = rhs;
        }

        public getHasDefault() {
            return this.hasDefault;
        }

        public setHasDefault(rhs: boolean) {
            this.hasDefault = rhs;
        }

        public getDefaultValue() {
            return this.default;
        }

        public setDefaultValue(rhs: string) {
            this.default = rhs;
        }

        public getIsNullable() {
            return this.isNullable;
        }

        public setIsNullable(rhs: boolean) {
            this.isNullable = rhs;
        }

        public getMaxLength() {
            return this.maxLength;
        }

        public setMaxLength(rhs: number) {
            this.maxLength = rhs;
        }

        public load(xDoc: CSXml.cXml, nodeObj: XmlNode) {
            this.columnType = cDatabaseGlobals.getDataTypeFromAdo(xDoc.getNodeProperty(nodeObj, "TypeColumn").getValueInt(eTypes.eInteger));
            this.value = xDoc.getNodeProperty(nodeObj, "Value").getValueString(eTypes.eText);
            this.position = xDoc.getNodeProperty(nodeObj, "Position").getValueInt(eTypes.eInteger);
            this.name = xDoc.getNodeProperty(nodeObj, "Name").getValueString(eTypes.eText);
            this.maxLength = xDoc.getNodeProperty(nodeObj, "MaxLength").getValueInt(eTypes.eInteger);
            this.key = xDoc.getNodeProperty(nodeObj, "Key").getValueString(eTypes.eText);
            this.isNullable = xDoc.getNodeProperty(nodeObj, "IsNullable").getValueBool(eTypes.eBoolean);
            this.hasDefault = xDoc.getNodeProperty(nodeObj, "HasDefault").getValueBool(eTypes.eBoolean);
            this.default = xDoc.getNodeProperty(nodeObj, "Default").getValueString(eTypes.eText);

            return true;
        }

        public save(xDoc: CSXml.cXml, nodeFather: XmlNode) {
            let xProperty: CSXml.cXmlProperty = null;
            let nodeObj: XmlNode = null;
            xProperty = new CSXml.cXmlProperty();

            xProperty.setName(this.key);
            nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            xProperty.setName("Key");
            xProperty.setValue(eTypes.eText, this.key);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Name");
            xProperty.setValue(eTypes.eText, this.name);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Position");
            xProperty.setValue(eTypes.eInteger, this.position);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("TypeColumn");
            xProperty.setValue(eTypes.eInteger, cDatabaseGlobals.getAdoTypeFromDataType(this.columnType));
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Value");
            xProperty.setValue(eTypes.eText, this.value);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("MaxLength");
            xProperty.setValue(eTypes.eInteger, this.maxLength);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("IsNullable");
            xProperty.setValue(eTypes.eBoolean, this.isNullable);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("HasDefault");
            xProperty.setValue(eTypes.eBoolean, this.hasDefault);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Default");
            xProperty.setValue(eTypes.eText, this.default);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            return true;
        }



    }    }



}
