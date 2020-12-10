(function(globalObject) {

    globalObject.CSReportWebServer = globalObject.CSReportWebServer || {};

    /// <summary>
    /// Native Messaging Host.
    /// </summary>
    globalObject.CSReportWebServer.createHost = function() {

        // @ts-ignore
        let self: CSReportWebServer.IHost = {};
        let ILog: static log = LogManager.GetLogger(typeof(Host));

        let stop: ManualResetEvent = null;
        let port: Port = null;

        let m_f: fMain = null;
        let m_messageQueue: SizeQueue = null;
        let m_partialMessages: Dictionary = new Dictionary();

        const C_EXTENSION_NAME: string = "CSReportWebServer.Echo";

        /// <summary>
        /// Creates a new instance of native messaging host.
        /// </summary>
        const Host = function(f, messageQueue) {
            port = globalObject.CSReportWebServer.NativeMessaging.createPort();
            stop = UNKNOWN >>  can't find constructor for class ManualResetEvent(false);
            m_f = f;
            m_messageQueue = messageQueue;
        };

        /// <summary>
        /// Starts native message processing.
        /// </summary>
        self.Run = function() {
            log.Info("host started 0.0.0.1");
            m_f.log("host started");

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
                    m_f.log("request message " + message);

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

                    reply["message"] = UNKNOWN >>  can't find constructor for class JObject();
                    reply["message"]["id"] = request["id"];

                    // identify service
                    //
                    reply["extension"] = C_EXTENSION_NAME;

                    message = reply.ToString(Formatting.None);

                    // log
                    //
                    log.DebugFormat("reply message\n{0}", message);
                    m_f.log(message);

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
                JObject jMessage = m_messageQueue.Dequeue();

                while (jMessage !== null)
                {
                    // identify service
                    //
                    jMessage["extension"] = C_EXTENSION_NAME;

                    string message = jMessage.ToString(Formatting.None);

                    // log
                    //
                    log.DebugFormat("reply message\n{0}", message);
                    m_f.log(message);

                    //
                    // send message
                    //
                    port.Write(message);

                    jMessage = m_messageQueue.Dequeue();
                }
            }

            log.Info("host stopped");
            m_f.log("host stopped");
            m_f.close();
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
                if (m_partialMessages.ContainsKey(id))
                {
                    p = m_partialMessages[id];
                }
                p += request["message"]["data"];
                m_partialMessages[id] = p;
            }
            else
            {
                if (m_partialMessages.ContainsKey(id))
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
            m_f.preview(request);
        }

        private void printReport(JObject request)
        {
            m_f.printReport(request);
        }

        private void moveToPage(JObject request)
        {
            m_f.moveToPage(request);
        }
        return self;

    }    }
        return self;


        return self;

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
        return self;

    }    }
}(globalObject));


namespace CSReportWebServer {

  export interface IHost {

    Run: () => void;
  }
}
);


namespace CSReportWebServer {

  export interface IHost {

    Run: () => void;
  }
}
