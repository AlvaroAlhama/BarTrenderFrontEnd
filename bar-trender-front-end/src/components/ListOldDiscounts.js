import React from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
} from "reactstrap";
import moment from "moment";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import DiscountRenew from "./DiscountRenew"

export default class EditDeleteDiscounts extends React.Component {
  constructor() {
    super();

    this.state = {
      data: [],
      count: null,
      first: false,
      establishments: {},
      input: {
        name: "",
        description: "",
        totalCodes: "",
        scannedCodes: "",
        cost: "",
        initialDate: "",
        initialHour: "",
        endDate: "",
        endHour: "",
      },
      discount: {
        id: 0,
        name: "",
        description: "",
        totalCodes: "",
        scannedCodes: "",
        cost: "",
        initialDate: "",
        initialHour: "",
        endDate: "",
        endHour: "",
      },
      initialDate: "",
      sendFinal: {},
      modalCreate: false,
      errors: {},
      msg: "",
      errorApiGet: {},
      errorApiUpdate: {},
      errorApiDelete: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.counterPag = this.counterPag.bind(this);
  }

  async getDiscount(number) {
    var token = sessionStorage.getItem("token");
    var query = window.location.pathname;
    var splited = query.split("/");
    var id_establishment = splited[3];
    const urlGet =
      "https://develop-backend-sprint-01.herokuapp.com/v1/establishments/" +
      id_establishment +
      "/discounts/getExpire?page=" +
      number;

    const get = await fetch(urlGet, {
      method: "GET",
      headers: {
        token: token,
        apiKey: "8dDc431125634ef43cD13c388e6eCf11",
      },
    });

    const data = await get.json();
    this.setState({
      data: data.results,
    });
    if (this.state.first === false) {
      this.counterPag(data.count);
      this.setState({
        first: true,
      });
    }
  }

  counterPag(number) {
    var countAux = 0;
    var array = [];
    countAux = Math.ceil(number / 7);
    for (var i = 1; i <= countAux; i++) {
      array.push(i);
    }
    this.setState({
      count: array,
    });
  }

  async handleUpdate() {
    var token = sessionStorage.getItem("token");
    var query = window.location.pathname;
    var splited = query.split("/");
    var id_establishment = splited[3];
    var id_discount = this.state.discount.id;

    const urlUpdate =
      "https://develop-backend-sprint-01.herokuapp.com/v1/establishments/" +
      id_establishment +
      "/discounts/" +
      id_discount +
      "/update";

    const response = await fetch(urlUpdate, {
      method: "PUT",
      headers: {
        token: token,
        "Content-type": "application/json",
      },
      body: JSON.stringify(this.state.sendFinal),
    });

    if (response.ok) {
      const data = await response.json();
      this.setState({
        msg: data.msg,
      });
      setTimeout(() => {
        this.setState({
          modalCreate: false,
          msg: "",
        });
        this.getDiscount(1);
      }, 2000);
    } else {
      const data = await response.json();
      this.setState({
        errorApiUpdate: data,
      });
    }
  }

  async handleChange(event) {
    await this.setState({
      input: {
        ...this.state.input,
        [event.target.name]: event.target.value,
      },
    });
  }

  selectDiscount(discount) {
    const initDate = discount.initial_date.slice(0, 10);
    const initHour = parseInt(discount.initial_date.slice(11, 13)) + 2;
    const initMinute = discount.initial_date.slice(13, 16);
    const initHourMinute = initHour.toString() + initMinute;
    if (discount.end_date != null) {
      const endDate = discount.end_date.slice(0, 10);
      const endHour = parseInt(discount.end_date.slice(11, 13)) + 2;
      const endMinute = discount.end_date.slice(13, 16);
      const endHourMinute = endHour.toString() + endMinute;

      this.setState({
        discount: {
          id: discount.id,
          name: discount.name_text,
          description: discount.description_text,
          totalCodes: discount.totalCodes_number,
          scannedCodes: discount.scannedCodes_number,
          cost: discount.cost_number,
          initialDate: initDate,
          initialHour: initHourMinute,
          endDate: endDate,
          endHour: endHourMinute,
        },

        input: {
          name: discount.name_text,
          description: discount.description_text,
          totalCodes: discount.totalCodes_number,
          scannedCodes: discount.scannedCodes_number,
          cost: discount.cost_number,
          initialDate: initDate,
          initialHour: initHourMinute,
          endDate: endDate,
          endHour: endHourMinute,
        },
        initialDate: moment.utc(discount.initial_date).unix(),
        errors: {},
        msg: "",
        errorApiGet: {},
        errorApiUpdate: {},
        errorApiDelete: {},
      });
    } else {
      this.setState({
        discount: {
          id: discount.id,
          name: discount.name_text,
          description: discount.description_text,
          totalCodes: discount.totalCodes_number,
          scannedCodes: discount.scannedCodes_number,
          cost: discount.cost_number,
          initialDate: initDate,
          initialHour: initHourMinute,
          endDate: "",
          initHour: "",
        },

        input: {
          name: discount.name_text,
          description: discount.description_text,
          totalCodes: discount.totalCodes_number,
          scannedCodes: discount.scannedCodes_number,
          cost: discount.cost_number,
          initialDate: initDate,
          initialHour: initHourMinute,
          endDate: "",
          endHour: "",
        },
        initialDate: moment.utc(discount.initial_date).unix(),
        errors: {},
        msg: "",
        errorApiGet: {},
        errorApiUpdate: {},
        errorApiDelete: {},
      });
    }
  }

  handleSubmit() {
    let inputs = this.state.input;
    let send = {};
    var today = new Date();
    var todayTS = moment.utc(today).unix();
    if (this.validate()) {
      const initialDateTS = moment
        .utc(`${inputs.initialDate} ${inputs.initialHour}`)
        .unix();
      if (inputs.endDate !== "" && inputs.endHour !== "") {
        const endDateTs = moment
          .utc(`${inputs.endDate} ${inputs.endHour}`)
          .subtract(2, "hours")
          .unix();
        if (todayTS > initialDateTS) {
          send["name"] = inputs.name;
          send["description"] = inputs.description;
          send["cost"] = parseFloat(inputs.cost);
          send["totalCodes"] = parseInt(inputs.totalCodes);
          send["scannedCodes"] = parseInt(inputs.scannedCodes);
          send["initialDate"] = this.state.initialDate;
          send["endDate"] = endDateTs;

          this.state.sendFinal = send;

          this.handleUpdate();
        } else {
          send["name"] = inputs.name;
          send["description"] = inputs.description;
          send["cost"] = parseFloat(inputs.cost);
          send["totalCodes"] = parseInt(inputs.totalCodes);
          send["scannedCodes"] = parseInt(inputs.scannedCodes);
          send["initialDate"] = initialDateTS - 7200;
          send["endDate"] = endDateTs;

          this.state.sendFinal = send;
          this.handleUpdate();
        }
      } else {
        if (todayTS > initialDateTS) {
          send["name"] = inputs.name;
          send["description"] = inputs.description;
          send["cost"] = parseFloat(inputs.cost);
          send["totalCodes"] = parseInt(inputs.totalCodes);
          send["scannedCodes"] = parseInt(inputs.scannedCodes);
          send["initialDate"] = this.state.initialDate;

          this.state.sendFinal = send;
          this.handleUpdate();
        } else {
          send["name"] = inputs.name;
          send["description"] = inputs.description;
          send["cost"] = parseFloat(inputs.cost);
          send["totalCodes"] = parseInt(inputs.totalCodes);
          send["scannedCodes"] = parseInt(inputs.scannedCodes);
          send["initialDate"] = initialDateTS - 7200;

          this.state.sendFinal = send;
          this.handleUpdate();
        }
      }
    }
  }

  validateDelete() {
    let isValid = true;
    var today = new Date();
    let errors = {};

    const scannedCodes = this.state.discount.scannedCodes;
    const endDate = this.state.discount.endDate;

    if (scannedCodes > 0) {
      isValid = false;
      errors["errorCodes"] =
        "No se puede eliminar porque hay descuentos escaneados";
    }

    if (endDate !== "") {
      if (today > endDate) {
        isValid = false;
        errors["errorDate"] =
          "No se puede eliminar porque el descuento ya ha finalizado";
      }
    }
    this.setState({
      errors: errors,
    });
    return isValid;
  }

  validate() {
    let inputs = this.state.input;
    let discount = this.state.discount;
    let errors = {};
    let isValid = true;
    var today = new Date();

    if (!inputs["initialDate"] || !inputs["initialHour"]) {
      isValid = false;
      errors["initialDate"] = "Debe proporcionar una fecha y hora de inicio";
      this.setState({
        errors: errors,
      });

      return isValid;
    } else {
      var initialDateFull = new Date(
        inputs["initialDate"].concat(" ", inputs["initialHour"])
      );
    }

    // if(initialDateFull < today){
    //   isValid = false;
    //   errors["initialDate"] = "La fecha debe ser mayor a la actual";
    //   this.setState({
    //     errors: errors,
    //   });

    //   return isValid;
    // }

    if (inputs["endDate"] && inputs["endHour"]) {
      var endDateFull = new Date(
        inputs["endDate"].concat(" ", inputs["endHour"])
      );
    }

    if (!inputs["name"].trim()) {
      isValid = false;

      errors["name"] = "Escriba un nombre del descuento.";
    }

    if (!inputs["cost"] || inputs["cost"] <= 0) {
      isValid = false;

      errors["cost"] = "Escriba un precio para el descuento.";
    }

    if (!inputs["description"].trim()) {
      isValid = false;

      errors["description"] = "Escriba una descripción para el descuento";
    }

    if (!inputs["totalCodes"] || inputs["totalcodes"] <= 0) {
      isValid = false;

      errors["totalCodes"] = "Escriba un número total de códigos.";
    }

    if (inputs["totalCodes"] < inputs["scannedCodes"]) {
      isValid = false;
      errors["totalCodes"] =
        "El número total de códigos no puede ser menor que los escaneados";
    }

    if (today > initialDateFull) {
      if (inputs["name"] !== discount.name) {
        isValid = false;
        errors["name"] =
          "Una vez empezado el descuento no se puede modificar el nombre";
      }
      if (inputs["description"] !== discount.description) {
        isValid = false;
        errors["description"] =
          "Una vez empezado el descuento no se puede modificar la descripción";
      }

      if (inputs["cost"] !== discount.cost) {
        isValid = false;
        errors["cost"] =
          "Una vez empezado el descuento no se puede modificar la descripción";
      }

      if (
        new Date(inputs["initialDate"].concat(" ", inputs["initialHour"])) <
        today
      ) {
        isValid = false;
        errors["initialDate"] = "La fecha inicial debe ser mayor a la de hoy";
      }

      if (inputs["scannedCodes"] !== discount.scannedCodes) {
        isValid = false;
        errors["scannedCodes"] =
          "Una vez empezado el descuento no se puede modificar el número de descuentos escaneados";
      }

      if (endDateFull !== undefined) {
        if (endDateFull < initialDateFull) {
          isValid = false;
          errors["endDate"] =
            "La fecha final no puede ser menor que la fecha inicial";
        }

        if (endDateFull < today) {
          isValid = false;
          errors["endDate"] =
            "La fecha final debe ser mayor que la fecha actual";
        }
      }
    }

    if (initialDateFull > today) {
      if (
        new Date(discount.initialDate.concat(" ", discount.initialHour)) <
          today &&
        inputs["initialDate"].concat(" ", inputs["initialHour"]) !==
          discount.initialDate.concat(" ", discount.initialHour)
      ) {
        isValid = false;
        errors["initialDate"] =
          "Una vez empezado el descuento no se puede modificar la fecha inicial";
      }
      if (endDateFull !== undefined) {
        if (endDateFull < initialDateFull) {
          isValid = false;
          errors["endDate"] =
            "La fecha final no puede ser menor que la fecha incial";
        }
        if (endDateFull < today) {
          isValid = false;
          errors["endDate"] =
            "La fecha final debe ser mayor que la fecha actual";
        }
      }
    }

    this.setState({
      errors: errors,
    });

    return isValid;
  }

  componentDidMount() {
    this.getDiscount(1);
  }

  render() {
    return (
      <>
        <Table responsive>
          <thead>
            <tr className="text-center">
              <th>Nombre</th>
              <th>Códigos totales</th>
              <th>Códigos escaneados</th>
              <th>Fecha vencimiento</th>
              <th>Renovar</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data === []
              ? ""
              : this.state.data.map((discount) => {
                  return (
                    <tr className="text-center">
                      <td>{discount.name_text}</td>
                      <td>{discount.totalCodes_number}</td>
                      <td>{discount.scannedCodes_number}</td>
                      <td>{discount.end_date.slice(0,10)}</td>

                      <td>
                        <OverlayTrigger
                          overlay={
                            <Tooltip id="tooltip-506045838">
                              Renovar descuento
                            </Tooltip>
                          }
                        >
                          <DiscountRenew discount = {discount}/>
                        </OverlayTrigger>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </Table>

        {this.state.count === null ? (
          ""
        ) : (
          <Pagination aria-label="Page navigation example">
            {this.state.count.map((number) => {
              return (
                <PaginationItem>
                  <PaginationLink onClick={() => this.getDiscount(number)}>
                    {number}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
          </Pagination>
        )}
        {this.state.input === "" ? (
          ""
        ) : (
          <>
            <Modal
              isOpen={this.state.modalCreate}
              toggle={() => this.setState({ modalCreate: false })}
            >
              <div className="modal-header justify-content-center">
                <button
                  className="close"
                  type="button"
                  onClick={() => this.setState({ modalCreate: false })}
                >
                  <i className="now-ui-icons ui-1_simple-remove"></i>
                </button>
                <h4 id="title_discount" className="title title-up">
                  Editar Descuento
                </h4>
              </div>
              <ModalBody>
                <div className="form-group">
                  <label>Nombre</label>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    maxLength="50"
                    value={this.state.input.name}
                    onChange={this.handleChange}
                  />
                  <div className="text-danger pl-3">
                    {this.state.errors.name}
                  </div>
                  <label>Descripción</label>
                  <input
                    className="form-control"
                    type="text"
                    name="description"
                    maxLength="140"
                    value={this.state.input.description}
                    onChange={this.handleChange}
                  />
                  <div className="text-danger pl-3">
                    {this.state.errors.description}
                  </div>
                  <label>Códigos Totales</label>
                  <input
                    className="form-control"
                    type="number"
                    name="totalCodes"
                    value={this.state.input.totalCodes}
                    onChange={this.handleChange}
                  />
                  <div className="text-danger pl-3">
                    {this.state.errors.totalCodes}
                  </div>
                  <label>Códigos Escaneados</label>
                  <input
                    className="form-control"
                    type="number"
                    name="scannedCodes"
                    readOnly
                    value={this.state.input.scannedCodes}
                    onChange={this.handleChange}
                  />
                  <div className="text-danger pl-3">
                    {this.state.errors.scannedCodes}
                  </div>
                  <label>Coste</label>
                  <input
                    className="form-control"
                    type="number"
                    name="cost"
                    value={this.state.input.cost}
                    onChange={this.handleChange}
                  />
                  <div className="text-danger pl-3">
                    {this.state.errors.cost}
                  </div>
                  <div className="row">
                    <div className="col">
                      <label>Fecha de Inicio</label>
                      <input
                        className="form-control"
                        type="date"
                        name="initialDate"
                        value={this.state.input.initialDate}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="col">
                      <label>Hora de Inicio</label>
                      <input
                        className="form-control"
                        type="time"
                        name="initialHour"
                        value={this.state.input.initialHour}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="text-danger pl-3">
                      {this.state.errors.initialDate}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <label>Fecha de Fin</label>
                      <input
                        className="form-control"
                        type="date"
                        name="endDate"
                        value={this.state.input.endDate}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="col">
                      <label>Hora de Fin</label>
                      <input
                        className="form-control"
                        type="time"
                        name="endHour"
                        value={this.state.input.endHour}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="text-danger pl-3">
                      {this.state.errors.endDate}
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <button
                  className="btn btn-primary"
                  onClick={() => this.handleSubmit()}
                >
                  Guardar cambios
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => this.setState({ modalCreate: false })}
                >
                  Cancelar
                </button>
                <div className="container-fluid bg-danger">
                  <div className="text-white fw-bold text-center">
                    {this.state.errorApiUpdate === undefined
                      ? ""
                      : this.state.errorApiUpdate.error}
                  </div>
                </div>
                <div className="container-fluid bg-success">
                  <div className="text-white fw-bold text-center">
                    {this.state.msg === undefined ? "" : this.state.msg}
                  </div>
                </div>
              </ModalFooter>
            </Modal>

          </>
        )}
      </>
    );
  }
}