import { Editor } from "grapesjs";

/**
 * 
 * @see StyleManagerPanel.tsx
 */

export interface StyleMangerProps {
    toggleRightPanel?: () => void;
    rightPanelOpen?: boolean;
    editor: Editor;
    componentManeger: React.ReactNode;
}

export interface FrameProps {
    boundingBox?: DOMRect;
    editor: Editor;
}
