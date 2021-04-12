import React from "react";


import { Button, Modal, ModalBody } from "reactstrap";

import POSTLoginForm from "../ApiLoginForm";

function ModalLogin() {
  const [modal1, setModal1] = React.useState(false);

  var token = sessionStorage.getItem("token");
  if (!token) {
    return (
      <>
        <i
          color="primary"
          className="mr-1"
          onClick={() => setModal1(true)}
          id="login-tooltip"
          className="far fa-user fa-lg mt-1"
        ></i>
        <p className="d-lg-none d-xl-none">Inicio de Sesión</p>
        <Modal isOpen={modal1} toggle={() => setModal1(false)}>
          <div className="modal-header justify-content-center">
            <button
              className="close"
              type="button"
              onClick={() => setModal1(false)}
            >
              <i className="now-ui-icons ui-1_simple-remove"></i>
            </button>
            <h4 className="title title-up">Inicio de Sesión</h4>
          </div>
          <div class="container">
            <hr />
          </div>
          <ModalBody>
            <POSTLoginForm />
            <div class="mt-2 mb-4 text-center">
              <a href="#">¿Aún no tienes una cuenta? Regístrate</a>
            </div>
          </ModalBody>
        </Modal>
      </>
    );
  } else {
    return (
      <>
        <i
          color="primary"
          className="mt-1"
          id="logout-tooltip"
          onClick={() => {
            sessionStorage.clear();
            window.location.href = "/index";
          }}
          className="fas fa-power-off fa-lg mt-1"
          
        />
        <p className="d-lg-none d-xl-none">Cerrar sesión</p>
        
      </>
    );
  }
}

export default ModalLogin;
