import previewManagerStore from "../../GlobalStates/PreviewManagerStore";
import ZoomAndDragLogic from "./ZoomAndDragLogic";
import { alignControl } from "../HeaderPanelProperties/alignment/alignmentPropertise";

import {
  handleIconsPropertiesStyleUpdate,
  showLayerChildren,
  removBody,
} from "./handleLayers";
import { Block, Editor, Component } from "grapesjs";
import { canvasCss, canvasCssPreview } from "./canvasCss";

export function handleLayersEvent(editorInstance: Editor) {
  alignControl(editorInstance);
  handleVeiwCllick(editorInstance);
  editorInstance.on("component:styleUpdate", (component: Component) => {
    handleIconsPropertiesStyleUpdate(component, false);
  });
  editorInstance.on("layer:component", (component: Component) => {
    // Get the updated style of the component
    showLayerChildren();
    handleIconsPropertiesStyleUpdate(component, true);

    // handleIconsPropertiesLayersUpdate(component);
  });
  editorInstance.on("component:update", (component: Component) => {
    // Get the updated style of the component
    //
    showLayerChildren();
    handleIconsPropertiesStyleUpdate(component, true);

    // handleIconsPropertiesLayersUpdate(component);
  });
  editorInstance.on("load", () => {
    const {
      BlockManager: blocks,
      Commands: commands,
      Panels: panel,
    } = editorInstance;

    const panelsToRemove = ["views-container", "views", "commands", "options"];
    if (editorInstance) {
      panelsToRemove.map((pn) => panel.removePanel(pn));
    }

    ZoomAndDragLogic(editorInstance);
const mediaBlockButton = document.getElementById("media-blocks");
const basicBlockButton = document.getElementById("basic-blocks");
let blockType = "Media";

 const filtered = blocks
      .getAll()
      .filter((block: Block) => block.getCategoryLabel() == blockType);
    handleCusomtUi(filtered, "modal-blocks");

 const shapes = blocks
      .getAll()
      .filter((block: Block) => block.getCategoryLabel() == "Shapes");
    handleCusomtUi(shapes, "modal-shapes");



mediaBlockButton?.addEventListener("click", () => {
    blockType = "Media"; 
    const filtered = blocks
      .getAll()
      .filter((block: Block) => block.getCategoryLabel() == blockType);
    handleCusomtUi(filtered, "modal-blocks");
    mediaBlockButton.style.color = "white",
    mediaBlockButton.style.borderBottom = "1px solid #c64848"
    basicBlockButton!.style.color = "#6d4545",
    basicBlockButton!.style.borderBottom = "none"

});

basicBlockButton?.addEventListener("click", () => {
    blockType = "Basic"; 
    const filtered = blocks
      .getAll()
      .filter((block: Block) => block.getCategoryLabel() == blockType);
    handleCusomtUi(filtered, "modal-blocks");
    basicBlockButton!.style.color = "white",
    basicBlockButton!.style.borderBottom = "1px solid #c64848"
    mediaBlockButton!.style.color = "#6d4545",
    mediaBlockButton!.style.borderBottom = "none"
    

}); 


    const closeBtnModalMedia = document.getElementById("close-modal");

    closeBtnModalMedia?.addEventListener("click", () => {
      const modal = document.getElementById("modal");
      const btn = document.querySelector(".gjs-pn-btn.fa.fa-star");
      btn?.classList.toggle("gjs-pn-active");
      btn?.classList.toggle("gjs-four-color");
      modal!.style.display = "none";
    });

    const closeShapesButton = document.getElementById("close-shapes");

    closeShapesButton?.addEventListener("click", () => {
      const modal = document.getElementById("modal-shapes-cont");
      const btn = document.querySelector(".gjs-pn-btn.fa.fa-star");
      btn?.classList.toggle("gjs-pn-active");
      btn?.classList.toggle("gjs-four-color");
      modal!.style.display = "none";
    });

    removBody();
    activeScreen();
  });
  function resetBlockStyles() {
    document.querySelectorAll(".block-div").forEach((div) => {
      const mediaElement = div.querySelector(".media-element");
      const idElement = div.querySelector(".id-element");
      if (mediaElement && idElement) {
        mediaElement.style.border = "none";
        idElement.style.color = "#865757";
      }
    });
  }
  function activeScreen() {
    const screens = document.querySelectorAll(".gjs-pn-buttons .gjs-pn-btn");

    const initiallyActiveButton = screens[0];
    initiallyActiveButton.classList.add("gjs-pn-active");
    initiallyActiveButton.style.backgroundColor = "#833A3A";

    screens.forEach((button) => {
      button.addEventListener("click", function () {
        screens.forEach((btn) => (btn.style.backgroundColor = ""));

        this.style.backgroundColor = "#833A3A";
      });
    });
  }
  let selectedBlock: Block | null;

  function createAndAppendBlocks(blocks, container, modalType) {
    let currentRow = createRowDiv();
    container.appendChild(currentRow);
    let blockCount = 0;

    blocks.forEach((block) => {
      if (blockCount >= 5) {
        currentRow = createRowDiv();
        container.appendChild(currentRow);
        blockCount = 0;
      }

      const blockElement = createBlockElement(block, modalType);
      currentRow.appendChild(blockElement);
      blockCount++;
    });
  }

  function createRowDiv() {
    const rowDiv = document.createElement("div");
    rowDiv.style.display = "flex";
    rowDiv.style.flexDirection = "row";
    rowDiv.style.justifyContent = "start";
    rowDiv.style.marginBottom = "30px";
    return rowDiv;
  }

  const createBlockElement = (block: Block, modalType) => {
    const blockDiv = document.createElement("div");
    blockDiv.className = "block-div";
    blockDiv.style.display = "flex";
    blockDiv.style.flexDirection = "column";
    blockDiv.style.justifyContent = "space-between";
    blockDiv.style.width = "20%";
    blockDiv.style.height = "160px";
    blockDiv.style.textAlign = "left";

    const mediaElement = document.createElement("div");
    mediaElement.className = "media-element";
    mediaElement.innerHTML = block.getMedia();
    mediaElement.style.width = "80%";
    mediaElement.style.borderRadius = "3px";
    blockDiv.appendChild(mediaElement);
    const idElement = document.createElement("p");
    idElement.className = "id-element";
    idElement.textContent = block.getId();
    idElement.style.fontSize = "13px";
    idElement.style.color = "#865757";
    blockDiv.appendChild(idElement);

    blockDiv.onclick = function () {
      resetBlockStyles();
      selectedBlock = block;
      updateButtonStyle(modalType);
      const mediaElement = blockDiv.querySelector(".media-element");
      const idElement = blockDiv.querySelector(".id-element");
      if (mediaElement && idElement) {
        mediaElement.style.border = "1px solid #CC0707";
        idElement.style.color = "#FFFFFF";
      }
    };

    return blockDiv;
  };

  const updateButtonStyle = (modalType: string) => {
    let btn: HTMLElement  | null;
    if(modalType === "modal-blocks") {
        btn = document.getElementById("modal-add-button")
    }
    else {
        btn = document.getElementById("modal-add-shapes")
    }
    if (btn) {
      if (selectedBlock) {
        btn.style.backgroundColor = "#ED1C25";
        btn.style.color = "white";
        btn.style.border = "none";
      }
    }
  };

  const handleCllick = (modalType:string) => {
    let addBtn: HTMLElement  | null;
    if(modalType === "modal-blocks") {
        addBtn = document.getElementById("modal-add-button")
    }
    else {
        addBtn = document.getElementById("modal-add-shapes")
    }
    addBtn?.addEventListener("click", function () {
      if (selectedBlock) {
        const targetComponent = editorInstance.getSelected(); 
        console.log(targetComponent);
        const btn = document.querySelector(".gjs-pn-btn.fa.fa-star");
        btn?.classList.toggle("gjs-pn-active");
        btn?.classList.toggle("gjs-four-color");

        if (targetComponent && selectedBlock) {
          targetComponent.append(selectedBlock.get('content'));
        }
        let modal: HTMLElement | null;
        if(modalType === "modal-blocks") {
            modal = document.getElementById("modal")
        }
        else {
            modal = document.getElementById("modal-shapes-cont")
        }

        if (modal!) {
          modal.style.display = "none";
          addBtn!.style.backgroundColor = "transparent";
          addBtn!.style.border = "2px solid #4A2B2C";
          selectedBlock = null; // Reset selectedBlock
          resetBlockStyles();
        }
      }
    });
  };

  const handleCusomtUi = (blocks: Block[], modal: string) => {
      console.log(blocks)
    const container = document.getElementById(modal);
    container!.innerHTML = '';
    createAndAppendBlocks(blocks, container, modal);

    handleCllick(modal);
  };
}

