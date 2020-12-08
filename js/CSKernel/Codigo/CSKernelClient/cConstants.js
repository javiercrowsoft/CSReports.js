(function(globalObject) {


    globalObject.CSKernelClient = globalObject.CSKernelClient || {}; //@@@: namespace CSKernelClient
 //@@@: {


    globalObject.CSKernelClient.createCConstants = function() {

        const self = {}; //@@@: public static class cConstants
        return self;

    } //@@@: }

UNKNOWN >>         return self;

    public enum eTypes //@@@: public enum eTypes
    { //@@@: {
        eInteger = 2, //@@@: eInteger = 2,
        eDouble = 5, //@@@: eDouble = 5,
        eCurrency = 6, //@@@: eCurrency = 6,
        eText = 200, //@@@: eText = 200,
        eId = -1, //@@@: eId = -1,
        eCuit = -100, //@@@: eCuit = -100,
        eBoolean = -200, //@@@: eBoolean = -200,
        eSingle = -300, //@@@: eSingle = -300,
        eVariant = -400, //@@@: eVariant = -400,
        eLong = -500, //@@@: eLong = -500,
        eDate = -600, //@@@: eDate = -600,
        eDateOrNull = -700 //@@@: eDateOrNull = -700
        return self;

    } //@@@: }

UNKNOWN >>         return self;

    public enum eFileMode //@@@: public enum eFileMode
    { //@@@: {
        eRead = 1, //@@@: eRead = 1,
        eWrite, //@@@: eWrite,
        eAppend, //@@@: eAppend,
        eBinaryRead, //@@@: eBinaryRead,
UNKNOWN >>         eBinaryWrite //@@@: eBinaryWrite
        return self;

    } //@@@: }

UNKNOWN >>         return self;

    public enum eFileAccess //@@@: public enum eFileAccess
    { //@@@: {
        eShared = 1, //@@@: eShared = 1,
        eLockRead, //@@@: eLockRead,
        eLockWrite, //@@@: eLockWrite,
UNKNOWN >>         eLockReadWrite //@@@: eLockReadWrite
        return self;

    } //@@@: }

UNKNOWN >>         return self;

    public enum eErrorType //@@@: public enum eErrorType
    { //@@@: {
        eErrorAdo = 1, //@@@: eErrorAdo = 1,
        eErrorVba = 2 //@@@: eErrorVba = 2
        return self;

    } //@@@: }

UNKNOWN >>         return self;

    public enum eErrorLevel //@@@: public enum eErrorLevel
    { //@@@: {
        eErrorWarning = 1, //@@@: eErrorWarning = 1,
        eErrorFatal = 2, //@@@: eErrorFatal = 2,
        eErrorInformation = 3 //@@@: eErrorInformation = 3
        return self;

    } //@@@: }

UNKNOWN >>         return self;

    public enum eErrores //@@@: public enum eErrores
    { //@@@: {
        vbObjectError = 0, //@@@: vbObjectError = 0,
        eErrorUserInvalido = vbObjectError + 1, //@@@: eErrorUserInvalido = vbObjectError + 1,
        eErrorSepDecimal = vbObjectError + 2, //@@@: eErrorSepDecimal = vbObjectError + 2,
        eErrorSepDecimalConfig = vbObjectError + 3, //@@@: eErrorSepDecimalConfig = vbObjectError + 3,
        eErrorFieldnTypeInvalido = vbObjectError + 4, //@@@: eErrorFieldnTypeInvalido = vbObjectError + 4,
        eErrorVal = vbObjectError + 5, //@@@: eErrorVal = vbObjectError + 5,
        eErrorSetInfoString = vbObjectError + 6, //@@@: eErrorSetInfoString = vbObjectError + 6,
        eErrorABMLoadControl = vbObjectError + 7, //@@@: eErrorABMLoadControl = vbObjectError + 7,
        eErrorUsoPropIdEnPermission = vbObjectError + 8, //@@@: eErrorUsoPropIdEnPermission = vbObjectError + 8,
        eErrorUsoSubClearEnPermissions = vbObjectError + 9, //@@@: eErrorUsoSubClearEnPermissions = vbObjectError + 9,
        eErrorUsoSubRemoveEnPermissions = vbObjectError + 10, //@@@: eErrorUsoSubRemoveEnPermissions = vbObjectError + 10,
        eErrorUsoPropIdEnRol = vbObjectError + 11, //@@@: eErrorUsoPropIdEnRol = vbObjectError + 11,
        eErrorUsoSubClearEnUsuarioRol = vbObjectError + 12, //@@@: eErrorUsoSubClearEnUsuarioRol = vbObjectError + 12,
        eErrorUsoSubRemoveEnUsuarioRol = vbObjectError + 13, //@@@: eErrorUsoSubRemoveEnUsuarioRol = vbObjectError + 13,
        eErrorABMLoadControlSubTypeNotDefined = vbObjectError + 14, //@@@: eErrorABMLoadControlSubTypeNotDefined = vbObjectError + 14,
        eErrorInvalidPropertyValue = vbObjectError + 15 //@@@: eErrorInvalidPropertyValue = vbObjectError + 15
        return self;

    } //@@@: }

UNKNOWN >>         return self;

    public enum eFieldType //@@@: public enum eFieldType
    { //@@@: {
        eFieldBoolean = eTypes.eBoolean, //@@@: eFieldBoolean = eTypes.eBoolean,
        eFieldNumeric = eTypes.eDouble, //@@@: eFieldNumeric = eTypes.eDouble,
        eFieldChar = eTypes.eText, //@@@: eFieldChar = eTypes.eText,
        eFieldDate = eTypes.eDate //@@@: eFieldDate = eTypes.eDate
        return self;

    } //@@@: }

UNKNOWN >>         return self;

    public enum CSMSGICONS //@@@: public enum CSMSGICONS
    { //@@@: {
        Exclamation, //@@@: Exclamation,
        Information, //@@@: Information,
UNKNOWN >>         Error //@@@: Error
        return self;

    } //@@@: }

}(globalObject)); //@@@: }
