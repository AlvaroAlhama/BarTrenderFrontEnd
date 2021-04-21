
import React from "react";
import { Redirect } from "react-router-dom";

class POSTLoginForm extends React.Component {

  constructor() {
    super();

    this.state = {

      input: {},

      errors: {},

    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
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
      var rol = r.rol;
      var premium = r.premium;

      sessionStorage.setItem("token", token);
      sessionStorage.setItem("rol", rol);
      sessionStorage.setItem("premium", premium);

      window.location.href = "/index";
    } else {
      const data = await response.blob();
      this.setState({ loading: false });
      errors["email"] = "Email o contraseña incorrecta.";
    }
    this.setState({
      errors: errors,
    });
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
              value="Iniciar sesión"
              class="btn btn-primary"
            />
          </div>

        </form>
      </div>
    );
  }
}

export default POSTLoginForm;

