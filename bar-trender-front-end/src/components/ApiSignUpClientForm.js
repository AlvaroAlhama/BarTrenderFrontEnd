import React from "react";
import moment from "moment";

class ApiSignUpClientForm extends React.Component {
  constructor() {
    super();

    this.state = {
      input: {
        rol: "client",
      },

      errors: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }
  // call the api
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
      const birthday = moment.utc(`${this.state.input.birthday}`).unix();
    
      this.state.input.birthday = birthday;
      input["rol"] ="client"
      this.setState({
        input: input,
      });

      input["email"] = "";

      input["password"] = "";

      input["birthday"] = "";

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

    if (!input["birthday"]) {
      isValid = false;

      errors["birthday"] = "Escriba una fecha de nacimiento. ";
    }
    if (typeof input["birthday"] !== "undefined") {
      var today = new Date();
      var birthday = new Date(input["birthday"]);

      if (today.getFullYear() - birthday.getFullYear() < 18) {
        isValid = false;

        errors["birthday"] =
          "Para registrarte como usuario al menos tienes que tener 18 años.";
      }
      if (today.getFullYear() - birthday.getFullYear() == 18) {
        if (today.getMonth() < birthday.getMonth()) {
          isValid = false;

          errors["birthday"] =
            "Para registrarte como usuario al menos tienes que tener 18 años.";
        }
        if (today.getMonth() == birthday.getMonth()) {
          if (today.getDate() < birthday.getDate()) {
            isValid = false;
            errors["birthday"] =
              "Para registrarte como usuario al menos tienes que tener 18 años.";
          }
        }
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
          <i className="fal fa-glass-cheers fa-5x w-100 mb-4"></i>
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
              name="birthday"
              type="date"
              value={this.state.input.birthday}
              onChange={this.handleChange}
              placeholder="Fecha de Nacimiento"
              class="form-control"
            />

            <div className="text-danger align-center">
              {this.state.errors.birthday}
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

export default ApiSignUpClientForm;
