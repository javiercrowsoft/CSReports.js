namespace CSForms {

    export class Cursor {

        private cursor: string;

        public constructor(cursor: string) {
            this.cursor = cursor;
        }

        public static SizeNS = new Cursor('ns-resize');
        public static MoveAll = new Cursor('all-scroll');
        public static SizeNESW = new Cursor('nesw-resize');
        public static SizeEW = new Cursor('ew-resize');
        public static SizeNWSE = new Cursor('nwse-resize');
        public static Move = new Cursor('all-scroll');
        public static Default = new Cursor('default');

        toString() {
            return this.cursor;
        }
    }
}