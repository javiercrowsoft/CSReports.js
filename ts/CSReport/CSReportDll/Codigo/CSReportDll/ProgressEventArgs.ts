
﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CSReportDll
{

    public class ProgressEventArgs : EventArgs
    {
        private readonly String this.task = "";
        private readonly int this.page = 0;
        private readonly int this.currRecord = 0;
        private readonly int this.recordCount = 0;

        public ProgressEventArgs(String task, int page, int currRecord, int recordCount)
        {
            this.task = task;
            this.page = page;
            this.currRecord = currRecord;
            this.recordCount = recordCount;
        }
        public String task { get { return this.task; } }
        public int page { get { return this.page; } }
        public int currRecord { get { return this.currRecord; } }
        public int recordCount { get { return this.recordCount; } }
        public bool cancel { get; set; }
    }

}
