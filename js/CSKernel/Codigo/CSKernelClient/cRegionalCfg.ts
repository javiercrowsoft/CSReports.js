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



    globalObject.CSKernelClient = globalObject.CSKernelClient || {};



    globalObject.CSKernelClient.createCRegionalCfg = function() {

        const self = {};

        let string m_decimalPoint = "";
        const c_error_1 = "No se pudo determinar cual es el separador decimal. Confirme en el 'panel de control/configuración regional' que los valores de la ficha número coincidan con los valores de la ficha moneda en los campos 'simbolo decimal' y 'simbolo de separación de miles'.";
        const c_error_2 = "Se debe invocar el metodo init de la clase cReginalCfg de la dll CSKernelClient, antes de utilizar cualquier metodo que invoque a la propiedad decimalPoint.";

        self.init = function() {
            double number; {

            double.TryParse("1.000", number); {
            if (number === 1) {
                m_decimalPoint = ".";
            }
            else {

                double.TryParse("1,000", number); {
                if (number === 1) {
                    m_decimalPoint = ",";
                }
            }
            if (m_decimalPoint === "") {
                throw new Exception(c_error_1);
            }
        };

UNKNOWN >>         public static string decimalPoint
        {
UNKNOWN >>             get
            {
                if (m_decimalPoint === "") {
                    throw new Exception(c_error_2);
                }
                else { return m_decimalPoint; }
            }
        }
        return self;

    }
}(globalObject));
