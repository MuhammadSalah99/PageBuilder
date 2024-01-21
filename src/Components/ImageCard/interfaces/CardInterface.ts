interface CardInterface {
    id: number,
    image: string,
    title: string,
    content: string,
}

export interface TempCardInterface {
    id: number,
    cards: CardInterface[],
}

export interface EditableTextProps {
    text: string,
    onTextChange: (newText: string) => void,
    onBlur: () => void,
    style?: React.CSSProperties,
    isTextArea?: boolean,
}

export interface NavButtonStyle {
    size: string,
    backgroundColor: string,
}


export interface TempNavButtonStyle {
    id: number,
    style: NavButtonStyle
}

export interface BulletsStyle {
    activeColor: string,
    nonActiveColor: string,
}

export interface TempBulletStyle {
    id: number,
    style: BulletsStyle
}



export default CardInterface

