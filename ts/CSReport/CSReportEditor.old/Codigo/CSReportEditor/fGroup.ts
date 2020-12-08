(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {};

    globalObject.CSReportEditor.createFGroup = function() {

        const self = {};
        let m_ok: boolean= false;

        const fGroup = function() {
            InitializeComponent();
        };

        self.getTxName = function() {
            return txName;
        };

        self.getTxDbField = function() {
            return txDbField;
        };

        self.getAsc = function() {
            return opAsc.Checked;
        };

        self.setAsc = function(value) {
            opAsc.Checked = value;
        };

        self.setDesc = function(value) {
            opDesc.Checked = value;
        };

        self.getPrintInNewPage = function() {
            return chkPrintInNewPage.Checked;
        };

        self.setPrintInNewPage = function(value) {
            chkPrintInNewPage.Checked = value;
        };

        self.getReprintGroup = function() {
            return chkReprintGroup.Checked;
        };

        self.setReprintGroup = function(value) {
            chkReprintGroup.Checked = value;
        };

        self.getGrandTotal = function() {
            return chkGrandTotal.Checked;
        };

        self.setGrandTotal = function(value) {
            chkGrandTotal.Checked = value;
        };

        self.getSortByDate = function() {
            return opDate.Checked;
        };

        self.setSortByDate = function(value) {
            opDate.Checked = value;
        };

        self.getSortByNumber = function() {
            return opNumber.Checked;
        };

        self.setSortByNumber = function(value) {
            opNumber.Checked = value;
        };

        self.getSortByText = function() {
            return opText.Checked;
        };

        self.setSortByText = function(value) {
            opText.Checked = value;
        };

        self.getOk = function() {
            return m_ok;
        };

		self. = function() {
			throw new NotImplementedException ();
		};

		self. = function() {
			throw new NotImplementedException ();
		};

		self. = function() {
			throw new NotImplementedException ();
		};

		self. = function(sField) {
			throw new NotImplementedException ();
		};

		self. = function(nFieldType) {
			throw new NotImplementedException ();
		};

		self. = function(nIndex) {
			throw new NotImplementedException ();
		};

        const cmdOk_Click = function(sender, e) {
            m_ok = true;
            this.Hide();
        };

        const cmdCancel_Click = function(sender, e) {
            m_ok = false;
            this.Hide();
        };
        return self;

    }
}(globalObject));
