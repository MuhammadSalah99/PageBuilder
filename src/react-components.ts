import { Editor } from "grapesjs";
import LabeledImage from "./Components//LabeledImage/LabeledImage";
import ImageCard from "./Components/ImageCard/ImageCard";
import MediaGrid from "./Components/MediaGrid/MediaGrid";
import ImageVerticalParallax from "./Components/VirticalParallax/verticalMediaParalex";
import ImageHorizontalParallax from "./Components/HorizontalParallax/horizontalMediaParallax";
import GridIcon from "./assets/MeidaGridIcon.svg";
import labeledImageIcon from "./assets/labeled-image-icon.svg";
import imageCardIcon from "./assets/image-card-icon.svg";
import imageParallexIcon from "./assets/Virtical-parallex-icon.svg";
import hImge from "./assets/image-card-icon.svg";
import blank from "./assets/blank-section.svg";

import MappingPoints from "./Components/MappingPoints/MappingPoints";
import mappingPointIcon from "./assets/MappingPointIcon.svg";
import TextEditor from "./PanelUIDesign/CustomRTE/CutomReactTextEditor/TextEditor";
import AnimatedWord from "./Components/AnimatedWord/Index";
import AddShapes from "./Components/Shapes/AddShapes";
import customCss from "./animations.css?inline"


