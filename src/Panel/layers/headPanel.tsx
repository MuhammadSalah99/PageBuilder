import HeaderPanel from "../../PanelUIDesign/controlPanel";
import MediaBlockManeger from "../../PanelUIDesign/MediaBlockManeger/MediaBlockManeger";
import ShapesManager from "../../PanelUIDesign/MediaBlockManeger/ShapesManager";

function HeadPanel() {
  return (
    <div className="headPanel">
      <HeaderPanel></HeaderPanel>
      <MediaBlockManeger></MediaBlockManeger>
      <ShapesManager></ShapesManager>
    </div>
  );
}

export default HeadPanel;
