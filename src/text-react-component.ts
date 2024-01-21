import ReactDOM from "react-dom/client";
import React, { Component } from "react";
import { Editor, ComponentModelDefinition, ComponentViewDefinition, ComponentView } from "grapesjs";

export default (editor:Editor, { coreReactModel, coreReactView }:{coreReactModel:Partial<ComponentModelDefinition> & ThisType<ComponentModelDefinition & Component>; coreReactView:Partial<ComponentViewDefinition> & ThisType<ComponentViewDefinition & ComponentView>}) => {

  const wrpChld = "data-chld";
  const renderWait = 100;

  editor.Components.addType("text-react-component", {
    extend: "text",
    model: {
      ...coreReactModel,
    },

    view: {
      onRender() {
        const { model } = this;
        this.listenTo(model, "change:attributes", this.renderReact);
        this.renderReact();
      },

      /**
       * We need this container to understand if the React component is able
       * to render children
       */
      createReactChildWrap() {
        return React.createElement("span", { [wrpChld]: true });
      },

      createReactEl(cmp:React.FC<any> , props:any) {
        return React.createElement(cmp, props, this.createReactChildWrap());
      },

      mountReact(cmp:React.ReactElement, el: HTMLElement) {
        if (this.reactRoot?.render) return this.reactRoot.render(cmp);
        this.reactRoot = ReactDOM.createRoot(el);
        return this.reactRoot.render(cmp);
      },

      renderReact() {
        const { model, el } = this;
        const text = el.innerHTML;
        const reactEl = this.createReactEl(model.get("component"), {
          ...model.get("attributes"),
        });
        this.mountReact(reactEl, el);
        this.__renderChildComponents(el, text);

        return this;
      },

      __renderChildComponents(el: HTMLElement, text: string) {
        clearTimeout(this._rcc);
        this.rcc = setTimeout(() => {
          const chld = el.querySelector(`span[${wrpChld}]`) as HTMLElement;

          // If the container is found, the react component is able to render children
          if (chld) {
            chld.style.display = "inherit";
            chld.innerHTML = text;
          }
        }, renderWait);
      },
    },
  });
};