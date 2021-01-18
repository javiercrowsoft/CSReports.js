

namespace CSKernelClient
{


    export class cMouseWait {


    {
        private lastCursor: Cursor = null;

        public Dispose() {
            if (this.lastCursor !== null) {
                Cursor.Current = this.lastCursor;
            }
        }

        public constructor() {
            this.lastCursor = Cursor.Current;
            Cursor.Current = Cursors.WaitCursor;
        }


    }    }
}
