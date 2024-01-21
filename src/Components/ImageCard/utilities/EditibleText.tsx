import { useState, useEffect } from 'react'
import { EditableTextProps } from '../interfaces/CardInterface'
import styles from '../styles/ImageCardFormStyles';

const EditableText: React.FC<EditableTextProps> = ({ text, onTextChange, style, isTextArea = false, onBlur }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editableText, setEditableText] = useState(text);

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (editableText.length > 300) {
            return;
        }

        setEditableText(event.target.value);
    };

    const handleBlur = () => {
        setIsEditing(false);
        onTextChange(editableText);
        onBlur();
    };

    useEffect(() => {
        setEditableText(text);
    }, [text]);


    return isEditing ? (
        isTextArea ? (
            <textarea
                value={editableText}
                onChange={handleTextChange}
                onBlur={handleBlur}
                autoFocus
                style={{ ...style, resize: 'vertical' }}
                rows={3}
                maxLength={300}
            />
        ) : (
            <input
                type="text"
                value={editableText}
                onChange={handleTextChange}
                onBlur={handleBlur}
                autoFocus
                style={style}
            />
        )
    ) : (
        <span onClick={() => setIsEditing(true)} style={style}>{text}</span>
    );
};

export default EditableText;
