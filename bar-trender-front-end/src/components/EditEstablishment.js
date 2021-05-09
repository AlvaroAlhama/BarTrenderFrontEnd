import React, { createRef } from "react";
import Select from "react-select";
import {
  CustomInput,
  FormGroup,
  Label,
  Modal,
  ModalBody,
  Button,
  Row,
  Spinner,
} from "reactstrap";
import POSTCreateDiscount from "../components/ApiCreateDiscountForm";
import ListMyDiscounts from "./ListOldDiscounts";

export default class EditEstablishment extends React.Component {
  constructor() {
    super();

    this.state = {
      input: {
        name_text: "",
        phone_number: "",
        zone_enum: "",
        desc_text: "",
        street_text: "",
        number_text: "",
        locality_text: "",
        image_ulr: "",
        tags: [],
      },

      image_url: null,

      image: null,

      selected: [],

      tagsChange: [],

      otherTags: [],

      zone: {
        zona: [],
      },

      sendFinal: {},

      modal1: false,
      modal2: false,
      errorsApiGet: {},
      errorsApiPut: {},
      errors: {},
      msg: null,
      form: createRef(),
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.getEstablishment = this.getEstablishment.bind(this);
    this.getTags = this.getTags.bind(this);
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

    var otherTags = data.tags
      .filter((tag) => tag.type !== "Zona")
      .map((tag) => {
        return { value: tag.name, label: tag.name };
      });

    var arrayOther = otherTags.filter(function (dato) {
      return dato !== undefined;
    });

    this.setState({
      otherTags: arrayOther,
    });
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

  async getEstablishment() {
    var token = sessionStorage.getItem("token");
    var query = window.location.pathname;
    var splited = query.split("/");
    var id_establishment = splited[3];

    const url =
      "https://develop-backend-sprint-01.herokuapp.com/v1/establishments/" +
      id_establishment +
      "/get";

    const response = await fetch(url, {
      method: "GET",
      headers: {
        token: token,
      },
    });

    if (response.ok) {
      const data = await response.json();
      const arr = [];

      for (let tag of data.establishment.tags)
        arr.push({ value: tag.name, label: tag.name });
      const tagsConcat = arr;

      this.setState({
        input: {
          name_text: data.establishment.name_text,
          phone_number: data.establishment.phone_number,
          zone_enum: data.establishment.zone_enum,
          street_text: data.establishment.street_text,
          number_text: data.establishment.number_text,
          locality_text: data.establishment.locality_text,
          desc_text: data.establishment.desc_text,
          tags: tagsConcat,
        },
        selected: tagsConcat,
        image_url: data.establishment.photo_url,
      });
    } else {
      const data = await response.json();
      this.setState({ errorsApiGet: data.errors });
    }
  }

  async handleUpdate() {
    var token = sessionStorage.getItem("token");
    var query = window.location.pathname;
    var splited = query.split("/");
    var id_establishment = splited[3];
    let inputs = this.state.input;
    let tagsBefore = [];

    for (let tag of this.state.selected) tagsBefore.push(tag.value);

    const urlUpdate =
      "https://develop-backend-sprint-01.herokuapp.com/v1/establishments/" +
      id_establishment +
      "/update";

    var imageUpload = new FormData();
    imageUpload.append("name_text", inputs.name_text);
    imageUpload.append("phone_number", inputs.phone_number.toString());
    imageUpload.append("street_text", inputs.street_text);
    imageUpload.append("number_text", inputs.number_text);
    imageUpload.append("locality_text", inputs.locality_text);
    imageUpload.append("tags", tagsBefore);
    imageUpload.append("zone_enum", inputs.zone_enum);

    if (inputs.desc_text)
      imageUpload.append("desc_text", inputs.desc_text.trim());
    else imageUpload.append("desc_text", "");

    if (this.state.image) {
      imageUpload.append("image_name", this.state.image.name);

      const toBase64 = (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });

      imageUpload.append("image", await toBase64(this.state.image));
    }

    var object = {};
    imageUpload.forEach(function (value, key) {
      object[key] = value;
    });
    var json = JSON.stringify(object);
    const update = await fetch(urlUpdate, {
      method: "PUT",
      headers: {
        token: token,
        "Content-type": "application/json",
      },
      body: json,
    });

    if (update.ok) {
      const data = await update.json();
      this.setState({
        msg: data.msg,
      });
      setTimeout(() => {
        this.setState({
          msg: "",
        });
        this.getEstablishment();
      }, 2000);
    } else {
      const data = await update.json();
      this.setState({
        errorsApiPut: data,
      });
    }
  }

  async handleChange(event) {
    if (event.target === undefined) {
      this.state.selected = event;
    } else {
      await this.setState({
        input: {
          ...this.state.input,
          [event.target.name]: event.target.value,
        },
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.validate()) {
      this.handleUpdate();
    }
  }

  validate() {
    let inputs = this.state.input;
    let selecteds = this.state.selected;
    let errors = {};
    let isValid = true;
    var pattern;

    if (!inputs["name_text"].trim()) {
      isValid = false;
      errors["name_text"] =
        "El nombre del establecimiento no puede estar vacío";
    }

    if (!inputs["phone_number"]) {
      isValid = false;
      errors["phone_number"] = "Debe proporcionar un número de teléfono";
    }

    if (inputs["phone_number"]) {
      pattern = new RegExp(/^\d{9}$/);
      if (!pattern.test(inputs["phone_number"])) {
        isValid = false;
        errors["phone_number"] = "El télefono introducido no es válido";
      }
    }

    if (!inputs["street_text"].trim()) {
      isValid = false;
      errors["street_text"] = "Debe proporcionar una dirección";
    }

    if (!inputs["number_text"].trim()) {
      isValid = false;
      errors["number_text"] =
        "Debe proporcionar un número de la dirección del establecimiento";
    }

    if (inputs["number_text"]) {
      pattern = new RegExp(/^\D*\d{1,3}([A-Z]{1,2})?$/);
      if (!pattern.test(inputs["number_text"])) {
        isValid = false;
        errors["number_text"] =
          "El número de la dirección debe contener de 1 a 3 números con posibilidad de 2 letras";
      }
    }

    if (!inputs["locality_text"].trim()) {
      isValid = false;
      errors["locality_text"] =
        "Debe proporcionar la localidad donde se encuentre el establecimiento";
    }

    if (selecteds.length === 0) {
      isValid = false;
      errors["tags_selected"] =
        "Debe asignar algunas etiquetas que referencien a su establecimiento";
    }

    if (!inputs["zone_enum"]) {
      isValid = false;
      errors["zone_enum"] =
        "Debe asignar una zona próxima a su establecimiento";
    }

    this.setState({
      errors: errors,
    });

    return isValid;
  }

  componentDidMount() {
    this.getEstablishment();
    this.getTags();
    this.getZones();
  }

  render() {
    if (this.state.zone.zona !== []) {
      return (
        <>
          <div>
            <img
              className="img-fluid w-100"
              alt=""
              src={this.state.image_url == null ? "" : this.state.image_url}
            />
          </div>
          <div className="row">
            <div className="col md-8">
              <div className="card">
                <div className="card-header">
                  <div className="card-title ml-3 mt-3">
                    <h2>Detalles del Establecimiento</h2>
                  </div>
                </div>
                <div className="card-body">
                  <form
                    enctype="multipart/form-data"
                    ref={this.state.form}
                    id="establishment-form"
                    onSubmit={(e) => this.handleSubmit(e)}
                  >
                    {window.innerWidth < 525 && (
                      <>
                        <div className="row">
                          <div className="col pr-1 md-6">
                            <div className="form-group my-1">
                              <label>Nombre del Establecimiento</label>
                              <input
                                type="text"
                                name="name_text"
                                maxLength="100"
                                value={this.state.input.name_text}
                                onChange={this.handleChange}
                                className="form-control"
                                id="name-establishment"
                              />
                            </div>
                            <div className="text-danger">
                              {this.state.errors.name_text}
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col pr-1 md-6">
                            <div className="form-group my-1">
                              <label>Teléfono</label>
                              <input
                                type="tel"
                                name="phone_number"
                                value={this.state.input.phone_number}
                                onChange={this.handleChange}
                                className="form-control"
                                id="phone-number"
                              />
                            </div>
                            <div className="text-danger">
                              {this.state.errors.phone_number}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {window.innerWidth >= 525 && (
                      <>
                        <div className="row">
                          <div className="col pr-1 md-6">
                            <div className="form-group my-1">
                              <label>Nombre del Establecimiento</label>
                              <input
                                type="text"
                                name="name_text"
                                maxLength="100"
                                value={this.state.input.name_text}
                                onChange={this.handleChange}
                                className="form-control"
                                id="name-establishment"
                              />
                            </div>
                            <div className="text-danger">
                              {this.state.errors.name_text}
                            </div>
                          </div>
                          <div className="col pl-1 md-6">
                            <div className="form-group my-1">
                              <label>Teléfono</label>
                              <input
                                type="tel"
                                name="phone_number"
                                value={this.state.input.phone_number}
                                onChange={this.handleChange}
                                className="form-control"
                                id="phone-number"
                              />
                            </div>
                            <div className="text-danger">
                              {this.state.errors.phone_number}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    <div className="row">
                      <div className="col md-12">
                        <div className="form-group my-1">
                          <label>Dirección</label>
                          <input
                            type="text"
                            name="street_text"
                            maxLength="50"
                            value={this.state.input.street_text}
                            onChange={this.handleChange}
                            className="form-control"
                            id="street"
                          />
                          <div className="text-danger">
                            {this.state.errors.street_text}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col pr-1 md-6">
                        <div className="form-group my-1">
                          <label>Número</label>
                          <input
                            type="text"
                            name="number_text"
                            value={this.state.input.number_text}
                            onChange={this.handleChange}
                            className="form-control"
                            id="number-street"
                          />
                          <div className="text-danger">
                            {this.state.errors.number_text}
                          </div>
                        </div>
                      </div>
                      <div className="col pl-1 md-6">
                        <div className="form-group my-1">
                          <label>Localidad</label>
                          <input
                            type="text"
                            name="locality_text"
                            maxLength="50"
                            value={this.state.input.locality_text}
                            onChange={this.handleChange}
                            className="form-control"
                            id="locality-establishment"
                          />
                          <div className="text-danger">
                            {this.state.errors.locality_text}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col md-12">
                        <div className="form-group my-1">
                          <label>Descripción</label>
                          <textarea
                            name="desc_text"
                            maxLength="200"
                            value={this.state.input.desc_text}
                            onChange={this.handleChange}
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-group my-1">
                          <label>Zona</label>
                          <select
                            name="zone_enum"
                            value={this.state.input.zone_enum}
                            onChange={this.handleChange}
                            className="form-control"
                          >
                            {this.state.zone.zona.map((zona) => {
                              return <option value={zona}>{zona}</option>;
                            })}
                          </select>
                          <div className="text-danger">
                            {this.state.errors.zone_enum}
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <FormGroup className="pt-2">
                          <Label for="establishmentImage">Imagen</Label>
                          <CustomInput
                            type="file"
                            id="establishmentImage"
                            name="image"
                            label="Sube tu foto"
                            onChange={(e) =>
                              this.setState({ image: e.target.files[0] })
                            }
                          />
                        </FormGroup>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="form-group my-1">
                          <label>Tags</label>
                          {this.state.input.tags.length !== 0 ? (
                            <Select
                              name="tags-selected"
                              defaultValue={this.state.input.tags}
                              isMulti
                              options={this.state.otherTags}
                              onChange={this.handleChange}
                            ></Select>
                          ) : (
                            ""
                          )}
                          <div className="text-danger">
                            {this.state.errors.tags_selected}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="container-fluid bg-danger">
                      <div className="text-white fw-bold text-center">
                        {this.state.errorsApiPut === undefined
                          ? ""
                          : this.state.errorsApiPut.error}
                      </div>
                    </div>
                    <div className="container-fluid bg-success">
                      <div className="text-white fw-bold text-center">
                        {this.state.msg === undefined ? "" : this.state.msg}
                      </div>
                    </div>
                    <div className="">
                      <input
                        type="submit"
                        value="Guardar cambios"
                        className="btn btn-info"
                      />
                    </div>
                  </form>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => this.setState({ modal1: true })}
                  >
                    Añadir Descuento
                  </button>
                  <Modal
                    isOpen={this.state.modal1}
                    toggle={() => this.setState({ modal1: false })}
                  >
                    <div className="modal-header justify-content-center">
                      <button
                        className="close"
                        type="button"
                        onClick={() => this.setState({ modal1: false })}
                      >
                        <i className="now-ui-icons ui-1_simple-remove"></i>
                      </button>
                      <h4 className="title title-up">Nuevo descuento</h4>
                    </div>
                    <div className="container">
                      <hr />
                    </div>
                    <ModalBody>
                      <POSTCreateDiscount />
                    </ModalBody>
                  </Modal>

                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => this.setState({ modal2: true })}
                  >
                    Reactivar descuento pasado
                  </button>

                  <Modal
                    isOpen={this.state.modal2}
                    toggle={() => this.setState({ modal2: false })}
                  >
                    <div className="modal-header justify-content-center">
                      <button
                        className="close"
                        type="button"
                        onClick={() => this.setState({ modal2: false })}
                      >
                        <i className="now-ui-icons ui-1_simple-remove"></i>
                      </button>
                      <h4 className="title title-up">Lista de descuentos</h4>
                    </div>
                    <div className="container">
                      <hr />
                    </div>
                    <ModalBody>
                      <ListMyDiscounts />
                    </ModalBody>
                  </Modal>

                  <div className="clearfix"></div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return <Spinner />;
    }
  }
}
