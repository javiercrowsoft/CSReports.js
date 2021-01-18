


namespace CSKernelFile
{


    export class cFile {


    {
        private c_module: string = "cFile";

        private c_sep_dir: string = @"\"; 		// Directory separator character;
        private c_sep_diralt: string = @"/";	// Alternate directory separator character;

        private file: FileStream = null;
        private br: BinaryReader = null;
        private bw: BinaryWriter = null;
        let this.tr: TextReader = null;
        private function: string = "";
        private module: string = "";
        private open: boolean = false;
        private curPath: string = "";
        private name: string = "";
        private path: string = "";
        private commDialog: object = null;
        private filter: string = "";

UNKNOWN >>         public bool isEof
        {
UNKNOWN >>             get
            {
                if (!this.open) {
                    return true;
                }
                else {
                    if (this.file.Length === this.file.Position) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            }

        }

UNKNOWN >>         public string filter
        {
UNKNOWN >>             get { return this.filter; }
UNKNOWN >>             set { this.filter = value; }
        }

        public setFilter(value: string) {
            this.filter = value;
        }

        public getName() {
            return this.name;
        }

        public getPath() {
            return this.path;
        }

UNKNOWN >>         public string name
        {
UNKNOWN >>             get { return this.name; }
        }

UNKNOWN >>         public string path
        {
UNKNOWN >>             get { return this.path; }
        }

UNKNOWN >>         public string fullName
        {
UNKNOWN >>             get { return this.path + Path.DirectorySeparatorChar + this.name; }
        }

        public init(function: string, module: string, commDialog: object) {
            this.function = function;
            this.module = module;
            this.commDialog = commDialog;
        }

        public open(fullFileName: string, mode: eFileMode) {
            return open(fullFileName, mode, false, true, eFileAccess.eShared, false, false);
        }
        public open(fullFileName: string, mode: eFileMode) {
                         bool createFile)
        {
            return open(fullFileName, mode, true, true, eFileAccess.eShared, false, false);
        }
        public open(fullFileName: string, mode: eFileMode) {
                         bool createFile, bool silens, eFileAccess access,
                         bool withDialog, bool canOpenOther)
        {
            let exists: boolean = false;
            close();

            if (fullFileName.Length > 0) {
                let fi: FileInfo = new FileInfo(fullFileName);
                exists = (fi.Exists);
            }
            else {
                fullFileName = " ";
                exists = false;
            }
            if ( || withDialog) {
                exists = fileExists(this.curPath + Path.DirectorySeparatorChar + getFileName(fullFileName));

                if (exists && !withDialog) {
                    fullFileName = this.curPath + Path.DirectorySeparatorChar + getFileName(fullFileName);
                }
                else if (silens) {
                    return false;
                }
                else if (!userSearchFile(fullFileName, false, "Open file", false, canOpenOther)) {
                    return false;
                }
            }

            if (createFile) {
                let fi: FileInfo = new FileInfo(fullFileName);
                if (fi.Exists) {
                    try {
                        fi.Delete();
                    }
                    catch (ex) {
                        cError.mngError(ex, "open", c_module, "");
                        return false;
                    }
                }
            }
            try {
                switch (mode)
                {
                    case eFileMode.eAppend:
                        switch (access)
                        {
                            case eFileAccess.eShared:
                                this.file = new FileStream(fullFileName,
                                                        FileMode.Append,
                                                        FileAccess.Write,
                                                        FileShare.ReadWrite);
                                break;
                            case eFileAccess.eLockWrite:
                                this.file = new FileStream(fullFileName,
                                                        FileMode.Append,
                                                        FileAccess.Write,
                                                        FileShare.Read);
                                break;
                            case eFileAccess.eLockReadWrite:
                                this.file = new FileStream(fullFileName,
                                                        FileMode.Append,
                                                        FileAccess.Write,
                                                        FileShare.None);
                                break;
                            default:
                                return false;
                        }
                        break;
                    // text mode
                    case eFileMode.eWrite:
                        switch (access)
                        {
                            case eFileAccess.eShared:
                                this.file = new FileStream(fullFileName,
                                                        FileMode.OpenOrCreate,
                                                        FileAccess.Write,
                                                        FileShare.ReadWrite);
                                break;
                            case eFileAccess.eLockWrite:
                                this.file = new FileStream(fullFileName,
                                                        FileMode.OpenOrCreate,
                                                        FileAccess.Write,
                                                        FileShare.Read);
                                break;
                            case eFileAccess.eLockReadWrite:
                                this.file = new FileStream(fullFileName,
                                                        FileMode.OpenOrCreate,
                                                        FileAccess.Write,
                                                        FileShare.None);
                                break;
                            default:
                                return false;
                        }
                        break;
                    case eFileMode.eRead:
                        switch (access)
                        {
                            case eFileAccess.eShared:
                                this.file = new FileStream(fullFileName,
                                                        FileMode.OpenOrCreate,
                                                        FileAccess.Read,
                                                        FileShare.ReadWrite);
                                break;
                            case eFileAccess.eLockWrite:
                                this.file = new FileStream(fullFileName,
                                                        FileMode.OpenOrCreate,
                                                        FileAccess.Read,
                                                        FileShare.Read);
                                break;
                            case eFileAccess.eLockReadWrite:
                                this.file = new FileStream(fullFileName,
                                                        FileMode.OpenOrCreate,
                                                        FileAccess.Read,
                                                        FileShare.None);
                                break;
                            default:
                                return false;
                        }
                        break;
                    // binary mode
                    case eFileMode.eBinaryWrite:
                        switch (access)
                        {
                            case eFileAccess.eShared:
                                this.file = new FileStream(fullFileName,
                                                        FileMode.OpenOrCreate,
                                                        FileAccess.Write,
                                                        FileShare.ReadWrite);
                                this.bw = new BinaryWriter(this.file);
                                break;
                            case eFileAccess.eLockWrite:
                                this.file = new FileStream(fullFileName,
                                                        FileMode.OpenOrCreate,
                                                        FileAccess.Write,
                                                        FileShare.Read);
                                this.bw = new BinaryWriter(this.file);
                                break;
                            case eFileAccess.eLockReadWrite:
                                this.file = new FileStream(fullFileName,
                                                        FileMode.OpenOrCreate,
                                                        FileAccess.Write,
                                                        FileShare.None);
                                this.bw = new BinaryWriter(this.file);
                                break;
                            default:
                                return false;
                        }
                        break;
                    case eFileMode.eBinaryRead:
                        switch (access)
                        {
                            case eFileAccess.eShared:
                                this.file = new FileStream(fullFileName,
                                                        FileMode.OpenOrCreate,
                                                        FileAccess.Read,
                                                        FileShare.ReadWrite);
                                this.br = new BinaryReader(this.file);
                                break;
                            case eFileAccess.eLockWrite:
                                this.file = new FileStream(fullFileName,
                                                        FileMode.OpenOrCreate,
                                                        FileAccess.Read,
                                                        FileShare.Read);
                                this.br = new BinaryReader(this.file);
                                break;
                            case eFileAccess.eLockReadWrite:
                                this.file = new FileStream(fullFileName,
                                                        FileMode.OpenOrCreate,
                                                        FileAccess.Read,
                                                        FileShare.None);
                                this.br = new BinaryReader(this.file);
                                break;
                            default:
                                return false;
                        }
                        break;
                    default:
                        return false;
                }
                this.open = true;
                return true;
            }
            catch (ex) {
                cError.mngError(ex, "open", c_module, "");
                return false;
            }
        }

        public save(fullFileName: string) {
                         bool exists,
                         bool readOnly,
                         string description)
        {
            exists = false;
            readOnly = false;

            if (fullFileName.Length === 0) {
                fullFileName = " ";
            }
            if (userSearchFile(fullFileName, true, description, true, false)) {
                if (fullFileName.Length > 0) {
                    let fi: FileInfo = new FileInfo(fullFileName);
                    exists = fi.Exists;
                    if (exists) {
                        if ((fi.Attributes & FileAttributes.Normal
                             | fi.Attributes & FileAttributes.ReadOnly
                             | fi.Attributes & FileAttributes.Archive) !== 0) {
                            if ( !== 0) {
                                readOnly = true;
                            }
                        }
                        else {
                            exists = false;
                        }
                    }
                }
                else {
                    fullFileName = " ";
                    exists = false;
                }
            }
            return true;
        }

        public write(text: string) {
            if (!this.open) return false; {
            try {
                let tw: TextWriter = new StreamWriter(this.file);
                tw.WriteLine(text);
                tw.Close();
                return true;
            }
            catch (ex) {
                cError.mngError(ex, "write", c_module, "failed writing text to file: " + this.path + Path.DirectorySeparatorChar + this.name);
                return false;
            }
        }

        public read(text: string, eof: boolean) {
            text = "";
            eof = false;
            if (!this.open) return false; {
            try {

                if (this.tr === null) {
                    this.tr = new StreamReader(this.file);
                }

                text = this.tr.ReadLine();
                if (text === null) {
                    eof = true;
                    text = "";
                    this.tr.Close();
                    this.tr = null;
                }
                return true;
            }
            catch (ex) {
                cError.mngError(ex, "read", c_module, "failed reading text from file: " + this.path + Path.DirectorySeparatorChar + this.name);
                return false;
            }
        }

        public binaryWrite(buffer: byte[]) {
            if (!this.open) return false; {
            try {
                this.bw.Write(buffer);
                return true;
            }
            catch (ex) {
                cError.mngError(ex, "binaryWrite", c_module, "failed writing in binary mode to file: " + this.path + Path.DirectorySeparatorChar + this.name);
                return false;
            }
        }

        public binaryRead(buffer: byte[], eof: boolean) {
            buffer = null;
            eof = false;
            if (!this.open) return false; {
            try {
                if (isEof) {
                    eof = true;
                    buffer = null;
                }
                else {
                    let bytesInFile: number = this.file.Length - this.file.Position;
                    if (bytesInFile < buffer.Length) {
                        buffer = new byte[bytesInFile];
                    }
                    buffer = this.br.ReadBytes(buffer.Length);
                }
                return true;
            }
            catch (ex) {
                cError.mngError(ex, "binaryRead", c_module, "failed reading in binary mode from file: " + this.path + Path.DirectorySeparatorChar + this.name);
                return false;
            }
        }

        public close() {
            try {
                if (this.file !== null) {
                    this.file.Close();
                    if (this.br !== null) {
                        this.br.Close();
                        this.br = null;
                    }
                    if (this.bw !== null) {
                        this.bw.Close();
                        this.bw = null;
                    }
                    this.file = null;
                }
                this.open = false;
            }
            catch (ex) {
                cError.mngError(ex, "binaryRead", c_module, "failed reading in binary mode from file: " + this.path + Path.DirectorySeparatorChar + this.name);
            }
        }

        public userSearchFile(fullFileName: string) {
                                   bool ifNotExistsIsOk,
                                   string description,
                                   bool saving,
                                   bool canOpenOther)
        {
            let userFile: string = "";
            let extValid: boolean = false;
            let nameValid: boolean = false;
            let exists: boolean = false;

            do {

                if (showOpenFileDlg(userFile,
                                    getFileExt(fullFileName),
                                    getFileName(fullFileName),
                                    getPath(fullFileName),
                                    description,
                                    saving)) {

                    exists = fileExists(userFile);

                    if (exists || ifNotExistsIsOk) {
                        if (fullFileName === " " || getFileWithoutExt(fullFileName) === "*") {
                            nameValid = true;
                        }
                        else if (ifNotExistsIsOk
                                || canOpenOther
                                || getFileWithoutExt(fullFileName) === getFileWithoutExt(userFile)) {
                            nameValid = true;
                        }
                        if (nameValid) {
                            if (fullFileName === " " || getFileExt(fullFileName) === "*") {
                                extValid = true;
                            }
                            else if (ifNotExistsIsOk || getFileExt(fullFileName) === getFileExt(userFile)) {
                                extValid = true;
                            }
                            if (extValid && nameValid && (exists || ifNotExistsIsOk)) {
                                break;
                            }
                            else {
                                nameValid = false;
                                extValid = false;
                            }
                        }

                    }
                }
                else {
                    return false;
                }

            } while (true);

            this.curPath = getPath(userFile);
            fullFileName = userFile;
            this.name = getFileName(userFile);
            this.path = getPath(userFile);

            return true;
        }

        public showOpenFileDlg(userFile: string) {
                                    string filter,
                                    string fileToSearch,
                                    string curDir,
                                    string title,
                                    bool saving)
        {
            userFile = "";
            let fd: FileDialog = this.commDialog as FileDialog;
            if (curDir.Length > 0 && curDir !== " ") {
                let di: DirectoryInfo = new DirectoryInfo(curDir);
                if (di.Exists) {
                    fd.InitialDirectory = curDir;
                }
            }
            if (fileToSearch !== " ." && (fileToSearch.Length < 2 || fileToSearch.Substring(0, 2) !== "*.")) {
                fd.FileName = fileToSearch;
            }
            else {
                fd.FileName = "";
            }
            if (this.filter.Length > 0) {
                fd.Filter = this.filter;
            }
            else if (filter.Length > 0) {
                fd.Filter = filter;
            }
            fd.Title = title;
            if (saving) {
                let fs: SaveFileDialog = this.commDialog as SaveFileDialog;
                if (fs.ShowDialog() === DialogResult.OK) {
                    userFile = fs.FileName;
                    return true;
                }
                else  {
                    return false;
                }
            }
            else {
                let fc: OpenFileDialog = this.commDialog as OpenFileDialog;
                if (fc.ShowDialog() === DialogResult.OK) {
                    userFile = fc.FileName;
                    return true;
                }
                else  {
                    return false;
                }
            }
        }

        public getFileName(fullFileName: string) {
            return getFileWithoutExt(fullFileName) + "." + getFileExt(fullFileName);
        }

        public getFileExt(fullFileName: string) {
            let path: string = "";
            let fileName: string = "";
            let sepPos: number = 0;
            let sep: string = "";

            getPathAndFileName(fullFileName, path, fileName);
            sepPos = fileName.Length;

            if (sepPos === 0) {
                return "";
            }
            else {
                sepPos -= 1;
                sep = fileName.Substring(sepPos, 1);
                while (sep !== ".") {
                    sepPos--;
                    if (sepPos < 0) break; {
                    sep = fileName.Substring(sepPos, 1);
                }
                if (sepPos < 0) {
                    return "";
                }
                else {
                    return fileName.Substring(sepPos + 1);
                }
            }
        }

        public getFileWithoutExt(fullFileName: string) {
            let path: string = "";
            let fileName: string = "";
            let sepPos: number = 0;
            let sep: string = "";

            getPathAndFileName(fullFileName, path, fileName);
            sepPos = fileName.Length;

            if (sepPos === 0) {
                return fileName;
            }

            sepPos -= 1;
            sep = fileName.Substring(sepPos, 1);
            while (sep !== ".") {
                sepPos--;
                if (sepPos < 0) break; {
                sep = fileName.Substring(sepPos, 1);
            }
            if (sepPos < 0) {
                return fileName;
            }
            else {
                return fileName.Substring(0, sepPos);
            }
        }

        public getPath(fullFileName: string) {
            let path: string = "";
            let fileName: string = "";

            getPathAndFileName(fullFileName, path, fileName);
            return path;
        }

        public getPathAndFileName(fullFileName: string) {
                                              string path,
                                              string fileName)
        {
            let sepPos: number = 0;
            let sep: string = "";

            sepPos = fullFileName.Length;
            if (sepPos === 0) {
                path = "";
                fileName = "";
            }
            else {
                sepPos -= 1;
                sep = fullFileName.Substring(sepPos, 1);
                while (!isSeparator(sep)) {
                    sepPos--;
                    if (sepPos < 0) break; {
                    sep = fullFileName.Substring(sepPos, 1);
                }
                if (sepPos === fullFileName.Length - 1) {
                    // case when fullFileName is c:\ or d:\ etc.
                    path = fullFileName.Substring(0, sepPos);
                    fileName = fullFileName;
                }
                else if (sepPos < 0) {
                    // case when fullFileName is c: or d: etc.
                    path = fullFileName;
                    fileName = fullFileName;
                }
                else {
                    path = fullFileName.Substring(0, sepPos);
                    fileName = fullFileName.Substring(sepPos + 1);
                }
            }
        }

        public copyFile(fullFileNameSource: string, fullFileNameDestination: string) {
            try {
                File.Copy(fullFileNameSource, fullFileNameDestination);
                return true;
            }
            catch (ex) {
                cError.mngError(ex, "copyFile", c_module, "failed copying [" + fullFileNameSource + "] to [" + fullFileNameDestination + "]");
                return false;
            }
        }

        private isSeparator(character: string) {
            switch (character)
            {
                case c_sep_dir:
                    return true;
                case c_sep_diralt:
                    return true;
                default:
                    return false;
            }
        }

        private fileExists(fullFileName: string) {
            try {
                if (fullFileName === "\\ .") {
                    return false;
                }
                else  {
                    let fi: FileInfo = new FileInfo(fullFileName);
                    return fi.Exists;                
                }
            }
            catch (ex) {
                return false;
            }
        }

        public constructor() {
        }


    }    }
}
