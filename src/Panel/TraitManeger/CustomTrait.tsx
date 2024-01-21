import { Editor } from "grapesjs";
import { useEffect, useState } from "react";
import traitManagerStore from "../../GlobalStates/TraitManegerStore";

interface Props {
    editor: Editor;
    componentManeger: React.ReactNode;
}

function CustomTrait({ editor, componentManeger }: Props) {
    const { openTraitManeger, setOpenTraitManeger, setComponentManeger} = traitManagerStore;
    const [isReactComponent, setIsReactComponent] = useState(false);

    const components = [
        "sticky-image",
        "LabeledImage",
        "ImageCard",
        "MediaGrid",
        "IMAGEVERTICALPARALLAX",
        "HoverGallery",
        "ImageCompare",
        "IMAGEHORIZONTALPARALLAX",
        "MappingPoints",
        "Triangle",
        "Hexagon",
        "Octagon",
        "Heptagon",
        "LeftArrow",
        "RightArrow",
        "TopArrow",
        "BottomArrow",
        "Star",
        "Circle",
        "RightAngleArrow",
        "LeftAngleArrow",
        "TopAngleArrow",
        "BottomAngleArrow",
    ];

    const [type, setType] = useState("");

    useEffect(() => {
        function dummyFunction(e) {
            if (components.includes(e.attributes.type)) {
                setType(e.attributes.type);
                setIsReactComponent(true);
            } else {
                setIsReactComponent(false);
            }
        }
        function closeTraitManeger(){
            setComponentManeger(null);
            setOpenTraitManeger(false);
        }

        if (editor) {
            editor.on("component:selected", dummyFunction);
        } else {
            return;
        }

        if(editor){
            editor.on("component:remove", closeTraitManeger)
        }else return;

        return () => {
            if (editor) {
                editor.off("component:selected", dummyFunction);
                editor.off("component:remove", closeTraitManeger)
            }


        };
    });

    return isReactComponent ? componentManeger : <div className="trait-manger-panel"></div>;
}

export default CustomTrait;
