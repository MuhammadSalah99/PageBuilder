// ZoomControl component
import "./controlPanelStyle.css";
import {
  AlignControl,
  AudioControl,
  TextControl,
  ZoomControl,
  MediaControl,
  SectionControl,
  PeopleControl,
} from "./ControlComponents";

const DeviceControl = () => <div className="deviceControl"></div>;
const ViewControl = () => <button className="viewControl"></button>;

const PublishControl = () => (
  <button className="publishControl">Publish</button>
);
const ShareControl = () => <button className="shareControl">Share</button>;

// Main component
const HeaderPanel = () => (
  <div>
    <div className="headerPanel">
      <MediaControl />
      <SectionControl />
      <ZoomControl />
      <TextControl />
      <AlignControl />
      <AudioControl />
      <DeviceControl />
      <PeopleControl />
      <ViewControl />
      <ShareControl />
      <PublishControl />
    </div>
  </div>
);

export default HeaderPanel;
