import { useEffect, useState } from 'react';
import Label from '../interfaces/LabelInterfaces'
import styles from '../styles/LabeledImageStyles'
import { RiAddFill } from "react-icons/ri"
import OnHoverSection from './OnHoverSection';
import previewManagerStore from '../../../GlobalStates/PreviewManagerStore';
import traitManagerStore from '../../../GlobalStates/TraitManegerStore';

interface LabelProps {
    labels: Label[];
    setLabels: (value: Label[]) => void;
    image: string,
    id: number
}
const LabelComponent: React.FC<LabelProps> = ({ labels, setLabels, image, id }) => {

    const { isPreview } = previewManagerStore;
    const [isDragging, setIsDragging] = useState(false);
    const [dragDistance, setDragDistance] = useState(0);
    const [lastDragDistance, setLastDragDistance] = useState(0);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [lastVerticalDragDistance, setLastVerticalDragDistance] = useState(0);
    const [verticalDragDistance, setVerticalDragDistance] = useState(0);

    const { setTempLabels } = traitManagerStore;

    const [hoveredIndex, setHoveredIndex] = useState<number | null>();

    const onDragStart = (event: MouseEvent) => {
        event.preventDefault();
        setIsDragging(true);
        setStartX(event.clientX);
        setStartY(event.clientY);
    };

    const onDragMove = (event: MouseEvent, index: number) => {
        event.preventDefault();
        if (isDragging && !isPreview) {
            const currentX = event.clientX;
            const currentY = event.clientY;
            const horizontalDistanceMoved = lastDragDistance - (startX - currentX) * 0.3;
            const verticalDistanceMoved = lastVerticalDragDistance - (startY - currentY) * 0.3;
            if (horizontalDistanceMoved < 93 && horizontalDistanceMoved > 0.2) {
                setDragDistance(horizontalDistanceMoved);
            }
            if (verticalDistanceMoved < 93 && verticalDistanceMoved > 0.2) {
                setVerticalDragDistance(verticalDistanceMoved);
            }
            updateLabelPosition(index);
        }
    };

    const updateLabelPosition = (index: number | null) => {
        const newLabels = labels.map((label, i) => {
            if (i === index) {
                return {
                    ...label,
                    top: `${verticalDragDistance}`,
                    left: `${dragDistance}`
                };
            }
            return label;
        });

        setLabels(newLabels);
        setTempLabels({ id, labels: newLabels, image })
    };

     const onDragEnd = () => {
        setIsDragging(false);
        setLastDragDistance(dragDistance);
        setLastVerticalDragDistance(verticalDragDistance);

        if (hoveredIndex !== null) {
            updateLabelPosition(hoveredIndex!);
        }

    };

    const clickLabel = (index: number, e: MouseEvent) => {
        if (!isPreview) {
            setHoveredIndex(hoveredIndex === index ? null : index);
        }
        if (isDragging) {
            setIsDragging(false);
            setLastDragDistance(dragDistance);
            setLastVerticalDragDistance(verticalDragDistance);
            updateLabelPosition(index);
        }
        else if (!isDragging) {
            setIsDragging(true);
            onDragStart(e);
        }
    };

    const hoverLabel = (index: number | null) => {
        if (isPreview) {
            setHoveredIndex(index);
        }
    };

    return (
        <>
            {labels.map((label: Label, i: number) => (
                <div
                    key={i}
                    style={{
                        ...styles.pointOnHover,
                        top: `${label.top}%`,
                        left: `${label.left}%`,
                        width: `${label.size}px`,
                        height: `${label.size}px`,
                        backgroundColor: `${label.labelColor}`
                    }}
                    onClick={(e) => clickLabel(i, e)}
                    onMouseMove={(e) => onDragMove(e, i)}
                    onMouseEnter={() => hoverLabel(i)}
                    onMouseLeave={onDragEnd}
                >
                    <RiAddFill style={{ fontSize: "24px" }} />
                    {hoveredIndex === i && <OnHoverSection label={label} />}
                </div>
            ))}
        </>
    );
};
export default LabelComponent
