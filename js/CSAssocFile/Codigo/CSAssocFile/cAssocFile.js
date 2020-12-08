(function(globalObject) {

    globalObject.CSAssocFile = globalObject.CSAssocFile || {}; //@@@: namespace CSAssocFile
 //@@@: {
    globalObject.CSAssocFile.createCAssocFile = function() {

        const self = {}; //@@@: public class cAssocFile

        [DllImport("shell32.dll", EntryPoint="FindExecutable")]  //@@@: [DllImport("shell32.dll", EntryPoint="FindExecutable")]
            self. = function(lpFile, lpDirectory, lpResult) { //@@@: public static extern long FindExecutableA(string lpFile, string lpDirectory, StringBuilder lpResult);

        [DllImport("shell32.dll")] //@@@: [DllImport("shell32.dll")]
        static extern void SHChangeNotify(HChangeNotifyEventID wEventId, //@@@: static extern void SHChangeNotify(HChangeNotifyEventID wEventId,
                                           HChangeNotifyFlags uFlags, //@@@: HChangeNotifyFlags uFlags,
                                           IntPtr dwItem1, //@@@: IntPtr dwItem1,
                                           IntPtr dwItem2); //@@@: IntPtr dwItem2);

        const C_CROWSOFTKEY_EXTENSIONS = "SOFTWARE\\CrowSoft\\Extensions"; //@@@: private const String C_CROWSOFTKEY_EXTENSIONS = "SOFTWARE\\CrowSoft\\Extensions";
        let m_question = null; //@@@: private String m_question;
        let m_yesButton = null; //@@@: private String m_yesButton;
        let m_noButton = null; //@@@: private String m_noButton;
        let m_dontAsk = null; //@@@: private String m_dontAsk;

UNKNOWN >>         public String question //@@@: public String question
        { //@@@: {
UNKNOWN >>             set //@@@: set
            { //@@@: {
                m_question = value; //@@@: m_question = value;
            } //@@@: }
        }; //@@@: }

UNKNOWN >>         public String yesButton //@@@: public String yesButton
        { //@@@: {
UNKNOWN >>             set //@@@: set
            { //@@@: {
                m_yesButton = value; //@@@: m_yesButton = value;
            } //@@@: }
        } //@@@: }

UNKNOWN >>         public String noButton //@@@: public String noButton
        { //@@@: {
UNKNOWN >>             set //@@@: set
            { //@@@: {
                m_noButton = value; //@@@: m_noButton = value;
            } //@@@: }
        } //@@@: }

UNKNOWN >>         public String dontAsk //@@@: public String dontAsk
        { //@@@: {
UNKNOWN >>             set //@@@: set
            { //@@@: {
                m_dontAsk = value; //@@@: m_dontAsk = value;
            } //@@@: }
        } //@@@: }

        self.getLongFileName = function(fullFileName) { //@@@: public String getLongFileName(String fullFileName)
            return Path.GetFullPath(fullFileName); //@@@: return Path.GetFullPath(fullFileName);
        }; //@@@: }

        self.getAssociatedApp = function(fullFileName) { //@@@: public String getAssociatedApp(String fullFileName)
            return findExecutable(fullFileName); //@@@: return findExecutable(fullFileName);
        }; //@@@: }

        const findExecutable = function(pv_strFilename) { //@@@: private string findExecutable(string pv_strFilename)
            let objResultBuffer = new StringBuilder(1024); //@@@: StringBuilder objResultBuffer = new StringBuilder(1024);
            let lngResult = 0; //@@@: long lngResult = 0;

            lngResult = FindExecutableA(pv_strFilename, string.Empty, objResultBuffer); //@@@: lngResult = FindExecutableA(pv_strFilename, string.Empty, objResultBuffer);

            if(lngResult >= 32) { //@@@: if(lngResult >= 32)
                return objResultBuffer.ToString(); //@@@: return objResultBuffer.ToString();
            } //@@@: }
            else { //@@@: else
                return string.Format("Error: ({0})", lngResult); //@@@: return string.Format("Error: ({0})", lngResult);
            } //@@@: }
        }; //@@@: }

        self.associateFileExtension = function( //@@@: public void associateFileExtension(
            extension,  //@@@: String extension,
            pathToExecute,  //@@@: String pathToExecute,
            applicationName) { //@@@: String applicationName)
            //' extension is three letters without the "."
            //' pathToExecute is full path to exe file
            //' application Name is any name you want as description of Extension

UNKNOWN >>             String sKeyName;        // Holds Key Name in registry. //@@@: String sKeyName;        // Holds Key Name in registry.
UNKNOWN >>             String sKeyValue;       // Holds Key Value in registry. //@@@: String sKeyValue;       // Holds Key Value in registry.

            if (!extension.Contains(".")) { //@@@: if (!extension.Contains("."))
                //' This creates a Root entry for the extension to be associated with ' ApplicationName' .
                sKeyName = "." + extension; //@@@: sKeyName = "." + extension;
                sKeyValue = applicationName; //@@@: sKeyValue = applicationName;
                let rKey = Registry.ClassesRoot.CreateSubKey(sKeyName); //@@@: RegistryKey rKey = Registry.ClassesRoot.CreateSubKey(sKeyName);
                rKey.SetValue(sKeyName, sKeyValue); //@@@: rKey.SetValue(sKeyName, sKeyValue);

                //' This creates a Root entry called ' ApplicationName' .
                sKeyName = applicationName; //@@@: sKeyName = applicationName;
                sKeyValue = applicationName; //@@@: sKeyValue = applicationName;
                let rKeyApp = Registry.ClassesRoot.CreateSubKey(sKeyName); //@@@: RegistryKey rKeyApp = Registry.ClassesRoot.CreateSubKey(sKeyName);
                rKeyApp.SetValue(sKeyName, sKeyValue); //@@@: rKeyApp.SetValue(sKeyName, sKeyValue);

                //' This sets the command line for ' ApplicationName' .
                sKeyName = applicationName; //@@@: sKeyName = applicationName;
                sKeyValue = "\"" + pathToExecute + "\" %1"; //@@@: sKeyValue = "\"" + pathToExecute + "\" %1";
                rKey = rKeyApp.CreateSubKey("shell\\open\\command"); //@@@: rKey = rKeyApp.CreateSubKey("shell\\open\\command");
                rKey.SetValue(sKeyName, sKeyValue); //@@@: rKey.SetValue(sKeyName, sKeyValue);

                //' This sets the default icon
                sKeyName = applicationName; //@@@: sKeyName = applicationName;
                sKeyValue = "\"" + pathToExecute + "\",0"; //@@@: sKeyValue = "\"" + pathToExecute + "\",0";
                rKey = rKeyApp.CreateSubKey("DefaultIcon"); //@@@: rKey = rKeyApp.CreateSubKey("DefaultIcon");
                rKey.SetValue(sKeyName, sKeyValue); //@@@: rKey.SetValue(sKeyName, sKeyValue);

                SHChangeNotify(HChangeNotifyEventID.SHCNE_ASSOCCHANGED, HChangeNotifyFlags.SHCNF_IDLIST, IntPtr.Zero, IntPtr.Zero); //@@@: SHChangeNotify(HChangeNotifyEventID.SHCNE_ASSOCCHANGED, HChangeNotifyFlags.SHCNF_IDLIST, IntPtr.Zero, IntPtr.Zero);
            } //@@@: }
        }; //@@@: }

        self.unAssociateFileExtension = function( //@@@: public void unAssociateFileExtension(
            extension,  //@@@: String extension,
            applicationName) { //@@@: String applicationName)
UNKNOWN >>             String sKeyName;   // Finds Key Name in registry. //@@@: String sKeyName;   // Finds Key Name in registry.

            if (!extension.Contains(".")) { //@@@: if (!extension.Contains("."))
                //' This deletes the default icon
                sKeyName = applicationName; //@@@: sKeyName = applicationName;
                Registry.ClassesRoot.DeleteSubKey(sKeyName + "\\DefaultIcon"); //@@@: Registry.ClassesRoot.DeleteSubKey(sKeyName + "\\DefaultIcon");

                //' This deletes the command line for "ApplicationName".
                Registry.ClassesRoot.DeleteSubKey(sKeyName + "\\shell\\open\\command"); //@@@: Registry.ClassesRoot.DeleteSubKey(sKeyName + "\\shell\\open\\command");

                //' This deletes a Root entry called "ApplicationName".
                Registry.ClassesRoot.DeleteSubKey(sKeyName + "\\shell\\open"); //@@@: Registry.ClassesRoot.DeleteSubKey(sKeyName + "\\shell\\open");

                //' This deletes a Root entry called "ApplicationName".
                Registry.ClassesRoot.DeleteSubKey(sKeyName + "\\shell"); //@@@: Registry.ClassesRoot.DeleteSubKey(sKeyName + "\\shell");

                //' This deletes a Root entry called "ApplicationName".
                Registry.ClassesRoot.DeleteSubKey(sKeyName); //@@@: Registry.ClassesRoot.DeleteSubKey(sKeyName);

                //' This deletes the Root entry for the extension to be associated with "ApplicationName".
                sKeyName = "." + extension; //@@@: sKeyName = "." + extension;
                Registry.ClassesRoot.DeleteSubKey(sKeyName); //@@@: Registry.ClassesRoot.DeleteSubKey(sKeyName);

                SHChangeNotify(HChangeNotifyEventID.SHCNE_ASSOCCHANGED, HChangeNotifyFlags.SHCNF_IDLIST, IntPtr.Zero, IntPtr.Zero); //@@@: SHChangeNotify(HChangeNotifyEventID.SHCNE_ASSOCCHANGED, HChangeNotifyFlags.SHCNF_IDLIST, IntPtr.Zero, IntPtr.Zero);
            }             //@@@: }
        }; //@@@: }

        self.validateAssociation = function( //@@@: public bool validateAssociation(
            extension,  //@@@: String extension,
            pathToExecute,  //@@@: String pathToExecute,
            applicationName) { //@@@: String applicationName)

UNKNOWN >>             String longPathToExecute;        //@@@: String longPathToExecute;
UNKNOWN >>             String longPathAssociated; //@@@: String longPathAssociated;

            longPathToExecute = getLongFileName(pathToExecute); //@@@: longPathToExecute = getLongFileName(pathToExecute);
            longPathAssociated = getLongFileName(getAssociatedApp(getTempFile(extension))); //@@@: longPathAssociated = getLongFileName(getAssociatedApp(getTempFile(extension)));

            delTempFile (extension); //@@@: delTempFile (extension);

            if (longPathToExecute !== longPathAssociated) { //@@@: if (longPathToExecute != longPathAssociated)
                if (ask(extension, pathToExecute)) { //@@@: if (ask(extension, pathToExecute))
                    let f = new fAsk(); //@@@: fAsk f = new fAsk();
                    f.question = m_question.Replace("%1", extension); //@@@: f.question = m_question.Replace("%1", extension);
                    f.dontAsk = m_dontAsk; //@@@: f.dontAsk = m_dontAsk;
                    f.noButton = m_noButton; //@@@: f.noButton = m_noButton;
                    f.yesButton = m_yesButton; //@@@: f.yesButton = m_yesButton;

                    f.ShowDialog(); //@@@: f.ShowDialog();

                    if (f.result) { //@@@: if (f.result)
                        associateFileExtension(extension, pathToExecute, applicationName); //@@@: associateFileExtension(extension, pathToExecute, applicationName);
                        return true; //@@@: return true;
                    } //@@@: }
                    else { //@@@: else
                        if (f.dontAskAgain) { //@@@: if (f.dontAskAgain)
                            saveNotAsk(extension, pathToExecute); //@@@: saveNotAsk(extension, pathToExecute);
                        } //@@@: }
                        return false; //@@@: return false;
                    } //@@@: }
                } //@@@: }
                else  { //@@@: else
                    return false; //@@@: return false;
                } //@@@: }
            } //@@@: }
            else { //@@@: else
                return true; //@@@: return true;
            } //@@@: }
        }; //@@@: }

        const ask = function(extension, pathToExecute) { //@@@: private bool ask(String extension, String pathToExecute)
            let rKey = Registry.CurrentUser.OpenSubKey(C_CROWSOFTKEY_EXTENSIONS); //@@@: RegistryKey rKey = Registry.CurrentUser.OpenSubKey(C_CROWSOFTKEY_EXTENSIONS);
            let keyVal = rKey.GetValue(extension); //@@@: String keyVal = (String)rKey.GetValue(extension);
            if (keyVal === null) { //@@@: if (keyVal == null)
                return false; //@@@: return false;
            else { //@@@: else
                return keyVal.ToLower().Contains(pathToExecute.ToLower()); //@@@: return keyVal.ToLower().Contains(pathToExecute.ToLower());
        }; //@@@: }

        const saveNotAsk = function( //@@@: private void saveNotAsk(
            extension,  //@@@: String extension,
            pathToExecute) { //@@@: String pathToExecute)
            let rKey = Registry.CurrentUser.OpenSubKey(C_CROWSOFTKEY_EXTENSIONS); //@@@: RegistryKey rKey = Registry.CurrentUser.OpenSubKey(C_CROWSOFTKEY_EXTENSIONS);
            let keyVal = rKey.GetValue(extension); //@@@: String keyVal = (String)rKey.GetValue(extension);
            if (keyVal === null) { //@@@: if (keyVal == null)
                keyVal = ""; //@@@: keyVal = "";
            rKey.SetValue(extension, keyVal + pathToExecute + "|", RegistryValueKind.String); //@@@: rKey.SetValue(extension, keyVal + pathToExecute + "|", RegistryValueKind.String);
        }; //@@@: }

        const getTempFile = function(extension) { //@@@: private String getTempFile(String extension)
UNKNOWN >>             String strFile; //@@@: String strFile;
            strFile = Path.GetTempPath() + "_Aux_Asoc_." + extension; //@@@: strFile = Path.GetTempPath() + "_Aux_Asoc_." + extension;
            try { //@@@: try
                let writer = new StreamWriter(strFile); //@@@: StreamWriter writer = new StreamWriter(strFile);
                writer.Close(); //@@@: writer.Close();
                return strFile; //@@@: return strFile;
            } //@@@: }
            catch(ex) { //@@@: catch(Exception ex)
                return ""; //@@@: return "";
            } //@@@: }
        }; //@@@: }

        const delTempFile = function(extension) { //@@@: private void delTempFile(String extension)
            let file = getTempFile(extension); //@@@: String file = getTempFile(extension);
            if (File.Exists(file)) { //@@@: if (File.Exists(file))
                File.Delete(file); //@@@: File.Delete(file);
            } //@@@: }
        };     //@@@: }
        return self;

    } //@@@: }

UNKNOWN >>         return self;

    #region enum HChangeNotifyEventID //@@@: #region enum HChangeNotifyEventID
        return self;

    /// <summary>
        return self;

    /// Describes the event that has occurred. 
        return self;

    /// Typically, only one event is specified at a time. 
        return self;

    /// If more than one event is specified, the values contained 
        return self;

    /// in the <i>dwItem1</i> and <i>dwItem2</i> 
        return self;

    /// parameters must be the same, respectively, for all specified events. 
        return self;

    /// This parameter can be one or more of the following values. 
        return self;

    /// </summary>
        return self;

    /// <remarks>
        return self;

    /// <para><b>Windows NT/2000/XP:</b> <i>dwItem2</i> contains the index 
        return self;

    /// in the system image list that has changed. 
        return self;

    /// <i>dwItem1</i> is not used and should be <see langword="null"/>.</para>
        return self;

    /// <para><b>Windows 95/98:</b> <i>dwItem1</i> contains the index 
        return self;

    /// in the system image list that has changed. 
        return self;

    /// <i>dwItem2</i> is not used and should be <see langword="null"/>.</para>
        return self;

    /// </remarks>
        return self;

    [Flags] //@@@: [Flags]
UNKNOWN >>         return self;

    enum HChangeNotifyEventID //@@@: enum HChangeNotifyEventID
    { //@@@: {
        /// <summary>
        /// All events have occurred. 
        /// </summary>
        SHCNE_ALLEVENTS = 0x7FFFFFFF, //@@@: SHCNE_ALLEVENTS = 0x7FFFFFFF,

        /// <summary>
        /// A file type association has changed. <see cref="HChangeNotifyFlags.SHCNF_IDLIST"/> 
        /// must be specified in the <i>uFlags</i> parameter. 
        /// <i>dwItem1</i> and <i>dwItem2</i> are not used and must be <see langword="null"/>. 
        /// </summary>
        SHCNE_ASSOCCHANGED = 0x08000000, //@@@: SHCNE_ASSOCCHANGED = 0x08000000,

        /// <summary>
        /// The attributes of an item or folder have changed. 
        /// <see cref="HChangeNotifyFlags.SHCNF_IDLIST"/> or 
        /// <see cref="HChangeNotifyFlags.SHCNF_PATH"/> must be specified in <i>uFlags</i>. 
        /// <i>dwItem1</i> contains the item or folder that has changed. 
        /// <i>dwItem2</i> is not used and should be <see langword="null"/>.
        /// </summary>
        SHCNE_ATTRIBUTES = 0x00000800, //@@@: SHCNE_ATTRIBUTES = 0x00000800,

        /// <summary>
        /// A nonfolder item has been created. 
        /// <see cref="HChangeNotifyFlags.SHCNF_IDLIST"/> or 
        /// <see cref="HChangeNotifyFlags.SHCNF_PATH"/> must be specified in <i>uFlags</i>. 
        /// <i>dwItem1</i> contains the item that was created. 
        /// <i>dwItem2</i> is not used and should be <see langword="null"/>.
        /// </summary>
        SHCNE_CREATE = 0x00000002, //@@@: SHCNE_CREATE = 0x00000002,

        /// <summary>
        /// A nonfolder item has been deleted. 
        /// <see cref="HChangeNotifyFlags.SHCNF_IDLIST"/> or 
        /// <see cref="HChangeNotifyFlags.SHCNF_PATH"/> must be specified in <i>uFlags</i>. 
        /// <i>dwItem1</i> contains the item that was deleted. 
        /// <i>dwItem2</i> is not used and should be <see langword="null"/>. 
        /// </summary>
        SHCNE_DELETE = 0x00000004, //@@@: SHCNE_DELETE = 0x00000004,

        /// <summary>
        /// A drive has been added. 
        /// <see cref="HChangeNotifyFlags.SHCNF_IDLIST"/> or 
        /// <see cref="HChangeNotifyFlags.SHCNF_PATH"/> must be specified in <i>uFlags</i>. 
        /// <i>dwItem1</i> contains the root of the drive that was added. 
        /// <i>dwItem2</i> is not used and should be <see langword="null"/>. 
        /// </summary>
        SHCNE_DRIVEADD = 0x00000100, //@@@: SHCNE_DRIVEADD = 0x00000100,

        /// <summary>
        /// A drive has been added and the Shell should create a new window for the drive. 
        /// <see cref="HChangeNotifyFlags.SHCNF_IDLIST"/> or 
        /// <see cref="HChangeNotifyFlags.SHCNF_PATH"/> must be specified in <i>uFlags</i>. 
        /// <i>dwItem1</i> contains the root of the drive that was added. 
        /// <i>dwItem2</i> is not used and should be <see langword="null"/>. 
        /// </summary>
        SHCNE_DRIVEADDGUI = 0x00010000, //@@@: SHCNE_DRIVEADDGUI = 0x00010000,

        /// <summary>
        /// A drive has been removed. <see cref="HChangeNotifyFlags.SHCNF_IDLIST"/> or
        /// <see cref="HChangeNotifyFlags.SHCNF_PATH"/> must be specified in <i>uFlags</i>. 
        /// <i>dwItem1</i> contains the root of the drive that was removed.
        /// <i>dwItem2</i> is not used and should be <see langword="null"/>. 
        /// </summary>
        SHCNE_DRIVEREMOVED = 0x00000080, //@@@: SHCNE_DRIVEREMOVED = 0x00000080,

        /// <summary>
        /// Not currently used. 
        /// </summary>
        SHCNE_EXTENDED_EVENT = 0x04000000, //@@@: SHCNE_EXTENDED_EVENT = 0x04000000,

        /// <summary>
        /// The amount of free space on a drive has changed. 
        /// <see cref="HChangeNotifyFlags.SHCNF_IDLIST"/> or 
        /// <see cref="HChangeNotifyFlags.SHCNF_PATH"/> must be specified in <i>uFlags</i>. 
        /// <i>dwItem1</i> contains the root of the drive on which the free space changed.
        /// <i>dwItem2</i> is not used and should be <see langword="null"/>. 
        /// </summary>
        SHCNE_FREESPACE = 0x00040000, //@@@: SHCNE_FREESPACE = 0x00040000,

        /// <summary>
        /// Storage media has been inserted into a drive. 
        /// <see cref="HChangeNotifyFlags.SHCNF_IDLIST"/> or 
        /// <see cref="HChangeNotifyFlags.SHCNF_PATH"/> must be specified in <i>uFlags</i>. 
        /// <i>dwItem1</i> contains the root of the drive that contains the new media.
        /// <i>dwItem2</i> is not used and should be <see langword="null"/>. 
        /// </summary>
        SHCNE_MEDIAINSERTED = 0x00000020, //@@@: SHCNE_MEDIAINSERTED = 0x00000020,

        /// <summary>
        /// Storage media has been removed from a drive. 
        /// <see cref="HChangeNotifyFlags.SHCNF_IDLIST"/> or 
        /// <see cref="HChangeNotifyFlags.SHCNF_PATH"/> must be specified in <i>uFlags</i>. 
        /// <i>dwItem1</i> contains the root of the drive from which the media was removed. 
        /// <i>dwItem2</i> is not used and should be <see langword="null"/>. 
        /// </summary>
        SHCNE_MEDIAREMOVED = 0x00000040, //@@@: SHCNE_MEDIAREMOVED = 0x00000040,

        /// <summary>
        /// A folder has been created. <see cref="HChangeNotifyFlags.SHCNF_IDLIST"/> 
        /// or <see cref="HChangeNotifyFlags.SHCNF_PATH"/> must be specified in <i>uFlags</i>. 
        /// <i>dwItem1</i> contains the folder that was created. 
        /// <i>dwItem2</i> is not used and should be <see langword="null"/>. 
        /// </summary>
        SHCNE_MKDIR = 0x00000008, //@@@: SHCNE_MKDIR = 0x00000008,

        /// <summary>
        /// A folder on the local computer is being shared via the network. 
        /// <see cref="HChangeNotifyFlags.SHCNF_IDLIST"/> or 
        /// <see cref="HChangeNotifyFlags.SHCNF_PATH"/> must be specified in <i>uFlags</i>. 
        /// <i>dwItem1</i> contains the folder that is being shared. 
        /// <i>dwItem2</i> is not used and should be <see langword="null"/>. 
        /// </summary>
        SHCNE_NETSHARE = 0x00000200, //@@@: SHCNE_NETSHARE = 0x00000200,

        /// <summary>
        /// A folder on the local computer is no longer being shared via the network. 
        /// <see cref="HChangeNotifyFlags.SHCNF_IDLIST"/> or 
        /// <see cref="HChangeNotifyFlags.SHCNF_PATH"/> must be specified in <i>uFlags</i>. 
        /// <i>dwItem1</i> contains the folder that is no longer being shared. 
        /// <i>dwItem2</i> is not used and should be <see langword="null"/>. 
        /// </summary>
        SHCNE_NETUNSHARE = 0x00000400, //@@@: SHCNE_NETUNSHARE = 0x00000400,

        /// <summary>
        /// The name of a folder has changed. 
        /// <see cref="HChangeNotifyFlags.SHCNF_IDLIST"/> or 
        /// <see cref="HChangeNotifyFlags.SHCNF_PATH"/> must be specified in <i>uFlags</i>. 
        /// <i>dwItem1</i> contains the previous pointer to an item identifier list (PIDL) or name of the folder. 
        /// <i>dwItem2</i> contains the new PIDL or name of the folder. 
        /// </summary>
        SHCNE_RENAMEFOLDER = 0x00020000, //@@@: SHCNE_RENAMEFOLDER = 0x00020000,

        /// <summary>
        /// The name of a nonfolder item has changed. 
        /// <see cref="HChangeNotifyFlags.SHCNF_IDLIST"/> or 
        /// <see cref="HChangeNotifyFlags.SHCNF_PATH"/> must be specified in <i>uFlags</i>. 
        /// <i>dwItem1</i> contains the previous PIDL or name of the item. 
        /// <i>dwItem2</i> contains the new PIDL or name of the item. 
        /// </summary>
        SHCNE_RENAMEITEM = 0x00000001, //@@@: SHCNE_RENAMEITEM = 0x00000001,

        /// <summary>
        /// A folder has been removed. 
        /// <see cref="HChangeNotifyFlags.SHCNF_IDLIST"/> or 
        /// <see cref="HChangeNotifyFlags.SHCNF_PATH"/> must be specified in <i>uFlags</i>. 
        /// <i>dwItem1</i> contains the folder that was removed. 
        /// <i>dwItem2</i> is not used and should be <see langword="null"/>. 
        /// </summary>
        SHCNE_RMDIR = 0x00000010, //@@@: SHCNE_RMDIR = 0x00000010,

        /// <summary>
        /// The computer has disconnected from a server. 
        /// <see cref="HChangeNotifyFlags.SHCNF_IDLIST"/> or 
        /// <see cref="HChangeNotifyFlags.SHCNF_PATH"/> must be specified in <i>uFlags</i>. 
        /// <i>dwItem1</i> contains the server from which the computer was disconnected. 
        /// <i>dwItem2</i> is not used and should be <see langword="null"/>. 
        /// </summary>
        SHCNE_SERVERDISCONNECT = 0x00004000, //@@@: SHCNE_SERVERDISCONNECT = 0x00004000,

        /// <summary>
        /// The contents of an existing folder have changed, 
        /// but the folder still exists and has not been renamed. 
        /// <see cref="HChangeNotifyFlags.SHCNF_IDLIST"/> or 
        /// <see cref="HChangeNotifyFlags.SHCNF_PATH"/> must be specified in <i>uFlags</i>. 
        /// <i>dwItem1</i> contains the folder that has changed. 
        /// <i>dwItem2</i> is not used and should be <see langword="null"/>. 
        /// If a folder has been created, deleted, or renamed, use SHCNE_MKDIR, SHCNE_RMDIR, or 
        /// SHCNE_RENAMEFOLDER, respectively, instead. 
        /// </summary>
        SHCNE_UPDATEDIR = 0x00001000, //@@@: SHCNE_UPDATEDIR = 0x00001000,

        /// <summary>
        /// An image in the system image list has changed. 
        /// <see cref="HChangeNotifyFlags.SHCNF_DWORD"/> must be specified in <i>uFlags</i>. 
        /// </summary>
        SHCNE_UPDATEIMAGE = 0x00008000, //@@@: SHCNE_UPDATEIMAGE = 0x00008000,

        return self;

    } //@@@: }
UNKNOWN >>         return self;

    #endregion // enum HChangeNotifyEventID //@@@: #endregion // enum HChangeNotifyEventID

UNKNOWN >>         return self;

    #region public enum HChangeNotifyFlags //@@@: #region public enum HChangeNotifyFlags
        return self;

    /// <summary>
        return self;

    /// Flags that indicate the meaning of the <i>dwItem1</i> and <i>dwItem2</i> parameters. 
        return self;

    /// The uFlags parameter must be one of the following values.
        return self;

    /// </summary>
        return self;

    [Flags] //@@@: [Flags]
UNKNOWN >>         return self;

    public enum HChangeNotifyFlags //@@@: public enum HChangeNotifyFlags
    { //@@@: {
        /// <summary>
        /// The <i>dwItem1</i> and <i>dwItem2</i> parameters are DWORD values. 
        /// </summary>
        SHCNF_DWORD = 0x0003, //@@@: SHCNF_DWORD = 0x0003,
        /// <summary>
        /// <i>dwItem1</i> and <i>dwItem2</i> are the addresses of ITEMIDLIST structures that 
        /// represent the item(s) affected by the change. 
        /// Each ITEMIDLIST must be relative to the desktop folder. 
        /// </summary>
        SHCNF_IDLIST = 0x0000, //@@@: SHCNF_IDLIST = 0x0000,
        /// <summary>
        /// <i>dwItem1</i> and <i>dwItem2</i> are the addresses of null-terminated strings of 
        /// maximum length MAX_PATH that contain the full path names 
        /// of the items affected by the change. 
        /// </summary>
        SHCNF_PATHA = 0x0001, //@@@: SHCNF_PATHA = 0x0001,
        /// <summary>
        /// <i>dwItem1</i> and <i>dwItem2</i> are the addresses of null-terminated strings of 
        /// maximum length MAX_PATH that contain the full path names 
        /// of the items affected by the change. 
        /// </summary>
        SHCNF_PATHW = 0x0005, //@@@: SHCNF_PATHW = 0x0005,
        /// <summary>
        /// <i>dwItem1</i> and <i>dwItem2</i> are the addresses of null-terminated strings that 
        /// represent the friendly names of the printer(s) affected by the change. 
        /// </summary>
        SHCNF_PRINTERA = 0x0002, //@@@: SHCNF_PRINTERA = 0x0002,
        /// <summary>
        /// <i>dwItem1</i> and <i>dwItem2</i> are the addresses of null-terminated strings that 
        /// represent the friendly names of the printer(s) affected by the change. 
        /// </summary>
        SHCNF_PRINTERW = 0x0006, //@@@: SHCNF_PRINTERW = 0x0006,
        /// <summary>
        /// The function should not return until the notification 
        /// has been delivered to all affected components. 
        /// As this flag modifies other data-type flags, it cannot by used by itself.
        /// </summary>
        SHCNF_FLUSH = 0x1000, //@@@: SHCNF_FLUSH = 0x1000,
        /// <summary>
        /// The function should begin delivering notifications to all affected components 
        /// but should return as soon as the notification process has begun. 
        /// As this flag modifies other data-type flags, it cannot by used by itself.
        /// </summary>
        SHCNF_FLUSHNOWAIT = 0x2000 //@@@: SHCNF_FLUSHNOWAIT = 0x2000
        return self;

    } //@@@: }
UNKNOWN >>         return self;

    #endregion // enum HChangeNotifyFlags //@@@: #endregion // enum HChangeNotifyFlags
}(globalObject)); //@@@: }
