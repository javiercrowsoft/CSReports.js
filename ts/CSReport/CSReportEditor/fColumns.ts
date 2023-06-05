namespace CSReportEditor {

    import cColumnsInfo = CSReportDll.cColumnsInfo;

    export class FColumns {

        private C_FIELDTYPE: string = "t";
        private C_INDEX: string = "i";

        private field: string = "";
        private fieldType: number = -1;
        private fieldIndex: number = -1;

        private ok: boolean = false;

        public constructor() {
            // InitializeComponent();
        }

        private cmd_apply_Click(sender: object, e: object) {
            // this.ok = true;
            // this.Hide();
        }

        private cmd_cancel_Click(sender: object, e: object) {
            // this.ok = false;
            // this.Hide();
        }

        public clearColumns() {
            // lv_columns.Items.clear();
        }

        public fillColumns(dataSource: string, columns: cColumnsInfo, add: boolean) {
            // cGlobals.fillColumns(dataSource, columns, lv_columns, C_INDEX, C_FIELDTYPE, add);
            /*
            foreach (cColumnInfo column in columns) 
            {
                var item = lv_columns.Items.Add(String.Format("{{{0}}}.{1}", dataSource, column.getName()));
                item.ImageIndex = 0;
                string info = cUtil.setInfoString("", C_INDEX, column.getPosition().toString());
                info = cUtil.setInfoString(info, C_FIELDTYPE, column.getColumnType().toString());
                item.Tag = info;
            }
             */ 
        }

        public setField(field: string) {
            // this.field = field;
            // for(let i_ = 0; i_ < lv_columns.Items.length; i_++) {
            //     if (item.Text === field)  {
            //         item.Selected = true;
            //         item.Focused = true;
            //         lv_columns.Select();
            //         break;
            //     }
            // }
        }

        public getOk() {
            return this.ok;
        }

        public getField() {
            return this.field;
        }

        public getFieldType() {
            return this.fieldType;
        }

        public getIndex() {
            return this.fieldIndex;
        }

        private lv_columns_Click(sender: object, e: object) {
            // if (lv_columns.SelectedItems.Count > 0) {
            //     let item: ListViewItem = lv_columns.SelectedItems[0];
            //     this.field = item.Text;
            //     let info = item.Tag.toString();
            //     this.fieldType = Utils.valInt(cUtil.getInfoString(info, C_FIELDTYPE, "-1"));
            //     this.fieldIndex = Utils.valInt(cUtil.getInfoString(info, C_INDEX, "-1"));
            // }
        }

        private fColumns_Load(sender: object, e: object) {
            // cWindow.centerForm(this);
        }

        showDialog() {

        }

        close() {

        }
    }
}
