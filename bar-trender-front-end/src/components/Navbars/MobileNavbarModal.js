import React, { useState } from 'react';
import {Modal, ModalBody} from "react-bootstrap";
import { Button } from "react-bootstrap";
import MobileModalRoutes from "./MobileModalRoutes";
import barTrender60 from "../../assets/img/barTrender60.png";
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
              <img src={barTrender60} class="img-fluid" alt="" />
            </Button>

      <Modal show={show} onHide={handleClose}>
      <div className="modal-header justify-content-center">
                  <button
                      className="close"
                      type="button"
                      onClick={handleClose}
                  >
                      <i className="now-ui-icons ui-1_simple-remove"></i>
                  </button>
                  <h3 className="title title-up">BarTrender</h3>
              </div>
              <div class="container">
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