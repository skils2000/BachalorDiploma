import React from 'react';
import FlatPickr from "react-flatpickr";
import moment from "moment";
import CreateModalInput from "../CreateModalInput/CreateModalInput";
import {IOptions} from "../CreateModal";
import {SingleValue} from "react-select";

interface CreateModalTrainingProps {
    flatPickrDate: Date,
    setFlatPickrDate: React.Dispatch<React.SetStateAction<Date>>,
    flatPickrTimeFrom: string,
    setFlatPickrTimeFrom: React.Dispatch<React.SetStateAction<string>>,
    flatPickrTimeTo: string,
    setFlatPickrTimeTo: React.Dispatch<React.SetStateAction<string>>,
    name: string,
    InputNameChangeHandler: (value: string) => void,
    TrainingTypeOptions: IOptions[],
    trainingTypeChangeHandler: (value: SingleValue<IOptions>) => void,
}

const CreateModalTraining: React.FC<CreateModalTrainingProps> = ({
                                           flatPickrDate, setFlatPickrDate,
                                           flatPickrTimeFrom, setFlatPickrTimeFrom,
                                           flatPickrTimeTo, setFlatPickrTimeTo,
                                           name, InputNameChangeHandler,
                                           TrainingTypeOptions, trainingTypeChangeHandler,
                                       }) => {
    return (
        <>
            <div className={"mt-3"}>
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
            <FlatPickr
                options={{
                    enableTime: true,
                    noCalendar: true,
                    dateFormat: "H:i",
                    minuteIncrement: 1,
                    time_24hr: true
                }}
                value={flatPickrTimeFrom}
                onChange={(dates) => setFlatPickrTimeFrom(moment(dates[0]).format('HH:mm'))}
                render={({defaultValue, value, ...props}, ref) => {
                    return <CreateModalInput prepend={"от"} readOnly value={flatPickrTimeFrom}
                                             inputRef={ref}/>
                }}
            />
            <FlatPickr
                options={{
                    enableTime: true,
                    noCalendar: true,
                    dateFormat: "H:i",
                    minuteIncrement: 1,
                    time_24hr: true
                }}
                value={flatPickrTimeTo}
                onChange={(dates) => setFlatPickrTimeTo(moment(dates[0]).format('HH:mm'))}
                render={({defaultValue, value, ...props}, ref) => {
                    return <CreateModalInput prepend={"до"} readOnly value={flatPickrTimeTo}
                                             inputRef={ref}/>
                }}
            />
            <CreateModalInput prepend={'Наименование'} value={name}
                              onChange={InputNameChangeHandler}/>
            <CreateModalInput prepend={'Тип'} type={"select"} selectValue={TrainingTypeOptions}
                              selectOnChange={trainingTypeChangeHandler}/>
        </>
    );
};

export default CreateModalTraining