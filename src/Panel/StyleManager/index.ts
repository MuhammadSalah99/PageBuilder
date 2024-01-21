import { Editor} from "grapesjs";
/**
 * @description the element holding the base functionality of the style manger.
 * @see https://github.com/GrapesJS/grapesjs/blob/53cfe888a0ee5d49c43cd4e3fa5daf0b55f8277c/demo.html#L1017C35-L1017C35
 */

export default (editor: Editor, opt = {}) => {
  const stylePanel = document.getElementById("right-panel-id") as HTMLDivElement;
  if (!stylePanel) {
    throw new Error("Element with id 'right-panel-id' not found.");
  }

  // on preview command, remove the right panel display
  editor.on("run:preview", () => {
    stylePanel.style.display = "none";
  });

  // on preview command stop, add the right panel display again
  editor.on("stop:preview", () => {
    stylePanel.style.display = "block";
  });

  // reset the default built in commands which have been taken from the demo code of grapejs
  
  editor.Styles.addBuiltIn('filter', {
    type: 'stack',
    // @ts-ignore
    layerSeparator: ' ',
    fromStyle(style, { property, name }) {
      const filter = style[name] || '';
      const sep = property.getLayerSeparator();
      return filter ? filter.split(sep).map((input: string) => {
        const { name, value } = property.__parseFn(input);
        return { name, value };
      }) : [];
    },
    toStyle(values, { name }) {
      return { [name]: `${values.name}(${values.value})` };
    },
    properties: [
      {
        property: 'name',
        name: 'Type',
        type: 'select',
        default: 'sepia',
        full: true,
        options: [
          { id: 'blur', propValue: { min: 0, units: ['px', 'em', 'rem', 'vw', 'vh'] } },
          { id: 'brightness', propValue: { min: 0, units: ['%'] } },
          { id: 'contrast', propValue: { min: 0, units: ['%'] } },
          { id: 'grayscale', propValue: { min: 0, max: 100, units: ['%'] } },
          { id: 'hue-rotate', propValue: { min: 0, max: 360, units: ['deg', 'rad', 'grad'] } },
          { id: 'invert', propValue: { min: 0, max: 100, units: ['%'] } },
          { id: 'saturate', propValue: { min: 0, units: ['%'] } },
          { id: 'sepia', propValue: { min: 0, max: 100, units: ['%'] } },
        ],
        onChange({ property, to }) {
          if (to.value) {
            const option = property.getOption();
            const props = { ...(option.propValue || {}) };
            const propToUp = property.getParent().getProperty('value');
            const unit = propToUp.getUnit();
            if (!unit || props?.units.indexOf(unit) < 0) {
              props.unit = props?.units[0] || '';
            }
            propToUp.up(props);
          }
        }
      }, {
        property: 'value',
        type: 'slider',
        default: '0',
        full: true,
      },
    ]
  });

};