export default (editor: Editor) => {
    let activeButton = null; // Single button instance
    let currentHoveredComponent = null;
    let index = 0
    let initioal = false;
    AddShapes(editor);
    editor.on('load', () => {
        function addStyles(){
          const styleElement = document.createElement('style');
          
          
          styleElement.appendChild(document.createTextNode(customCss));
          editor.Canvas.getDocument().head.appendChild(styleElement);
        }
        addStyles();

        const checkAndAppendSection = () => {
            const wrapperComponent = editor.DomComponents.getWrapper();
            const sectionComponents = wrapperComponent.components();
            // If there are no section components, append a new section
            if (sectionComponents.length === 0) {
                addBlankSection(wrapperComponent, index, editor, 0);
            } else {
                //set the first component select in case refresh
                editor.select(wrapperComponent.components().models[0])
            }
        };
        // Check and append a section when the editor is loaded
        checkAndAppendSection();

    const canvasDoc = editor.Canvas.getFrameEl().contentDocument;
    const elementsWithClass = document.querySelectorAll("#addsection");
    elementsWithClass[0].addEventListener("click", (event) => {
      // Your custom logic here
      if (!activeButton) {
        activeButton = document.createElement("button");
        activeButton.className = "dynamic-button";
        activeButton.style.position = "absolute";
        activeButton.style.display = "none"; // Initially hidden
        activeButton.style.left = "50%";
        activeButton.style.background = "rgb(255 232 255 / 0%)";
        activeButton.style.border = "none";
        activeButton.style.transform = "translateX(-50%)";
        activeButton.style.width = "31px";
        activeButton.style.height = "26px";
        activeButton.style.bottom = "1vh";
        activeButton.style.zIndex = "999";

        const svgMarkup = `<svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31">
                                  <g id="Group_12349" data-name="Group 12349" transform="translate(-0.17 -0.335)">
                                    <circle id="Ellipse_3" data-name="Ellipse 3" cx="15.5" cy="15.5" r="15.5" transform="translate(0.17 0.335)" fill="#c1393b" opacity="0.998"/>
                                    <g id="Icon_feather-plus" data-name="Icon feather-plus" transform="translate(11.388 11.328)">
                                      <path id="Path_17" data-name="Path 17" d="M18,7.5v8.563" transform="translate(-13.718 -7.5)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                                      <path id="Path_18" data-name="Path 18" d="M7.5,18h8.563" transform="translate(-7.5 -13.718)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                                    </g>
                                  </g>
                                </svg>`;

                activeButton.innerHTML = svgMarkup;
                canvasDoc.body.appendChild(activeButton);
                activeButton.addEventListener('click', () => {
                    if (currentHoveredComponent==null){
                        currentHoveredComponent =  editor.getSelected()
                    }
                    if (currentHoveredComponent) {
                        const position = activeButton.style.top == 'auto' ? 'after' : 'before';
                        addBlankSection(currentHoveredComponent, index, editor, position);
                        initioal = true
                        activeButton.style.display = 'none';
                    }
                });
            }
            activeButton.style.display = 'block';

            const canvasFrame = editor.Canvas.getFrameEl();
            const canvasWindow = canvasFrame.contentWindow;
            canvasDoc.addEventListener('mousemove', event => {
                const mouseX = event.clientX - canvasFrame.getBoundingClientRect().left;
                const mouseY = event.clientY - canvasFrame.getBoundingClientRect().top;
                const components = editor.DomComponents.getComponents();
                let hoveredComponent = null;
                // Iterate through all components and check if the mouse coordinates are within their bounding box
                components.forEach((component, key) => {
                    const componentRect = component.view.el.getBoundingClientRect();
                    if (
                        mouseX >= componentRect.left &&
                        mouseX <= componentRect.right &&
                        mouseY >= componentRect.top &&
                        mouseY <= componentRect.bottom
                    ) {
                        index = key
                        hoveredComponent = component;
                    }
                });
                const targetComponent = event.target.closest('[data-gjs-type]');
                if (targetComponent) {
                    const hasTestClassName = targetComponent.classList.contains('blank-section');
                    if (hasTestClassName||targetComponent.parentElement.classList.contains('blank-section')) {
                        currentHoveredComponent = targetComponent;
                        const componentRect = targetComponent.getBoundingClientRect();
                        const scrollTop = canvasWindow.pageYOffset || canvasDoc.documentElement.scrollTop;

                        const isCursorNearTop = event.clientY < (componentRect.top + (componentRect.height / 2));

                        if (isCursorNearTop) {
                            // Calculate the 'top' value based on section height
                            activeButton.style.top = `${componentRect.top + scrollTop - 13}px`;
                            activeButton.style.bottom = 'auto';
                        } else {
                            // Calculate the 'bottom' value based on section height
                            activeButton.style.top = 'auto';
                            activeButton.style.bottom = `${-scrollTop + componentRect.top-2}px`;
                        }
                    } else if (targetComponent.parentElement?.parentNode.classList.contains('blank-section')) {
                        currentHoveredComponent = targetComponent.parentElement?.parentNode;
                        const componentRect = targetComponent.parentElement?.parentNode.getBoundingClientRect();
                        const scrollTop = canvasWindow.pageYOffset || canvasDoc.documentElement.scrollTop;
                        const isCursorNearTop = event.clientY < (componentRect.top + (componentRect.height / 2));
                        if (isCursorNearTop) {
                            // Calculate the 'top' value based on section height
                            activeButton.style.top = `${componentRect.top + scrollTop - 13}px`;
                            activeButton.style.bottom = 'auto';
                        } else {
                            // Calculate the 'bottom' value based on section height
                            activeButton.style.top = 'auto';
                            activeButton.style.bottom = `${-scrollTop + componentRect.top - 8}px`;
                        }
                    }
                }
            });
        });
    });

    const addBlankSection = (component, index, editor, position) => {
        const blankContent = {
            tagName: 'section',
            name: 'Untitled',
            type: 'blank',
            attributes: {class: 'blank-section'},
            // attributes: { class: 'section' },//prevent resizable
            style: {height: 'auto', 'min-height': '100vh', width: '100%', 'background': '#edfeffa8'}, // Set initial size
            resizable: {
                // Defines how the component can be resized
                tl: 0, // Top left (0 to disable)
                tc: 1, // Top center
                tr: 0, // Top right
                cl: 1, // Center left
                cr: 1, // Center right
                bl: 0, // Bottom left
                bc: 1, // Bottom center
                br: 0, // Bottom right
                keyHeight: 'height', // Property to adjust height
                keyWidth: 'width', // Property to adjust width
            },
            draggable: true
            // editable: true,
        };

        if (position == 'before' && index == 0) {
            index = 0
        } else if (position == 'after' && index == 0) {
            index++
        } else {
            index == 0 ? index = 1 : index++
        }
        editor.DomComponents.addComponent(blankContent, {at: index});
        index++
        const components = editor.DomComponents.getComponents();

        components.forEach((component, key) => {
            if (key == index) {
                editor.select(component);
                applyFadeInAnimation(component);
                return false
            }
        });

    function applyFadeInAnimation(component) {
      const viewElement = component.view.el;
      viewElement.classList.add("fade-in");
      // Delay the selection and additional actions
      setTimeout(() => {
        viewElement.classList.remove("fade-in");
        // Add any additional actions you want to perform after the selection here
      }, 400); // Adjust the delay (in milliseconds) as needed
    }
  };
  editor.BlockManager.add("Add new section", {
    label: "Blank Section",
    content: {
      tagName: "section",
      name: "Untitled",
      attributes: { class: "blank-section" },
      // attributes: { class: 'section' },//prevent resizable
      style: { height: "100vh", width: "100%", background: "#edfeffa8" }, // Set initial size
      resizable: {
        // Defines how the component can be resized
        tl: 0, // Top left (0 to disable)
        tc: 1, // Top center
        tr: 0, // Top right
        cl: 1, // Center left
        cr: 1, // Center right
        bl: 0, // Bottom left
        bc: 1, // Bottom center
        br: 0, // Bottom right
        keyHeight: "height", // Property to adjust height
        keyWidth: "width", // Property to adjust width
      },
      editable: true,
    },
    media: `<img src="${blank}" alt="blank section">`,

    category: "Media",
  });
  editor.Components.addType("ImageCard", {
    extend: "react-component",
    model: {
      defaults: {
        component: ImageCard,
        stylable: true,
        resizable: true,
        editable: true,
        draggable: true,
        droppable: true,
        attributes: {
          editable: true,
        },
        style: {
          display: "inline-block",
          width: "600px",
        },

        traits: [
          {
            type: "image",
            label: "MLS ID",
          },
        ],
      },
    },
    isComponent: (el) => el.tagName === "IMAGECARD",
  });

  editor.Components.addType("LabeledImage", {
    extend: "react-component",
    model: {
      defaults: {
        component: LabeledImage,
        stylable: true,
        resizable: true,
        editable: false,
        draggable: true,
        droppable: true,
        attributes: {
          editable: true,
        },
        style: {
          display: "inline-block",
          width: "250px",
          height: "250px"
        },
        traits: [
          {
            type: "image",
            label: "MLS ID",
          },
        ],
      },
    },
    isComponent: (el) => el.tagName === "LABELEDIMAGE",
  });
  editor.Components.addType("MediaGrid", {
    extend: "react-component",
    model: {
      defaults: {
        component: MediaGrid,
        stylable: false,
        resizable: true,
        editable: true,
        draggable: true,
        droppable: true,
        attributes: {
          editable: true,
        },
        style: {
          display: "inline-block",
          width: "600px",
          height: "500px",
        },

        traits: [
          {
            type: "image",
            label: "MLS ID",
          },
        ],
      },
    },
    isComponent: (el) => el.tagName === "MEDIAGRID",
  });

  const mappingPointsName = "MappingPoints";
  editor.Components.addType(mappingPointsName, {
    extend: "react-component",
    model: {
      defaults: {
        component: MappingPoints,
        stylable: true,
        resizable: true,
        editable: true,
        draggable: true,
        droppable: true,
        attributes: {
          editable: true,
        },
      },
    },
    isComponent: (el) => el.tagName === mappingPointsName.toUpperCase(),
  });

  // editor.BlockManager.add(mappingPointsName, {
  //     label:"Mapping Points Component",
  //     category: 'Media',
  //     content: '<MappingPoints></MappingPoints>',
  //     media:`<img src="${mappingPointIcon}" alt="${mappingPointsName}">`
  // });

  editor.BlockManager.add("Labeled Image", {
    label: "<div class='gjs-fonts gjs-f-b1'>Labeled Image</div>",
    category: "Media",
    content: "<LabeledImage></LabeledImage>",
    media: `<img src="${labeledImageIcon}" alt="Labeled Image Icon">`,
  });

    editor.BlockManager.add("Image Card", {
        label: "<div class='gjs-fonts gjs-f-b1'>Image Card</div>",
        category: "Media",
        content: "<ImageCard></ImageCard>",
        media: `<img src="${imageCardIcon}" alt="Image card Icon">`,
    });

    editor.BlockManager.add("Media Grid", {
        label: "<div class='gjs-fonts gjs-f-b1'>Media Grid</div>",
        category: "Media",
        content: "<MediaGrid></MediaGrid>",
        media: `<img src="${GridIcon}" alt="Grid">`,
    });


    editor.Components.addType('IMAGEVERTICALPARALLAX', {
        extend: 'react-component',
        model: {
            defaults: {
                resizable: {
                    // Defines how the component can be resized
                    tl: 0, // Top left (0 to disable)
                    tc: 1, // Top center
                    tr: 0, // Top right
                    cl: 1, // Center left
                    cr: 1, // Center right
                    bl: 0, // Bottom left
                    bc: 1, // Bottom center
                    br: 0, // Bottom right
                    keyHeight: 'height', // Property to adjust height
                    keyWidth: 'width', // Property to adjust width
                },
                attributes: {class: 'cmp-css'},
                styles: `
            .cmp-css {
                position:relative;
                overflow: hidden;
                min-height: 100vh;
                height: auto;
            }`,
                component: ImageVerticalParallax,
            }
        },
        isComponent: (el) => el.tagName === 'IMAGEVERTICALPARALLAX'
    });
    editor.BlockManager.add('Vertical Parallax', {
        label: "<div class='gjs-fonts gjs-f-b1'>Vertical Parallax</div>",
        category: 'Media',
        content: '<ImageVerticalParallax></ImageVerticalParallax>',
        media: `<img src="${imageParallexIcon}" alt="Virtical image parallex">`
    });

    editor.Components.addType('IMAGEHORIZONTALPARALLAX', {
        extend: 'react-component',
        model: {
            defaults: {
                resizable: {
                    // Defines how the component can be resized
                    tl: 0, // Top left (0 to disable)
                    tc: 1, // Top center
                    tr: 0, // Top right
                    cl: 1, // Center left
                    cr: 1, // Center right
                    bl: 0, // Bottom left
                    bc: 1, // Bottom center
                    br: 0, // Bottom right
                    keyHeight: 'height', // Property to adjust height
                    keyWidth: 'width', // Property to adjust width
                },
                attributes: {class: 'cmp-css', compId:null},
                styles: `
            .cmp-css {
                position:relative;
                overflow: hidden;
                min-height: 100vh;
                height: auto;
            }`,
                component: ImageHorizontalParallax,
            },
        },
        view: {
            init() {
                this.model.setAttributes({
                    ...this.model.getAttributes(),
                    compId: this.model.getId(),
                });
            },
        },
        isComponent: (el) => el.tagName === "IMAGEHORIZONTALPARALLAX",
    });
    editor.BlockManager.add("Horizontal Parallax", {
        label: "<div class='gjs-fonts gjs-f-b1'>Horizontal Parallax</div>",
        category: "Media",
        content: "<ImageHorizontalParallax></ImageHorizontalParallax>",
        media: `<img src="${hImge}" alt="Horizontal image parallax">`,
    });
    editor.BlockManager.add("blank", {
        label: "Blank Section",
        content: {
            tagName: "section",
            name: "Untitled",
            attributes: { class: "blank-section" },
            // attributes: { class: 'section' },//prevent resizable
            style: { height: "100vh", width: "100%", background: "#edfeffa8" }, // Set initial size
            resizable: {
                // Defines how the component can be resized
                tl: 0, // Top left (0 to disable)
                tc: 1, // Top center
                tr: 0, // Top right
                cl: 1, // Center left
                cr: 1, // Center right
                bl: 0, // Bottom left
                bc: 1, // Bottom center
                br: 0, // Bottom right
                keyHeight: "height", // Property to adjust height
                keyWidth: "width", // Property to adjust width
            },
            editable: true,
        },
        category: "Media",
    });

    // text editor
    const textEditor = "TextEditor";
    editor.Components.addType(textEditor,{
        extend: "text-react-component",
        model: {
            defaults: {
                component: TextEditor,
                stylable: true,
                resizable: true,
                editable: true,
                draggable: true,
                droppable: true,
                attributes: {
                    editable: true,
                },
            },
        },
        isComponent: (el) => el.tagName === textEditor.toUpperCase(),
    })

};
