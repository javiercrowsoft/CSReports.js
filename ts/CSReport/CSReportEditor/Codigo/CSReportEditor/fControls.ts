

namespace CSReportEditor
{
    export class fControls {


    {
        private editor: cEditor = null;

        private C_CTRL_IMAGE: number = 1;
        private C_DB_IMAGE: number = 0;

        private lvwColumnSorter: cListViewColumnSorter = null;

        public constructor() {
            InitializeComponent();
        }

		public clear() {
            lv_controls.Items.Clear();
		}

		public addCtrls(report: cReport) {
            cGlobals.addCtrls(report, lv_controls, C_CTRL_IMAGE, C_DB_IMAGE);          
		}

        public setHandler(editor: cEditor) {
            this.editor = editor;
        }

        private fControls_Load(sender: object, e: EventArgs) {
            cWindow.locateFormAtLeft(this);

            // Create an instance of a ListView column sorter and assign it 
            // to the ListView control.
            lvwColumnSorter = new cListViewColumnSorter();
            lv_controls.ListViewItemSorter = lvwColumnSorter;
            lv_controls_ColumnClick(this, new ColumnClickEventArgs(0));
        }

        private lv_controls_ColumnClick(sender: object, e: ColumnClickEventArgs) {
            // Determine if clicked column is already the column that is being sorted.
            if (e.Column === lvwColumnSorter.SortColumn) {
                // Reverse the current sort direction for this column.
                if (lvwColumnSorter.Order === SortOrder.Ascending) {
                    lvwColumnSorter.Order = SortOrder.Descending;
                }
                else {
                    lvwColumnSorter.Order = SortOrder.Ascending;
                }
            }
            else {
                // Set the column number that is to be sorted; default to ascending.
                lvwColumnSorter.SortColumn = e.Column;
                lvwColumnSorter.Order = SortOrder.Ascending;
            }

            // Perform the sort with these new sort options.
            lv_controls.Sort();
        }

        private lv_controls_MouseClick(sender: object, e: MouseEventArgs) {
            selectControl();
        }

        private lv_controls_KeyUp(sender: object, e: KeyEventArgs) {
            selectControl();
        }

        private selectControl() {
            if (lv_controls.SelectedItems.Count > 0) {
                let info: var = lv_controls.SelectedItems[0].Tag.ToString();
                this.editor.selectCtrl(info);
            }
        }

        private cmd_close_Click(sender: object, e: EventArgs) {
            this.Close();
        }

        private cmd_edit_Click(sender: object, e: EventArgs) {
            if (lv_controls.SelectedItems.Count > 0) {
                let info: var = lv_controls.SelectedItems[0].Tag.ToString();
                this.editor.showProperties(info);
            }
        }


    }    }
}
