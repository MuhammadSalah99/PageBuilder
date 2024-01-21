import traitManagerStore from '../../../GlobalStates/TraitManegerStore.ts';
import { useState, useEffect, ChangeEvent } from 'react';
import styles from '../styles/ImageCardFormStyles';
import { observer } from 'mobx-react';

const NavigationStyleForm = observer(() => {

    const { tempNavStyle, setTempNavStyle } = traitManagerStore;

    const [color, setColor] = useState(tempNavStyle!.style.backgroundColor); 
    const [size, setSize] = useState(tempNavStyle!.style.size);

    useEffect(() => {
        setColor(tempNavStyle!.style.backgroundColor);
        setSize(tempNavStyle!.style.size);
    }, [])

    const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        setTempNavStyle(
            {
                style: { backgroundColor: color, size: `${size}px` },
                id: tempNavStyle!.id
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
});

export default NavigationStyleForm
