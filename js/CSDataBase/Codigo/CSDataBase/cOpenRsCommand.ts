(function(globalObject) {
﻿//------------------------------------------------------------------------------
// <auto-generated>
//     Este código fue generado por una herramienta.
//     Versión del motor en tiempo de ejecución:2.0.50727.3603
//
//     Los cambios en este archivo podrían causar un comportamiento incorrecto y se perderán si
//     se vuelve a generar el código.
// </auto-generated>
//------------------------------------------------------------------------------


    globalObject.CSDataBase = globalObject.CSDataBase || {};



    globalObject.CSDataBase.createCOpenRsCommand = function() {

        const self = {};
        const c_module = "cDataBase";

//         private delegate DbDataReader delegateAsyncOpenRsEx(string sqlstmt);

        let m_invoke = null;
        let m_ors = null;
        let m_sqlstmt = "";
        let m_done = false;

UNKNOWN >>         public bool done
        {
UNKNOWN >>             get { return m_done; }
        };

UNKNOWN >>         public bool success
        {
UNKNOWN >>             get { return m_ors !== null; }
        }

UNKNOWN >>         public DbDataReader ors
        {
UNKNOWN >>             get { return m_ors; }
        }

        self.getExecuteCommand = function(db, sqlstmt) {
            m_sqlstmt = sqlstmt;
            m_invoke = new delegateAsyncOpenRsEx(db.asyncOpenRsEx);
        };

        self.execute = function() {
            try {
                m_invoke.BeginInvoke(m_sqlstmt, this.callBack, null);
            }
            catch (ex) {
                cError.mngError(ex, "execute", c_module, "");
            }
        };

        const callBack = function(ar) {
            try {
                m_ors = m_invoke.EndInvoke(ar);
                m_done = true;
            }
            catch (ex) {
                cError.mngError(ex, "callBack", c_module, "");
            }
        };

        const cOpenRsCommand = function() {
        };
        return self;

    }
}(globalObject));