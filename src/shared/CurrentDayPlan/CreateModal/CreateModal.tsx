import React, {useEffect, useRef, useState} from 'react';
import {Button, Modal} from "react-bootstrap";
import Select, {SingleValue} from "react-select";
import CreateModalInput from './CreateModalInput/CreateModalInput';
import FlatPickr from "react-flatpickr";
import 'flatpickr/dist/themes/material_green.css'
import moment from "moment";
import {
    addPlanWork,
    addWorkType,
    fetchWorkTypes,
    setCurrentWorkName,
    setCurrentWorkType
} from "../../../app/reducers/workSlice";
import {useAppDispatch, useAppSelector} from "../../../app/hooks/hooks";
import './CreateModal.css'
import CreatableSelect from "react-select/creatable";
import {IWorkName, IWorkType, WorkAddInterface} from '../../../app/models/IWork';
import CreateModalTraining from "./CreateModalTraining/CreateModalTraining";
import {TrainingAddInterface} from "../../../app/models/ITraining";
import {addPlanTraining, fetchPlanTraining} from "../../../app/reducers/trainingSlice";

interface CreateModalProps {
    type: "Plan" | "Fact"
    date: Date
    show: boolean,
    handleClose: () => void
}

export interface IOptions {
    value: string
    label: string
}

export interface IGroupedOptions {
    label?: string
    options: IOptions[]
}

