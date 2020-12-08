(function(globalObject) {

    globalObject.CSReportWebServer.NativeMessaging = globalObject.CSReportWebServer.NativeMessaging || {};

    /// <summary>
    /// This class is an implementation of IAsyncResult interface specific to CSReportWebServer.NativeMessaging.Port class.
    /// </summary>
UNKNOWN >>     class AsyncResult : IAsyncResult
    {
        self.AsyncState { get { return state = null; } };
        self.AsyncWaitHandle { get { return wait = null; } };
        self.CompletedSynchronously { get { return lengthCompletedSynchronously && messageCompletedSynchronously = null; } };
        self.IsCompleted { get { return lengthIsCompleted && messageIsCompleted = null; } };

        let port { get = null; private set; };
        let callback { get = null; private set; };
        let state { get = null; private set; };
        let wait { get = null; private set; };

        self.lengthIsCompleted = null;
        self.lengthCompletedSynchronously = null;
        self.lengthBuffer = null;
        self.lengthOffset = null;
        self.lengthException = null;

        self.messageIsCompleted = null;
        self.messageCompletedSynchronously = null;
        self.messageBuffer = null;
        self.messageOffset = null;
        self.messageException = null;

        self. = function(port, callback, state) {
            this.port = port;
            this.callback = callback;
            this.state = state;
            wait = new ManualResetEvent(false);

            lengthIsCompleted = false;
            lengthCompletedSynchronously = false;
            lengthBuffer = null;
            lengthOffset = 0;
            lengthException = null;

            messageIsCompleted = false;
            messageCompletedSynchronously = false;
            messageBuffer = null;
            messageOffset = 0;
            messageException = null;
        };
    }
}
