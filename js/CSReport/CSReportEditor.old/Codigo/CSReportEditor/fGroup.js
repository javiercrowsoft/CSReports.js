(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {}; //@@@: namespace CSReportEditor
 //@@@: {
    globalObject.CSReportEditor.createFGroup = function() {

        const self = {}; //@@@: public partial class fGroup : Form
        let m_ok = false; //@@@: private bool m_ok = false;

        const fGroup = function() { //@@@: public fGroup()
            InitializeComponent(); //@@@: InitializeComponent();
        }; //@@@: }

        self.getTxName = function() { //@@@: public cMaskEdit getTxName()
            return txName; //@@@: return txName;
        }; //@@@: }

        self.getTxDbField = function() { //@@@: public cMaskEdit getTxDbField()
            return txDbField; //@@@: return txDbField;
        }; //@@@: }

        self.getAsc = function() { //@@@: public bool getAsc()
            return opAsc.Checked; //@@@: return opAsc.Checked;
        }; //@@@: }

        self.setAsc = function(value) { //@@@: public void setAsc(bool value)
            opAsc.Checked = value; //@@@: opAsc.Checked = value;
        }; //@@@: }

        self.setDesc = function(value) { //@@@: public void setDesc(bool value)
            opDesc.Checked = value; //@@@: opDesc.Checked = value;
        }; //@@@: }

        self.getPrintInNewPage = function() { //@@@: public bool getPrintInNewPage()
            return chkPrintInNewPage.Checked; //@@@: return chkPrintInNewPage.Checked;
        }; //@@@: }

        self.setPrintInNewPage = function(value) { //@@@: public void setPrintInNewPage(bool value)
            chkPrintInNewPage.Checked = value; //@@@: chkPrintInNewPage.Checked = value;
        }; //@@@: }

        self.getReprintGroup = function() { //@@@: public bool getReprintGroup()
            return chkReprintGroup.Checked; //@@@: return chkReprintGroup.Checked;
        }; //@@@: }

        self.setReprintGroup = function(value) { //@@@: public void setReprintGroup(bool value)
            chkReprintGroup.Checked = value; //@@@: chkReprintGroup.Checked = value;
        }; //@@@: }

        self.getGrandTotal = function() { //@@@: public bool getGrandTotal()
            return chkGrandTotal.Checked; //@@@: return chkGrandTotal.Checked;
        }; //@@@: }

        self.setGrandTotal = function(value) { //@@@: public void setGrandTotal(bool value)
            chkGrandTotal.Checked = value; //@@@: chkGrandTotal.Checked = value;
        }; //@@@: }

        self.getSortByDate = function() { //@@@: public bool getSortByDate()
            return opDate.Checked; //@@@: return opDate.Checked;
        }; //@@@: }

        self.setSortByDate = function(value) { //@@@: public void setSortByDate(bool value)
            opDate.Checked = value; //@@@: opDate.Checked = value;
        }; //@@@: }

        self.getSortByNumber = function() { //@@@: public bool getSortByNumber()
            return opNumber.Checked; //@@@: return opNumber.Checked;
        }; //@@@: }

        self.setSortByNumber = function(value) { //@@@: public void setSortByNumber(bool value)
            opNumber.Checked = value; //@@@: opNumber.Checked = value;
        }; //@@@: }

        self.getSortByText = function() { //@@@: public bool getSortByText()
            return opText.Checked; //@@@: return opText.Checked;
        }; //@@@: }

        self.setSortByText = function(value) { //@@@: public void setSortByText(bool value)
            opText.Checked = value; //@@@: opText.Checked = value;
        }; //@@@: }

        self.getOk = function() { //@@@: public bool getOk()
            return m_ok; //@@@: return m_ok;
        }; //@@@: }

		self. = function() { //@@@: public string getDbField ()
			throw new NotImplementedException (); //@@@: throw new NotImplementedException ();
		}; //@@@: }

		self. = function() { //@@@: public int getFieldType ()
			throw new NotImplementedException (); //@@@: throw new NotImplementedException ();
		}; //@@@: }

		self. = function() { //@@@: public int getIndex ()
			throw new NotImplementedException (); //@@@: throw new NotImplementedException ();
		}; //@@@: }

		self. = function(sField) { //@@@: public void setDbField (string sField)
			throw new NotImplementedException (); //@@@: throw new NotImplementedException ();
		}; //@@@: }

		self. = function(nFieldType) { //@@@: public void setFieldType (int nFieldType)
			throw new NotImplementedException (); //@@@: throw new NotImplementedException ();
		}; //@@@: }

		self. = function(nIndex) { //@@@: public void setIndex (int nIndex)
			throw new NotImplementedException (); //@@@: throw new NotImplementedException ();
		}; //@@@: }

        const cmdOk_Click = function(sender, e) { //@@@: private void cmdOk_Click(object sender, EventArgs e)
            m_ok = true; //@@@: m_ok = true;
            this.Hide(); //@@@: this.Hide();
        }; //@@@: }

        const cmdCancel_Click = function(sender, e) { //@@@: private void cmdCancel_Click(object sender, EventArgs e)
            m_ok = false; //@@@: m_ok = false;
            this.Hide(); //@@@: this.Hide();
        }; //@@@: }
        return self;

    } //@@@: }
}(globalObject)); //@@@: }
