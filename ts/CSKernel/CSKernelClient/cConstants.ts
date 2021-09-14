namespace CSKernelClient {

    export enum eTypes {
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
    }

    export enum eFileMode {
        eRead = 1,
        eWrite,
        eAppend,
        eBinaryRead,
        eBinaryWrite
    }

    export enum eFileAccess {
        eShared = 1,
        eLockRead,
        eLockWrite,
        eLockReadWrite
    }

    export enum eErrorType {
        eErrorAdo = 1,
        eErrorVba = 2
    }

    export enum eErrorLevel {
        eErrorWarning = 1,
        eErrorFatal = 2,
        eErrorInformation = 3
    }

    export enum eFieldType {
        eFieldBoolean = eTypes.eBoolean,
        eFieldNumeric = eTypes.eDouble,
        eFieldChar = eTypes.eText,
        eFieldDate = eTypes.eDate
    }

    export enum CS_MSG_ICONS {
        Exclamation,
        Information,
        Error
    }
}
