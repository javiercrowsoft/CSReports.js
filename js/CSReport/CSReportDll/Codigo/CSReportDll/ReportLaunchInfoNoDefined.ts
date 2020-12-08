(function(globalObject) {
﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;
using CSReportGlobals;

    globalObject.CSReportDll = globalObject.CSReportDll || {};
{
    class ReportLaunchInfoNoDefined : ReportException
    {

        public ReportLaunchInfoNoDefined(String className, String message) 
            : base(csRptErrors.LAUNCH_INFO_UNDEFINED, className, message) { }

        // A constructor is needed for serialization when an
        // exception propagates from a remoting server to the client. 
        protected ReportLaunchInfoNoDefined(SerializationInfo info, StreamingContext context) { }
    }
}