const CreateModal: React.FC<CreateModalProps> = ({show, handleClose, date, type}) => {
    const workTypeRef = useRef(null)
    const workNameRef = useRef(null)
    const dispatch = useAppDispatch()

    const [selectLoading, setSelectLoading] = useState(false)
    const [formType, setFormType] = useState<0 | 1>(0)

    const {workTypes, currentWorkType, currentWorkName} = useAppSelector(state => state.work)
    const {currentField} = useAppSelector(state => state.fields)
    const [workType, setWorkType] = useState<IOptions | null>({value: '0', label: 'Тренировка'})

    useEffect(() => {
        if (workType && +workType.value > 0) {
            const currentType = workTypes.find(elem => {
                if (workType)
                    return elem.id === +workType.value
            })
            if (currentType)
                dispatch(setCurrentWorkType(currentType))

        } else
            dispatch(setCurrentWorkType(null))
    }, [workType])

    const formatGroupLabel = (data: IGroupedOptions) => (
        <div>
            <span>{data.label}</span>
        </div>
    );

    useEffect(() => {
        if (currentWorkType) {
            setWorkType({
                value: currentWorkType.id.toString(),
                label: currentWorkType.name
            })

        }
    }, [currentWorkType])

    //Training selection
    const [flatPickrDate, setFlatPickrDate] = useState(date)
    const [flatPickrTimeFrom, setFlatPickrTimeFrom] = useState("00:00")
    const [flatPickrTimeTo, setFlatPickrTimeTo] = useState("00:00")
    const [name, setName] = useState("")
    const [trainingType, setTrainingType] = useState("-1")

    useEffect(() => {
        if(flatPickrTimeFrom > flatPickrTimeTo)
            setFlatPickrTimeTo(flatPickrTimeFrom)
    }, [flatPickrTimeFrom])

    useEffect(() => {
        if(flatPickrTimeTo < flatPickrTimeFrom) {
            setFlatPickrTimeFrom(flatPickrTimeTo)
        }
    }, [flatPickrTimeTo])

    const TrainingTypeOptions: IOptions[] = [
        {value: '-1', label: 'Тренировка'},
        {value: '-2', label: 'Игра'},
    ]

    const options1: IOptions[] = [
        {value: '0', label: 'Тренировка'},
    ]

    const updateWorkTypesOptions = (workTypes: IWorkType[]) => {
        return workTypes.map((elem, i) => ({value: (elem.id).toString(), label: elem.name}))
    }

    let workTypesOptions: IOptions[] = updateWorkTypesOptions(workTypes)

    const [groupedOptions, setGroupedOptions] = useState<IGroupedOptions[]>([
        {
            options: options1
        },
        {
            label: 'Тип работы',
            options: workTypesOptions
        }
    ])

    useEffect(() => {
        dispatch(fetchWorkTypes())
        return function cleanUp() {
            dispatch(setCurrentWorkType(null))
        }
    }, [])

    useEffect(() => {
        setGroupedOptions([
            {
                options: options1
            },
            {
                label: 'Тип работы',
                options: updateWorkTypesOptions(workTypes)
            }
        ])
    }, [workTypes])

    const clearSelect = () => {
        setWorkType(null)
    }

    const workTypeChangeHandler = (value: SingleValue<IOptions>) => {
        if (value) {
            setWorkType(value)
            if (value.value === "0") {
                setFormType(0)
            } else {
                setFormType(1)
            }
        }
    }

    const trainingTypeChangeHandler = (value: SingleValue<IOptions>) => {
        if (value?.value)
            setTrainingType(value.value)
    }

    const InputNameChangeHandler = (value: string) => {
        setName(value)
    }

    //Work selection
    const [workNameOptions, setWorkNameOptions] = useState<IOptions[]>([])
    const [currentWorkNameOption, setCurrentWorkNameOption] = useState<IOptions | null>(null)

    const workNameChangeHandler = (value: SingleValue<IOptions>) => {
        if(value)
            setCurrentWorkNameOption(value)
    }

    useEffect(() => {
        let arrayOptions: IOptions[] = []
        if (currentWorkType?.worknames?.length) {
            arrayOptions = currentWorkType.worknames.map(elem => ({value: elem.id.toString(), label: elem.name}))
        }
        setWorkNameOptions(arrayOptions)
        setCurrentWorkNameOption(null)
    }, [currentWorkType])

    const clearWorkNameSelect = () => {
        setCurrentWorkNameOption(null)
    }

    useEffect(() => {
        let newCurrentWorkName: IWorkName | null = null
        if(currentWorkType)
            newCurrentWorkName = currentWorkType?.worknames.find(elem => elem.id.toString() === currentWorkNameOption?.value) || null
        dispatch(setCurrentWorkName(newCurrentWorkName))
    }, [currentWorkNameOption])

    //Work state
    const [amount, setAmount] = useState<number>(0)
    const [persons, setPersons] = useState<number>(0)
    const [hours, setHours] = useState<number>(0)
    const [comment, setComment] = useState("")

    useEffect(() => {
        if(!!currentWorkName?.pneed) {
            const personsAmount = currentWorkName.pneed
            setPersons(personsAmount)
        }
        if(!!currentWorkName?.hneed) {
            setHours(currentWorkName.hneed)
        }
    }, [currentWorkName])

    useEffect(() => {
        if(currentWorkType?.worknames.length) {
            dispatch(setCurrentWorkName(currentWorkType.worknames[0]))
            const newWorkNameOption = currentWorkType.worknames[0]
                setCurrentWorkNameOption({value: newWorkNameOption.id.toString(), label: newWorkNameOption.name})
        }
    }, [currentWorkType])

    //Push functions
    //ADD IF "PLAN"
    const pushTraining = () => {
        if(!flatPickrDate) return
        if(!name) return
        if(!trainingType) return;
        if(!currentField?.id) return

        const data: TrainingAddInterface = {
            date: flatPickrDate,
            start: flatPickrTimeFrom,
            end: flatPickrTimeTo,
            name: name,
            type: +trainingType * -1,
            fieldId: currentField?.id
        }
        console.log(data)
        dispatch(addPlanTraining(data)).then(() => handleClose())

        //temporarily
        dispatch(fetchPlanTraining(currentField.id))
    }

    const pushWork = () => {
        if(!date) return
        if(!workType?.value || +workType?.value <= 0) return
        if(!currentWorkName?.id) return
        if(!currentField?.id) return;

        const data: WorkAddInterface = {
            date: flatPickrDate,
            type: +workType?.value,
            name: currentWorkName?.id,
            numberOf: amount,
            peopleNeed: persons,
            hoursNeed: hours,
            comment: comment,
            fieldId: currentField?.id
        }
        console.log(data)
        dispatch(addPlanWork(data)).then(() => handleClose())

        //temporarily
        dispatch(fetchPlanTraining(currentField.id))
    }

    return (
        <Modal
            size="lg"
            show={show}
            onHide={handleClose}
        >
            <Modal.Header closeButton>
                <Modal.Title><h5 className="m-0 font-weight-bold"><i
                    className="fa fa-table"></i> Добавить в {type === 'Plan' ? "план" : "факт"}</h5></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form id="formCreate">
                    <div id="modal-body" className="modal-body">
                        <div className="item form-group">
                            <label>Выберите тип работы или тренировку</label>
                            <CreatableSelect
                                ref={workTypeRef}
                                options={groupedOptions}
                                onMenuOpen={clearSelect}
                                placeholder={"Type to search or create new"}
                                value={workType}
                                formatGroupLabel={formatGroupLabel}
                                onChange={(newValue) => workTypeChangeHandler(newValue)}
                                onCreateOption={async (inputValue) => {
                                    setSelectLoading(true)
                                    await dispatch(addWorkType(inputValue)).finally(() => {
                                        setSelectLoading(false)
                                    })
                                }}
                                isLoading={selectLoading}
                            />
                            {formType === 0 ?
                                <CreateModalTraining
                                    flatPickrDate={flatPickrDate} setFlatPickrDate={setFlatPickrDate}
                                    flatPickrTimeFrom={flatPickrTimeFrom} setFlatPickrTimeFrom={setFlatPickrTimeFrom}
                                    flatPickrTimeTo={flatPickrTimeTo} setFlatPickrTimeTo={setFlatPickrTimeTo}
                                    name={name} InputNameChangeHandler={InputNameChangeHandler}
                                    TrainingTypeOptions={TrainingTypeOptions}
                                    trainingTypeChangeHandler={trainingTypeChangeHandler}
                                />
                                : <>
                                    <div className={"mt-3"}>
                                        <label>Наименование работы</label>
                                        <Select
                                            ref={workNameRef}
                                            options={workNameOptions}
                                            value={currentWorkNameOption}
                                            onChange={(newValue) => workNameChangeHandler(newValue)}
                                            onMenuOpen={clearWorkNameSelect}
                                            placeholder={"Type to search"}
                                        />
                                    </div>
                                    <div className={"mt-3"}>
                                        <label>Дата</label>
                                        <FlatPickr
                                            options={{
                                                monthSelectorType: "static",
                                                formatDate: date1 => moment(date1).format('ddd. DD MMM YYYY')
                                            }}
                                            value={flatPickrDate}
                                            onChange={(dates) => setFlatPickrDate(dates[0])}
                                            render={({defaultValue, value, ...props}, ref) => {
                                                const date = moment(flatPickrDate).format('ddd. DD MMM YYYY')
                                                return <CreateModalInput value={date} inputRef={ref}/>
                                            }}
                                        />
                                    </div>
                                    <div className={"mt-3"}>
                                        <label>Количество</label>
                                        <CreateModalInput backend={currentWorkName?.unit || ''} toFixed={2} value={amount} min={0} onChange={(newValue) => {
                                            setAmount(+newValue)
                                        }}/>
                                    </div>
                                    <div className={"mt-3"}>
                                        <label>Сколько потребуется человек</label>
                                        <CreateModalInput value={persons} min={0} onChange={(newValue) => {
                                            setPersons(+newValue)
                                        }}/>
                                    </div>
                                    <div className={"mt-3"}>
                                        <label>Сколько потребуется часов</label>
                                        <CreateModalInput value={hours} min={0} onChange={(newValue) => {
                                            setHours(+newValue)
                                        }}/>
                                    </div>
                                    <div className={"mt-3"}>
                                        <label>Комментарий</label>
                                        <textarea className="autosize col-12 form-control MyTextArea" value={comment} onChange={(event) => setComment(event.target.value)}></textarea>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={workType?.value === "0" ? pushTraining : pushWork}>Добавить</Button>
                <Button onClick={handleClose} variant="secondary">
                    Закрыть
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateModal;