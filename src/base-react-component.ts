import ReactDOM from "react-dom/client";
import React from "react";
import { Editor } from "grapesjs";

export default (editor:Editor) => {
  const domc = editor.Components;
  const defType = domc.getType("default");
  const defModel = defType.model;
  const wrpChld = "data-chld";

  // Main React component
  domc.addType("react-component", {
    model: {
      toHTML(opts = {}) {
        return defModel.prototype.toHTML.call(this, {
          ...opts,
          tag: this.get("type")
        });
      }
    },
    view: {
      tagName:  ()=> "div",

      init() {
        const { model } = this;
        this.listenTo(model, "change:attributes", this.render);
        this.listenTo(model.components(), "add remove reset", this.__upRender);
      },

      /**
       * Added this method to return the "holder" container wich
       * is not a real element just keep the children until we
       * insert it on the real container
       */
      getChildrenContainerHolder() {
        const { childrenContainer } = this;
        if (childrenContainer) return childrenContainer;

        this.childrenContainer = document.createElement("childc");

        return this.childrenContainer;
      },

      /**
       * Changed this method to return the real children container or
       * the holder in case of the real is not inserted in the DOM yet
       */
      getChildrenContainer() {
        const childrenContainer = this.el.querySelector(`span[${wrpChld}]`);
        return childrenContainer ?? this.getChildrenContainerHolder();
      },

      /**
       * We need this container to understand if the React component is able
       * to render children
       */
      createReactChildWrap() {
        return React.createElement("span", { [wrpChld]: true });
      },

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      createReactEl(cmp:React.FC<any> , props:any) {
        return React.createElement(cmp, props, this.createReactChildWrap());
      },

      mountReact(cmp:React.ReactElement, el: HTMLElement) {
        ReactDOM.createRoot(el).render(cmp);
      },

      render() {
        const { model, el } = this;
        this.updateAttributes();
        this.renderChildren();
        const reactEl = this.createReactEl(model.get("component"), {
          ...model.get("attributes")
        });
        this.mountReact(reactEl, el);
        const chld = el.querySelector(`span[${wrpChld}]`);

        // If the container is found, the react component is able to render children
        if (chld) {
          const chldCont = this.getChildrenContainerHolder();
          while (chldCont.firstChild) {
            chld.appendChild(chldCont.firstChild);
          }
        }

        return this;
      },

      __upRender() {
        clearTimeout(this._upr);
        this._upr = setTimeout(() => this.render());
      }
    }
  });
};
