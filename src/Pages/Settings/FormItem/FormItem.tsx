import React, {useState} from 'react';
import classes from "./FormItem.module.scss";
import {IFormItem} from "./IFormItem";
import ButtonGreenHover from "../../../shared/ButtonGreenHover/ButtonGreenHover";
import {useAppDispatch, useAppSelector} from "../../../app/hooks/hooks";
import {editUser} from "../../../app/reducers/userSlice";

interface FormItemProps extends IFormItem {
}

const FormItem: React.FC<FormItemProps> = ({id, label, disabled}) => {
    const {user, newUser} = useAppSelector(state => state.user)
    const {company} = useAppSelector(state => state.company)
    const [userValue, setUserValue] = useState<string>(newUser[id]?.toString() || '')
    const dispatch = useAppDispatch()

    const edit = (value: string) => {
        let requestValue: string | null = value
        if (value === '' && user[id] === null) requestValue = null
        setUserValue(value)
        dispatch(editUser({...newUser, [id]: requestValue}))
    }

    if (id === "idCompany") {
        return (
            <div className={classes.formItem}>
                <label>{label}</label>
                <input className="form-control" type="text" value={company.companyName || ''}
                       disabled={disabled}/>
            </div>
        )
    }

    return (
        <div className={classes.formItem}>
            <label>{label}</label>
            {id === "phone" ?
                <div style={{display: 'flex'}}>
                    <input className="form-control" type="text" value={userValue || ''}
                           onChange={(event) => edit(event.target.value)}
                           disabled={disabled}/>
                    <ButtonGreenHover value="Сменить"/>
                </div>
                :
                <input className="form-control" type="text" value={userValue || ''}
                       onChange={(event) => edit(event.target.value)}
                       disabled={disabled}/>
            }
        </div>
    );
};

export default FormItem;