

namespace CSDataBase
{
    export class fCancelQuery {


    {
        private cancel: boolean = false;
        private timer: Timer = null;
        private minutes: number = 0;
        private seconds: number = 0;

        public constructor() {
            InitializeComponent();

            let assembly: System.Reflection.Assembly = System.Reflection.Assembly.GetExecutingAssembly();
            picIcon.Image = new Bitmap(assembly.GetManifestResourceStream(assembly.GetName().Name + ".Resources.Database.png"));
            this.timer = new Timer();
            this.timer.Tick += new EventHandler(timer_tick);
            this.timer.Interval = 1000;
            this.timer.Start();
        }

UNKNOWN >>         public string descript 
        {
UNKNOWN >>             set {
                lbTask.Text = value;
            }
        }

UNKNOWN >>         public Boolean cancel 
        {
UNKNOWN >>             get {
                return this.cancel;
            }
        }

        private cmdCancel_Click(sender: object, e: EventArgs) {
            this.cancel = true;
            Hide();
        }

        private timer_tick(sender: object, e: EventArgs) {
            lbTime.Text = this.minutes.ToString("00") + ":" + this.seconds.ToString("00");
            this.seconds++;
            this.minutes = this.minutes + this.seconds / 60;
            this.seconds = this.seconds % 60;
        }

        private fCancelQuery_Load(sender: object, e: EventArgs) {
            cWindow.centerForm(this);
        }


    }    }
}
