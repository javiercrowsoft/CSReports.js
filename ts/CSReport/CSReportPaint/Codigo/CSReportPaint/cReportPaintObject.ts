(function(globalObject) {

    globalObject.CSReportPaint = globalObject.CSReportPaint || {};

    globalObject.CSReportPaint.createCReportPaintObject = function() {

        const self = {};

        const C_MODULE = "cReportPaintObject";

        let m_aspect = new cReportAspect();
        let m_key = "";
        let m_text = "";
        let m_paintType = null;
        let m_tag = "";
        let m_rptType = null;
        let m_rptKeySec = "";
        let m_image = null;
        let m_indexField = 0;

        let m_isSection = null;

        let m_heightSec = 0;
        let m_heightSecLine = 0;
        let m_textLine = "";

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

    }

}(globalObject));
