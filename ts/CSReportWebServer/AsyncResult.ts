

namespace CSReportWebServer.NativeMessaging
{
    /// <summary>
    /// This class is an implementation of IAsyncResult interface specific to CSReportWebServer.NativeMessaging.Port class.
    /// </summary>
    export class AsyncResult {


    {
        public AsyncState: object = null;{ get { return state; } };
        public AsyncWaitHandle: WaitHandle = null;{ get { return wait; } };
        public CompletedSynchronously: boolean = null;{ get { return lengthCompletedSynchronously && messageCompletedSynchronously; } };
        public IsCompleted: boolean = null;{ get { return lengthIsCompleted && messageIsCompleted; } };

        private port: Port = null;{ get; private set; };
        private callback: AsyncCallback = null;{ get; private set; };
        private state: object = null;{ get; private set; };
        private wait: ManualResetEvent = null;{ get; private set; };

        public lengthIsCompleted: boolean = null;
        public lengthCompletedSynchronously: boolean = null;
        public lengthBuffer: byte[] = null;
        public lengthOffset: number = null;
        public lengthException: Exception = null;

        public messageIsCompleted: boolean = null;
        public messageCompletedSynchronously: boolean = null;
        public messageBuffer: byte[] = null;
        public messageOffset: number = null;
        public messageException: Exception = null;

        public constructor(port: Port, callback: AsyncCallback, state: object) {
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
        }


    } 
}
