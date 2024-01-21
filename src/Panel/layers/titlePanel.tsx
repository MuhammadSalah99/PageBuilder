import { togglePanel } from "./handleLayerUIEvent";
//import ToggleLeft from "./Svgs/toggleLeft";

function TitlePanel() {
  return (
    <div className="layersPanel" id="title-panel-id">
      <div>
        <div className="titile">
          <div className="logo"></div>
          <input type="text" className="text" defaultValue="Untitled_" />
        </div>
        <div className="all">
          <div className="menu"></div>
          <div className="search">
            <input type="text" className="Stext" placeholder="search" />
          </div>
        </div>
      </div>
      <div className="toggle" onClick={togglePanel}>
      </div>
    </div>
  );
}

export default TitlePanel;
