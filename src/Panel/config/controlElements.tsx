import { addTextComponent } from "../../PanelUIDesign/CustomRTE";
import { toggleModalAndBlockManager, toggleShapeManager } from "../layers/handleLayerUIEvent";

export const controlsData = [
  {
    mediaControl: [
      {
        type: "span",
        className: "addMedia span-style",
        imgUrl: "src/Panel/layers/assets/media.svg",
        id: "option",
      },
    ],
  },
  {
    sectionControl: [
      {
        type: "span",
        className: "addsection span-style",
        imgUrl: "src/Panel/layers/assets/section.svg",
        id: "addsection",
      },

      {
        type: "span",
        className: "do span-style",
        imgUrl: "src/Panel/layers/assets/redo.svg",
        id: "undo",
      },
      {
        type: "span",
        className: "undo span-style",
        imgUrl: "src/Panel/layers/assets/undo.svg",
        id: "do",
      },
    ],
  },
  {
    peopleControl: [
      {
        type: "span",
        className: "ppl1 ",
        imgUrl: "src/Panel/layers/assets/IMG_1324.jpg",
        id: "ppl1",
      },

      {
        type: "span",
        className: "ppl2 ",
        imgUrl: "src/Panel/layers/assets/IMG_1325.jpg",
        id: "ppl2",
      },
      {
        type: "span",
        className: "ppl3 ",
        imgUrl: "src/Panel/layers/assets/IMG_1322.jpg",
        id: "ppl3",
      },
    ],
  },
  {
    zoomControl: [
      // {
      //   type: "span",
      //   className: "option span-style",
      //   imgUrl: "src/Panel/layers/assets/Group12325.svg",
      //   id: "option",
      // },

      {
        type: "span",
        className: "hand span-style",
        imgUrl: "src/Panel/layers/assets/Iconionic-md-hand.svg",
        id: "hand",
      },
      {
        type: "span",
        className: "arrow span-style",
        imgUrl: "src/Panel/layers/assets/Iconawesome-mouse-pointer.svg",
        id: "arrow",
      },
    ],
  },
  {
    textControl: [
      {
        type: "span",
        className: "code span-style",
        imgUrl: "src/Panel/layers/assets/Iconfeather-code.svg",
        id: "code",
      },
      {
        type: "span",
        className: "textC  span-style",
        onClick: addTextComponent,
        imgUrl: "src/Panel/layers/assets/Iconfeather-type.svg",
        id: "textC",
      },
      {
        type: "span",
        className: "poly span-style",
        imgUrl: "src/Panel/layers/assets/Iconawesome-draw-polygon.svg",
        id: "poly",
      },
      {
        type: "span",
        className: "shape span-style",
        imgUrl: "src/Panel/layers/assets/Iconawesome-shapes.svg",
        id: "open-shapes-menu",
        onClick: toggleShapeManager,
      },
      {
        type: "span",
        className: "animation span-style",
        id: "open-mm",
        onClick: toggleModalAndBlockManager,
        imgUrl: "src/Panel/layers/assets/Group12359.svg",
      },
      {
        type: "span",
        className: "speed span-style",
        imgUrl: "src/Panel/layers/assets/Iconawesome-stack-overflow.svg",
        id: "speed",
      },
      {
        type: "span",
        className: "color span-style",
        imgUrl: "src/Panel/layers/assets/Iconionic-ios-color-filter.svg",
        id: "color",
      },
      {
        type: "span",
        className: "group span-style",
        imgUrl: "src/Panel/layers/assets/Group12448.svg",
        id: "group",
      },
    ],
  },
  {
    audioControl: [
      {
        type: "span",
        className: "play span-style",
        imgUrl: "src/Panel/layers/assets/Iconmaterial-slow-motion-video.svg",
        id: "play",
      },
      {
        type: "span",
        className: "sound span-style",
        imgUrl: "src/Panel/layers/assets/Iconionic-ios-stats.svg",
        id: "sound",
      },
      {
        type: "span",
        className: "record span-style",
        imgUrl: "src/Panel/layers/assets/Iconmaterial-keyboard-voice.svg",
        id: "record",
      },
    ],
  },
  {
    alginControl: [
      {
        type: "span",
        className: "down span-style",
        imgUrl: "src/Panel/layers/assets/right-align_3.svg",
        id: "down",
      },
      {
        type: "span",
        className: "centerH span-style",
        imgUrl: "src/Panel/layers/assets/Group-1.svg",
        id: "centerH",
      },
      {
        type: "span",
        className: "up span-style",
        imgUrl: "src/Panel/layers/assets/right-align_2.svg",
        id: "up",
      },
      {
        type: "span",
        className: "left span-style",
        imgUrl: "src/Panel/layers/assets/right-align_1.svg",
        id: "left",
      },
      {
        type: "span",
        className: "centerV span-style",
        imgUrl: "src/Panel/layers/assets/Group12352.svg",
        id: "centerV",
      },
      {
        type: "span",
        className: "right span-style",
        imgUrl: "src/Panel/layers/assets/right-align_4733769.svg",
        id: "right",
      },
    ],
  },
];
