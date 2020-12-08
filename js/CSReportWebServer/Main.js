(function(globalObject) {

    globalObject.CSReportWebServer = globalObject.CSReportWebServer || {}; //@@@: namespace CSReportWebServer
 //@@@: {
UNKNOWN >>     static class Main //@@@: static class Main
    { //@@@: {
        let ILog log = LogManager.GetLogger(typeof(Program)); //@@@: private static ILog log = LogManager.GetLogger(typeof(Program));
        let Options options = new Options(); //@@@: private static Options options = new Options();
        let Properties.Settings settings = Properties.Settings.Default; //@@@: private static Properties.Settings settings = Properties.Settings.Default;

        let SizeQueue m_messageQueue = new SizeQueue(2); // no more than one message for now; //@@@: private static SizeQueue<JObject> m_messageQueue = new SizeQueue<JObject>(2); // no more than one message for now

        self.Init = function(args, f) { //@@@: public static int Init(string[] args, fMain f)

            // it is the first thing we need to do
            //
            CSKernelClient.cUtil.setSepDecimal(); //@@@: CSKernelClient.cUtil.setSepDecimal();

            // configure log4net
            log4net.Config.XmlConfigurator.Configure(); //@@@: log4net.Config.XmlConfigurator.Configure();

            log.Info("application started"); //@@@: log.Info("application started");
            log.DebugFormat("command line : \"{0}\"", string.Join("\", \"", args)); //@@@: log.DebugFormat("command line : \"{0}\"", string.Join("\", \"", args));

            const  = function(2) { //@@@: if (args.Length >= 2)
                log.Info("new version"); //@@@: log.Info("new version");
                log.DebugFormat("command line 0 : \"{0}\"", args[0]); //@@@: log.DebugFormat("command line 0 : \"{0}\"", args[0]);
                log.DebugFormat("command line 0 : \"{0}\"", args[1]); //@@@: log.DebugFormat("command line 0 : \"{0}\"", args[1]);
            } //@@@: }

            // started with no arguments?
            const  = function(0) { //@@@: if (args.Length == 0) Usage();

            // started by chrome?
            else if (args[0].StartsWith("chrome-extension://")) { //@@@: else if (args[0].StartsWith("chrome-extension://"))
                log.Info("starting RunNativeMessagingHost"); //@@@: log.Info("starting RunNativeMessagingHost");
                RunNativeMessagingHost(args, f); //@@@: RunNativeMessagingHost(args, f);
            } //@@@: }
            // register command?
            else if (args[args.Length - 1] === "register") RegisterNativeMessagingHost(args); { //@@@: else if (args[args.Length - 1] == "register") RegisterNativeMessagingHost(args);

            // invalid command line
            else InvalidCommand(args[args.Length - 1]); { //@@@: else InvalidCommand(args[args.Length - 1]);

            log.Info("application stopped"); //@@@: log.Info("application stopped");
            return 0; //@@@: return 0;
        }; //@@@: }

        self.sendMessage = function(message) { //@@@: public static void sendMessage(JObject message)
            let envelope = new JObject(); //@@@: JObject envelope = new JObject();
            envelope["message"] = message; //@@@: envelope["message"] = message;

            m_messageQueue.Enqueue(envelope); //@@@: m_messageQueue.Enqueue(envelope);
        }; //@@@: }

        static int RunNativeMessagingHost(string[] args, fMain f) //@@@: static int RunNativeMessagingHost(string[] args, fMain f)
        { //@@@: {

            let host = new Host(f, m_messageQueue); //@@@: Host host = new Host(f, m_messageQueue);
            let workerThread = new Thread(host.Run); //@@@: Thread workerThread = new Thread(host.Run);
            workerThread.Start(); //@@@: workerThread.Start();
            return 0; //@@@: return 0;
        } //@@@: }

        // defaul for options are created in sealed class Options
        self.RegisterNativeMessagingHost = function(args) { //@@@: public static int RegisterNativeMessagingHost(string[] args)
            const  = function(in) { //@@@: foreach (string arg in args)
                const  = function("register") { //@@@: if (arg == "register") continue;
                else if (arg.StartsWith("--hive=")) options.hive = arg.Remove(0, "--hive=".Length); { //@@@: else if (arg.StartsWith("--hive=")) options.hive = arg.Remove(0, "--hive=".Length);
                else if (arg.StartsWith("--manifest=")) options.manifest = arg.Remove(0, "--manifest=".Length); { //@@@: else if (arg.StartsWith("--manifest=")) options.manifest = arg.Remove(0, "--manifest=".Length);
                else return InvalidOption(arg); { //@@@: else return InvalidOption(arg);
            } //@@@: }

            // registry key
UNKNOWN >>             string keyName; //@@@: string keyName;
            const  = function("HKCU") { //@@@: if (options.hive == "HKCU")
                keyName = "HKEY_CURRENT_USER\\Software\\Google\\Chrome\\NativeMessagingHosts\\ar.com.crowsoft.csreportwebserver.echo"; //@@@: keyName = "HKEY_CURRENT_USER\\Software\\Google\\Chrome\\NativeMessagingHosts\\ar.com.crowsoft.csreportwebserver.echo";
            } //@@@: }
            else if (options.hive === "HKLM") { //@@@: else if (options.hive == "HKLM")
                keyName = "HKEY_LOCAL_MACHINE\\Software\\Google\\Chrome\\NativeMessagingHosts\\ar.com.crowsoft.csreportwebserver.echo"; //@@@: keyName = "HKEY_LOCAL_MACHINE\\Software\\Google\\Chrome\\NativeMessagingHosts\\ar.com.crowsoft.csreportwebserver.echo";
            } //@@@: }
            else return InvalidOptionValue("--hive", options.hive); { //@@@: else return InvalidOptionValue("--hive", options.hive);

            try { //@@@: try
                Console.WriteLine("Creating this host manifest:"); //@@@: Console.WriteLine("Creating this host manifest:");
                Console.WriteLine("{0}", options.manifest); //@@@: Console.WriteLine("{0}", options.manifest);
                let manifest = File.CreateText(options.manifest); //@@@: StreamWriter manifest = File.CreateText(options.manifest);
                manifest.Write(new JObject( //@@@: manifest.Write(new JObject(
                        new JProperty("name", "ar.com.crowsoft.csreportwebserver.echo"), //@@@: new JProperty("name", "ar.com.crowsoft.csreportwebserver.echo"),
                        new JProperty("description", "CSReportWebServer Example Echo Extension"), //@@@: new JProperty("description", "CSReportWebServer Example Echo Extension"),
                        new JProperty("type", "stdio"), //@@@: new JProperty("type", "stdio"),
                        new JProperty("path", System.Reflection.Assembly.GetEntryAssembly().Location), //@@@: new JProperty("path", System.Reflection.Assembly.GetEntryAssembly().Location),
                        new JProperty("allowed_origins", //@@@: new JProperty("allowed_origins",
                            new JArray( //@@@: new JArray(
UNKNOWN >>                                 new JValue(string.Format("chrome-extension://{0}/", settings.ExtensionId)) //@@@: new JValue(string.Format("chrome-extension://{0}/", settings.ExtensionId))
                                ) //@@@: )
                            ) //@@@: )
                    ).ToString() //@@@: ).ToString()
                    ); //@@@: );
                manifest.Close(); //@@@: manifest.Close();
                Console.WriteLine("Manifest created successfully"); //@@@: Console.WriteLine("Manifest created successfully");
                Console.WriteLine(); //@@@: Console.WriteLine();
            } //@@@: }
            const  = function(ex) { //@@@: catch (Exception ex)
                Console.Error.WriteLine("Error error creating the host manifest:", ex.Message); //@@@: Console.Error.WriteLine("Error error creating the host manifest:", ex.Message);
                Console.Error.WriteLine(ex); //@@@: Console.Error.WriteLine(ex);
                return 0; //@@@: return 0;
            } //@@@: }

            try { //@@@: try
                Console.WriteLine("Registering this host:"); //@@@: Console.WriteLine("Registering this host:");
                Console.WriteLine("[{0}]", keyName); //@@@: Console.WriteLine("[{0}]", keyName);
                Console.WriteLine("@=\"{0}\"", options.manifest.Replace("\\", "\\\\")); //@@@: Console.WriteLine("@=\"{0}\"", options.manifest.Replace("\\", "\\\\"));
                Microsoft.Win32.Registry.SetValue(keyName, null, options.manifest); //@@@: Microsoft.Win32.Registry.SetValue(keyName, null, options.manifest);
                Console.WriteLine("Host registered successfully"); //@@@: Console.WriteLine("Host registered successfully");
                Console.WriteLine(); //@@@: Console.WriteLine();
            } //@@@: }
            const  = function(ex) { //@@@: catch (Exception ex)
                Console.Error.WriteLine("Error registering the host:", ex.Message); //@@@: Console.Error.WriteLine("Error registering the host:", ex.Message);
                return 0; //@@@: return 0;
            } //@@@: }

            return 0; //@@@: return 0;
        }; //@@@: }

        static int InvalidCommand(string command) //@@@: static int InvalidCommand(string command)
        { //@@@: {
            let tw = Console.Error; //@@@: TextWriter tw = Console.Error;
            tw.WriteLine("Invalid command line : unknown command '{0}'. Start again with no parameters to get usage information.", command); //@@@: tw.WriteLine("Invalid command line : unknown command '{0}'. Start again with no parameters to get usage information.", command);
            return 0; //@@@: return 0;
        } //@@@: }

        static int InvalidOption(string option) //@@@: static int InvalidOption(string option)
        { //@@@: {
            let tw = Console.Error; //@@@: TextWriter tw = Console.Error;
            tw.WriteLine("Invalid command line : unknown option '{0}'. Start again with no parameters to get usage information.", option); //@@@: tw.WriteLine("Invalid command line : unknown option '{0}'. Start again with no parameters to get usage information.", option);
            return 0; //@@@: return 0;
        } //@@@: }

        static int InvalidOptionValue(string option, string value) //@@@: static int InvalidOptionValue(string option, string value)
        { //@@@: {
            let tw = Console.Error; //@@@: TextWriter tw = Console.Error;
            tw.WriteLine("Invalid command line : invalid option '{0}' value '{1}'. Start again with no parameters to get usage information.", option, value); //@@@: tw.WriteLine("Invalid command line : invalid option '{0}' value '{1}'. Start again with no parameters to get usage information.", option, value);
            return 0; //@@@: return 0;
        } //@@@: }

        static int Usage(TextWriter tw = null) //@@@: static int Usage(TextWriter tw = null)
        { //@@@: {
            const  = function(null) { //@@@: if (tw == null) tw = Console.Out;
            tw.WriteLine("CSReportWebServer Echo Example Extension."); //@@@: tw.WriteLine("CSReportWebServer Echo Example Extension.");
            tw.WriteLine("Usage: {0} [options] <command>", Path.GetFileName(System.Reflection.Assembly.GetEntryAssembly().Location)); //@@@: tw.WriteLine("Usage: {0} [options] <command>", Path.GetFileName(System.Reflection.Assembly.GetEntryAssembly().Location));
            tw.WriteLine(); //@@@: tw.WriteLine();
            tw.WriteLine("Commands with options"); //@@@: tw.WriteLine("Commands with options");
            tw.WriteLine(); //@@@: tw.WriteLine();
            tw.WriteLine("  register                 Register this host"); //@@@: tw.WriteLine("  register                 Register this host");
            tw.WriteLine("    --hive=<HKCU|HKLM>     The hive to register the host in (default is {0})", options.hive); //@@@: tw.WriteLine("    --hive=<HKCU|HKLM>     The hive to register the host in (default is {0})", options.hive);
            tw.WriteLine("    --manifest=<file>      The file to output this host manifest to (default is {0}; overwritten, if exists)", options.manifest); //@@@: tw.WriteLine("    --manifest=<file>      The file to output this host manifest to (default is {0}; overwritten, if exists)", options.manifest);
            tw.WriteLine(); //@@@: tw.WriteLine();
            tw.WriteLine("  chrome-extension://*/    Start a native messaging host"); //@@@: tw.WriteLine("  chrome-extension://*/    Start a native messaging host");
            tw.WriteLine("    --parent-window=*      Specify parent window id"); //@@@: tw.WriteLine("    --parent-window=*      Specify parent window id");
            tw.WriteLine(); //@@@: tw.WriteLine();
            return 0; //@@@: return 0;
        }; //@@@: }

    } //@@@: }

UNKNOWN >>     sealed class Options //@@@: sealed class Options
    { //@@@: {
        self.hive = "HKCU"; //@@@: public string hive = "HKCU";
UNKNOWN >>         public string manifest = //@@@: public string manifest =
UNKNOWN >>             Path.GetDirectoryName(System.Reflection.Assembly.GetEntryAssembly().Location) + "\\" + //@@@: Path.GetDirectoryName(System.Reflection.Assembly.GetEntryAssembly().Location) + "\\" +
            Path.GetFileNameWithoutExtension(System.Reflection.Assembly.GetEntryAssembly().Location) + ".manifest.json"; //@@@: Path.GetFileNameWithoutExtension(System.Reflection.Assembly.GetEntryAssembly().Location) + ".manifest.json";
    } //@@@: }
} //@@@: }
