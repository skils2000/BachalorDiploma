import React, { useEffect, useState } from "react";
import { ReactPropTypes } from "react";
import { EditOutlined } from "@ant-design/icons";
import { Field } from "./GolfTurfScouting";
import ModalWindow from "../../Layouts/ModalWindow/ModalWindow";
import AddField from "./AddField";

export interface FieldListProps {
  fields: Array<Field>;
  selectedField: Field;
  setField: Function;
  reloadFieldsList: Function;
}

export const FieldsList: React.FC<FieldListProps> = ({
  fields,
  selectedField,
  setField,
  reloadFieldsList,
}) => {
  const [modalWindow, setModalWindow] = useState(false);

  function handleSelectChange(selectedId: string) {
    console.log(selectedId);
    for (let i = 0; i < fields.length; i++) {
      if (fields[i].id.toString() === selectedId) {
        console.log(fields[i].id);
        setField(fields[i]);
        break;
      }
    }
  }

  useEffect(() => {
    console.log(fields);
  }, []);

  return (
    <section
      id="fields"
      style={{
        marginBottom: "20px",
        padding: "4px",
        display: "flex",
        justifyContent: "space-between",
        verticalAlign: "middle",
      }}
    >
      <article
        style={{
          display: "flex",
          justifyContent: "space-between",
          verticalAlign: "middle",
        }}
      >
        <button
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "40px",
            fontSize: "24px",
            fontWeight: "bold",
            backgroundColor: "rgba(0, 104, 55, 1)",
            color: "white",
          }}
          onClick={(e) => setModalWindow(true)}
        >
          +
        </button>
        <h4
          style={{
            fontSize: "24px",
            textAlign: "center",
            marginLeft: "12px",
            marginTop: "0.25rem",
            marginBottom: "0.25rem",
          }}
        >
          Поля
        </h4>
      </article>

      <select
        style={{ width: "200px" }}
        defaultValue={selectedField.name}
        name={"selectedField"}
        onChange={(e) => handleSelectChange(e.target.value)}
      >
        {fields.map((field) => {
          return (
            <option key={field.id} value={field.id}>
              {field.name}
            </option>
          );
        })}
      </select>
      <ModalWindow active={modalWindow} setActive={setModalWindow}>
        <AddField
          setActive={setModalWindow}
          reloadFieldsList={reloadFieldsList}
        ></AddField>
      </ModalWindow>
      <EditOutlined
        onClick={(e) => setModalWindow(true)}
        style={{
          fontSize: "32px",
        }}
      ></EditOutlined>
    </section>
  );
};

export default FieldsList;
