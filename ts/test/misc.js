(()=> {

    //////////////////////////////////////

    function x (p__0__,p__1__,p__2__,p__3__) {

      let bShow
      let lastInvoice
      let currentInvoice

      lastInvoice       = p__0__
      currentInvoice = p__1__

      bShow = lastInvoice !== currentInvoice
      bShow =  (p__2__  === 0 && bShow)

      if (bShow) {
        return p__3__
      } else {
        return 0
      }
    }


    //////////////////////////////////////

        const runScript = (globals) => {

            return  x (globals.getVar("p__0__").getValue(),globals.getVar("p__1__").getValue(),globals.getVar("p__2__").getValue(),globals.getVar("p__3__").getValue())

        };

        return {runScript};

    })()