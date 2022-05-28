import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export interface EditFieldProps {
  //  setField: Function;
}

export const EditField: React.FC<EditFieldProps> = ({}) => {
  const [modalWindow, setModalWindow] = useState(false);

  useEffect(() => {
    console.log("window");
  }, []);

  return (
    <article style={{ height: "80vh" }} className="wide">
      <h4 style={{ fontSize: "24px", textAlign: "center" }}>Добавление Поля</h4>
      <div style={{ height: "100%" }}>
        <MapContainer center={[48.505, 45.09]} zoom={13}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </MapContainer>
      </div>
    </article>
  );
};

export default EditField;