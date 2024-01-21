var isToggled = false;
function togglePanel() {
  const all = document.querySelector(".all") as HTMLElement | null;

  const panelDevice = document.querySelector(
    ".gjs-pn-devices-c"
  ) as HTMLElement | null;
  const title = document.querySelector(".titile") as HTMLElement | null;
  const panelLeft = document.querySelector(".panel-left") as HTMLElement | null;
  const toggle = document.querySelector(".toggle") as HTMLElement | null;

  if (panelLeft && toggle && all && title && panelDevice) {
    if (!isToggled) {
      // If toggled, hide the element and reset the toggle position
      panelLeft.style.display = "none";
      all.style.display = "none";
      title.style.left = "-30px";
      toggle.style.left = "10px";
    } else {
      panelLeft.style.display = "block";
      all.style.display = "block";
      title.style.left = "0px";
      toggle.style.left = "240px";
    }
    isToggled = !isToggled;
    // Toggle the state
  }
}

export function toggleModalAndBlockManager() {
  const modal = document.getElementById("modal");
  const btn = document.getElementById("open-mm");
  const element = document.querySelector(".gjs-pn-views");
  if (element) {
    element.style.zIndex = "3";
  }
  btn?.addEventListener("click", () => {
    modal!.style.display = "block";
  });
}

export function toggleShapeManager() {
  const modal = document.getElementById("modal-shapes-cont");
  const btn = document.getElementById("open-shapes-menu");
  const element = document.querySelector(".gjs-pn-views");
  if (element) {
    element.style.zIndex = "3";
  }
  btn?.addEventListener("click", () => {
    modal!.style.display = "block";
  });
}

export { togglePanel, isToggled };
