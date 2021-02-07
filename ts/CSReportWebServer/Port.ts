

namespace CSReportWebServer.NativeMessaging
{
    /// <summary>
    /// Google Chrome Native Messaging Port.
    /// </summary>
    /// <remarks>
    /// This class partially implements Google Chrome Native Messaging Protocol as described here 
    /// https://developer.chrome.com/extensions/nativeMessaging .
    /// Partial implementation means that parsing input messages into JSON objects and JSON object into output messages
    /// is up to you.
    /// </remarks>
    /// <seealso cref="Newtonsoft.Json"/>
    export class Port {


    {
        /// <summary>
        /// Native messaging input stream.
        /// </summary>
        private istream: Stream = null;

        /// <summary>
        /// Native messaging output stream.
        /// </summary>
        private ostream: Stream = null;

        /// <summary>
        /// Creates a new native messaging port for stdandard input and output streams.
        /// </summary>
        public constructor() {
            istream = Console.OpenStandardInput();
            ostream = Console.OpenStandardOutput();
        }

        /// <summary>
        /// Creates a new native messaging port for given input and output streams.
        /// </summary>
        /// <param name="istream">The input stream.</param>
        /// <param name="ostream">The output stream.</param>
        /// <exception cref="ArgumentNullException">The istream parameter is null.</exception>
        /// <exception cref="ArgumentNullException">The ostream parameter is null.</exception>
        public constructor(istream: Stream, ostream: Stream) {
            if (istream === null) throw new ArgumentNullException("istream"); {
            if (ostream === null) throw new ArgumentNullException("ostream"); {
            this.istream = istream;
            this.ostream = ostream;
        }

        /// <summary>
        /// Begins a native message asynchronous read from the input stream.
        /// </summary>
        /// <param name="callback">An AsyncCallback delegate that is executed when a native message is read or an error has occured.</param>
        /// <param name="state">An user-defined object that is passed to the callback inside its IAsyncResult parameter.</param>
        /// <returns>An IAsyncResult object that represents this asynchronous operation.</returns>
        /// <exception cref="IOException">The input stream IO exception.</exception>
        /// <exception cref="ObjectDisposedException">The input stream was closed.</exception>
        /// <exception cref="NotSupportedException">The input stream does not support read operation.</exception>
        public BeginRead(callback: AsyncCallback, state: object) {
            let ar: AsyncResult = new AsyncResult(this, callback, state);
            ar.lengthBuffer = new byte[4];
            ar.lengthOffset = 0;
            istream.BeginRead(
                ar.lengthBuffer,
                ar.lengthOffset,
                ar.lengthBuffer.length - ar.lengthOffset,
//                 delegate (IAsyncResult _ar) { (_ar.AsyncState).port.ReadLengthCallback(_ar.AsyncState, _ar); },
                ar);
            return ar;
        }

        /// <summary>
        /// Ends the asynchronous read of a native message length started by BeginRead method.
        /// Then begins an asynchronous read of a native message content.
        /// </summary>
        /// <remarks>
        /// Any exception thrown in the method is saved and then is re-thrown in EndRead method.
        /// </remarks>
        /// <param name="ar">The AsyncResult object that represents a native message asynchronous read.</param>
        /// <param name="lengthAsyncResult">The IAsyncResult object that represents an asynchronous read of native message length.</param>
        private ReadLengthCallback(ar: AsyncResult, lengthAsyncResult: IAsyncResult) {
            try {
                //Debug.Assert(lengthAsyncResult.IsCompleted === true);
                ar.lengthIsCompleted = lengthAsyncResult.IsCompleted;
                ar.lengthCompletedSynchronously = lengthAsyncResult.CompletedSynchronously;
                let bytesRead: number = istream.EndRead(lengthAsyncResult);
                Debug.Assert( && (bytesRead <= ar.lengthBuffer.length));
                if (bytesRead === 0) {
                    if (ar.lengthOffset === 0) throw new EndOfInputStreamException("End of input stream."); {
                    else throw new ProtocolErrorException("Unexpected end of input stream."); {
                }
                if (bytesRead < ar.lengthBuffer.length) {
                    ar.lengthOffset += bytesRead;
                    istream.BeginRead(
                        ar.lengthBuffer,
                        ar.lengthOffset,
                        ar.lengthBuffer.length - ar.lengthOffset,
//                         delegate (IAsyncResult _ar) { (_ar.AsyncState).port.ReadLengthCallback(_ar.AsyncState, _ar); },
                        ar);
                    return;
                }
                let messageLength: number = System.BitConverter.ToInt32(ar.lengthBuffer, 0);
                if (messageLength <= 0) throw new ProtocolErrorException(string.Format("Read zero or negative input message length : {0}", messageLength)); {
                ar.messageBuffer = new byte[messageLength];
                ar.messageOffset = 0;
                istream.BeginRead(
                    ar.messageBuffer,
                    ar.messageOffset,
                    ar.messageBuffer.length - ar.messageOffset,
//                     delegate (IAsyncResult _ar) { (_ar.AsyncState).port.ReadMessageCallback(_ar.AsyncState, _ar); },
                    ar);
            }
            catch (ex) {
                ar.lengthException = ex;
                ar.wait.Set();
                if (ar.callback !== null) ar.callback(ar); {
            }
        }

        /// <summary>
        /// Ends the asynchronous read of a native message content started by ReadLengthCallback method.
        /// Then calls the callback specified for the operation.
        /// </summary>
        /// <remarks>
        /// Any exception thrown in the method is saved and then is re-thrown in EndRead method.
        /// </remarks>
        /// <param name="ar">The AsyncResult object that represents a native message asynchronous read.</param>
        /// <param name="messageAsyncResult">The IAsyncResult object that represents an asynchronous read of a native message content.</param>
        private ReadMessageCallback(ar: AsyncResult, messageAsyncResult: IAsyncResult) {
            try {
                //Debug.Assert(messageAsyncResult.IsCompleted === true);
                ar.messageIsCompleted = messageAsyncResult.IsCompleted;
                ar.messageCompletedSynchronously = messageAsyncResult.CompletedSynchronously;
                let bytesRead: number = istream.EndRead(messageAsyncResult);
                Debug.Assert( && (bytesRead <= ar.messageBuffer.length));
                if (bytesRead === 0) throw new ProtocolErrorException("Unexpected end of input stream."); {
                if (bytesRead < ar.messageBuffer.length) {
                    ar.messageOffset += bytesRead;
                    istream.BeginRead(
                        ar.messageBuffer,
                        ar.messageOffset,
                        ar.messageBuffer.length - ar.messageOffset,
//                         delegate (IAsyncResult _ar) { (_ar.AsyncState).port.ReadMessageCallback(_ar.AsyncState, _ar); },
                        ar);
                    return;
                }
                ar.wait.Set();
                if (ar.callback !== null) ar.callback(ar); {
            }
            catch (ex) {
                ar.lengthException = ex;
                ar.wait.Set();
                if (ar.callback !== null) ar.callback(ar); {
            }
        }

        /// <summary>
        /// Ends the native message asynchronous read started by BeginRead method.
        /// </summary>
        /// <remarks>
        /// The EndRead method must be called for each asynchronous operation started by BeginRead method.
        /// If any exception was thrown during asynchronous read, it is re-thrown in this method.
        /// </remarks>
        /// <param name="asyncResult">The IAsyncResult object that represents the asynchronous operation started by BeginRead method.</param>
        /// <returns>The native message read from stream.</returns>
        /// <exception cref="ArgumentNullException">The asyncResult parameter is null.</exception>
        /// <exception cref="ArgumentException">The asyncResult parameter is of improper type.</exception>
        /// <exception cref="IOException">The input stream IO exception.</exception>
        /// <exception cref="ObjectDisposedException">The input stream was closed.</exception>
        /// <exception cref="NotSupportedException">The input stream does not support read operation.</exception>
        /// <exception cref="EndOfInputStreamException">The end of input stream was reached before a native message was read.</exception>
        /// <exception cref="ProtocolErrorException">The end of input stream was reached after a part of native message was read.</exception>
        /// <exception cref="ProtocolErrorException">Negative or zero length of a native message was read.</exception>
        /// <exception cref="ProtocolErrorException">The native message read is not of UTF-8 encoding.</exception>
        /// <exception cref="OutOfMemoryException">The allocation of a native message buffer has failed.</exception>
        public EndRead(asyncResult: IAsyncResult) {
            if (asyncResult === null) throw new ArgumentNullException("asyncResult"); {
            if (!typeof(AsyncResult).IsInstanceOfType(asyncResult)) throw new ArgumentException(string.Format("Argument 'asyncResult' must be instance of {0}", typeof(AsyncResult))); {

            let ar: AsyncResult = asyncResult;
            ar.wait.WaitOne();

            if (ar.lengthException !== null) throw ar.lengthException; {
            if (ar.messageException !== null) throw ar.messageException; {

UNKNOWN >>             string message;
            try {
                message = System.Text.Encoding.UTF8.GetString(ar.messageBuffer);
            }
            catch (ex) {
                throw new ProtocolErrorException("Invalid input message encoding.", ex);
            }
            return message;
        }

        /// <summary>
        /// Begins a native message asynchronous write to the output stream.
        /// </summary>
        /// <param name="message">A native message that is to be written.</param>
        /// <param name="callback">An AsyncCallback delegate that is executed when a native message is written or an error has occured.</param>
        /// <param name="state">An user-defined object that is passed to the callback inside its IAsyncResult parameter.</param>
        /// <returns>An IAsyncResult object that represents this asynchronous operation.</returns>
        /// <exception cref="ArgumentNullException">The message parameter is null.</exception>
        /// <exception cref="IOException">The output stream IO exception.</exception>
        /// <exception cref="ObjectDisposedException">The output stream was closed.</exception>
        /// <exception cref="NotSupportedException">The output stream does not support write operation.</exception>
        /// <exception cref="ProtocolErrorException">The native message that is to be written is not of UTF-8 encoding.</exception>
        /// <exception cref="OutOfMemoryException">The allocation of the native message buffer has failed.</exception>
        public BeginWrite(message: string, callback: AsyncCallback, state: object) {
            if (message === null) throw new ArgumentNullException("message"); {
            let ar: AsyncResult = new AsyncResult(this, callback, state);
            try {
                ar.messageBuffer = System.Text.Encoding.UTF8.GetBytes(message);
                ar.messageOffset = 0;
            }
            catch (ex) {
                throw new ProtocolErrorException("Invalid output message encoding.", ex);
            }
            ar.lengthBuffer = System.BitConverter.GetBytes(ar.messageBuffer.length);
            ar.lengthOffset = 0;
            Debug.Assert(ar.lengthBuffer.length === 4);
            ostream.BeginWrite(
                ar.lengthBuffer,
                ar.lengthOffset,
                ar.lengthBuffer.length - ar.lengthOffset,
//                 delegate (IAsyncResult _ar) { (_ar.AsyncState).port.WriteLengthCallback(_ar.AsyncState, _ar); },
                ar);
            return ar;
        }

        /// <summary>
        /// Ends the asynchronous write of a native message length started by BeginWrite method.
        /// Then begins an asynchronous write of a native message content.
        /// </summary>
        /// <remarks>
        /// Any exception thrown in the method is saved and then is re-thrown in EndWrite method.
        /// </remarks>
        /// <param name="ar">The AsyncResult object that represents a native message asynchronous write.</param>
        /// <param name="messageAsyncResult">The IAsyncResult object that represents an asynchronous write of a native message length.</param>
        private WriteLengthCallback(ar: AsyncResult, lengthAsyncResult: IAsyncResult) {
            try {
                //Debug.Assert(lengthAsyncResult.IsCompleted === true);
                ar.lengthIsCompleted = lengthAsyncResult.IsCompleted;
                ar.lengthCompletedSynchronously = lengthAsyncResult.CompletedSynchronously;
                ostream.EndWrite(lengthAsyncResult);
                ostream.BeginWrite(
                    ar.messageBuffer,
                    ar.messageOffset,
                    ar.messageBuffer.length - ar.messageOffset,
//                     delegate (IAsyncResult _ar) { (_ar.AsyncState).port.WriteMessageCallback(_ar.AsyncState, _ar); },
                ar);
            }
            catch (ex) {
                ar.lengthException = ex;
                ar.wait.Set();
                if (ar.callback !== null) ar.callback(ar); {
            }
        }

        /// <summary>
        /// Ends the asynchronous write of a native message content started by WriteLengthCallback method.
        /// Then calls the callback specified for the operation.
        /// </summary>
        /// <remarks>
        /// Any exception thrown in the method is saved and then is re-thrown in EndRead method.
        /// </remarks>
        /// <param name="ar">The AsyncResult object that represents a native message asynchronous read.</param>
        /// <param name="messageAsyncResult">The IAsyncResult object that represents an asynchronous read of a native message content.</param>
        private WriteMessageCallback(ar: AsyncResult, messageAsyncResult: IAsyncResult) {
            try {
                //Debug.Assert(messageAsyncResult.IsCompleted === true);
                ar.messageIsCompleted = messageAsyncResult.IsCompleted;
                ar.messageCompletedSynchronously = messageAsyncResult.CompletedSynchronously;
                ostream.EndWrite(messageAsyncResult);
                ar.wait.Set();
                if (ar.callback !== null) ar.callback(ar); {
            }
            catch (ex) {
                ar.messageException = ex;
                ar.wait.Set();
                if (ar.callback !== null) ar.callback(ar); {
            }
        }

        /// <summary>
        /// Ends the native message asynchronous write started by BeginWrite method.
        /// The EndWrite method must be called for each asynchronous operation started by BeginWrite method.
        /// </summary>
        /// <remarks>
        /// If any exception was thrown during asynchronous write, it is re-thrown in this method.
        /// </remarks>
        /// <param name="asyncResult">The IAsyncResult object that represents the asynchronous operation started by BeginWrite method.</param>
        /// <exception cref="ArgumentNullException">The asyncResult parameter is null.</exception>
        /// <exception cref="ArgumentException">The asyncResult parameter is of improper type.</exception>
        /// <exception cref="IOException">The output stream IO exception.</exception>
        /// <exception cref="ObjectDisposedException">The output stream was closed.</exception>
        /// <exception cref="NotSupportedException">The output stream does not support write operation.</exception>
        public EndWrite(asyncResult: IAsyncResult) {
            if (asyncResult === null) throw new ArgumentNullException("asyncResult"); {
            if (!typeof(AsyncResult).IsInstanceOfType(asyncResult)) throw new ArgumentException(string.Format("Argument 'asyncResult' must be instance of {0}", typeof(AsyncResult))); {
            let ar: AsyncResult = asyncResult;
            ar.wait.WaitOne();
            if (ar.lengthException !== null) throw ar.lengthException; {
            if (ar.messageException !== null) throw ar.messageException; {
        }

        /// <summary>
        /// Reads a native message from input stream synchronously.
        /// </summary>
        /// <remarks>
        /// This method actually starts an asynchronous operation an the waits until it is finished.
        /// </remarks>
        /// <returns>The native message read from stream.</returns>
        /// <exception cref="IOException">The input stream IO exception.</exception>
        /// <exception cref="ObjectDisposedException">The input stream was closed.</exception>
        /// <exception cref="NotSupportedException">The input stream does not support read operation.</exception>
        /// <exception cref="EndOfInputStreamException">The end of input stream was reached before a native message was read.</exception>
        /// <exception cref="ProtocolErrorException">The end of input stream was reached after a part of native message was read.</exception>
        /// <exception cref="ProtocolErrorException">Negative or zero length of a native message was read.</exception>
        /// <exception cref="ProtocolErrorException">The native message read is not of UTF-8 encoding.</exception>
        /// <exception cref="OutOfMemoryException">The allocation of a native message buffer has failed.</exception>
        public Read() {
            return EndRead(BeginRead(null, null));
        }

        /// <summary>
        /// Writes the native message to output stream synchronously.
        /// </summary>
        /// <remarks>
        /// This method actually starts an asynchronous operation an the waits until it is finished.
        /// </remarks>
        /// <param name="message">The native message that is to be written to the output stream.</param>
        /// <exception cref="ArgumentNullException">The message parameter is null.</exception>
        /// <exception cref="IOException">The output stream IO exception.</exception>
        /// <exception cref="ObjectDisposedException">The output stream was closed.</exception>
        /// <exception cref="NotSupportedException">The output stream does not support write operation.</exception>
        /// <exception cref="ProtocolErrorException">The native message that is to be written is not of UTF-8 encoding.</exception>
        /// <exception cref="OutOfMemoryException">The allocation of the native message buffer has failed.</exception>
        public Write(message: string) {
            EndWrite(BeginWrite(message, null, null));
        }


    } 
}
