(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {}; //@@@: namespace CSReportEditor
 //@@@: {
    globalObject.CSReportEditor.createFGroup = function() {

        const self = {}; //@@@: public partial class fGroup : Form, cIDatabaseFieldSelector
        let m_editor = null; //@@@: private cEditor m_editor;
        let m_ok = false; //@@@: private bool m_ok = false;
        let m_dbFieldChanged = false; //@@@: private bool m_dbFieldChanged = false;
        let m_index = 0; //@@@: private int m_index = 0;
        let m_fieldType = 0; //@@@: private int m_fieldType = 0;

        const fGroup = function() { //@@@: public fGroup()
            InitializeComponent(); //@@@: InitializeComponent();
        }; //@@@: }

UNKNOWN >>         public TextBox txName //@@@: public TextBox txName
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return tx_name; //@@@: return tx_name;
            } //@@@: }
        } //@@@: }

UNKNOWN >>         public TextBox txDbField //@@@: public TextBox txDbField
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return tx_dbField; //@@@: return tx_dbField;
            } //@@@: }
        } //@@@: }

UNKNOWN >>         public RadioButton opDesc //@@@: public RadioButton opDesc
        { //@@@: {
UNKNOWN >>             get  //@@@: get
            { //@@@: {
                return op_desc; //@@@: return op_desc;
            } //@@@: }
        } //@@@: }

UNKNOWN >>         public RadioButton opAsc //@@@: public RadioButton opAsc
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return op_asc; //@@@: return op_asc;
            } //@@@: }
        } //@@@: }

UNKNOWN >>         public CheckBox chkPrintInNewPage //@@@: public CheckBox chkPrintInNewPage
        { //@@@: {
UNKNOWN >>             get  //@@@: get
            { //@@@: {
                return chk_printInNewPage; //@@@: return chk_printInNewPage;
            } //@@@: }
        } //@@@: }

UNKNOWN >>         public CheckBox chkReprintGroup //@@@: public CheckBox chkReprintGroup
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return chk_reprintGroup; //@@@: return chk_reprintGroup;
            } //@@@: }
        } //@@@: }

UNKNOWN >>         public CheckBox chkGrandTotal //@@@: public CheckBox chkGrandTotal
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return chk_grandTotal; //@@@: return chk_grandTotal;
            } //@@@: }
        } //@@@: }

UNKNOWN >>         public RadioButton opDate //@@@: public RadioButton opDate
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return op_date; //@@@: return op_date;
            } //@@@: }
        } //@@@: }

UNKNOWN >>         public RadioButton opNumber //@@@: public RadioButton opNumber
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return op_number; //@@@: return op_number;
            } //@@@: }
        } //@@@: }

UNKNOWN >>         public RadioButton opText //@@@: public RadioButton opText
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return op_text; //@@@: return op_text;
            } //@@@: }
        } //@@@: }

