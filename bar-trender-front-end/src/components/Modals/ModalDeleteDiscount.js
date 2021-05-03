// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  OverlayTrigger,
  Tooltip,
  Table,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";

import React, { useEffect, useState } from "react";
import { Modal, ModalBody } from "reactstrap";

import Moment from "react-moment";
import moment from "moment";
import "moment/locale/es"

function ModalDeleteDiscount(props) {
  const [appState, setAppState] = useState({
    loading: false,
    establishment: {},
    discounts: [],
  });

  const [modalDelete, setModalDelete] = React.useState(false);

  const idEstablishment = () => {
    var query = window.location.pathname;
    var splited = query.split("/");
    var idEstablishment = splited[3];

    return idEstablishment;
  };
  const id_establishment = idEstablishment();

  useEffect(() => {
    setAppState({ loading: true });
    var token = sessionStorage.getItem("token");

    fetch(

      "https://main-backend-sprint-03.herokuapp.com/v1/establishments/" +

      id_establishment +
      "/get",
      {
        method: "GET",
        headers: {
          token: token,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setAppState({
          loading: false,
          establishment: data.establishment,
          discounts: data.discounts,
        });
      });
  }, [setAppState]);

  async function handleDelete(){

    if (validate()) {
      const discount = props.discount;
     
      var idDiscount = discount.id;
      var token = sessionStorage.getItem("token");
      var query = window.location.pathname;
      var splited = query.split("/");
      var idEstablishment = splited[3];

      const url = "https://main-backend-sprint-03.herokuapp.com/v1/establishments/" + idEstablishment + "/discounts/" + idDiscount + "/delete";
      const request = await fetch(url, {
        method: "DELETE",
        headers: {
          "token": token,
          "Content-type": "application/json"
        }
      });

      if (request.ok) {
        var response = await request.json();
        setAppState({ msg: response.msg });
        window.location.reload();
      } else {
        var response = await request.json();
        setAppState({ errors: response.error });
      }
    }
  }


  function validate(){
    const scannedCodes = props.discount.scannedCodes;
    const endDate = props.discount.endDate;

    const today = new Date();
    const todayTS = moment.utc(`${today}`).unix();

    let errors = {};

    let isValid = true;

    if (scannedCodes > 0) {
      isValid = false;

      errors["errorCodes"] = "No se puede eliminar porque hay descuentos escaneados";
    }
    if (endDate != undefined) {
      if (todayTS > endDate) {
        isValid = false;

        errors["errorDate"] = "No se puede eliminar porque este descuento ya ha finalizado";
      }
    }

    setAppState({ errors: errors });
    return isValid;
  }

  return (
    <>
      <OverlayTrigger
        overlay={
          <Tooltip id="tooltip-506045838">Eliminar descuento</Tooltip>
        }
      >
        <Button
          className="btn-simple btn-link p-1"
          type="button"
          variant="danger"
          onClick={() => setModalDelete(true)}
        >
          <i className="fas fa-times"></i>
        </Button>
      </OverlayTrigger>
      <Modal isOpen={modalDelete} toogle={() => setModalDelete(false)}>
        <div className="modal-header justify-content-center">
          <button
            className="close"
            type="button"
            onClick={() => setModalDelete(false)}
          >
            <i className="now-ui-icons ui-1_simple-remove"></i>
          </button>
          <h4 className="title title-up">Eliminar descuento</h4>
        </div>
        <div className="container">
          <hr />
        </div>
        <ModalBody>
          <div className="ml-2">
            <div className="row">
              <h5 className="my-auto">Nombre del descuento: </h5>
              <p className="ml-2 my-auto">{props.discount.name}</p>
            </div>
            <div className="row">
              <h5 className="my-auto">Descripción: </h5>
              <p className="ml-2 my-auto">{props.discount.description}</p>
            </div>
            <div className="row">
              <h5 className="my-auto">Coste: </h5>
              <p className="ml-2 my-auto">{props.discount.cost}</p>
            </div>
            <div className="row">
              <h5 className="my-auto">Códigos totales: </h5>
              <p className="ml-2 my-auto">{props.discount.totalCodes}</p>
            </div>
            <div className="row">
              <h5 className="my-auto">Códigos escaneados: </h5>
              <p className="ml-2 my-auto">{props.discount.scannedCodes}</p>
            </div>
            <div className="row">
              <h5 className="my-auto">Fecha de inicio: </h5>
              <p className="ml-2 my-auto"><Moment unix format="D-M-Y HH:mm" locale="es">{props.discount.initialDate}</Moment></p>
            </div>
            <div className="row">
              <h5 className="my-auto">Fecha fin: </h5>
              <p className="ml-2 my-auto"><Moment unix format="D-M-Y HH:mm" locale="es">{props.discount.endDate}</Moment></p>
            </div>
          </div>
          <div className="mt-2 mb-4 text-center">
            <h6>¿Seguro que quieres eliminar este descuento?</h6>
            <div>
              <button type="button" className="btn btn-danger" onClick={() => handleDelete()}>Elminar</button>
            </div>
          </div>
          <div>
            <p className= "text-danger">{appState.errors==undefined ? "" : appState.errors.errorCodes}</p>
            <p className= "text-danger">{appState.errors==undefined ? "" : appState.errors.errorDate}</p>
          </div>
        </ModalBody>
      </Modal>

    </>
  );
}

export default ModalDeleteDiscount;

