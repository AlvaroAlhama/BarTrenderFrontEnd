import React from "react";

import { Button, Modal, ModalBody } from "reactstrap";

import ApiSignUpClientForm from "../ApiSignUpClientForm";

function ModalSignUpClient() {
  const [modal1, setModal1] = React.useState(false);

  var token = sessionStorage.getItem("token");
    return (
      <>
        <i
          color="primary"
          className="mr-1"
          onClick={() => setModal1(true)}
          id="login-tooltip"
          className="fal fa-key w-100 fa-lg mt-1"
        ></i>

        <p className="d-lg-none d-xl-none">Regitstro</p>
        <Modal isOpen={modal1} toggle={() => setModal1(false)}>
          <div className="modal-header justify-content-center">
            <button
              className="close"
              type="button"
              onClick={() => setModal1(false)}
            >
              <i className="now-ui-icons ui-1_simple-remove"></i>
            </button>
            <h4 className="title title-up">Registro para clientes </h4>
          </div>
          <div class="container">
            <hr />
          </div>
          <ModalBody>
            <ApiSignUpClientForm />
            <div class="mt-2 mb-4 text-center">
              <a href="#">¿Aún no tienes una cuenta? Regístrate</a>
            </div>
          </ModalBody>
        </Modal>
      </>
    );
}

export default ModalSignUpClient;
