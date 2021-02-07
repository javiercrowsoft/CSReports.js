

namespace CSReportEditor
{
    export class fGroup {


    {
        private editor: cEditor = null;
        private ok: boolean = false;
        private dbFieldChanged: boolean = false;
        private index: number = 0;
        private fieldType: number = 0;

        public constructor() {
            InitializeComponent();
        }

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

        public getAsc() {
            return op_asc.Checked;
        }

        public setAsc(value: boolean) {
            op_asc.Checked = value;
        }

        public setDesc(value: boolean) {
            op_desc.Checked = value;
        }

        public getPrintInNewPage() {
            return chk_printInNewPage.Checked;
        }

        public setPrintInNewPage(value: boolean) {
            chk_printInNewPage.Checked = value;
        }

        public getReprintGroup() {
            return chk_reprintGroup.Checked;
        }

        public setReprintGroup(value: boolean) {
            chk_reprintGroup.Checked = value;
        }

        public getGrandTotal() {
            return chk_grandTotal.Checked;
        }

        public setGrandTotal(value: boolean) {
            chk_grandTotal.Checked = value;
        }

        public getSortByDate() {
            return op_date.Checked;
        }

        public setSortByDate(value: boolean) {
            op_date.Checked = value;
        }

        public getSortByNumber() {
            return op_number.Checked;
        }

        public setSortByNumber(value: boolean) {
            op_number.Checked = value;
        }

        public getSortByText() {
            return op_text.Checked;
        }

        public setSortByText(value: boolean) {
            op_text.Checked = value;
        }

        public getOk() {
            return this.ok;
        }

		public getDbField() {
			throw new NotImplementedException ();
		}

        public getFieldType() {
            return this.fieldType;
        }

        public setFieldType(rhs: number) {
            this.fieldType = rhs;
        }

        public getIndex() {
            return this.index;
        }

        public setIndex(rhs: number) {
            this.index = rhs;
        }

        private cmdOk_Click(sender: object, e: EventArgs) {
            this.ok = true;
            this.Hide();
        }

        private cmdCancel_Click(sender: object, e: EventArgs) {
            this.ok = false;
            this.Hide();
        }

        public setHandler(editor: cEditor) {
            this.editor = editor;
        }

        private cmd_dbField_Click(sender: object, e: EventArgs) {
            if (this.editor.showHelpDbFieldForGroup()) {
                this.dbFieldChanged = true;
            }
        }

        private fGroup_Load(sender: object, e: EventArgs) {
            cWindow.centerForm(this);
        }


    } 
}
