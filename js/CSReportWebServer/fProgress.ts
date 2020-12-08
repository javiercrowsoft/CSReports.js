(function(globalObject) {

    globalObject.CSReportWebServer = globalObject.CSReportWebServer || {};

    globalObject.CSReportWebServer.createFProgress = function() {

        const self = {};
        const fProgress = function() {
            InitializeComponent();
        };

UNKNOWN >>         public Label lbTask
        {
UNKNOWN >>             get
            {
                return lb_task;
            }
        }

UNKNOWN >>         public Label lbCurrPage
        {
UNKNOWN >>             get
            {
                return lb_curr_page;
            }
        }

UNKNOWN >>         public Label lbRecordCount
        {
UNKNOWN >>             get
            {
                return lb_record_count;
            }
        }

UNKNOWN >>         public Label lbCurrRecord
        {
UNKNOWN >>             get
            {
                return lb_curr_record;
            }
        }

UNKNOWN >>         public ProgressBar prgBar
        {
UNKNOWN >>             get
            {
                return prg_bar;
            }
        }

        const fProgress_Load = function(sender, e) {
            cWindow.locateFormAtTop(this);
        };
        return self;

    }
}(globalObject));
