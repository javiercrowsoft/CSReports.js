(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {};

    globalObject.CSReportEditor.createFControls = function() {

        const self = {};
        let m_editor = null;

        const C_CTRL_IMAGE = 1;
        const C_DB_IMAGE = 0;

        let lvwColumnSorter = null;

        const fControls = function() {
            InitializeComponent();
        };

		self.clear = function() {
            lv_controls.Items.Clear();
		};

		self.addCtrls = function(report) {
            cGlobals.addCtrls(report, lv_controls, C_CTRL_IMAGE, C_DB_IMAGE);          
		};

        self.setHandler = function(editor) {
            m_editor = editor;
        };

        const fControls_Load = function(sender, e) {
            cWindow.locateFormAtLeft(this);

            // Create an instance of a ListView column sorter and assign it 
            // to the ListView control.
            lvwColumnSorter = new cListViewColumnSorter();
            lv_controls.ListViewItemSorter = lvwColumnSorter;
            lv_controls_ColumnClick(this, new ColumnClickEventArgs(0));
        };

        const lv_controls_ColumnClick = function(sender, e) {
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
        };

        const lv_controls_MouseClick = function(sender, e) {
            selectControl();
        };

        const lv_controls_KeyUp = function(sender, e) {
            selectControl();
        };

        const selectControl = function() {
            if (lv_controls.SelectedItems.Count > 0) {
                let info = lv_controls.SelectedItems[0].Tag.ToString();
                m_editor.selectCtrl(info);
            }
        };

        const cmd_close_Click = function(sender, e) {
            this.Close();
        };

        const cmd_edit_Click = function(sender, e) {
            if (lv_controls.SelectedItems.Count > 0) {
                let info = lv_controls.SelectedItems[0].Tag.ToString();
                m_editor.showProperties(info);
            }
        };
        return self;

    }
}(globalObject));
