

namespace CSReportWebServer
{
    /// <summary>
    /// Native Messaging Host.
    /// </summary>
    export class Host {


    {
        private ILog: static log = LogManager.GetLogger(typeof(Host));

        private stop: ManualResetEvent = null;
        private port: Port = null;

        private f: fMain = null;
        private messageQueue: SizeQueue = null;
        private partialMessages: Dictionary = new Dictionary();

        private C_EXTENSION_NAME: string = "CSReportWebServer.Echo";

        /// <summary>
        /// Creates a new instance of native messaging host.
        /// </summary>
        public constructor(f: fMain, messageQueue: SizeQueue<JObject>) {
            port = new Port();
            stop = new ManualResetEvent(false);
            this.f = f;
            this.messageQueue = messageQueue;
        }

        /// <summary>
        /// Starts native message processing.
        /// </summary>
        public Run() {
            log.Info("host started 0.0.0.1");
            this.f.log("host started");

            stop.Reset();
            while (!stop.WaitOne(0)) {
                // process messages from Chrome
                //
                try {
                    //
                    // read a message
                    //
                    let message: string = port.Read();

                    // log
                    //
                    log.DebugFormat("request message\n{0}", message);
                    this.f.log("request message " + message);

                    let request: JObject = JObject.Parse(message);

                    //
                    // execute the request
                    //
                    executeMessage(request);

                    //
                    // prepare a response
                    //
                    let reply: JObject = new JObject();
                    if (request["source"] !== null) reply["source"] = request["destination"]; {
                    if (request["destination"] !== null) reply["destination"] = request["source"]; {

                    reply["message"] = new JObject();
                    reply["message"]["id"] = request["id"];

                    // identify service
                    //
                    reply["extension"] = C_EXTENSION_NAME;

                    message = reply.ToString(Formatting.None);

                    // log
                    //
                    log.DebugFormat("reply message\n{0}", message);
                    this.f.log(message);

                    //
                    // send response
                    //
                    port.Write(message);
                }
                catch (
                {
                    log.Debug("end of input stream");
                    stop.Set();
                }
                catch (Exception ex)
                {
                    log.Error("message processing caused an exception", ex);
                    //stop.Set();
                    //throw ex;
                }

                // process messages from CSReports
                //
                JObject jMessage = this.messageQueue.Dequeue();

                while (jMessage !== null)
                {
                    // identify service
                    //
                    jMessage["extension"] = C_EXTENSION_NAME;

                    string message = jMessage.ToString(Formatting.None);

                    // log
                    //
                    log.DebugFormat("reply message\n{0}", message);
                    this.f.log(message);

                    //
                    // send message
                    //
                    port.Write(message);

                    jMessage = this.messageQueue.Dequeue();
                }
            }

            log.Info("host stopped");
            this.f.log("host stopped");
            this.f.close();
        }

        /// <summary>
        /// Stops native message processing.
        /// </summary>
        public void Stop()
        {
            stop.Set();
        }

        private void executeMessage(JObject request)
        {
            var action = request["message"]["action"].ToString();

            var id = request["id"].ToString();

            if (action.StartsWith("__PARTIAL_MESSAGE__"))
            {
                var p = "";
                if (this.partialMessages.ContainsKey(id))
                {
                    p = this.partialMessages[id];
                }
                p += request["message"]["data"];
                this.partialMessages[id] = p;
            }
            else
            {
                if (this.partialMessages.ContainsKey(id))
                {
                    request["message"]["data"] = JObject.Parse(.ToString());
                }
                else {
                    request["message"]["data"] = JObject.Parse(request["message"]["data"].ToString());
                }
                switch (action)
                {
                    case "preview":
                        previewReport(request);
                        break;
                    case "print":
                        printReport(request);
                        break;
                    case "moveToPage":
                        moveToPage(request);
                        break;
                    case "debugger":
                        break;
                }
            }
        }

        private void previewReport(JObject request)
        {
            this.f.preview(request);
        }

        private void printReport(JObject request)
        {
            this.f.printReport(request);
        }

        private void moveToPage(JObject request)
        {
            this.f.moveToPage(request);
        }


    }    }





    public class SizeQueue<T>    public class SizeQueue<T>
    {
        private readonly Queue<T> queue = new Queue<T>();
        private readonly int maxSize;
        public SizeQueue(int maxSize) { this.maxSize = maxSize; }

        public void Enqueue(T item)
        {
            lock (queue)
            {
                if (queue.Count < maxSize) // yes, I am a bad person :P
                {
                    queue.Enqueue(item);
                }
            }
        }
        public T Dequeue()
        {
            lock (queue)
            {
                T item = default(T);
                if (queue.Count > 0)
                {
                    item = queue.Dequeue();
                }
                return item;
            }
        }


    }    }
}

