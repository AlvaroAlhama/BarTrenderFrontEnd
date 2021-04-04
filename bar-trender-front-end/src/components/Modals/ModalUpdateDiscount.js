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


function ModalUpdateDiscount(props) {
  const [appState, setAppState] = useState({
    loading: false,
    establishment: {},
    discounts: [],
    initialDate: null,
    initialTime: null,
    endDate: null,
    endTime: null,
    input: {},
    errors: {}
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
    setAppState({ loading: true,
      initialDate: null,
      initialTime: null,
      endDate: null,
      endTime: null,
      input: {},
      errors: {} });
    var token = sessionStorage.getItem("token");

    fetch(
      "https://develop-backend-sprint-01.herokuapp.com/v1/establishments/" +
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
          initialDate: null,
          initialTime: null,
          endDate: null,
          endTime: null,
          input: {},
          errors: {},
        });
      });
  }, [setAppState]);

  async function handleUpdate() {
    const discount = props.discount;
    // console.log(discount, 'discount')
    console.log(appState,'appState update')

    var idDiscount = discount.id;
    var token = sessionStorage.getItem("token");
    var query = window.location.pathname;
    var splited = query.split("/");
    var idEstablishment = splited[3];
    const url = "https://develop-backend-sprint-01.herokuapp.com/v1/establishments/" + idEstablishment + "/discounts/" + idDiscount + "/update";

    var input = appState.input;
    console.log(input, "pre input");
    input = input['scannedCodes: 0'];
    console.log(input, "postpush input");
    // input.push('scannedCodes: 0')
    // console.log(input, "postpush input");

    const request = await fetch(url, {
      method: "PUT",
      headers: {
        "token": token,
        "Content-type": "application/json"
      },
      body: JSON.stringify(appState.input),
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

  function handleChange(event) {
    let input = appState.input;
    appState.input[event.target.name] = event.target.value;
    appState.input['scannedCodes'] = "0";

    setAppState({
      input,

    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(appState,'appState submit')
    if (validate()) {
      let errors = {};

      let input = {};

      input["name"] = "";

      input["description"] = "";

      input["cost"] = "";

      input["totalCodes"] = "";

      input["initialDate"] = "";

      input["initialTime"] = "";

      input["endDate"] = "";

      input["endTime"] = "";

      handleUpdate(event);
    }
  }

  function validate() {
    let input = appState.input;
    console.log(appState, 'appState pre validate')
    var today = new Date();

    let errors = {};

    let isValid = true;

    if (!input["name"]) {
      isValid = false;

      errors["name"] = "Escriba un nombre del descuento.";
    }
    setAppState({
      errors: errors,
    });
    console.log(appState, 'appState post validate')

    return isValid;
  }


  return (
    <>
      <OverlayTrigger
        overlay={
          <Tooltip id="tooltip-488980961">
            Editar descuento
                              </Tooltip>
        }
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
        <div class="container">
          <hr />
        </div>
        <ModalBody>
          <div>
            <form onSubmit={handleSubmit}>
              <div class="form-group my-1">
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  class="form-control"
                  placeholder="Nombre del descuento"
                  id="name"
                />

                <div className="text-danger">{appState.errors == undefined ? "" : appState.errors.name}</div>
              </div>
              <div class="form-group my-1">
                <input
                  type="text"
                  name="descripcion"
                  onChange={handleChange}
                  class="form-control"
                  id="name"
                />

                <div className="text-danger">{appState.errors == undefined ? "" : appState.errors.descripcion}</div>
              </div>
              <div class="form-group my-1">
                <input
                  type="number"
                  step="0.01"
                  name="cost"
                  onChange={handleChange}
                  class="form-control"
                  placeholder="Precio del descuento"
                  id="cost"
                />

                <div className="text-danger">{appState.errors == undefined ? "" : appState.errors.cost}</div>
              </div>
              <div class="form-group my-1">
                <input
                  type="number"
                  name="totalCodes"
                  onChange={handleChange}
                  class="form-control"
                  placeholder="Número total de códigos"
                  id="totalCodes"
                />

                <div className="text-danger">{appState.errors == undefined ? "" : appState.errors.totalCodes}</div>
              </div>
              <div class="form-group my-1 row justify-content-center">
                <label for="initialDate">
                  Fecha y hora de inicio del descuento
              </label>
                <div className="col-6">
                  <input
                    type="date"
                    name="initialDate"
                    onChange={handleChange}
                    class="form-control"
                    placeholder="Fecha de inicio del descuento"
                    id="initialDate"
                  />
                </div>
                <div className="col-6">
                  <input
                    type="time"
                    name="initialTime"
                    onChange={handleChange}
                    class="form-control"
                    placeholder="Hora de inicio del descuento"
                    id="initialDate"
                  />
                </div>

                <div className="text-danger">{appState.errors == undefined ? "" : appState.errors.initialDate}</div>
              </div>
              <div class="form-group my-1 row justify-content-center">
                <label for="endDate" className="w-100 text-center">Fecha y hora de fin del descuento</label>
                <div className="col-6">
                  <input
                    type="date"
                    name="endDate"
                    onChange={handleChange}
                    class="form-control"
                    placeholder="Fecha de fin del descuento"
                    id="endDate"
                  />
                </div>
                <div className="col-6">
                  <input
                    type="time"
                    name="endTime"
                    onChange={handleChange}
                    class="form-control"
                    placeholder="Hora de fin del descuento"
                    id="endDate"
                  />
                  <input
                    type="hidden"
                    name="scannedCodes"
                    value = {props.scannedCodes}
                    id="scannedCodes"
                  />
                </div>
                <div className="text-danger">{appState.errors == undefined ? "" : appState.errors.endDate}</div>
              </div>
              <div class="text-center">
                <input
                  type="submit"
                  value="Editar descuento"
                  class="btn btn-primary"
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
