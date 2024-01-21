import traitManagerStore from '../../../GlobalStates/TraitManegerStore.ts';
import { useState, useEffect, ChangeEvent } from 'react';
import styles from '../styles/ImageCardFormStyles';
import { observer } from 'mobx-react';

const BulletStyleForm = observer(() => {

    const { tempBulletStyle, setTempBulletStyle } = traitManagerStore;

    const [activeColor, setActiceColor] = useState(tempBulletStyle!.style.activeColor);
    const [nonActiceColor, setNonActiveColor] = useState(tempBulletStyle!.style.nonActiveColor);

    useEffect(() => {
        setActiceColor(tempBulletStyle!.style.activeColor);
        setNonActiveColor(tempBulletStyle!.style.nonActiveColor);
    }, [])

    const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        setTempBulletStyle(
            {
                style: { nonActiveColor: nonActiceColor, activeColor: activeColor },
                id: tempBulletStyle!.id
            })
    };

    return (

        <form style={styles.compManegmentContent}>
            <div style={styles.formNavStyle}>
                <label htmlFor="activeColor-input">Active Color: </label>
                <input
                    type="color"
                    id="activeColor-input"
                    value={activeColor}
                    onChange={(e) => setActiceColor(e.target.value)}
                />
            </div>
            <div style={styles.formNavStyle}>
                <label htmlFor="nonActiveColor-input">Non Active Color: </label>
                <input
                    type="color"
                    id="nonActivecolor-input"
                    value={nonActiceColor}
                    onChange={(e) => setNonActiveColor(e.target.value)}
                />
            </div>

            <button style={styles.labelFormButton} onClick={handleSubmit}>Save</button>
        </form>
    )
});

export default BulletStyleForm
