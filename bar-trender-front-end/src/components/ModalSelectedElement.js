import React from "react";

// reactstrap components
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";

// core components
import image_left from '../assets/img/bg-landing.png';
import Qr from '../App.js'

//css components
import '../views/css/ModalQR.css'

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
        alt=""
      />
      <Modal modalClassName="modal-info" isOpen={modal1} toggle={() => setModal1(false)}>
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
            alt=""
          />
          <p>
            {element.name}
          </p>
        </ModalBody>
        <div className="modal-footer">
          <Button color="default" type="button">
            Nice Button
                    </Button>
          <Button color="default" type="button" onClick = {() => setModal2(true)}>
            Obtener Descuento
          </Button>
          <Button
            color="danger"
            type="button"
            onClick={() => setModal1(false)}
          >
            Close
                    </Button>
        </div>
      </Modal>

      <Modal className="modal-qr" centered="true" isOpen={modal2} toggle={() => setModal2(false)}>
        <div className="modal-header justify-content-center">
          <button
            className="close"
            type="button"
            onClick={() => setModal2(false)}
          >
            <i className="now-ui-icons ui-1_simple-remove"></i>
          </button>
          <h4 className="title title-up">Aquí tienes tu descuento </h4>        
        </div>
        <div className="bar-name">
            <h3 className="bar-name-content">{element.name}</h3>
        </div>
        <ModalBody>
          <Qr/>
        </ModalBody>
      </Modal>
    </>
  );
}

export default ModalSelectedElement;

