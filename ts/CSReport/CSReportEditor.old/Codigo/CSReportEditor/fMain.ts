(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {};

    globalObject.CSReportEditor.createFMain = function() {

        const self = {};
UNKNOWN >>         static fMain instance;

        const C_MODULE: string= "fMain";

        const fMain = function() {
            InitializeComponent();

            // it is the first thing we need to do
            //
            CSKernelClient.cUtil.setSepDecimal();

            let editor: cEditor= new cEditor(this, pnEditor, pnRule, pnReport, tbpEditor);
        };

        self.getReportCopySource = function() {
            return null;
        };

        const createEditor = function() {
            let tab: TabPage= new TabPage();
            let pnEditor: Panel= new Panel();
            let pnRule: PictureBox= new PictureBox();
            let pnReport: PictureBox= new PictureBox();

            pnEditor.Controls.Add(pnRule);
            pnEditor.Controls.Add(pnReport);
            tab.Controls.Add(pnEditor);
            pnEditor.Dock = DockStyle.Fill;
            tabReports.TabPages.Add(tab);
            tab.Text = "New Report";

            return new cEditor(this, pnEditor, pnRule, pnReport, tab);
        };

        const mnuNewReport_Click = function(sender, e) {
            createEditor();
        };

        const tsbNew_Click = function(sender, e) {
            mnuNewReport_Click(sender, e);
        };

        self.setEditAlignTextState = function(status) {
            let buttons: var= this.tbMain.Items;

            buttons[cGlobals.c_BTN_ALIGN_CENTER].Enabled = status;
            buttons[cGlobals.c_BTN_ALIGN_LEFT].Enabled = status;
            buttons[cGlobals.c_BTN_ALIGN_RIGHT].Enabled = status;
            buttons[cGlobals.c_BTN_FONT_BOLD].Enabled = status;
        };

        self.setEditAlignCtlState = function(status) {
            let buttons: var= this.tbMain.Items;

            buttons[cGlobals.c_BTN_CTL_ALIGN_BOTTOM].Enabled = status;
            buttons[cGlobals.c_BTN_CTL_ALIGN_TOP].Enabled = status;

            buttons[cGlobals.c_BTN_CTL_ALIGN_VERTICAL].Enabled = status;
            buttons[cGlobals.c_BTN_CTL_ALIGN_HORIZONTAL].Enabled = status;
            buttons[cGlobals.c_BTN_CTL_ALIGN_LEFT].Enabled = status;
            buttons[cGlobals.c_BTN_CTL_ALIGN_RIGHT].Enabled = status;

            buttons[cGlobals.c_BTN_CTL_HEIGHT].Enabled = status;
            buttons[cGlobals.c_BTN_CTL_WIDTH].Enabled = status;
        };

        self.setMenuAux = function(enabled) {
            this.mnuEditAddControl.Enabled = enabled;
            this.mnuEditAddHeader.Enabled = enabled;
            this.mnuEditAddLabel.Enabled = enabled;
            this.mnuEditAddGroup.Enabled = enabled;
            this.mnuEditAddFooter.Enabled = enabled;
            this.mnuEditAddLine.Enabled = enabled;
            this.mnuEditAddSec.Enabled = enabled;
            this.mnuEditMove.Enabled = enabled;
            this.mnuDataBaseEditEx.Enabled = enabled;
            this.mnuPreviewReport.Enabled = enabled;
            this.mnuPrintReport.Enabled = enabled;
            this.mnuSaveReport.Enabled = enabled;
            this.mnuReportSaveAs.Enabled = enabled;
            this.mnuDataBaseSetDisconnected.Enabled = enabled;
            this.mnuEditSearch.Enabled = enabled;
            this.mnuDataBaseEditStrConnect.Enabled = enabled;
            this.mnuDataBaseSetToMainConnect.Enabled = enabled;
            this.mnuDataBaseEditEx.Enabled = enabled;
            this.mnuDataBaseConnectsAuxCfg.Enabled = enabled;
            this.mnuViewGridMain.Enabled = enabled;
            this.mnuViewToolbar.Enabled = enabled;
            this.mnuViewControls.Enabled = enabled;
            this.mnuViewTreeViewCtrls.Enabled = enabled;

            let buttons: var= this.tbMain.Items;
            buttons[cGlobals.c_BTN_PRINT].Enabled = enabled;
            buttons[cGlobals.c_BTN_PROPERTIES].Enabled = enabled;
            buttons[cGlobals.c_BTN_DB].Enabled = enabled;
            buttons[cGlobals.c_BTN_SAVE].Enabled = enabled;
            buttons[cGlobals.c_BTN_TOOL].Enabled = enabled;
            buttons[cGlobals.c_BTN_PREV].Enabled = enabled;
            buttons[cGlobals.c_BTN_SEARCH].Enabled = enabled;
        };

        self.addToRecentList = function(fileName) {
            let i: number= 0;
            let j: number= 0;
            let found: boolean= false;
            let menuItems: var= this.mnuFileRecentList.DropDownItems;

            for (i = 0; i < menuItems.Count; i++) {
                if (fileName === menuItems[i].Text) {
                    j = i;
                    found = true;
                    break;
                }
            }

            if (menuItems.Count < cGlobals.C_TOTINRECENTLIST && found === false) {
                let menu: var= this.mnuFileRecentList.DropDownItems.Add("");
                menu.Visible = true;
            }

            if (!found) { j = menuItems.Count - 1; }

            for (i = j; i > 0; i--) {
                menuItems[i].Text = menuItems[i - 1].Text;
            }

            menuItems[0].Text = fileName;
        };

        self.loadRecentList = function(recentList) {
            let i: number= 0;
            let recent: string= "";

            for (i = 0; i < Math.Min(cGlobals.C_TOTINRECENTLIST, recentList.Count); i++) {
                recent = recentList[i];
                let menu: var= this.mnuFileRecentList.DropDownItems.Add(recent);
                menu.Visible = true;
            }

            if (this.mnuFileRecentList.DropDownItems.Count > 1) {
                this.mnuFileRecentList.Visible = true;
            }
        };

        self.saveRecentList = function() {
            let i: number= 0;

            for (i = 0; i < this.mnuFileRecentList.DropDownItems.Count; i++) {
                // TODO: implement
            }
        };

        self.setStatus = function(status) {
            // TODO: implement
        };

        self.setBarText = function(text) {
            // TODO: implement
        };

        self.setDisconnectedReport = function(isDisconnectedReport) {
            // TODO: implement
        };

		self. = function(msg) {
			throw new NotImplementedException ();
		};

        self.setReportCopySource = function(cEditor) {
            throw new NotImplementedException();
        };

        self.getPaperSize = function() {
            throw new NotImplementedException();
        };

        self.getOrientation = function() {
            throw new NotImplementedException();
        };

        const mnuOpenReport_Click = function(sender, e) {
            try {

                let editor: cEditor= createEditor();

                editor.init();
                /*
                if(editor.openDocument()) {
                    addToRecentList(editor.getFileName());
                    saveRecentList();
                }*/

            } catch (Exception ex) {
                cError.mngError(ex, "mnuOpenReport_Click", C_MODULE, "");
            }
        };

        //------------------------------------------------------------------------------------------------------------------

        // expose controls

        //------------------------------------------------------------------------------------------------------------------

UNKNOWN >>         public OpenFileDialog openFileDialog 
        {
UNKNOWN >>             get
            {
                return openFileDlg;
            }
        }

UNKNOWN >>         public SaveFileDialog saveFileDialog
        {
UNKNOWN >>             get
            {
                return saveFielDlg;
            }            
        }
        return self;

    }
}(globalObject));
