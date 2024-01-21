import {
  addAnimationProperties,
  findPropertityValue,
} from "./handleProperties";
import grapesjs, { Editor, Component } from "grapesjs";
export function getAllComponentsWithChildren(
  editorInstance: Editor
): Component[] {
  const allComponents: Component[] =
    editorInstance.DomComponents.getComponents();

  function traverseComponentTree(component: Component): Component[] {
    const children = component?.components();
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
export function handleScrollEvent(editorInstance: Editor, window: Window) {
  const allComponents = getAllComponentsWithChildren(editorInstance);
  // Iterate through all components
  allComponents.forEach((component: Component) => {
    const element = component.view?.el; // Use optional chaining to access the HTML element of the component
    // Now you can access properties of the bounding box like `top`, `left`, `width`, `height`, etc.

    // Log the bounding box properties
    const cssProperties = component.getStyle();

    if ("scroll-speed" in cssProperties) {
      const rect = boundingBox(element);
      let scrollPosition = 0; // Initial scroll position
      const newScrollPosition = window.scrollY;
      const scrollAmount = newScrollPosition - scrollPosition;
      let [numericValue, unit] = findPropertityValue(
        cssProperties,
        "scroll-speed"
      );
      if (numericValue) {
        const windowBottom = window.scrollY;

        numericValue = numericValue / 100;
        let amount = scrollAmount * numericValue;

        if (rect.top < window.innerHeight) {
          const offset = Math.max(
            window.innerHeight - (window.scrollY + rect.top),
            0
          );
          const dist =
            (window.innerHeight - rect.top - offset) * (1 - numericValue);

          const currentStyle = component.getStyle();
          const updatedStyle = {
            ...currentStyle,
            transform: `translateY(${dist}px)`,
          };

          component.setStyle(updatedStyle);
        } else {
          const currentStyle = component.getStyle();
          const updatedStyle = {
            ...currentStyle,
            transform: "none", // Reset the transform
          };

          component.setStyle(updatedStyle);
        }

        scrollPosition = newScrollPosition;

        // Manually trigger a refresh of the GrapesJS canvas to see the changes
        editorInstance.refresh();
      }
    }
  });
}

function boundingBox(element: HTMLElement) {
  if (element) {
    const boundingBox = element.getBoundingClientRect(); // Retrieve the bounding box
    return boundingBox;
  } else {
    return null;
  }
}
export function handleSpeedScrollEvent(editorInstance: Editor) {
  addAnimationProperties(editorInstance);

  editorInstance.on("load", () => {
    const canvas = editorInstance.Canvas;
    let window = canvas.getWindow();
    window.addEventListener("scroll", () => {
      handleScrollEvent(editorInstance, window);
    });
  });
  editorInstance.on(
    "component:styleUpdate:scroll-speed",
    (component: Component) => {
      const currentStyle = component.getStyle();
      if (!("scroll-speed" in currentStyle)) {
        const updatedStyle = {
          ...currentStyle,
          transform: "none", // Reset the transform
        };
        component.setStyle(updatedStyle);
      }
    }
  );
}
