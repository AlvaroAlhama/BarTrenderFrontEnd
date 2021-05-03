import React from "react";

import { Button, Modal, ModalBody } from "reactstrap";

import ApiSignUpClientForm from "../ApiSignUpClientForm";
import ApiSignUpEstablishmentForm from "../ApiSignUpEstablishmentForm ";

function ModalSignUp() {
  const [modal1, setModal1] = React.useState(false);
  function reportWindowSize() {
    const { innerWidth: width } = window;
    if(width < 800 && document.getElementById("login-tooltip")!=null ){
      document.getElementById("register-tooltip").classList.remove("mt-1");
      document.getElementById("register-tooltip").classList.add("my-auto");
    }
    if(width > 800 && document.getElementById("login-tooltip")!=null ){
      document.getElementById("register-tooltip").classList.remove("my-auto");
      document.getElementById("register-tooltip").classList.add("mt-1");
    }
  }
  window.addEventListener('resize', reportWindowSize);
  return (
    <>
      <i
        color="primary"
        onClick={() => setModal1(true)}
        id="register-tooltip"
        className="fal fa-key text-white w-100 fa-lg mt-1"
      >
        <p className="d-lg-none d-xl-none my-auto text-white ml-2" style={{fontFamily:"Roboto", fontSize:"11.4272px", fontWeight:"400"}}>Registro</p>
      </i>
      
      <Modal isOpen={modal1} toggle={() => setModal1(false)}>
        <div className="modal-header justify-content-center">
          <button
            className="close"
            type="button"
            onClick={() => setModal1(false)}
          >
            <i className="now-ui-icons ui-1_simple-remove"></i>
          </button>
          <h4 id ="title_user" className="title title-up">Nuevo usuario</h4>
          <h4 id ="title_client"className="title title-up d-none">Nuevo cliente</h4>
          <h4 id ="title_establishment" className="title title-up d-none">Nuevo propietario</h4>
        </div>
        <div className="container" id="signUpButtons">
          <div className="row justify-content-center mb-2">
            <h3 className="my-auto">¿Qué tipo de usuario eres?</h3>
          </div>
          <div className="row text-center">
            <div className="col-6">
              <Button className="btn btn-primary"
                      onClick={() => {
                        document.getElementById("establishmentUserForm").classList.add("d-none");
                        document.getElementById("clientUserForm").classList.remove("d-none");
                        document.getElementById("signUpButtons").classList.add("d-none")
                        document.getElementById("title_user").classList.add("d-none");
                        document.getElementById("title_client").classList.remove("d-none");}}>
                <i className="fal fa-glass-cheers fa-5x w-100"></i>
              </Button>
              <h5>Cliente</h5>  
            </div>
            <div className="col-6">
              <Button className="btn btn-primary active"
                       onClick={() => {
                        document.getElementById("clientUserForm").classList.add("d-none");
                        document.getElementById("establishmentUserForm").classList.remove("d-none");
                        document.getElementById("signUpButtons").classList.add("d-none");
                        document.getElementById("title_user").classList.add("d-none");
                        document.getElementById("title_establishment").classList.remove("d-none");
                        }}>
                <i className="fal fa-store fa-5x w-100"></i>
              </Button>
              <h5>Propietario</h5>
            </div>
          </div>
        </div>
        <ModalBody>
          <div id="clientUserForm" className="d-none">
          <ApiSignUpClientForm />
          </div>
          <div id="establishmentUserForm" className="d-none">
            <ApiSignUpEstablishmentForm/>
          </div>
          
        </ModalBody>
      </Modal>
    </>
  );
}

export default ModalSignUp;
