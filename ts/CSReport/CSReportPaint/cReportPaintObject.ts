namespace CSReportPaint {

    import cReportAspect = CSReportDll.cReportAspect;
    import csRptSectionType = CSReportGlobals.csRptSectionType;

    export class cReportPaintObject {

        private aspect: cReportAspect = new cReportAspect();
        private key: string = "";
        private text: string = "";
        private paintType: csRptPaintObjType = null;
        private tag: string = "";
        private rptType: csRptSectionType = null;
        private rptKeySec: string = "";
        private image: Image = null;
        private indexField: number = 0;

        private isSection: boolean = null;
        private isSectionLine: boolean = null;

        private heightSec: number = 0;
        private heightSecLine: number = 0;
        private textLine: string = "";

        public getImage() {
            return this.image;
        }

        public setImage(rhs: Image|object) {
            this.image = rhs as Image;
        }

        public getAspect() {
            return this.aspect;
        }

        public setAspect(rhs: cReportAspect) {
            this.aspect = rhs;
        }

        public getKey() {
            return this.key;
        }

        public setKey(rhs: string) {
            this.key = rhs;
        }

        public getText() {
            return this.text;
        }

        public setText(rhs: string) {
            this.text = rhs;
        }

        public getPaintType() {
            return this.paintType;
        }

        public setPaintType(rhs: csRptPaintObjType) {
            this.paintType = rhs;
        }

        public getRptType() {
            return this.rptType;
        }

        public setRptType(rhs: csRptSectionType) {
            this.rptType = rhs;
        }

        public getTag() {
            return this.tag;
        }

        public setTag(rhs: string) {
            this.tag = rhs;
        }

        public getRptKeySec() {
            return this.rptKeySec;
        }

        public setRptKeySec(rhs: string) {
            this.rptKeySec = rhs;
        }

        public getIndexField() {
            return this.indexField;
        }

        public setIndexField(rhs: number) {
            this.indexField = rhs;
        }

        public getHeightSec() {
            return this.heightSec;
        }

        public setHeightSec(rhs: number) {
            this.heightSec = rhs;
        }

        public getHeightSecLine() {
            return this.heightSecLine;
        }

        public setHeightSecLine(rhs: number) {
            this.heightSecLine = rhs;
        }

        public getTextLine() {
            return this.textLine;
        }

        public setTextLine(rhs: string) {
            this.textLine = rhs;
        }

        public getIsSection() {
            return this.isSection;
        }

        public setIsSection(rhs: boolean) {
            this.isSection = rhs;
        }

        public getIsSectionLine() {
            return this.isSectionLine;
        }

        public setIsSectionLine(rhs: boolean) {
            this.isSectionLine = rhs;
        }

    }
}
