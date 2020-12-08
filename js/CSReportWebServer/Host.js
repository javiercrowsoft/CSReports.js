(function(globalObject) {

    globalObject.CSReportWebServer = globalObject.CSReportWebServer || {}; //@@@: namespace CSReportWebServer
 //@@@: {
    /// <summary>
    /// Native Messaging Host.
    /// </summary>
    globalObject.CSReportWebServer.createHost = function() {

        const self = {}; //@@@: public class Host
        let ILog log = LogManager.GetLogger(typeof(Host)); //@@@: private static ILog log = LogManager.GetLogger(typeof(Host));

        let stop = null; //@@@: private ManualResetEvent stop;
        let port = null; //@@@: private Port port;

        let m_f = null; //@@@: private fMain m_f;
        let m_messageQueue = null; //@@@: private SizeQueue<JObject> m_messageQueue;
        let m_partialMessages = new Dictionary(); //@@@: private Dictionary<String, String> m_partialMessages = new Dictionary<string, string>();

        const C_EXTENSION_NAME = "CSReportWebServer.Echo"; //@@@: private const string C_EXTENSION_NAME = "CSReportWebServer.Echo";

        /// <summary>
        /// Creates a new instance of native messaging host.
        /// </summary>
        const Host = function(f, messageQueue) { //@@@: public Host(fMain f, SizeQueue<JObject> messageQueue)
            port = new Port(); //@@@: port = new Port();
            stop = new ManualResetEvent(false); //@@@: stop = new ManualResetEvent(false);
            m_f = f; //@@@: m_f = f;
            m_messageQueue = messageQueue; //@@@: m_messageQueue = messageQueue;
        }; //@@@: }

        /// <summary>
        /// Starts native message processing.
        /// </summary>
        self.Run = function() { //@@@: public void Run()
            log.Info("host started 0.0.0.1"); //@@@: log.Info("host started 0.0.0.1");
            m_f.log("host started"); //@@@: m_f.log("host started");

            stop.Reset(); //@@@: stop.Reset();
            while (!stop.WaitOne(0)) { //@@@: while (!stop.WaitOne(0))
                // process messages from Chrome
                //
                try { //@@@: try
                    //
                    // read a message
                    //
                    let message = port.Read(); //@@@: string message = port.Read();

                    // log
                    //
                    log.DebugFormat("request message\n{0}", message); //@@@: log.DebugFormat("request message\n{0}", message);
                    m_f.log("request message " + message); //@@@: m_f.log("request message " + message);

                    let request = JObject.Parse(message); //@@@: JObject request = JObject.Parse(message);

                    //
                    // execute the request
                    //
                    executeMessage(request); //@@@: executeMessage(request);

                    //
                    // prepare a response
                    //
                    let reply = new JObject(); //@@@: JObject reply = new JObject();
                    if (request["source"] !== null) reply["source"] = request["destination"]; { //@@@: if (request["source"] != null) reply["source"] = request["destination"];
                    if (request["destination"] !== null) reply["destination"] = request["source"]; { //@@@: if (request["destination"] != null) reply["destination"] = request["source"];

                    reply["message"] = new JObject(); //@@@: reply["message"] = new JObject();
                    reply["message"]["id"] = request["id"]; //@@@: reply["message"]["id"] = request["id"];

                    // identify service
                    //
                    reply["extension"] = C_EXTENSION_NAME; //@@@: reply["extension"] = C_EXTENSION_NAME;

                    message = reply.ToString(Formatting.None); //@@@: message = reply.ToString(Formatting.None);

                    // log
                    //
                    log.DebugFormat("reply message\n{0}", message); //@@@: log.DebugFormat("reply message\n{0}", message);
                    m_f.log(message); //@@@: m_f.log(message);

                    //
                    // send response
                    //
                    port.Write(message); //@@@: port.Write(message);
                } //@@@: }
                catch ( //@@@: catch (EndOfInputStreamException)
                { //@@@: {
                    log.Debug("end of input stream"); //@@@: log.Debug("end of input stream");
                    stop.Set(); //@@@: stop.Set();
                } //@@@: }
                catch (Exception ex) //@@@: catch (Exception ex)
                { //@@@: {
                    log.Error("message processing caused an exception", ex); //@@@: log.Error("message processing caused an exception", ex);
                    //stop.Set();
                    //throw ex;
                } //@@@: }

                // process messages from CSReports
                //
                JObject jMessage = m_messageQueue.Dequeue(); //@@@: JObject jMessage = m_messageQueue.Dequeue();

                while (jMessage !== null) //@@@: while (jMessage != null)
                { //@@@: {
                    // identify service
                    //
                    jMessage["extension"] = C_EXTENSION_NAME; //@@@: jMessage["extension"] = C_EXTENSION_NAME;

                    string message = jMessage.ToString(Formatting.None); //@@@: string message = jMessage.ToString(Formatting.None);

                    // log
                    //
                    log.DebugFormat("reply message\n{0}", message); //@@@: log.DebugFormat("reply message\n{0}", message);
                    m_f.log(message); //@@@: m_f.log(message);

                    //
                    // send message
                    //
                    port.Write(message); //@@@: port.Write(message);

                    jMessage = m_messageQueue.Dequeue(); //@@@: jMessage = m_messageQueue.Dequeue();
                } //@@@: }
            } //@@@: }

            log.Info("host stopped"); //@@@: log.Info("host stopped");
            m_f.log("host stopped"); //@@@: m_f.log("host stopped");
            m_f.close(); //@@@: m_f.close();
        } //@@@: }

        /// <summary>
        /// Stops native message processing.
        /// </summary>
        public void Stop() //@@@: public void Stop()
        { //@@@: {
            stop.Set(); //@@@: stop.Set();
        } //@@@: }

        private void executeMessage(JObject request) //@@@: private void executeMessage(JObject request)
        { //@@@: {
            var action = request["message"]["action"].ToString(); //@@@: var action = request["message"]["action"].ToString();

            var id = request["id"].ToString(); //@@@: var id = request["id"].ToString();

            if (action.StartsWith("__PARTIAL_MESSAGE__")) //@@@: if (action.StartsWith("__PARTIAL_MESSAGE__"))
            { //@@@: {
                var p = ""; //@@@: var p = "";
                if (m_partialMessages.ContainsKey(id)) //@@@: if (m_partialMessages.ContainsKey(id))
                { //@@@: {
                    p = m_partialMessages[id]; //@@@: p = m_partialMessages[id];
                } //@@@: }
                p += request["message"]["data"]; //@@@: p += request["message"]["data"];
                m_partialMessages[id] = p; //@@@: m_partialMessages[id] = p;
            } //@@@: }
            else //@@@: else
            { //@@@: {
                if (m_partialMessages.ContainsKey(id)) //@@@: if (m_partialMessages.ContainsKey(id))
                { //@@@: {
                    request["message"]["data"] = JObject.Parse(.ToString()); //@@@: request["message"]["data"] = JObject.Parse((m_partialMessages[id] + request["message"]["data"]).ToString());
                } //@@@: }
                else { //@@@: else {
                    request["message"]["data"] = JObject.Parse(request["message"]["data"].ToString()); //@@@: request["message"]["data"] = JObject.Parse(request["message"]["data"].ToString());
                } //@@@: }
                switch (action) //@@@: switch (action)
                { //@@@: {
                    case "preview": //@@@: case "preview":
                        previewReport(request); //@@@: previewReport(request);
                        break; //@@@: break;
                    case "print": //@@@: case "print":
                        printReport(request); //@@@: printReport(request);
                        break; //@@@: break;
                    case "moveToPage": //@@@: case "moveToPage":
                        moveToPage(request); //@@@: moveToPage(request);
                        break; //@@@: break;
                    case "debugger": //@@@: case "debugger":
                        break; //@@@: break;
                } //@@@: }
            } //@@@: }
        } //@@@: }

        private void previewReport(JObject request) //@@@: private void previewReport(JObject request)
        { //@@@: {
            m_f.preview(request); //@@@: m_f.preview(request);
        } //@@@: }

        private void printReport(JObject request) //@@@: private void printReport(JObject request)
        { //@@@: {
            m_f.printReport(request); //@@@: m_f.printReport(request);
        } //@@@: }

        private void moveToPage(JObject request) //@@@: private void moveToPage(JObject request)
        { //@@@: {
            m_f.moveToPage(request); //@@@: m_f.moveToPage(request);
        } //@@@: }
        return self;

    } //@@@: }

        return self;

    public class SizeQueue<T> //@@@: public class SizeQueue<T>
    { //@@@: {
        private readonly Queue<T> queue = new Queue<T>(); //@@@: private readonly Queue<T> queue = new Queue<T>();
        private readonly int maxSize; //@@@: private readonly int maxSize;
        public SizeQueue(int maxSize) { this.maxSize = maxSize; } //@@@: public SizeQueue(int maxSize) { this.maxSize = maxSize; }

        public void Enqueue(T item) //@@@: public void Enqueue(T item)
        { //@@@: {
            lock (queue) //@@@: lock (queue)
            { //@@@: {
                if (queue.Count < maxSize) // yes, I am a bad person :P //@@@: if (queue.Count < maxSize) // yes, I am a bad person :P
                { //@@@: {
                    queue.Enqueue(item); //@@@: queue.Enqueue(item);
                } //@@@: }
            } //@@@: }
        } //@@@: }
        public T Dequeue() //@@@: public T Dequeue()
        { //@@@: {
            lock (queue) //@@@: lock (queue)
            { //@@@: {
                T item = default(T); //@@@: T item = default(T);
                if (queue.Count > 0) //@@@: if (queue.Count > 0)
                { //@@@: {
                    item = queue.Dequeue(); //@@@: item = queue.Dequeue();
                } //@@@: }
                return item; //@@@: return item;
            } //@@@: }
        } //@@@: }
        return self;

    } //@@@: }
}(globalObject)); { //@@@: }

