namespace CSConnect {

    import Map = CSOAPI.Map;

    export class cParameters extends Map<cParameter> {

        constructor() {
            super(null, false, cParameter);
        }
    }

}
