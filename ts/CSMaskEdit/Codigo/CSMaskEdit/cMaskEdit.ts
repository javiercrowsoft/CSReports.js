

namespace CSMaskEdit
{
    export class cMaskEdit {


    {
        public constructor() {
            InitializeComponent();
        }

        private cMaskEdit_SizeChanged(sender: object, e: EventArgs) {
            try {
                cmdButton.Left = this.ClientSize.Width - cmdButton.Width;
                cmdButton.Height = this.ClientSize.Height;
                txText.Width = this.ClientSize.Width - cmdButton.Width;
                txText.Height = this.ClientSize.Height;
            }
            catch(ex) {
            { }
        }



    }    }
}
