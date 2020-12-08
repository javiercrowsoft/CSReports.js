(function(globalObject) {

    globalObject.CSReportWebServer = globalObject.CSReportWebServer || {}; //@@@: namespace CSReportWebServer
 //@@@: {
    globalObject.CSReportWebServer.createFProgress = function() {

        const self = {}; //@@@: public partial class fProgress : Form
        const fProgress = function() { //@@@: public fProgress()
            InitializeComponent(); //@@@: InitializeComponent();
        }; //@@@: }

UNKNOWN >>         public Label lbTask //@@@: public Label lbTask
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return lb_task; //@@@: return lb_task;
            } //@@@: }
        } //@@@: }

UNKNOWN >>         public Label lbCurrPage //@@@: public Label lbCurrPage
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return lb_curr_page; //@@@: return lb_curr_page;
            } //@@@: }
        } //@@@: }

UNKNOWN >>         public Label lbRecordCount //@@@: public Label lbRecordCount
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return lb_record_count; //@@@: return lb_record_count;
            } //@@@: }
        } //@@@: }

UNKNOWN >>         public Label lbCurrRecord //@@@: public Label lbCurrRecord
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return lb_curr_record; //@@@: return lb_curr_record;
            } //@@@: }
        } //@@@: }

UNKNOWN >>         public ProgressBar prgBar //@@@: public ProgressBar prgBar
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return prg_bar; //@@@: return prg_bar;
            } //@@@: }
        } //@@@: }

        const fProgress_Load = function(sender, e) { //@@@: private void fProgress_Load(object sender, EventArgs e)
            cWindow.locateFormAtTop(this); //@@@: cWindow.locateFormAtTop(this);
        }; //@@@: }
        return self;

    } //@@@: }
}(globalObject)); //@@@: }
