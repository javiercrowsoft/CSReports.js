(function(globalObject) {


    globalObject.CSKernelFile = globalObject.CSKernelFile || {};



    globalObject.CSKernelFile.createCFile = function() {

        // @ts-ignore
        let self: CSKernelFile.IcFile = {};
        const c_module: string = "cFile";

        const c_sep_dir: string = @"\"; 		// Directory separator character;
        const c_sep_diralt: string = @"/";	// Alternate directory separator character;

        let m_file: FileStream = null;
        let m_br: BinaryReader = null;
        let m_bw: BinaryWriter = null;
        let m_tr: TextReader = null;
        let m_function: string = "";
        let m_module: string = "";
        let m_open: boolean = false;
        let m_curPath: string = "";
        let m_name: string = "";
        let m_path: string = "";
        let m_commDialog: object = null;
        let m_filter: string = "";

UNKNOWN >>         public bool isEof
        {
UNKNOWN >>             get
            {
                if (!m_open) {
                    return true;
                }
                else {
                    if (m_file.Length === m_file.Position) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            }

        };

UNKNOWN >>         public string filter
        {
UNKNOWN >>             get { return m_filter; }
UNKNOWN >>             set { m_filter = value; }
        }

        self.setFilter = function(value) {
            m_filter = value;
        };

        self.getName = function() {
            return m_name;
        };

        self.getPath = function() {
            return m_path;
        };

UNKNOWN >>         public string name
        {
UNKNOWN >>             get { return m_name; }
        }

UNKNOWN >>         public string path
        {
UNKNOWN >>             get { return m_path; }
        }

UNKNOWN >>         public string fullName
        {
UNKNOWN >>             get { return m_path + Path.DirectorySeparatorChar + m_name; }
        }

        self.init = function(function, module, commDialog) {
            m_function = function;
            m_module = module;
            m_commDialog = commDialog;
        };

        self.open = function(fullFileName, mode) {
            return open(fullFileName, mode, false, true, eFileAccess.eShared, false, false);
        };
        self.open = function(fullFileName, mode, ) {
                         bool createFile)
        {
            return open(fullFileName, mode, true, true, eFileAccess.eShared, false, false);
        };
        self.open = function(fullFileName, mode, ) {
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
                exists = fileExists(m_curPath + Path.DirectorySeparatorChar + getFileName(fullFileName));

                if (exists && !withDialog) {
                    fullFileName = m_curPath + Path.DirectorySeparatorChar + getFileName(fullFileName);
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
                                m_file = UNKNOWN >>  can't find constructor for class FileStream(fullFileName,
                                                        FileMode.Append,
                                                        FileAccess.Write,
                                                        FileShare.ReadWrite);
                                break;
                            case eFileAccess.eLockWrite:
                                m_file = UNKNOWN >>  can't find constructor for class FileStream(fullFileName,
                                                        FileMode.Append,
                                                        FileAccess.Write,
                                                        FileShare.Read);
                                break;
                            case eFileAccess.eLockReadWrite:
                                m_file = UNKNOWN >>  can't find constructor for class FileStream(fullFileName,
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
                                m_file = UNKNOWN >>  can't find constructor for class FileStream(fullFileName,
                                                        FileMode.OpenOrCreate,
                                                        FileAccess.Write,
                                                        FileShare.ReadWrite);
                                break;
                            case eFileAccess.eLockWrite:
                                m_file = UNKNOWN >>  can't find constructor for class FileStream(fullFileName,
                                                        FileMode.OpenOrCreate,
                                                        FileAccess.Write,
                                                        FileShare.Read);
                                break;
                            case eFileAccess.eLockReadWrite:
                                m_file = UNKNOWN >>  can't find constructor for class FileStream(fullFileName,
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
                                m_file = UNKNOWN >>  can't find constructor for class FileStream(fullFileName,
                                                        FileMode.OpenOrCreate,
                                                        FileAccess.Read,
                                                        FileShare.ReadWrite);
                                break;
                            case eFileAccess.eLockWrite:
                                m_file = UNKNOWN >>  can't find constructor for class FileStream(fullFileName,
                                                        FileMode.OpenOrCreate,
                                                        FileAccess.Read,
                                                        FileShare.Read);
                                break;
                            case eFileAccess.eLockReadWrite:
                                m_file = UNKNOWN >>  can't find constructor for class FileStream(fullFileName,
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
                                m_file = UNKNOWN >>  can't find constructor for class FileStream(fullFileName,
                                                        FileMode.OpenOrCreate,
                                                        FileAccess.Write,
                                                        FileShare.ReadWrite);
                                m_bw = UNKNOWN >>  can't find constructor for class BinaryWriter(m_file);
                                break;
                            case eFileAccess.eLockWrite:
                                m_file = UNKNOWN >>  can't find constructor for class FileStream(fullFileName,
                                                        FileMode.OpenOrCreate,
                                                        FileAccess.Write,
                                                        FileShare.Read);
                                m_bw = UNKNOWN >>  can't find constructor for class BinaryWriter(m_file);
                                break;
                            case eFileAccess.eLockReadWrite:
                                m_file = UNKNOWN >>  can't find constructor for class FileStream(fullFileName,
                                                        FileMode.OpenOrCreate,
                                                        FileAccess.Write,
                                                        FileShare.None);
                                m_bw = UNKNOWN >>  can't find constructor for class BinaryWriter(m_file);
                                break;
                            default:
                                return false;
                        }
                        break;
                    case eFileMode.eBinaryRead:
                        switch (access)
                        {
                            case eFileAccess.eShared:
                                m_file = UNKNOWN >>  can't find constructor for class FileStream(fullFileName,
                                                        FileMode.OpenOrCreate,
                                                        FileAccess.Read,
                                                        FileShare.ReadWrite);
                                m_br = UNKNOWN >>  can't find constructor for class BinaryReader(m_file);
                                break;
                            case eFileAccess.eLockWrite:
                                m_file = UNKNOWN >>  can't find constructor for class FileStream(fullFileName,
                                                        FileMode.OpenOrCreate,
                                                        FileAccess.Read,
                                                        FileShare.Read);
                                m_br = UNKNOWN >>  can't find constructor for class BinaryReader(m_file);
                                break;
                            case eFileAccess.eLockReadWrite:
                                m_file = UNKNOWN >>  can't find constructor for class FileStream(fullFileName,
                                                        FileMode.OpenOrCreate,
                                                        FileAccess.Read,
                                                        FileShare.None);
                                m_br = UNKNOWN >>  can't find constructor for class BinaryReader(m_file);
                                break;
                            default:
                                return false;
                        }
                        break;
                    default:
                        return false;
                }
                m_open = true;
                return true;
            }
            catch (ex) {
                cError.mngError(ex, "open", c_module, "");
                return false;
            }
        };

        self.save = function(fullFileName, ) {
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
        };

        self.write = function(text) {
            if (!m_open) return false; {
            try {
                let tw: TextWriter = new StreamWriter(m_file);
                tw.WriteLine(text);
                tw.Close();
                return true;
            }
            catch (ex) {
                cError.mngError(ex, "write", c_module, "failed writing text to file: " + m_path + Path.DirectorySeparatorChar + m_name);
                return false;
            }
        };

        self.read = function(text, eof) {
            text = "";
            eof = false;
            if (!m_open) return false; {
            try {

                if (m_tr === null) {
                    m_tr = UNKNOWN >>  can't find constructor for class StreamReader(m_file);
                }

                text = m_tr.ReadLine();
                if (text === null) {
                    eof = true;
                    text = "";
                    m_tr.Close();
                    m_tr = null;
                }
                return true;
            }
            catch (ex) {
                cError.mngError(ex, "read", c_module, "failed reading text from file: " + m_path + Path.DirectorySeparatorChar + m_name);
                return false;
            }
        };

        self.binaryWrite = function(buffer) {
            if (!m_open) return false; {
            try {
                m_bw.Write(buffer);
                return true;
            }
            catch (ex) {
                cError.mngError(ex, "binaryWrite", c_module, "failed writing in binary mode to file: " + m_path + Path.DirectorySeparatorChar + m_name);
                return false;
            }
        };

        self.binaryRead = function(buffer, eof) {
            buffer = null;
            eof = false;
            if (!m_open) return false; {
            try {
                if (isEof) {
                    eof = true;
                    buffer = null;
                }
                else {
                    let bytesInFile: number = m_file.Length - m_file.Position;
                    if (bytesInFile < buffer.Length) {
                        buffer = UNKNOWN >>  can't find constructor for class byte[bytesInFile];
                    }
                    buffer = m_br.ReadBytes(buffer.Length);
                }
                return true;
            }
            catch (ex) {
                cError.mngError(ex, "binaryRead", c_module, "failed reading in binary mode from file: " + m_path + Path.DirectorySeparatorChar + m_name);
                return false;
            }
        };

        self.close = function() {
            try {
                if (m_file !== null) {
                    m_file.Close();
                    if (m_br !== null) {
                        m_br.Close();
                        m_br = null;
                    }
                    if (m_bw !== null) {
                        m_bw.Close();
                        m_bw = null;
                    }
                    m_file = null;
                }
                m_open = false;
            }
            catch (ex) {
                cError.mngError(ex, "binaryRead", c_module, "failed reading in binary mode from file: " + m_path + Path.DirectorySeparatorChar + m_name);
            }
        };

        self.userSearchFile = function(fullFileName, ) {
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

            m_curPath = getPath(userFile);
            fullFileName = userFile;
            m_name = getFileName(userFile);
            m_path = getPath(userFile);

            return true;
        };

        self.showOpenFileDlg = function(userFile, ) {
                                    string filter,
                                    string fileToSearch,
                                    string curDir,
                                    string title,
                                    bool saving)
        {
            userFile = "";
            let fd: FileDialog = m_commDialog as FileDialog;
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
            if (m_filter.Length > 0) {
                fd.Filter = m_filter;
            }
            else if (filter.Length > 0) {
                fd.Filter = filter;
            }
            fd.Title = title;
            if (saving) {
                let fs: SaveFileDialog = m_commDialog as SaveFileDialog;
                if (fs.ShowDialog() === DialogResult.OK) {
                    userFile = fs.FileName;
                    return true;
                }
                else  {
                    return false;
                }
            }
            else {
                let fc: OpenFileDialog = m_commDialog as OpenFileDialog;
                if (fc.ShowDialog() === DialogResult.OK) {
                    userFile = fc.FileName;
                    return true;
                }
                else  {
                    return false;
                }
            }
        };

        self.getFileName = function(fullFileName) {
            return getFileWithoutExt(fullFileName) + "." + getFileExt(fullFileName);
        };

        self.getFileExt = function(fullFileName) {
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
        };

        self.getFileWithoutExt = function(fullFileName) {
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
        };

        self.getPath = function(fullFileName) {
            let path: string = "";
            let fileName: string = "";

            getPathAndFileName(fullFileName, path, fileName);
            return path;
        };

        self.getPathAndFileName = function(fullFileName, ) {
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
        };

        self.copyFile = function(fullFileNameSource, fullFileNameDestination) {
            try {
                File.Copy(fullFileNameSource, fullFileNameDestination);
                return true;
            }
            catch (ex) {
                cError.mngError(ex, "copyFile", c_module, "failed copying [" + fullFileNameSource + "] to [" + fullFileNameDestination + "]");
                return false;
            }
        };

        const isSeparator = function(character) {
            switch (character)
            {
                case c_sep_dir:
                    return true;
                case c_sep_diralt:
                    return true;
                default:
                    return false;
            }
        };

        const fileExists = function(fullFileName) {
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
        };

        const cFile = function() {
        };
        return self;

    }    }
}(globalObject));


namespace CSKernelFile {

  export interface IcFile {

    setFilter: (string) => void;
    getName: () => string;
    getPath: () => string;
    init: (string, string, object) => void;
    open: (string, eFileMode) => bool;
    open: (string, eFileMode, ) => bool;
    open: (string, eFileMode, ) => bool;
    save: (string, ) => bool;
    write: (string) => bool;
    read: (string, bool) => bool;
    binaryWrite: (byte[]) => bool;
    binaryRead: (byte[], bool) => bool;
    close: () => void;
    userSearchFile: (string, ) => bool;
    showOpenFileDlg: (string, ) => bool;
    getFileName: (string) => string;
    getFileExt: (string) => string;
    getFileWithoutExt: (string) => string;
    getPath: (string) => string;
    getPathAndFileName: (string, ) => void;
    copyFile: (string, string) => bool;
  }
}
