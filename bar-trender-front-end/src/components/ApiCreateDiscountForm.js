import React from "react";
import moment from "moment";
import { Modal, ModalBody } from "reactstrap";

class POSTCreateDiscount extends React.Component {
  constructor() {
    super();

    this.state = {
      input: {
        name: "",
        descripcion: "",
        cost: undefined,
        totalCodes: undefined,
        initialDate: "",
        initialTime: "",
        endDate: "",
        endTime: "",
      },
      send: {
        name: undefined,
        description: undefined,
        cost: undefined,
        totalCodes: undefined,
        initialDate: undefined,
        endDate: undefined,
      },
      errors: {},
      errorApiCreate: {},
      msg: {},

      modalSuccess: false,
      modalFail: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogin = this.handleCreate.bind(this);
    this.handleSend = this.handleSend.bind(this);
  }

  async handleCreate() {
    var token = sessionStorage.getItem("token");
    var query = window.location.pathname;
    var splited = query.split("/");
    var idEstablishment = splited[3];
    const url =
      "https://bartrenderoficial.herokuapp.com/v1/establishments/" +
      idEstablishment +
      "/discounts/create";
    const create = await fetch(url, {
      method: "POST",
      headers: {
        token: token,
        "Content-type": "application/json",
      },
      body: JSON.stringify(this.state.send),
    });

    if (create.ok) {
      var response = await create.json();
      this.setState({ msg: response.msg, modalSuccess: true });
    } else {
      response = await create.json();
      this.setState({ errorApiCreate: response, modalFail: true });
    }
  }

  handleSend() {
    const initialDate = this.state.input.initialDate;
    const initialTime = this.state.input.initialTime;
    const timeStampInitial = moment
      .utc(`${initialDate} ${initialTime}`)
      .subtract(2, "hours")
      .unix();

    const endDate = this.state.input.endDate;

    const endTime = this.state.input.endTime;
    let send = {};

    if (endDate !== undefined && endDate !== "") {
      const timeStampEnd = moment
        .utc(`${endDate} ${endTime}`)
        .subtract(2, "hours")
        .unix();

      send["name"] = this.state.input.name;
      send["description"] = this.state.input.descripcion;
      send["cost"] = parseFloat(this.state.input.cost);
      if(this.state.input.totalCodes !== undefined){
        send["totalCodes"] = parseInt(this.state.input.totalCodes);
      }
      send["initialDate"] = timeStampInitial;
      send["endDate"] = timeStampEnd;
      send["scannedCodes"] = 0;
      
      
      this.state.send = send;
      this.handleCreate();
      
    } else {
      send["name"] = this.state.input.name;
      send["description"] = this.state.input.descripcion;
      send["cost"] = parseFloat(this.state.input.cost);
      if(this.state.input.totalCodes !== undefined){
        send["totalCodes"] = parseInt(this.state.input.totalCodes);
      }
      send["initialDate"] = timeStampInitial;
      send["scannedCodes"] = 0;

      this.state.send = send;
      this.handleCreate();
    }
  }

  handleChange(event) {
    let input = this.state.input;
    input[event.target.name] = event.target.value;
    this.setState({
      input,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.validate()) {

      let input = {};

      input["name"] = "";

      input["description"] = "";

      input["cost"] = "";

      input["totalCodes"] = "";

      input["initialDate"] = "";

      input["initialTime"] = "";

      input["endDate"] = "";

      input["endTime"] = "";

      this.handleSend(event);
    }
  }

  validate() {
    let input = this.state.input;

    var today = new Date();

    let errors = {};

    let isValid = true;

    if (!input["name"].trim()) {
      isValid = false;

      errors["name"] = "Escriba un nombre del descuento.";
    }

    if (!input["descripcion"].trim()) {
      isValid = false;

      errors["descripcion"] = "Escriba una descripci??n para el descuento";
    }

    if (!input["cost"] || input["cost"] < 0) {
      isValid = false;

      errors["cost"] = "Escriba un precio para el descuento.";
    }

    if (input["totalcodes"] <= 0) {
      isValid = false;

      errors["totalCodes"] = "Escriba un n??mero total de c??digos correcto.";
    }

    if (!input["initialDate"] || !input["initialTime"]) {
      isValid = false;

      errors["initialDate"] =
        "Introduzca una fecha y hora para el inicio del desucento.";
    }

    if (input["initialDate"] && input["initialTime"]) {
      var initialDateFull = new Date(
        input["initialDate"].concat(" ", input["initialTime"])
      );

      if (today > initialDateFull) {
        isValid = false;

        errors["initialDate"] = "La fecha de inicio debe ser en futuro";
      }
    }

    if (input["endDate"] && !input["endTime"]) {
      isValid = false;

      errors["endDate"] =
        "Si quiere una fecha final debe proporcionar la hora final";
    }

    if (input["initialDate"] && input["endDate"]) {
      var initialDate = new Date(
        input["initialDate"].concat(" ", input["initialTime"])
      );
      var endDate = new Date(input["endDate"].concat(" ", input["endTime"]));
      if (initialDate <= today) {
        isValid = false;
        errors["initialDate"] =
          "Introduzca una fecha de inicio posterior al d??a actual.";
      }
      if (endDate <= initialDate) {
        isValid = false;
        errors["endDate"] =
          "Introduzca una fecha de fin posterior a la fecha de inicio.";
      }
    }

    this.setState({
      errors: errors,
    });

    return isValid;
  }

  render() {
    return (
      <>
        <div>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group my-1">
              <input
                type="text"
                name="name"
                maxLength="50"
                value={this.state.input.name}
                onChange={this.handleChange}
                className="form-control"
                placeholder="Nombre del descuento"
                id="name"
              />

              <div className="text-danger">{this.state.errors.name}</div>
            </div>
            <div className="form-group my-1">
              <input
                type="text"
                name="descripcion"
                maxLength="140"
                value={this.state.input.descripcion}
                onChange={this.handleChange}
                className="form-control"
                placeholder="Descripci??n del descuento"
                id="name"
              />

              <div className="text-danger">{this.state.errors.descripcion}</div>
            </div>
            <div className="form-group my-1">
              <input
                type="number"
                step="0.01"
                name="cost"
                value={this.state.input.cost}
                onChange={this.handleChange}
                className="form-control"
                placeholder="Precio del descuento"
                id="cost"
              />

              <div className="text-danger">{this.state.errors.cost}</div>
            </div>
            <div className="form-group my-1">
              <input
                type="number"
                name="totalCodes"
                value={this.state.input.totalCodes}
                onChange={this.handleChange}
                className="form-control"
                placeholder="N??mero total de c??digos"
                id="totalCodes"
              />

              <div className="text-danger">{this.state.errors.totalCodes}</div>
            </div>
            <div className="form-group my-1 row justify-content-center">
              <label for="initialDate">
                Fecha y hora de inicio del descuento
              </label>
              <div className="col-6">
                <input
                  type="date"
                  name="initialDate"
                  value={this.state.input.initialDate}
                  onChange={this.handleChange}
                  className="form-control"
                  placeholder="Fecha de inicio del descuento"
                  id="initialDate"
                />
              </div>
              <div className="col-6">
                <input
                  type="time"
                  name="initialTime"
                  value={this.state.input.initialTime}
                  onChange={this.handleChange}
                  className="form-control"
                  placeholder="Hora de inicio del descuento"
                  id="initialDate"
                />
              </div>

              <div className="text-danger">{this.state.errors.initialDate}</div>
            </div>
            <div className="form-group my-1 row justify-content-center">
              <label for="endDate" className="w-100 text-center">
                Fecha y hora de fin del descuento
              </label>
              <div className="col-6">
                <input
                  type="date"
                  name="endDate"
                  value={this.state.input.endDate}
                  onChange={this.handleChange}
                  className="form-control"
                  placeholder="Fecha de fin del descuento"
                  id="endDate"
                />
              </div>
              <div className="col-6">
                <input
                  type="time"
                  name="endTime"
                  value={this.state.input.endTime}
                  onChange={this.handleChange}
                  className="form-control"
                  placeholder="Hora de fin del descuento"
                  id="endDate"
                />
              </div>
              <div className="text-danger">{this.state.errors.endDate}</div>
            </div>
            <div className="text-center">
              <input
                type="submit"
                value="Crear descuento"
                className="btn btn-primary"
              />
            </div>
          </form>
        </div>

        <Modal isOpen={this.state.modalSuccess}>
          <div className="modal-header justify-content-center">
            <button
              className="close"
              type="button"
              onClick={() => window.location.reload()}
            >
              <i className="now-ui-icons ui-1_simple-remove"></i>
            </button>
            <h4 className="title title-up">Resultado</h4>
          </div>
          <ModalBody>
            <div className="mt-2 mb-4 text-center">
              <p> Descuento creado con ??xito</p>
            </div>
          </ModalBody>
        </Modal>

        <Modal isOpen={this.state.modalFail}>
          <div className="modal-header justify-content-center">
            <button
              className="close"
              type="button"
              onClick={() => this.setState({ modalFail: false })}
            >
              <i className="now-ui-icons ui-1_simple-remove"></i>
            </button>
            <h4 className="title title-up">??ERROR!</h4>
          </div>
          <ModalBody>
            <div className="mt-2 mb-4 text-center">
              <p className="text-danger">{this.state.errorApiCreate.error}</p>
            </div>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

export default POSTCreateDiscount;
