import React from "react";
import "./ModalWindow.css";
import { CloseOutlined } from "@ant-design/icons";

const ModalWindow = ({ active, setActive, children }) => {
  if (active) {
    return (
      <div
        className={active ? "modal active" : "modal"}
        onClick={() => setActive(false)}
      >
        <div className="modal__content" onClick={(e) => e.stopPropagation()}>
          <a className="icnClose" onClick={() => setActive(false)}>
            <CloseOutlined className="icnClose" />
          </a>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      className={active ? "modal active" : "modal"}
      onClick={() => setActive(false)}
    ></div>
  );
};

export default ModalWindow;
