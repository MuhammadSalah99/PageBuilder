import { useEffect, useState } from "react";
import FrameComponent from "./FrameComponent";
import "./Styles/StyleManager.css";
import { StyleMangerProps } from "./interface";
import CustomTrait from "../TraitManeger/CustomTrait";

function StyleManagerPanel({rightPanelOpen, editor , componentManeger}: StyleMangerProps) {
  const [componentSelected, setComponentSelected] = useState(false);

  useEffect(() => {
    if (editor) {
      editor.on("component:selected", () => {
        setComponentSelected(true);
      });

      editor.on("component:deselected", () => {
        setComponentSelected(false);
      });
    }

    return () => {
      if (editor) {
        editor.off("component:selected", () => {
          setComponentSelected(true);
        });

        editor.off("component:deselected", () => {
          setComponentSelected(false);
        });
      }
    };
  });

  return (
    <div className="flex items-center justify-center" id="right-panel-id">
      <div
        className="panel-right transition"
        data-id="style-manger"
        style={{
          transition: "transform 0.3s ease-in-out",
          transform: `translateX(${rightPanelOpen ? "0" : "140%"})`,
        }}
      >
        <CustomTrait editor={editor}  componentManeger={componentManeger}/>
        {componentSelected && <FrameComponent editor={editor} />}
        <div className="styles-container">
          <div className="selector-maneger"></div>
        </div>
      </div>
    </div>
  );
}

export default StyleManagerPanel;
