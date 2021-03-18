import React from "react";

import {
  Modal,
  ModalBody,
} from "reactstrap";

import POSTLoginForm from "./ApiLoginForm";

function ModalLogin() {
  const [modal1, setModal1] = React.useState(false);

  return (
    <>
      <i color="primary"
        className="mr-1"
        onClick={() => setModal1(true)}

        Buscar por filtros className="now-ui-icons users_single-02"></i>

      <Modal isOpen={modal1} toggle={() => setModal1(false)}>
        <div className="modal-header justify-content-center">
          <button
            className="close"
            type="button"
            onClick={() => setModal1(false)}
          >
            <i className="now-ui-icons ui-1_simple-remove" alt=""></i>
          </button>
          <h4 className="title title-up">Inicio de Sesión</h4>
        </div>
        <div class="container">
          <hr />
        </div>
        <ModalBody>
          <POSTLoginForm />
          <div class="mt-2 mb-4 text-center">
            <a href="/index" >¿Aún no tienes una cuenta? Regístrate</a>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

export default ModalLogin;
