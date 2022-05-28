export interface IWork {
    id: number
    name: string
    type: string
    date: string
    numberOf: number
    unit: string
    peopleNeeded: number
    hoursNeeded: number
    comment: string
    condition: string
}

export interface IWorkType {
    id: number
    name: string
    worknames: IWorkName[]
}

export interface IWorkName {
    id: number
    name: string
    unit: string
    pneed: number
    hneed: number
}

export interface WorkAddInterface {
    date: Date,
    type: number,
    name: number,
    numberOf: number,
    peopleNeed: number,
    hoursNeed: number,
    comment: string,
    fieldId: number
}