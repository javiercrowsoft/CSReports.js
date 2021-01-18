


namespace CSKernelClient
{


    export class cConstants {


    {


    }    }





    public enum eTypesUNKNOWN >>     public enum eTypes
    {
        eInteger = 2,
        eDouble = 5,
        eCurrency = 6,
        eText = 200,
        eId = -1,
        eCuit = -100,
        eBoolean = -200,
        eSingle = -300,
        eVariant = -400,
        eLong = -500,
        eDate = -600,
        eDateOrNull = -700


    }    }





    public enum eFileModeUNKNOWN >>     public enum eFileMode
    {
        eRead = 1,
        eWrite,
        eAppend,
        eBinaryRead,
UNKNOWN >>         eBinaryWrite


    }    }





    public enum eFileAccessUNKNOWN >>     public enum eFileAccess
    {
        eShared = 1,
        eLockRead,
        eLockWrite,
UNKNOWN >>         eLockReadWrite


    }    }





    public enum eErrorTypeUNKNOWN >>     public enum eErrorType
    {
        eErrorAdo = 1,
        eErrorVba = 2


    }    }





    public enum eErrorLevelUNKNOWN >>     public enum eErrorLevel
    {
        eErrorWarning = 1,
        eErrorFatal = 2,
        eErrorInformation = 3


    }    }





    public enum eErroresUNKNOWN >>     public enum eErrores
    {
        vbObjectError = 0,
        eErrorUserInvalido = vbObjectError + 1,
        eErrorSepDecimal = vbObjectError + 2,
        eErrorSepDecimalConfig = vbObjectError + 3,
        eErrorFieldnTypeInvalido = vbObjectError + 4,
        eErrorVal = vbObjectError + 5,
        eErrorSetInfoString = vbObjectError + 6,
        eErrorABMLoadControl = vbObjectError + 7,
        eErrorUsoPropIdEnPermission = vbObjectError + 8,
        eErrorUsoSubClearEnPermissions = vbObjectError + 9,
        eErrorUsoSubRemoveEnPermissions = vbObjectError + 10,
        eErrorUsoPropIdEnRol = vbObjectError + 11,
        eErrorUsoSubClearEnUsuarioRol = vbObjectError + 12,
        eErrorUsoSubRemoveEnUsuarioRol = vbObjectError + 13,
        eErrorABMLoadControlSubTypeNotDefined = vbObjectError + 14,
        eErrorInvalidPropertyValue = vbObjectError + 15


    }    }





    public enum eFieldTypeUNKNOWN >>     public enum eFieldType
    {
        eFieldBoolean = eTypes.eBoolean,
        eFieldNumeric = eTypes.eDouble,
        eFieldChar = eTypes.eText,
        eFieldDate = eTypes.eDate


    }    }





    public enum CSMSGICONSUNKNOWN >>     public enum CSMSGICONS
    {
        Exclamation,
        Information,
UNKNOWN >>         Error


    }    }



}
