(function(globalObject) {

    globalObject.CSDataBase = globalObject.CSDataBase || {}; //@@@: namespace CSDataBase
 //@@@: {
    globalObject.CSDataBase.createFCancelQuery = function() {

        const self = {}; //@@@: public partial class fCancelQuery : Form
        let m_cancel = false; //@@@: private bool m_cancel = false;
        let m_timer = null; //@@@: private Timer m_timer;
        let m_minutes = 0; //@@@: private int m_minutes = 0;
        let m_seconds = 0; //@@@: private int m_seconds = 0;

        const fCancelQuery = function() { //@@@: public fCancelQuery()
            InitializeComponent(); //@@@: InitializeComponent();

            let assembly = System.Reflection.Assembly.GetExecutingAssembly(); //@@@: System.Reflection.Assembly assembly = System.Reflection.Assembly.GetExecutingAssembly();
            picIcon.Image = new Bitmap(assembly.GetManifestResourceStream(assembly.GetName().Name + ".Resources.Database.png")); //@@@: picIcon.Image = new Bitmap(assembly.GetManifestResourceStream(assembly.GetName().Name + ".Resources.Database.png"));
            m_timer = new Timer(); //@@@: m_timer = new Timer();
            m_timer.Tick += new EventHandler(timer_tick); //@@@: m_timer.Tick += new EventHandler(timer_tick);
            m_timer.Interval = 1000; //@@@: m_timer.Interval = 1000;
            m_timer.Start(); //@@@: m_timer.Start();
        }; //@@@: }

UNKNOWN >>         public string descript  //@@@: public string descript
        { //@@@: {
UNKNOWN >>             set { //@@@: set {
                lbTask.Text = value; //@@@: lbTask.Text = value;
            } //@@@: }
        } //@@@: }

UNKNOWN >>         public Boolean cancel  //@@@: public Boolean cancel
        { //@@@: {
UNKNOWN >>             get { //@@@: get {
                return m_cancel; //@@@: return m_cancel;
            } //@@@: }
        } //@@@: }

        const cmdCancel_Click = function(sender, e) { //@@@: private void cmdCancel_Click(object sender, EventArgs e)
            m_cancel = true; //@@@: m_cancel = true;
            Hide(); //@@@: Hide();
        }; //@@@: }

        const timer_tick = function(sender, e) { //@@@: private void timer_tick(object sender, EventArgs e)
            lbTime.Text = m_minutes.ToString("00") + ":" + m_seconds.ToString("00"); //@@@: lbTime.Text = m_minutes.ToString("00") + ":" + m_seconds.ToString("00");
            m_seconds++; //@@@: m_seconds++;
            m_minutes = m_minutes + m_seconds / 60; //@@@: m_minutes = m_minutes + m_seconds / 60;
            m_seconds = m_seconds % 60; //@@@: m_seconds = m_seconds % 60;
        }; //@@@: }

        const fCancelQuery_Load = function(sender, e) { //@@@: private void fCancelQuery_Load(object sender, EventArgs e)
            cWindow.centerForm(this); //@@@: cWindow.centerForm(this);
        }; //@@@: }
        return self;

    } //@@@: }
}(globalObject)); //@@@: }
