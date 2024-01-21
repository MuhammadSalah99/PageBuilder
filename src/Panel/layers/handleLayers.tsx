import grapesjs, { Editor, Component } from "grapesjs";

export function showLayersPanel() {
  const all = document.querySelector(".allView") as HTMLElement | null;

  const panelLeft = document.querySelector(".panel-left") as HTMLElement | null;
  const toggle = document.querySelector(".toggle") as HTMLElement | null;
  if (panelLeft && toggle && all) {
    panelLeft.style.display = "block";
    all.style.display = "block";

    toggle.style.display = "block";
  }
}
export function hideLayersPanel() {
  const all = document.querySelector(".allView") as HTMLElement | null;
  const title = document.querySelector(".titile") as HTMLElement | null;

  const panelLeft = document.querySelector(".panel-left") as HTMLElement | null;
  const toggle = document.querySelector(".toggle") as HTMLElement | null;
  if (panelLeft && toggle && all && title) {
    panelLeft.style.display = "none";
    all.style.display = "none";

    toggle.style.display = "none";
  }
}
export function handleIconsPropertiesStyleUpdate(
  component: Component,
  updateLayer: boolean
) {
  if (updateLayer) {
    const ele = component.viewLayer?.el;

    if (ele) ele.id = component.getId();
  }
  const updatedStyle = component.getStyle();
  const id: string = component.getId();
  const layer = document.getElementById(id);
  if (layer) {
    const eyeIcon = layer?.querySelector(".gjs-layer-vis");

    // layers.forEach((layer, index) => {
    const htmlElement = layer as HTMLElement;
    const animation =
      htmlElement.querySelector(".animationIcon") ||
      htmlElement.querySelector(".animationIconAfter");
    const speed =
      htmlElement.querySelector(".scrollSpeedIcon") ||
      htmlElement.querySelector(".scrollSpeedIconAfter");
    const event =
      htmlElement.querySelector(".eventIcon") ||
      htmlElement.querySelector(".eventIconAfter");
    const propertiesToCheckAnimation = ["leaveA", "enterA"];
    const propertiesToCheckEvent = ["hideT", "showT"];

    if ("scroll-speed" in updatedStyle) {
      const speedIcon = layer?.querySelector(".scrollSpeedIcon");
      if (eyeIcon && !speedIcon) {
        const scrollSpeedIcon = document.createElement("div");
        speed?.classList.remove("scrollSpeedIconAfter");

        scrollSpeedIcon.className = "scrollSpeedIcon";
        layer?.insertBefore(scrollSpeedIcon, eyeIcon.nextSibling);
      }
    } else {
      if (!updateLayer) {
        speed?.classList.remove("scrollSpeedIcon");
        speed?.classList.add("scrollSpeedIconAfter");
      }
    }
    if (propertiesToCheckAnimation.some((prop) => prop in updatedStyle)) {
      const animationIcon = layer?.querySelector(".animationIcon");
      if (eyeIcon && !animationIcon) {
        const animationIcon2 = document.createElement("div");
        animation?.classList.remove("animationIconAfter");

        animationIcon2.className = "animationIcon";
        layer?.insertBefore(animationIcon2, eyeIcon.nextSibling);
      }
    } else {
      if (!updateLayer) {
        const animation = htmlElement.querySelector(".animationIcon");
        animation?.classList.remove("animationIcon");
        animation?.classList.add("animationIconAfter");
      }
    }

    if (propertiesToCheckEvent.some((prop) => prop in updatedStyle)) {
      const eventIcon = layer?.querySelector(".eventIcon");
      if (eyeIcon && !eventIcon) {
        const eventIcon2 = document.createElement("div");
        event?.classList.remove("eventIconAfter");

        eventIcon2.className = "eventIcon";
        layer?.insertBefore(eventIcon2, eyeIcon.nextSibling);
      }
    } else {
      if (!updateLayer) {
        const event = htmlElement.querySelector(".eventIcon");
        event?.classList.remove("eventIcon");
        event?.classList.add("eventIconAfter");
      }
    }
  }
}
export function removBody() {
  const element = document.querySelector(".gjs-layer__t-wrapper");

  const devices = document.querySelector(".gjs-pn-devices-c");
  if (devices) {
    document.querySelector(".deviceControl")?.appendChild(devices);
  }

  if (element) {
    element.classList.remove("gjs-selected");
  }
}
export function showLayerChildren() {
  const element = document.querySelector(".gjs-layer__t-wrapper");

  const chlid = document.querySelector(
    ".gjs-layer-children "
  ) as HTMLElement | null;

  if (element && chlid) {
    chlid.style.display = "block";

    element.classList.remove("gjs-selected");
  }
}
// export function handleIconsPropertiesLayersUpdate(component: Component) {
//   const ele = component.viewLayer?.el;

//   if (ele) ele.id = component.getId();

//   const updatedStyle = component.getStyle();
//   const id: string = component.getId();
//   const layer = document.getElementById(id);
//   if (layer) {
//     const eyeIcon = layer?.querySelector(".gjs-layer-vis");

//     // layers.forEach((layer, index) => {
//     const htmlElement = layer as HTMLElement;
//     const animation =
//       htmlElement.querySelector(".animationIcon") ||
//       htmlElement.querySelector(".animationIconAfter");
//     const speed =
//       htmlElement.querySelector(".scrollSpeedIcon") ||
//       htmlElement.querySelector(".scrollSpeedIconAfter");
//     const event =
//       htmlElement.querySelector(".eventIcon") ||
//       htmlElement.querySelector(".eventIconAfter");
//     const propertiesToCheckAnimation = ["leaveA", "enterA"];
//     const propertiesToCheckEvent = ["hideT", "showT"];

//     if ("scroll-speed" in updatedStyle) {
//       const speedIcon = layer?.querySelector(".scrollSpeedIcon");
//       if (eyeIcon && !speedIcon) {
//         const scrollSpeedIcon = document.createElement("div");
//         speed?.classList.remove("scrollSpeedIconAfter");

//         scrollSpeedIcon.className = "scrollSpeedIcon";
//         layer?.insertBefore(scrollSpeedIcon, eyeIcon.nextSibling);
//       }
//     } else {
//       // speed?.classList.remove("scrollSpeedIcon");
//       // speed?.classList.add("scrollSpeedIconAfter");
//     }
//     if (propertiesToCheckAnimation.some((prop) => prop in updatedStyle)) {
//       const animationIcon = layer?.querySelector(".animationIcon");
//       if (eyeIcon && !animationIcon) {
//         const animationIcon2 = document.createElement("div");
//         animation?.classList.remove("animationIconAfter");

//         animationIcon2.className = "animationIcon";
//         layer?.insertBefore(animationIcon2, eyeIcon.nextSibling);
//       }
//     } else {
//       const animation = htmlElement.querySelector(".animationIcon");
//       // animation?.classList.remove("animationIcon");
//       // animation?.classList.add("animationIconAfter");
//     }

//     if (propertiesToCheckEvent.some((prop) => prop in updatedStyle)) {
//       const eventIcon = layer?.querySelector(".eventIcon");
//       if (eyeIcon && !eventIcon) {
//         const eventIcon2 = document.createElement("div");
//         event?.classList.remove("eventIconAfter");

//         eventIcon2.className = "eventIcon";
//         layer?.insertBefore(eventIcon2, eyeIcon.nextSibling);
//       }
//     } else {
//       const event = htmlElement.querySelector(".eventIcon");
//       // event?.classList.remove("eventIcon");
//       // event?.classList.add("eventIconAfter");
//     }
//   }
// }
