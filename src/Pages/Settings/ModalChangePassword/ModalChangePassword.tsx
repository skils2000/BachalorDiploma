import React, {useState} from 'react';
import {Button} from 'react-bootstrap';
import {Modal} from "react-bootstrap";
import {useAppDispatch, useAppSelector} from "../../../app/hooks/hooks";
import {passwordChangeInterface, pushChangePassword} from "../../../app/reducers/userSlice";

interface ModalChangePasswordProps {
    show: boolean,
    handleClose: () => void
}

const ModalChangePassword: React.FC<ModalChangePasswordProps> = ({show, handleClose}) => {
    const dispatch = useAppDispatch()
    const [password, changePassword] = useState<string>('')
    const [confirmPassword, changeConfirmPassword] = useState<string>('')

    const {passwordChangeLoading} = useAppSelector(state => state.user)

    const changePasswordHandle = (value: string) => {
        changePassword(value)
        if (!value) changeConfirmPassword('')
    }

    const equalPasswords = (): boolean => {
        return password === confirmPassword && password ? true : false
    }

    const clearPasswordsState = () => {
        changePassword('')
        changeConfirmPassword('')
    }

    const pushChange = () => {
        const data: passwordChangeInterface = {
            id: 5,
            password,
            confirmPassword
        }
        dispatch(pushChangePassword(data)).then(closeModal)
    }

    const closeModal = () => {
        handleClose()
        clearPasswordsState()
    }

    return (
        <Modal
            size="lg"
            show={show}
            onHide={handleClose}
        >
            <Modal.Header closeButton>
                <Modal.Title>Смена пароля</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {passwordChangeLoading ?
                    <div>Loading...</div>
                    :
                    <>
                        <div>
                            <label>Введите новый пароль</label>
                            <input className="form-control" type="text" value={password}
                                   onChange={(event) => changePasswordHandle(event.target.value)}/>
                        </div>
                        <div style={{marginTop: '0.5rem'}}>
                            <label>Введите пароль повторно</label>
                            <input className="form-control" type="text" value={confirmPassword}
                                   onChange={(event) => changeConfirmPassword(event.target.value)}
                                   disabled={!password.trim()}/>
                        </div>
                    </>
                }
            </Modal.Body>
            {!passwordChangeLoading ?
                <Modal.Footer>
                    <Button variant="primary" onClick={pushChange} disabled={!equalPasswords()}>Сохранить</Button>
                    <Button variant="secondary" onClick={closeModal}>
                        Закрыть
                    </Button>
                </Modal.Footer>
                : ''
            }
        </Modal>
    );
};

export default ModalChangePassword;