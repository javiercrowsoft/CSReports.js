///<reference path="Control.ts"/>

namespace CSForms {

    export class Toolbar extends Control {

        private readonly div: HTMLDivElement;
        private readonly ul: HTMLUListElement;
        public readonly name: string;

        private controls = new CSOAPI.Map<HTMLElement>;

        public constructor(name: string, el: HTMLElement) {
            super(el);

            this.name = name;

            this.div = el as HTMLDivElement;
            this.ul = document.createElement('ul');
            this.ul.className = "toolbar";
            this.div.appendChild(this.ul);
        }

        addButton(buttonId: string, image: string, onclic?: () => void) {
            const li = document.createElement('li');
            const link = document.createElement('a');
            link.href = "#";
            link.onclick = onclic;
            const img = document.createElement('img');
            img.src = "images/toolbar/" + image;
            img.style.height = "25px";
            link.appendChild(img);
            li.appendChild(link);
            this.ul.appendChild(li);
            this.controls.add(link, buttonId);
        }

        addInput(inputId: string, onkeyup?: (event) => void) {
            const li = document.createElement('li');
            const input = document.createElement('input');
            input.onkeyup = onkeyup;
            input.style.marginTop = "15px";
            input.style.width = "50px";
            li.appendChild(input);
            this.ul.appendChild(li);
            this.controls.add(input, inputId);
        }

        addNumberLabel(labelId: string) {
            const li = document.createElement('li');
            const span = document.createElement('span');
            span.className = "toolbar-span-number";
            li.appendChild(span);
            this.ul.appendChild(li);
            this.controls.add(span, labelId);
        }

        getControls() {
            return this.controls;
        }
    }
}