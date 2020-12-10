interface ICSReports {
    CSOAPI: {
        NotImplementedException: () => void;
        createList: <T>(itemConstructor: (index?: number) => T, parentCollection?: CSOAPI.IList<T>) => CSOAPI.IList<T>;
    },
    CSChartServer: {
        createCWebChart: () =>  CSChartServer.IcWebChart;
        createCWebChartItem: () =>  CSChartServer.IcWebChartItem;
    },
    log: (msg: string, printStackTrace?: boolean) => void
}

// @ts-ignore
const globalObject: ICSReports = {};