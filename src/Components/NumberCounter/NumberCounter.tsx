import {Editor} from "grapesjs";
import counterIcon from '../../assets/counter-icon.svg';

export default (editor: Editor) => {
  let content = 0;
  let prefix = 'PREFIX';
  let postfix = 'POSTFIX';
  // Define a block for the NumberCounter component
  editor.BlockManager.add('number-counter-block', {
    label: 'NumberCounter',
    content: `<div data-gjs-type="number-counter" 
                  style="margin-left: auto;
                         margin-right: auto;
                         width: 200px;
                         position: relative;
                         height: 150px;
                         display: flex;
                         border: 1px solid cadetblue;
                         justify-content: center;
                         align-items: center;
                         z-index: 999;
                         "
                  data-gjs-resizable="true">${prefix} &nbsp;&nbsp;&nbsp;&nbsp;<strong>${content}</strong>&nbsp;&nbsp;&nbsp;&nbsp;   ${postfix}</div>`,
    media: `<img src="${counterIcon}" alt="counter component">`,
    category: "Media"
  });
  // Define the NumberCounter component
  editor.DomComponents.addType('number-counter', {
    tagName: 'section',
    model: {
      defaults: {
        traits: [
          {
            type: 'select',
            name: 'direction',
            label: 'Direction',
            options: [
              {value: 'up', name: 'Up'},
              {value: 'down', name: 'Down'},
            ],
            default: 'up', // Default value for the trait
          },
          {
            type: 'number',
            name: 'start',
            label: 'Start Value',
            default: 1, // Default value for the trait
          },
          {
            type: 'number',
            name: 'end',
            label: 'End Value',
            default: 10, // Default value for the trait
          },
          {
            type: 'number',
            name: 'speed',
            label: 'Speed (ms)',
            default: 1000, // Default value for the trait
          },
          {
            type: 'text',
            name: 'prefix',
            label: 'prefix',
            default: 'PREFIX', // Default value for the trait
          },
          {
            type: 'text',
            name: 'postfix',
            label: 'postfix',
            default: 'POSTFIX', // Default value for the trait
          },
          {
            type: 'button',
            name: 'myButton',
            label: '',
            text: 'Save', // The text displayed on the button
            command: 'custom-button-command',
            events: {
              click: 'custom-button-command', // This triggers the custom command when the button is clicked
            },
          }
        ],
      },
    },
    isComponent: (el) => el.tagName === "NUMBERCOUNTER",
    view: {
      init(el) {
        // initNumberCounter(this.model.components());
        // console.log(this.model)
        initNumberCounter(this.model);

        // this.model.setAttributes({ "compId": this.model.getId() });
      },
    },
  });


  // editor.Commands.run('my-command-id')
  const initNumberCounter = (component) => {
    // Get the trait values
    let end = component.getTrait('end').get('default');
    let speed = component.getTrait('speed').get('default');
    let direction = component.getTrait('direction').get('default');
     prefix = component.getTrait('prefix').get('default');
     postfix = component.getTrait('postfix').get('default');

    // Access the counter component
    const counterElement = component.view.el;
    // Function to update the counter
    const updateCounter = () => {
      const current = content;
      if (content == end) {
        return false
      }
      if ((direction === 'up' && current <= parseInt(end))) {
        content++
        counterElement.innerHTML = prefix  + '&nbsp;&nbsp;&nbsp;&nbsp;' + '<strong>' + content + '</strong>' + '&nbsp;&nbsp;&nbsp;&nbsp;' + postfix;
        setTimeout(updateCounter, speed);
      } else if ((direction === 'down' && current >= parseInt(end))) {
        content--
        counterElement.innerHTML = prefix  + '&nbsp;&nbsp;&nbsp;&nbsp;' + '<strong>' + content + '</strong>' + '&nbsp;&nbsp;&nbsp;&nbsp;' + postfix;
        setTimeout(updateCounter, speed);
      }
    };

    // Start the counter
    ['start', 'end', 'speed', 'direction','postfix','prefix'].forEach((traitName) => {
      component.getTrait(traitName).on('change:value', (e) => {
        const component = editor.getSelected(); // Replace with your component reference
        if (component) {
          const trait = component.getTrait(traitName);
          if (trait) {
            const newDefaultValue = component.getTrait(traitName).get('value'); // Replace with your new default value
            trait.set('default', newDefaultValue);
            const counterElement = component.view.el;
            content = component.getTrait('start').get('value')
            postfix = component.getTrait('postfix').get('value')
            prefix = component.getTrait('prefix').get('value')
            counterElement.innerHTML = prefix  + '&nbsp;&nbsp;&nbsp;&nbsp;' + '<strong>' + content + '</strong>' + '&nbsp;&nbsp;&nbsp;&nbsp;' + postfix;
          } else {
            console.error(`Trait '${traitName}' not found on the component.`);
          }
        } else {
          console.error('No component selected.');
        }
      });
    });
    updateCounter();
  };
  const myCustomCommand = (editor) => {
    initNumberCounter(editor.getSelected());
  };
  editor.Commands.add('custom-button-command', {
    run: myCustomCommand,
  });
};
