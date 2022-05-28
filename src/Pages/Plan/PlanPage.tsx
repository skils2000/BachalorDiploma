import React, {useEffect, useState} from 'react';
import MainHeader from "../../shared/MainHeader/MainHeader";
import WeatherChart from "./WeatherChart/WeatherChart";
import '@fortawesome/fontawesome-free/css/all.css'
import classes from './Plan.module.scss'
import MyFullcalendar from "../../shared/Fullcalendar/Fullcalendar";
import CurrentDayPlan from "../../shared/CurrentDayPlan/CurrentDayPlan";
import CreateModal from "../../shared/CurrentDayPlan/CreateModal/CreateModal";
import {useAppDispatch, useAppSelector} from "../../app/hooks/hooks";
import {fetchPlanTraining} from "../../app/reducers/trainingSlice";

const PlanPage = () => {
    const [date, setDate] = useState(new Date(Date.now()))
    const [modalShow, setModalShow] = useState(false)

    const dispatch = useAppDispatch()

    const {currentField} = useAppSelector(state => state.fields)

    useEffect(() => {
        if (currentField?.id)
            dispatch(fetchPlanTraining(currentField.id))
    }, [])

    return (
        <div>
            <MainHeader title={'План'}/>
            <WeatherChart/>
            {modalShow &&
            <CreateModal type={"Plan"} date={date} show={modalShow} handleClose={() => setModalShow(false)}/>}
            <div className="row">
                <div className="col col-xl-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <MyFullcalendar date={date} setDate={setDate} type={'Plan'}/>
                            <div className="mt-3">
                                <div className="calendar-line-item d-flex align-items-center">
                                    <span className={classes.dotCalendar} style={{backgroundColor: "green"}}></span>
                                    <span className="text-dot-calendar">&nbsp;–&nbsp;Работа</span>
                                </div>
                                <div className="calendar-line-item d-flex mt-2  align-items-center">
                                    <span className={classes.dotCalendar} style={{backgroundColor: "red"}}></span>
                                    <span className="text-dot-calendar">&nbsp;–&nbsp;Тренировка</span>
                                </div>
                                <div className="calendar-line-item d-flex mt-2 align-items-center">
                                    <img src="/images/TypeFiles/image.png"
                                         style={{width: "25px", height: "25px", marginLeft: "-4px"}}/>
                                    <span className="text-dot-calendar"
                                          style={{lineHeight: "25px"}}>&nbsp;–&nbsp;Фото</span>
                                </div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6">
                    <CurrentDayPlan type={'План'} openModal={() => setModalShow(true)} date={date} setDate={setDate}
                                    thispage={true}/>
                </div>
            </div>
        </div>
    );
};

export default PlanPage;