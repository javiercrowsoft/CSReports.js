(function(globalObject) {


    globalObject.CSKernelFile = globalObject.CSKernelFile || {}; //@@@: namespace CSKernelFile
 //@@@: {


    globalObject.CSKernelFile.createCFile = function() {

        const self = {}; //@@@: public class cFile
        const c_module = "cFile"; //@@@: private const string c_module = "cFile";

        const c_sep_dir = @"\"; 		// Directory separator character; //@@@: private const string c_sep_dir = @"\"; 		// Directory separator character
        const c_sep_diralt = @"/";	// Alternate directory separator character; //@@@: private const string c_sep_diralt = @"/";	// Alternate directory separator character

        let m_file = null; //@@@: private FileStream m_file = null;
        let m_br = null; //@@@: private BinaryReader m_br = null;
        let m_bw = null; //@@@: private BinaryWriter m_bw = null;
        let m_tr = null; //@@@: TextReader m_tr = null;
        let m_function = ""; //@@@: private string m_function = "";
        let m_module = ""; //@@@: private string m_module = "";
        let m_open = false; //@@@: private bool m_open = false;
        let m_curPath = ""; //@@@: private string m_curPath = "";
        let m_name = ""; //@@@: private string m_name = "";
        let m_path = ""; //@@@: private string m_path = "";
        let m_commDialog = null; //@@@: private object m_commDialog = null;
        let m_filter = ""; //@@@: private string m_filter = "";

UNKNOWN >>         public bool isEof //@@@: public bool isEof
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                if (!m_open) { //@@@: if (!m_open)
                    return true; //@@@: return true;
                } //@@@: }
                else { //@@@: else
                    if (m_file.Length === m_file.Position) { //@@@: if (m_file.Length == m_file.Position)
                        return true; //@@@: return true;
                    } //@@@: }
                    else { //@@@: else
                        return false; //@@@: return false;
                    } //@@@: }
                } //@@@: }
            } //@@@: }

        }; //@@@: }

UNKNOWN >>         public string filter //@@@: public string filter
        { //@@@: {
UNKNOWN >>             get { return m_filter; } //@@@: get { return m_filter; }
UNKNOWN >>             set { m_filter = value; } //@@@: set { m_filter = value; }
        } //@@@: }

        self.setFilter = function(value) { //@@@: public void setFilter(string value)
            m_filter = value; //@@@: m_filter = value;
        }; //@@@: }

        self.getName = function() { //@@@: public string getName()
            return m_name; //@@@: return m_name;
        }; //@@@: }

        self.getPath = function() { //@@@: public string getPath()
            return m_path; //@@@: return m_path;
        }; //@@@: }

UNKNOWN >>         public string name //@@@: public string name
        { //@@@: {
UNKNOWN >>             get { return m_name; } //@@@: get { return m_name; }
        } //@@@: }

UNKNOWN >>         public string path //@@@: public string path
        { //@@@: {
UNKNOWN >>             get { return m_path; } //@@@: get { return m_path; }
        } //@@@: }

UNKNOWN >>         public string fullName //@@@: public string fullName
        { //@@@: {
UNKNOWN >>             get { return m_path + Path.DirectorySeparatorChar + m_name; } //@@@: get { return m_path + Path.DirectorySeparatorChar + m_name; }
        } //@@@: }

        self.init = function(function, module, commDialog) { //@@@: public void init(string function, string module, object commDialog)
            m_function = function; //@@@: m_function = function;
            m_module = module; //@@@: m_module = module;
            m_commDialog = commDialog; //@@@: m_commDialog = commDialog;
        }; //@@@: }

        self.open = function(fullFileName, mode) { //@@@: public bool open(string fullFileName, eFileMode mode)
            return open(fullFileName, mode, false, true, eFileAccess.eShared, false, false); //@@@: return open(fullFileName, mode, false, true, eFileAccess.eShared, false, false);
        }; //@@@: }
        self.open = function(fullFileName, mode, ) { //@@@: public bool open(string fullFileName, eFileMode mode,
                         bool createFile) //@@@: bool createFile)
        { //@@@: {
            return open(fullFileName, mode, true, true, eFileAccess.eShared, false, false); //@@@: return open(fullFileName, mode, true, true, eFileAccess.eShared, false, false);
        }; //@@@: }
        self.open = function(fullFileName, mode, ) { //@@@: public bool open(string fullFileName, eFileMode mode,
                         bool createFile, bool silens, eFileAccess access, //@@@: bool createFile, bool silens, eFileAccess access,
                         bool withDialog, bool canOpenOther) //@@@: bool withDialog, bool canOpenOther)
        { //@@@: {
            let exists = false; //@@@: bool exists = false;
            close(); //@@@: close();

            if (fullFileName.Length > 0) { //@@@: if (fullFileName.Length > 0)
                let fi = new FileInfo(fullFileName); //@@@: FileInfo fi = new FileInfo(fullFileName);
                exists = (fi.Exists); //@@@: exists = (fi.Exists);
            } //@@@: }
            else { //@@@: else
                fullFileName = " "; //@@@: fullFileName = " ";
                exists = false; //@@@: exists = false;
            } //@@@: }
            if ( || withDialog) { //@@@: if ((!exists && !createFile) || withDialog)
                exists = fileExists(m_curPath + Path.DirectorySeparatorChar + getFileName(fullFileName)); //@@@: exists = fileExists(m_curPath + Path.DirectorySeparatorChar + getFileName(fullFileName));

                if (exists && !withDialog) { //@@@: if (exists && !withDialog)
                    fullFileName = m_curPath + Path.DirectorySeparatorChar + getFileName(fullFileName); //@@@: fullFileName = m_curPath + Path.DirectorySeparatorChar + getFileName(fullFileName);
                } //@@@: }
                else if (silens) { //@@@: else if (silens)
                    return false; //@@@: return false;
                } //@@@: }
                else if (!userSearchFile(fullFileName, false, "Open file", false, canOpenOther)) { //@@@: else if (!userSearchFile(ref fullFileName, false, "Open file", false, canOpenOther))
                    return false; //@@@: return false;
                } //@@@: }
            } //@@@: }

            if (createFile) { //@@@: if (createFile)
                let fi = new FileInfo(fullFileName); //@@@: FileInfo fi = new FileInfo(fullFileName);
                if (fi.Exists) { //@@@: if (fi.Exists)
                    try { //@@@: try
                        fi.Delete(); //@@@: fi.Delete();
                    } //@@@: }
                    catch (ex) { //@@@: catch (Exception ex)
                        cError.mngError(ex, "open", c_module, ""); //@@@: cError.mngError(ex, "open", c_module, "");
                        return false; //@@@: return false;
                    } //@@@: }
                } //@@@: }
            } //@@@: }
            try { //@@@: try
                switch (mode) //@@@: switch (mode)
                { //@@@: {
                    case eFileMode.eAppend: //@@@: case eFileMode.eAppend:
                        switch (access) //@@@: switch (access)
                        { //@@@: {
                            case eFileAccess.eShared: //@@@: case eFileAccess.eShared:
                                m_file = new FileStream(fullFileName, //@@@: m_file = new FileStream(fullFileName,
                                                        FileMode.Append, //@@@: FileMode.Append,
                                                        FileAccess.Write, //@@@: FileAccess.Write,
                                                        FileShare.ReadWrite); //@@@: FileShare.ReadWrite);
                                break; //@@@: break;
                            case eFileAccess.eLockWrite: //@@@: case eFileAccess.eLockWrite:
                                m_file = new FileStream(fullFileName, //@@@: m_file = new FileStream(fullFileName,
                                                        FileMode.Append, //@@@: FileMode.Append,
                                                        FileAccess.Write, //@@@: FileAccess.Write,
                                                        FileShare.Read); //@@@: FileShare.Read);
                                break; //@@@: break;
                            case eFileAccess.eLockReadWrite: //@@@: case eFileAccess.eLockReadWrite:
                                m_file = new FileStream(fullFileName, //@@@: m_file = new FileStream(fullFileName,
                                                        FileMode.Append, //@@@: FileMode.Append,
                                                        FileAccess.Write, //@@@: FileAccess.Write,
                                                        FileShare.None); //@@@: FileShare.None);
                                break; //@@@: break;
                            default: //@@@: default:
                                return false; //@@@: return false;
                        } //@@@: }
                        break; //@@@: break;
                    // text mode
                    case eFileMode.eWrite: //@@@: case eFileMode.eWrite:
                        switch (access) //@@@: switch (access)
                        { //@@@: {
                            case eFileAccess.eShared: //@@@: case eFileAccess.eShared:
                                m_file = new FileStream(fullFileName, //@@@: m_file = new FileStream(fullFileName,
                                                        FileMode.OpenOrCreate, //@@@: FileMode.OpenOrCreate,
                                                        FileAccess.Write, //@@@: FileAccess.Write,
                                                        FileShare.ReadWrite); //@@@: FileShare.ReadWrite);
                                break; //@@@: break;
                            case eFileAccess.eLockWrite: //@@@: case eFileAccess.eLockWrite:
                                m_file = new FileStream(fullFileName, //@@@: m_file = new FileStream(fullFileName,
                                                        FileMode.OpenOrCreate, //@@@: FileMode.OpenOrCreate,
                                                        FileAccess.Write, //@@@: FileAccess.Write,
                                                        FileShare.Read); //@@@: FileShare.Read);
                                break; //@@@: break;
                            case eFileAccess.eLockReadWrite: //@@@: case eFileAccess.eLockReadWrite:
                                m_file = new FileStream(fullFileName, //@@@: m_file = new FileStream(fullFileName,
                                                        FileMode.OpenOrCreate, //@@@: FileMode.OpenOrCreate,
                                                        FileAccess.Write, //@@@: FileAccess.Write,
                                                        FileShare.None); //@@@: FileShare.None);
                                break; //@@@: break;
                            default: //@@@: default:
                                return false; //@@@: return false;
                        } //@@@: }
                        break; //@@@: break;
                    case eFileMode.eRead: //@@@: case eFileMode.eRead:
                        switch (access) //@@@: switch (access)
                        { //@@@: {
                            case eFileAccess.eShared: //@@@: case eFileAccess.eShared:
                                m_file = new FileStream(fullFileName, //@@@: m_file = new FileStream(fullFileName,
                                                        FileMode.OpenOrCreate, //@@@: FileMode.OpenOrCreate,
                                                        FileAccess.Read, //@@@: FileAccess.Read,
                                                        FileShare.ReadWrite); //@@@: FileShare.ReadWrite);
                                break; //@@@: break;
                            case eFileAccess.eLockWrite: //@@@: case eFileAccess.eLockWrite:
                                m_file = new FileStream(fullFileName, //@@@: m_file = new FileStream(fullFileName,
                                                        FileMode.OpenOrCreate, //@@@: FileMode.OpenOrCreate,
                                                        FileAccess.Read, //@@@: FileAccess.Read,
                                                        FileShare.Read); //@@@: FileShare.Read);
                                break; //@@@: break;
                            case eFileAccess.eLockReadWrite: //@@@: case eFileAccess.eLockReadWrite:
                                m_file = new FileStream(fullFileName, //@@@: m_file = new FileStream(fullFileName,
                                                        FileMode.OpenOrCreate, //@@@: FileMode.OpenOrCreate,
                                                        FileAccess.Read, //@@@: FileAccess.Read,
                                                        FileShare.None); //@@@: FileShare.None);
                                break; //@@@: break;
                            default: //@@@: default:
                                return false; //@@@: return false;
                        } //@@@: }
                        break; //@@@: break;
                    // binary mode
                    case eFileMode.eBinaryWrite: //@@@: case eFileMode.eBinaryWrite:
                        switch (access) //@@@: switch (access)
                        { //@@@: {
                            case eFileAccess.eShared: //@@@: case eFileAccess.eShared:
                                m_file = new FileStream(fullFileName, //@@@: m_file = new FileStream(fullFileName,
                                                        FileMode.OpenOrCreate, //@@@: FileMode.OpenOrCreate,
                                                        FileAccess.Write, //@@@: FileAccess.Write,
                                                        FileShare.ReadWrite); //@@@: FileShare.ReadWrite);
                                m_bw = new BinaryWriter(m_file); //@@@: m_bw = new BinaryWriter(m_file);
                                break; //@@@: break;
                            case eFileAccess.eLockWrite: //@@@: case eFileAccess.eLockWrite:
                                m_file = new FileStream(fullFileName, //@@@: m_file = new FileStream(fullFileName,
                                                        FileMode.OpenOrCreate, //@@@: FileMode.OpenOrCreate,
                                                        FileAccess.Write, //@@@: FileAccess.Write,
                                                        FileShare.Read); //@@@: FileShare.Read);
                                m_bw = new BinaryWriter(m_file); //@@@: m_bw = new BinaryWriter(m_file);
                                break; //@@@: break;
                            case eFileAccess.eLockReadWrite: //@@@: case eFileAccess.eLockReadWrite:
                                m_file = new FileStream(fullFileName, //@@@: m_file = new FileStream(fullFileName,
                                                        FileMode.OpenOrCreate, //@@@: FileMode.OpenOrCreate,
                                                        FileAccess.Write, //@@@: FileAccess.Write,
                                                        FileShare.None); //@@@: FileShare.None);
                                m_bw = new BinaryWriter(m_file); //@@@: m_bw = new BinaryWriter(m_file);
                                break; //@@@: break;
                            default: //@@@: default:
                                return false; //@@@: return false;
                        } //@@@: }
                        break; //@@@: break;
                    case eFileMode.eBinaryRead: //@@@: case eFileMode.eBinaryRead:
                        switch (access) //@@@: switch (access)
                        { //@@@: {
                            case eFileAccess.eShared: //@@@: case eFileAccess.eShared:
                                m_file = new FileStream(fullFileName, //@@@: m_file = new FileStream(fullFileName,
                                                        FileMode.OpenOrCreate, //@@@: FileMode.OpenOrCreate,
                                                        FileAccess.Read, //@@@: FileAccess.Read,
                                                        FileShare.ReadWrite); //@@@: FileShare.ReadWrite);
                                m_br = new BinaryReader(m_file); //@@@: m_br = new BinaryReader(m_file);
                                break; //@@@: break;
                            case eFileAccess.eLockWrite: //@@@: case eFileAccess.eLockWrite:
                                m_file = new FileStream(fullFileName, //@@@: m_file = new FileStream(fullFileName,
                                                        FileMode.OpenOrCreate, //@@@: FileMode.OpenOrCreate,
                                                        FileAccess.Read, //@@@: FileAccess.Read,
                                                        FileShare.Read); //@@@: FileShare.Read);
                                m_br = new BinaryReader(m_file); //@@@: m_br = new BinaryReader(m_file);
                                break; //@@@: break;
                            case eFileAccess.eLockReadWrite: //@@@: case eFileAccess.eLockReadWrite:
                                m_file = new FileStream(fullFileName, //@@@: m_file = new FileStream(fullFileName,
                                                        FileMode.OpenOrCreate, //@@@: FileMode.OpenOrCreate,
                                                        FileAccess.Read, //@@@: FileAccess.Read,
                                                        FileShare.None); //@@@: FileShare.None);
                                m_br = new BinaryReader(m_file); //@@@: m_br = new BinaryReader(m_file);
                                break; //@@@: break;
                            default: //@@@: default:
                                return false; //@@@: return false;
                        } //@@@: }
                        break; //@@@: break;
                    default: //@@@: default:
                        return false; //@@@: return false;
                } //@@@: }
                m_open = true; //@@@: m_open = true;
                return true; //@@@: return true;
            } //@@@: }
            catch (ex) { //@@@: catch (Exception ex)
                cError.mngError(ex, "open", c_module, ""); //@@@: cError.mngError(ex, "open", c_module, "");
                return false; //@@@: return false;
            } //@@@: }
        }; //@@@: }

        self.save = function(fullFileName, ) { //@@@: public bool save(string fullFileName,
                         bool exists, //@@@: out bool exists,
                         bool readOnly, //@@@: out bool readOnly,
                         string description) //@@@: string description)
        { //@@@: {
            exists = false; //@@@: exists = false;
            readOnly = false; //@@@: readOnly = false;

            if (fullFileName.Length === 0) { //@@@: if (fullFileName.Length == 0)
                fullFileName = " "; //@@@: fullFileName = " ";
            } //@@@: }
            if (userSearchFile(fullFileName, true, description, true, false)) { //@@@: if (userSearchFile(ref fullFileName, true, description, true, false))
                if (fullFileName.Length > 0) { //@@@: if (fullFileName.Length > 0)
                    let fi = new FileInfo(fullFileName); //@@@: FileInfo fi = new FileInfo(fullFileName);
                    exists = fi.Exists; //@@@: exists = fi.Exists;
                    if (exists) { //@@@: if (exists)
                        if ((fi.Attributes & FileAttributes.Normal //@@@: if ((fi.Attributes & FileAttributes.Normal
                             | fi.Attributes & FileAttributes.ReadOnly //@@@: | fi.Attributes & FileAttributes.ReadOnly
                             | fi.Attributes & FileAttributes.Archive) !== 0) { //@@@: | fi.Attributes & FileAttributes.Archive) != 0)
                            if ( !== 0) { //@@@: if ((fi.Attributes & FileAttributes.ReadOnly) != 0)
                                readOnly = true; //@@@: readOnly = true;
                            } //@@@: }
                        } //@@@: }
                        else { //@@@: else
                            exists = false; //@@@: exists = false;
                        } //@@@: }
                    } //@@@: }
                } //@@@: }
                else { //@@@: else
                    fullFileName = " "; //@@@: fullFileName = " ";
                    exists = false; //@@@: exists = false;
                } //@@@: }
            } //@@@: }
            return true; //@@@: return true;
        }; //@@@: }

        self.write = function(text) { //@@@: public bool write(string text)
            if (!m_open) return false; { //@@@: if (!m_open) return false;
            try { //@@@: try
                let tw = new StreamWriter(m_file); //@@@: TextWriter tw = new StreamWriter(m_file);
                tw.WriteLine(text); //@@@: tw.WriteLine(text);
                tw.Close(); //@@@: tw.Close();
                return true; //@@@: return true;
            } //@@@: }
            catch (ex) { //@@@: catch (Exception ex)
                cError.mngError(ex, "write", c_module, "failed writing text to file: " + m_path + Path.DirectorySeparatorChar + m_name); //@@@: cError.mngError(ex, "write", c_module, "failed writing text to file: " + m_path + Path.DirectorySeparatorChar + m_name);
                return false; //@@@: return false;
            } //@@@: }
        }; //@@@: }

        self.read = function(text, eof) { //@@@: public bool read(out string text, out bool eof)
            text = ""; //@@@: text = "";
            eof = false; //@@@: eof = false;
            if (!m_open) return false; { //@@@: if (!m_open) return false;
            try { //@@@: try

                if (m_tr === null) { //@@@: if (m_tr == null)
                    m_tr = new StreamReader(m_file); //@@@: m_tr = new StreamReader(m_file);
                } //@@@: }

                text = m_tr.ReadLine(); //@@@: text = m_tr.ReadLine();
                if (text === null) { //@@@: if (text == null)
                    eof = true; //@@@: eof = true;
                    text = ""; //@@@: text = "";
                    m_tr.Close(); //@@@: m_tr.Close();
                    m_tr = null; //@@@: m_tr = null;
                } //@@@: }
                return true; //@@@: return true;
            } //@@@: }
            catch (ex) { //@@@: catch (Exception ex)
                cError.mngError(ex, "read", c_module, "failed reading text from file: " + m_path + Path.DirectorySeparatorChar + m_name); //@@@: cError.mngError(ex, "read", c_module, "failed reading text from file: " + m_path + Path.DirectorySeparatorChar + m_name);
                return false; //@@@: return false;
            } //@@@: }
        }; //@@@: }

        self.binaryWrite = function(buffer) { //@@@: public bool binaryWrite(byte[] buffer)
            if (!m_open) return false; { //@@@: if (!m_open) return false;
            try { //@@@: try
                m_bw.Write(buffer); //@@@: m_bw.Write(buffer);
                return true; //@@@: return true;
            } //@@@: }
            catch (ex) { //@@@: catch (Exception ex)
                cError.mngError(ex, "binaryWrite", c_module, "failed writing in binary mode to file: " + m_path + Path.DirectorySeparatorChar + m_name); //@@@: cError.mngError(ex, "binaryWrite", c_module, "failed writing in binary mode to file: " + m_path + Path.DirectorySeparatorChar + m_name);
                return false; //@@@: return false;
            } //@@@: }
        }; //@@@: }

        self.binaryRead = function(buffer, eof) { //@@@: public bool binaryRead(out byte[] buffer, out bool eof)
            buffer = null; //@@@: buffer = null;
            eof = false; //@@@: eof = false;
            if (!m_open) return false; { //@@@: if (!m_open) return false;
            try { //@@@: try
                if (isEof) { //@@@: if (isEof)
                    eof = true; //@@@: eof = true;
                    buffer = null; //@@@: buffer = null;
                } //@@@: }
                else { //@@@: else
                    let bytesInFile = m_file.Length - m_file.Position; //@@@: long bytesInFile = m_file.Length - m_file.Position;
                    if (bytesInFile < buffer.Length) { //@@@: if (bytesInFile < buffer.Length)
                        buffer = new byte[bytesInFile]; //@@@: buffer = new byte[bytesInFile];
                    } //@@@: }
                    buffer = m_br.ReadBytes(buffer.Length); //@@@: buffer = m_br.ReadBytes(buffer.Length);
                } //@@@: }
                return true; //@@@: return true;
            } //@@@: }
            catch (ex) { //@@@: catch (Exception ex)
                cError.mngError(ex, "binaryRead", c_module, "failed reading in binary mode from file: " + m_path + Path.DirectorySeparatorChar + m_name); //@@@: cError.mngError(ex, "binaryRead", c_module, "failed reading in binary mode from file: " + m_path + Path.DirectorySeparatorChar + m_name);
                return false; //@@@: return false;
            } //@@@: }
        }; //@@@: }

        self.close = function() { //@@@: public void close()
            try { //@@@: try
                if (m_file !== null) { //@@@: if (m_file != null)
                    m_file.Close(); //@@@: m_file.Close();
                    if (m_br !== null) { //@@@: if (m_br != null)
                        m_br.Close(); //@@@: m_br.Close();
                        m_br = null; //@@@: m_br = null;
                    } //@@@: }
                    if (m_bw !== null) { //@@@: if (m_bw != null)
                        m_bw.Close(); //@@@: m_bw.Close();
                        m_bw = null; //@@@: m_bw = null;
                    } //@@@: }
                    m_file = null; //@@@: m_file = null;
                } //@@@: }
                m_open = false; //@@@: m_open = false;
            } //@@@: }
            catch (ex) { //@@@: catch (Exception ex)
                cError.mngError(ex, "binaryRead", c_module, "failed reading in binary mode from file: " + m_path + Path.DirectorySeparatorChar + m_name); //@@@: cError.mngError(ex, "binaryRead", c_module, "failed reading in binary mode from file: " + m_path + Path.DirectorySeparatorChar + m_name);
            } //@@@: }
        }; //@@@: }

        self.userSearchFile = function(fullFileName, ) { //@@@: public bool userSearchFile(ref string fullFileName,
                                   bool ifNotExistsIsOk, //@@@: bool ifNotExistsIsOk,
                                   string description, //@@@: string description,
                                   bool saving, //@@@: bool saving,
                                   bool canOpenOther) //@@@: bool canOpenOther)
        { //@@@: {
            let userFile = ""; //@@@: string userFile = "";
            let extValid = false; //@@@: bool extValid = false;
            let nameValid = false; //@@@: bool nameValid = false;
            let exists = false; //@@@: bool exists = false;

            do { //@@@: do

                if (showOpenFileDlg(userFile, //@@@: if (showOpenFileDlg(out userFile,
                                    getFileExt(fullFileName), //@@@: getFileExt(fullFileName),
                                    getFileName(fullFileName), //@@@: getFileName(fullFileName),
                                    getPath(fullFileName), //@@@: getPath(fullFileName),
                                    description, //@@@: description,
                                    saving)) { //@@@: saving))

                    exists = fileExists(userFile); //@@@: exists = fileExists(userFile);

                    if (exists || ifNotExistsIsOk) { //@@@: if (exists || ifNotExistsIsOk)
                        if (fullFileName === " " || getFileWithoutExt(fullFileName) === "*") { //@@@: if (fullFileName == " " || getFileWithoutExt(fullFileName) == "*")
                            nameValid = true; //@@@: nameValid = true;
                        } //@@@: }
                        else if (ifNotExistsIsOk //@@@: else if (ifNotExistsIsOk
                                || canOpenOther //@@@: || canOpenOther
                                || getFileWithoutExt(fullFileName) === getFileWithoutExt(userFile)) { //@@@: || getFileWithoutExt(fullFileName) == getFileWithoutExt(userFile))
                            nameValid = true; //@@@: nameValid = true;
                        } //@@@: }
                        if (nameValid) { //@@@: if (nameValid)
                            if (fullFileName === " " || getFileExt(fullFileName) === "*") { //@@@: if (fullFileName == " " || getFileExt(fullFileName) == "*")
                                extValid = true; //@@@: extValid = true;
                            } //@@@: }
                            else if (ifNotExistsIsOk || getFileExt(fullFileName) === getFileExt(userFile)) { //@@@: else if (ifNotExistsIsOk || getFileExt(fullFileName) == getFileExt(userFile))
                                extValid = true; //@@@: extValid = true;
                            } //@@@: }
                            if (extValid && nameValid && (exists || ifNotExistsIsOk)) { //@@@: if (extValid && nameValid && (exists || ifNotExistsIsOk))
                                break; //@@@: break;
                            } //@@@: }
                            else { //@@@: else
                                nameValid = false; //@@@: nameValid = false;
                                extValid = false; //@@@: extValid = false;
                            } //@@@: }
                        } //@@@: }

                    } //@@@: }
                } //@@@: }
                else { //@@@: else
                    return false; //@@@: return false;
                } //@@@: }

            } while (true); //@@@: } while (true);

            m_curPath = getPath(userFile); //@@@: m_curPath = getPath(userFile);
            fullFileName = userFile; //@@@: fullFileName = userFile;
            m_name = getFileName(userFile); //@@@: m_name = getFileName(userFile);
            m_path = getPath(userFile); //@@@: m_path = getPath(userFile);

            return true; //@@@: return true;
        }; //@@@: }

        self.showOpenFileDlg = function(userFile, ) { //@@@: public bool showOpenFileDlg(out string userFile,
                                    string filter, //@@@: string filter,
                                    string fileToSearch, //@@@: string fileToSearch,
                                    string curDir, //@@@: string curDir,
                                    string title, //@@@: string title,
                                    bool saving) //@@@: bool saving)
        { //@@@: {
            userFile = ""; //@@@: userFile = "";
            let fd = m_commDialog as FileDialog; //@@@: FileDialog fd = m_commDialog as FileDialog;
            if (curDir.Length > 0 && curDir !== " ") { //@@@: if (curDir.Length > 0 && curDir != " ")
                let di = new DirectoryInfo(curDir); //@@@: DirectoryInfo di = new DirectoryInfo(curDir);
                if (di.Exists) { //@@@: if (di.Exists)
                    fd.InitialDirectory = curDir; //@@@: fd.InitialDirectory = curDir;
                } //@@@: }
            } //@@@: }
            if (fileToSearch !== " ." && (fileToSearch.Length < 2 || fileToSearch.Substring(0, 2) !== "*.")) { //@@@: if (fileToSearch != " ." && (fileToSearch.Length < 2 || fileToSearch.Substring(0, 2) != "*."))
                fd.FileName = fileToSearch; //@@@: fd.FileName = fileToSearch;
            } //@@@: }
            else { //@@@: else
                fd.FileName = ""; //@@@: fd.FileName = "";
            } //@@@: }
            if (m_filter.Length > 0) { //@@@: if (m_filter.Length > 0)
                fd.Filter = m_filter; //@@@: fd.Filter = m_filter;
            } //@@@: }
            else if (filter.Length > 0) { //@@@: else if (filter.Length > 0)
                fd.Filter = filter; //@@@: fd.Filter = filter;
            } //@@@: }
            fd.Title = title; //@@@: fd.Title = title;
            if (saving) { //@@@: if (saving)
                let fs = m_commDialog as SaveFileDialog; //@@@: SaveFileDialog fs = m_commDialog as SaveFileDialog;
                if (fs.ShowDialog() === DialogResult.OK) { //@@@: if (fs.ShowDialog() == DialogResult.OK)
                    userFile = fs.FileName; //@@@: userFile = fs.FileName;
                    return true; //@@@: return true;
                } //@@@: }
                else  { //@@@: else
                    return false; //@@@: return false;
                } //@@@: }
            } //@@@: }
            else { //@@@: else
                let fc = m_commDialog as OpenFileDialog; //@@@: OpenFileDialog fc = m_commDialog as OpenFileDialog;
                if (fc.ShowDialog() === DialogResult.OK) { //@@@: if (fc.ShowDialog() == DialogResult.OK)
                    userFile = fc.FileName; //@@@: userFile = fc.FileName;
                    return true; //@@@: return true;
                } //@@@: }
                else  { //@@@: else
                    return false; //@@@: return false;
                } //@@@: }
            } //@@@: }
        }; //@@@: }

        self.getFileName = function(fullFileName) { //@@@: public static string getFileName(string fullFileName)
            return getFileWithoutExt(fullFileName) + "." + getFileExt(fullFileName); //@@@: return getFileWithoutExt(fullFileName) + "." + getFileExt(fullFileName);
        }; //@@@: }

        self.getFileExt = function(fullFileName) { //@@@: public static string getFileExt(string fullFileName)
            let path = ""; //@@@: string path = "";
            let fileName = ""; //@@@: string fileName = "";
            let sepPos = 0; //@@@: int sepPos = 0;
            let sep = ""; //@@@: string sep = "";

            getPathAndFileName(fullFileName, path, fileName); //@@@: getPathAndFileName(fullFileName, out path, out fileName);
            sepPos = fileName.Length; //@@@: sepPos = fileName.Length;

            if (sepPos === 0) { //@@@: if (sepPos == 0)
                return ""; //@@@: return "";
            } //@@@: }
            else { //@@@: else
                sepPos -= 1; //@@@: sepPos -= 1;
                sep = fileName.Substring(sepPos, 1); //@@@: sep = fileName.Substring(sepPos, 1);
                while (sep !== ".") { //@@@: while (sep != ".")
                    sepPos--; //@@@: sepPos--;
                    if (sepPos < 0) break; { //@@@: if (sepPos < 0) break;
                    sep = fileName.Substring(sepPos, 1); //@@@: sep = fileName.Substring(sepPos, 1);
                } //@@@: }
                if (sepPos < 0) { //@@@: if (sepPos < 0)
                    return ""; //@@@: return "";
                } //@@@: }
                else { //@@@: else
                    return fileName.Substring(sepPos + 1); //@@@: return fileName.Substring(sepPos + 1);
                } //@@@: }
            } //@@@: }
        }; //@@@: }

        self.getFileWithoutExt = function(fullFileName) { //@@@: public static string getFileWithoutExt(string fullFileName)
            let path = ""; //@@@: string path = "";
            let fileName = ""; //@@@: string fileName = "";
            let sepPos = 0; //@@@: int sepPos = 0;
            let sep = ""; //@@@: string sep = "";

            getPathAndFileName(fullFileName, path, fileName); //@@@: getPathAndFileName(fullFileName, out path, out fileName);
            sepPos = fileName.Length; //@@@: sepPos = fileName.Length;

            if (sepPos === 0) { //@@@: if (sepPos == 0)
                return fileName; //@@@: return fileName;
            } //@@@: }

            sepPos -= 1; //@@@: sepPos -= 1;
            sep = fileName.Substring(sepPos, 1); //@@@: sep = fileName.Substring(sepPos, 1);
            while (sep !== ".") { //@@@: while (sep != ".")
                sepPos--; //@@@: sepPos--;
                if (sepPos < 0) break; { //@@@: if (sepPos < 0) break;
                sep = fileName.Substring(sepPos, 1); //@@@: sep = fileName.Substring(sepPos, 1);
            } //@@@: }
            if (sepPos < 0) { //@@@: if (sepPos < 0)
                return fileName; //@@@: return fileName;
            } //@@@: }
            else { //@@@: else
                return fileName.Substring(0, sepPos); //@@@: return fileName.Substring(0, sepPos);
            } //@@@: }
        }; //@@@: }

        self.getPath = function(fullFileName) { //@@@: public static string getPath(string fullFileName)
            let path = ""; //@@@: string path = "";
            let fileName = ""; //@@@: string fileName = "";

            getPathAndFileName(fullFileName, path, fileName); //@@@: getPathAndFileName(fullFileName, out path, out fileName);
            return path; //@@@: return path;
        }; //@@@: }

        self.getPathAndFileName = function(fullFileName, ) { //@@@: public static void getPathAndFileName(string fullFileName,
                                              string path, //@@@: out string path,
                                              string fileName) //@@@: out string fileName)
        { //@@@: {
            let sepPos = 0; //@@@: int sepPos = 0;
            let sep = ""; //@@@: string sep = "";

            sepPos = fullFileName.Length; //@@@: sepPos = fullFileName.Length;
            if (sepPos === 0) { //@@@: if (sepPos == 0)
                path = ""; //@@@: path = "";
                fileName = ""; //@@@: fileName = "";
            } //@@@: }
            else { //@@@: else
                sepPos -= 1; //@@@: sepPos -= 1;
                sep = fullFileName.Substring(sepPos, 1); //@@@: sep = fullFileName.Substring(sepPos, 1);
                while (!isSeparator(sep)) { //@@@: while (!isSeparator(sep))
                    sepPos--; //@@@: sepPos--;
                    if (sepPos < 0) break; { //@@@: if (sepPos < 0) break;
                    sep = fullFileName.Substring(sepPos, 1); //@@@: sep = fullFileName.Substring(sepPos, 1);
                } //@@@: }
                if (sepPos === fullFileName.Length - 1) { //@@@: if (sepPos == fullFileName.Length - 1)
                    // case when fullFileName is c:\ or d:\ etc.
                    path = fullFileName.Substring(0, sepPos); //@@@: path = fullFileName.Substring(0, sepPos);
                    fileName = fullFileName; //@@@: fileName = fullFileName;
                } //@@@: }
                else if (sepPos < 0) { //@@@: else if (sepPos < 0)
                    // case when fullFileName is c: or d: etc.
                    path = fullFileName; //@@@: path = fullFileName;
                    fileName = fullFileName; //@@@: fileName = fullFileName;
                } //@@@: }
                else { //@@@: else
                    path = fullFileName.Substring(0, sepPos); //@@@: path = fullFileName.Substring(0, sepPos);
                    fileName = fullFileName.Substring(sepPos + 1); //@@@: fileName = fullFileName.Substring(sepPos + 1);
                } //@@@: }
            } //@@@: }
        }; //@@@: }

        self.copyFile = function(fullFileNameSource, fullFileNameDestination) { //@@@: public static bool copyFile(string fullFileNameSource, string fullFileNameDestination)
            try { //@@@: try
                File.Copy(fullFileNameSource, fullFileNameDestination); //@@@: File.Copy(fullFileNameSource, fullFileNameDestination);
                return true; //@@@: return true;
            } //@@@: }
            catch (ex) { //@@@: catch (Exception ex)
                cError.mngError(ex, "copyFile", c_module, "failed copying [" + fullFileNameSource + "] to [" + fullFileNameDestination + "]"); //@@@: cError.mngError(ex, "copyFile", c_module, "failed copying [" + fullFileNameSource + "] to [" + fullFileNameDestination + "]");
                return false; //@@@: return false;
            } //@@@: }
        }; //@@@: }

        const isSeparator = function(character) { //@@@: private static bool isSeparator(string character)
            switch (character) //@@@: switch (character)
            { //@@@: {
                case c_sep_dir: //@@@: case c_sep_dir:
                    return true; //@@@: return true;
                case c_sep_diralt: //@@@: case c_sep_diralt:
                    return true; //@@@: return true;
                default: //@@@: default:
                    return false; //@@@: return false;
            } //@@@: }
        }; //@@@: }

        const fileExists = function(fullFileName) { //@@@: private static bool fileExists(string fullFileName)
            try { //@@@: try
                if (fullFileName === "\\ .") { //@@@: if (fullFileName == "\\ .")
                    return false; //@@@: return false;
                } //@@@: }
                else  { //@@@: else
                    let fi = new FileInfo(fullFileName); //@@@: FileInfo fi = new FileInfo(fullFileName);
                    return fi.Exists;                 //@@@: return fi.Exists;
                } //@@@: }
            } //@@@: }
            catch (ex) { //@@@: catch (Exception ex) {
                return false; //@@@: return false;
            } //@@@: }
        }; //@@@: }

        const cFile = function() { //@@@: public cFile()
        }; //@@@: }
        return self;

    } //@@@: }
}(globalObject)); //@@@: }
