import React from "react";

const Modal = ({ show, handleClose, width = "640px", children }) => {
  return (
    <div className={show ? "modal is-active" : "modal"}>
      <div className="modal-background" onClick={handleClose}></div>
      <div className="modal-content" style={{ maxWidth: width }}>
        {show && children}
      </div>
      <button
        onClick={handleClose}
        className="modal-close is-large"
        aria-label="close"
      ></button>
    </div>
  );
};

export default Modal;
