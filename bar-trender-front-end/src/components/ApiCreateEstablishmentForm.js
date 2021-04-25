import React from "react";
import moment from "moment";
import Select from 'react-select'
import { CustomInput, FormGroup, Label, Modal, ModalBody } from "reactstrap";

class ApiCreateEstablishmentForm extends React.Component {
  constructor() {
    super();

    this.state = {
        input: {
          name_text: '',
          cif_text: '',
          phone_number: '',
          street_text: '',
          number_text: '',
          locality_text: '',
          zone_emum: '',
          desc_text: '',
          tags: [], 
      },
      zone_emum: [],

      image: null,

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
    this.getTags();
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
    this.state.tags = data.tags;
  }

  async handleCreate() {
    var token = sessionStorage.getItem("token");

    var createUpload = new FormData();
    createUpload.append('name_text', this.state.input.name_text);
    createUpload.append('desc_text', this.state.input.desc_text);
    createUpload.append('cif_text', this.state.input.cif_text);
    createUpload.append('phone_number', this.state.input.phone_number);
    createUpload.append('zone_enum', this.state.input.zone_enum);
    createUpload.append('tags', this.state.input.tags);
    createUpload.append('number_text', this.state.input.number_text);
    createUpload.append('street_text', this.state.input.street_text);
    createUpload.append('locality_text', this.state.input.locality_text);

    if(this.state.image){
      createUpload.append('image_name', this.state.image.name);
      
      const toBase64 = file => new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
      });
      
      createUpload.append('image', await toBase64(this.state.image));
    }
            
