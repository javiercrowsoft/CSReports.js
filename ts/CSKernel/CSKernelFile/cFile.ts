namespace CSKernelFile  {

    import NotImplementedException = CSOAPI.NotImplementedException;

    export class cFile {

        public static getPath(fileName: string): string {
            throw new NotImplementedException();
        }

        public static getFileName(fileName: string): string {
            throw new NotImplementedException();
        }

        static getFileWithoutExt(fileNameWithExt: string) {
            throw new NotImplementedException();
        }

        init(title: string, commDialog: object) {

        }

        setFilter(filter: string) {

        }

        save(name: string, bExists: boolean, bReadonly: boolean, s: string) {
            return false;
        }

        getName() {
            return "";
        }

        getPath() {
            return "";
        }

        open(name: string, eWrite: CSKernelClient.eFileMode, b: boolean, b2: boolean,
             eLockWrite: CSKernelClient.eFileAccess, b3: boolean, b4: boolean) {
            return false;
        }

        close() {

        }

        fileExists(file: string) {
            return false;
        }

        static directorySeparatorChar() {
            return "";
        }
    }
}