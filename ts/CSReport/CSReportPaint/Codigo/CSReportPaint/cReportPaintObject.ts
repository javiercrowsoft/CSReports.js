(function(globalObject) {

    globalObject.CSReportPaint = globalObject.CSReportPaint || {};

    globalObject.CSReportPaint.createCReportPaintObject = function() {

        // @ts-ignore
        let self: CSReportPaint.IcReportPaintObject = {};

        const C_MODULE: string = "cReportPaintObject";

        let m_aspect: cReportAspect = new cReportAspect();
        let m_key: string = "";
        let m_text: string = "";
        let m_paintType: csRptPaintObjType = null;
        let m_tag: string = "";
        let m_rptType: csRptSectionType = null;
        let m_rptKeySec: string = "";
        let m_image: Image = null;
        let m_indexField: number = 0;

        let m_isSection: boolean = null;

        let m_heightSec: number = 0;
        let m_heightSecLine: number = 0;
        let m_textLine: string = "";

        self.getImage = function() {
            return m_image;
        };

        self.setImage = function(rhs) {
            m_image = rhs;
        };

        self.getAspect = function() {
            return m_aspect;
        };

        self.setAspect = function(rhs) {
            m_aspect = rhs;
        };

        self.getKey = function() {
            return m_key;
        };

        self.setKey = function(rhs) {
            m_key = rhs;
        };

        self.getText = function() {
            return m_text;
        };

        self.setText = function(rhs) {
            m_text = rhs;
        };

        self.getPaintType = function() {
            return m_paintType;
        };

        self.setPaintType = function(rhs) {
            m_paintType = rhs;
        };

        self.getRptType = function() {
            return m_rptType;
        };

        self.setRptType = function(rhs) {
            m_rptType = rhs;
        };

        self.getTag = function() {
            return m_tag;
        };

        self.setTag = function(rhs) {
            m_tag = rhs;
        };

        self.getRptKeySec = function() {
            return m_rptKeySec;
        };

        self.setRptKeySec = function(rhs) {
            m_rptKeySec = rhs;
        };

        self.getIndexField = function() {
            return m_indexField;
        };

        self.setIndexField = function(rhs) {
            m_indexField = rhs;
        };

        self.getHeightSec = function() {
            return m_heightSec;
        };

        self.setHeightSec = function(rhs) {
            m_heightSec = rhs;
        };

        self.getHeightSecLine = function() {
            return m_heightSecLine;
        };

        self.setHeightSecLine = function(rhs) {
            m_heightSecLine = rhs;
        };

        self.getTextLine = function() {
            return m_textLine;
        };

        self.setTextLine = function(rhs) {
            m_textLine = rhs;
        };

        self.getIsSection = function() {
            return m_isSection;
        };

        self.setIsSection = function(rhs) {
            m_isSection = rhs;
        };

        return self;

    }    }
        return self;


}(globalObject));


namespace CSReportPaint {

  export interface IcReportPaintObject {

    getImage: () => Image;
    setImage: (Image) => void;
    getAspect: () => cReportAspect;
    setAspect: (cReportAspect) => void;
    getKey: () => String;
    setKey: (String) => void;
    getText: () => String;
    setText: (String) => void;
    getPaintType: () => csRptPaintObjType;
    setPaintType: (csRptPaintObjType) => void;
    getRptType: () => csRptSectionType;
    setRptType: (csRptSectionType) => void;
    getTag: () => String;
    setTag: (String) => void;
    getRptKeySec: () => String;
    setRptKeySec: (String) => void;
    getIndexField: () => int;
    setIndexField: (int) => void;
    getHeightSec: () => float;
    setHeightSec: (float) => void;
    getHeightSecLine: () => float;
    setHeightSecLine: (float) => void;
    getTextLine: () => String;
    setTextLine: (String) => void;
    getIsSection: () => bool;
    setIsSection: (bool) => void;
  }
}
