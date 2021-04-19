import React from "react";
import moment from "moment";
import { Modal, ModalBody } from "reactstrap";

class POSTCreateDiscount extends React.Component {
  constructor() {
    super();

    this.state = {
      input: {},
      send: {
        name: null,
        description: null,
        cost: null,
        totalCodes: null,
        initialDate: null,
        endDate: null,
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
    console.log(this.state.send, "esto es lo que se va a enviar")
    const url =
    "https://main-backend-sprint-02.herokuapp.com/v1/establishments/" +
      idEstablishment +
      "/discounts/create";
    const create = await fetch(url, {
      method: "POST",
      headers: {
        token: token,
        'Content-type': 'application/json'
      },
      body: JSON.stringify(this.state.send),
    });

    if (create.ok) {
      var response = await create.json();
      this.setState({ msg: response.msg, modalSuccess: true });
    } else {
      var response = await create.json();
      this.setState({ errorApiCreate: response, modalFail: true });
    }
  }

  handleSend() {
    const initialDate = this.state.input.initialDate;
    const initialTime = this.state.input.initialTime;
    const timeStampInitial = moment.utc(`${initialDate} ${initialTime}`).unix();

    const endDate = this.state.input.endDate;

    const endTime = this.state.input.endTime;

    if (endDate != undefined && endDate != '') {
      const timeStampEnd = moment.utc(`${endDate} ${endTime}`).unix();
      console.log("está entrando con el que lleva endDate")
      let send2 = {
        name: this.state.input.name,
        description: this.state.input.descripcion,
        cost: parseFloat(this.state.input.cost),
        totalCodes: parseInt(this.state.input.totalCodes),
        initialDate: timeStampInitial,
        endDate: timeStampEnd,
        scannedCodes: 0,
      };

      this.setState(
        {
          send: send2,
        },
        () => {
          this.handleCreate();
        }
      );
    } else {
      console.log("está entrando con el que no lleva endDate")

      let send2 = {
        name: this.state.input.name,
        description: this.state.input.descripcion,
        cost: parseFloat(this.state.input.cost),
        totalCodes: parseInt(this.state.input.totalCodes),
        initialDate: timeStampInitial,
        scannedCodes: 0,
      };

      this.setState(
        {
          send: send2,
        },
        () => {
          this.handleCreate();
        }
      );
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

      this.handleSend(event);
    }
  }

  validate() {
    let input = this.state.input;

    var today = new Date();

    let errors = {};

    let isValid = true;

    if (!input["name"]) {
      isValid = false;

      errors["name"] = "Escriba un nombre del descuento.";
    }

    if (!input["descripcion"]) {
      isValid = false;

      errors["descripcion"] = "Escriba una descripción para el descuento";
    }

    if (!input["cost"] || input["cost"] <= 0) {
      isValid = false;

      errors["cost"] = "Escriba un precio para el descuento.";
    }

    if (!input["totalCodes"] || input["totalcodes"] <= 0) {
      isValid = false;

      errors["totalCodes"] = "Escriba un número total de códigos.";
    }

    if (!input["initialDate"] || !input['initialTime']) {
      isValid = false;

      errors["initialDate"] =
        "Introduzca una fecha y hora para el inicio del desucento.";
    }

    if(input['initialDate'] && input['initialTime']){
      var initialDateFull = new Date(input['initialDate'].concat(" ", input['initialTime']));

      if(today > initialDateFull){
        isValid = false;

        errors['initialDate'] = 'La fecha de inicio debe ser en futuro';
      }
    }

    if(input['endDate'] && !input['endTime']){
      isValid = false;

      errors['endDate'] = 'Si quiere una fecha final debe proporcionar la hora final'
    }

    if (input["initialDate"] && input["endDate"]) {
      var initialDate = new Date(input["initialDate"].concat(' ', input['initialTime']));
      var endDate = new Date(input["endDate"].concat(' ', input['endTime']));
      if (initialDate <= today) {
        isValid = false;
        errors["initialDate"] =
          "Introduzca una fecha de inicio posterior al día actual.";
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
            <div class="form-group my-1">
              <input
                type="text"
                name="name"
                value={this.state.input.name}
                onChange={this.handleChange}
                class="form-control"
                placeholder="Nombre del descuento"
                id="name"
              />

              <div className="text-danger">{this.state.errors.name}</div>
            </div>
            <div class="form-group my-1">
              <input
                type="text"
                name="descripcion"
                value={this.state.input.descripcion}
                onChange={this.handleChange}
                class="form-control"
                placeholder="Descripción del descuento"
                id="name"
              />

              <div className="text-danger">{this.state.errors.descripcion}</div>
            </div>
            <div class="form-group my-1">
              <input
                type="number"
                step="0.01"
                name="cost"
                value={this.state.input.cost}
                onChange={this.handleChange}
                class="form-control"
                placeholder="Precio del descuento"
                id="cost"
              />

              <div className="text-danger">{this.state.errors.cost}</div>
            </div>
            <div class="form-group my-1">
              <input
                type="number"
                name="totalCodes"
                value={this.state.input.totalCodes}
                onChange={this.handleChange}
                class="form-control"
                placeholder="Número total de códigos"
                id="totalCodes"
              />

              <div className="text-danger">{this.state.errors.totalCodes}</div>
            </div>
            <div class="form-group my-1 row justify-content-center">
              <label for="initialDate">
                Fecha y hora de inicio del descuento
              </label>
              <div className="col-6">
                <input
                  type="date"
                  name="initialDate"
                  value={this.state.input.initialDate}
                  onChange={this.handleChange}
                  class="form-control"
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
                  class="form-control"
                  placeholder="Hora de inicio del descuento"
                  id="initialDate"
                />
              </div>

              <div className="text-danger">{this.state.errors.initialDate}</div>
            </div>
            <div class="form-group my-1 row justify-content-center">
              <label for="endDate" className="w-100 text-center">Fecha y hora de fin del descuento</label>
              <div className="col-6">
                <input
                  type="date"
                  name="endDate"
                  value={this.state.input.endDate}
                  onChange={this.handleChange}
                  class="form-control"
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
                  class="form-control"
                  placeholder="Hora de fin del descuento"
                  id="endDate"
                />
              </div>
              <div className="text-danger">{this.state.errors.endDate}</div>
            </div>
            <div class="text-center">
              <input
                type="submit"
                value="Crear descuento"
                class="btn btn-primary"
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
              <p> Descuento creado con éxito</p>
            </div>
          </ModalBody>
        </Modal>

        <Modal isOpen={this.state.modalFail}>
        <div className="modal-header justify-content-center">
            <button
              className="close"
              type="button"
              onClick={() => this.setState({modalFail: false})}
            >
              <i className="now-ui-icons ui-1_simple-remove"></i>
            </button>
            <h4 className="title title-up">¡ERROR!</h4>
          </div>
          <ModalBody>
            <div className="mt-2 mb-4 text-center">
              <p className='text-danger'>{this.state.errorApiCreate.error}</p>
            </div>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

export default POSTCreateDiscount;
