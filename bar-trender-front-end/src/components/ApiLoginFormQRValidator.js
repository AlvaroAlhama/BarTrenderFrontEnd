
import React from "react";
import { Modal, ModalBody } from "reactstrap";

import "../assets/css/EstablishmentQrScan.css"
import fail_boy from "../assets/img/fail-scan.png";
import barTrender60 from "../assets/img/barTrender60.png";
import success_boy from "../assets/img/success_scan-min.png";



class POSTLoginFormQRValidator extends React.Component {

  constructor() {
    super();

    this.state = {

      input: {},

      errors: {},

      modalFail: false,
      
      modalSuccess: false,

    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.getDiscountResult = this.getDiscountResult.bind(this);
  }

  async handleLogin() {
    
    let errors = {};
    var url = "https://develop-backend-sprint-01.herokuapp.com/v1/authentication/login";
    // Call to the api with the credentials given by the user
    const response = await fetch(url, {
      method: "POST",
      headers: { apiKey: "8dDc431125634ef43cD13c388e6eCf11" },
      body: JSON.stringify(this.state.input),
    });
    if (response.ok) {
      var r = await response.json();
      var token = r.token;
      sessionStorage.setItem("token", token);
      this.getDiscountResult();
    } else {
      const data = await response.blob();
      this.setState({ loading: false });
      errors["email"] = "Email o contraseña incorrecta.";
    }
    this.setState({
      errors: errors,
    });
  }

  async getDiscountResult() {

    var query = window.location.search;
    let params = new URLSearchParams(query);
    var establishment_id = params.get("establishment_id");
    var discount_id = params.get("discount_id");
    var client_id = params.get("client_id");

    var token = sessionStorage.getItem("token");
  
    var url = "https://develop-backend-sprint-01.herokuapp.com/v1/establishments/"+establishment_id+"/discounts/"+discount_id+"/client/"+client_id+"/scan"
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "token": token
      }
    });

    if(response.ok){
      this.setState({modalSuccess: true});
    }else{
      const data = await response.json();
      this.setState({error: data.error, modalFail: true})

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

      input["email"] = "";

      input["password"] = "";
    }

    this.handleLogin(event);

  }

  validate() {
    let input = this.state.input;


    let errors = {};

    let isValid = true;

    if (!input["email"]) {
      isValid = false;

      errors["email"] = "Escriba una dirección de correo electrónico.";
    }

    if (typeof input["email"] !== "undefined") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );

      if (!pattern.test(input["email"])) {
        isValid = false;

        errors["email"] =
          "Escriba una dirección de correo electrónico correcta.";
      }
    }

    if (!input["password"]) {
      isValid = false;

      errors["password"] = "Escriba una contraseña.";
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
                name="email"

                value={this.state.input.email}
                onChange={this.handleChange}
                class="form-control"
                placeholder="Correo electrónico"
                id="email"
              />


              <div className="text-danger">{this.state.errors.email}</div>
            </div>

            <div class="form-group my-4">
              <input

                name="password"
                type="password"

                value={this.state.input.password}

                onChange={this.handleChange}
                placeholder="Contraseña"
                class="form-control"
              />


              <div className="text-danger align-center">
                {this.state.errors.password}
              </div>
            </div>

            <div class="text-center">
              <input
                type="submit"
                value="Validar descuento"
                class="btn btn-primary"
              />
            </div>

          </form>
        </div>

        <div>
          <Modal className = "modal-fail" centered="true" isOpen={this.state.modalFail} >
            <div className="modal-header justify-content-center">
              <div class="container mt-5 pt-5">
                <div class="row justify-content-center">
                  <img src={barTrender60} class="img-fluid" />
                  <h1 class="my-auto text-white ml-3">BARTRENDER</h1>
                </div> 
              </div>      
            </div>
            <ModalBody>
                <div class="row justify-content-center mt-5">
                  <h1 className="text-white text-center font-weight-bold">
                    ¡OOPS! HA OCURRIDO EL SIGUIENTE PROBLEMA
                  </h1>
                </div>
                <div class="row justify-content-center   mt-3">
                  <h2 class="my-auto text-white justify-content-center">
                    {this.state.error}
                  </h2>
                  <img
                    src={fail_boy}
                    className="img-fluid"
                    style={{
                      width: "100%",
                      maxWidth: "18.75em",
                    }}
                  />
                </div>
                <div class="row justify-content-center mt-5">
                  <h3 id="index-button-fail">
                    <a href="/index" className="text-decoration-none text-white m-4">
                      Volver a inicio
                    </a>
                  </h3>
                </div>
              
            </ModalBody>
          </Modal>
        </div>

        <div>
        <Modal className = "modal-success" centered="true" isOpen={this.state.modalSuccess} >
            <div className="modal-header justify-content-center">
              <div class="container mt-5 pt-5">
                <div class="row justify-content-center">
                  <img src={barTrender60} class="img-fluid" />
                  <h1 class="my-auto text-white ml-3">BARTRENDER</h1>
                </div> 
              </div>      
            </div>
            <ModalBody>
              <div class="row justify-content-center mt-5">
                  <h1 className="text-white text-center font-weight-bold">
                    ¡DESCUENTO APLICADO CON ÉXITO!
                  </h1>
                </div>
                <div class="row justify-content-center   mt-3">
                  <img
                    src={success_boy}
                    className="img-fluid"
                    style={{
                      width: "100%",
                      maxWidth: "18.75em",
                    }}
                  />
                </div>
                <div class="row justify-content-center mt-5">
                  <h3 id="index-button-success">
                    <a href="/index" className="text-decoration-none text-white m-4">
                      Volver a inicio
                    </a>
                  </h3>
                </div>
            </ModalBody>
          </Modal>
        </div>

      </>
    );
  }
}

export default POSTLoginFormQRValidator;

