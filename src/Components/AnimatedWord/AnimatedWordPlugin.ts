import { Editor } from "grapesjs";
import AnimatedWord from "./Index";
import logo from '../../assets/animatedWord.svg'
export default (editor:Editor)=>{
      // animatedWord
  const animatedWord = "AnimatedWord";
  editor.Components.addType(animatedWord, {
    extend: "react-component",
    model: {
      defaults: {
        type:"text",
        component: AnimatedWord,
        content: "Get it done in One Unified workspace",
        stylable: true,
        resizable: false,
        editable: false,
        draggable: true,
        droppable: true,
        attributes: {
          editable: true,
        },
        style: {
          // display: "inline-block",
        },

        styles: `
        .ml3 {
          display: inline-block;
          white-space: nowrap;
          overflow: hidden;
        }
        
        .letter {
          display: inline-block;
          transform-origin: bottom;
          opacity:0;
        }

        .word {
          display: inline-block;
          transform-origin: bottom;
          opacity:0;
        }
        
        
        @keyframes fadeUp {
          from {
            transform: translateY(1em);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slidein {
          from {
            opacity:1;
            margin-left: 100%;
          }
        
          to {
            opacity:1;
            margin-left: 0%;
          }
        }
        
        @keyframes scaleIn {
          from{
            opacity:1;
            transform: scale(0);
            filter: blur(100%);
          } to {
            transform: scale(1);
            filter: blur(0);
            opacity:1;
          }
        }

        @keyframes hopIn {
          from{
            opacity:1;
            transform: perspective(500px) translateZ(1000px)
          } to {
            opacity:1;
            transform: perspective(500px) translateZ(0px)
          }
        }

        @keyframes rollIn {
          from {
            transform: rotate(-180deg);
            opacity:1;
          }
          to {
            opacity:1;
            transform: rotate(0deg);
          }
        }

        .animate .letter {
          animation-name:var(--animation-function);
          animation-duration: var(--duration);
          animation-timing-function: var(--easing-function);
          animation-fill-mode: forwards;
          animation-delay: var(--letter-delay);
          animation-iteration-count:var(--option)
        }
        .animate .word {
          animation-name:var(--animation-function);
          animation-duration: var(--duration);
          animation-timing-function: var(--easing-function);
          animation-fill-mode: forwards;
          animation-delay: var(--letter-delay);
          animation-iteration-count:var(--option)
        }
        .animate.all-sentence{
          animation-name:var(--animation-function);
          animation-duration: var(--duration);
          animation-timing-function: var(--easing-function);
          animation-fill-mode: backwards;
          animation-delay: var(--letter-delay);
          animation-iteration-count:var(--option)
        }
        .animate{
          animation-name:var(--animation-function);
          animation-duration: var(--duration);
          animation-timing-function: var(--easing-function);
          animation-fill-mode: backwards;
          animation-delay: var(--letter-delay);
          animation-iteration-count:var(--option)
        }
        
        `,
        traits: [
        {
        type:"text",
        name:"text",
        default:"Great Thinkers",
        },
            {
              type:"number",
              name:"delay",
              default:0.2,
              label:"delay", 
              placeholder:"delay",
              step:0.1,
            },
            {
              type:"number",
              name:"duration",
              default:1,
              label:"duration", 
              placeholder:"duration",
              step:0.5,
            },
            {
              type:"select",
              name:"animateFunction",
              label:"animateFunction",
              default:"fadeUp",
              options:[
                {id:'fadeUp', name:"fadeUp",},
                {id:'rollIn', name:"rollIn",},
                {id:"hopIn",name:"hopIn"},
                {id:"scaleIn",name:"scaleIn"},
                {id:"slidein",name:"slidein"}
              ]
            },
            {
              type:"select",
              name:"easing",
              default:"ease",
              options:[   
                  { id: "ease", name: "ease" },
                  { id: "linear", name: "linear" },
                  { id: "ease-in", name: "easein" },
                  { id: "ease-out", name: "easeout" },
                  { id: "ease-in-out", name: "easeinout" },
              ]
            },
            {
              type:"select",
              name:"animateType",
              label:"animation type",
              default:"letters",
              options:[
                {id:"letters", name:"letters"},
                {id:"words", name:"words"},
                {id:"sentence",name:"sentence"},
              ]
            }
        ],
      },
    },
    isComponent: (el) => el.tagName === animatedWord.toUpperCase(),
  });  

  editor.BlockManager.add("Animated Word", {
    label: "<div class='gjs-fonts gjs-f-b1'>AnimatedWord</div>",
    category: "Media",
    content: {type:animatedWord},
    media: `<img src="${logo}"/>`,
  });
}