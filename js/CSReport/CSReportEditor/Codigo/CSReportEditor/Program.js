(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {}; //@@@: namespace CSReportEditor
 //@@@: {
UNKNOWN >>     static class Program //@@@: static class Program
    { //@@@: {
        /// <summary>
        /// The main entry point for the application.
        /// </summary>
        [STAThread] //@@@: [STAThread]
        static void Main() //@@@: static void Main()
        { //@@@: {
            Application.EnableVisualStyles(); //@@@: Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false); //@@@: Application.SetCompatibleTextRenderingDefault(false);
            Application.Run(cMainEditor.initEditor()); //@@@: Application.Run(cMainEditor.initEditor());
        } //@@@: }
    } //@@@: }
} //@@@: }
