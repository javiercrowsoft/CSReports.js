namespace CSReportEditor {

    export class Control {

        private el: HTMLElement;
        private cursor = Cursors.Default;
        private text = "";
        private width = 0;
        private height = 0;
        private top = 0;
        private left = 0;

        public constructor(el: HTMLElement = null) {
            this.el = el;
        }

        public getElement() {
            return this.el;
        }

        setText(text: string) {
            this.text = text;
        }

        getText() {
            return this.text;
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

        getTop(): number {
            return this.top;
        }

        setTop(value: number) {
            this.top = value;
        }

        getLeft(): number {
            return this.left;
        }

        setLeft(value: number) {
            this.left = value;
        }

        focus() {

        }

        setEnabled(enabled: boolean) {
            //@ts-ignore
            if(this.el.disabled !== undefined) {
                //@ts-ignore
                this.el.disabled = ! enabled;
            }
        }

        dispose() {
            if(this.el) {
                try {
                    this.el.parentNode.removeChild(this.el);
                } catch(ex) {
                    console.log(ex);
                }
            }
        }

        disable() {
            this.setEnabled(false);
        }

    }
}