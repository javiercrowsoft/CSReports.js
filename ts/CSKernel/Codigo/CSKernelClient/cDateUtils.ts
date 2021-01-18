


namespace CSKernelClient
{


    export class cDateUtils {


    {
        public isDate(dateValue: object) {
            let t: Type = dateValue.GetType();
            if (typeof(DateTime) === t) {
                return true;
            }
            else {
                if (typeof(string) === t) {
                    try {
                        DateTime.Parse(dateValue);
                        return true;
                    }
                    catch (ex) {
                        return false;
                    }
                }
                else {
                    return false;
                }
            }
        }


    }    }
}
