import React from "react";

import { Modal, ModalBody } from "reactstrap";
import EditClientProfile from "../EditClientProfile.js";


function ModalEditClient() {
  const [modal1, setModal1] = React.useState(false);

  return (
    <>
      <i
        color="primary"
        onClick={() => setModal1(true)}
        id="edit-profile-tooltip"
        className="fal fa-user-circle w-100 text-white fa-lg mt-1"
      ></i>
      <p className="d-lg-none d-xl-none text-white">Mi perfil</p>
      <Modal className='modal-lg' isOpen={modal1} toggle={() => setModal1(false)}>
        <div className="modal-header justify-content-center">
          <button
            className="close"
            type="button"
            onClick={() => setModal1(false)}
          >
            <i className="now-ui-icons ui-1_simple-remove"></i>
          </button>
          <h4 id ="title_profile" className="title title-up">Mi Perfil</h4>
        </div>
        <ModalBody>
          <hr></hr>
          <EditClientProfile/>
        </ModalBody>
      </Modal>
    </>
  );
}

export default ModalEditClient;
