(function(globalObject) {

    globalObject.CSMaskEdit = globalObject.CSMaskEdit || {}; //@@@: namespace CSMaskEdit
 //@@@: {
    globalObject.CSMaskEdit.createCMaskEdit = function() {

        const self = {}; //@@@: public partial class cMaskEdit : UserControl
        const cMaskEdit = function() { //@@@: public cMaskEdit()
            InitializeComponent(); //@@@: InitializeComponent();
        }; //@@@: }

        const cMaskEdit_SizeChanged = function(sender, e) { //@@@: private void cMaskEdit_SizeChanged(object sender, EventArgs e)
            try { //@@@: try
                cmdButton.Left = this.ClientSize.Width - cmdButton.Width; //@@@: cmdButton.Left = this.ClientSize.Width - cmdButton.Width;
                cmdButton.Height = this.ClientSize.Height; //@@@: cmdButton.Height = this.ClientSize.Height;
                txText.Width = this.ClientSize.Width - cmdButton.Width; //@@@: txText.Width = this.ClientSize.Width - cmdButton.Width;
                txText.Height = this.ClientSize.Height; //@@@: txText.Height = this.ClientSize.Height;
            } //@@@: }
            catch(ex) { //@@@: catch
            { } //@@@: { }
        }; //@@@: }

        return self;

    } //@@@: }
}(globalObject)); //@@@: }
