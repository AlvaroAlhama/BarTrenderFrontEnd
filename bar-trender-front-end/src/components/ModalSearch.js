import React from "react";
// react plugins that creates an input with a date picker
import Datetime from "react-datetime";
// reactstrap components
import {
  Button,
  Container,
  Modal,
  ModalBody,
  Row,
  Col,
  Label,
  FormGroup,
  Input,
  Form,
  UncontrolledTooltip,
  PopoverBody,
  PopoverHeader,
  UncontrolledPopover,
} from "reactstrap";

// core components
import POSTForm from "./ApiFormSubmit";

function ModalSearch() {
    const [modal1, setModal1] = React.useState(false);
    const [modal2, setModal2] = React.useState(false);
    return (
      <>
      
            {/* <Row id="modals d-inline"> */}
              {/* <Col md="6 d-inline"> */}
                <Button
                  color="primary"
                  className="mr-1"
                  onClick={() => setModal1(true)}
                >
                  Buscar por filtros
                </Button>
                <Modal isOpen={modal1} toggle={() => setModal1(false)}>
                  <div className="modal-header justify-content-center">
                    <button
                      className="close"
                      type="button"
                      onClick={() => setModal1(false)}
                    >
                      <i className="now-ui-icons ui-1_simple-remove"></i>
                    </button>
                    <h4 className="title title-up">Modal title</h4>
                  </div>
                  <ModalBody>
                   
                    
                    <POSTForm />
                   
  
                  </ModalBody>
                  <div className="modal-footer">
                    <Button color="default" type="button">
                      Nice Button
                    </Button>
                    <Button 
                      // ref="/landing_page"
                      color="danger"
                      type="button"
                      onClick={() => setModal1(false)}
                    >
                      Close
                    </Button>
                  </div>
                </Modal>
                
              {/* </Col> */}
              {/* <Col md="6 d-inline">
                
                <Button color="info" onClick={() => setModal2(true)}>
                  Launch Modal Mini
                </Button>
                <Modal
                  modalClassName="modal-mini modal-info"
                  toggle={() => setModal2(false)}
                  isOpen={modal2}
                >
                  <div className="modal-header justify-content-center">
                    <div className="modal-profile">
                      <i className="now-ui-icons users_circle-08"></i>
                    </div>
                  </div>
                  <ModalBody>
                    <p>Always have an access to your profile</p>
                  </ModalBody>
                  <div className="modal-footer">
                    <Button className="btn-neutral" color="link" type="button">
                      Back
                    </Button>
                    <Button
                      className="btn-neutral"
                      color="link"
                      type="button"
                      onClick={() => setModal2(false)}
                    >
                      Close
                    </Button>
                  </div>
                </Modal>
              </Col> */}
              
            {/* </Row> */}
          
      </>
    );
  }
  
  export default ModalSearch;
  