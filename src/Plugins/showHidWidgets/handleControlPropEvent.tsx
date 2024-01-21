import { removeAnimation } from "./handleCssAnimation";
import grapesjs, { Editor, Component, Components } from "grapesjs";

function applyAnimation(
  component: Component,
  animationType: string,
  action: string
) {
  removeAnimation(component);

  switch (animationType) {
    case "fade":
      if (action == "show") component.addClass("fadeIn");
      else component.addClass("fadeOut");
      break;
    case "slideLeft":
      component.addClass("slideLeft");
      break;
    case "slideUp":
      component.addClass("slideUp");
      break;
    case "slideDown":
      component.addClass("slideDown");
      break;
    case "slideRight":
      component.addClass("slideRight");
      break;
    default:
      break;
  }
}
function findComponent(allComponents: Component[], id: number) {
  for (const comp of allComponents) {
    if (comp.getId() === id) {
      return comp;
    }
  }
  return null;
}
export function addClickEventToSelectedComponent(
  editorInstance: Editor,
  selectedComponent: Component,
  allComponents: Component[]
) {
  if (selectedComponent) {
    const canvas = editorInstance.Canvas;

    const currentStyle = selectedComponent.getStyle();
    const gotoId = currentStyle.goto;
    const idShow = currentStyle.showT;
    const idHide = currentStyle.hideT;
    const leaveA = currentStyle.leaveA;
    const enterA = currentStyle.enterA;
    const showByDefault = currentStyle.showByDefault;
    if (gotoId) {
      // let component = findComponent(allComponents, idShow);
      let component = findComponent(allComponents, gotoId);
      canvas.scrollTo(component, { behavior: "" });
    }
    if (
      showByDefault &&
      showByDefault == "on" &&
      ((idShow && idShow !== "none") || (idHide && idHide !== "none"))
    ) {
      const component = findComponent(allComponents, idShow | idHide);
      if (component) {
        const currentStyle = component.getStyle();
        let updatedStyle = {
          ...currentStyle,
          display: "block",
        };

        component.setStyle(updatedStyle);
      } else {
        return null;
      }
    }
    if (
      idShow &&
      idShow !== "none" &&
      !showByDefault &&
      showByDefault != "on"
    ) {
      let component = findComponent(allComponents, idShow);

      if (component) {
        const currentStyle = component.getStyle();
        let updatedStyle = {
          ...currentStyle,
          display: "block",

          // transition: "all 3s ease-in-out",
        };

        applyAnimation(component, enterA, "show");

        component.setStyle(updatedStyle);
        setTimeout(() => {
          removeAnimation(component);
          // updatedStyle = {
          //   ...currentStyle,
          // };
          // component.setStyle(updatedStyle);
        }, 3000);
      } else {
        return null;
      }
    }

    if (
      idHide &&
      idHide !== "none" &&
      !showByDefault &&
      showByDefault != "on"
    ) {
      let componentHid = findComponent(allComponents, idHide);

      if (componentHid) {
        const currentStyle = componentHid.getStyle();
        let updatedStyle = {
          ...currentStyle,
        };

        applyAnimation(componentHid, leaveA, "hide");

        componentHid.setStyle(updatedStyle);
        setTimeout(() => {
          removeAnimation(componentHid);
          updatedStyle = {
            ...currentStyle,
            display: "none",
            // transition: "all 1s ease-in-out",
          };
          componentHid?.setStyle(updatedStyle);
        }, 3000);
      } else {
        return null;
      }
    }
  }
}
