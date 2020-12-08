(function(globalObject) {

    globalObject.CSKernelClient = globalObject.CSKernelClient || {};



    globalObject.CSKernelClient.createCMouseWait = function() {

        const self = {};
        let m_lastCursor = null;

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

    }
}(globalObject));
