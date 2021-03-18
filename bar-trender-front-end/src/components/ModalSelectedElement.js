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
// import POSTForm from "./ApiFormSubmit";
import image_left from '../assets/img/bg-landing.png';

function ModalSelectedElement(prop) {
    const [modal1, setModal1] = React.useState(false);
    const [modal2, setModal2] = React.useState(false);
    const { element } = prop;
    return (
      <>        
  
              <img
                  className=""
                  src={image_left}
                  onClick={() => setModal1(true)}
                  alt="no image"
                />
                {/* <Button
                  color="info"
                  className="mr-1"
                  onClick={() => setModal1(true)}
                >
                  Buscar por filtros
                </Button> */}
                <Modal  modalClassName="modal-info" isOpen={modal1} toggle={() => setModal1(false)}>
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
                  <img
                  className="image-container image-left"
                  src={image_left}
                  onClick={() => setModal1(true)}
                  alt="no image"
                  />
                  <p>
                    {/* {element} */}
                    {element.name}
                  </p>
                    
                    {/* <POSTForm /> */}
                   
  
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
      
      </>
    );
  }
  
  export default ModalSelectedElement;
  