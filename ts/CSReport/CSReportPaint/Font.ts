namespace CSReportPaint {

    export class Font {

        private _name: string;
        private _size: number;
        private _bold: string = '';
        private _italic: string = '';

        public _strike: boolean = false;        
        public _underline: boolean = false;

        constructor(name: string, 
                    size: number, 
                    bold?: boolean, 
                    italic?: boolean, 
                    strike: boolean = false, 
                    underline = false) {

            this._name = name;
            this._size = size;
            if(bold) this._bold = ' bold';
            if(italic) this._italic = ' italic';
            this._strike = strike;
            this._underline = underline;
        }

        toStringFont(): string {
            return this._name + this._bold + this._italic + ' ' + this._size + 'px';
        }

        get name() {
            return this._name;
        }
        get size() {
            return this._size;
        }
        get italic() {
            return this._italic !== '';
        }
        get bold() {
            return this._bold !== '';
        }
        get underline() {
            return this._underline;
        }
        get strike() {
            return this._strike;
        }                
    }
}
