

namespace CSReportEditor
{
    export class fGroup {


    {
        private ok: boolean = false;

        public constructor() {
            InitializeComponent();
        }

        public getTxName() {
            return txName;
        }

        public getTxDbField() {
            return txDbField;
        }

        public getAsc() {
            return opAsc.Checked;
        }

        public setAsc(value: boolean) {
            opAsc.Checked = value;
        }

        public setDesc(value: boolean) {
            opDesc.Checked = value;
        }

        public getPrintInNewPage() {
            return chkPrintInNewPage.Checked;
        }

        public setPrintInNewPage(value: boolean) {
            chkPrintInNewPage.Checked = value;
        }

        public getReprintGroup() {
            return chkReprintGroup.Checked;
        }

        public setReprintGroup(value: boolean) {
            chkReprintGroup.Checked = value;
        }

        public getGrandTotal() {
            return chkGrandTotal.Checked;
        }

        public setGrandTotal(value: boolean) {
            chkGrandTotal.Checked = value;
        }

        public getSortByDate() {
            return opDate.Checked;
        }

        public setSortByDate(value: boolean) {
            opDate.Checked = value;
        }

        public getSortByNumber() {
            return opNumber.Checked;
        }

        public setSortByNumber(value: boolean) {
            opNumber.Checked = value;
        }

        public getSortByText() {
            return opText.Checked;
        }

        public setSortByText(value: boolean) {
            opText.Checked = value;
        }

        public getOk() {
            return this.ok;
        }

		public getDbField() {
			throw new NotImplementedException ();
		}

		public getFieldType() {
			throw new NotImplementedException ();
		}

		public getIndex() {
			throw new NotImplementedException ();
		}

		public setDbField(sField: string) {
			throw new NotImplementedException ();
		}

		public setFieldType(nFieldType: number) {
			throw new NotImplementedException ();
		}

		public setIndex(nIndex: number) {
			throw new NotImplementedException ();
		}

        private cmdOk_Click(sender: object, e: EventArgs) {
            this.ok = true;
            this.Hide();
        }

        private cmdCancel_Click(sender: object, e: EventArgs) {
            this.ok = false;
            this.Hide();
        }


    }    }
}
