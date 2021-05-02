import React from "react";
import { Redirect } from "react-router-dom";

class ApiSignUpEstablishmentForm extends React.Component {
  constructor() {
    super();

    this.state = {
      input: {
        rol: "owner",
        legal: false,
      },

      errors: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }
  // TODO CALL THE API
  async handleSignUp() {
    let errors = {};
    var url =
      "https://develop-backend-sprint-01.herokuapp.com/v1/authentication/signup";
    // Call to the api with the credentials given by the user
    const response = await fetch(url, {
      method: "POST",
      headers: { apiKey: "8dDc431125634ef43cD13c388e6eCf11" },
      body: JSON.stringify(this.state.input),
    });
    if (response.ok) {
      var r = await response.json();
      var token = r.token;
      var rol = r.rol;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("rol", rol);
      window.location.href = "/index";
    } else {
      const data = await response.json();
      this.setState({ error: data.error, modalFail: true, loading: false });
    }
  }

  handleChange(event) {
    let input = this.state.input;
    if(event.target.type=="checkbox"){
      if (input[event.target.name] == true ){
        input[event.target.name] = false;
      }
      else{
        input[event.target.name] = true;
      }
    }
    else{
      input[event.target.name] = event.target.value;
    }
    this.setState({
      input,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.validate()) {
      let errors = {};

      let input = {};

      this.state.input.phone = parseInt(this.state.input.phone, 10);

      input["email"] = "";

      input["password"] = "";

      input["phone"] = "";

      input["rol"] = "";

      this.handleSignUp(event);
    }
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

    if (input["legal"] != true) {
      isValid = false;
      errors["legal"] =
        "Para darse de alta en el sistema debe aceptar los acuerdos de términos y las condiciones de uso.";
    }

    if (typeof input["password"] !== "undefined") {
      var pattern = new RegExp(
        /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/i
      );
      if (!pattern.test(input["password"])) {
        isValid = false;

        errors["password"] =
          "La contraseña debe tener al menos 8 carácteres, un dígito, una mayúscula y un carácter especial.";
      }
    }

    if (!input["password"]) {
      isValid = false;

      errors["password"] = "Escriba una contraseña.";
    }

    if (!input["phone"]) {
      isValid = false;

      errors["phone"] = "Escriba un número de teléfono correcto. ";
    }
    if (input["phone"]) {
      var phone = input["phone"];
      if (phone / 100000000 < 1 || phone / 100000000 >= 10) {
        isValid = false;
        errors["phone"] = "Escriba un número de teléfono correcto. ";
      }
    }

    this.setState({
      errors: errors,
    });

    return isValid;
  }

  render() {
    return (
      <div>
        <div className="text-danger">
          <h6 class="my-3 text-center">{this.state.error}</h6>
        </div>
        <div className="row">
          <i className="fal fa-store fa-5x w-100 mb-4"></i>
        </div>

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
          </div>
          <div className="text-danger align-center">
            {this.state.errors.password}
          </div>

          <div class="form-group my-4">
            <input
              name="phone"
              type="number"
              value={this.state.input.phone}
              onChange={this.handleChange}
              placeholder="Número de teléfono"
              minLength="9"
              maxLength="9"
              class="form-control"
            />

            <div className="text-danger align-center">
              {this.state.errors.phone}
            </div>
          </div>
          <div class="form-group my-4">
            <input
              name="legal"
              type="checkbox"
              value={this.state.input.legal}
              onChange={this.handleChange}
              checked={this.state.input.legal}
              class="mr-2"
            />
            <label class="text-dark" for="legal">
              Acepta los
              <a target="_blank" class="text-decoration-none" href="/legal">
                {" "}
                Acuerdos de Términos{" "}
              </a>
              y las{" "}
              <a
                target="_blank"
                class="text-decoration-none"
                href="/condiciones-uso"
              >
                Condiciones de Uso.
              </a>
            </label>
            <div className="text-danger align-center">
              {this.state.errors.legal}
            </div>
          </div>

          <div class="text-center">
            <input
              type="submit"
              value="Finalizar registro"
              class="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default ApiSignUpEstablishmentForm;
