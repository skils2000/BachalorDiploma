import React, {useEffect, useRef, useState} from 'react';
import classNames from "classnames";
import classes from "./MainHeaderDropdown.module.scss";
import useOutsideClick from "../../../app/hooks/useOutsideClick";
import {useAppDispatch, useAppSelector} from "../../../app/hooks/hooks";
import {fetchFields, setActiveField} from "../../../app/reducers/fieldSlice";

const MainHeaderDropdown = () => {
    const dispatch = useAppDispatch()
    const ref = useRef<HTMLDivElement>(null!)
    const [open, setOpen] = useState(false)

    useOutsideClick(ref, () => {
        setOpen(false)
    })

    const {company} = useAppSelector(state => state.company)
    const {fields, isLoading, activeField} = useAppSelector(state => state.fields)

    useEffect(() => {
        if(company.idCompany && !fields.length)
            dispatch(fetchFields(company.idCompany))
    },[company.idCompany])

    useEffect(() => {
        if(fields.length && !activeField)
            dispatch(setActiveField(fields[0].id))
    },[fields])

    const mainButtonInner = () => {
        if(!fields.length || isLoading) {
            return 'Loading...'
        } else if(activeField) {
            return fields.find(field => field.id === activeField)?.name
        }
    }

    const setActiveFieldHandler = (id: number) => {
        dispatch(setActiveField(id))
        setOpen(false)
    }

    return (
        <div ref={ref} className="dropdown" style={{display: "inline-block", width: "220px"}}>
            <button className={classNames(classes.dropdown, "btn dropdown-toggle", {"btn-primary": open})}
                    type="button" onClick={() => setOpen(!open)}>
                {mainButtonInner()}
            </button>
            <div className="dropdown-menu" style={{width: "220px", display: open ? "block" : "none"}}>
                {fields && fields.map((elem) =>
                    <button key={elem.id} className={classNames("dropdown-item", {["active"]: activeField === elem.id})} onClick={() => setActiveFieldHandler(elem.id)}
                >{elem.name}</button>)}
            </div>
        </div>
    );
};

export default MainHeaderDropdown;