interface IFieldPosition {
    x: number,
    y: number
}

interface IFieldResponsible {
    id: number
    name: string
}

export interface IField {
    id: number,
    name: string,
    width: number,
    length: number,
    square: number,
    position: IFieldPosition,
    responsibles: IFieldResponsible[]
}