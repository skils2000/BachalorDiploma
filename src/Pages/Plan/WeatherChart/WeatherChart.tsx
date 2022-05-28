import {Chart, registerables} from 'chart.js';
import React, {useEffect, useRef} from 'react';

Chart.register(...registerables);

const WeatherChart = () => {
    const ref = useRef<HTMLCanvasElement>(null!)

    useEffect(() => {
        const ctx = ref.current?.getContext("2d")
        const labels = [
            "0:00",
            "1:00",
            "2:00",
            "3:00",
            "4:00",
            "5:00",
            "6:00",
            "7:00",
            "8:00",
            "9:00",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
            "18:00",
            "19:00",
            "20:00",
            "21:00",
            "22:00",
            "23:00"
        ]

        if (ctx)
            new Chart(ctx, {
                type: "line",
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: "Температура, °C",
                            data: [
                                19.29,
                                18.22,
                                17.28,
                                16.34,
                                15.34,
                                14.43,
                                14.79,
                                16.86,
                                19.48,
                                21.91,
                                23.92,
                                25.44,
                                26.42,
                                27.11,
                                27.58,
                                27.52,
                                26.95,
                                26.06,
                                24.44,
                                22.08,
                                19.87,
                                18.06,
                                16.41,
                                15.08
                            ],
                            borderColor: 'rgb(1, 154, 3)',
                            backgroundColor: "rgba(1, 154, 3, 0.1)",
                        }, {
                            label: "Вероятность осадков, %",
                            data: [
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0
                            ],
                            borderColor: 'rgb(76, 68, 50)',
                            fill: false,
                            tension: 0.4
                        }, {
                            label: "Кол-во осадков, мм",
                            data: [
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0
                            ],
                            borderColor: "rgb(185, 182, 182)",
                            fill: false
                        }, {
                            label: "Скорость ветра",
                            data: [
                                4.75,
                                4.83,
                                4.89,
                                4.83,
                                4.61,
                                4.36,
                                4.59,
                                5.11,
                                5.19,
                                5.05,
                                5.19,
                                5.4,
                                5.54,
                                5.82,
                                6.03,
                                6.11,
                                6.37,
                                6.72,
                                7.64,
                                8.94,
                                9.99,
                                10.35,
                                9.88,
                                9.23
                            ],
                            borderColor: "rgb(0, 104, 55)"
                        }
                    ]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: false,
                            text: 'Chart.js Line Chart - Cubic interpolation mode'
                        },
                    },
                    interaction: {
                        intersect: false,
                    },
                    scales: {
                        x: {
                            display: true,
                        },
                        y: {
                            display: true,
                            suggestedMin: 0,
                            suggestedMax: 35
                        },
                    }
                },
            })
    }, [])

    return (
        // <div>
        //     <canvas style={{maxHeight: "300px", height: "250px"}} ref={ref} id="weatherChart"></canvas>
        // </div>
        <div className="card shadow mb-4">
            <div className="card-header card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold"><i className="fas fa-chart-line"></i>Погода</h6>
            </div>
            <div className="card-body col-12">
                <canvas ref={ref} id="tempChart" style={{maxHeight: "300px", height: "250px"}}></canvas>
            </div>
        </div>
    );
};

export default WeatherChart;