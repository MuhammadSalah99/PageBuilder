import { observer } from "mobx-react";
import zoomValueStore from "../GlobalStates/ZoomValueStore";
import { controlsData } from "../Panel/config/controlElements";
import { ChangeEvent } from "react";

const renderControls = (controls, controlId) => {
  const controlGroup = controls.find(
    (group) => Object.keys(group)[0] === controlId
  );

  if (!controlGroup) return null;

  const controlType = Object.keys(controlGroup)[0];
  const controlItems = controlGroup[controlType];

  return controlItems.map((item, itemIndex) => {
    const { className, type, children, imgUrl, id, onClick } = item;
    const style = { backgroundImage: `url(${imgUrl})` };

    const ElementType = type;

    if (ElementType === "label") {
      return (
        <label key={itemIndex} className={className}>
          {item.text}
        </label>
      );
    }

    const renderedChildren = renderChildren(children);

    return (
      <ElementType
        key={itemIndex}
        className={className}
        id={id}
        style={style}
        onClick={onClick}
      >
        {renderedChildren}
      </ElementType>
    );
  });
};

const renderChildren = (children) => {
  if (!children || children.length === 0) return null;

  return children.map((child, childIndex) => {
    const { className, type, text, imgUrl, id, onClick } = child;
    const style = { backgroundImage: `url('${imgUrl}')` };

    const ElementType = type;
    if (type === "label") {
      return (
        <ElementType
          key={childIndex}
          id={id}
          className={className}
          defaultValue={text}
          onClick={onClick}
        >
          {text}
        </ElementType>
      );
    }

    return (
      <ElementType
        key={childIndex}
        className={className}
        style={style}
      ></ElementType>
    );
  });
};

const ZoomControl = observer(() => {
  
  return (
  <div className="zoomControl">
    <input id="zoom-input" className="zoom-input" />
    <select id="zoom-select" className="zoom">
      <option value="25">25%</option>
      <option value="50">50%</option>
      <option value="75">75%</option>
      <option value="100" defaultValue={100}>
        100%
      </option>
      <option value="150">150%</option>
      <option value="200">200%</option>
    </select>

    {renderControls(controlsData, "zoomControl")}
  </div>
  )
});

const TextControl: React.FC = (): JSX.Element => {
  return (
    <div className="textControl">
      {renderControls(controlsData, "textControl")}
    </div>
  );
};

const AudioControl = () => (
  <div className="audioControl">
    {renderControls(controlsData, "audioControl")}
  </div>
);
const PeopleControl = () => (
  <div className="peopleControl">
    {renderControls(controlsData, "peopleControl")}
  </div>
);
const SectionControl = () => (
  <div className="sectionControl">
    {renderControls(controlsData, "sectionControl")}
  </div>
);
const MediaControl = () => (
  <div className="mediaControl">
    {renderControls(controlsData, "mediaControl")}
  </div>
);
const AlignControl = () => (
  <div className="alginControl">
    {renderControls(controlsData, "alginControl")}
  </div>
);

export {
  AlignControl,
  AudioControl,
  ZoomControl,
  TextControl,
  MediaControl,
  SectionControl,
  PeopleControl,
};
