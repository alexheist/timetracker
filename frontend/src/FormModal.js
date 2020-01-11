import React from "react";

const FormModal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button className="closeBtn" type="button" onClick={handleClose}>
          &times;
        </button>
      </section>
    </div>
  );
};

export default FormModal;
