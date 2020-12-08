(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {}; //@@@: namespace CSReportEditor
 //@@@: {
    globalObject.CSReportEditor.createFControls = function() {

        const self = {}; //@@@: public partial class fControls : Form
        let m_editor = null; //@@@: private cEditor m_editor;

        const C_CTRL_IMAGE = 1; //@@@: private const int C_CTRL_IMAGE = 1;
        const C_DB_IMAGE = 0; //@@@: private const int C_DB_IMAGE = 0;

        let lvwColumnSorter = null; //@@@: private cListViewColumnSorter lvwColumnSorter;

        const fControls = function() { //@@@: public fControls()
            InitializeComponent(); //@@@: InitializeComponent();
        }; //@@@: }

		self.clear = function() { //@@@: public void clear()
            lv_controls.Items.Clear(); //@@@: lv_controls.Items.Clear();
		}; //@@@: }

		self.addCtrls = function(report) { //@@@: public void addCtrls(cReport report)
            cGlobals.addCtrls(report, lv_controls, C_CTRL_IMAGE, C_DB_IMAGE);           //@@@: cGlobals.addCtrls(report, lv_controls, C_CTRL_IMAGE, C_DB_IMAGE);
		}; //@@@: }

        self.setHandler = function(editor) { //@@@: public void setHandler(cEditor editor)
            m_editor = editor; //@@@: m_editor = editor;
        }; //@@@: }

        const fControls_Load = function(sender, e) { //@@@: private void fControls_Load(object sender, EventArgs e)
            cWindow.locateFormAtLeft(this); //@@@: cWindow.locateFormAtLeft(this);

            // Create an instance of a ListView column sorter and assign it 
            // to the ListView control.
            lvwColumnSorter = new cListViewColumnSorter(); //@@@: lvwColumnSorter = new cListViewColumnSorter();
            lv_controls.ListViewItemSorter = lvwColumnSorter; //@@@: lv_controls.ListViewItemSorter = lvwColumnSorter;
            lv_controls_ColumnClick(this, new ColumnClickEventArgs(0)); //@@@: lv_controls_ColumnClick(this, new ColumnClickEventArgs(0));
        }; //@@@: }

        const lv_controls_ColumnClick = function(sender, e) { //@@@: private void lv_controls_ColumnClick(object sender, ColumnClickEventArgs e)
            // Determine if clicked column is already the column that is being sorted.
            if (e.Column === lvwColumnSorter.SortColumn) { //@@@: if (e.Column == lvwColumnSorter.SortColumn)
                // Reverse the current sort direction for this column.
                if (lvwColumnSorter.Order === SortOrder.Ascending) { //@@@: if (lvwColumnSorter.Order == SortOrder.Ascending)
                    lvwColumnSorter.Order = SortOrder.Descending; //@@@: lvwColumnSorter.Order = SortOrder.Descending;
                } //@@@: }
                else { //@@@: else
                    lvwColumnSorter.Order = SortOrder.Ascending; //@@@: lvwColumnSorter.Order = SortOrder.Ascending;
                } //@@@: }
            } //@@@: }
            else { //@@@: else
                // Set the column number that is to be sorted; default to ascending.
                lvwColumnSorter.SortColumn = e.Column; //@@@: lvwColumnSorter.SortColumn = e.Column;
                lvwColumnSorter.Order = SortOrder.Ascending; //@@@: lvwColumnSorter.Order = SortOrder.Ascending;
            } //@@@: }

            // Perform the sort with these new sort options.
            lv_controls.Sort(); //@@@: lv_controls.Sort();
        }; //@@@: }

        const lv_controls_MouseClick = function(sender, e) { //@@@: private void lv_controls_MouseClick(object sender, MouseEventArgs e)
            selectControl(); //@@@: selectControl();
        }; //@@@: }

        const lv_controls_KeyUp = function(sender, e) { //@@@: private void lv_controls_KeyUp(object sender, KeyEventArgs e)
            selectControl(); //@@@: selectControl();
        }; //@@@: }

        const selectControl = function() { //@@@: private void selectControl()
            if (lv_controls.SelectedItems.Count > 0) { //@@@: if (lv_controls.SelectedItems.Count > 0)
                let info = lv_controls.SelectedItems[0].Tag.ToString(); //@@@: var info = lv_controls.SelectedItems[0].Tag.ToString();
                m_editor.selectCtrl(info); //@@@: m_editor.selectCtrl(info);
            } //@@@: }
        }; //@@@: }

        const cmd_close_Click = function(sender, e) { //@@@: private void cmd_close_Click(object sender, EventArgs e)
            this.Close(); //@@@: this.Close();
        }; //@@@: }

        const cmd_edit_Click = function(sender, e) { //@@@: private void cmd_edit_Click(object sender, EventArgs e)
            if (lv_controls.SelectedItems.Count > 0) { //@@@: if (lv_controls.SelectedItems.Count > 0)
                let info = lv_controls.SelectedItems[0].Tag.ToString(); //@@@: var info = lv_controls.SelectedItems[0].Tag.ToString();
                m_editor.showProperties(info); //@@@: m_editor.showProperties(info);
            } //@@@: }
        }; //@@@: }
        return self;

    } //@@@: }
}(globalObject)); //@@@: }
