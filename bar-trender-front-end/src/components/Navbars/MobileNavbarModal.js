import React, { useEffect, useState, Component } from 'react';
import {Modal, ModalBody} from "react-bootstrap";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { NavItem, NavLink, UncontrolledTooltip } from "reactstrap";
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
              <span class="navbar-toggler-icon"></span>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <div className="modal-header justify-content-center">
          <button className="close" type="button" onClick={handleClose}>
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
    
    

    
    
    {/*<Button
            variant="dark"
            className="d-lg-none btn-fill d-flex justify-content-center align-items-center rounded-circle p-2"
            onClick={() => this.setState({ modal1: true })}
          >
        </Button>
          <Modal isOpen={this.state.modal1} toggle={() => this.setState({ modal1: false })}>
              <div className="modal-header justify-content-center">
                  <button
                      className="close"
                      type="button"
                      onClick={() => this.setState({ modal1: false })}
                  >
                      <i className="now-ui-icons ui-1_simple-remove"></i>
                  </button>
                  <h4 className="title title-up">BarTrender</h4>
              </div>
              <div class="container">
                  <hr />
              </div>
              <ModalBody>
                 
              </ModalBody>
    </Modal>*/}