(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {}; //@@@: namespace CSReportEditor
 //@@@: {
    globalObject.CSReportEditor.createFMain = function() {

        const self = {}; //@@@: public partial class fMain : Form
UNKNOWN >>         static fMain instance; //@@@: static fMain instance;

        const C_MODULE = "fMain"; //@@@: private const String C_MODULE = "fMain";

        const fMain = function() { //@@@: public fMain()
            InitializeComponent(); //@@@: InitializeComponent();

            // it is the first thing we need to do
            //
            CSKernelClient.cUtil.setSepDecimal(); //@@@: CSKernelClient.cUtil.setSepDecimal();

            let editor = new cEditor(this, pnEditor, pnRule, pnReport, tbpEditor); //@@@: cEditor editor = new cEditor(this, pnEditor, pnRule, pnReport, tbpEditor);
        }; //@@@: }

        self.getReportCopySource = function() { //@@@: public cEditor getReportCopySource()
            return null; //@@@: return null;
        }; //@@@: }

        const createEditor = function() { //@@@: private cEditor createEditor()
            let tab = new TabPage(); //@@@: TabPage tab = new TabPage();
            let pnEditor = new Panel(); //@@@: Panel pnEditor = new Panel();
            let pnRule = new PictureBox(); //@@@: PictureBox pnRule = new PictureBox();
            let pnReport = new PictureBox(); //@@@: PictureBox pnReport = new PictureBox();

            pnEditor.Controls.Add(pnRule); //@@@: pnEditor.Controls.Add(pnRule);
            pnEditor.Controls.Add(pnReport); //@@@: pnEditor.Controls.Add(pnReport);
            tab.Controls.Add(pnEditor); //@@@: tab.Controls.Add(pnEditor);
            pnEditor.Dock = DockStyle.Fill; //@@@: pnEditor.Dock = DockStyle.Fill;
            tabReports.TabPages.Add(tab); //@@@: tabReports.TabPages.Add(tab);
            tab.Text = "New Report"; //@@@: tab.Text = "New Report";

            return new cEditor(this, pnEditor, pnRule, pnReport, tab); //@@@: return new cEditor(this, pnEditor, pnRule, pnReport, tab);
        }; //@@@: }

        const mnuNewReport_Click = function(sender, e) { //@@@: private void mnuNewReport_Click(object sender, EventArgs e)
            createEditor(); //@@@: createEditor();
        }; //@@@: }

        const tsbNew_Click = function(sender, e) { //@@@: private void tsbNew_Click(object sender, EventArgs e)
            mnuNewReport_Click(sender, e); //@@@: mnuNewReport_Click(sender, e);
        }; //@@@: }

        self.setEditAlignTextState = function(status) { //@@@: public void setEditAlignTextState(bool status)
            let buttons = this.tbMain.Items; //@@@: var buttons = this.tbMain.Items;

            buttons[cGlobals.c_BTN_ALIGN_CENTER].Enabled = status; //@@@: buttons[cGlobals.c_BTN_ALIGN_CENTER].Enabled = status;
            buttons[cGlobals.c_BTN_ALIGN_LEFT].Enabled = status; //@@@: buttons[cGlobals.c_BTN_ALIGN_LEFT].Enabled = status;
            buttons[cGlobals.c_BTN_ALIGN_RIGHT].Enabled = status; //@@@: buttons[cGlobals.c_BTN_ALIGN_RIGHT].Enabled = status;
            buttons[cGlobals.c_BTN_FONT_BOLD].Enabled = status; //@@@: buttons[cGlobals.c_BTN_FONT_BOLD].Enabled = status;
        }; //@@@: }

        self.setEditAlignCtlState = function(status) { //@@@: public void setEditAlignCtlState(bool status)
            let buttons = this.tbMain.Items; //@@@: var buttons = this.tbMain.Items;

            buttons[cGlobals.c_BTN_CTL_ALIGN_BOTTOM].Enabled = status; //@@@: buttons[cGlobals.c_BTN_CTL_ALIGN_BOTTOM].Enabled = status;
            buttons[cGlobals.c_BTN_CTL_ALIGN_TOP].Enabled = status; //@@@: buttons[cGlobals.c_BTN_CTL_ALIGN_TOP].Enabled = status;

            buttons[cGlobals.c_BTN_CTL_ALIGN_VERTICAL].Enabled = status; //@@@: buttons[cGlobals.c_BTN_CTL_ALIGN_VERTICAL].Enabled = status;
            buttons[cGlobals.c_BTN_CTL_ALIGN_HORIZONTAL].Enabled = status; //@@@: buttons[cGlobals.c_BTN_CTL_ALIGN_HORIZONTAL].Enabled = status;
            buttons[cGlobals.c_BTN_CTL_ALIGN_LEFT].Enabled = status; //@@@: buttons[cGlobals.c_BTN_CTL_ALIGN_LEFT].Enabled = status;
            buttons[cGlobals.c_BTN_CTL_ALIGN_RIGHT].Enabled = status; //@@@: buttons[cGlobals.c_BTN_CTL_ALIGN_RIGHT].Enabled = status;

            buttons[cGlobals.c_BTN_CTL_HEIGHT].Enabled = status; //@@@: buttons[cGlobals.c_BTN_CTL_HEIGHT].Enabled = status;
            buttons[cGlobals.c_BTN_CTL_WIDTH].Enabled = status; //@@@: buttons[cGlobals.c_BTN_CTL_WIDTH].Enabled = status;
        }; //@@@: }

        self.setMenuAux = function(enabled) { //@@@: public void setMenuAux(bool enabled)
            this.mnuEditAddControl.Enabled = enabled; //@@@: this.mnuEditAddControl.Enabled = enabled;
            this.mnuEditAddHeader.Enabled = enabled; //@@@: this.mnuEditAddHeader.Enabled = enabled;
            this.mnuEditAddLabel.Enabled = enabled; //@@@: this.mnuEditAddLabel.Enabled = enabled;
            this.mnuEditAddGroup.Enabled = enabled; //@@@: this.mnuEditAddGroup.Enabled = enabled;
            this.mnuEditAddFooter.Enabled = enabled; //@@@: this.mnuEditAddFooter.Enabled = enabled;
            this.mnuEditAddLine.Enabled = enabled; //@@@: this.mnuEditAddLine.Enabled = enabled;
            this.mnuEditAddSec.Enabled = enabled; //@@@: this.mnuEditAddSec.Enabled = enabled;
            this.mnuEditMove.Enabled = enabled; //@@@: this.mnuEditMove.Enabled = enabled;
            this.mnuDataBaseEditEx.Enabled = enabled; //@@@: this.mnuDataBaseEditEx.Enabled = enabled;
            this.mnuPreviewReport.Enabled = enabled; //@@@: this.mnuPreviewReport.Enabled = enabled;
            this.mnuPrintReport.Enabled = enabled; //@@@: this.mnuPrintReport.Enabled = enabled;
            this.mnuSaveReport.Enabled = enabled; //@@@: this.mnuSaveReport.Enabled = enabled;
            this.mnuReportSaveAs.Enabled = enabled; //@@@: this.mnuReportSaveAs.Enabled = enabled;
            this.mnuDataBaseSetDisconnected.Enabled = enabled; //@@@: this.mnuDataBaseSetDisconnected.Enabled = enabled;
            this.mnuEditSearch.Enabled = enabled; //@@@: this.mnuEditSearch.Enabled = enabled;
            this.mnuDataBaseEditStrConnect.Enabled = enabled; //@@@: this.mnuDataBaseEditStrConnect.Enabled = enabled;
            this.mnuDataBaseSetToMainConnect.Enabled = enabled; //@@@: this.mnuDataBaseSetToMainConnect.Enabled = enabled;
            this.mnuDataBaseEditEx.Enabled = enabled; //@@@: this.mnuDataBaseEditEx.Enabled = enabled;
            this.mnuDataBaseConnectsAuxCfg.Enabled = enabled; //@@@: this.mnuDataBaseConnectsAuxCfg.Enabled = enabled;
            this.mnuViewGridMain.Enabled = enabled; //@@@: this.mnuViewGridMain.Enabled = enabled;
            this.mnuViewToolbar.Enabled = enabled; //@@@: this.mnuViewToolbar.Enabled = enabled;
            this.mnuViewControls.Enabled = enabled; //@@@: this.mnuViewControls.Enabled = enabled;
            this.mnuViewTreeViewCtrls.Enabled = enabled; //@@@: this.mnuViewTreeViewCtrls.Enabled = enabled;

            let buttons = this.tbMain.Items; //@@@: var buttons = this.tbMain.Items;
            buttons[cGlobals.c_BTN_PRINT].Enabled = enabled; //@@@: buttons[cGlobals.c_BTN_PRINT].Enabled = enabled;
            buttons[cGlobals.c_BTN_PROPERTIES].Enabled = enabled; //@@@: buttons[cGlobals.c_BTN_PROPERTIES].Enabled = enabled;
            buttons[cGlobals.c_BTN_DB].Enabled = enabled; //@@@: buttons[cGlobals.c_BTN_DB].Enabled = enabled;
            buttons[cGlobals.c_BTN_SAVE].Enabled = enabled; //@@@: buttons[cGlobals.c_BTN_SAVE].Enabled = enabled;
            buttons[cGlobals.c_BTN_TOOL].Enabled = enabled; //@@@: buttons[cGlobals.c_BTN_TOOL].Enabled = enabled;
            buttons[cGlobals.c_BTN_PREV].Enabled = enabled; //@@@: buttons[cGlobals.c_BTN_PREV].Enabled = enabled;
            buttons[cGlobals.c_BTN_SEARCH].Enabled = enabled; //@@@: buttons[cGlobals.c_BTN_SEARCH].Enabled = enabled;
        }; //@@@: }

        self.addToRecentList = function(fileName) { //@@@: public void addToRecentList(String fileName)
            let i = 0; //@@@: int i = 0;
            let j = 0; //@@@: int j = 0;
            let found = false; //@@@: bool found = false;
            let menuItems = this.mnuFileRecentList.DropDownItems; //@@@: var menuItems = this.mnuFileRecentList.DropDownItems;

            for (i = 0; i < menuItems.Count; i++) { //@@@: for (i = 0; i < menuItems.Count; i++)
                if (fileName === menuItems[i].Text) { //@@@: if (fileName == menuItems[i].Text)
                    j = i; //@@@: j = i;
                    found = true; //@@@: found = true;
                    break; //@@@: break;
                } //@@@: }
            } //@@@: }

            if (menuItems.Count < cGlobals.C_TOTINRECENTLIST && found === false) { //@@@: if (menuItems.Count < cGlobals.C_TOTINRECENTLIST && found == false)
                let menu = this.mnuFileRecentList.DropDownItems.Add(""); //@@@: var menu = this.mnuFileRecentList.DropDownItems.Add("");
                menu.Visible = true; //@@@: menu.Visible = true;
            } //@@@: }

            if (!found) { j = menuItems.Count - 1; } //@@@: if (!found) { j = menuItems.Count - 1; }

            for (i = j; i > 0; i--) { //@@@: for (i = j; i > 0; i--)
                menuItems[i].Text = menuItems[i - 1].Text; //@@@: menuItems[i].Text = menuItems[i - 1].Text;
            } //@@@: }

            menuItems[0].Text = fileName; //@@@: menuItems[0].Text = fileName;
        }; //@@@: }

        self.loadRecentList = function(recentList) { //@@@: public void loadRecentList(List<String> recentList)
            let i = 0; //@@@: int i = 0;
            let recent = ""; //@@@: String recent = "";

            for (i = 0; i < Math.Min(cGlobals.C_TOTINRECENTLIST, recentList.Count); i++) { //@@@: for (i = 0; i < Math.Min(cGlobals.C_TOTINRECENTLIST, recentList.Count); i++)
                recent = recentList[i]; //@@@: recent = recentList[i];
                let menu = this.mnuFileRecentList.DropDownItems.Add(recent); //@@@: var menu = this.mnuFileRecentList.DropDownItems.Add(recent);
                menu.Visible = true; //@@@: menu.Visible = true;
            } //@@@: }

            if (this.mnuFileRecentList.DropDownItems.Count > 1) { //@@@: if (this.mnuFileRecentList.DropDownItems.Count > 1)
                this.mnuFileRecentList.Visible = true; //@@@: this.mnuFileRecentList.Visible = true;
            } //@@@: }
        }; //@@@: }

        self.saveRecentList = function() { //@@@: public void saveRecentList()
            let i = 0; //@@@: int i = 0;

            for (i = 0; i < this.mnuFileRecentList.DropDownItems.Count; i++) { //@@@: for (i = 0; i < this.mnuFileRecentList.DropDownItems.Count; i++)
                // TODO: implement
            } //@@@: }
        }; //@@@: }

        self.setStatus = function(status) { //@@@: public void setStatus(String status)
            // TODO: implement
        }; //@@@: }

        self.setBarText = function(text) { //@@@: public void setBarText(String text)
            // TODO: implement
        }; //@@@: }

        self.setDisconnectedReport = function(isDisconnectedReport) { //@@@: public void setDisconnectedReport(bool isDisconnectedReport)
            // TODO: implement
        }; //@@@: }

		self. = function(msg) { //@@@: public void setsbPnlCtrl (string msg)
			throw new NotImplementedException (); //@@@: throw new NotImplementedException ();
		}; //@@@: }

        self.setReportCopySource = function(cEditor) { //@@@: internal void setReportCopySource(cEditor cEditor)
            throw new NotImplementedException(); //@@@: throw new NotImplementedException();
        }; //@@@: }

        self.getPaperSize = function() { //@@@: internal CSReportGlobals.csReportPaperType getPaperSize()
            throw new NotImplementedException(); //@@@: throw new NotImplementedException();
        }; //@@@: }

        self.getOrientation = function() { //@@@: internal int getOrientation()
            throw new NotImplementedException(); //@@@: throw new NotImplementedException();
        }; //@@@: }

        const mnuOpenReport_Click = function(sender, e) { //@@@: private void mnuOpenReport_Click(object sender, EventArgs e)
            try { //@@@: try {

                let editor = createEditor(); //@@@: cEditor editor = createEditor();

                editor.init(); //@@@: editor.init();
                /* //@@@: /*
                if(editor.openDocument()) {
                    addToRecentList(editor.getFileName());
                    saveRecentList();
                }*/

            } catch (Exception ex) { //@@@: } catch (Exception ex) {
                cError.mngError(ex, "mnuOpenReport_Click", C_MODULE, ""); //@@@: cError.mngError(ex, "mnuOpenReport_Click", C_MODULE, "");
            } //@@@: }
        }; //@@@: }

        //------------------------------------------------------------------------------------------------------------------

        // expose controls

        //------------------------------------------------------------------------------------------------------------------

UNKNOWN >>         public OpenFileDialog openFileDialog  //@@@: public OpenFileDialog openFileDialog
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return openFileDlg; //@@@: return openFileDlg;
            } //@@@: }
        } //@@@: }

UNKNOWN >>         public SaveFileDialog saveFileDialog //@@@: public SaveFileDialog saveFileDialog
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return saveFielDlg; //@@@: return saveFielDlg;
            }             //@@@: }
        } //@@@: }
        return self;

    } //@@@: }
}(globalObject)); //@@@: }
