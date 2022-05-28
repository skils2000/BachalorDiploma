import React, {useEffect, useRef, useState} from 'react';
import FullCalendar, {DateSelectArg, EventClickArg} from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import bootstrapPlugin from '@fullcalendar/bootstrap';
import moment from "moment";
import './FullCalendar.scss'
import {useAppDispatch, useAppSelector} from "../../app/hooks/hooks";
import {fetchPlanTraining} from "../../app/reducers/trainingSlice";

interface MyFullcalendarProps {
    date: Date,
    setDate: (arg0: Date) => void,
    type: 'Plan' | 'Fact'
}

interface IPlanTrainingEvents {
    title: string
    date: string
}

const MyFullcalendar: React.FC<MyFullcalendarProps> = ({type, date, setDate}) => {
    const calendarRef = useRef(null)
    const dispatch = useAppDispatch()

    const selectHandler = (selectInfo: DateSelectArg) => {
        setDate(selectInfo.start)
    }

    const eventClickHandler = (clickInfo: EventClickArg) => {
        const calendarApi = clickInfo.view.calendar
        calendarApi.select(clickInfo.event.start)
    }

    const setToday = () => {
        const calendarApi = getCalendarApi()
        const dateNow = new Date(Date.now())
        calendarApi.today()
        selectCalendarDate(dateNow)
    }

    const selectCalendarDate = (date: Date) => {
        const calendarApi = getCalendarApi()
        console.log(calendarApi.view.activeStart)
        if (type === 'Fact' && date > new Date(Date.now())) {
            return
        }
        calendarApi.gotoDate(date)
        calendarApi.select(date)
    }

    const getCalendarApi = () => {
        //It is ignoring UseRef = null, this function is only for use after calendar is rendered
        //I did not find how to set initial value with FullCalendar type for it
        // @ts-ignore
        return calendarRef.current.getApi()
    }

    const incrementDate = (number: number) => {
        const incrementedDate: Date = moment(date).add(number, 'days').toDate()
        selectCalendarDate(incrementedDate)
    }

    //// Move to the planPage

    const fetchPlanTrainingByFieldId = () => {
        if (currentField)
            dispatch(fetchPlanTraining(currentField?.id))
    }

    const [planTrainingEvents, setPlanTrainingEvents] = useState<IPlanTrainingEvents[]>([])

    useEffect(() => {
        fetchPlanTrainingByFieldId()
    }, [])

    const {planTraining} = useAppSelector(state => state.training)
    const {currentField} = useAppSelector(state => state.fields)

    useEffect(() => {
        fetchPlanTrainingByFieldId()
    }, [currentField])

    useEffect(() => {
        const trainingEvents: IPlanTrainingEvents[] = planTraining.map(elem => ({
            title: elem.name,
            date: moment(elem.date).format("YYYY-MM-DD")
        }))
        setPlanTrainingEvents(trainingEvents)
    }, [planTraining, currentField])

    return (
        <>
            {/*<div style={{display: "none"}}>*/}

            {/*</div>*/}
            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, interactionPlugin, bootstrapPlugin]}
                locale={'RU'}
                initialView="dayGridMonth"
                themeSystem="bootstrap"
                eventStartEditable={false}
                editable={false}
                businessHours={true}
                selectable={true}
                unselectAuto={false}
                firstDay={1}
                select={selectHandler}
                eventClick={eventClickHandler}
                validRange={
                    type === 'Fact' ?
                        {
                            end: new Date(Date.now())
                        } :
                        {}
                }
                // events={[
                //     {title: 'event 1', date: '2021-10-30'},
                //     {title: 'event 2', date: '2021-10-30'},
                // ]}
                events={planTrainingEvents}
                eventContent={(event) => <span className="dot-calendar ml-1"
                                               style={{backgroundColor: 'green'}}></span>}
                eventDisplay={'list-item'}
                dayMaxEvents={2}
                customButtons={{
                    myCustomButton: {
                        text: moment(date).format('ddd. DD MMM YYYY'),
                        click: () => {
                            console.log('this is custom')
                        }
                    },
                    customTodayButton: {
                        text: 'Сегодня',
                        click: () => {
                            setToday()
                        }
                    },
                    customDayDecrementButton: {
                        text: '',
                        click: () => {
                            incrementDate(-1)
                        }
                    },
                    customDayIncrementButton: {
                        text: '',
                        click: () => {
                            incrementDate(1)
                        }
                    }
                }}
                headerToolbar={{
                    left: 'title,prev,customDayDecrementButton,myCustomButton,customDayIncrementButton,next',
                    center: '',
                    right: 'customTodayButton'
                    // right: 'month,listWeek '//'month,agendaWeek,listWeek,agendaDay'
                }}
                bootstrapFontAwesome={{
                    prev: 'fa-angle-double-left',
                    next: 'fa-angle-double-right',
                    customDayDecrementButton: 'fa-chevron-left',
                    customDayIncrementButton: 'fa-chevron-right'
                }}
                // eventContent={<div style={}>123</div>}

                longPressDelay={1}
                selectLongPressDelay={1}
            />
        </>
    )
        ;
};

export default MyFullcalendar;