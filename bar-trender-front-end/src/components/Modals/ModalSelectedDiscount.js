import React from "react";

// reactstrap components
import {
  Button,
  Modal,
  ModalBody,
} from "reactstrap";

// core components
import Qr from '../../App.js'

//css components
import '../../views/css/ModalQR.css'

function ModalSelectedDiscount(prop) {
  const [modal2, setModal2] = React.useState(false);
  const { element } = prop;
  
  return (
    <>
      <Button color="primary" type="button" onClick={() => setModal2(true)}>
          Obtener Descuento
      </Button>
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
            <h3 className="bar-name-content">{element.name_text}</h3>
        </div>
        <ModalBody>

          <Qr idEstablishment={element.establishment_id} idDiscount={element.id}/>
        </ModalBody>
      </Modal>

      
    </>
  );
}

export default ModalSelectedDiscount;

