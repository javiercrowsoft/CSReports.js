(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {};

    globalObject.CSReportEditor.createFGroup = function() {

        // @ts-ignore
        let self: CSReportEditor.IfGroup = {};
        let m_ok: boolean = false;

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

		self.getDbField = function() {
			throw new NotImplementedException ();
		};

		self.getFieldType = function() {
			throw new NotImplementedException ();
		};

		self.getIndex = function() {
			throw new NotImplementedException ();
		};

		self.setDbField = function(sField) {
			throw new NotImplementedException ();
		};

		self.setFieldType = function(nFieldType) {
			throw new NotImplementedException ();
		};

		self.setIndex = function(nIndex) {
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

    }    }
}(globalObject));


namespace CSReportEditor {

  export interface IfGroup {

    getTxName: () => cMaskEdit;
    getTxDbField: () => cMaskEdit;
    getAsc: () => bool;
    setAsc: (bool) => void;
    setDesc: (bool) => void;
    getPrintInNewPage: () => bool;
    setPrintInNewPage: (bool) => void;
    getReprintGroup: () => bool;
    setReprintGroup: (bool) => void;
    getGrandTotal: () => bool;
    setGrandTotal: (bool) => void;
    getSortByDate: () => bool;
    setSortByDate: (bool) => void;
    getSortByNumber: () => bool;
    setSortByNumber: (bool) => void;
    getSortByText: () => bool;
    setSortByText: (bool) => void;
    getOk: () => bool;
    getDbField: () => string;
    getFieldType: () => int;
    getIndex: () => int;
    setDbField: (string) => void;
    setFieldType: (int) => void;
    setIndex: (int) => void;
  }
}
