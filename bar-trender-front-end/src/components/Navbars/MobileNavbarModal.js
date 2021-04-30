import React, { useEffect, useState} from "react";
import Modal from "react-bootstrap/Modal";


function MobileNavbarModal() {
  return(
        <Modal >
          <div className="modal-header justify-content-center">
            <button
              className="close"
              type="button"
              onClick={"/admin"}
            >
              <i className="now-ui-icons ui-1_simple-remove"></i>
            </button>
            <h4 className="title title-up">¡ÉXITO!</h4>
          </div>
        </Modal>
  );
}export default MobileNavbarModal