(function(globalObject) {

    globalObject.CSKernelClient = globalObject.CSKernelClient || {}; //@@@: namespace CSKernelClient
 //@@@: {
    globalObject.CSKernelClient.createCColor = function() {

        const self = {}; //@@@: public class cColor
        self.colorFromRGB = function(rgb) { //@@@: public static Color colorFromRGB(int rgb)
            if (rgb < 0) { //@@@: if (rgb < 0)
                return Color.FromArgb(rgb); //@@@: return Color.FromArgb(rgb);
            } //@@@: }
            else { //@@@: else
                let values = BitConverter.GetBytes(rgb); //@@@: byte[] values = BitConverter.GetBytes(rgb);
                if (!BitConverter.IsLittleEndian) Array.Reverse(values); { //@@@: if (!BitConverter.IsLittleEndian) Array.Reverse(values);
                return Color.FromArgb(values[2], values[1], values[0]); //@@@: return Color.FromArgb(values[2], values[1], values[0]);
            } //@@@: }
        }; //@@@: }
        return self;

    } //@@@: }
}(globalObject)); //@@@: }
