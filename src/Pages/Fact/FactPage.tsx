import React, {useState} from 'react';
import MyFullcalendar from "../../shared/Fullcalendar/Fullcalendar";
import classes from "../Plan/Plan.module.scss";
import MainHeader from "../../shared/MainHeader/MainHeader";
import CurrentDayPlan from "../../shared/CurrentDayPlan/CurrentDayPlan";
import CreateModal from '../../shared/CurrentDayPlan/CreateModal/CreateModal';

const FactPage = () => {
    const [date, setDate] = useState(new Date(Date.now()))
    const [modalShow, setModalShow] = useState(false)

    return (
        <div>
            <MainHeader title={'Факт'}/>
            {modalShow &&
            <CreateModal type={"Fact"} date={date} show={modalShow} handleClose={() => setModalShow(false)}/>}
            <div className="row">
                <div className="col col-xl-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <MyFullcalendar date={date} setDate={setDate} type={'Fact'}/>
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
                    <CurrentDayPlan type={'План'} date={date} setDate={setDate}/>
                    <CurrentDayPlan type={'Факт'} date={date} setDate={setDate} thispage={true}
                                    openModal={() => setModalShow(true)}/>
                </div>
            </div>
        </div>
    );
};

export default FactPage;