import React from "react";
import moment from "moment";

class ApiSignUpClientForm extends React.Component {
  constructor() {
    super();

    this.state = {
      input: {
        rol: "client",
        legal:false,
      },

      errors: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  // call the api
  async handleSignUp() {

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
    if(event.target.type ==="checkbox"){
      if (input[event.target.name] === true ){
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

      let input = {};
      const birthday = moment.utc(`${this.state.input.birthday}`).unix();
  
      this.state.input.birthday = birthday
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
      pattern = new RegExp(
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

    if (input["legal"]!==true) {
      isValid = false;

      errors["legal"] =
      "Para darse de alta en el sistema debe aceptar los acuerdos de términos y las condiciones de uso.";
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
      if (today.getFullYear() - birthday.getFullYear() === 18) {
        if (today.getMonth() < birthday.getMonth()) {
          isValid = false;

          errors["birthday"] =
            "Para registrarte como usuario al menos tienes que tener 18 años.";
        }
        if (today.getMonth() === birthday.getMonth()) {
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
          <h6 className="my-3 text-center">{this.state.error}</h6>
        </div>
        <div className="row">
          <i className="fal fa-glass-cheers fa-5x w-100 mb-4"></i>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group my-1">
            <input
              type="text"
              name="email"
              value={this.state.input.email}
              onChange={this.handleChange}
              className="form-control"
              placeholder="Correo electrónico"
              id="email"
            />

            <div className="text-danger">{this.state.errors.email}</div>
          </div>

          <div className="form-group my-4">
            <input
              name="password"
              type="password"
              value={this.state.input.password}
              onChange={this.handleChange}
              placeholder="Contraseña"
              className="form-control"
            />
          </div>
          <div className="text-danger align-center">
            {this.state.errors.password}
          </div>

          <div className="form-group my-4">
            <input
              name="birthday"
              type="date"
              value={this.state.input.birthday}
              onChange={this.handleChange}
              placeholder="Fecha de Nacimiento"
              className="form-control"
            />

            <div className="text-danger align-center">
              {this.state.errors.birthday}
            </div>
          </div>

          <div className="form-group my-4">
            <input
              name="legal"
              type="checkbox"
              value={this.state.input.legal}
              onChange={this.handleChange}
              className="mr-2"
            />
            <label className="text-dark" for="legal">
              Acepta los
              <a target='_blank' className="text-decoration-none" href="/legal">
                {" "}
                Acuerdos de Términos{" "}
              </a>
              y las{" "}
              <a target='_blank' className="text-decoration-none" href="/condiciones-uso">
                Condiciones de Uso.
              </a>
            </label>
            <div className="text-danger align-center">
              {this.state.errors.legal}
            </div>
          </div>
          <div className="text-center">

            <input
              type="submit"
              value="Finalizar registro"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default ApiSignUpClientForm;
