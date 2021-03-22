import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
} from "reactstrap";

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
import ListDiscount from "./ListDiscount";

function ModalSelectedElement(prop) {
  const [modal1, setModal1] = React.useState(false);
  const [modal2, setModal2] = React.useState(false);
  const { element } = prop;
  const [appState, setAppState] = useState({
    discounts: {},
  });

   useEffect(() => {
    const apiUrl = "https://develop-backend-sprint-01.herokuapp.com/v1/establishments/"+element.id+"/discounts/get";
    async function loadDiscounts(){
      await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'token': '',

        }
      }).then(response => response.json())
        .then(discounts => {
          setAppState({ discounts: discounts });
        });} 
        loadDiscounts()
  },[setAppState]);

// function loadInfo(){
//   setModal1(true);
//   const [] = useState({discounts:{}});

//   fetch("http://localhost:8000/v1/establishments/1/discounts/get", {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//      }
//   }).then(response => response.json())
//   .then(discounts => setAppState({discounts:discounts}))
// };


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
          <h4 className="title title-up">{element.name_text}</h4>
        </div>
        <ModalBody>
          <img
            className="image-container image-left"
            src={image_left}
            onClick={() => setModal1(true)}
            alt=""
          />
          <h3>Información del establecimiento</h3>
          <p>
            {element.name_text}
          </p>
          <p>{element.phone_number}</p>
          <p>{element.zone_enum}</p>
          <ListDiscount discounts={appState.discounts}/>
          
        </ModalBody>
        <div className="modal-footer">
          <Button color="default" type="button">
            Nice Button
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
            <h3 className="bar-name-content">{element.name_text}</h3>
        </div>
        <ModalBody>
          <p>{element.establishment_id}</p>
          <Qr />
        </ModalBody>
      </Modal>
    </>
  );
}

export default ModalSelectedElement;

