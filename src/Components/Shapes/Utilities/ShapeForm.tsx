import styles from '../Styles/styles'
import { useState } from 'react'
import traitManagerStore from '../../../GlobalStates/TraitManegerStore'
import { observer } from 'mobx-react';

const ShapeForm = observer(() => {

    const {tempShapTraits, setTempShapeTrairs} = traitManagerStore;
    const [color, setColor] = useState(tempShapTraits!.shape.color); 
    const [size, setSize] = useState(tempShapTraits!.shape.size);
    

    const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        setTempShapeTrairs(
            {
                shape: { color: color, size: `${size}px` },
                id: tempShapTraits!.id
            })
    };

    return (
        <form style={styles.compManegmentContent}>
            <div style={styles.formNavStyle}>
                <label htmlFor="navColor-input">Color: </label>
                <input
                    type="color"
                    id="navColor-input"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                />
            </div>
            <div style={styles.formNavStyle}>
                <label htmlFor="size-input">Size: </label>
                <input
                    style={styles.formNavStyleInput}
                    type="number"
                    id="size-input"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                />
            </div>
            <button style={styles.labelFormButton} onClick={handleSubmit}>Save</button>
        </form>
    )
})

export default ShapeForm
