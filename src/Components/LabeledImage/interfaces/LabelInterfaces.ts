interface Label {
    id: number,
    top: string,
    left: string,
    size: string,
    title: string,
    desc: string,
    buttonTitle: string,
    buttonLink: string,
    dialougeColor: string,
    dialougeOpacity: number,
    labelColor: string,
    dialougeWidth: string,
    dialougeHeight: string

}

export interface TempLabels {
    id: number,
    labels: Label[],
    image: string

}



export default Label

