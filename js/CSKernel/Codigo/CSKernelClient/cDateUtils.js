(function(globalObject) {


    globalObject.CSKernelClient = globalObject.CSKernelClient || {}; //@@@: namespace CSKernelClient
 //@@@: {


    globalObject.CSKernelClient.createCDateUtils = function() {

        const self = {}; //@@@: public static class cDateUtils
        self.isDate = function(dateValue) { //@@@: public static bool isDate(object dateValue)
            let t = dateValue.GetType(); //@@@: Type t = dateValue.GetType();
            if (typeof(DateTime) === t) { //@@@: if (typeof(DateTime) == t)
                return true; //@@@: return true;
            } //@@@: }
            else { //@@@: else
                if (typeof(string) === t) { //@@@: if (typeof(string) == t)
                    try { //@@@: try
                        DateTime.Parse(dateValue); //@@@: DateTime.Parse((string)dateValue);
                        return true; //@@@: return true;
                    } //@@@: }
                    catch (ex) { //@@@: catch (Exception ex)
                        return false; //@@@: return false;
                    } //@@@: }
                } //@@@: }
                else { //@@@: else
                    return false; //@@@: return false;
                } //@@@: }
            } //@@@: }
        }; //@@@: }
        return self;

    } //@@@: }
}(globalObject)); //@@@: }
