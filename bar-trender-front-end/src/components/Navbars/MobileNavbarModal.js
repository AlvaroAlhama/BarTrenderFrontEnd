import React, { useState } from 'react';
import {Modal, ModalBody} from "react-bootstrap";
import { Button } from "react-bootstrap";
import MobileModalRoutes from "./MobileModalRoutes";
function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
            variant="dark"
            className="d-lg-none btn-fill d-flex justify-content-center align-items-center rounded-circle p-2"
            onClick={ handleShow }>

              <span className="navbar-toggler-icon"></span>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <div className="modal-header justify-content-center">
          <button className="close" type="button" onClick={handleClose}>
            <i className="now-ui-icons ui-1_simple-remove"></i>
          </button>
          <h3 className="title title-up">BarTrender</h3>
        </div>
        <div className="container">
         <hr />
        </div>
        <ModalBody>
          <MobileModalRoutes/>
        </ModalBody>

      </Modal>
    </>
  );
}

export default Example