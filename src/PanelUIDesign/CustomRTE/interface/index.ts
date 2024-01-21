import { Editor } from "grapesjs";

export interface RTEProps{
    editor:Editor;
}

export interface Options {
    open?: string | Element;
    openEvent?: string;
    style?: {
      display?: string;
    };
    autoclose?: boolean;
    closeOnBlur?: boolean;
    template?: string;
  }
  

  export interface RTE {
    base: {
      bold: boolean;
      italic: boolean;
      underline: boolean;
      strikethrough: boolean;
      link: boolean;
    };
    fonts: {
      fontColor?: boolean;
      hilite: boolean;
      fontName: string[] | string | boolean;
      fontSize: string | number | boolean;
    };
    format: {
      heading1: boolean;
      heading2: boolean;
      heading3: boolean;
      heading4: boolean;
      heading5: boolean;
      heading6: boolean;
      paragraph: boolean;
      clearFormatting: boolean;
    };
    darkColorPicker: boolean;
    maxWidth: string | number;
    icons: {
      fontColor: string;
      hiliteColor: string;
      heading1: string;
      heading2: string;
      heading3: string;
      heading4: string;
      heading5: string;
      heading6: string;
      paragraph: string;
      quote: string;
      clear: string;
      indent: string;
      outdent: string;
      subscript: string;
      superscript: string;
      olist: string;
      ulist: string;
      justifyLeft: string;
      justifyCenter: string;
      justifyFull: string;
      justifyRight: string;
      copy: string;
      cut: string;
      paste: string;
      delete: string;
      code: string;
      line: string;
      undo: string;
      redo: string;
    };
    subscriptSuperscript: boolean;
    list: boolean;
    undoredo: boolean;
  }
  