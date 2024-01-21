// animations.js
import grapesjs, { Editor, Component, Components } from "grapesjs";

export const animations = `
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .fadeIn {
    animation-name: fadeIn;
    animation-duration: 3s;
    animation-fill-mode: forwards;
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  .fadeOut {
    animation-name: fadeOut;
    animation-duration: 3s;
    animation-fill-mode: forwards;
  }

  .slideLeft {
    animation-name: slide-left;
    animation-duration: 3s;
    animation-fill-mode: both;
  }

  .slideUp {
    animation-name: slide-up;
    animation-duration: 3s;
    animation-fill-mode: forwards;
  }

  .slideDown {
    animation-name: slide-down;
    animation-duration: 3s;
    animation-fill-mode: forwards;
  }

  .slideRight {
    animation-name: slide-right;
    animation-duration: 3s;
    animation-fill-mode: forwards;
  }

  @keyframes slide-left {
    from {
      transform: translateX(-100vh);
    }
    to {
      transform: translateX(0vh);
    }
  }

  @keyframes slide-right {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(50vh);
    }
  }

  @keyframes slide-up {
    from {
      transform: translateY(100vh);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes slide-down {
    from {
      transform: translateY(-100vh);
    }
    to {
      transform: translateY(0);
    }
  }
`;
export function removeAnimation(component: Component) {
  if (component)
    component.removeClass([
      "fadeOut",
      "fadeIn",
      "slideLeft",
      "slideUp",
      "slideDown",
      "slideRight",
    ]);
}
export function addAnimation(editorInstance: Editor) {
  const css = editorInstance.Css;
  css.addRules(animations);
}
