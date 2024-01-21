import { Options } from "./interface";

export default class Piklor {
  elm!: Element;
  cbs: ((color: string) => void)[];
  color: string;
  isOpen: boolean;
  colors: string[];
  options: Options;
  constructor(sel: string | Element, colors: string[], options: Options /*event = 'pick'*/) {
    options = options ? options : {};
    colors = colors
      ? colors
      : [
          "#1abc9c",
          "#2ecc71",
          "#3498db",
          "#9b59b6",
          "#34495e",
          "#16a085",
          "#27ae60",
          "#2980b9",
          "#8e44ad",
          "#2c3e50",
          "#f1c40f",
          "#e67e22",
          "#e74c3c",
          "#ecf0f1",
          "#95a5a6",
          "#f39c12",
          "#d35400",
          "#c0392b",
          "#bdc3c7",
          "#7f8c8d",
        ];
    options.open = this.getElm(options.open as string) as HTMLElement;
    options.openEvent = options.openEvent || "click";
    options.style = Object(options.style);
    options.style!.display = options.style!.display || "block";
    options.closeOnBlur = options.closeOnBlur || false;
    options.template =
      options.template || '<div data-col="{color}" style="background-color: {color}" title="{color}" ></div>';
    //self.pick = new Event(event);
    this.elm = this.getElm(sel) as Element;
    this.cbs = [];
    this.color = "";
    this.isOpen = true;
    this.colors = colors;
    this.options = options;
    this.render();

    // Handle the open element and event.
    if (options.open) {
      (options.open as HTMLElement).addEventListener(options.openEvent, (e) => {
        this.isOpen ? this.close() : this.open();
      });
    }

    // Click on colors
    this.elm.addEventListener("click", (ev) => {
      const col = (ev.target as HTMLElement).getAttribute("data-col");
      if (!col) {
        return;
      }
      this.color = col;
      //self.elm.dispatchEvent(self.pick);
      this.set(col);
      this.close();
    });

    if (options.closeOnBlur) {
      window.addEventListener("click", (ev) => {
        // check if we didn't click 'open' and 'color pallete' elements
        if (ev.target != options.open && ev.target != this.elm && this.isOpen) {
          this.close();
        }
      });
    }

    if (options.autoclose !== false) {
      this.close();
    }
  }

  getElm(el: string | Element) {
    if (typeof el === "string") {
      return document.querySelector(el);
    }
    return el;
  }

  render() {
    let html = "";

    this.colors.forEach((c) => {
      html += this.options?.template?.replace(/\{color\}/g, c);
    });

    this.elm.innerHTML = html;
  }

  close() {
    (this.elm as HTMLElement).style.display = "none";
    this.isOpen = false;
  }

  open() {
    const displayValue = this.options.style?.display || "block";
    (this.elm as HTMLElement).style.display = displayValue;
    this.isOpen = true;
  }

  colorChosen(cb: () => void) {
    this.cbs.push(cb);
  }

  set(c: string, p?: boolean) {
    this.color = c;
    if (p === false) {
      return;
    }
    this.cbs.forEach((cb) => {
      cb && cb(c);
    });
    this.cbs = [];
    //self.elm.dispatchEvent(self.pick);
  }
}
