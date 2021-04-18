import React from "react";
import ApiCreateEstablishmentForm from "../ApiCreateEstablishmentForm";
import { Button, Modal, ModalBody } from "reactstrap";

function ModelCreateEstablishment() {
  const [modal1, setModal1] = React.useState(false);
    return (
      <>
        <i
          color="primary"
          className="mr-1"
          onClick={() => setModal1(true)}
          id="login-tooltip"
          className="fal fa-plus-square mt-1 text-white fa-lg"
        ></i>
        <p className="d-lg-none text-white d-xl-none ml-2">Crear establecimiento</p>
        <Modal isOpen={modal1} toggle={() => setModal1(false)}>
          <div className="modal-header justify-content-center">
            <button
              className="close"
              type="button"
              onClick={() => setModal1(false)}
            >
              <i className="now-ui-icons ui-1_simple-remove"></i>
            </button>
            <h4 className="title title-up">Nuevo establecimiento</h4>
          </div>
          <div class="container">
            <hr />
          </div>
          <ModalBody>
            <ApiCreateEstablishmentForm/>
          </ModalBody>
        </Modal>
      </>
    );
}

export default ModelCreateEstablishment;
