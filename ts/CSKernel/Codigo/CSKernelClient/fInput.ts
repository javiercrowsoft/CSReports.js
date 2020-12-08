(function(globalObject) {

    globalObject.CSKernelClient = globalObject.CSKernelClient || {};

    globalObject.CSKernelClient.createFInput = function() {

        const self = {};
        let m_ok: boolean= false;

        const fInput = function() {
            InitializeComponent();
        };

        self.getOk = function() {
            return m_ok;
        };

        self.setTitle = function(title) {
            lb_title.Text = title;
        };

        self.setDescrip = function(descrip) {
            lb_descrip.Text = descrip;
        };

        self.setText = function(text) {
            tx_server.Text = text;
        };

        self.getText = function() {
            return tx_server.Text;
        };

        const cmd_apply_Click = function(sender, e) {
            m_ok = true;
            this.Close();
        };

        const cmd_cancel_Click = function(sender, e) {
            m_ok = false;
            this.Close();
        };

        const fInput_Load = function(sender, e) {
            cWindow.centerForm(this);
        };

        return self;

    }
}(globalObject));
