import editorStore from "../../GlobalStates/EditorInstance";

export function addTextComponent() {
  const { editor } = editorStore;
  const canvas = editor?.Canvas.getBody();
  const targetComponent = editor?.getSelected();

  const clickHandler = (e: MouseEvent) => {
    if (targetComponent) {
      targetComponent?.append({
        tagName: "p",
        content: "Add Your text here!",
        type: "text",
        resizable: true,
        stylable: true,
        editable: true,
        style: {
          position: "absolute",
          display: "block",
          width: "50%",
          resizable: "both",
          padding: "4px",
          top: `${e.clientY}px`,
          left: `${e.clientX}px`,
        },
      });

      // Remove the click handler after it's invoked once
      canvas?.removeEventListener("click", clickHandler);
    }
  };

  if (targetComponent) {
    canvas?.addEventListener("click", clickHandler);
  }

  return () => {
    canvas?.removeEventListener("click", clickHandler);
  };
}





// Usage

// Use coordinates
// console.log(coordinates.x, coordinates.y);
// // Call cleanup when you're done with the event listener
// cleanup();

// const getCoordinates = () => {
//   const { editor } = editorStore;

//   const mouseMoveHandler = (e) => {
//     if ((e.target as HTMLElement).classList.contains("blank-section")) {
//      const  coordinates = { x: e.clientX, y: e.clientY };
//       // console.log(coordinates)
//     }

//   };

//   editor?.Canvas.getBody().addEventListener("mousemove", mouseMoveHandler);

//   // Return a cleanup function to remove the event listener when needed
//   return () => {
//     editor?.Canvas.getBody().removeEventListener("mousemove", mouseMoveHandler);
//   };
// };

// // Call getCoordinates to set up the event listener
// const cleanupGetCoordinates = getCoordinates();

// Call cleanupGetCoordinates when the component is unmounted or when you no longer need the event listener
// For example, in a cleanup or componentWillUnmount function
// cleanupGetCoordinates();
