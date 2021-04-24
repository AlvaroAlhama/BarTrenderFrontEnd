import React from "react";
import {Modal, ModalBody } from "reactstrap";
import POSTLoginForm from "../ApiLoginForm";

function ModalLogin() {
  const [modal1, setModal1] = React.useState(false);
  const [clientUserForm, setClientUserForm] = React.useState(false);
  function reportWindowSize() {
    const { innerWidth: width, innerHeight: height } = window;
    if(width < 750 && document.getElementById("logout-tooltip")!=null ){
      document.getElementById("logout-tooltip").classList.remove("mt-1");
      document.getElementById("logout-tooltip").classList.add("my-auto");
    }
    if(width > 750 && document.getElementById("logout-tooltip")!=null ){
      document.getElementById("logout-tooltip").classList.remove("my-auto");
      document.getElementById("logout-tooltip").classList.add("mt-1");
    }
  }
  reportWindowSize();
  window.addEventListener('resize', reportWindowSize);
  var token = sessionStorage.getItem("token");
  if (!token) {
    return (
      <>
        <a
          onClick={() => setModal1(true)}
          id="login-tooltip"
          className="far fa-user text-white  fa-lg mt-1"
        >
          
        </a>
        <p onClick={() => setModal1(true)} className="d-lg-none d-xl-none my-auto text-white ml-2">Inicio de Sesión</p>
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
          </ModalBody>
        </Modal>
      </>
    );
  } else {
    return (
      <>
        <i
          className="mt-1"
          id="logout-tooltip"
          onClick={() => {
            sessionStorage.clear();
            window.location.href = "/index";
          }}
          className="fal fa-power-off text-white fa-lg mt-1"
          
        />
        {/* <p className="d-lg-none d-xl-none my-auto text-white ml-2">Cerrar sesión</p> */}
        
      </>
    );
  }
}

export default ModalLogin;
