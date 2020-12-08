(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {};

    globalObject.CSReportEditor.createFGroup = function() {

        const self = {};
        let m_editor: cEditor = null;
        let m_ok: boolean= false;
        let m_dbFieldChanged: boolean= false;
        let m_index: number= 0;
        let m_fieldType: number= 0;

        const fGroup = function() {
            InitializeComponent();
        };

UNKNOWN >>         public TextBox txName
        {
UNKNOWN >>             get
            {
                return tx_name;
            }
        }

UNKNOWN >>         public TextBox txDbField
        {
UNKNOWN >>             get
            {
                return tx_dbField;
            }
        }

UNKNOWN >>         public RadioButton opDesc
        {
UNKNOWN >>             get 
            {
                return op_desc;
            }
        }

UNKNOWN >>         public RadioButton opAsc
        {
UNKNOWN >>             get
            {
                return op_asc;
            }
        }

UNKNOWN >>         public CheckBox chkPrintInNewPage
        {
UNKNOWN >>             get 
            {
                return chk_printInNewPage;
            }
        }

UNKNOWN >>         public CheckBox chkReprintGroup
        {
UNKNOWN >>             get
            {
                return chk_reprintGroup;
            }
        }

UNKNOWN >>         public CheckBox chkGrandTotal
        {
UNKNOWN >>             get
            {
                return chk_grandTotal;
            }
        }

UNKNOWN >>         public RadioButton opDate
        {
UNKNOWN >>             get
            {
                return op_date;
            }
        }

UNKNOWN >>         public RadioButton opNumber
        {
UNKNOWN >>             get
            {
                return op_number;
            }
        }

UNKNOWN >>         public RadioButton opText
        {
UNKNOWN >>             get
            {
                return op_text;
            }
        }

UNKNOWN >>         public Label lbGroup
        {
UNKNOWN >>             get
            {
                return lb_group;
            }
        }

        self.getAsc = function() {
            return op_asc.Checked;
        };

        self.setAsc = function(value) {
            op_asc.Checked = value;
        };

        self.setDesc = function(value) {
            op_desc.Checked = value;
        };

        self.getPrintInNewPage = function() {
            return chk_printInNewPage.Checked;
        };

        self.setPrintInNewPage = function(value) {
            chk_printInNewPage.Checked = value;
        };

        self.getReprintGroup = function() {
            return chk_reprintGroup.Checked;
        };

        self.setReprintGroup = function(value) {
            chk_reprintGroup.Checked = value;
        };

        self.getGrandTotal = function() {
            return chk_grandTotal.Checked;
        };

        self.setGrandTotal = function(value) {
            chk_grandTotal.Checked = value;
        };

        self.getSortByDate = function() {
            return op_date.Checked;
        };

        self.setSortByDate = function(value) {
            op_date.Checked = value;
        };

        self.getSortByNumber = function() {
            return op_number.Checked;
        };

        self.setSortByNumber = function(value) {
            op_number.Checked = value;
        };

        self.getSortByText = function() {
            return op_text.Checked;
        };

        self.setSortByText = function(value) {
            op_text.Checked = value;
        };

        self.getOk = function() {
            return m_ok;
        };

		self. = function() {
			throw new NotImplementedException ();
		};

        self.getFieldType = function() {
            return m_fieldType;
        };

        self.setFieldType = function(rhs) {
            m_fieldType = rhs;
        };

        self.getIndex = function() {
            return m_index;
        };

        self.setIndex = function(rhs) {
            m_index = rhs;
        };

        const cmdOk_Click = function(sender, e) {
            m_ok = true;
            this.Hide();
        };

        const cmdCancel_Click = function(sender, e) {
            m_ok = false;
            this.Hide();
        };

        self.setHandler = function(editor) {
            m_editor = editor;
        };

        const cmd_dbField_Click = function(sender, e) {
            if (m_editor.showHelpDbFieldForGroup()) {
                m_dbFieldChanged = true;
            }
        };

        const fGroup_Load = function(sender, e) {
            cWindow.centerForm(this);
        };
        return self;

    }
}(globalObject));
