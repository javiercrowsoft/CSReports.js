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
            if(bold) this._bold = 'bold ';
            if(italic) this._italic = 'italic ';
            this._strike = strike;
            this._underline = underline;
        }

        toStringFont(): string {
            return this._bold + this._italic + this._size + 'px ' + this._name;
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

        static availableFonts() {
            const fontCheck = new Set([
                // Windows 10
                'Arial', 'Arial Black', 'Bahnschrift', 'Calibri', 'Cambria', 'Cambria Math', 'Candara', 'Comic Sans MS', 'Consolas', 'Constantia', 'Corbel', 'Courier New', 'Ebrima', 'Franklin Gothic Medium', 'Gabriola', 'Gadugi', 'Georgia', 'HoloLens MDL2 Assets', 'Impact', 'Ink Free', 'Javanese Text', 'Leelawadee UI', 'Lucida Console', 'Lucida Sans Unicode', 'Malgun Gothic', 'Marlett', 'Microsoft Himalaya', 'Microsoft JhengHei', 'Microsoft New Tai Lue', 'Microsoft PhagsPa', 'Microsoft Sans Serif', 'Microsoft Tai Le', 'Microsoft YaHei', 'Microsoft Yi Baiti', 'MingLiU-ExtB', 'Mongolian Baiti', 'MS Gothic', 'MV Boli', 'Myanmar Text', 'Nirmala UI', 'Palatino Linotype', 'Segoe MDL2 Assets', 'Segoe Print', 'Segoe Script', 'Segoe UI', 'Segoe UI Historic', 'Segoe UI Emoji', 'Segoe UI Symbol', 'SimSun', 'Sitka', 'Sylfaen', 'Symbol', 'Tahoma', 'Times New Roman', 'Trebuchet MS', 'Verdana', 'Webdings', 'Wingdings', 'Yu Gothic',
                // macOS
                'American Typewriter', 'Andale Mono', 'Arial', 'Arial Black', 'Arial Narrow', 'Arial Rounded MT Bold', 'Arial Unicode MS', 'Avenir', 'Avenir Next', 'Avenir Next Condensed', 'Baskerville', 'Big Caslon', 'Bodoni 72', 'Bodoni 72 Oldstyle', 'Bodoni 72 Smallcaps', 'Bradley Hand', 'Brush Script MT', 'Chalkboard', 'Chalkboard SE', 'Chalkduster', 'Charter', 'Cochin', 'Comic Sans MS', 'Copperplate', 'Courier', 'Courier New', 'Didot', 'DIN Alternate', 'DIN Condensed', 'Futura', 'Geneva', 'Georgia', 'Gill Sans', 'Helvetica', 'Helvetica Neue', 'Herculanum', 'Hoefler Text', 'Impact', 'Lucida Grande', 'Luminari', 'Marker Felt', 'Menlo', 'Microsoft Sans Serif', 'Monaco', 'Noteworthy', 'Optima', 'Palatino', 'Papyrus', 'Phosphate', 'Rockwell', 'Savoye LET', 'SignPainter', 'Skia', 'Snell Roundhand', 'Tahoma', 'Times', 'Times New Roman', 'Trattatello', 'Trebuchet MS', 'Verdana', 'Zapfino',
            ].sort());

            // @ts-ignore
            return document.fonts.ready.then(() => {
                const fontAvailable = new Set<string>();

                fontCheck.forEach((font) => {
                    // @ts-ignore
                    if(document.fonts.check(`12px "${font}"`)) {
                        fontAvailable.add(font);
                    }
                });

                return fontAvailable;
            });
        }
    }
}
