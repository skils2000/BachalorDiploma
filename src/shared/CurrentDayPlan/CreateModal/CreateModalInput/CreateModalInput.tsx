import React, {useRef} from 'react'
import {InputGroup} from "react-bootstrap"
import Select, {SingleValue} from "react-select"
import {IOptions} from '../CreateModal'
import classes from '../CreateModal.module.scss'

interface CreateModalInputProps {
    prepend?: string
    backend?: string
    value?: string | number
    readOnly?: boolean
    inputRef?: React.Ref<any>
    onChange?: (arg1: string) => void
    type?: "select"
    selectValue?: Array<IOptions>
    selectOnChange?: (arg1: SingleValue<IOptions>) => void
    toFixed?: number
    min?: number
}

const CreateModalInput: React.FC<CreateModalInputProps> = ({
                                                               readOnly,
                                                               prepend,
                                                               backend,
                                                               value,
                                                               inputRef,
                                                               onChange,
                                                               type,
                                                               selectValue,
                                                               selectOnChange,
                                                               toFixed, min
                                                           }) => {
    const selectRef = useRef(null)
    const inputMin = (typeof value === "number" && min !== undefined) ? min : undefined

    if (type === "select") return (
        <InputGroup className="flex-nowrap mt-3 mb-3">
            {prepend &&
            <InputGroup.Text id="basic-addon3">
                {prepend}
            </InputGroup.Text>
            }
            <Select
                ref={selectRef}
                options={selectValue}
                defaultValue={selectValue && selectValue[0]}
                placeholder={""}
                className={classes.selectItem}
                onChange={selectOnChange}
            />
        </InputGroup>
    )

    return (
        <InputGroup className="flex-nowrap mb-3">
            {prepend &&
            <InputGroup.Text id="basic-addon3">
                {prepend}
            </InputGroup.Text>
            }
            {onChange ?
                <input type={typeof value === "number" ? "number" : "text"}
                       onChange={(event) => onChange(event.target.value)} className={"form-control"} ref={inputRef}
                       value={typeof value === "number" && toFixed ? value.toFixed(toFixed) : value} min={inputMin}/>
                :
                <input className={"form-control"} ref={inputRef} readOnly={readOnly} defaultValue={value}/>
            }
            {backend &&
                    <InputGroup.Text id="basic-addon3">
                        {backend}
                    </InputGroup.Text>
            }
        </InputGroup>
    )
}

export default CreateModalInput