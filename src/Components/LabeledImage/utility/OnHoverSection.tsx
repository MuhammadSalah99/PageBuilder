import { useEffect } from 'react'
import Label from '../interfaces/LabelInterfaces'
import styles from "../styles/LabeledImageStyles.ts"
type OnHoverSectionType = {
    label: Label
}

const OnHoverSection: React.FC<OnHoverSectionType> = ({ label }) => {

    const dynamicStyleLeft = parseInt(label.left) < 50 ? { left: '35px' } : { right: '35px' };
    const dynamicStyleTop = parseInt(label.top) < 50 ? { top: '10px' } : { bottom: '10px' };
    const hexToRgb = (hex: string) => {
        const sanitizedHex = hex.replace(/^#/, '');

        const r = parseInt(sanitizedHex.substring(0, 2), 16);
        const g = parseInt(sanitizedHex.substring(2, 4), 16);
        const b = parseInt(sanitizedHex.substring(4, 6), 16);
        const a = parseFloat((label.dialougeOpacity / 100).toFixed(2));
        return `rgba(${r}, ${g}, ${b},${a} )`;
    };
    const bg = hexToRgb(label.dialougeColor)

    useEffect(() => {
        console.log(bg, label.dialougeColor);
    },[]);

    return (
        <div
            style={
                {
                    ...styles.onHoverSection,
                    ...dynamicStyleLeft,
                    ...dynamicStyleTop,
                    backgroundColor: `${bg}`,
                    width: `${label.dialougeWidth}px`,
                    height: `${label.dialougeHeight}px`
                }}
        >
            <div style={{ ...styles.onHoverCont, display: "flex", flexDirection: "column", justifyContent: "space-between", alignContent: "center", }}>
                <h1 style={styles.onHoverTitle}>{label.title}</h1>
                <p style={styles.onHoverDesc}>{label.desc}</p>
                <button style={styles.onHoverButton}>
                    <a style={styles.onHoverLink} href={label.buttonLink} target='_blank'>{label.buttonTitle}</a>
                </button>

            </div>
        </div>
    )
}

export default OnHoverSection 
