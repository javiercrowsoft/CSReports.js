(function(globalObject) {

    globalObject.CSReportWebServer = globalObject.CSReportWebServer || {}; //@@@: namespace CSReportWebServer
 //@@@: {
UNKNOWN >>     static class Program //@@@: static class Program
    { //@@@: {
		let ILog log = LogManager.GetLogger(typeof(Program)); //@@@: private static ILog log = LogManager.GetLogger(typeof(Program));

        /// <summary>
        /// The main entry point for the application.
        /// </summary>
        [STAThread] //@@@: [STAThread]
        static void Main(string[] args) //@@@: static void Main(string[] args)
        { //@@@: {
			// configure log4net
			log4net.Config.XmlConfigurator.Configure(); //@@@: log4net.Config.XmlConfigurator.Configure();
            log.Info("application started 0.0.0.1"); //@@@: log.Info("application started 0.0.0.1");
			log.DebugFormat("command line : \"{0}\"", string.Join("\", \"", args)); //@@@: log.DebugFormat("command line : \"{0}\"", string.Join("\", \"", args));
			log.Info("-------"); //@@@: log.Info("-------");
            Application.EnableVisualStyles(); //@@@: Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false); //@@@: Application.SetCompatibleTextRenderingDefault(false);
            Application.Run(new fMain(args));             //@@@: Application.Run(new fMain(args));
        } //@@@: }
    } //@@@: }
} //@@@: }
