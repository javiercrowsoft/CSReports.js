

namespace CSReportEditor
{
    export class ReportEditorException {


    {
        public errorCode: csRptEditorErrors = null;{ get; set; };
        export class className {



        public constructor() {

        public constructor(code: csRptEditorErrors, module: string, message: string) {
            : base(message)
        {
            errorCode = code;
            export class module; {


        }

        // A constructor is needed for serialization when an
        // exception propagates from a remoting server to the client. 
        public constructor(info: SerializationInfo, context: StreamingContext) {

        public ToString() {
            return base.toString() + "\n\nCode:" + errorCode.toString();
        }


    }    }
}
