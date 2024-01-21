import grapesjs, { Editor, Component, StyleProps } from "grapesjs";

export function addAnimationProperties(editorInstance: Editor) {
  const styleManager = editorInstance.StyleManager;

  const sector = styleManager.addSector("Animation", {
    name: "Animation",
    open: true,
  });
  // Add a "Scroll Speed" property
  const property = styleManager.addProperty(
    "Animation",
    {
      type: "integer", // Use "integer" for whole numbers
      label: "Scroll Speed",
      property: "scroll-speed", // This can be a custom CSS property
      default: "0%", // Initial scroll speed value
      units: ["%"],
    },
    { at: 0 }
  );
}

export function findPropertityValue(
  cssProperties: StyleProps,
  propertity: string
) {
  let numericValue;
  const propertityValue = cssProperties[propertity];

  if (typeof propertityValue === "string") {
    const match = propertityValue.match(/^(\d+(?:\.\d+)?)%$/);

    if (match) {
      numericValue = parseFloat(match[1]); // Extract the numeric value
      const unit = "%"; // Extracted from the regular expression

      return [numericValue, unit];
    } else return null;
  } else return null;
}
