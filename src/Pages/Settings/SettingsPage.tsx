import React, {useState} from 'react';
import classes from './SettingsPage.module.scss'
import FormItem from "./FormItem/FormItem";
import {IFormItem} from "./FormItem/IFormItem";
import ButtonGreenHover from "../../shared/ButtonGreenHover/ButtonGreenHover";
import {
    faKey
} from '@fortawesome/free-solid-svg-icons';
import {useAppDispatch, useAppSelector} from "../../app/hooks/hooks";
import {pushEditUser} from "../../app/reducers/userSlice";
import ModalChangePassword from "./ModalChangePassword/ModalChangePassword";

const SettingsPage = () => {
    const dispatch = useAppDispatch()

    const [passwordModalShow, setPasswordModalShow] = useState<boolean>(false)
    const [page, setPage] = useState(1)
    const {isLoading, user, newUser} = useAppSelector(state => state.user)
    const company = useAppSelector(state => state.company)

    const formItems: Array<IFormItem> = [
        {id: 'idCompany', label: 'Организация', disabled: true},
        {id: 'secondName', label: 'Фамилия', disabled: false},
        {id: 'firstName', label: 'Имя', disabled: false},
        {id: 'patronymic', label: 'Отчество', disabled: false},
        {id: 'email', label: 'Почта', disabled: true},
        {id: 'phone', label: 'Телефон', disabled: true},
    ]

    const pushEdit = () => {
        if (JSON.stringify(user) !== JSON.stringify(newUser)) {
            console.log(JSON.stringify(user), JSON.stringify(newUser))
                dispatch(pushEditUser(newUser))
            } else {
                console.log('Nothing to push')
            }
        }

        const handlePasswordModalClose = () => {
            setPasswordModalShow(false)
        }

        return (
            <div>
                <ul className={classes.settingsNav}>
                    <li>
                        <button onClick={() => setPage(1)}
                                className={page === 1 ? classes.active : classes.nonactive}>Профиль
                        </button>
                    </li>
                    <li>
                        <button onClick={() => setPage(2)}
                                className={page === 2 ? classes.active : classes.nonactive}>Язык
                        </button>
                    </li>
                </ul>
                {isLoading || (!company.company.companyName && !company.error) ?
                    <div>Loading...</div>
                    :
                    <>
                        <div className={classes.formsBlock}>
                            {formItems.map((elem, i) =>
                                <FormItem key={i} id={elem.id} label={elem.label}
                                          disabled={elem.disabled}/>
                            )}
                        </div>
                        <ul className={classes.formButtons}>
                            <li><ButtonGreenHover onClick={pushEdit} value="Сохранить"/></li>
                            <li style={{marginLeft: "0.3rem"}}><ButtonGreenHover
                                onClick={() => setPasswordModalShow(true)}
                            value=" Изменить пароль"
                            specificColour="#B9B6B6"
                            icon={faKey}/></li>
                    </ul>
                </>
            }
            <ModalChangePassword handleClose={handlePasswordModalClose} show={passwordModalShow}/>
        </div>
    );
};

export default SettingsPage;