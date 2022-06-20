import React, { useEffect, useState } from "react";
import { ReactPropTypes } from "react";
import { Field } from "./GolfTurfScouting";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  SVGOverlay,
  Polygon,
} from "react-leaflet";
import { GTSAPIs } from "./GTSAPIs";
import CustomMap from "./CustomMap";
import NDVIField from "./Components/NDVIField";

export interface FieldStatsProps {
  field: Field;
}

const purpleOptions = { color: "purple" };

export const FieldStats: React.FC<FieldStatsProps> = ({ field }) => {
  const [date, setDate] = useState("");
  useEffect(() => {
    //getNDVI(field.id, "2022-05-01", "2022-05-08");
  }, [field.coordinates]);

  return (
    <section
      id="fieldInfo"
      style={{
        minWidth: "500px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        minHeight: "calc(100% - 80px)",
        padding: "20px",
      }}
    >
      <h2 style={{ fontSize: "28px", textAlign: "center" }}>
        {field.name}
        {date !== "" && <span>, {date}</span>}
      </h2>

      <article
        style={{
          marginTop: "8px",
          height: "100%",
          //paddingTop: "12px",
          borderBottomLeftRadius: "12px",
          display: "flex",
          flexDirection: "row-reverse",
          borderBottomRightRadius: "12px",
        }}
      >
        <CustomMap field={field}></CustomMap>
        <NDVIField field={field}></NDVIField>
      </article>
    </section>
  );
};

export default FieldStats;
