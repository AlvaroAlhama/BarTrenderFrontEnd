import React from "react";
import {Modal, ModalBody} from "react-bootstrap";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { NavItem, NavLink, UncontrolledTooltip } from "reactstrap";
    export default class EditEstablishment extends React.Component {

      constructor() {
          super();
          this.state = {
              modal1: false,
              errors: {},
          }
  
         
  
      }
      render() {

        return (
          <>
          <Button
            variant="dark"
            className="d-lg-none btn-fill d-flex justify-content-center align-items-center rounded-circle p-2"
            onClick={() => this.setState({ modal1: true }) }
          >
            <i className="fas fa-ellipsis-v"></i>
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
            <h4 className="title title-up">Nuevo descuento</h4>
        </div>
        <div class="container">
            <hr />
        </div>
        <ModalBody>
           <p>BarTrender</p>
        </ModalBody>
        </Modal>
        </>
        );
      }
    }
    
    
    
    
    
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