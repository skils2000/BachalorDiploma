import React, { useEffect, useState } from "react";
import { ReactPropTypes } from "react";
import ModalWindow from "../../../Layouts/ModalWindow/ModalWindow";
import { Form, Button, Image } from "react-bootstrap";
import { NDVIAPIs } from "./NDVIAPIs";
import { Buffer } from "buffer";

export default function NDVIField(props) {
  const [modalWindow, setModalWindow] = useState(false);
  const [NDVIsrc, setNDFIsrc] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filterValue, setFilterValue] = useState("Map");

  function onSubmit() {
    console.log("click");
    console.log(props.field.id, startDate, endDate);

    NDVIAPIs.postColorNDVI({
      id_field: props.field.id,
      startdate: startDate,
      enddate: endDate,
    })
      .then((response) => {
        console.log(response.data);

        setNDFIsrc(response.data);
        setModalWindow(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div
      style={{
        height: "calc(100% - 60px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        marginRight: "20px",
        marginTop: "20px",
      }}
    >
      <button
        style={{
          borderRadius: "12px",
          minWidth: "320px",
          height: "44px",
          fontSize: "20px",
          fontWeight: "bold",
          backgroundColor: "rgba(0, 104, 55, 1)",
          color: "white",
          padding: "4px 16px 4px 20px",
          marginBottom: "16px",
        }}
        onClick={(e) => setModalWindow(true)}
      >
        Ввести период для фильтра
      </button>

      <ModalWindow active={modalWindow} setActive={setModalWindow}>
        <div
          style={{ fontWeight: "700", fontFamily: "Roboto", width: "400px" }}
        >
          <p
            style={{
              fontSize: "24px",
              lineHeight: "28px",
              marginBottom: "16px",
            }}
          >
            Ввод временного интервала
          </p>
          <Form.Group>
            <Form.Label style={{ marginBottom: "0px" }}>
              Дата начала интервала
            </Form.Label>
            <Form.Control
              value={startDate}
              type="date"
              name="startDate"
              onChange={(e) => setStartDate(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label style={{ marginBottom: "0px" }}>
              Дата окончания интервала
            </Form.Label>
            <Form.Control
              value={endDate}
              name="endDate"
              type="date"
              onChange={(e) => setEndDate(e.target.value)}
            ></Form.Control>
          </Form.Group>
          Фильтр{" "}
          <select
            style={{ borderRadius: "4px" }}
            onChange={(e) => {
              console.log(e.target.value);
              setFilterValue(e.target.value);
            }}
          >
            <option value={"Map"}>Карта</option>
            <option value={"NDVI"}>NDVI</option>
          </select>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row-reverse",
              alignItems: "center",
            }}
          ></div>
          
          <span className="modalButton">
            <Button
              className="modalButton MainText"
              style={{}}
              onClick={() => onSubmit()}
            >
              Получить изображение
            </Button>
          </span>
          <span className="modalButton" style={{ marginLeft: "10px" }}>
            <Button className="modalButton MainText" style={{}}>
              Отмена
            </Button>
          </span>
        </div>
      </ModalWindow>
      {NDVIsrc !== null && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
          }}
        >
          <img
            //src={`data:image/jpeg;base64,${NDVIsrc}`}
            src={`./images/${NDVIsrc}/response.png`}
            style={{ height: "90%", maxHeight: "calc(100vh - 480px)" }}
          ></img>
          <img
            src="./images/NDVI.png"
            //src='https://downloader.disk.yandex.ru/preview/9ceec8b272376bb23616716c92cd714af1716a965d2d852cbea73fa9e5bb37a0/62adf8b2/k9dD9Fv_w8vRbAX_dqWLyiuz23rlH2FjvyCCy_FelL92G8BNtPRQaGaUf_zwgzko3HitkZJCR2uCpsuCOWjJZQ%3D%3D?uid=0&filename=1280px-NDVI_102003%20%282%29.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=0&tknv=v2&size=2048x2048'
            alt="NDVI legend"
            style={{ height: "40px", borderRadius: "4px" }}
          ></img>
        </div>
      )}
    </div>
  );
}
