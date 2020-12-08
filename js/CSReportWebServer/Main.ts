(function(globalObject) {

    globalObject.CSReportWebServer = globalObject.CSReportWebServer || {};

UNKNOWN >>     static class Main
    {
        let ILog log = LogManager.GetLogger(typeof(Program));
        let Options options = new Options();
        let Properties.Settings settings = Properties.Settings.Default;

        let SizeQueue m_messageQueue = new SizeQueue(2); // no more than one message for now;

        self.Init = function(args, f) {

            // it is the first thing we need to do
            //
            CSKernelClient.cUtil.setSepDecimal();

            // configure log4net
            log4net.Config.XmlConfigurator.Configure();

            log.Info("application started");
            log.DebugFormat("command line : \"{0}\"", string.Join("\", \"", args));

            const  = function(2) {
                log.Info("new version");
                log.DebugFormat("command line 0 : \"{0}\"", args[0]);
                log.DebugFormat("command line 0 : \"{0}\"", args[1]);
            }

            // started with no arguments?
            const  = function(0) {

            // started by chrome?
            else if (args[0].StartsWith("chrome-extension://")) {
                log.Info("starting RunNativeMessagingHost");
                RunNativeMessagingHost(args, f);
            }
            // register command?
            else if (args[args.Length - 1] === "register") RegisterNativeMessagingHost(args); {

            // invalid command line
            else InvalidCommand(args[args.Length - 1]); {

            log.Info("application stopped");
            return 0;
        };

        self.sendMessage = function(message) {
            let envelope = new JObject();
            envelope["message"] = message;

            m_messageQueue.Enqueue(envelope);
        };

        static int RunNativeMessagingHost(string[] args, fMain f)
        {

            let host = new Host(f, m_messageQueue);
            let workerThread = new Thread(host.Run);
            workerThread.Start();
            return 0;
        }

        // defaul for options are created in sealed class Options
        self.RegisterNativeMessagingHost = function(args) {
            const  = function(in) {
                const  = function("register") {
                else if (arg.StartsWith("--hive=")) options.hive = arg.Remove(0, "--hive=".Length); {
                else if (arg.StartsWith("--manifest=")) options.manifest = arg.Remove(0, "--manifest=".Length); {
                else return InvalidOption(arg); {
            }

            // registry key
UNKNOWN >>             string keyName;
            const  = function("HKCU") {
                keyName = "HKEY_CURRENT_USER\\Software\\Google\\Chrome\\NativeMessagingHosts\\ar.com.crowsoft.csreportwebserver.echo";
            }
            else if (options.hive === "HKLM") {
                keyName = "HKEY_LOCAL_MACHINE\\Software\\Google\\Chrome\\NativeMessagingHosts\\ar.com.crowsoft.csreportwebserver.echo";
            }
            else return InvalidOptionValue("--hive", options.hive); {

            try {
                Console.WriteLine("Creating this host manifest:");
                Console.WriteLine("{0}", options.manifest);
                let manifest = File.CreateText(options.manifest);
                manifest.Write(new JObject(
                        new JProperty("name", "ar.com.crowsoft.csreportwebserver.echo"),
                        new JProperty("description", "CSReportWebServer Example Echo Extension"),
                        new JProperty("type", "stdio"),
                        new JProperty("path", System.Reflection.Assembly.GetEntryAssembly().Location),
                        new JProperty("allowed_origins",
                            new JArray(
UNKNOWN >>                                 new JValue(string.Format("chrome-extension://{0}/", settings.ExtensionId))
                                )
                            )
                    ).ToString()
                    );
                manifest.Close();
                Console.WriteLine("Manifest created successfully");
                Console.WriteLine();
            }
            const  = function(ex) {
                Console.Error.WriteLine("Error error creating the host manifest:", ex.Message);
                Console.Error.WriteLine(ex);
                return 0;
            }

            try {
                Console.WriteLine("Registering this host:");
                Console.WriteLine("[{0}]", keyName);
                Console.WriteLine("@=\"{0}\"", options.manifest.Replace("\\", "\\\\"));
                Microsoft.Win32.Registry.SetValue(keyName, null, options.manifest);
                Console.WriteLine("Host registered successfully");
                Console.WriteLine();
            }
            const  = function(ex) {
                Console.Error.WriteLine("Error registering the host:", ex.Message);
                return 0;
            }

            return 0;
        };

        static int InvalidCommand(string command)
        {
            let tw = Console.Error;
            tw.WriteLine("Invalid command line : unknown command '{0}'. Start again with no parameters to get usage information.", command);
            return 0;
        }

        static int InvalidOption(string option)
        {
            let tw = Console.Error;
            tw.WriteLine("Invalid command line : unknown option '{0}'. Start again with no parameters to get usage information.", option);
            return 0;
        }

        static int InvalidOptionValue(string option, string value)
        {
            let tw = Console.Error;
            tw.WriteLine("Invalid command line : invalid option '{0}' value '{1}'. Start again with no parameters to get usage information.", option, value);
            return 0;
        }

        static int Usage(TextWriter tw = null)
        {
            const  = function(null) {
            tw.WriteLine("CSReportWebServer Echo Example Extension.");
            tw.WriteLine("Usage: {0} [options] <command>", Path.GetFileName(System.Reflection.Assembly.GetEntryAssembly().Location));
            tw.WriteLine();
            tw.WriteLine("Commands with options");
            tw.WriteLine();
            tw.WriteLine("  register                 Register this host");
            tw.WriteLine("    --hive=<HKCU|HKLM>     The hive to register the host in (default is {0})", options.hive);
            tw.WriteLine("    --manifest=<file>      The file to output this host manifest to (default is {0}; overwritten, if exists)", options.manifest);
            tw.WriteLine();
            tw.WriteLine("  chrome-extension://*/    Start a native messaging host");
            tw.WriteLine("    --parent-window=*      Specify parent window id");
            tw.WriteLine();
            return 0;
        };

    }

UNKNOWN >>     sealed class Options
    {
        self.hive = "HKCU";
UNKNOWN >>         public string manifest =
UNKNOWN >>             Path.GetDirectoryName(System.Reflection.Assembly.GetEntryAssembly().Location) + "\\" +
            Path.GetFileNameWithoutExtension(System.Reflection.Assembly.GetEntryAssembly().Location) + ".manifest.json";
    }
}