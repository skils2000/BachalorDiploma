import React, { useEffect, useState } from "react";
import FieldsList from "./FieldsList";
import FieldStats from "./FieldStats";
import { GTSAPIs } from "./GTSAPIs";
import "./MapPage.css";

export interface Field {
  name: string;
  id: string;
  coordinates: string;
}

export default function Connector() {
  const [fields, setFields] = useState<Field[]>([
    {
      name: "Камыши Мокрой Мечётки",
      coordinates:
        '[{"lat":48.81220899110572,"lng":44.60187927909636},{"lat":48.81034420459643,"lng":44.60108564460563},{"lat":48.809849741995016,"lng":44.60415293466438},{"lat":48.81081040772588,"lng":44.60930083406367},{"lat":48.81321199152766,"lng":44.60844285083044},{"lat":48.81199708704074,"lng":44.6046677246043}]',
      id: "13",
    },
    {
      name: "Мамаев Курган",
      coordinates:
        '[{"lat":48.75092132592744,"lng":44.529691781836576},{"lat":48.744579084476335,"lng":44.52694624634554},{"lat":48.73936878731905,"lng":44.53037816570936},{"lat":48.73438451940792,"lng":44.532094125391254},{"lat":48.734157950033484,"lng":44.53655562056424},{"lat":48.74140766357473,"lng":44.54136030767358},{"lat":48.745711686300126,"lng":44.540673923800796}]',
      id: "7",
    },
  ]);
  const [field, setField] = useState<Field>({
    name: "Камыши Мокрой Мечётки",
    coordinates:
      '[{"lat":48.81220899110572,"lng":44.60187927909636},{"lat":48.81034420459643,"lng":44.60108564460563},{"lat":48.809849741995016,"lng":44.60415293466438},{"lat":48.81081040772588,"lng":44.60930083406367},{"lat":48.81321199152766,"lng":44.60844285083044},{"lat":48.81199708704074,"lng":44.6046677246043}]',
    id: "13",
  });
  const [date, setDate] = useState("6 мая");

  function getUserFields() {
    GTSAPIs.getFields(1).then((response) => {
      console.log(response.data);
      setFields(response.data);
      console.log(JSON.parse(response.data[2].coordinates));

      //if (response.data.length)
      //setField(response.data[0]);
    });
  }

  useEffect(() => {
    getUserFields();
  }, []);

  return (
    <div className="golfTurfScoutingModule">
      <FieldsList
        fields={fields}
        selectedField={field}
        setField={setField}
        reloadFieldsList={getUserFields}
      />
      <FieldStats field={field} date={date}></FieldStats>
    </div>
  );
}
