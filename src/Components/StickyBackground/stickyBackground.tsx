import { Editor } from "grapesjs";
import { defaultStyles } from "./stickyBackgroundStyle";
import stickyBackgroundIcon from "../../assets/sticky-background.svg";

export default function stickyBackground(editor: Editor) {
  // Define the StickyImage block
  editor.BlockManager.add("Sticky Background", {
    label: "Sticky Image",
    category: "Media",
    attributes: { class: "fa fa-image" },
    media: `<img src="${stickyBackgroundIcon}" >`,

    content: {
      type: "sticky-image",
      components: `
        <div data-gjs-type="sticky-image" class="stickyimg">
        </div>
      `,
    },
  });

  // Add the default styles
  const cssRules = editor.Css;
  cssRules.addRules(defaultStyles);

  return {};
}
