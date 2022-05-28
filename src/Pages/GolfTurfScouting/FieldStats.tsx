import React, { useEffect, useState } from "react";
import { ReactPropTypes } from "react";
import { Field } from "./GolfTurfScouting";
import { MapContainer, TileLayer, Marker, Popup, SVGOverlay, Polygon } from "react-leaflet";
import { GTSAPIs } from "./GTSAPIs";

export interface FieldStatsProps {
  field: Field;
  date: string;
}

const purpleOptions = { color: 'purple' };

export const FieldStats: React.FC<FieldStatsProps> = ({ field, date }) => {

  const [bounds, setBounds]= useState([]);

  function getNDVI(fieldId: string, startDate: string, endDate: string) {
    GTSAPIs.getNDVI(fieldId, "2022-05-01").then((response) => {
      console.log(response);
    });
  }

  useEffect(() => {
    //getNDVI(field.id, "2022-05-01", "2022-05-08");
    if(field.id.toString()!=="1" || field.id.toString()!=="6"){
      console.log(JSON.parse(field.coordinates));
      setBounds(JSON.parse(field.coordinates));
    }
    
    
  }, [field.coordinates]);

  return (
    <section
      id="fieldInfo"
      style={{
        minWidth: "500px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        height: "calc(100% - 80px)",
      }}
    >
      <h2 style={{ fontSize: "28px", textAlign: "center" }}>
        {field.name}, {date}
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "4px",
          alignItems: "center",
        }}
      >
        <span>
          Фильтр{" "}
          <select style={{ borderRadius: "4px" }}>
            <option>NDVI</option>
          </select>
        </span>

        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/NDVI_102003.png/1280px-NDVI_102003.png?20110201153746"
          alt="NDVI legend"
          style={{ height: "40px", borderRadius: "4px" }}
        ></img>
      </div>
      <article
        style={{
          marginTop: "16px",
          height: "100%",
          paddingTop: "12px",
          borderBottomLeftRadius: "12px",
          borderBottomRightRadius: "12px",
        }}
      >
        <MapContainer
          center={[48.7, 44.51]}
          zoom={14}
          style={{
            width: "100%",
            height: "calc(100% - 0px)",
            borderBottomLeftRadius: "12px",
            borderBottomRightRadius: "12px",
          }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Polygon pathOptions={purpleOptions} positions={bounds} />
        </MapContainer>
      </article>
    </section>
  );
};

export default FieldStats;
