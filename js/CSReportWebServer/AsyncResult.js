(function(globalObject) {

    globalObject.CSReportWebServer.NativeMessaging = globalObject.CSReportWebServer.NativeMessaging || {}; //@@@: namespace CSReportWebServer.NativeMessaging
 //@@@: {
    /// <summary>
    /// This class is an implementation of IAsyncResult interface specific to CSReportWebServer.NativeMessaging.Port class.
    /// </summary>
UNKNOWN >>     class AsyncResult : IAsyncResult //@@@: class AsyncResult : IAsyncResult
    { //@@@: {
        self.AsyncState { get { return state = null; } }; //@@@: public object AsyncState { get { return state; } }
        self.AsyncWaitHandle { get { return wait = null; } }; //@@@: public WaitHandle AsyncWaitHandle { get { return wait; } }
        self.CompletedSynchronously { get { return lengthCompletedSynchronously && messageCompletedSynchronously = null; } }; //@@@: public bool CompletedSynchronously { get { return lengthCompletedSynchronously && messageCompletedSynchronously; } }
        self.IsCompleted { get { return lengthIsCompleted && messageIsCompleted = null; } }; //@@@: public bool IsCompleted { get { return lengthIsCompleted && messageIsCompleted; } }

        let port { get = null; private set; }; //@@@: public Port port { get; private set; }
        let callback { get = null; private set; }; //@@@: public AsyncCallback callback { get; private set; }
        let state { get = null; private set; }; //@@@: public object state { get; private set; }
        let wait { get = null; private set; }; //@@@: public ManualResetEvent wait { get; private set; }

        self.lengthIsCompleted = null; //@@@: public bool lengthIsCompleted;
        self.lengthCompletedSynchronously = null; //@@@: public bool lengthCompletedSynchronously;
        self.lengthBuffer = null; //@@@: public byte[] lengthBuffer;
        self.lengthOffset = null; //@@@: public int lengthOffset;
        self.lengthException = null; //@@@: public Exception lengthException;

        self.messageIsCompleted = null; //@@@: public bool messageIsCompleted;
        self.messageCompletedSynchronously = null; //@@@: public bool messageCompletedSynchronously;
        self.messageBuffer = null; //@@@: public byte[] messageBuffer;
        self.messageOffset = null; //@@@: public int messageOffset;
        self.messageException = null; //@@@: public Exception messageException;

        self. = function(port, callback, state) { //@@@: public AsyncResult(Port port, AsyncCallback callback, object state)
            this.port = port; //@@@: this.port = port;
            this.callback = callback; //@@@: this.callback = callback;
            this.state = state; //@@@: this.state = state;
            wait = new ManualResetEvent(false); //@@@: wait = new ManualResetEvent(false);

            lengthIsCompleted = false; //@@@: lengthIsCompleted = false;
            lengthCompletedSynchronously = false; //@@@: lengthCompletedSynchronously = false;
            lengthBuffer = null; //@@@: lengthBuffer = null;
            lengthOffset = 0; //@@@: lengthOffset = 0;
            lengthException = null; //@@@: lengthException = null;

            messageIsCompleted = false; //@@@: messageIsCompleted = false;
            messageCompletedSynchronously = false; //@@@: messageCompletedSynchronously = false;
            messageBuffer = null; //@@@: messageBuffer = null;
            messageOffset = 0; //@@@: messageOffset = 0;
            messageException = null; //@@@: messageException = null;
        }; //@@@: }
    } //@@@: }
} //@@@: }
