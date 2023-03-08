namespace CSReportEditor {

    export class Control {

        private cursor = Cursors.Default;
        private text = "";
        private width = 0;
        private height = 0;

        setText(text: string) {
            this.text = text;
        }

        getText() {
            return "";
        }

        getCursor(): Cursors {
            return this.cursor;
        }

        setCursor(value: Cursors) {
            this.cursor = value;
        }

        getWidth(): number {
            return this.width;
        }

        setWidth(value: number) {
            this.width = value;
        }

        getHeight(): number {
            return this.height;
        }

        setHeight(value: number) {
            this.height = value;
        }
    }
}