UNKNOWN >>         public Label lbGroup //@@@: public Label lbGroup
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return lb_group; //@@@: return lb_group;
            } //@@@: }
        } //@@@: }

        self.getAsc = function() { //@@@: public bool getAsc()
            return op_asc.Checked; //@@@: return op_asc.Checked;
        }; //@@@: }

        self.setAsc = function(value) { //@@@: public void setAsc(bool value)
            op_asc.Checked = value; //@@@: op_asc.Checked = value;
        }; //@@@: }

        self.setDesc = function(value) { //@@@: public void setDesc(bool value)
            op_desc.Checked = value; //@@@: op_desc.Checked = value;
        }; //@@@: }

        self.getPrintInNewPage = function() { //@@@: public bool getPrintInNewPage()
            return chk_printInNewPage.Checked; //@@@: return chk_printInNewPage.Checked;
        }; //@@@: }

        self.setPrintInNewPage = function(value) { //@@@: public void setPrintInNewPage(bool value)
            chk_printInNewPage.Checked = value; //@@@: chk_printInNewPage.Checked = value;
        }; //@@@: }

        self.getReprintGroup = function() { //@@@: public bool getReprintGroup()
            return chk_reprintGroup.Checked; //@@@: return chk_reprintGroup.Checked;
        }; //@@@: }

        self.setReprintGroup = function(value) { //@@@: public void setReprintGroup(bool value)
            chk_reprintGroup.Checked = value; //@@@: chk_reprintGroup.Checked = value;
        }; //@@@: }

        self.getGrandTotal = function() { //@@@: public bool getGrandTotal()
            return chk_grandTotal.Checked; //@@@: return chk_grandTotal.Checked;
        }; //@@@: }

        self.setGrandTotal = function(value) { //@@@: public void setGrandTotal(bool value)
            chk_grandTotal.Checked = value; //@@@: chk_grandTotal.Checked = value;
        }; //@@@: }

        self.getSortByDate = function() { //@@@: public bool getSortByDate()
            return op_date.Checked; //@@@: return op_date.Checked;
        }; //@@@: }

        self.setSortByDate = function(value) { //@@@: public void setSortByDate(bool value)
            op_date.Checked = value; //@@@: op_date.Checked = value;
        }; //@@@: }

        self.getSortByNumber = function() { //@@@: public bool getSortByNumber()
            return op_number.Checked; //@@@: return op_number.Checked;
        }; //@@@: }

        self.setSortByNumber = function(value) { //@@@: public void setSortByNumber(bool value)
            op_number.Checked = value; //@@@: op_number.Checked = value;
        }; //@@@: }

        self.getSortByText = function() { //@@@: public bool getSortByText()
            return op_text.Checked; //@@@: return op_text.Checked;
        }; //@@@: }

        self.setSortByText = function(value) { //@@@: public void setSortByText(bool value)
            op_text.Checked = value; //@@@: op_text.Checked = value;
        }; //@@@: }

        self.getOk = function() { //@@@: public bool getOk()
            return m_ok; //@@@: return m_ok;
        }; //@@@: }

		self. = function() { //@@@: public string getDbField ()
			throw new NotImplementedException (); //@@@: throw new NotImplementedException ();
		}; //@@@: }

        self.getFieldType = function() { //@@@: public int getFieldType()
            return m_fieldType; //@@@: return m_fieldType;
        }; //@@@: }

        self.setFieldType = function(rhs) { //@@@: public void setFieldType(int rhs)
            m_fieldType = rhs; //@@@: m_fieldType = rhs;
        }; //@@@: }

        self.getIndex = function() { //@@@: public int getIndex()
            return m_index; //@@@: return m_index;
        }; //@@@: }

        self.setIndex = function(rhs) { //@@@: public void setIndex(int rhs)
            m_index = rhs; //@@@: m_index = rhs;
        }; //@@@: }

        const cmdOk_Click = function(sender, e) { //@@@: private void cmdOk_Click(object sender, EventArgs e)
            m_ok = true; //@@@: m_ok = true;
            this.Hide(); //@@@: this.Hide();
        }; //@@@: }

        const cmdCancel_Click = function(sender, e) { //@@@: private void cmdCancel_Click(object sender, EventArgs e)
            m_ok = false; //@@@: m_ok = false;
            this.Hide(); //@@@: this.Hide();
        }; //@@@: }

        self.setHandler = function(editor) { //@@@: public void setHandler(cEditor editor)
            m_editor = editor; //@@@: m_editor = editor;
        }; //@@@: }

        const cmd_dbField_Click = function(sender, e) { //@@@: private void cmd_dbField_Click(object sender, EventArgs e)
            if (m_editor.showHelpDbFieldForGroup()) { //@@@: if (m_editor.showHelpDbFieldForGroup())
                m_dbFieldChanged = true; //@@@: m_dbFieldChanged = true;
            } //@@@: }
        }; //@@@: }

        const fGroup_Load = function(sender, e) { //@@@: private void fGroup_Load(object sender, EventArgs e)
            cWindow.centerForm(this); //@@@: cWindow.centerForm(this);
        }; //@@@: }
        return self;

    } //@@@: }
}(globalObject)); //@@@: }
