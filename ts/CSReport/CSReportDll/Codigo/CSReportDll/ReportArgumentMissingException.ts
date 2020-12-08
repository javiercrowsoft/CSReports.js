(function(globalObject) {
﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;
using CSReportGlobals;

    globalObject.CSReportDll = globalObject.CSReportDll || {};
{
    class ReportArgumentMissingException : ReportException
    {

        public ReportArgumentMissingException(String className, String message) 
            : base(csRptErrors.CSRPTERRMISSINGPARAM, className, message) { }

        // A constructor is needed for serialization when an
        // exception propagates from a remoting server to the client. 
        protected ReportArgumentMissingException(SerializationInfo info, StreamingContext context) { }
    }
}
