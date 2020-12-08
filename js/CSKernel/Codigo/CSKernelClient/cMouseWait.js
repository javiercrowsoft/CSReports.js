(function(globalObject) {

    globalObject.CSKernelClient = globalObject.CSKernelClient || {}; //@@@: namespace CSKernelClient
 //@@@: {


    globalObject.CSKernelClient.createCMouseWait = function() {

        const self = {}; //@@@: public class cMouseWait : IDisposable
        let m_lastCursor = null; //@@@: private Cursor m_lastCursor = null;

        self.Dispose = function() { //@@@: public void Dispose()
            if (m_lastCursor !== null) { //@@@: if (m_lastCursor != null)
                Cursor.Current = m_lastCursor; //@@@: Cursor.Current = m_lastCursor;
            } //@@@: }
        }; //@@@: }

        const cMouseWait = function() { //@@@: public cMouseWait()
            m_lastCursor = Cursor.Current; //@@@: m_lastCursor = Cursor.Current;
            Cursor.Current = Cursors.WaitCursor; //@@@: Cursor.Current = Cursors.WaitCursor;
        }; //@@@: }
        return self;

    } //@@@: }
}(globalObject)); //@@@: }
