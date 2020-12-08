(function(globalObject) {

    globalObject.CSMaskEdit = globalObject.CSMaskEdit || {};

    globalObject.CSMaskEdit.createCMaskEdit = function() {

        const self = {};
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

    }
}(globalObject));
