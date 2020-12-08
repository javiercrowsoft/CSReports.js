(function(globalObject) {


    globalObject.CSKernelClient = globalObject.CSKernelClient || {};



    globalObject.CSKernelClient.createCDateUtils = function() {

        const self = {};
        self.isDate = function(dateValue) {
            let t: Type= dateValue.GetType();
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
        };
        return self;

    }
}(globalObject));