function handleVeiwCllick(editorInstance: Editor) {
  const layersPanel = document.getElementById(
    "left-panel-id"
  ) as HTMLDivElement;
  const stylePanel = document.getElementById(
    "right-panel-id"
  ) as HTMLDivElement;
  const titlePanel = document.getElementById(
    "title-panel-id"
  ) as HTMLDivElement;
  const headPanel = document.querySelector(".headerPanel") as HTMLDivElement;
  const customPreviewButton = document.querySelector(".viewControl");
  const canvas = document.querySelector(".gjs-cv-canvas") as HTMLDivElement;
  const editor = document.querySelector(".editor-canvas") as HTMLDivElement;

  var VeiwMoodExitButton: HTMLElement | null;

  customPreviewButton?.addEventListener("click", function () {
    if (!previewManagerStore.isPreview) {
      editorInstance.trigger("run:preview");
    }
    previewManagerStore.setIsPreview(true);
  });
  // Preview mode run action
  editorInstance.on("run:preview", () => {
    const cssRules = editorInstance.Css;
    const canvasDoc = editorInstance.Canvas.getFrameEl().contentDocument;
    const dynamicButton = canvasDoc?.querySelector(".dynamic-button");
    const highlighter = document.querySelectorAll(
      ".gjs-cv-canvas .gjs-highlighter, .gjs-cv-canvas .gjs-highlighter-sel"
    );
    highlighter.forEach((highlighter) => {
      highlighter.style.outline = "none";
    });
    updateDragMode(editorInstance, "");

    setDraggableForAllComponents(editorInstance, false);

    cssRules.addRules(canvasCssPreview);
    editorInstance.Commands.run("core:preview");

    layersPanel.style.display = "none";
    titlePanel.style.display = "none";
    stylePanel.style.marginTop = "0px";
    canvas.style.position = "unset";
    editor.style.marginLeft = "unset";
    editor.style.marginRight = "unset";
    editor.style.marginTop = "unset";
    editor.style.height = "100vh";
    if (dynamicButton) dynamicButton.style.visibility = "hidden";
    headPanel.style.visibility = "hidden";
    if (!VeiwMoodExitButton) {
      VeiwMoodExitButton = document.createElement("span");
      VeiwMoodExitButton.id = "VeiwMoodExit";
      VeiwMoodExitButton.style.position = "fixed";
      VeiwMoodExitButton.style.padding = "7px";
      VeiwMoodExitButton.style.left = "5px";
      VeiwMoodExitButton.style.top = "5px";
      VeiwMoodExitButton.style.backgroundImage =
        'url("src/Panel/layers/assets/cross.svg")';
      VeiwMoodExitButton.style.backgroundSize = "contain";
      VeiwMoodExitButton.style.backgroundColor = "transparent";
      document.body.appendChild(VeiwMoodExitButton);

      VeiwMoodExitButton.addEventListener("click", function () {
        if (previewManagerStore.isPreview) {
          editorInstance.trigger("stop:preview");
        }
        previewManagerStore.setIsPreview(false);
      });
    }
  });
  function updateDragMode(editorInstance: Editor, newDragMode) {
    editorInstance.setDragMode(newDragMode);
  }
  editorInstance.on("stop:preview", () => {
    const cssRules = editorInstance.Css;
    updateDragMode(editorInstance, "translate");
    editorInstance.Commands.stop("core:preview");

    setDraggableForAllComponents(editorInstance, true);

    const canvasDoc = editorInstance.Canvas.getFrameEl().contentDocument;
    const dynamicButton = canvasDoc?.querySelector(".dynamic-button");
    const highlighter = document.querySelectorAll(
      ".gjs-cv-canvas .gjs-highlighter, .gjs-cv-canvas .gjs-highlighter-sel"
    );
    highlighter.forEach((highlighter) => {
      highlighter.style.outline = "1px solid #833a3a;";
    });

    cssRules.remove(canvasCssPreview);
    cssRules.addRules(canvasCss);

    layersPanel.style.display = "block";
    titlePanel.style.display = "block";
    stylePanel.style.marginTop = "50px";
    headPanel.style.visibility = "visible";
    canvas.style.position = "absolute";
    if (dynamicButton) dynamicButton.style.visibility = "visible";
    editor.style.marginLeft = "0.875rem";
    editor.style.marginRight = "0.875rem";
    editor.style.marginTop = "0.875rem";
    editor.style.height = "91vh";
    // Remove the dynamically created VeiwMoodExitButton
    if (VeiwMoodExitButton) {
      document.body.removeChild(VeiwMoodExitButton);
      VeiwMoodExitButton = null;
    }
  });
}

// Function to set draggable property for all components
function setDraggableForAllComponents(
  editorInstance: Editor,
  previewValue: boolean
) {
  const allComponents: Component[] =
    editorInstance.DomComponents.getComponents();
  allComponents.forEach((component: Component) => {
    // Check if the component has a 'draggable' property

    if (component.get("draggable") !== undefined)
      component.set("draggable", previewValue);
    if (component.get("resizable") !== undefined)
      component.set("resizable", previewValue);
    if (component.get("droppable") !== undefined)
      component.set("droppable", previewValue);
  });

  // Update the canvas
  editorInstance.refresh();
}

// Call the function with draggable set to false
