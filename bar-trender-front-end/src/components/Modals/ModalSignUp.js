import React from "react";

import { Button, Modal, ModalBody } from "reactstrap";

import ApiSignUpClientForm from "../ApiSignUpClientForm";
import ApiSignUpEstablishmentForm from "../ApiSignUpEstablishmentForm ";

function ModalSignUp() {
  const [modal1, setModal1] = React.useState(false);
  const [establishmentUserForm, setEstablishmentUserForm] = React.useState(
    false
  );
  const [clientUserForm, setClientUserForm] = React.useState(false);

  var token = sessionStorage.getItem("token");
  var headerTitle = "Nuevo usuario"
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
          <h4 id ="title_user" className="title title-up">Nuevo usuario</h4>
          <h4 id ="title_client"className="title title-up d-none">Nuevo cliente</h4>
          <h4 id ="title_establishment" className="title title-up d-none">Nuevo propietario</h4>
        </div>
        <div class="container" id="signUpButtons">
          <div class="row justify-content-center mb-2">
            <h3 class="my-auto">¿Qué tipo de usuario eres?</h3>
          </div>
          <div class="row text-center">
            <div class="col-6">
              <Button className="btn btn-primary"
                      onClick={() => {
                        document.getElementById("establishmentUserForm").classList.add("d-none");
                        document.getElementById("clientUserForm").classList.remove("d-none");
                        document.getElementById("signUpButtons").classList.add("d-none")
                        document.getElementById("title_user").classList.add("d-none");
                        document.getElementById("title_client").classList.remove("d-none");}}>
                <i class="fal fa-glass-cheers fa-5x w-100"></i>
              </Button>
              <h5>Cliente</h5>  
            </div>
            <div class="col-6">
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
          <div id="clientUserForm" class="d-none">
          <ApiSignUpClientForm />
          </div>
          <div id="establishmentUserForm" class="d-none">
            <ApiSignUpEstablishmentForm/>
          </div>
          
        </ModalBody>
      </Modal>
    </>
  );
}

export default ModalSignUp;
