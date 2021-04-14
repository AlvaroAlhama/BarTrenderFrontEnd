import React from "react";
import moment from "moment";
import { Label, Modal, ModalBody } from "reactstrap";

class ApiCreateEstablishmentForm extends React.Component {
  constructor() {
    super();

    this.state = {
      input: {},

      tags: [],

      tags_group: {
        ocio: [],
        bebida: [],
        zona: [],
        instalacion: [],
      },

      errors: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogin = this.handleCreate.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.changeTag = this.changeTag.bind(this);

    this.getTags();
  }

  async getTags() {
    let errors = {};
    var token = sessionStorage.getItem("token");

    const url =
      "http://develop-backend-sprint-01.herokuapp.com/v1/establishments/get_tags";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        token: token,
        apiKey: "8dDc431125634ef43cD13c388e6eCf11",
      },
    });
    console.log(response);
    const data = await response.json();
    this.state.tags = data.tags;
    console.log("Aqui tags constructor");
    console.log(this.state.tags);
  }

  async handleCreate() {
    let errors = {};
    var token = sessionStorage.getItem("token");
    var query = window.location.pathname;
    var splited = query.split("/");
    var idEstablishment = splited[3];
    const url =
      "https://develop-backend-sprint-01.herokuapp.com/v1/establishments/" +
      idEstablishment +
      "/discounts/create";

    console.log(this.state.send);
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
      var response = await create.json();
      this.setState({ errors: response.error, modalFail: true });
    }
  }

  handleSend() {
    const initialDate = this.state.input.initialDate;
    const initialTime = this.state.input.initialTime;
    const timeStampInitial = moment.utc(`${initialDate} ${initialTime}`).unix();

    const endDate = this.state.input.endDate;

    const endTime = this.state.input.endTime;

    if (endDate != undefined) {
      const timeStampEnd = moment.utc(`${endDate} ${endTime}`).unix();

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

      input["name_text"] = "";

      input["cif_text"] = "";

      input["phone_number"] = "";

      input["zone_enum"] = "";

      input["tags"] = "";

      this.handleSend(event);
    }
  }
  async changeTag(tag_type){
    if(tag_type == "Ocio"){
      console.log("AQUI ACTIVE TAG")
      console.log(document.getElementsByClassName("active-tag"))
      document.getElementsByClassName("active-tag").classList.add('d-none');
      document.getElementById("active-tag").classList.remove("active-tag");
      document.getElementById("content-ocio").classList.remove("d-none");
      document.getElementById("content-ocio").classList.add("active-tag");
    }
    if(tag_type == "Bebida"){
      document.getElementsByClassName("active-tag").classList.add("d-none");
      document.getElementsByClassName("active-tag").classList.remove("active-tag");
      document.getElementById("content-bebida").classList.remove("d-none");
      document.getElementById("content-bebida").classList.add("active-tag");
    }

    if(tag_type == "Zona"){
      document.getElementsByClassName("active-tag").classList.add("d-none");
      document.getElementsByClassName("active-tag").classList.remove("active-tag");
      document.getElementById("content-zona").classList.remove("d-none");
      document.getElementById("content-zona").classList.add("active-tag");
    }

    if(tag_type == "Instalacion"){
      document.getElementsByClassName("active-tag").classList.add("d-none");
      document.getElementsByClassName("active-tag").classList.remove("active-tag");
      document.getElementById("content-instalacion").classList.remove("d-none");
      document.getElementById("content-instalacion").classList.add("active-tag");
    }
  }


  validate() {
    let input = this.state.input;

    var today = new Date();

    let errors = {};

    let isValid = true;

    if (!input["name_text"]) {
      isValid = false;

      errors["name_text"] = "Introduzca un nombre para el establecimiento.";
    }

    if (input["cif_text"]) {
      isValid = false;
      var pattern = new RegExp(/^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/);
      if (!pattern.test(input["cif_text"])) {
        errors["cif_text"] = "Introduzca un CIF correcto.";
      }
    }

    if (!input["cif_text"]) {
      isValid = false;

      errors["cif_text"] = "Introduzca el CIF del establecimiento";
    }
    if (
      !input["phone_number"] ||
      (input["phone_number"] / 100000000 < 0 &&
        input["phone_number"] / 100000000 < 10)
    ) {
      isValid = false;

      errors["phone_number"] =
        "Introduzca un número de teléfono para el establecimiento.";
    }
    if (!input["zone_enum"]) {
      isValid = false;

      errors["zone_enum"] =
        "Introduzca la zona en la cuál se encuentra el establecimiento.";
    }

    if (!input["tags"]) {
      isValid = false;

      errors["tags"] =
        "Introduzca al menos una etiqueta para su establecimiento.";
    }

    this.setState({
      errors: errors,
    });

    return isValid;
  } 
  render() {
    console.log("AQUI ESTADO");
    console.log(this.state.tags);
    this.state.tags.map((tag) => {
      console.log(tag.type)
      if (tag.type == "Ocio") {
        this.state.tags_group.ocio.concat(tag.name);
        console.log("AQUI OCIO")
        console.log(this.state.tags_group.ocio);
      }
      if (tag.type == "Bebida") {
        this.state.tags_group.bebida.concat(tag);
      }
      if (tag.type == "Zona") {
        this.state.tags_group.zona.concat(tag);
      }
      if (tag.type == "Instalacion") {
        this.state.tags_group.instalacion.concat(tag);
      }
    });
    return (
      <>
        <div>
          <form onSubmit={this.handleSubmit}>
            <div class="form-group my-1">
              <input
                type="text"
                name="name_text"
                value={this.state.input.name_text}
                onChange={this.handleChange}
                class="form-control"
                placeholder="Nombre del establecimiento"
                id="name_text"
              />

              <div className="text-danger">{this.state.errors.name_text}</div>
            </div>
            <div class="form-group my-1">
              <input
                type="text"
                name="cif_text"
                value={this.state.input.cif_text}
                onChange={this.handleChange}
                class="form-control"
                placeholder="Nombre del establecimiento"
                id="cif_text"
              />

              <div className="text-danger">{this.state.errors.cif_text}</div>
            </div>

            <div class="form-group my-1">
              <input
                type="number"
                name="phone_number"
                value={this.state.input.phone_number}
                onChange={this.handleChange}
                class="form-control"
                placeholder="Número de teléfono del establecimiento."
                id="cif_text"
              />
              <div className="text-danger">
                {this.state.errors.phone_number}
              </div>
            </div>
            <div class="form-group my-1">
              <input
                type="text"
                name="zone_enum"
                value={this.state.input.zone_enum}
                onChange={this.handleChange}
                class="form-control"
                placeholder="Zona del establecimiento"
              />

              <div class="text-danger">{this.state.errors.zone_enum}</div>
            </div>
            <div class="card">
              <div class="card-header">
                <ul class="nav nav-tabs nav-pills-info nav-pills-just-icons row justify-content-between">
                  <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="#" onClick={this.changeTag("Ocio")}>
                    <i class="fal fa-bowling-ball fa-2x w-100"></i>                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#" onClick={this.changeTag("Bebida")}>
                      <i class="fal fa-beer fa-2x w-100"></i>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#" onClick={this.changeTag("Zona")}>
                      <i class="fal fa-globe-europe fa-2x w-100"></i>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      href="#"
                      onClick={this.changeTag("Instalacion")}>
                      <i class="fal fa-umbrella-beach fa-2x w-100"></i>
                    </a>
                  </li>
                </ul>
              </div>
              <div class="card-body tab-content">
              <div className="active-tag">
                  <h1> ocio</h1>
              </div>
              <div className="d-none">
              <h1> bebida</h1>
              </div>
              <div className="d-none">
              <h1> Zona</h1>
              </div>
              <div className="d-none">
              <h1> Instalacion</h1>
              </div>
                <div class="text-center">
                  <input
                    type="submit"
                    value="Añadir establecimiento"
                    class="btn btn-primary"
                  />
                </div>
              </div>
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
      </>
    );
  }
}

export default ApiCreateEstablishmentForm;
