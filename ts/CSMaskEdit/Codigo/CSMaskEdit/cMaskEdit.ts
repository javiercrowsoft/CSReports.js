(function(globalObject) {

    globalObject.CSMaskEdit = globalObject.CSMaskEdit || {};

    globalObject.CSMaskEdit.createCMaskEdit = function() {

        // @ts-ignore
        let self: CSMaskEdit.IcMaskEdit = {};
        const cMaskEdit = function() {
            InitializeComponent();
        };

        const cMaskEdit_SizeChanged = function(sender, e) {
            try {
                cmdButton.Left = this.ClientSize.Width - cmdButton.Width;
                cmdButton.Height = this.ClientSize.Height;
                txText.Width = this.ClientSize.Width - cmdButton.Width;
                txText.Height = this.ClientSize.Height;
            }
            catch(ex) {
            { }
        };

        return self;

    }    }
}(globalObject));


namespace CSMaskEdit {

  export interface IcMaskEdit {

  }
}
