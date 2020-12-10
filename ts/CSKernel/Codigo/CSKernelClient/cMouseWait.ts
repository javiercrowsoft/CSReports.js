(function(globalObject) {

    globalObject.CSKernelClient = globalObject.CSKernelClient || {};



    globalObject.CSKernelClient.createCMouseWait = function() {

        // @ts-ignore
        let self: CSKernelClient.IcMouseWait = {};
        let m_lastCursor: Cursor = null;

        self.Dispose = function() {
            if (m_lastCursor !== null) {
                Cursor.Current = m_lastCursor;
            }
        };

        const cMouseWait = function() {
            m_lastCursor = Cursor.Current;
            Cursor.Current = Cursors.WaitCursor;
        };
        return self;

    }    }
}(globalObject));


namespace CSKernelClient {

  export interface IcMouseWait {

    Dispose: () => void;
  }
}
