import { Editor } from "grapesjs";
import ImageCompare from "./components/ImageCompare";
import imageCompareIcon from "../../assets/image-compare-icon.svg";

export default (editor: Editor) => {
  const { DomComponents: components, BlockManager: blocks } = editor;

  components.addType("ImageCompare", {
    extend: "react-component",
    model: {
      defaults: {
        component: ImageCompare,
        items: [],
        assetIds: [],
        editable: true,
        stylable: true,
        resizable: true,
        draggable: true,
        droppable: true,
        copyable: true,
        badgable: true,
        validParentTypes: ["section"],
        attributes: {
          compId: null,
        },
        styles: `
        .danger-image-compare-desc >*,.danger-image-compare-title >*{
          margin:0;
          padding:0;
        }
        `,
      },
    },
    view: {
      init() {
        this.model.setAttributes({ compId: this.model.getId() });
      },
    },

    isComponent: (el) => el.tagName === "IMAGECOMPARE",
  });

  blocks.add("Image Compare", {
    label: "Image Compare",
    media: `<img src="${imageCompareIcon}" alt="Hover gallery">`,
    category: "Media",
    content: `<ImageCompare />`,
  });
};
