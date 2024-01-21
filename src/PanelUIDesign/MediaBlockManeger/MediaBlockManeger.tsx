import "./MediaBlockManeger.css";
import { IoClose } from "react-icons/io5";
const MediaBlockManeger = () => {
  return (
    <div className="navCont">
      <nav id="gjs-head-panel" className="gjs-head-panel gjs-pn-panel navStyle">
        <div id="modal" className="darkOverlayStyle">
          <div className="centeredStyle">
            <div id="modal-content" className="modalStyle">
              <div className="modalHead">
                <p className="modalHeadTitle">Animation addon</p>
                <IoClose
                  id="close-modal"
                  style={{ cursor: "pointer", fontSize: "19px" }}
                />
              </div>
              <div className="searchBox">
                <div className="searchicon"></div>

                <input
                  className="searchBoxInput"
                  placeholder="Find Effect..."
                  type="search"
                />
                <button className="searchBoxButton">Search</button>
                <div className="category">
                  <div className="All"> All</div>
                  <div id="media-blocks" className="Image"> Image</div>
                  <div className="Text"> Text</div>
                  <div id="basic-blocks" className="Text">Basic</div>
                </div>
              </div>
              <div id="modal-blocks" className="modalBlocksCont"></div>
              <div>
                <button id="modal-add-button" className="modalAddButton">
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MediaBlockManeger;
