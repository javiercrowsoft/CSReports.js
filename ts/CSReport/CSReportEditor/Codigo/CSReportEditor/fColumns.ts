(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {};

    globalObject.CSReportEditor.createFColumns = function() {

        const self = {};

        const C_FIELDTYPE = "t";
        const C_INDEX = "i";

        let m_field = "";
        let m_fieldType = -1;
        let m_fieldIndex = -1;

        let m_ok = false;

        const fColumns = function() {
            InitializeComponent();
        };

        const cmd_apply_Click = function(sender, e) {
            m_ok = true;
            this.Hide();
        };

        const cmd_cancel_Click = function(sender, e) {
            m_ok = false;
            this.Hide();
        };

        self.clearColumns = function() {
            lv_columns.Items.Clear();
        };

        self.fillColumns = function(dataSource, columns, add) {
            cGlobals.fillColumns(dataSource, columns, lv_columns, C_INDEX, C_FIELDTYPE, add);
            /*
            foreach (cColumnInfo column in columns) 
            {
                var item = lv_columns.Items.Add(String.Format("{{{0}}}.{1}", dataSource, column.getName()));
                item.ImageIndex = 0;
                string info = cUtil.setInfoString("", C_INDEX, column.getPosition().ToString());
                info = cUtil.setInfoString(info, C_FIELDTYPE, column.getColumnType().ToString());
                item.Tag = info;
            }
             */ 
        };

        self.setField = function(field) {
            m_field = field;
            for(var i_ = 0; i_ < lv_columns.Items.length; i_++) {
                if (item.Text === field)  {
                    item.Selected = true;
                    item.Focused = true;
                    lv_columns.Select();
                    break;
                }
            }
        };

        self.getOk = function() {
            return m_ok;
        };

        self.getField = function() {
            return m_field;
        };

        self.getFieldType = function() {
            return m_fieldType;
        };

        self.getIndex = function() {
            return m_fieldIndex;
        };

        const lv_columns_Click = function(sender, e) {
            if (lv_columns.SelectedItems.Count > 0) {
                let item = lv_columns.SelectedItems[0];
                m_field = item.Text;
                let info = item.Tag.ToString();
                m_fieldType = cUtil.valAsInt(cUtil.getInfoString(info, C_FIELDTYPE, "-1"));
                m_fieldIndex = cUtil.valAsInt(cUtil.getInfoString(info, C_INDEX, "-1"));
            }
        };

        const fColumns_Load = function(sender, e) {
            cWindow.centerForm(this);
        };
        return self;

    }
}(globalObject));
