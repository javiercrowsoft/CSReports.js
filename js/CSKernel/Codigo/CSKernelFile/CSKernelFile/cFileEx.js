(function(globalObject) {

    globalObject.CSKernelFile = globalObject.CSKernelFile || {}; //@@@: namespace CSKernelFile
 //@@@: {
    globalObject.CSKernelFile.createCFileEx = function() {

        const self = {}; //@@@: public class cFileEx

        const C_MODULE = "cFileEx"; //@@@: private const String C_MODULE = "cFileEx";

        self.fileGetName = function(fullPath) { //@@@: public String fileGetName(String fullPath)
            return getFileNameWithoutExt(fullPath); //@@@: return getFileNameWithoutExt(fullPath);
        }; //@@@: }

        self.fileExists = function(file) { //@@@: public bool fileExists(String file)
            return File.Exists(file); //@@@: return File.Exists(file);
        }; //@@@: }

        self.getWindowsDir = function() { //@@@: public String getWindowsDir()
            return System.Environment.SystemDirectory; //@@@: return System.Environment.SystemDirectory;
        }; //@@@: }

        self.fileGetPath = function(fullPath) { //@@@: public String fileGetPath(String fullPath)
            let path = ""; //@@@: String path = "";
            let fileName = ""; //@@@: String fileName = "";

            separatePathAndFileName(fullPath, path, fileName); //@@@: separatePathAndFileName(fullPath, ref path, ref fileName);

            return path; //@@@: return path;
        }; //@@@: }

        self.fileGetFileExt = function(fullPath) { //@@@: public String fileGetFileExt(String fullPath)
            let path = ""; //@@@: String path = "";
            let fileName = ""; //@@@: String fileName = "";
            let pos = 0; //@@@: int pos = 0;
            let c = ""; //@@@: String c = "";

            separatePathAndFileName(fullPath, path, fileName); //@@@: separatePathAndFileName(fullPath, ref path, ref fileName);

            pos = fileName.Length; //@@@: pos = fileName.Length;

            if (pos === 0) { //@@@: if (pos == 0)
                return ""; //@@@: return "";
            } //@@@: }

            c = fileName.Substring(pos, 1); //@@@: c = fileName.Substring(pos, 1);
            while (c !== ".") { //@@@: while (c != ".")
                pos = pos - 1; //@@@: pos = pos - 1;
                if (pos === 0) { break; } //@@@: if (pos == 0) { break; }
                c = fileName.Substring(pos, 1); //@@@: c = fileName.Substring(pos, 1);
            } //@@@: }

            switch (pos) //@@@: switch (pos)
            { //@@@: {
                case 0: //@@@: case 0:
                    // if there is not a separator this file doesn't have extension
                    //
                    return ""; //@@@: return "";

                default: //@@@: default:
                    // return the extension
                    //
                    return fileName.Substring(pos + 1); //@@@: return fileName.Substring(pos + 1);
            } //@@@: }
        }; //@@@: }

        self.fileGetPathAndFileName = function(fullPath, path, fileName) { //@@@: public void fileGetPathAndFileName(String fullPath, ref String path, ref String fileName)
            separatePathAndFileName(fullPath, path, fileName); //@@@: separatePathAndFileName(fullPath, ref path, ref fileName);
        }; //@@@: }

        self.fileCopyFile = function(source, destination) { //@@@: public bool fileCopyFile(String source, String destination)
            try { //@@@: try
                File.Copy(source, destination); //@@@: File.Copy(source, destination);
                return true; //@@@: return true;
            } //@@@: }
            catch (ex)  { //@@@: catch (Exception ex)
                cError.mngError(ex, "fileCopyFile", C_MODULE, "source: " + source + "\ndestination:" + destination); //@@@: cError.mngError(ex, "fileCopyFile", C_MODULE, "source: " + source + "\ndestination:" + destination);
                return false; //@@@: return false;
            } //@@@: }
        }; //@@@: }

        self.fileDelete = function(file) { //@@@: public bool fileDelete(String file)
            try { //@@@: try
                if (fileExists(file)) { //@@@: if (fileExists(file))
                    File.SetAttributes(file, FileAttributes.Normal); //@@@: File.SetAttributes(file, FileAttributes.Normal);
                    File.Delete(file); //@@@: File.Delete(file);
                } //@@@: }
                return true; //@@@: return true;
            } //@@@: }
            catch (ex) { //@@@: catch (Exception ex)
                cError.mngError(ex, "fileDelete", C_MODULE, "file: " + file); //@@@: cError.mngError(ex, "fileDelete", C_MODULE, "file: " + file);
                return false; //@@@: return false;
            } //@@@: }
        }; //@@@: }

        self.getFileNameWithoutExt = function(fullPath) { //@@@: public static String getFileNameWithoutExt(String fullPath)
            let path = ""; //@@@: String path = "";
            let fileName = ""; //@@@: String fileName = "";
            let pos = 0; //@@@: int pos = 0;
            let sep = ""; //@@@: String sep = "";

            separatePathAndFileName(fullPath, path, fileName); //@@@: separatePathAndFileName(fullPath, ref path, ref fileName);
            pos = fileName.Length; //@@@: pos = fileName.Length;

            if (pos === 0) { //@@@: if (pos == 0)
                return fullPath; //@@@: return fullPath;
            } //@@@: }

            sep = fileName.Substring(pos, 1); //@@@: sep = fileName.Substring(pos, 1);
            while (sep !== ".") { //@@@: while (sep != ".")
                pos = pos - 1; //@@@: pos = pos - 1;
                if (pos === 0) { break; } //@@@: if (pos == 0) { break; }
                sep = fileName.Substring(pos, 1); //@@@: sep = fileName.Substring(pos, 1);
            } //@@@: }

            switch (pos) //@@@: switch (pos)
            { //@@@: {
                case 0: //@@@: case 0:
                    return fileName; //@@@: return fileName;

                default: //@@@: default:
                    return fileName.Substring(0, pos - 1); //@@@: return fileName.Substring(0, pos - 1);
            } //@@@: }
        }; //@@@: }

        self.separatePathAndFileName = function(fullPath, path, fileName) { //@@@: public static void separatePathAndFileName(String fullPath, ref String path, ref String fileName)
            let pos = 0; //@@@: int pos = 0;
            let sep = ""; //@@@: String sep = "";

            pos = fullPath.Length; //@@@: pos = fullPath.Length;

            if (pos === 0) { //@@@: if (pos == 0)
                path = fullPath; //@@@: path = fullPath;
                fileName = fullPath; //@@@: fileName = fullPath;
                return; //@@@: return;
            } //@@@: }
            sep = fullPath.Substring(pos, 1); //@@@: sep = fullPath.Substring(pos, 1);
            while (!isSeparator(sep)) { //@@@: while (!isSeparator(sep))
                pos = pos - 1; //@@@: pos = pos - 1;
                if (pos === 0) { break; } //@@@: if (pos == 0) { break; }
                sep = fullPath.Substring(pos, 1); //@@@: sep = fullPath.Substring(pos, 1);
            } //@@@: }

            if (pos === fullPath.Length-1) { //@@@: if (pos == fullPath.Length-1)
                // if the separator is founded at the end it must be a root folder example: c:\
                //
                path = fullPath.Substring(0, pos - 1); //@@@: path = fullPath.Substring(0, pos - 1);
                fileName = fullPath; //@@@: fileName = fullPath;
            } //@@@: }
            else if (pos === 0) { //@@@: else if (pos == 0)
                // if the separator is not found it must be a root folder example: c:
                //
                path = fullPath; //@@@: path = fullPath;
                fileName = fullPath; //@@@: fileName = fullPath;
            } //@@@: }
            else { //@@@: else
                path = fullPath.Substring(0, pos - 1); //@@@: path = fullPath.Substring(0, pos - 1);
                fileName = fullPath.Substring(pos + 1); //@@@: fileName = fullPath.Substring(pos + 1);
            } //@@@: }
        }; //@@@: }

        const isSeparator = function(character) { //@@@: private static bool isSeparator(String character)
            if (character === "\\") { //@@@: if (character == "\\")
                return true; //@@@: return true;
            } //@@@: }
            if (character === "/") { //@@@: if (character == "/")
                return true; //@@@: return true;
            } //@@@: }
            else { //@@@: else
                return false; //@@@: return false;
            } //@@@: }
        }; //@@@: }

        return self;

    } //@@@: }
}(globalObject)); //@@@: }
