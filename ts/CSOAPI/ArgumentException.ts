///<reference path="./Exception.ts"/>

namespace CSOAPI {

    export class ArgumentException extends Exception { }

    export class ArgumentNullException extends Exception { }

    export class InvalidOperationException extends Exception { }

    export class KeyAlreadyExistsInCollection extends Exception { }
}