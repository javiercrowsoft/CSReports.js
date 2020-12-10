(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {};

    globalObject.CSReportEditor.createFSimpleConnect = function() {

        // @ts-ignore
        let self: CSReportEditor.IfSimpleConnect = {};
        const fSimpleConnect = function() {
            InitializeComponent();
        };

		self.setServer = function(str) {
			throw new NotImplementedException ();
		};

		self.setDataBase = function(str) {
			throw new NotImplementedException ();
		};

		self.setUser = function(str) {
			throw new NotImplementedException ();
		};

		self.setPassword = function(str) {
			throw new NotImplementedException ();
		};

		self.getUser = function() {
			throw new NotImplementedException ();
		};

		self.setConnectTypeToNT = function() {
			throw new NotImplementedException ();
		};

		self.setConnectTypeToSQL = function() {
			throw new NotImplementedException ();
		};

		self.getOk = function() {
			throw new NotImplementedException ();
		};

		self.getStrConnect = function() {
			throw new NotImplementedException ();
		};
        return self;

    }    }
}(globalObject));


namespace CSReportEditor {

  export interface IfSimpleConnect {

    setServer: (string) => void;
    setDataBase: (string) => void;
    setUser: (string) => void;
    setPassword: (string) => void;
    getUser: () => string;
    setConnectTypeToNT: () => void;
    setConnectTypeToSQL: () => void;
    getOk: () => bool;
    getStrConnect: () => string;
  }
}
