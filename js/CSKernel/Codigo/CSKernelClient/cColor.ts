(function(globalObject) {

    globalObject.CSKernelClient = globalObject.CSKernelClient || {};

    globalObject.CSKernelClient.createCColor = function() {

        const self = {};
        self.colorFromRGB = function(rgb) {
            if (rgb < 0) {
                return Color.FromArgb(rgb);
            }
            else {
                let values = BitConverter.GetBytes(rgb);
                if (!BitConverter.IsLittleEndian) Array.Reverse(values); {
                return Color.FromArgb(values[2], values[1], values[0]);
            }
        };
        return self;

    }
}(globalObject));
