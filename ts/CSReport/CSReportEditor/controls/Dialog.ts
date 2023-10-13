namespace CSReportEditor {

    import P = CSKernelClient.Callable;

    export type DialogSettings = {
        title?: string,
        width?: number,
        height?: number,
        top?: number,
        left?: number,
        buttons?: object,
        specialClass?: string,
        fixed?: boolean,
        overlay?: boolean
    }

    export class Dialog {

        // html elements
        //
        private el: HTMLElement;

        private maximize = false;
        private dialog: HTMLDivElement;
        private dialog_title: HTMLElement;
        private dialog_minmax: HTMLAnchorElement;
        private dialog_close: HTMLAnchorElement;
        private dialog_content: HTMLElement;
        private dialog_overlay: HTMLElement;

        // state
        //
        private selected = null; // Object of the element to be moved
        private x_pos = 0;
        private y_pos = 0; // Stores x & y coordinates of the mouse pointer
        private x_elem = 0;
        private y_elem = 0; // Stores top, left values (edge) of the element

        // settings
        //
        // default options...
        //
        private defaults: DialogSettings = {
            title: '',
            width: 300,
            height: 150,
            top: null,
            left: null,
            specialClass: '',
            fixed: true,
            overlay: false
        };

        private settings: DialogSettings;

        public constructor(el: HTMLElement = null) {
            this.el = el;

            this.dialog = document.createElement('div');
            this.dialog.className = 'dialog-box';

            this.dialog_title = document.createElement('h3');
            this.dialog_title.className = 'dialog-title';
            this.dialog.appendChild(this.dialog_title);

            this.dialog_minmax = document.createElement('a');
            this.dialog_minmax.className = 'dialog-minmax';
            this.dialog_minmax.title = 'Minimize';
            this.dialog_minmax.innerHTML = '&ndash;';
            this.dialog_minmax.href = 'javascript:;';
            this.dialog.appendChild(this.dialog_minmax);

            this.dialog_close = document.createElement('a');
            this.dialog_close.className = 'dialog-close';
            this.dialog_close.title = 'Close';
            this.dialog_close.innerHTML = '&times;';
            this.dialog_close.href = 'javascript:;';
            this.dialog.appendChild(this.dialog_close);

            this.dialog_content = document.createElement('div');
            this.dialog_content.className = 'dialog-content';
            this.dialog_content.appendChild(el);
            this.dialog.appendChild(this.dialog_content);

            this.dialog_overlay = document.createElement('div');
            this.dialog_overlay.className = 'dialog-box-overlay';

            document.body.appendChild(this.dialog);
            document.body.appendChild(this.dialog_overlay);

            // bind the draggable function here...
            this.dialog_title.onmousedown = P.call(this, this.initDrag);
            this.dialog_close.onclick = P.call(this, this.close);
        }

        // will be called when user starts dragging an element
        //
        initDrag() {
            this.selected = this.dialog; // store the object of the element which needs to be moved
            this.x_elem = this.x_pos - this.selected.offsetLeft;
            this.y_elem = this.y_pos - this.selected.offsetTop;
            return false;
        }

        close() {
            this.dialog.style.visibility = "hidden";
            this.dialog.style.opacity = '0';
            this.dialog_overlay.style.display = "none";
            this.maximize =  false;
        }

        show(settings?: DialogSettings) {
            this.settings = {...this.defaults, ...settings};

            this.dialog.className =  "dialog-box " + (this.settings.fixed ? 'fixed-dialog-box ' : '') + this.settings.specialClass;
            this.dialog.style.visibility = "visible";
            this.dialog.style.opacity = '1';
            this.dialog.style.width = this.settings.width + 'px';
            this.dialog.style.height = this.settings.height + 'px';
            this.dialog.style.top = (!this.settings.top) ? "50%" : '0px';
            this.dialog.style.left = (!this.settings.left) ? "50%" : '0px';
            this.dialog.style.marginTop = (!this.settings.top) ? '-' + this.settings.height/2 + 'px' : this.settings.top + 'px';
            this.dialog.style.marginLeft = (!this.settings.left) ? '-' + this.settings.width/2 + 'px' : this.settings.left + 'px';
            this.dialog_title.textContent = this.settings.title;
            this.dialog_overlay.style.display = (this.settings.overlay) ? "block" : "none";

            this.dialog_minmax.innerHTML = '&ndash;';
            this.dialog_minmax.title = 'Minimize';
            this.dialog_minmax.onclick = P.call(this, this.dialogMinMax);

            document.onmousemove = P.call(this, this.moveElement);
            document.onmouseup = P.call(this, this.destroy);

            this.maximize = true;
        }

        // will be called when user dragging an element
        //
        moveElement(event: MouseEvent) {
            // @ts-ignore
            this.x_pos = document.all ? window.event.clientX : event.pageX;
            // @ts-ignore
            this.y_pos = document.all ? window.event.clientY : event.pageY;
            if (this.selected !== null) {
                this.selected.style.left = !this.settings.left !== null
                                            ? ((this.x_pos - this.x_elem) + this.selected.offsetWidth/2) + 'px'
                                            : ((this.x_pos - this.x_elem) - this.settings.left) + 'px';
                this.selected.style.top = !this.settings.top !== null
                                            ? ((this.y_pos - this.y_elem) + this.selected.offsetHeight/2) + 'px'
                                            : ((this.y_pos - this.y_elem) - this.settings.top) + 'px';
            }
        }

        // destroy the object when we are done
        destroy() {
            this.selected = null;
        }

        // Maximized or minimized dialog box
        dialogMinMax() {
            if (this.maximize) {
                this.dialog.className += ' minimize';
                this.dialog_minmax.innerHTML = '+';
                this.dialog_minmax.title = this.dialog_title.innerHTML.replace(/<.*?>/g,"");
                this.maximize = false;
            } else {
                this.dialog.className = this.dialog.className.replace(/(^| )minimize($| )/g, "");
                this.dialog_minmax.innerHTML = '&ndash;';
                this.dialog_minmax.title = 'Minimize';
                this.maximize = true;
            }
        }
    }
}