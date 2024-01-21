import grapesjs, { Editor, Component, Components, Property } from "grapesjs";

export function addHideOrShowWidgetsControllProperties(editorInstance: Editor) {
  const styleManager = editorInstance.StyleManager;

  const sector = styleManager.addSector("Control", {
    name: "Control",
    open: true,
  });
  type ComponentId = {
    value: string;
    name: string;
  };

  let componentIds: ComponentId[] = []; // Function to update componentIds array dynamically

  function updateComponentIds() {
    const allComponents: Component[] =
      editorInstance.DomComponents.getComponents();
    if (allComponents) {
      // Function to recursively get all components and their children
      function getAllComponentsWithChildren(component: Component): Component[] {
        const children: Component[] = component
          .get("components")
          .map((child: Component) => getAllComponentsWithChildren(child));

        return [component, ...children];
      }
      function getUpdatedComponentIds() {
        return componentTree.map((component) => {
          let id;
          let tagName;

          if (Array.isArray(component)) {
            // If the component is an array, take the first item's ID
            id = component[0]?.ccid;
            tagName =
              component[0]?.tagName ?? component[0]?.attributes?.tagName;
          } else {
            // If it's a regular object, directly access the ID
            id = component.ccid;
            tagName =
              component.tagName ||
              (component.attributes && component.attributes.tagName);
          }

          return {
            value: id,
            name: tagName,
          };
        });
      }
      // Map the components and their children to create a structure
      const componentTree = allComponents.reduce(
        (acc: Component[], component: Component) => {
          return acc.concat(getAllComponentsWithChildren(component));
        },
        []
      );

      // Map the component IDs and append them to the updatedComponentIds array
      const updatedComponentIds = getUpdatedComponentIds();

      // Replace the entire componentIds array with the updated values, starting with "none"
      componentIds = updatedComponentIds;

      // If you want to ensure "none" remains the first item, you can re-add it
      if (componentIds.length > 1) {
        componentIds.push({ value: "none", name: "none" });
      }

      // Update the list of "showT," "hideT," "enterA," and "leaveA" properties
      const properties = sector.getProperties();

      if (properties) {
        properties.forEach((property: Property) => {
          if (
            property.id === "showT" ||
            property.id === "hideT" ||
            property.id === "goto"
          ) {
            property.set("list", componentIds);
            styleManager.render();
          }
        });
      }
    }
  }
  editorInstance.on("component:update", () => {
    updateComponentIds();
  });
  // editorInstance.on("component:add", () => {
  //   updateComponentIds();
  // });
  // editorInstance.on("component:remove", () => {
  //   updateComponentIds();
  // });
  // Add a "showTriggers" property
  styleManager.addProperty(
    "Control",
    {
      type: "select",
      label: "showT",
      property: "showT",
      defaults: "none",
      list: componentIds, // Initially empty, will be updated dynamically
    },
    { at: 0 }
  );
  styleManager.addProperty(
    "Control",
    {
      type: "select",
      label: "GoTo",
      property: "goto",
      defaults: "none",
      list: componentIds, // Initially empty, will be updated dynamically
    },
    { at: 5 }
  );
  // Add a "hideTriggers" property
  styleManager.addProperty(
    "Control",
    {
      type: "select",
      label: "hideT",
      property: "hideT",
      defaults: "none",
      list: componentIds, // Initially empty, will be updated dynamically
    },
    { at: 1 }
  );

  styleManager.addProperty(
    "Control",
    {
      type: "select",
      label: "enterA",
      property: "enterA",
      defaults: "non",
      list: [
        { value: "fade", name: "fade" },
        { value: "slideLeft", name: "slideLeft" },
        { value: "slideRight", name: "slideRight" },
        { value: "slideUp", name: "slideUp" },
        { value: "slideDown", name: "slideDown" },
        { value: "none", name: "none" },
      ], // Initially empty, will be updated dynamically
    },
    { at: 2 }
  );

  styleManager.addProperty(
    "Control",
    {
      type: "select",
      label: "leaveA",
      property: "leaveA",
      defaults: "non",
      list: [
        { value: "fade", name: "fade" },
        { value: "slideLeft", name: "slideLeft" },
        { value: "slideRight", name: "slideRight" },
        { value: "slideUp", name: "slideUp" },
        { value: "slideDown", name: "slideDown" },
        { value: "none", name: "none" },
      ], // Initially empty, will be updated dynamically
    },
    { at: 3 }
  );

  styleManager.addProperty(
    "Control",
    {
      type: "radio",
      label: "Show by default",
      property: "showByDefault",
      defaults: "off",
      options: [
        { value: "on", name: "on" },
        { value: "off", name: "off" },
      ],
    },
    { at: 4 }
  );

  // Add more properties in a similar manner
}
