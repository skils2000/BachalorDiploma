import {IUser} from "../../../app/models/IUser";

export interface IFormItem {
    id: keyof IUser
    label: string
    disabled?: boolean
}