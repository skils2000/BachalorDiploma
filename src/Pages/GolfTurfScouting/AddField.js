import React, { useEffect, useState, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  useMapEvents,
  FeatureGroup,
} from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { EditControl } from "react-leaflet-draw";
import { GTSAPIs } from "./GTSAPIs";

//export interface AddFieldProps {
//  setField: Function;
//}

export const AddField = (props) => {
  const [positions, setPositions] = useState([]);
  const [fieldName, setFieldName] = useState("");
  const [center, setCenter] = useState({ lat: 24.4539, lng: 54.3773 });
  const [mapLayers, setMapLayers] = useState([]);

  const ZOOM_LEVEL = 12;
  const mapRef = useRef();

  const _onCreate = (e) => {
    console.log(e);

    const { layerType, layer } = e;
    if (layerType === "polygon") {
      const { _leaflet_id } = layer;

      setMapLayers((layers) => [
        ...layers,
        { id: _leaflet_id, latlngs: layer.getLatLngs()[0] },
      ]);
    }
  };

  const _onEdited = (e) => {
    console.log(e);
    const {
      layers: { _layers },
    } = e;

    Object.values(_layers).map(({ _leaflet_id, editing }) => {
      setMapLayers((layers) =>
        layers.map((l) =>
          l.id === _leaflet_id
            ? { ...l, latlngs: { ...editing.latlngs[0] } }
            : l
        )
      );
    });
  };

  const _onDeleted = (e) => {
    console.log(e);
    const {
      layers: { _layers },
    } = e;

    Object.values(_layers).map(({ _leaflet_id }) => {
      setMapLayers((layers) => layers.filter((l) => l.id !== _leaflet_id));
    });
  };

  function addField() {
    GTSAPIs.postField({
      id_user: 1,
      field: {
        name: fieldName,
        coordinates: JSON.stringify(mapLayers[0].latlngs),
      },
    }).then((response) => {
      props.reloadFieldsList();
      props.setActive(false);
    });
  }

  function onSaveButton() {
    console.log(mapLayers);
    addField();
  }

  useEffect(() => {
    //  console.log("window");
  }, []);

  /*
  function LocationMarker() {
    const [position, setPosition] = useState < LatLngExpression > [0, 0];
    const map = useMapEvents({
      click(e) {
        console.log(e);
        map.locate();
      },
      locationfound(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    );
  }
  */

  return (
    <article style={{ height: "80vh", width: "1000px" }}>
      <h4 style={{ fontSize: "24px", textAlign: "center" }}>Добавление Поля</h4>
      <div style={{ display: "flex", height: "calc(100% - 4px)" }}>
        <div style={{ width: "260px", marginRight: "8px" }}>
          <Form.Group>
            <Form.Label style={{ marginBottom: "0px" }}>
              Название поля
            </Form.Label>
            <Form.Control
              value={fieldName}
              name="fieldName"
              onChange={(e) => setFieldName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <span className="modalButton">
            <Button
              className="modalButton MainText"
              style={{}}
              onClick={() => onSaveButton()}
            >
              Сохранить
            </Button>
          </span>
          <span className="modalButton" style={{ marginLeft: "10px" }}>
            <Button className="modalButton MainText" style={{}}>
              Отмена
            </Button>
          </span>
        </div>
        <article
          style={{
            width: "100%",
            //marginTop: "16px",
            height: "100%",
            //paddingTop: "12px",
            borderBottomLeftRadius: "12px",
            borderBottomRightRadius: "12px",
          }}
        >
          <MapContainer
            center={[48.7, 44.51]}
            zoom={12}
            style={{
              width: "100%",
              height: "calc(100% - 30px)",
              borderRadius: "12px",
            }}
          >
            <FeatureGroup>
              <EditControl
                position="topright"
                onCreated={_onCreate}
                onEdited={_onEdited}
                onDeleted={_onDeleted}
                draw={{
                  rectangle: false,
                  polyline: false,
                  circle: false,
                  circlemarker: false,
                  marker: false,
                }}
              />
            </FeatureGroup>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {
              //<LocationMarker></LocationMarker>
            }
          </MapContainer>
        </article>
      </div>
    </article>
  );
};

export default AddField;
