import React, { useEffect, useState, useMemo } from "react";
import { ReactPropTypes } from "react";
import { Field } from "./GolfTurfScouting";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  SVGOverlay,
  Polygon,
  useMapEvents,
  useMap,
} from "react-leaflet";
import { GTSAPIs } from "./GTSAPIs";

const purpleOptions = { color: "purple" };

export const CustomMap = ({ field }) => {
  const [bounds, setBounds] = useState([]);
  const [centerPosition, setCenterPosition] = useState([48.7, 44.51]);

  function getNDVI(fieldId, startDate, endDate) {
    GTSAPIs.getNDVI(fieldId, "2022-05-01").then((response) => {
      console.log(response);
    });
  }

  function SetViewOnChange (coord){
    let coordinate =[]
    console.log(coord.coord);
    if (coord.length!==0){
      coordinate.push(coord.coord[0].lat)
      coordinate.push(coord.coord[0].lng)
    }
    console.log(coordinate);

    const map = useMap()
    map.setView(coordinate, map.getZoom())

    return null
  }

  useEffect(() => {
    //getNDVI(field.id, "2022-05-01", "2022-05-08");
    if (field.id.toString() !== "1" || field.id.toString() !== "6") {
        let coords = JSON.parse(field.coordinates)
      console.log(coords);
      setBounds(coords);
      setCenterPosition([coords[0].lat, coords[0].lng]);
      console.log(coords[0]);
    }
    /*
    const { current = {} } = mapRef;
    const { leafletElement: map } = current;

    if ( !map ) return;

    setTimeout(() => {
      map.flyTo(JSON.parse(field.coordinates)[0], 14, {
        duration: 3
      });
    }, 1000)
    */
  }, [field.coordinates]);

  const displayMap = useMemo(
    () => (
      <MapContainer
        center={centerPosition}
        zoom={14}
        style={{
          width: "100%",
          height: "calc(100vh - 300px)",
          borderBottomLeftRadius: "12px",
          borderBottomRightRadius: "12px",
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Polygon pathOptions={purpleOptions} positions={bounds} />

        <SetViewOnChange coord={bounds}/>

        
      </MapContainer>
    ),
    [bounds]
  );

  return <>{displayMap}</>;
};

export default CustomMap;
