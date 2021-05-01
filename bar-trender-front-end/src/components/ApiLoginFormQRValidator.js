import React from "react";
import { Modal, ModalBody, Spinner } from "reactstrap";
import GoogleLogin from "react-google-login";

import "../assets/css/EstablishmentQrScan.css";
import fail_boy from "../assets/img/fail-scan.png";
import barTrender60 from "../assets/img/barTrender60.png";
import success_boy from "../assets/img/success_scan-min.png";

const host = "https://develop-backend-sprint-01.herokuapp.com/v1";
const errorLink = "https://aboutme.google.com/";

class POSTLoginFormQRValidator extends React.Component {
  constructor() {
    super();

    this.state = {
      input: {},

      errors: {},

      emailOwner: "",

      method: "",

      errorLoginGoogle: undefined,

      errorBackend: undefined,

      modalFail: false,

      modalSuccess: false,

      errorGetOwner: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.getResponse = this.getResponse.bind(this);
    this.getDiscountResult = this.getDiscountResult.bind(this);
  }

  async getOwner() {
    var query = window.location.search;
    let params = new URLSearchParams(query);
    var establishment_id = params.get("establishment_id");
    var url =
      "https://develop-backend-sprint-01.herokuapp.com/v1/establishments/" +
      establishment_id +
      "/get_owner";

    const response = await fetch(url, {
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      this.setState({ emailOwner: data.ownerEmail, method: data.method });
    } else {
      const data = await response.json();
      this.setState({ errorGetOwner: data.errors });
    }
  }

  async getResponse(response) {
    if (response.ok) {
      var r = await response.json();
      var token = r.token;
      var rol = r.rol;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("rol", rol);
      window.location.reload();
    } else {
      const data = await response.json();
      this.setState({
        errorBackend: data.error,
        errorLoginGoogle: undefined,
      });
    }
  }

  loginConOwnerExito = (response) => {
    let user_info = {
      token: response.tokenObj.id_token,
      access_token: response.tokenObj.access_token,
      google_id: response.profileObj.googleId,
      email: response.profileObj.email,
      phone: undefined,
    };

    fetch(
      "https://people.googleapis.com/v1/people/" +
        user_info.google_id +
        "?personFields=phoneNumbers&access_token=" +
        user_info.access_token,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        const phone =
          data.phoneNumbers !== undefined
            ? data.phoneNumbers[0].value
            : undefined;

        if (phone) {
          user_info.phone = Number(parseInt(phone.replace(/ /g, ""), 10));

          // Check If exist
          fetch(host + "/authentication/google", {
            method: "POST",
            headers: {
              apiKey: "8dDc431125634ef43cD13c388e6eCf11",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user: user_info,
              rol: "owner",
            }),
          }).then((response) => {
            this.getResponse(response);
          });
        } else {
          this.setState({
            errorLoginGoogle:
              "No se ha podido acceder a tu teléfono. Comprueba que es pública desde tu cuenta de Google",
            errorBackend: undefined,
          });
        }
      });
  };

  async handleLogin() {
    var send = JSON.stringify({
      password: this.state.input.password,
      email: this.state.emailOwner,
    });

    let errors = {};

    var url =
      "https://develop-backend-sprint-01.herokuapp.com/v1/authentication/login";

    // Call to the api with the credentials given by the user
    const response = await fetch(url, {
      method: "POST",
      headers: { apiKey: "8dDc431125634ef43cD13c388e6eCf11" },
      body: send,
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

    var url =
      "https://develop-backend-sprint-01.herokuapp.com/v1/establishments/" +
      establishment_id +
      "/discounts/" +
      discount_id +
      "/client/" +
      client_id +
      "/scan";

    const response = await fetch(url, {
      method: "GET",
      headers: {
        token: token,
      },
    });

    if (response.ok) {
      this.setState({ modalSuccess: true });
    } else {
      const data = await response.json();
      this.setState({ error: data.error, modalFail: true });
    }
  }

  componentDidMount() {
    this.getOwner();
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
    if (this.state.method !== "") {
      if (this.state.method === "password") {
        return (
          <>
            <div>
              <form onSubmit={this.handleSubmit}>
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
              <Modal
                className="modal-fail"
                centered="true"
                isOpen={this.state.modalFail}
              >
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
                      <a
                        href="/index"
                        className="text-decoration-none text-white m-4"
                      >
                        Volver a inicio
                      </a>
                    </h3>
                  </div>
                </ModalBody>
              </Modal>
            </div>

            <div>
              <Modal
                className="modal-success"
                centered="true"
                isOpen={this.state.modalSuccess}
              >
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
                      <a
                        href="/index"
                        className="text-decoration-none text-white m-4"
                      >
                        Volver a inicio
                      </a>
                    </h3>
                  </div>
                </ModalBody>
              </Modal>
            </div>
          </>
        );
      } else if (this.state.method === "google") {
        return (
          <>
            <div className="App">
              <GoogleLogin
                clientId="660796874273-0tb6t8b3tbd63rfii5amcgo4mc45jejr.apps.googleusercontent.com"
                buttonText="Validar usando Google"
                onSuccess={this.loginConOwnerExito}
              />
            </div>

            <p style={{ color: "red", textAlign: "center" }}>
              {this.state.errorLoginGoogle == undefined
                ? ""
                : this.state.errorLoginGoogle}{" "}
              <a
                style={{ color: "blue" }}
                href={this.state.errorLoginGoogle == undefined ? "" : errorLink}
              >
                {this.state.errorLoginGoogle == undefined ? "" : errorLink}
              </a>
            </p>
            <p style={{ color: "red", textAlign: "center" }}>
              {this.state.errorBackend == undefined
                ? ""
                : this.state.errorBackend}
            </p>
          </>
        );
      }
    } else {
      return <Spinner />;
    }
  }
}

export default POSTLoginFormQRValidator;
