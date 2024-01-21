import { Editor } from "grapesjs"

import Triangle from "./Triangle/Triangle";
import Hexagon from "./Hexagon/Hexagon";

import Heptagon from "./Heptagon/Heptagon";
import Octagon from "./Octagon/Octagon";

import LeftArrow from "./LeftArrow/LeftArrow";
import RightArrow from "./RightArrow/RightArrow";

import TopArrow from "./TopArrow/TopArrow";
import BottomArrow from "./BottomArrow/BottomArrow";

import Star from "./Star/Star";
import Circle from "./Circle/Circle";

import RightAngleArrow from "./RightAngleArrow/RightAngle";
import LeftAngleArrow from "./LeftAngleArrow/LeftAngle";

import TopAngleArrow from "./TopAngleArrow/TopAngleArrow";
import BottomAngleArrow from "./BottomAngleArrow/BottomAngleArrow";

const AddShapes = (editor: Editor) => {
    editor.Components.addType('Triangle', {
        extend: 'react-component',
        model: {
            defaults: {
                component: Triangle,
                stylable: true,
                resizable: true,
                editable: true,
                draggable: true,
                droppable: true,
                attributes: {
                    editable: true
                },
                style: {
                    display: "inline-block",
                },
            }
        },
        isComponent: (el) => el.tagName === 'TRIANGLE'
    });

    editor.Components.addType('Hexagon', {
        extend: 'react-component',
        model: {
            defaults: {
                component: Hexagon,
                stylable: true,
                resizable: true,
                editable: true,
                draggable: true,
                droppable: true,
                attributes: {
                    editable: true
                },
                style: {
                    display: "inline-block",
                },
            }
        },
        isComponent: (el) => el.tagName === 'HEXAGON'
    });

    editor.Components.addType('Octagon', {
        extend: 'react-component',
        model: {
            defaults: {
                component: Octagon,
                stylable: true,
                resizable: true,
                editable: true,
                draggable: true,
                droppable: true,
                attributes: {
                    editable: true
                },
                style: {
                    display: "inline-block",
                },
            }
        },
        isComponent: (el) => el.tagName === 'OCTAGON'
    });


    editor.Components.addType('Heptagon', {
        extend: 'react-component',
        model: {
            defaults: {
                component: Heptagon,
                stylable: true,
                resizable: true,
                editable: true,
                draggable: true,
                droppable: true,
                attributes: {
                    editable: true
                },
                style: {
                    display: "inline-block",
                },
            }
        },
        isComponent: (el) => el.tagName === 'HEPTAGON'
    });


    editor.Components.addType('LeftArrow', {
        extend: 'react-component',
        model: {
            defaults: {
                component: LeftArrow,
                stylable: true,
                resizable: true,
                editable: true,
                draggable: true,
                droppable: true,
                attributes: {
                    editable: true
                },
                style: {
                    display: "inline-block",
                },
            }
        },
        isComponent: (el) => el.tagName === 'LEFTARROW'
    });


    editor.Components.addType('RightArrow', {
        extend: 'react-component',
        model: {
            defaults: {
                component: RightArrow,
                stylable: true,
                resizable: true,
                editable: true,
                draggable: true,
                droppable: true,
                attributes: {
                    editable: true
                },
                style: {
                    display: "inline-block",
                },
            }
        },
        isComponent: (el) => el.tagName === 'RIGHTARROW'
    });


    editor.Components.addType('TopArrow', {
        extend: 'react-component',
        model: {
            defaults: {
                component: TopArrow,
                stylable: true,
                resizable: true,
                editable: true,
                draggable: true,
                droppable: true,
                attributes: {
                    editable: true
                },
                style: {
                    display: "inline-block",
                },
            }
        },
        isComponent: (el) => el.tagName === 'TOPARROW'
    });


    editor.Components.addType('BottomArrow', {
        extend: 'react-component',
        model: {
            defaults: {
                component: BottomArrow,
                stylable: true,
                resizable: true,
                editable: true,
                draggable: true,
                droppable: true,
                attributes: {
                    editable: true
                },
                style: {
                    display: "inline-block",
                },
            }
        },
        isComponent: (el) => el.tagName === 'BOTTOMARROW'
    });


    editor.Components.addType('Star', {
        extend: 'react-component',
        model: {
            defaults: {
                component: Star,
                stylable: true,
                resizable: true,
                editable: true,
                draggable: true,
                droppable: true,
                attributes: {
                    editable: true
                },
                style: {
                    display: "inline-block",
                },
            }
        },
        isComponent: (el) => el.tagName === 'STAR'
    });


    editor.Components.addType('Circle', {
        extend: 'react-component',
        model: {
            defaults: {
                component: Circle,
                stylable: true,
                resizable: true,
                editable: true,
                draggable: true,
                droppable: true,
                attributes: {
                    editable: true
                },
                style: {
                    display: "inline-block",
                },
            }
        },
        isComponent: (el) => el.tagName === 'CIRCLE'
    });

    editor.Components.addType('RightAngleArrow', {
        extend: 'react-component',
        model: {
            defaults: {
                component: RightAngleArrow,
                stylable: true,
                resizable: true,
                editable: true,
                draggable: true,
                droppable: true,
                attributes: {
                    editable: true
                },
                style: {
                    display: "inline-block",
                },
            }
        },
        isComponent: (el) => el.tagName === 'RIGHTANGLEARROW'
    });




    editor.Components.addType('LeftAngleArrow', {
        extend: 'react-component',
        model: {
            defaults: {
                component: LeftAngleArrow,
                stylable: true,
                resizable: true,
                editable: true,
                draggable: true,
                droppable: true,
                attributes: {
                    editable: true
                },
                style: {
                    display: "inline-block",
                },
            }
        },
        isComponent: (el) => el.tagName === 'LEFTANGLEARROW'
    });


    editor.Components.addType('TopAngleArrow', {
        extend: 'react-component',
        model: {
            defaults: {
                component: TopAngleArrow,
                stylable: true,
                resizable: true,
                editable: true,
                draggable: true,
                droppable: true,
                attributes: {
                    editable: true
                },
                style: {
                    display: "inline-block",
                },
            }
        },
        isComponent: (el) => el.tagName === 'TOPANGLEARROW'
    });


    editor.Components.addType('BottomAngleArrow', {
        extend: 'react-component',
        model: {
            defaults: {
                component: BottomAngleArrow,
                stylable: true,
                resizable: true,
                editable: true,
                draggable: true,
                droppable: true,
                attributes: {
                    editable: true
                },
                style: {
                    display: "inline-block",
                },
            }
        },
        isComponent: (el) => el.tagName === 'BOTTOMANGLEARROW'
    });


    editor.BlockManager.add("Triangle", {
        label: "<div class='gjs-fonts gjs-f-b1'>Triangle</div>",
        category: "Shapes",
        content: "<Triangle></Triangle>",
        media: `<img src="" alt="Triangle">`,
    });

    editor.BlockManager.add("Hexagon", {
        label: "<div class='gjs-fonts gjs-f-b1'>Hexagon</div>",
        category: "Shapes",
        content: "<Hexagon></Hexagon>",
        media: `<img src="" alt="Hexagon">`,
    });


    editor.BlockManager.add("Octagon", {
        label: "<div class='gjs-fonts gjs-f-b1'>Octagon</div>",
        category: "Shapes",
        content: "<Octagon></Octagon>",
        media: `<img src="" alt="Octagon">`,
    });


    editor.BlockManager.add("Heptagon", {
        label: "<div class='gjs-fonts gjs-f-b1'>Heptagon</div>",
        category: "Shapes",
        content: "<Heptagon></Heptagon>",
        media: `<img src="" alt="Heptagon">`,
    });


    editor.BlockManager.add("LeftArrow", {
        label: "<div class='gjs-fonts gjs-f-b1'>LeftArrow</div>",
        category: "Shapes",
        content: "<LeftArrow></LeftArrow>",
        media: `<img src="" alt="Left Arrow">`,
    });


    editor.BlockManager.add("RightArrow", {
        label: "<div class='gjs-fonts gjs-f-b1'>RightArrow</div>",
        category: "Shapes",
        content: "<RightArrow></RightArrow>",
        media: `<img src="" alt="Right Arrow">`,
    });


    editor.BlockManager.add("TopArrow", {
        label: "<div class='gjs-fonts gjs-f-b1'>TopArrow</div>",
        category: "Shapes",
        content: "<TopArrow></TopArrow>",
        media: `<img src="" alt="Top Arrow">`,
    });

    editor.BlockManager.add("BottomArrow", {
        label: "<div class='gjs-fonts gjs-f-b1'>BottomArrow</div>",
        category: "Shapes",
        content: "<BottomArrow></BottomArrow>",
        media: `<img src="" alt="BottomArrow">`,
    });

    editor.BlockManager.add("Star", {
        label: "<div class='gjs-fonts gjs-f-b1'>Star</div>",
        category: "Shapes",
        content: "<Star></Star>",
        media: `<img src="" alt="Star">`,
    });

    editor.BlockManager.add("Circle", {
        label: "<div class='gjs-fonts gjs-f-b1'>Circle</div>",
        category: "Shapes",
        content: "<Circle></Circle>",
        media: `<img src="" alt="Circle">`,
    });


    editor.BlockManager.add("RightAngleArrow", {
        label: "<div class='gjs-fonts gjs-f-b1'>Right Angle</div>",
        category: "Shapes",
        content: "<RightAngleArrow></RightAngleArrowt>",
        media: `<img src="" alt="Right Angle">`,
    });


    editor.BlockManager.add("LeftAngleArrow", {
        label: "<div class='gjs-fonts gjs-f-b1'>Left Angle</div>",
        category: "Shapes",
        content: "<LeftAngleArrow></LeftAngleArrow>",
        media: `<img src="" alt="Left Angle">`,
    });

    editor.BlockManager.add("TopAngleArrow", {
        label: "<div class='gjs-fonts gjs-f-b1'>Top Angle</div>",
        category: "Shapes",
        content: "<TopAngleArrow></TopAngleArrow>",
        media: `<img src="" alt="Top Angle">`,
    });

    editor.BlockManager.add("BottomAngleArrow", {
        label: "<div class='gjs-fonts gjs-f-b1'>Bottom Angle</div>",
        category: "Shapes",
        content: "<BottomAngleArrow></BottomAngleArrow>",
        media: `<img src="" alt="Bottom Angle">`,
    });


}

export default AddShapes;
