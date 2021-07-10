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
    }
}