import { Editor } from "grapesjs";
import HoverComponent from "./components/HoverGallery";
import hoverGGalleryIcon from "../../assets/hover-gallery-icon.svg";

export default (editor: Editor) => {
  const { DomComponents: components, BlockManager: blocks } = editor;

  components.addType("HoverGallery", {
    extend: "react-component",
    model: {
      defaults: {
        component: HoverComponent,
        editable: true,
        stylable: true,
        draggable: true,
        droppable: true,
        copyable: true,
        selectable: true,
        hoverable: true,
        highlightable: true,
        badgable: true,
        resizable: {
          ratioDefault: true,
          keepAutoHeight: true,
          currentUnit: 1,
        },
        // styles: `
        // .hover-gallery-title > * {
        //   margin:0;  
        //   width: 52px;
        //     height: 101px;
        //     font-family: "Helvetica Neue";
        //     font-size: 90px;
        //     font-weight: normal;
        //     font-style: normal;
        //     text-align: center;
        //     color: #ffffff;
        //   }
        //   .hover-gallery-bottom-header {
        //     font-family: "Helvetica Neue";
        //       font-size: 33px;
        //       line-height: 34px;
        //       text-align: center;
        //       color: #ffffff;
        //   }

        // `,
      },
    },
    isComponent: (el) => el.tagName === "HOVERGALLERY",
  });

  blocks.add("Hover Gallery", {
    label: "Hover Gallery",
    media: `<img src="${hoverGGalleryIcon}" alt="Hover gallery">`,
    category: "Media",
    content: `<HoverGallery />`,
  });
};
