///<reference path="../../CSKernel/CSKernelClient/Promise.ts"/>

namespace CSForms {

    import U = CSOAPI.Utils;
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

        private maximize = false;
        private dialog: HTMLDivElement;
        private dialogTitle: HTMLElement;
        private dialogMinmax: HTMLAnchorElement;
        private dialogClose: HTMLAnchorElement;
        private dialogContent: HTMLElement;
        private dialogAction: HTMLElement;
        private dialogOverlay: HTMLElement;

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

        public onApply: () => boolean;

        public constructor(el: HTMLElement = null, applyAndCloseButtonId?: string, cancelButtonId?: string) {

            this.dialog = document.createElement('div');
            this.dialog.className = 'dialog-box';

            this.dialogTitle = document.createElement('h3');
            this.dialogTitle.className = 'dialog-title';
            this.dialog.appendChild(this.dialogTitle);

            this.dialogMinmax = document.createElement('a');
            this.dialogMinmax.className = 'dialog-minmax';
            this.dialogMinmax.title = 'Minimize';
            this.dialogMinmax.innerHTML = '&ndash;';
            this.dialogMinmax.href = 'javascript:;';
            this.dialog.appendChild(this.dialogMinmax);

            this.dialogClose = document.createElement('a');
            this.dialogClose.className = 'dialog-close';
            this.dialogClose.title = 'Close';
            this.dialogClose.innerHTML = '&times;';
            this.dialogClose.href = 'javascript:;';
            this.dialog.appendChild(this.dialogClose);

            this.dialogContent = document.createElement('div');
            this.dialogContent.className = 'dialog-content';
            this.dialogContent.appendChild(el);
            this.dialog.appendChild(this.dialogContent);

            const footer = Array.from(el.children)
                                .filter(child => child.className === 'dlg-footer')[0];

            this.dialogAction = document.createElement('div');
            this.dialogAction.className = 'dialog-action';
            this.dialogAction.appendChild(footer);
            this.dialog.appendChild(this.dialogAction);

            this.dialogOverlay = document.createElement('div');
            this.dialogOverlay.className = 'dialog-box-overlay';

            document.body.appendChild(this.dialog);
            document.body.appendChild(this.dialogOverlay);

            // bind the draggable function here...
            //
            this.dialogTitle.onmousedown = P.call(this, this.initDrag);

            this.dialogClose.onclick = P.call(this, () => this.close(false));

            if(applyAndCloseButtonId) {
                const applyButton = U.el(applyAndCloseButtonId);
                applyButton.onclick = P.call(this, () => this.onApplyClick());
            }
            if(cancelButtonId) {
                const cancelButton = U.el(cancelButtonId);
                cancelButton.onclick = P.call(this, () => this.close(false));
            }
        }

        private onApplyClick() {
            if(this.onApply) {
                if(! this.onApply.call(null)) {
                    return;
                }
            }
            this.close(true);
        }

        // will be called when user starts dragging an element
        //
        private initDrag() {
            this.selected = this.dialog; // store the object of the element which needs to be moved
            this.x_elem = this.x_pos - this.selected.offsetLeft;
            this.y_elem = this.y_pos - this.selected.offsetTop;
            return false;
        }

        public close(result: boolean) {
            this.dialog.style.visibility = "hidden";
            this.dialog.style.opacity = '0';
            this.dialogOverlay.style.display = "none";
            this.maximize = false;
            this.resolve(result);
        }

        private resolve: (value: boolean | PromiseLike<boolean>) => void;

        public show(settings?: DialogSettings) {
            return new Promise<boolean>(P.call(this, (resolve) => {
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
                this.dialogTitle.textContent = this.settings.title;
                this.dialogOverlay.style.display = (this.settings.overlay) ? "block" : "none";

                this.dialogMinmax.innerHTML = '&ndash;';
                this.dialogMinmax.title = 'Minimize';
                this.dialogMinmax.onclick = P.call(this, this.dialogMinMax);

                document.onmousemove = P.call(this, this.moveElement);
                document.onmouseup = P.call(this, this.destroy);

                this.maximize = true;

                this.resolve = resolve;
            }));
        }

        // will be called when user dragging an element
        //
        private moveElement(event: MouseEvent) {
            // @ts-ignore
            this.x_pos = document.all ? window.event.clientX : event.pageX;
            // @ts-ignore
            this.y_pos = document.all ? window.event.clientY : event.pageY;
            if(this.selected !== null) {
                this.selected.style.left = !this.settings.left !== null
                                            ? ((this.x_pos - this.x_elem) + this.selected.offsetWidth/2) + 'px'
                                            : ((this.x_pos - this.x_elem) - this.settings.left) + 'px';
                this.selected.style.top = !this.settings.top !== null
                                            ? ((this.y_pos - this.y_elem) + this.selected.offsetHeight/2) + 'px'
                                            : ((this.y_pos - this.y_elem) - this.settings.top) + 'px';
            }
        }

        // destroy the object when we are done
        private destroy() {
            this.selected = null;
        }

        // Maximized or minimized dialog box
        private dialogMinMax() {
            if(this.maximize) {
                this.dialog.className += ' minimize';
                this.dialogMinmax.innerHTML = '+';
                this.dialogMinmax.title = this.dialogTitle.innerHTML.replace(/<.*?>/g,"");
                this.maximize = false;
            } else {
                this.dialog.className = this.dialog.className.replace(/(^| )minimize($| )/g, "");
                this.dialogMinmax.innerHTML = '&ndash;';
                this.dialogMinmax.title = 'Minimize';
                this.maximize = true;
            }
        }
    }
}