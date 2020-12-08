(function(globalObject) {

    globalObject.CSReportPaint = globalObject.CSReportPaint || {};

    globalObject.CSReportPaint.createFPreview = function() {

        const self = {};
        const fPreview = function() {
            InitializeComponent();
        };

        self.getRpwReport = function() {
            return rpwReport;
        };

        const fPreview_Load = function(sender, e) {
            this.Height = 990;
            this.Width = 950;
            cWindow.centerForm(this);
        };
        return self;

    }
}(globalObject));
