import { Component } from "grapesjs";
import React, { ChangeEvent, useEffect, useState } from "react";
import "../Styles/Frame.css";
import Constraint from "../SVGs/Constraint";
import IndependentCorners from "../SVGs/IndependentCorners";
import { FrameProps } from "../interface";

function FrameComponent({ editor }: FrameProps) {
  const [, setBoundingBox] = useState<DOMRect>({} as DOMRect); //client bounding rectangle // for debugging purposes

  const [xpos, setXpos] = useState(0);
  const [ypos, setYPos] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [selected, setSelected] = useState(false);
  const [activeElement, setActiveElement] = useState<string | null>(null);

  const [comp, setComp] = useState<Component | null>(null);

  const [constraints, setConstraints] = useState(false);

  useEffect(() => {
    function handleComponentSelection(e: Component) {
      setSelected(true);
      setComp(e);
      const box = e.view?.el.getBoundingClientRect() as DOMRect;
      setBoundingBox(box);
      setXpos(Math.round(box.x));
      setYPos(Math.round(box.y));
      setWidth(box.width);
      setHeight(box.height);
    }

    const handleComponentDrag = (e) => {
      if (selected) {
        const newComponent = e.target.view.el.getBoundingClientRect() as DOMRect;
        if (newComponent) {
          setYPos(newComponent.top);
          setXpos(newComponent.left);
          setWidth(newComponent.width);
          setHeight(newComponent.height);
        }
      }
    };

    function handleStyleUpdate(e) {
      if (selected) {
        const newComponent = e.view.el.getBoundingClientRect() as DOMRect;
        if (newComponent) {
          setYPos(newComponent.top);
          setXpos(newComponent.left);
          setWidth(newComponent.width);
          setHeight(newComponent.height);
        }
      }
    }

    function handleComponentUnselect(e) {
      setComp(null);
      setSelected(false);
    }

    if (editor) {
      editor.on("component:selected", handleComponentSelection);
      editor.on("component:drag", handleComponentDrag);
      editor.on("component:styleUpdate", handleStyleUpdate);
      editor.on("component:deselected", handleComponentUnselect);
    }

    return () => {
      if (editor) {
        editor.off("component:selected", handleComponentSelection);
        editor.off("component:drag", handleComponentDrag);
        editor.off("component:styleUpdate", handleStyleUpdate);
        editor.off("component:deselected", handleComponentUnselect);
      }
    };
  }, [selected]);

  //on component mount, check if it has the property 'constraint-properties'
  useEffect(() => {
    if (comp?.getClasses().includes("constraint-properties")) {
      setConstraints(true);
    } else {
      setConstraints(false);
    }
  }, [comp]);

  // on change, set the value being changed.
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>, value: string) => {
    if (comp && selected) {
      if (value === "x") {
        setXpos(Number((e.target as HTMLInputElement).value));
        setActiveElement("x");
      } else if (value === "y") {
        setYPos(Number((e.target as HTMLInputElement).value));
        setActiveElement("y");
      } else if (value === "w") {
        setWidth(Number((e.target as HTMLInputElement).value));
        setActiveElement("w");
      } else if (value === "h") {
        setHeight(Number((e.target as HTMLInputElement).value));
        setActiveElement("h");
      }
    }

    updateDimensions();
  };

  // function to update properties based on if there is a constraint (aspect-ratio, height auto , width auto) or not
  function updateDimensions() {
    if (constraints) {
      comp?.setStyle({
        position: "absolute",
        left: `${xpos}px`,
        top: `${ypos}px`,
        width: activeElement === "w" ? `${width}px` : `auto`,
        height: activeElement === "h" ? `${height}` : `auto`,
        "aspect-ratio": "1/1",
      });
    } else {
      comp?.setStyle({
        position: "absolute",
        left: `${xpos}px`,
        top: `${ypos}px`,
        width: `${width}px`,
        height: `${height}px`,
      });
    }
  }

  // function to turn on and off the constraint property from a component
  function constraintEvents() {
    const arrayOfclasses: string[] = comp?.getClasses();
    if (arrayOfclasses.includes("constraint-properties")) {
      setConstraints(false);
      comp?.removeClass("constraint-properties");
    } else {
      setConstraints(true);
      comp?.addClass("constraint-properties");
    }
  }

  return (
    <div className="flex flex-col w-full justify-between items-center">
      <p className="frame-el-title text-left text-gray font-normal"> Frame</p>
      <div className="input-frame-el">
        <div className="input-frame-el-position">
          {/* X position */}

          <div className="frame-position">
            <label htmlFor="Xposition" className="font-normal text-white frame-position-label">
              X
            </label>
            <input
              type="number"
              value={xpos}
              placeholder="X"
              className="frame-input-input"
              onChange={(e) => onChangeInput(e, "x")}
            />
          </div>

          {/* Y position */}
          <div className="frame-position">
            <label htmlFor="Yposition" className="font-normal text-white frame-position-label">
              Y
            </label>
            <input
              type="number"
              value={ypos}
              placeholder="Y"
              className="frame-input-input"
              onChange={(e) => onChangeInput(e, "y")}
            />
          </div>

          {/* Independent corners  */}
          <IndependentCorners activeElement={activeElement as string} />
        </div>

        <div className="input-frame-el-position">
          {/* Width */}

          <div className="frame-position">
            <label htmlFor="width" className="font-normal text-white frame-position-label">
              W
            </label>
            <input
              type="number"
              value={width}
              placeholder="W"
              className="frame-input-input"
              onChange={(e) => onChangeInput(e, "w")}
            />
          </div>

          {/* height */}

          <div className="frame-position">
            <label htmlFor="height" className="font-normal text-white frame-position-label">
              H
            </label>
            <input
              type="number"
              value={height}
              placeholder="H"
              className="frame-input-input"
              onChange={(e) => onChangeInput(e, "h")}
            />
          </div>

          {/* constraint proportions  */}

          <div className="">
            <button
              className="control-btn"
              onClick={() => {
                constraintEvents();
              }}
            >
              <Constraint isActive={constraints} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FrameComponent;
