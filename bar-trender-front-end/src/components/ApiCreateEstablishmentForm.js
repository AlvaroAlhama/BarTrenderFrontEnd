import React from "react";
import Select from "react-select";
import {
  CustomInput,
  FormGroup,
  Row,
  Col,
  Button,
  Label,
  Modal,
  ModalBody,
} from "reactstrap";

class ApiCreateEstablishmentForm extends React.Component {
  constructor() {
    super();

    this.state = {
      input: {
        name_text: "",
        cif_text: "",
        phone_number: "",
        street_text: "",
        number_text: "",
        locality_text: "",
        zone_enum: "",
        desc_text: "",
        tags: [],
      },

      image: undefined,

      selected: [],

      tagsChange: [],

      otherTags: [],

      zone: {
        zona: [],
      },

      errors: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogin = this.handleCreate.bind(this);
    this.getTags();
    this.getZones();
  }

  async getTags() {
    var token = sessionStorage.getItem("token");

    const url =
      "https://develop-backend-sprint-01.herokuapp.com/v1/establishments/get_tags";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        token: token,
        apiKey: "8dDc431125634ef43cD13c388e6eCf11",
      },
    });
    const data = await response.json();

    this.state.otherTags = data.tags;
  }

  async getZones() {
    const url =
      "https://develop-backend-sprint-01.herokuapp.com/v1/establishments/get_zones?all=true";
    const response = await fetch(url, {
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json();
      this.setState({
        zone: {
          zona: data.zones,
        },
      });
    }
  }

  translateError(error) {
    if (error.includes("V001")) {
      this.setState({
        errors: {
          error: "El CIF ya existe o no es válido",
        },
      });
    } else {
      this.setState({
        errors: {
          error: error,
        },
      });
    }
  }

  async handleCreate() {
    var token = sessionStorage.getItem("token");


    var createUpload = new FormData();
    createUpload.append("name_text", this.state.input.name_text);
    createUpload.append("desc_text", this.state.input.desc_text);
    createUpload.append("cif_text", this.state.input.cif_text);
    createUpload.append("phone_number", this.state.input.phone_number);
    createUpload.append("zone_enum", this.state.input.zone_enum);
    createUpload.append("tags", this.state.selected);
    createUpload.append("number_text", this.state.input.number_text);
    createUpload.append("street_text", this.state.input.street_text);
    createUpload.append("locality_text", this.state.input.locality_text);

    if (this.state.input.desc_text) {
      createUpload.append("desc_text", this.state.input.desc_text.trim());
    } else {
      createUpload.append("desc_text", "");
    }

    if (this.state.image) {
      createUpload.append("image_name", this.state.image.name);

      const toBase64 = (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });

      createUpload.append("image", await toBase64(this.state.image));
    }

    var object = {};
    createUpload.forEach(function (value, key) {
      object[key] = value;
    });
    var json = JSON.stringify(object);

    const url =
      "https://develop-backend-sprint-01.herokuapp.com/v1/establishments/create";

    const create = await fetch(url, {
      method: "POST",
      headers: {
        token: token,
        "Content-type": "application/json",
      },
      body: json,
    });
    var response;

    if (create.ok) {
      response = await create.json();
      this.setState({ msg: response.msg, modalSuccess: true });
    } else {
      response = await create.json();
      this.translateError(response.error);
      setTimeout(() => {
        this.setState({
          errors: {},
        });
      }, 2000);
    }
  }

  async handleChange(event) {
    let input = this.state.input;
    let selected = this.state.selected;
    var element_number;
    if(event.target.type ==="checkbox"){
      element_number = selected.findIndex(obj => obj === event.target.name)
      if (element_number !== -1){
        selected.splice(element_number,1);
      }
      else{
        selected.push(event.target.name);
      }
    }
    else{
      input[event.target.name] = event.target.value;
    }
    this.setState({
      input, selected
    });    
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.validate()) {
      this.handleCreate();
    }
  }
  validate() {
    let input = this.state.input;
    let selecteds = this.state.selected;
    let errors = {};
    let isValid = true;
    var pattern;
    if (!input["name_text"].trim()) {
      isValid = false;

      errors["name_text"] = "Introduzca un nombre para el establecimiento.";
    }
    if (!input["street_text"].trim()) {
      isValid = false;

      errors["street_text"] =
        "Introduzca una localización para el establecimiento.";
    }
    if (!input["locality_text"].trim()) {
      isValid = false;

      errors["locality_text"] =
        "Introduzca una localidad para el establecimiento.";
    }

    if (!input["number_text"].trim()) {
      isValid = false;

      errors["number_text"] =
        "Introduzca un número para la calle de la localización del establecimiento.";
    }

    if (input["number_text"]) {
      pattern = new RegExp(/^\D*\d{1,3}([A-Z]{1,2})?$/);
      if (!pattern.test(input["number_text"])) {
        isValid = false;
        errors["number_text"] =
          "El número de la dirección debe contener de 1 a 3 números con posibilidad de 2 letras";
      }
    }

    if (!input["cif_text"].trim()) {
      isValid = false;

      errors["cif_text"] = "Introduzca el CIF del establecimiento";
    }

    if (input["cif_text"]) {
      pattern = new RegExp(/^[a-zA-Z]{1}\d{7}[a-zA-Z0-9]{1}$/);
      if (!pattern.test(input["cif_text"])) {
        isValid = false;
        errors["cif_text"] = "Introduzca un CIF correcto.";
      }
    }

    if (!input["phone_number"]) {
      isValid = false;
      errors["phone_number"] = "Debe proporcionar un número de teléfono";
    }

    if (input["phone_number"]) {
      pattern = new RegExp(/^\d{9}$/);
      if (!pattern.test(input["phone_number"])) {
        isValid = false;
        errors["phone_number"] = "El télefono introducido no es válido";
      }
    }

    if (selecteds.length === 0) {
      isValid = false;
      errors["tags_selected"] =
        "Debe asignar algunas etiquetas que referencien a su establecimiento";
    }

    if (!input["zone_enum"]) {
      isValid = false;
      errors["zone_enum"] =
        "Debe asignar una zona próxima a su establecimiento";
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
              <label>Nombre del establecimiento</label>
              <input
                type="text"
                name="name_text"
                value={this.state.input.name_text}
                onChange={this.handleChange}
                maxLength="100"
                className="form-control"
                id="name_text"
              />

              <div className="text-danger">{this.state.errors.name_text}</div>
            </div>
            <div className="form-group my-1">
              <label>CIF del establecimiento</label>
              <input
                type="text"
                name="cif_text"
                maxLength="9"
                value={this.state.input.cif_text}
                onChange={this.handleChange}
                className="form-control"
                id="cif_text"
              />

              <div className="text-danger">{this.state.errors.cif_text}</div>
            </div>
            <div className="form-group my-1">
              <label>Descripción del establecimiento</label>
              <input
                type="text"
                name="desc_text"
                maxLength="200"
                value={this.state.input.desc_text}
                onChange={this.handleChange}
                className="form-control"
                id="desc_text"
              />

              <div className="text-danger">{this.state.errors.desc_text}</div>
            </div>

            <div className="form-group my-1">
              <label>Número de teléfono</label>
              <input
                type="tel"
                name="phone_number"
                value={this.state.input.phone_number}
                onChange={this.handleChange}
                className="form-control"
                id="phone_number"
              />
              <div className="text-danger">
                {this.state.errors.phone_number}
              </div>
            </div>

            <div className="form-group my-1">
              <label>Calle</label>
              <input
                type="text"
                name="street_text"
                maxLength="50"
                value={this.state.input.street_text}
                onChange={this.handleChange}
                className="form-control"
              />

              <div className="text-danger">{this.state.errors.street_text}</div>
            </div>

            <div className="form-group my-1">
              <label>Número</label>
              <input
                type="text"
                name="number_text"
                value={this.state.input.number_text}
                onChange={this.handleChange}
                className="form-control"
              />

              <div className="text-danger">{this.state.errors.number_text}</div>
            </div>
            <div className="form-group my-1">
              <label>Localidad</label>
              <input
                type="text"
                name="locality_text"
                maxLength="50"
                value={this.state.input.locality_text}
                onChange={this.handleChange}
                className="form-control"
              />

              <div className="text-danger">
                {this.state.errors.locality_text}
              </div>
            </div>
            <FormGroup className="pt-2">
              <Label for="establishmentImage">Imagen</Label>
              <CustomInput
                type="file"
                id="establishmentImage"
                name="image"
                label="Sube tu foto"
                onChange={(e) => this.setState({ image: e.target.files[0] })}
              />
            </FormGroup>

            <div className="form-group my-1">
              <label>Zona</label>
              <select
                name="zone_enum"
                value={this.state.input.zone_enum}
                onChange={this.handleChange}
                className="form-control"
              >
                <option value="">Selecciona una zona</option>
                {this.state.zone.zona.map((zona) => {
                  return <option value={zona}>{zona}</option>;
                })}
              </select>
              <div className="text-danger">{this.state.errors.zone_enum}</div>
            </div>
            <div className="form-group my-1">
            <label for="tags">Tags</label>

              <Row id="tags" className="text-primary justify-content-center">
                <div class="col-2">
                  <Button
                    className="bg-transparent"
                    onClick={() => {
                      document
                        .getElementsByClassName("tag-active")[0]
                        .classList.add("d-none");
                      document
                        .getElementsByClassName("tag-active")[0]
                        .classList.remove("tag-active");
                      document
                        .getElementById("content-tag-ocio")
                        .classList.remove("d-none");
                      document
                        .getElementById("content-tag-ocio")
                        .classList.add("tag-active");
                    }}
                  >
                    <i
                      color="primary"
                      id="create-tooltip"
                      className="fal fa-bowling-ball w-100 text-primary"
                      style={{ fontSize: "1.5rem" }}
                    ></i>
                  </Button>
                </div>
                <div class="col-2">
                  <Button
                    className="bg-transparent"
                    onClick={() => {
                      document
                        .getElementsByClassName("tag-active")[0]
                        .classList.add("d-none");
                      document
                        .getElementsByClassName("tag-active")[0]
                        .classList.remove("tag-active");
                      document
                        .getElementById("content-tag-bebida")
                        .classList.remove("d-none");
                      document
                        .getElementById("content-tag-bebida")
                        .classList.add("tag-active");
                    }}
                  >
                    <i
                      color="primary"
                      class="fal fa-beer w-100 text-primary"
                      style={{ fontSize: "1.5rem" }}
                    ></i>
                  </Button>
                </div>
                <div class="col-2">
                  <Button
                    className="bg-transparent"
                    onClick={() => {
                      document
                        .getElementsByClassName("tag-active")[0]
                        .classList.add("d-none");
                      document
                        .getElementsByClassName("tag-active")[0]
                        .classList.remove("tag-active");
                      document
                        .getElementById("content-tag-estilo")
                        .classList.remove("d-none");
                      document
                        .getElementById("content-tag-estilo")
                        .classList.add("tag-active");
                    }}
                  >
                    <i
                      color="primary"
                      class="fal fa-chess-rook w-100 text-primary"
                      style={{ fontSize: "1.5rem" }}
                    ></i>
                  </Button>
                </div>
                <div class="col-2">
                  <Button
                    className="bg-transparent"
                    onClick={() => {
                      document
                        .getElementsByClassName("tag-active")[0]
                        .classList.add("d-none");
                      document
                        .getElementsByClassName("tag-active")[0]
                        .classList.remove("tag-active");
                      document
                        .getElementById("content-tag-ambiente")
                        .classList.remove("d-none");
                      document
                        .getElementById("content-tag-ambiente")
                        .classList.add("tag-active");
                    }}
                  >
                    <i
                      color="primary"
                      class="fal fa-gramophone w-100 text-primary"
                      style={{ fontSize: "1.5rem" }}
                    ></i>
                  </Button>
                </div>
                <div class="col-2">
                  <Button
                    className="bg-transparent"
                    onClick={() => {
                      document
                        .getElementsByClassName("tag-active")[0]
                        .classList.add("d-none");
                      document
                        .getElementsByClassName("tag-active")[0]
                        .classList.remove("tag-active");
                      document
                        .getElementById("content-tag-zona")
                        .classList.remove("d-none");
                      document
                        .getElementById("content-tag-zona")
                        .classList.add("tag-active");
                    }}
                  >
                    <i
                      color="primary"
                      class="now-ui-icons location_world w-100 text-primary"
                      style={{ fontSize: "1.5rem" }}
                    ></i>
                  </Button>
                </div>
              </Row>

              <Row className="tag-active" id="content-tag-ocio">
                <h4 className="text-primary text-center w-100 mt-0">Ocio</h4>
                {this.state.otherTags.map((t) => {
                  if (t.type == "Ocio") {
                    return (
                      <Col lg="4" md="4" xs="6">
                        <input type="checkbox" name={t.name} value="True" id={t.name} onChange={this.handleChange} />
                        <label className="ml-2" for={t.name}>
                          {t.name}
                        </label>
                      </Col>
                    );
                  }
                })}
              </Row>
              <Row className="d-none" id="content-tag-bebida">
              <h4 className="text-primary text-center w-100 mt-0">Bebida</h4>
                {this.state.otherTags.map((t) => {
                  if (t.type == "Bebida") {
                    return (
                      <Col lg="4" md="4" xs="6">
                        <input type="checkbox" name={t.name} value="True" id={t.name} onChange={this.handleChange} />
                        <label className="ml-2" for={t.name}>
                          {t.name}
                        </label>
                      </Col>
                    );
                  }
                })}
              </Row>
              <Row className="d-none" id="content-tag-estilo">
              <h4 className="text-primary text-center w-100 mt-0">Estilo</h4>
                {this.state.otherTags.map((t) => {
                  if (t.type == "Estilo") {
                    return (
                      <Col lg="4" md="4" xs="6">
                        <input type="checkbox" name={t.name} value="True" id={t.name} onChange={this.handleChange}/>
                        <label className="ml-2" for={t.name}>
                          {t.name}
                        </label>
                      </Col>
                    );
                  }
                })}
              </Row>
              <Row className="d-none" id="content-tag-ambiente">
              <h4 className="text-primary text-center w-100 mt-0">Ambiente</h4>
                {this.state.otherTags.map((t) => {
                  if (t.type == "Ambiente") {
                    return (
                      <Col lg="4" md="4" xs="6">
                        <input type="checkbox" name={t.name} value="True" id={t.name} onChange={this.handleChange} />
                        <label className="ml-2" for={t.name}>
                          {t.name}
                        </label>
                      </Col>
                    );
                  }
                })}
              </Row>
              <Row className="d-none" id="content-tag-zona">
              <h4 className="text-primary text-center w-100 mt-0">Zona</h4>
                {this.state.otherTags.map((t) => {
                  if (t.type == "Zona") {
                    return (
                      <Col lg="4" md="4" xs="6">
                        <input type="checkbox" name={t.name} value="True" id={t.name} onChange={this.handleChange} />
                        <label className="ml-2" for={t.name}>
                          {t.name}
                        </label>
                      </Col>
                    );
                  }
                })}
              </Row>

              <div className="text-danger">
                {this.state.errors.tags_selected}
              </div>
            </div>

            <div className="text-center">
              <input
                type="submit"
                value="Añadir establecimiento"
                className="btn btn-primary"
              />
            </div>
            <div className="container-fluid bg-danger">
              <div className="text-white fw-bold text-center">
                {this.state.errors === {} ? "" : this.state.errors.error}
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
            <h4 className="title title-up">¡ÉXITO!</h4>
          </div>
          <ModalBody>
            <div className="mt-2 mb-4 text-center">
              <p className="text-success"> Establecimiento creado con éxito</p>
            </div>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

export default ApiCreateEstablishmentForm;
