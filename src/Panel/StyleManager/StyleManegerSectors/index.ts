/**
 * @description a constant holding the custom style manager data, as used in the grapesjs demo
 */

import { capitalize, typeAnimation, typeEase, unitsAngle, unitsPercent, unitsSize, unitsTime } from "./constants";
import parse from "./boxshadow";
import functionName from "./functionname";
const overflowProps = {
  type: "select",
  options: ["visible", "hidden", "scroll", "auto"].map((id) => ({ id })),
  default: "visible",
};

const get2DimProp = (property: string, { x, y, mergable }: any = {}) => {
  const propertyX = {
    property: `${property}-x`,
    type: "integer",
    units: unitsSize,
    ...x,
  };
  const propertyY = {
    property: `${property}-y`,
    type: "integer",
    units: unitsSize,
    ...y,
  };

  return {
    property,
    type: "composite",
    properties: [propertyX, propertyY],
    ...(mergable && {
      fromStyle(style: Record<string, string>, { name, separator, property }: any) {
        const [propX, propY] = property.getProperties();
        const [valueX, valueY] = (style[name] || "").split(separator);
        return {
          [propX.getId()]: style[propX.getName()] || valueX || "",
          [propY.getId()]: style[propY.getName()] || valueY || valueX || "",
        };
      },
      toStyle(values: Record<string, string>, { name, property }: any) {
        const [propX, propY] = property.getProperties();
        const valueX = values[propX.getId()];
        const valueY = values[propY.getId()];

        return {
          [name]: valueX === valueY ? valueX : `${valueX} ${valueY}`,
        };
      },
    }),
  };
};

const fromStyleFnStack = (property: string) => {
  const nameProp = `${property}-name`;
  const valueProp = `${property}-value`;

  return (style: Record<string, string>, { separatorLayers }: any) => {
    const filter = style[property] || "";
    return filter
      ? filter.split(separatorLayers).map((input) => {
          const { name, value } = functionName(input);
          const values = { [nameProp]: name, [valueProp]: value };
          return values;
        })
      : [];
  };
};

const toStyleFnStack = (property: string, defValue = "") => {
  const nameProp = `${property}-name`;
  const valueProp = `${property}-value`;

  return (values: Record<string, string>, { name }: any) => {
    return { [name]: `${values[nameProp]}(${values[valueProp] || defValue})` };
  };
};

const handleTypeChange = (valueProp: string) => {
  return ({ property, to }: any) => {
    if (to.value) {
      const option = property.getOption();
      const propToUp = property.getParent().getProperty(valueProp);
      const unit = propToUp.getUnit();
      const props = {
        units: option.units || [],
        min: option.min,
        max: option.max,
        unit: "",
      };
      if (!unit || props?.units.indexOf(unit) < 0) {
        props.unit = props?.units[0] || "";
      }
      propToUp.up(props);
    }
  };
};

const strToOption = (id: string) => ({ id, label: id.split("-").map(capitalize).join(" ") });

const getFilterProp = (property = "filter") => {
  const nameProp = `${property}-name`;
  const valueProp = `${property}-value`;
  return {
    property,
    type: "stack",
    layerSeparator: " ",
    fromStyle(style: Record<string, string>, { separatorLayers }: any) {
      const filter = style[property] || "";
      return filter
        ? filter.split(separatorLayers).map((input) => {
            const { name, value } = functionName(input);
            const values = { [nameProp]: name, [valueProp]: value };
            return values;
          })
        : [];
    },
    toStyle(values: Record<string, string>, { name }: any) {
      return { [name]: `${values[nameProp]}(${values[valueProp] || "0"})` };
    },
    properties: [
      {
        property: nameProp,
        type: "select",
        default: "blur",
        options: [
          { id: "blur", label: "Blur", min: 0, units: ["px", "em", "rem", "vw", "vh"] },
          { id: "brightness", label: "Brightness", min: 0, units: ["%"] },
          { id: "contrast", label: "Contrast", min: 0, units: ["%"] },
          { id: "grayscale", label: "Grayscale", min: 0, max: 100, units: ["%"] },
          { id: "hue-rotate", label: "Hue rotate", min: 0, max: 360, units: ["deg", "rad", "grad"] },
          { id: "invert", label: "Invert", min: 0, max: 100, units: ["%"] },
          { id: "saturate", label: "Saturate", min: 0, units: ["%"] },
          { id: "sepia", label: "Sepia", min: 0, max: 100, units: ["%"] },
        ],
        onChange: handleTypeChange(valueProp),
      },
      {
        property: valueProp,
        type: "integer",
      },
    ],
  };
};

