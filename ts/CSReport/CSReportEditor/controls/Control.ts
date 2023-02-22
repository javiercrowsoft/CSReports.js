namespace CSReportEditor {

    export class Control {

        private cursor = Cursors.Default;
        private text = "";

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
    }
}