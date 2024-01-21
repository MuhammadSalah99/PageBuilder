import { Editor } from 'grapesjs';

export interface SharedEditor{
    editor:Editor;
}


export interface RTEPosition {
    top: number;
    left: number;
    right:number;
    canvasOffsetTop: number;
    canvasOffsetLeft: number;
    elRect: {
      top: number;
      left: number;
      height: number;
      width:number;
      rect: {
        top: number;
        left: number;
        width: number;
      };
    };
    canvasOffset: {
      top: number;
      left: number;
    };
    canvasRect: {
      top: number;
      left: number;
      width: number;
      height: number;
    };
    targetWidth: number;
    targetHeight: number;
  }