namespace CSKernelClient  {

    export class cColor {

        public colorFromRGB(rgb: number) {
            if (rgb < 0) {
                return Color.FromArgb(rgb);
            }
            else {
                let values: byte[] = BitConverter.GetBytes(rgb);
                if (!BitConverter.IsLittleEndian) Array.Reverse(values);
                return Color.FromArgb(values[2], values[1], values[0]);
            }
        }
    }
}
