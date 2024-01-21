import { Component, Editor } from "grapesjs";

export function alignControl(editorInstance: Editor) {
  alignElement(editorInstance, "right", "right");
  alignElement(editorInstance, "left", "left");
  alignElement(editorInstance, "centerV", "centerV");
  alignElement(editorInstance, "centerH", "centerH");
  alignElement(editorInstance, "up", "up");
  alignElement(editorInstance, "down", "down");
}

function alignElement(
  editorInstance: Editor,
  direction: string,
  buttonId: string
) {
  let selectedComponents: Component[] = [];

  function updateSelectedComponentsStyle() {
    if (direction == "right" || direction == "left") {
      alignLeftOrRight();
    }
    if (direction == "up") {
      updateTopsToMinTop();
    }
    if (direction == "down") {
      updateBottomToMinTop();
    }
    if (direction == "centerV") {
      updateAlginCenterV();
    }
    if (direction == "centerH") {
      updateAlginCenterH();
    }
  }
  function updateTopsToMinTop() {
    if (selectedComponents.length > 1) {
      let minTop = 0;

      selectedComponents.forEach((component) => {
        const componentView = component.view;

        if (componentView) {
          const rect = componentView.el.getBoundingClientRect();
          const top = parseFloat(rect.bottom);

          if (top < minTop) {
            minTop = top;
          }
        }
      });

      let currentLeft = 0;
      selectedComponents.forEach((component) => {
        const componentView = component.view;

        if (componentView) {
          const currentStyle = component.getStyle();

          const rect = componentView.el.getBoundingClientRect();
          const width = rect.width || 0;
          const updatedStyle = {
            left: `${currentLeft}px`,
            top: `${minTop}px`,
            position: "absolute",
          };
          const mergedStyle = {
            ...currentStyle,
            ...updatedStyle,
          };

          component.setStyle(mergedStyle);

          currentLeft += width;
          currentLeft += 5;
        }
      });
    }
  }

  function updateBottomToMinTop() {
    if (selectedComponents.length > 1) {
      let maxBottom = 0;

      selectedComponents.forEach((component) => {
        const componentView = component.view;

        if (componentView) {
          const rect = componentView.el.getBoundingClientRect();
          const bottom = parseFloat(rect.bottom);

          if (bottom < maxBottom) {
            maxBottom = bottom;
          }
        }
      });

      let currentLeft = 0;
      selectedComponents.forEach((component) => {
        const componentView = component.view;

        if (componentView) {
          const currentStyle = component.getStyle();

          const rect = componentView.el.getBoundingClientRect();
          const width = rect.width || 0;
          const updatedStyle = {
            left: `${currentLeft}px`,
            bottom: `${maxBottom}px`,
            position: "absolute",
          };
          const mergedStyle = {
            ...currentStyle,
            ...updatedStyle,
          };

          component.setStyle(mergedStyle);

          currentLeft += width;
          currentLeft += 5;
        }
      });
    }
  }

  function updateAlginCenterH() {
    if (selectedComponents.length > 1) {
      let maxHeight = 0;

      selectedComponents.forEach((component) => {
        const currentStyle = component.getStyle();
        const componentView = component.view;

        if (componentView) {
          const rect = componentView.el.getBoundingClientRect();
          const height = rect.height || 0;

          if (height > maxHeight) {
            maxHeight = height;
          }
        }
      });

      let currentLeft = 0;

      selectedComponents.forEach((component) => {
        const currentStyle = component.getStyle();
        const componentView = component.view;

        if (componentView) {
          const rect = componentView.el.getBoundingClientRect();
          const width = rect.width || 0;

          const updatedStyle = {
            left: `${currentLeft}px`,
            top: `calc(50% - ${maxHeight / 2}px)`,
            position: "absolute",
          };

          const mergedStyle = {
            ...currentStyle,
            ...updatedStyle,
          };

          component.setStyle(mergedStyle);
          currentLeft += width;
          currentLeft += 5;
        }
      });
    }
  }
  function updateAlginCenterV() {
    if (selectedComponents.length > 1) {
      let maxWidth = -Infinity;

      selectedComponents.forEach((component) => {
        const currentStyle = component.getStyle();
        const componentView = component.view;

        if (componentView) {
          const rect = componentView.el.getBoundingClientRect();
          const width = rect.width || 0;

          if (width > maxWidth) {
            maxWidth = width;
          }
        }
      });

      let currentTop = 0;

      selectedComponents.forEach((component) => {
        const currentStyle = component.getStyle();
        const componentView = component.view;

        if (componentView) {
          const rect = componentView.el.getBoundingClientRect();
          const height = rect.height || 0;

          const updatedStyle = {
            top: `${currentTop}px`,
            left: `calc(50% - ${maxWidth / 2}px)`,

            position: "absolute",
          };

          const mergedStyle = {
            ...currentStyle,
            ...updatedStyle,
          };

          component.setStyle(mergedStyle);
          currentTop += height;
          currentTop += 5;
        }
      });
    }
  }
  function alignLeftOrRight() {
    if (selectedComponents.length > 0) {
      const updatedStyle = {
        float: direction,
      };

      selectedComponents.forEach((component) => {
        const currentStyle = component.getStyle();
        const shouldUpdate = currentStyle.float !== direction;

        if (shouldUpdate) {
          const mergedStyle = {
            ...currentStyle,
            ...updatedStyle,
          };

          component.setStyle(mergedStyle);
        }
      });
    }
  }

  editorInstance.on("component:selected", (component: Component) => {
    selectedComponents.push(component);
  });

  editorInstance.on("component:deselected", (component: Component) => {
    selectedComponents = selectedComponents.filter(
      (selectedComponent) => selectedComponent !== component
    );
  });

  const span = document.getElementById(buttonId);
  span?.addEventListener("click", updateSelectedComponentsStyle);
}
