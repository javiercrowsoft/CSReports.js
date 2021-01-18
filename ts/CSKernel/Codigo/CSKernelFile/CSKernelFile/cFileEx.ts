

namespace CSKernelFile
{
    export class cFileEx {


    {

        private C_MODULE: string = "cFileEx";

        public fileGetName(fullPath: string) {
            return getFileNameWithoutExt(fullPath);
        }

        public fileExists(file: string) {
            return File.Exists(file);
        }

        public getWindowsDir() {
            return System.Environment.SystemDirectory;
        }

        public fileGetPath(fullPath: string) {
            let path: string = "";
            let fileName: string = "";

            separatePathAndFileName(fullPath, path, fileName);

            return path;
        }

        public fileGetFileExt(fullPath: string) {
            let path: string = "";
            let fileName: string = "";
            let pos: number = 0;
            let c: string = "";

            separatePathAndFileName(fullPath, path, fileName);

            pos = fileName.Length;

            if (pos === 0) {
                return "";
            }

            c = fileName.Substring(pos, 1);
            while (c !== ".") {
                pos = pos - 1;
                if (pos === 0) { break; }
                c = fileName.Substring(pos, 1);
            }

            switch (pos)
            {
                case 0:
                    // if there is not a separator this file doesn't have extension
                    //
                    return "";

                default:
                    // return the extension
                    //
                    return fileName.Substring(pos + 1);
            }
        }

        public fileGetPathAndFileName(fullPath: string, path: string, fileName: string) {
            separatePathAndFileName(fullPath, path, fileName);
        }

        public fileCopyFile(source: string, destination: string) {
            try {
                File.Copy(source, destination);
                return true;
            }
            catch (ex)  {
                cError.mngError(ex, "fileCopyFile", C_MODULE, "source: " + source + "\ndestination:" + destination);
                return false;
            }
        }

        public fileDelete(file: string) {
            try {
                if (fileExists(file)) {
                    File.SetAttributes(file, FileAttributes.Normal);
                    File.Delete(file);
                }
                return true;
            }
            catch (ex) {
                cError.mngError(ex, "fileDelete", C_MODULE, "file: " + file);
                return false;
            }
        }

        public getFileNameWithoutExt(fullPath: string) {
            let path: string = "";
            let fileName: string = "";
            let pos: number = 0;
            let sep: string = "";

            separatePathAndFileName(fullPath, path, fileName);
            pos = fileName.Length;

            if (pos === 0) {
                return fullPath;
            }

            sep = fileName.Substring(pos, 1);
            while (sep !== ".") {
                pos = pos - 1;
                if (pos === 0) { break; }
                sep = fileName.Substring(pos, 1);
            }

            switch (pos)
            {
                case 0:
                    return fileName;

                default:
                    return fileName.Substring(0, pos - 1);
            }
        }

        public separatePathAndFileName(fullPath: string, path: string, fileName: string) {
            let pos: number = 0;
            let sep: string = "";

            pos = fullPath.Length;

            if (pos === 0) {
                path = fullPath;
                fileName = fullPath;
                return;
            }
            sep = fullPath.Substring(pos, 1);
            while (!isSeparator(sep)) {
                pos = pos - 1;
                if (pos === 0) { break; }
                sep = fullPath.Substring(pos, 1);
            }

            if (pos === fullPath.Length-1) {
                // if the separator is founded at the end it must be a root folder example: c:\
                //
                path = fullPath.Substring(0, pos - 1);
                fileName = fullPath;
            }
            else if (pos === 0) {
                // if the separator is not found it must be a root folder example: c:
                //
                path = fullPath;
                fileName = fullPath;
            }
            else {
                path = fullPath.Substring(0, pos - 1);
                fileName = fullPath.Substring(pos + 1);
            }
        }

        private isSeparator(character: string) {
            if (character === "\\") {
                return true;
            }
            if (character === "/") {
                return true;
            }
            else {
                return false;
            }
        }



    }    }
}
