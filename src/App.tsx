import "./App.css";
import "./Editor.css";
// import "grapesjs/dist/css/grapes.min.css";
import grapesjs, { Editor, usePlugin } from "grapesjs";
import gjsBlockBasic from "grapesjs-blocks-basic";
import { useEffect, useState } from "react";
import reactComponents from "./react-components";
import baseReactComponent from "./base-react-component";
import gjsPresetWebpage from "grapesjs-preset-webpage";
import hoverGallery from "./Components/HoverGallery/hover-gallery";
import imageCompareSm from "./Components/ImageCompare/image-compare-sm";
import exportPlugin from "grapesjs-plugin-export";
import customCodePlugin from "grapesjs-custom-code";
import navbarPlugin from "grapesjs-navbar";
import tooltipPlugin from "grapesjs-tooltip";
import typedPlugin from "grapesjs-typed";
import bgPlugin from "grapesjs-style-bg";
import tuiPlugin from "grapesjs-tui-image-editor";
import grapesjsIcons, { PluginOptions } from "grapesjs-icons";

import stickyBackground from "./Components/StickyBackground/stickyBackground";
import { addHideOrShowWidgetsControllProperties } from "./Plugins/showHidWidgets/handleProperties";
import { handlAllHideOrShowWidgetsEvents } from "./Plugins/showHidWidgets/handleEditorEvent";
import { handleSpeedScrollEvent } from "./Plugins/ScrollSpeed/handleEvents";
import { handleLayersEvent } from "./Panel/layers/handleLayersEvents";
import StyleManagerPanel from "./Panel/StyleManager/StyleManagerPanel";
import StyleManager from "./Panel/StyleManager";
import { observer } from "mobx-react";
import CustomAssetManeger from "./Plugins/CustomerAssetsManeger/CustomAssetsManeger";
import traitManagerStore from "./GlobalStates/TraitManegerStore";
import assetManagerStore from "./GlobalStates/AssetManagerStore";
import ConfigurationManeger from "./Plugins/ConfigurationManeger/ConfigurationManeger";
import NumberCounter from "./Components/NumberCounter/NumberCounter";
import HeadPanel from "./Panel/layers/headPanel";
import TitlePanel from "./Panel/layers/titlePanel";
import RTE from "./PanelUIDesign/CustomRTE/RTE";
import editorStore from "./GlobalStates/EditorInstance";
import { customStyleManager } from "./Panel/StyleManager/StyleManegerSectors";
import parserPostCSS from "grapesjs-parser-postcss";
import AnimatedWordPlugin from "./Components/AnimatedWord/AnimatedWordPlugin";

type EditorType = Editor;
const options: PluginOptions = {
  collections: [
    "ri", // Remix Icon by Remix Design,
    "mdi", // Material Design Icons by Pictogrammers
    "uim", // Unicons Monochrome by Iconscout
    "streamline-emojis", // Streamline Emojis by Streamline
  ],
};

const App: React.FC = observer(() => {
  // const [editor, setEditor] = useState<EditorType | null>(null);
  const { editor, setEditor } = editorStore;

  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const { componentManeger } = traitManagerStore;
  const { openAssetManegerModal } = assetManagerStore;

  useEffect(() => {
    const editorInstance: EditorType = grapesjs.init({
      container: "#editor",
      height: "100vh",
      dragMode: "absolute",
      // styleManager:true,
      noticeOnUnload: false,
      storageManager: {
        type: "local",
        autosave: true,
        autoload: true,
        stepsBeforeSave: 1,
      },
      canvasCss: `
  .gjs-selected {
    outline: 1px solid #833a3a !important;
  }
  .gjs-hovered {
    outline: 1px solid #833a3a !important;
  }
`,
      deviceManager: {
        appendTo: ".deviceControl",
      },
      layerManager: {
        appendTo: ".layers-container",
      },
      plugins: [
        // grapes ready plugins
        parserPostCSS,
        gjsBlockBasic,
        gjsPresetWebpage,
        exportPlugin,
        customCodePlugin,
        navbarPlugin,
        tooltipPlugin,
        typedPlugin,
        bgPlugin,
        tuiPlugin,
        usePlugin(grapesjsIcons, options),
        gjsBlockBasic,
        gjsPresetWebpage,
        // custom Component / plugins
        baseReactComponent,
        reactComponents,

        hoverGallery,
        imageCompareSm,
        NumberCounter,
        stickyBackground, // Include the StickyBackground plugin
        StyleManager,
        AnimatedWordPlugin,
        // styleFilter
      ],
      pluginsOpts: {
        gjsPresetWebpage: {},
        exportPlugin: {},
        customCodePlugin: {},
        navbarPlugin: {},
        tooltipPlugin: {},
        typedPlugin: {},
        bgPlugin: {},
        tuiPlugin: {},
      },
      commands: {},
      assetManager: {
        assets: [],
      },
      traitManager: { appendTo: ".trait-manger-panel" },
      selectorManager: { appendTo: ".selector-maneger" },
      styleManager: {
        appendTo: ".styles-container",
        sectors: customStyleManager,
      },
      canvas: {
        styles: ["https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"],
        scripts: [
          "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",
          "https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.2/anime.min.js",
        ],
      },
    });

    editorInstance.Css.setRule(".constraint-properties", {
      "aspect-ratio": "1 / 1",
    });
    editorInstance.Css.setRule(".gjs-selected", {
      outline: "2.9px solid rgb(193, 57, 59) !important",
    });
    editorInstance.Css.setRule(".gjs-hovered", {
      outline: "2px solid #ff3800 !important",
    });
    editorInstance.Css.setRule(".gjs-hovered", {
      outline: "2px solid #ff3800 !important",
    });
    editorInstance.Css.setRule(".fade-in", {
      opacity: "1",
      transition: "opacity 1s ease-in-out",
      background: "red!important",
      "background-color": "#b68b8b!important",
      "animation-duration": "4s",
    });
    RTE(editorInstance);
    handleSpeedScrollEvent(editorInstance);
    // editorInstance.getModel().set("dmode",'relative');
    addHideOrShowWidgetsControllProperties(editorInstance);
    handlAllHideOrShowWidgetsEvents(editorInstance);
    handleLayersEvent(editorInstance);

    setEditor(editorInstance);
  }, []);

  const toggleRightPanel = () => {
    setRightPanelOpen(!rightPanelOpen);
  };

  return (
    <>
      {openAssetManegerModal && <CustomAssetManeger />}
      <HeadPanel />
      <TitlePanel />
      <div className="editor-row">
        <div className="panel-left" id="left-panel-id">
          <div className="layers-container"></div>
        </div>
        <div className="editor-canvas">
          <div id="editor"></div>
        </div>
        <StyleManagerPanel
          toggleRightPanel={toggleRightPanel}
          rightPanelOpen={rightPanelOpen}
          editor={editor as Editor}
          componentManeger={
            <ConfigurationManeger componentManeger={componentManeger} />
          }
        />
      </div>
    </>
  );
});

export default App;
