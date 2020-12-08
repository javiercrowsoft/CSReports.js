(function(globalObject) {
﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Windows.Forms;

    globalObject.CSReportDll = globalObject.CSReportDll || {};
{

    public class FindAccessFileEventArgs : EventArgs
    {
        public FindAccessFileEventArgs(String file)
        {
            this.file = file;
        }
        public String file { get; set; }
        public CommonDialog commonDialog { get; set; }
        public bool cancel { get; set; }
    }

}
