(function(globalObject) {

    globalObject.CSReportWebServer.NativeMessaging = globalObject.CSReportWebServer.NativeMessaging || {};

    /// <summary>
    /// This class is an implementation of IAsyncResult interface specific to CSReportWebServer.NativeMessaging.Port class.
    /// </summary>
    globalObject.CSReportWebServer.NativeMessaging.createAsyncResult = function() {

        // @ts-ignore
        let self: CSReportWebServer.NativeMessaging.IAsyncResult = {};
        self.AsyncState: object = null;{ get { return state; } };
        self.AsyncWaitHandle: WaitHandle = null;{ get { return wait; } };
        self.CompletedSynchronously: boolean = null;{ get { return lengthCompletedSynchronously && messageCompletedSynchronously; } };
        self.IsCompleted: boolean = null;{ get { return lengthIsCompleted && messageIsCompleted; } };

        let port: Port = null;{ get; private set; };
        let callback: AsyncCallback = null;{ get; private set; };
        let state: object = null;{ get; private set; };
        let wait: ManualResetEvent = null;{ get; private set; };

        self.lengthIsCompleted: boolean = null;
        self.lengthCompletedSynchronously: boolean = null;
        self.lengthBuffer: byte[] = null;
        self.lengthOffset: number = null;
        self.lengthException: Exception = null;

        self.messageIsCompleted: boolean = null;
        self.messageCompletedSynchronously: boolean = null;
        self.messageBuffer: byte[] = null;
        self.messageOffset: number = null;
        self.messageException: Exception = null;

        const AsyncResult = function(port, callback, state) {
            this.port = port;
            this.callback = callback;
            this.state = state;
            wait = UNKNOWN >>  can't find constructor for class ManualResetEvent(false);

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
        return self;

    }    }
}(globalObject));


namespace CSReportWebServer.NativeMessaging {

  export interface IAsyncResult {

    AsyncState: object;
    AsyncWaitHandle: WaitHandle;
    CompletedSynchronously: boolean;
    IsCompleted: boolean;
    lengthIsCompleted;: boolean;
    lengthCompletedSynchronously;: boolean;
    lengthBuffer;: byte[];
    lengthOffset;: number;
    lengthException;: Exception;
    messageIsCompleted;: boolean;
    messageCompletedSynchronously;: boolean;
    messageBuffer;: byte[];
    messageOffset;: number;
    messageException;: Exception;
  }
}
