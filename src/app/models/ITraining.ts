export interface ITraining {
    id: number
    date: string
    name: string
    type: string
    start: string
    end: string
    condition: string
}

export interface TrainingAddInterface {
    date: Date,
    start: string,
    end: string,
    name: string,
    type: number,
    fieldId: number
}