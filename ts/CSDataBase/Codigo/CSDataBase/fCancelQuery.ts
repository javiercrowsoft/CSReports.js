(function(globalObject) {

    globalObject.CSDataBase = globalObject.CSDataBase || {};

    globalObject.CSDataBase.createFCancelQuery = function() {

        const self = {};
        let m_cancel: boolean= false;
        let m_timer: Timer = null;
        let m_minutes: number= 0;
        let m_seconds: number= 0;

        const fCancelQuery = function() {
            InitializeComponent();

            let assembly: System.Reflection.Assembly= System.Reflection.Assembly.GetExecutingAssembly();
            picIcon.Image =  globalObject.CSReportDll.createBitmap(assembly.GetManifestResourceStream(assembly.GetName().Name + ".Resources.Database.png"));
            m_timer =  globalObject.CSReportDll.createTimer();
            m_timer.Tick +=  globalObject.CSReportDll.createEventHandler(timer_tick);
            m_timer.Interval = 1000;
            m_timer.Start();
        };

UNKNOWN >>         public string descript 
        {
UNKNOWN >>             set {
                lbTask.Text = value;
            }
        }

UNKNOWN >>         public Boolean cancel 
        {
UNKNOWN >>             get {
                return m_cancel;
            }
        }

        const cmdCancel_Click = function(sender, e) {
            m_cancel = true;
            Hide();
        };

        const timer_tick = function(sender, e) {
            lbTime.Text = m_minutes.ToString("00") + ":" + m_seconds.ToString("00");
            m_seconds++;
            m_minutes = m_minutes + m_seconds / 60;
            m_seconds = m_seconds % 60;
        };

        const fCancelQuery_Load = function(sender, e) {
            cWindow.centerForm(this);
        };
        return self;

    }
}(globalObject));
