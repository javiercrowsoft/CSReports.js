(function(globalObject) {

    globalObject.CSReportPaint = globalObject.CSReportPaint || {}; //@@@: namespace CSReportPaint
 //@@@: {
    globalObject.CSReportPaint.createFPreview = function() {

        const self = {}; //@@@: public partial class fPreview : Form
        const fPreview = function() { //@@@: public fPreview()
            InitializeComponent(); //@@@: InitializeComponent();
        }; //@@@: }

        self.getRpwReport = function() { //@@@: public CSReportPreview.cReportPreview getRpwReport()
            return rpwReport; //@@@: return rpwReport;
        }; //@@@: }

        const fPreview_Load = function(sender, e) { //@@@: private void fPreview_Load(object sender, EventArgs e)
            this.Height = 990; //@@@: this.Height = 990;
            this.Width = 950; //@@@: this.Width = 950;
            cWindow.centerForm(this); //@@@: cWindow.centerForm(this);
        }; //@@@: }
        return self;

    } //@@@: }
}(globalObject)); //@@@: }
