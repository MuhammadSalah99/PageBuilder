import grapesjs, { Editor, Component, Components } from "grapesjs";

import { addClickEventToSelectedComponent } from "./handleControlPropEvent";
import { removeAnimation, addAnimation } from "./handleCssAnimation";
export function getAllComponentsWithChildren(
  editorInstance: Editor
): Component[] {
  const allComponents: Component[] =
    editorInstance.DomComponents.getComponents();

  function traverseComponentTree(component: Component): Component[] {
    const children = component.components();
    let result: Component[] = [component];

    children.forEach((child: Component) => {
      result = result.concat(traverseComponentTree(child));
    });

    return result;
  }

  return allComponents.reduce((acc: Component[], component: Component) => {
    return acc.concat(traverseComponentTree(component));
  }, []);
}

export function handlePreviewOpen(editorInstance: Editor) {
  editorInstance.on("run:preview", () => {
    const allComponentsWithChildren =
      getAllComponentsWithChildren(editorInstance);
    // Attach onClick event to each component's HTML element
    allComponentsWithChildren?.forEach((component: Component) => {
      const componentElement = component?.getEl();
      if (componentElement) {
        removeAnimation(component);
        componentElement.removeEventListener("click", () => {});
        componentElement.addEventListener("click", () => {
          addClickEventToSelectedComponent(
            editorInstance,
            component,
            allComponentsWithChildren
          );
        });
      }
    });
  });
}
// export function handlePreviewClose(editorInstance: Editor) {
//   editorInstance.on("stop:preview", () => {
//     // Get all GrapeJS components
//     const allComponents: Component[] = Object.values(
//       editorInstance.DomComponents.getComponents()
//     );
//     // Attach onClick event to each component's HTML element
//     allComponents.forEach((component: Component) => {
//       if (component) {
//         const componentElement = component?.getEl();

//         removeAnimation(component);

//         componentElement?.removeEventListener("click", () => {
//           // Add your code to handle the click event on the clicked component
//         });
//       }
//       // Check if the component element exists
//     });
//   });
// }

export function handleEditorLoad(editorInstance: Editor) {
  editorInstance.on("load", () => {
    addAnimation(editorInstance);
    const allComponents: Component[] =
      editorInstance.DomComponents.getComponents();

    // Attach onClick event to each component's HTML element

    allComponents.forEach((component: Component) => {
      if (component) removeAnimation(component);
    });
    editorInstance.on("component:selected", (component: Component) => {
      const allComponentsWithChildren =
        getAllComponentsWithChildren(editorInstance);
      addClickEventToSelectedComponent(
        editorInstance,
        component,
        allComponentsWithChildren
      );
    });
  });
}

export function handlAllHideOrShowWidgetsEvents(editorInstance: Editor) {
  handleEditorLoad(editorInstance);
  handlePreviewOpen(editorInstance);
  // handlePreviewClose(editorInstance);
}
