namespace CSKernelFile  {

    import NotImplementedException = CSOAPI.NotImplementedException;
    import cWindow = CSKernelClient.cWindow;

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

        init(title: string) {

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

        userOpenFile() {
            return new Promise<FileContent>((resolve, reject) => {
                this.openFile(resolve, reject);
            });
        }

        saveInBrowser(name: string, content: string, type: string) {
            const file = new Blob([content], {type: type});
            const url = URL.createObjectURL(file);
            const a = document.createElement("a") as HTMLAnchorElement;
            a.style.display = 'none';
            a.href = url;
            a.download = name;
            document.body.appendChild(a);
            cWindow.clickElem(a);
            setTimeout(function() {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        }

        close() {

        }

        fileExists(file: string) {
            return false;
        }

        static directorySeparatorChar() {
            return "";
        }

        private openFile(resolve: (fc: FileContent) => void, reject: () => void) {
            const readFile = (e: any) => {
                const file = e.target.files[0];
                if(!file) {
                    reject();
                    return;
                }
                const reader = new FileReader();
                reader.onload = function(e: any) {
                    document.body.removeChild(fileInput);
                    const fc = new FileContent();
                    fc.name = file.name;
                    fc.content = e.target.result;
                    resolve(fc);
                }
                reader.readAsText(file);
            }

            const fileInput = document.createElement("input");
            fileInput.type = 'file';
            fileInput.style.display = 'none';
            fileInput.onchange = readFile;
            document.body.appendChild(fileInput);

            cWindow.clickElem(fileInput);
        }
    }

    export class FileContent {
        name: string;
        content: string;
    }
}