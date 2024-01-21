import "./MediaBlockManeger.css";
import { IoClose } from "react-icons/io5";
const ShapesManager = () => {
    return (
        <div className="navCont">
            <nav id="gjs-head-panel" className="gjs-head-panel gjs-pn-panel navStyle">
                <div id="modal-shapes-cont" className="darkOverlayStyle">
                    <div className="centeredStyle">
                        <div id="modal-content" className="modalStyle">
                            <div className="modalHead">
                                <p className="modalHeadTitle">Shapes Menu</p>
                                <IoClose
                                    id="close-shapes"
                                    style={{ cursor: "pointer", fontSize: "19px" }}
                                />
                            </div>
                            <div className="searchBox">
                                <input
                                    className="searchBoxInput"
                                    placeholder="Find Effect..."
                                    type="search"
                                />
                                <button className="searchBoxButton">Search</button>
                                <div className="category">
                                    <div className="Image"> All</div>
                                    <div className="Text"> Icons</div>
                                    <div className="Text">Packages</div>
                                </div>
                            </div>
                            <div id="modal-shapes" className="modalBlocksCont"></div>
                            <div>
                                <button id="modal-add-shapes" className="modalAddButton">
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

export default ShapesManager;
