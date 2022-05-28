export interface IUser {
    idUser: number
    firstName: string
    secondName: string
    patronymic: string | null
    email: string
    phone: string | null
    idCompany: number | null
    idRole: number | null
}