import React from 'react';
import moment from "moment";
import 'moment/locale/ru'
import classes from "./CurrentDayPlan.module.scss"

interface CurrentDayPlanProps {
    type: 'План' | 'Факт'
    date: Date
    setDate: (arg0: Date) => void
    openModal?: () => void
    thispage?: boolean
}

const CurrentDayPlan: React.FC<CurrentDayPlanProps> = ({type, date, setDate, openModal, thispage}) => {
    return (
        <div className="card shadow mb-4">
            <div>
                <div id="plan-tables">
                    <div
                        className="card-header card-header py-3 d-flex flex-row align-items-center justify-content-between"
                        style={{fontSize: '1rem'}}>
                        <div className="d-flex justify-content-between">
                            <div className="d-flex align-items-center">
                                {thispage &&
                                <button onClick={openModal} className={classes.plusBtn}><i className={"fas fa fa-plus"}></i></button>}
                                <i className={"fa fa-table"}></i>
                                <h6 className="m-0 line-height-30 ml-1 mr-2">{type}</h6>
                                <h6 id="planDate"
                                    className="my-0 line-height-30">{moment(date).locale('ru').format('ddd. DD MMM YYYY')}</h6>
                            </div>
                        </div>
                        {thispage &&
                        <div className="d-flex align-items-center">
                            <button
                                className="btn btn-sm p4px10px btn-circle mr-1 btn-default gray-hover">
                                <i className="fas fa-search"></i>
                            </button>
                            <h6
                                className="m-0 line-height-30 pointer">Поиск работ</h6>
                        </div>
                        }
                    </div>
                </div>
            </div>
            <div id="trainsPartial">
                <div className="card-body pt-1 pb-0" style={{maxHeight: "400px", overflowY: "auto"}}>
                    <div id="planTrainsTablePartial_wrapper"
                         className="dataTables_wrapper dt-bootstrap4 no-footer">
                        <div className="row">
                            <div className="col-sm-12 col-md-6"></div>
                            <div className="col-sm-12 col-md-6"></div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <table id="planTrainsTablePartial"
                                       className="table table-sm display no-wrap table-hover dataTable no-footer dtr-inline collapsed"
                                       width="100%" role="grid"
                                       style={{width: "100%", marginTop: '0.4rem', borderBottom: 'none'}}>
                                    <thead style={{whiteSpace: "nowrap"}}>
                                    <tr role="row">
                                        <th className="sorting" style={{width: "70.2px"}}>
                                            Начало
                                        </th>
                                        <th className="sorting" style={{width: "58.2px"}}>
                                            Конец
                                        </th>
                                        <th className="sorting" style={{width: "140.2px"}}>
                                            Наименование
                                        </th>
                                        <th className="sorting" style={{width: "34.2px"}}>
                                            Тип
                                        </th>
                                        <th className="text-center sorting_disabled"
                                            style={{width: "0.2px", display: "none"}}
                                        ></th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    <tr>
                                        <td valign={"top"} align={"center"} colSpan={4}
                                            className={classes.dataTables_empty}>Отсутствуют тренировки
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12 col-md-5"></div>
                            <div className="col-sm-12 col-md-7"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="trainsPartial">
                <div className="card-body pt-1 pb-0" style={{maxHeight: "400px", overflowY: "auto"}}>
                    <div id="planTrainsTablePartial_wrapper"
                         className="dataTables_wrapper dt-bootstrap4 no-footer">
                        <div className="row">
                            <div className="col-sm-12 col-md-6"></div>
                            <div className="col-sm-12 col-md-6"></div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <table id="planTrainsTablePartial"
                                       className="table table-sm display no-wrap table-hover dataTable no-footer dtr-inline collapsed"
                                       width="100%" role="grid" style={{
                                    width: "100%",
                                    marginTop: '0.4rem',
                                    paddingBottom: "0.6rem",
                                    borderBottom: 'none'
                                }}>
                                    <thead style={{whiteSpace: "nowrap"}}>
                                    <tr role="row">
                                        <th className="sorting">
                                            Наименование работ
                                        </th>
                                        <th className="sorting">
                                            Количество
                                        </th>
                                        <th className="sorting">
                                            Тип работы
                                        </th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    <tr>
                                        <td valign={"top"} align={"center"} colSpan={3}
                                            className={classes.dataTables_empty}>Отсутствуют работы
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12 col-md-5"></div>
                            <div className="col-sm-12 col-md-7"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurrentDayPlan;