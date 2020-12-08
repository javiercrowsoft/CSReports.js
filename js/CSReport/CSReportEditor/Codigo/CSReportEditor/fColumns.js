(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {}; //@@@: namespace CSReportEditor
 //@@@: {
    globalObject.CSReportEditor.createFColumns = function() {

        const self = {}; //@@@: public partial class fColumns : Form

        const C_FIELDTYPE = "t"; //@@@: private const String C_FIELDTYPE = "t";
        const C_INDEX = "i"; //@@@: private const String C_INDEX = "i";

        let m_field = ""; //@@@: private string m_field = "";
        let m_fieldType = -1; //@@@: private int m_fieldType = -1;
        let m_fieldIndex = -1; //@@@: private int m_fieldIndex = -1;

        let m_ok = false; //@@@: private bool m_ok = false;

        const fColumns = function() { //@@@: public fColumns()
            InitializeComponent(); //@@@: InitializeComponent();
        }; //@@@: }

        const cmd_apply_Click = function(sender, e) { //@@@: private void cmd_apply_Click(object sender, EventArgs e)
            m_ok = true; //@@@: m_ok = true;
            this.Hide(); //@@@: this.Hide();
        }; //@@@: }

        const cmd_cancel_Click = function(sender, e) { //@@@: private void cmd_cancel_Click(object sender, EventArgs e)
            m_ok = false; //@@@: m_ok = false;
            this.Hide(); //@@@: this.Hide();
        }; //@@@: }

        self.clearColumns = function() { //@@@: internal void clearColumns()
            lv_columns.Items.Clear(); //@@@: lv_columns.Items.Clear();
        }; //@@@: }

        self.fillColumns = function(dataSource, columns, add) { //@@@: internal void fillColumns(string dataSource, cColumnsInfo columns, bool add)
            cGlobals.fillColumns(dataSource, columns, lv_columns, C_INDEX, C_FIELDTYPE, add); //@@@: cGlobals.fillColumns(dataSource, columns, lv_columns, C_INDEX, C_FIELDTYPE, add);
            /* //@@@: /*
            foreach (cColumnInfo column in columns) 
            {
                var item = lv_columns.Items.Add(String.Format("{{{0}}}.{1}", dataSource, column.getName()));
                item.ImageIndex = 0;
                string info = cUtil.setInfoString("", C_INDEX, column.getPosition().ToString());
                info = cUtil.setInfoString(info, C_FIELDTYPE, column.getColumnType().ToString());
                item.Tag = info;
            }
             */ 
        }; //@@@: }

        self.setField = function(field) { //@@@: internal void setField(string field)
            m_field = field; //@@@: m_field = field;
            for(var i_ = 0; i_ < lv_columns.Items.length; i_++) { //@@@: foreach (ListViewItem item in lv_columns.Items)
                if (item.Text === field)  { //@@@: if (item.Text == field)
                    item.Selected = true; //@@@: item.Selected = true;
                    item.Focused = true; //@@@: item.Focused = true;
                    lv_columns.Select(); //@@@: lv_columns.Select();
                    break; //@@@: break;
                } //@@@: }
            } //@@@: }
        }; //@@@: }

        self.getOk = function() { //@@@: internal bool getOk()
            return m_ok; //@@@: return m_ok;
        }; //@@@: }

        self.getField = function() { //@@@: internal string getField()
            return m_field; //@@@: return m_field;
        }; //@@@: }

        self.getFieldType = function() { //@@@: internal int getFieldType()
            return m_fieldType; //@@@: return m_fieldType;
        }; //@@@: }

        self.getIndex = function() { //@@@: internal int getIndex()
            return m_fieldIndex; //@@@: return m_fieldIndex;
        }; //@@@: }

        const lv_columns_Click = function(sender, e) { //@@@: private void lv_columns_Click(object sender, EventArgs e)
            if (lv_columns.SelectedItems.Count > 0) { //@@@: if (lv_columns.SelectedItems.Count > 0)
                let item = lv_columns.SelectedItems[0]; //@@@: ListViewItem item = lv_columns.SelectedItems[0];
                m_field = item.Text; //@@@: m_field = item.Text;
                let info = item.Tag.ToString(); //@@@: var info = item.Tag.ToString();
                m_fieldType = cUtil.valAsInt(cUtil.getInfoString(info, C_FIELDTYPE, "-1")); //@@@: m_fieldType = cUtil.valAsInt(cUtil.getInfoString(info, C_FIELDTYPE, "-1"));
                m_fieldIndex = cUtil.valAsInt(cUtil.getInfoString(info, C_INDEX, "-1")); //@@@: m_fieldIndex = cUtil.valAsInt(cUtil.getInfoString(info, C_INDEX, "-1"));
            } //@@@: }
        }; //@@@: }

        const fColumns_Load = function(sender, e) { //@@@: private void fColumns_Load(object sender, EventArgs e)
            cWindow.centerForm(this); //@@@: cWindow.centerForm(this);
        }; //@@@: }
        return self;

    } //@@@: }
}(globalObject)); //@@@: }
