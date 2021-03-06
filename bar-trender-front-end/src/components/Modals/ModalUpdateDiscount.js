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
import "moment/locale/es";

function ModalUpdateDiscount(props) {
  const [appState, setAppState] = useState({
    loading: false,
    establishment: {},
    discounts: [],
    initialDate: undefined,
    initialTime: undefined,
    endDate: undefined,
    endTime: undefined,
    input: {},
    errors: {},
  });

  const [modalUpdate, setModalUpdate] = React.useState(false);

  const idEstablishment = () => {
    var query = window.location.pathname;
    var splited = query.split("/");
    var idEstablishment = splited[3];

    return idEstablishment;
  };
  const id_establishment = idEstablishment();

  useEffect(() => {
    setAppState({
      loading: true,
      initialDate: undefined,
      initialTime: undefined,
      endDate: undefined,
      endTime: undefined,
      input: {},
      errors: {},
    });
    var token = sessionStorage.getItem("token");

    fetch(
      "https://bartrenderoficial.herokuapp.com/v1/establishments/" +

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
          initialDate: undefined,
          initialTime: undefined,
          endDate: undefined,
          endTime: undefined,
          input: {},
          errors: {},
        });
      });
  }, [setAppState]);

  async function handleUpdate() {
    const discount = props.discount;
 

    var idDiscount = discount.id;
    var token = sessionStorage.getItem("token");
    var query = window.location.pathname;
    var splited = query.split("/");
    var idEstablishment = splited[3];
    const url =
      "https://bartrenderoficial.herokuapp.com/v1/establishments/" +

      idEstablishment +
      "/discounts/" +
      idDiscount +
      "/update";

    var input = appState.input;
    var costFloat = parseFloat(input["cost"]);
    var totalCodesInt = parseInt(input["totalCodes"]);
    var endDate = input["endDate"];
    var endTime = input["endTime"];
    const timeStampInitial = moment.utc(`${endDate} ${endTime}`).unix();
    input["endDate"] = timeStampInitial;
    input["cost"] = costFloat;
    input["totalCodes"] = totalCodesInt;
    input["scannedCodes"] = props.discount.scannedCodes;
    input["initialDate"] = props.discount.initialDate;




    const request = await fetch(url, {
      method: "PUT",
      headers: {
        token: token,
        "Content-type": "application/json",
      },
      body: JSON.stringify(appState.input),
    });

    if (request.ok) {
      var response = await request.json();
      setAppState({ msg: response.msg, input: {} });
      window.location.reload();
    } else {
      var response = await request.json();
      setAppState({ errors: response.error, input: {} });
    }
  }

  function handleChange(event) {
    let input = appState.input;
    appState.input[event.target.name] = event.target.value;
    setAppState({
      input,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (validate()) {
      let errors = {};

      let input = {};

      input["name"] = "";

      input["description"] = "";

      input["cost"] = "";

      input["totalCodes"] = "";

      input["endDate"] = "";

      input["endTime"] = "";

      handleUpdate(event);
    }else{
      document.getElementById("form-update").reset();
    }
  }

  function validate() {
    let input = appState.input;
    var today = new Date();

    let errors = {};

    let isValid = true;

    var t = new Date();

    if (!input["name"]) {
      isValid = false;

      errors["name"] = "Escriba un nombre del descuento.";
    }

    if (!input["description"]) {
      isValid = false;

      errors["description"] = "Escriba una descripci??n para el descuento";
    }

    if (!input["cost"] || input["cost"] <= 0) {
      isValid = false;

      errors["cost"] = "Escriba un precio para el descuento.";
    }

    if (!input["totalCodes"] || input["totalcodes"] <= 0) {
      isValid = false;

      errors["totalCodes"] = "Escriba un n??mero total de c??digos.";
    }
    if (input["totalCodes"] && input["totalCodes"] > 0) {
      if (input["totalCodes"] < props.discount.scannedCodes) {
        isValid = false;

        errors["totalCodes"] =
          "No se puede introducir menos c??digos de los que ya han sido escaneados ";
      }
    }

    if (!input["endDate"]) {
      isValid = false;

      errors["endDate"] = "Introduzca una fecha para el fin del desucento.";
    }


    if (input["endDate"]) {
      var endDate = new Date(input["endDate"]);
      if (endDate <= props.discount.initialDate) {
        isValid = false;
        errors["endDate"] =
          "Introduzca una fecha de fin posterior a la fecha de inicio.";
      }
    }

    setAppState({
      errors: errors,
      input: appState.input,
    });

    return isValid;
  }

  return (
    <>
      <OverlayTrigger
        overlay={<Tooltip id="tooltip-488980961">Editar descuento</Tooltip>}
      >
        <Button
          className="btn-simple btn-link p-1"
          type="button"
          variant="info"
          onClick={() => setModalUpdate(true)}
        >
          <i className="fas fa-edit"></i>
        </Button>
      </OverlayTrigger>
      <Modal isOpen={modalUpdate} toogle={() => setModalUpdate(false)}>
        <div className="modal-header justify-content-center">
          <button
            className="close"
            type="button"
            onClick={() => setModalUpdate(false)}
          >
            <i className="now-ui-icons ui-1_simple-remove"></i>
          </button>
          <h4 className="title title-up">Editar Descuento</h4>
        </div>
        <div className="text-danger">
          {appState.errors == undefined ? "" : appState.errors.error}
        </div>
        <div className="container">
          <hr />
        </div>
        <ModalBody>
          <div>
            <form onSubmit={handleSubmit} id = "form-update">
              <div className="form-group my-1">
                <label for="name" className="w-100">
                  Nombre del descuento
                </label>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  className="form-control"
                  placeholder={props.discount.name}
                  id="name"
                />

                <div className="text-danger">
                  {appState.errors == undefined ? "" : appState.errors.name}
                </div>
              </div>
              <div className="form-group my-1">
                <label for="description" className="w-100">
                  Descripci??n del descuento
                </label>
                <input
                  type="text"
                  name="description"
                  onChange={handleChange}
                  className="form-control"
                  placeholder={props.discount.description}
                  id="description"
                />

                <div className="text-danger">
                  {appState.errors == undefined
                    ? ""
                    : appState.errors.description}
                </div>
              </div>
              <div className="form-group my-1">
                <label for="name" className="w-100">
                  Precio del descuento
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="cost"
                  onChange={handleChange}
                  className="form-control"
                  placeholder={props.discount.cost}
                  id="cost"
                />

                <div className="text-danger">
                  {appState.errors == undefined ? "" : appState.errors.cost}
                </div>
              </div>
              <div className="form-group my-1">
                <label for="totalCodes" className="w-100">
                  N??mero total de descuentos
                </label>
                <input
                  type="number"
                  name="totalCodes"
                  onChange={handleChange}
                  className="form-control"
                  placeholder={props.discount.totalCodes}
                  id="totalCodes"
                />

                <div className="text-danger">
                  {appState.errors == undefined
                    ? ""
                    : appState.errors.totalCodes}
                </div>
              </div>
              <div className="form-group my-1">
                <p>
                  N??mero de descuentos escaneados:{props.discount.scannedCodes}{" "}
                </p>
              </div>
              <div className="form-group my-1 row justify-content-center">
                <label for="endDate" className="w-100">
                  Fecha y hora de fin del descuento
                </label>
                <div className="col-6">
                  <input
                    type="date"
                    name="endDate"
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Fecha de fin del descuento"
                    id="endDate"
                  />
                </div>

                <div className="col-6">
                  <input
                    type="time"
                    name="endTime"
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Hora de fin del descuento"
                    id="endDate"
                  />
                  <input
                    type="hidden"
                    name="scannedCodes"
                    value={props.scannedCodes}
                    id="scannedCodes"
                  />
                </div>
                <div className="text-danger">
                  {appState.errors == undefined ? "" : appState.errors.endDate}
                </div>
              </div>
              <div className="text-center">
                <input
                  type="submit"
                  value="Editar descuento"
                  className="btn btn-primary"
                />
              </div>
            </form>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

export default ModalUpdateDiscount;
