import React from "react";
import ApiCreateEstablishmentForm from "../ApiCreateEstablishmentForm";
import { Button, Modal, ModalBody } from "reactstrap";

function ModelCreateEstablishment() {
  const [modal1, setModal1] = React.useState(false);
  function reportWindowSize() {
    const { innerWidth: width, innerHeight: height } = window;
    if(width < 750 && document.getElementById("create-tooltip")!=null ){
      document.getElementById("create-tooltip").classList.remove("mt-1");
      document.getElementById("create-tooltip").classList.add("my-auto");
    }
    if(width > 750 && document.getElementById("create-tooltip")!=null ){
      document.getElementById("create-tooltip").classList.remove("my-auto");
      document.getElementById("create-tooltip").classList.add("mt-1");
    }
  }
  reportWindowSize();
  window.addEventListener('resize', reportWindowSize);
    return (
      <>
        <i
          color="primary"
          className="mr-1"
          onClick={() => setModal1(true)}
          id="create-tooltip"
          className="fal fa-plus-square mt-1 text-white fa-lg"
        ></i>
        {/* <p className="d-lg-none text-white d-xl-none ml-2">Crear establecimiento</p> */}
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