export const customStyleManager = [
  {
    name: "opacity",
    open: false,
    buildProps: ["opacity"],
  },
  {
    name: "Typography",
    open: false,
    buildProps: [
      "font-family",
      "font-size",
      "font-weight",
      "direction",
      "line-height",
      "letter-spacing",
      "text-align",
      "text-transform",
      "color",
      "text-decoration",
      "text-shadow",
    ],
    properties: [
      { name: "Font", property: "font-family" },
      { name: "Weight", property: "font-weight" },
      { name: "Font color", property: "color" },
      {
        name: `<svg width="16" height="16" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.0879 0.03125H0.530942C0.237711 0.03125 -5.62607e-08 0.268961 0 0.562192V3.74784C0 4.04107 0.237711 4.27878 0.530942 4.27878H1.59283C1.88606 4.27878 2.12377 4.04107 2.12377 3.74784V2.68596H3.98207V12.7738H2.65471C2.36148 12.7738 2.12377 13.0116 2.12377 13.3048V14.3667C2.12377 14.6599 2.36148 14.8976 2.65471 14.8976H7.96414C8.25737 14.8976 8.49508 14.6599 8.49508 14.3667V13.3048C8.49508 13.0116 8.25737 12.7738 7.96414 12.7738H6.63678V2.68596H8.49508V3.74784C8.49508 4.04107 8.73279 4.27878 9.02602 4.27878H10.0879C10.3811 4.27878 10.6188 4.04107 10.6188 3.74784V0.562191C10.6188 0.268961 10.3811 0.03125 10.0879 0.03125ZM18.583 11.181H16.9902V3.74784H18.583C19.0578 3.74784 19.2908 3.17343 18.9583 2.84159L16.3036 0.186882C16.0963 -0.0202994 15.7603 -0.0202994 15.553 0.186882L12.8983 2.84159C12.5886 3.15053 12.7546 3.74784 13.2736 3.74784H14.8664V11.181H13.2736C12.7987 11.181 12.5661 11.7554 12.8983 12.0873L15.553 14.742C15.7603 14.9492 16.0963 14.9492 16.3036 14.742L18.9583 12.0873C19.2679 11.7783 19.102 11.181 18.583 11.181Z" fill="white"/>
</svg>
`,
        property: "line-height",
        type: "number",
        unit: ["px", "em", "rem", "vh", "%"],
      },
      {
        name: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.9019 0.43457H1.09735C0.804117 0.43457 0.566406 0.672281 0.566406 0.965512V3.62022C0.566406 3.91345 0.804117 4.15116 1.09735 4.15116H2.15923C2.45247 4.15116 2.69018 3.91345 2.69018 3.62022V3.08928H6.67225V6.80587H5.87583C5.5826 6.80587 5.34489 7.04358 5.34489 7.33681V8.39869C5.34489 8.69193 5.5826 8.92964 5.87583 8.92964H10.1234C10.4166 8.92964 10.6543 8.69193 10.6543 8.39869V7.33681C10.6543 7.04358 10.4166 6.80587 10.1234 6.80587H9.32696V3.08928H13.309V3.62022C13.309 3.91345 13.5467 4.15116 13.84 4.15116H14.9019C15.1951 4.15116 15.4328 3.91345 15.4328 3.62022V0.965512C15.4328 0.672281 15.1951 0.43457 14.9019 0.43457ZM12.6225 9.08527C12.3135 8.77566 11.7162 8.94158 11.7162 9.46058V11.0534H4.283V9.46058C4.283 8.98572 3.70859 8.7531 3.37675 9.08527L0.722039 11.74C0.514857 11.9473 0.514857 12.2833 0.722039 12.4906L3.37675 15.1453C3.68569 15.4549 4.283 15.289 4.283 14.77V13.1772H11.7162V14.77C11.7162 15.2449 12.2906 15.4778 12.6225 15.1453L15.2772 12.4906C15.4843 12.2833 15.4843 11.9473 15.2772 11.74L12.6225 9.08527Z" fill="white"/>
</svg>
`,
        property: "letter-spacing",
        units: ["px", "%", "em", "rem", "pt", "ct"],
      },
      {
        property: "text-align",
        type: "radio",
        defaults: "left",
        options: [
          {
            value: "left",
            label: `<svg width="23" height="17" viewBox="0 0 23 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.7269 6.21582H1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M21.2204 1.72217H1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M21.2204 10.709H1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.7269 15.2026H1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
          },
          {
            value: "center",
            label: `<svg width="23" height="17" viewBox="0 0 23 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.0437 6.03906H4.56348" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M21.4137 1.54541H1.19336" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M21.4137 10.5322H1.19336" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18.0437 15.0259H4.56348" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
          },
          {
            value: "right",
            label: `<svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.0893 5.99805H6.3623" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M22.0895 1.50488H1.86914" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M22.0895 10.4917H1.86914" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M22.0893 14.9849H6.3623" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,
          },
        ],
      },
      {
        property: "text-decoration",
        type: "radio",
        defaults: "none",
        list: [
          { value: "none", name: "None", label: "none" },
          {
            value: "underline",
            name: "underline",
            label: `<svg width="15" height="22" viewBox="0 0 15 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.15909 2.35502V0.480024H14.25V2.35502H8.76136V17.9346H6.64773V2.35502H1.15909Z" fill="white"/>
<path d="M0.505859 21.374H14.4941" stroke="white" stroke-linecap="round"/>
</svg>
`,
          },
          {
            value: "line-through",
            name: "Line-through",
            label: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.15909 2.35502V0.480024H17.25V2.35502H11.7614V17.9346H9.64773V2.35502H4.15909Z" fill="white"/>
<path d="M0.505859 13.9346H14.4941" stroke="white" stroke-linecap="round"/>
</svg>
`,
          },
        ],
      },
      {
        property: "text-shadow",
        properties: [
          { name: "X position", property: "text-shadow-h" },
          { name: "Y position", property: "text-shadow-v" },
          { name: "Blur", property: "text-shadow-blur" },
          { name: "Color", property: "text-shadow-color" },
        ],
      },
      {
        property: "direction",
        type: "radio",
        list: [
          {
            value: "ltr",
            name: "ltr",
            label: `<svg width="12" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 8.4873V13.4873H6V2.4873H8V13.4873H10V2.4873H12V0.487305H4C1.79 0.487305 0 2.2773 0 4.4873C0 6.69731 1.79 8.4873 4 8.4873ZM16 16.4873L12 12.4873V15.4873H0V17.4873H12V20.4873L16 16.4873Z" fill="white"/>
</svg>
`,
          },
          {
            value: "rtl",
            name: "rtl",
            label: `<svg width="12" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 8.93457V13.9346H8V2.93457H10V13.9346H12V2.93457H14V0.93457H6C3.79 0.93457 2 2.72457 2 4.93457C2 7.14457 3.79 8.93457 6 8.93457ZM4 15.9346V12.9346L0 16.9346L4 20.9346V17.9346H16V15.9346H4Z" fill="white"/>
</svg>
`,
          },
        ],
      },
      {
        name: "Text transform",
        type: "radio",
        default: "none",
        property: "text-transform",
        list: [
          {
            value: "capitalize",
            label: `<svg width="23" height="19" viewBox="0 0 23 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.159091 2.35502V0.480024H13.25V2.35502H7.76136V17.9346H5.64773V2.35502H0.159091ZM21.9325 4.84366V6.54821H15.1484V4.84366H21.9325ZM17.1257 1.7073H19.1371V14.1846C19.1371 14.7528 19.2195 15.1789 19.3842 15.463C19.5547 15.7414 19.7706 15.9289 20.032 16.0255C20.299 16.1164 20.5803 16.1618 20.8757 16.1618C21.0973 16.1618 21.2791 16.1505 21.4212 16.1278C21.5632 16.0993 21.6768 16.0766 21.7621 16.0596L22.1712 17.8664C22.0348 17.9175 21.8445 17.9687 21.6001 18.0198C21.3558 18.0766 21.0462 18.105 20.6712 18.105C20.103 18.105 19.5462 17.9829 19.0007 17.7385C18.4609 17.4942 18.0121 17.1221 17.6541 16.6221C17.3018 16.1221 17.1257 15.4914 17.1257 14.73V1.7073Z" fill="white"/>
</svg> 
`,
          },
          {
            value: "uppercase",
            label: `<svg width="32" height="18" viewBox="0 0 32 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.159091 2.42045V0.545454H13.25V2.42045H7.76136V18H5.64773V2.42045H0.159091ZM18.7975 2.42045V0.545454H31.8884V2.42045H26.3998V18H24.2862V2.42045H18.7975Z" fill="white"/>
</svg>
`,
          },
          {
            value: "lowercase",
            label: `<svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.53409 3.84366V5.54821H0.75V3.84366H7.53409ZM2.72727 0.707297H4.73864V13.1846C4.73864 13.7528 4.82102 14.1789 4.9858 14.463C5.15625 14.7414 5.37216 14.9289 5.63352 15.0255C5.90057 15.1164 6.18182 15.1618 6.47727 15.1618C6.69886 15.1618 6.88068 15.1505 7.02273 15.1278C7.16477 15.0993 7.27841 15.0766 7.36364 15.0596L7.77273 16.8664C7.63636 16.9175 7.44602 16.9687 7.2017 17.0198C6.95739 17.0766 6.64773 17.105 6.27273 17.105C5.70455 17.105 5.14773 16.9829 4.60227 16.7385C4.0625 16.4942 3.61364 16.1221 3.25568 15.6221C2.90341 15.1221 2.72727 14.4914 2.72727 13.73V0.707297ZM16.2528 3.84366V5.54821H9.46875V3.84366H16.2528ZM11.446 0.707297H13.4574V13.1846C13.4574 13.7528 13.5398 14.1789 13.7045 14.463C13.875 14.7414 14.0909 14.9289 14.3523 15.0255C14.6193 15.1164 14.9006 15.1618 15.196 15.1618C15.4176 15.1618 15.5994 15.1505 15.7415 15.1278C15.8835 15.0993 15.9972 15.0766 16.0824 15.0596L16.4915 16.8664C16.3551 16.9175 16.1648 16.9687 15.9205 17.0198C15.6761 17.0766 15.3665 17.105 14.9915 17.105C14.4233 17.105 13.8665 16.9829 13.321 16.7385C12.7813 16.4942 12.3324 16.1221 11.9744 15.6221C11.6222 15.1221 11.446 14.4914 11.446 13.73V0.707297Z" fill="white"/>
</svg>
`,
          },
          { value: "none", label: `none` },
          {
            value: `full-width`,
            label: `<svg width="22" height="17" viewBox="0 0 22 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.110796 2.00417V0.207297H12.6562V2.00417H7.39631V16.9346H5.37074V2.00417H0.110796ZM21.3691 0.207297V16.9346H19.3435V2.33088H19.2455L15.1617 5.04252V2.98429L19.3435 0.207297H21.3691Z" fill="white"/>
</svg>
`,
          },
          {
            value: "full-size-kana",
            label: `<svg width="22" height="17" viewBox="0 0 22 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.110796 2.00417V0.207297H12.6562V2.00417H7.39631V16.9346H5.37074V2.00417H0.110796ZM21.3691 0.207297V16.9346H19.3435V2.33088H19.2455L15.1617 5.04252V2.98429L19.3435 0.207297H21.3691Z" fill="white"/>
</svg>
`,
          },
        ],
      },
    ],
  },

  {
    name: "Alignment",
    buildProps: ["float", "display", "position", "top", "right", "left", "bottom"],
    open: false,
    properties: [
      {
        name: "Alignment",
        property: "float",
        type: "radio",
        defaults: "none",
        list: [
          { value: "none", className: "fa fa-times" },
          { value: "left", className: "fa fa-align-left" },
          { value: "right", className: "fa fa-align-right" },
        ],
      },
      { property: "position", type: "select" },
    ],
  },
  {
    name: "Effects",
    open: false,
    buildProps: ["opacity", "box-shadow"],
    properties: [{ extend: "filter" }, { extend: "filter", property: "backdrop-filter" }],
  },

  {
    name: "Transition & Animation",
    open: false,
    properties: [
      {
        property: "mix-blend-mode",
        type: "select",
        default: "normal",
        options: [
          { id: "normal", label: "Normal" },
          { id: "multiply", label: "Multiply" },
          { id: "screen", label: "Screen" },
          { id: "overlay", label: "Overlay" },
          { id: "darken", label: "Darken" },
          { id: "lighten", label: "Lighten" },
          { id: "color-dodge", label: "Color dodge" },
          { id: "color-burn", label: "Color burn" },
          { id: "hard-light", label: "Hard light" },
          { id: "soft-light", label: "Soft light" },
          { id: "difference", label: "Difference" },
          { id: "exclusion", label: "Exclusion" },
          { id: "hue", label: "Hue" },
          { id: "saturation", label: "Saturation" },
          { id: "color", label: "Color" },
          { id: "luminosity", label: "Luminosity" },
        ],
      },
      { extend: "cursor" },
      get2DimProp("overflow", {
        x: overflowProps,
        y: overflowProps,
        mergable: true,
      }),
      {
        extend: "box-shadow",
        fromStyle(style: Record<string, string>, { separatorLayers }: any) {
          const input = style["box-shadow"] || "";
          const result = input
            ? input.split(separatorLayers).map((value) => {
                const { x, y, blur, spread, inset, color } = parse(value);
                return {
                  "box-shadow-h": x,
                  "box-shadow-v": y,
                  "box-shadow-blur": blur,
                  "box-shadow-spread": spread,
                  "box-shadow-color": color,
                  "box-shadow-type": inset ? "inset" : "",
                };
              })
            : [];
          return result;
        },
      },
      {
        extend: "text-shadow",
        fromStyle(style: Record<string, string>, { separatorLayers }: any) {
          const input = style["text-shadow"] || "";
          const result = input
            ? input.split(separatorLayers).map((value) => {
                const { x, y, blur, color } = parse(value);
                return {
                  "text-shadow-h": x,
                  "text-shadow-v": y,
                  "text-shadow-blur": blur,
                  "text-shadow-color": color,
                };
              })
            : [];
          return result;
        },
      },
      getFilterProp(),
      getFilterProp("backdrop-filter"),
      {
        property: "transition",
        type: "stack",
        layerLabel: (l: any, { values: v }: any) =>
          `${capitalize(v["transition-property"])}: ${v["transition-duration"]}`,
        properties: [
          {
            property: "transition-property",
            type: "select",
            default: "opacity",
            options: [
              // Size
              "width",
              "height",
              "min-width",
              "min-height",
              "max-width",
              "max-height",
              // Layout
              "padding",
              "margin",
              // Typography
              "color",
              "font-size",
              "line-height",
              "letter-height",
              // Border
              "border",
              "border-radius", // 'border-color', 'border-width',
              // Background
              "background",
              // Effects
              "opacity",
              "box-shadow",
              "text-shadow",
              "filter",
              "backdrop-filter",
              "transform",
              // Extra
              "all",
            ].map(strToOption),
          },
          {
            property: "transition-duration",
            type: "integer",
            default: "1s",
            unit: unitsTime[0],
            units: unitsTime,
            min: 0,
          },
          {
            property: "transition-timing-function",
            type: "select",
            default: "ease",
            options: [
              { id: "ease", label: "Ease" },
              { id: "ease-in", label: "Ease-In" },
              { id: "ease-in-out", label: "Ease-In-Out" },
              { id: "ease-out", label: "Ease-Out" },
              { id: "linear", label: "Linear" },
            ],
          },
          {
            property: "transition-delay",
            type: "integer",
            default: "0s",
            unit: unitsTime[0],
            units: unitsTime,
          },
        ],
      },

      {
        name: "animation",
        property: "animation",
        type: "stack",
        properties: [
          {
            name: "animation-duration",
            property: "animation-duration",
            type: "number",
            default: 1,
            units: ["s"],
          },
          {
            name: "easing-function",
            property: "easing-function",
            type: "select",
            default: "ease",
            options: [
              { id: "ease", name: "ease" },
              { id: "ease-in", name: "ease-in" },
              { id: "ease-out", name: "ease-out" },
              { id: "ease-in-out", name: "ease-in-out" },
              { id: "linear", name: "linear" },
              { id: "cubic-bezier(0.25, 0.1, 0.25, 1)", name: "cubic-bezier(0.25, 0.1, 0.25, 1)" },
              { id: "linear(1, -0.5, 0)", name: "linear(1, -0.5, 0)" },
            ],
          },
          {
            name: "animation-delay",
            property: "animation-delay",
            type: "number",
            default: 1,
            units: ["s"],
          },
          {
            name: "animation-iteration-count",
            property: "animation-iteration-count",
            defaults: 'infinite',
          },
          {
            type: "select",
            name: "animation-direction",
            property: "animation-direction",
            options: [
              { id: "normal", label: "Normal", name: "normal" },
              { id: "reverse", label: "Reverse", name: "reverse" },
              { id: "alternate", label: "Alternate", name: "alternate" },
              { id: "alternate-reverse", label: "Alternate Reverse", name: "alternate-reverse" },
              { id: "normal, reverse", label: "Normal, Reverse", name: "normal-reverse" },
              {
                id: "alternate, reverse, normal",
                label: "Alternate, Reverse, Normal",
                name: "alternate-reverse-normal",
              },
              { id: "inherit", label: "Inherit", name: "inherit" },
              { id: "initial", label: "Initial", name: "initial" },
              { id: "revert", label: "Revert", name: "revert" },
              { id: "revert-layer", label: "Revert Layer", name: "revert-layer" },
              { id: "unset", label: "Unset", name: "unset" },
            ],
          },
          {
            type: "select",
            name: "animation-fill-mode",
            property: "animation-fill-mode",
            options: [
              { id: "none", label: "None", name: "none" },
              { id: "forwards", label: "Forwards", name: "forwards" },
              { id: "backwards", label: "Backwards", name: "backwards" },
              { id: "both", label: "Both", name: "both" },
              { id: "none, backwards", label: "None, Backwards", name: "none-backwards" },
              { id: "both, forwards, none", label: "Both, Forwards, None", name: "both-forwards-none" },
              { id: "inherit", label: "Inherit", name: "inherit" },
              { id: "initial", label: "Initial", name: "initial" },
              { id: "revert", label: "Revert", name: "revert" },
              { id: "revert-layer", label: "Revert Layer", name: "revert-layer" },
              { id: "unset", label: "Unset", name: "unset" },
            ],
          },
          {
            type: "select",
            name: "animation-play-state",
            property: "animation-play-state",
            default:"running",
            options: [
              { id: "running", label: "Running", name: "running" },
              { id: "paused", label: "Paused", name: "paused" },
              { id: "paused, running, running", label: "Paused, Running, Running", name: "paused-running-running" },
              { id: "inherit", label: "Inherit", name: "inherit" },
              { id: "initial", label: "Initial", name: "initial" },
              { id: "revert", label: "Revert", name: "revert" },
              { id: "revert-layer", label: "Revert Layer", name: "revert-layer" },
              { id: "unset", label: "Unset", name: "unset" },
            ],
          },
          {
            type: "select",
            name: "animation-name",
            property: "animation-name",
            options: [
              { id: "none", name: "none"},
              { id: "fadeUp", name: "fadeUp" },
              { id: "fadeDown", name: "fadeDown" },
              { id: "bounce", name: "bounce" },
              { id: "rotate", name: "rotate" },
              { id: "pulse", name: "pulse" },
              { id: "slideInLeft", name: "slideInLeft" },
              { id: "scaleInOut", name: "scaleInOut" },
              { id: "shake", name: "shake" },
              { id: "spinAndScale", name: "spinAndScale" },
              { id: "float", name: "float" },
            ],
          },
        ],
      },

      {
        property: "transform",
        type: "stack",
        layerSeparator: " ",
        layerLabel: (l: any, { values, property }: any) => {
          const label = property.getProperty("transform-name").getOptionLabel(values["transform-name"]);
          return `${capitalize(label)}: ${values["transform-value"]}`;
        },
        fromStyle: fromStyleFnStack("transform"),
        toStyle: toStyleFnStack("transform", "0"),
        properties: [
          {
            property: "transform-name",
            type: "select",
            default: "translateX",
            options: [
              { id: "translateX", label: "Move X", units: unitsSize },
              { id: "translateY", label: "Move Y", units: unitsSize },
              { id: "translateZ", label: "Move Z", units: unitsSize },
              { id: "rotateX", label: "Rotate X", units: unitsAngle },
              { id: "rotateY", label: "Rotate Y", units: unitsAngle },
              { id: "rotateZ", label: "Rotate Z", units: unitsAngle },
              { id: "scale", label: "Scale", units: unitsPercent },
              { id: "scaleX", label: "Scale X", units: unitsPercent },
              { id: "scaleY", label: "Scale Y", units: unitsPercent },
              { id: "scaleZ", label: "Scale Z", units: unitsPercent },
              { id: "skewX", label: "Skew X", units: unitsAngle },
              { id: "skewY", label: "Skew Y", units: unitsAngle },
            ],
            onChange: handleTypeChange("transform-value"),
          },
          {
            property: "transform-value",
            type: "integer",
            default: "0",
          },
        ],
      },
      get2DimProp("transform-origin", {
        x: { default: "50%" },
        y: { default: "50%" },
      }),
      {
        property: "backface-visibility",
        type: "radio",
        default: "visible",
        options: [
          { id: "visible", label: "Visible" },
          { id: "hidden", label: "Hidden" },
        ],
      },
      {
        // Activate on parent element to enable 3D transforms on all of its children
        property: "perspective",
        type: "integer",
        min: 0,
        default: "none",
        units: unitsSize,
      },
      get2DimProp("perspective-origin", {
        x: { default: "50%" },
        y: { default: "50%" },
      }),
      {
        property: "transform-style",
        type: "radio",
        default: "flat",
        options: [
          { id: "flat", label: "2D" },
          { id: "preserve-3d", label: "3D" },
        ],
      },
    ],
  },
  {
    name: "Color", // used to be decorations
    open: false,
    buildProps: ["opacity", "background-color", "border-radius", "border", "box-shadow", "background"],
    properties: [
      {
        type: "slider",
        property: "opacity",
        defaults: 1,
        step: 0.01,
        max: 1,
        min: 0,
      },
      {
        property: "border-radius",
        properties: [
          { name: "Top", property: "border-top-left-radius" },
          { name: "Right", property: "border-top-right-radius" },
          { name: "Bottom", property: "border-bottom-left-radius" },
          { name: "Left", property: "border-bottom-right-radius" },
        ],
      },
      {
        property: "box-shadow",
        properties: [
          { name: "X position", property: "box-shadow-h" },
          { name: "Y position", property: "box-shadow-v" },
          { name: "Blur", property: "box-shadow-blur" },
          { name: "Spread", property: "box-shadow-spread" },
          { name: "Color", property: "box-shadow-color" },
          { name: "Shadow type", property: "box-shadow-type" },
        ],
      },
      {
        property: "background",
      },
    ],
  },

  {
    name: "Style", // what does this do
    open: false,
    buildProps: ["width", "flex-width", "height", "max-width", "min-height", "margin", "padding"],
    properties: [
      {
        id: "flex-width",
        type: "integer",
        name: "Width",
        units: ["px", "%"],
        property: "flex-basis",
        toRequire: 1,
      },
      {
        property: "margin",
        properties: [
          { name: "Top", property: "margin-top" },
          { name: "Right", property: "margin-right" },
          { name: "Bottom", property: "margin-bottom" },
          { name: "Left", property: "margin-left" },
        ],
      },
      {
        property: "padding",
        properties: [
          { name: "Top", property: "padding-top" },
          { name: "Right", property: "padding-right" },
          { name: "Bottom", property: "padding-bottom" },
          { name: "Left", property: "padding-left" },
        ],
      },
    ],
  },
];