    var object = {};
    createUpload.forEach(function(value, key){
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

    if (create.ok) {
      var response = await create.json();
      this.setState({ msg: response.msg, modalSuccess: true });
    } else {
      var response = await create.json();
      this.setState({ errors: response.error, modalFail: true });
    }
  }

  handleChange(event) {
    
    if(event.target == undefined){
      this.state.input["zone_enum"] = event.value;
    }
    else{
    
    let input = this.state.input;
    input[event.target.name] = event.target.value;
    this.setState({
      input,
    })};
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.validate()) {
      let errors = {};

      let input = {};

      input["name_text"] = "";

      input["cif_text"] = "";

      input["phone_number"] = "";

      
      this.state.tags.map((tag) => {
        if(this.state.input[tag.name]=="true" && tag.type!="Zona"){
          if(!this.state.input.tags.some(t => (t.name === tag.name ))){
            this.state.input.tags = this.state.input.tags.concat(tag.name);
          }
        }
      }
      );
      
      input["zone_enum"] = "";

      input["tags"] = "";

      this.handleCreate(event);
    }
  }
  validate() {
    let input = this.state.input;

    var today = new Date();

    let errors = {};

    let isValid = true;

    if (!input["name_text"].trim()) {
      isValid = false;

      errors["name_text"] = "Introduzca un nombre para el establecimiento.";
    }
    if (!input["street_text"].trim()) {
      isValid = false;

      errors["street_text"] = "Introduzca una localización para el establecimiento.";
    }
    if (!input["locality_text"].trim()) {
      isValid = false;

      errors["locality_text"] = "Introduzca una localidad para el establecimiento.";
    }
    
    if (!input["number_text"]) {
      isValid = false;

      errors["number_text"] = "Introduzca un número para la calle de la localización del establecimiento.";
    }

    if (input['number_text']) {
      var pattern = new RegExp(/^\D*\d{1,3}([A-Z]{1,2})?$/);
      if (!pattern.test(input['number_text'])) {
          isValid = false;
          errors['number_text'] = 'El número de la dirección debe contener de 1 a 3 números con posibilidad de 2 letras'
      }
    }

    if (!input["cif_text"]) {
      isValid = false;

      errors["cif_text"] = "Introduzca el CIF del establecimiento";
    }

    if (input["cif_text"]) {
      var pattern = new RegExp(/^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/);
      if (!pattern.test(input["cif_text"])) {
        isValid = false;
        errors["cif_text"] = "Introduzca un CIF correcto.";
      }
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


    this.setState({
      errors: errors,
    });

    return isValid;
  }
  render() {
    var options = []
    this.state.tags.map((tag) => {
      if (tag.type == "Ocio") {
        if (!this.state.tags_group.ocio.some((t) => t.name === tag.name)) {
          this.state.tags_group.ocio = this.state.tags_group.ocio.concat(tag);
        }
      }
      if (tag.type == "Bebida") {
        if (!this.state.tags_group.bebida.some((t) => t.name === tag.name)) {
          this.state.tags_group.bebida = this.state.tags_group.bebida.concat(
            tag
          );
        }
      }
      if (tag.type == "Zona") {
        options = options.concat({value:tag.name, label: tag.name })
        
      }
      if (tag.type == "Instalacion") {
        if (
          !this.state.tags_group.instalacion.some((t) => t.name === tag.name)
        ) {
          this.state.tags_group.instalacion = this.state.tags_group.instalacion.concat(
            tag
          );
        }
      }
    });
    return (
      <>
        <div>
          <form onSubmit={this.handleSubmit}>
            <div class="form-group my-1">
              <input
                type="selec"
                name="name_text"
                value={this.state.input.name_text}
                onChange={this.handleChange}
                class="form-control"
                placeholder="Nombre del establecimiento"
                id="name_text"
              />

              <div class="text-danger">{this.state.errors.name_text}</div>
            </div>
            <div class="form-group my-1">
              <input
                type="text"
                name="cif_text"
                value={this.state.input.cif_text}
                onChange={this.handleChange}
                class="form-control"
                placeholder="CIF del establecimiento"
                id="cif_text"
              />

              <div class="text-danger">{this.state.errors.cif_text}</div>
            </div>
            <div class="form-group my-1">
              <input
                type="text"
                name="desc_text"
                value={this.state.input.desc_text}
                onChange={this.handleChange}
                class="form-control"
                placeholder="Descripción del establecimiento"
                id="desc_text"
              />

              <div class="text-danger">{this.state.errors.desc_text}</div>
            </div>

            <div class="form-group my-1">
              <input
                type="number"
                name="phone_number"
                value={this.state.input.phone_number}
                onChange={this.handleChange}
                class="form-control"
                placeholder="Número de teléfono del establecimiento."
                id="phone_number"
              />
              <div class="text-danger">
                {this.state.errors.phone_number}
              </div>
            </div>

            <div class="form-group my-1">
              <input
                type="text"
                name="street_text"
                value={this.state.input.street_text}
                onChange={this.handleChange}
                class="form-control"
                placeholder="Calle del establecimiento"
              />

              <div class="text-danger">{this.state.errors.street_text}</div>
            </div>

            <div class="form-group my-1">
              <input
                type="number"
                name="number_text"
                value={this.state.input.number_text}
                onChange={this.handleChange}
                class="form-control"
                placeholder="Número de la calle"
              />

              <div class="text-danger">{this.state.errors.number_text}</div>
            </div>
            <div class="form-group my-1">
              <input
                type="text"
                name="locality_text"
                value={this.state.input.locality_text}
                onChange={this.handleChange}
                class="form-control"
                placeholder="Localidad"
              />

              <div class="text-danger">{this.state.errors.locality_text}</div>
            </div>
            <FormGroup className='pt-2'>
                <Label for="establishmentImage">Imagen</Label>
                <CustomInput type="file" id="establishmentImage" name="image" label="Sube tu foto" onChange={(e) => this.setState({image: e.target.files[0]})} />
            </FormGroup>

            <div class="card">
              <div class="card-header">
                <ul class="nav nav-tabs nav-pills-info nav-pills-just-icons row justify-content-between">
                  <li class="nav-item">
                    <a id="link-ocio"
                      class="nav-link text-danger"
                      aria-current="page"
                      href="#"
                      onClick={() => {
                        document.getElementsByClassName("text-danger")[0].classList.remove("text-danger");
                        document.getElementById("link-ocio").classList.add("text-danger");
                        document
                          .getElementsByClassName("active-tag")[0]
                          .classList.add("d-none");
                        document
                          .getElementsByClassName("active-tag")[0]
                          .classList.remove("active-tag");
                        document
                          .getElementById("content-ocio")
                          .classList.remove("d-none");
                        document
                          .getElementById("content-ocio")
                          .classList.add("active-tag");

                      }}
                    >
                      <i class="fal fa-bowling-ball fa-2x w-100"></i>{" "}
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      id="link-bebida"
                      href="#"
                      onClick={() => {
                        document.getElementsByClassName("text-danger")[0].classList.remove("text-danger");
                        document.getElementById("link-bebida").classList.add("text-danger");
                        document
                          .getElementsByClassName("active-tag")[0]
                          .classList.add("d-none");
                        document
                          .getElementsByClassName("active-tag")[0]
                          .classList.remove("active-tag");
                        document
                          .getElementById("content-bebida")
                          .classList.remove("d-none");
                        document
                          .getElementById("content-bebida")
                          .classList.add("active-tag");
                      }}
                    >
                      <i class="fal fa-beer fa-2x w-100"></i>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      id="link-zona"
                      href="#"
                      onClick={() => {
                        document.getElementsByClassName("text-danger")[0].classList.remove("text-danger");
                        document.getElementById("link-zona").classList.add("text-danger");
                        document
                          .getElementsByClassName("active-tag")[0]
                          .classList.add("d-none");
                        document
                          .getElementsByClassName("active-tag")[0]
                          .classList.remove("active-tag");
                        document
                          .getElementById("content-zona")
                          .classList.remove("d-none");
                        document
                          .getElementById("content-zona")
                          .classList.add("active-tag");
                      }}
                    >
                      <i class="fal fa-globe-europe fa-2x w-100"></i>
                    </a>
                  </li>
                </ul>
              </div>
              <div id="content-ocio" class=" card-body active-tag">
                <h4>Ocio</h4>
                <ul>
                  {this.state.tags_group.ocio.map((tag) => {
                    return (
                      <>
                        <div class="row">
                          <input
                            type="checkbox"
                            name={tag.name}
                            value="true"
                            onChange={this.handleChange}
                          ></input>
                          {tag.name}
                        </div>
                      </>
                    );
                  })}
                </ul>
              </div>
              <div id="content-bebida" class="card-body d-none">
                <h4>Bebida</h4>
                <ul>
                  {this.state.tags_group.bebida.map((tag) => {
                    return (
                      <>
                        <div class="row">
                          <input type="checkbox"
                           name={tag.name}
                           value="true"
                           onChange={this.handleChange}
                          ></input>
                          {tag.name}
                        </div>
                      </>
                    );
                  })}
                </ul>
              </div>
              <div id="content-zona" class="card-body d-none">
                <h4>Zona</h4>  
                <Select options={options}
                        name="zone_enum" 
                        onChange={this.handleChange}
                        value={this.state.input.zone_enum} />
      
                          
                        
              </div>

              <div class="text-center">
                <input
                  type="submit"
                  value="Añadir establecimiento"
                  class="btn btn-primary"
                />
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
              <p class="text-success"> Establecimiento creado con éxito</p>
            </div>
          </ModalBody>
        </Modal>

        <Modal isOpen={this.state.modalFail}>
          <div className="modal-header justify-content-center">
            <button
              className="close"
              type="button"
              onClick={() => window.location.reload()}
            >
              <i className="now-ui-icons ui-1_simple-remove"></i>
            </button>
            <h4 className="title title-up">¡ERROR!</h4>
          </div>
          <ModalBody>
            <div className="mt-2 mb-4 text-center">
              <p class="text-danger">{this.state.errors}</p>
            </div>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

export default ApiCreateEstablishmentForm;
