(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {};

    globalObject.CSReportEditor.createProgram = function() {

        // @ts-ignore
        let self: CSReportEditor.IProgram = {};
        /// <summary>
        /// The main entry point for the application.
        /// </summary>
        [STAThread]
        static void Main()
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            Application.Run(cMainEditor.initEditor());
        };
        return self;

    }    }
}(globalObject));


namespace CSReportEditor {

  export interface IProgram {

  }
}
