import { BsFillTriangleFill } from "react-icons/bs";
import { Shape } from '../Interfaces/ShapesInterfaces'
import { useState, useEffect } from "react";
import traitManagerStore from "../../../GlobalStates/TraitManegerStore";
import ShapeForm from "../Utilities/ShapeForm";
import { observer } from 'mobx-react';
const Triangle = observer(() => {

    const {
        setComponentManeger,
        setTempShapeTrairs,
        tempShapTraits } = traitManagerStore;

    const [shape, setShape] = useState<Shape>({
        size: "35px",
        color: "#2b1313"
    })

    const generateRandomNumber = () => {
        return Math.floor(100000 + Math.random() * 900000);
    };

    const [ShapeId,] = useState(generateRandomNumber());

    useEffect(() => {
        if (tempShapTraits?.id === ShapeId) {
            setShape(tempShapTraits!.shape);
        }
    }, [tempShapTraits]);



    const openShapeTraitManager = () => {
        setTempShapeTrairs({ id: ShapeId, shape: shape })
        setComponentManeger(<ShapeForm />);
    };

    return (
        <BsFillTriangleFill
            onClick={openShapeTraitManager}
            style={{
                color: `${shape.color}`,
                width: `${shape.size}`,
                height: `${shape.size}`
            }}
        />
    )
});

export default Triangle
