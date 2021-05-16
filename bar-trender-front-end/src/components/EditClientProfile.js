import React from "react";
import moment from "moment";
import { Spinner } from "reactstrap";

export default class EditClientProfile extends React.Component {
  constructor() {
    super();

    this.state = {
      input: {
        name: "",
        surname: "",
        email: "",
        birthday: "",
        old_password: undefined,
        password: undefined,
      },

      method: "",
      sendFinal: {},

      errorsApiGetMethod: {},
      errorsApiGet: {},
      errorsApiPut: {},
      errors: {},
      msg: undefined,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  async getOwner() {
    var token = sessionStorage.getItem("token");

    const url =
      "https://develop-backend-sprint-01.herokuapp.com/v1/authentication/user";

    const response = await fetch(url, {
      method: "GET",
      headers: {
        token: token,
      },
    });

    if (response.ok) {
      const data = await response.json();
      this.setState({
        input: {
          name: data.name,
          surname: data.surname,
          email: data.email,
          birthday: new Date(data.birthday * 1000).toISOString().slice(0, 10),
          old_password: undefined,
          password: undefined,
        },
      });
    } else {
      const data = await response.json();
      this.setState({ errorsApiGet: data.errors });
    }
  }

  async getMethod() {
    var token = sessionStorage.getItem("token");

    const url =
      "https://develop-backend-sprint-01.herokuapp.com/v1/authentication/method";

    const response = await fetch(url, {
      method: "GET",
      headers: {
        token: token,
      },
    });

    if (response.ok) {
      const data = await response.json();
      this.setState({
        method: data.method,
      });
    } else {
      const data = await response.json();
      this.setState({
        errorsApiGetMethod: data.errors,
      });
    }
  }

  componentDidMount() {
    this.getOwner();
    this.getMethod();
  }

  async handleUpdate() {
    var token = sessionStorage.getItem("token");
    const urlUpdate =
      "https://develop-backend-sprint-01.herokuapp.com/v1/authentication/user/edit";

    const update = await fetch(urlUpdate, {
      method: "PUT",
      headers: {
        token: token,
        "Content-type": "application/json",
      },
      body: JSON.stringify(this.state.sendFinal),
    });

    if (update.ok) {
      const data = await update.json();
      this.setState({
        msg: data.msg,
      });
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("rol", data.rol);
      setTimeout(window.location.reload(), 5000);
    } else {
      const data = await update.json();
      this.setState({
        errorsApiPut: data,
      });
    }
  }

  async handleChange(event) {
    event.persist();
    await this.setState({
      input: {
        ...this.state.input,
        [event.target.name]: event.target.value,
      },
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let inputs = this.state.input;

    const birthdayToTS = moment.utc(`${inputs.birthday}`).unix();
    let sendWithNewpass = {};
    let send = {};
    
    if (this.validate()) {
      if (inputs["password"] === undefined) {
        send["name"] = inputs.name;
        send["surname"] = inputs.surname;
        send["email"] = inputs.email;
        send["birthday"] = birthdayToTS;
        send["old_password"] = inputs.old_password;
       
         //#206 - change
        this.setState({sendFinal: send})
        // this.state.sendFinal = send;

        this.handleUpdate();
      } else {
        sendWithNewpass["name"] = inputs.name;
        sendWithNewpass["surname"] = inputs.surname;
        sendWithNewpass["email"] = inputs.email;
        sendWithNewpass["birthday"] = birthdayToTS;
        sendWithNewpass["old_password"] = inputs.old_password;
        sendWithNewpass["password"] = inputs.password;

        //#206 - change
        this.setState({sendFinal: sendWithNewpass})
        // this.state.sendFinal = sendWithNewpass;
        
        this.handleUpdate();
      }
    }
  }

  validate() {
    let inputs = this.state.input;

    let errors = {};
    var pattern
    let isValid = true;

    if (!inputs["name"].trim()) {
      isValid = false;
      errors["name"] = "El nombre no puede estar vacío";
    }

    if (!inputs["surname"].trim()) {
      isValid = false;
      errors["surname"] = "El apellido no puede estar vacío";
    }

    if (!inputs["email"]) {
      isValid = false;
      errors["email"] = "El email no puede estar vacío";
    }

    if (typeof inputs["email"] !== "undefined") {
      pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );

      if (!pattern.test(inputs["email"])) {
        isValid = false;

        errors["email"] =
          "Escriba una dirección de correo electrónico correcta.";
      }
    }

    if (!inputs["birthday"]) {
      isValid = false;
      errors["birthday"] = "El fecha de Nacimiento no puede estar vacío";
    }

    if (typeof inputs["birthday"] !== "undefined") {
      var today = new Date();
      var birthday = new Date(inputs["birthday"]);

      if (today.getFullYear() - birthday.getFullYear() < 18) {
        isValid = false;

        errors["birthday"] =
          "Para registrarte tus datos al menos tienes que tener 18 años.";
      }
      if (today.getFullYear() - birthday.getFullYear() === 18) {
        if (today.getMonth() < birthday.getMonth()) {
          isValid = false;

          errors["birthday"] =
            "Para actualizar tus datos al menos tienes que tener 18 años.";
        }
        if (today.getMonth() === birthday.getMonth()) {
          if (today.getDate() < birthday.getDate()) {
            isValid = false;
            errors["birthday"] =
              "Para actualizar tus datos al menos tienes que tener 18 años.";
          }
        }
      }
    }

    if (!inputs["old_password"]) {
      isValid = false;
      errors["old_password"] =
        "Tiene que poner su contraseña para poder verificar su identidad";
    }

    if (inputs["password"]) {
      pattern = new RegExp(
        /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/i
      );
      if (!pattern.test(inputs["password"])) {
        isValid = false;

        errors["password"] =
          "La nueva contraseña debe tener al menos 8 carácteres, un dígito, una mayúscula y un carácter especial.";
      }
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
            <div className="container-fluid bg-white">
              <form onSubmit={this.handleSubmit}>
                <div className="row">
                  <div className="col pr-1 md-6">
                    <div className="form-group my-1">
                      <label>Nombre</label>
                      <input
                        type="text"
                        name="name"
                        value={this.state.input.name}
                        onChange={this.handleChange}
                        className="form-control"
                        id="name-owner"
                      />
                      <div className="text-danger">{this.state.errors.name}</div>
                    </div>
                  </div>
                  <div className="col pl-1 md-6">
                    <div className="form-group my-1">
                      <label>Apellido</label>
                      <input
                        type="text"
                        name="surname"
                        value={this.state.input.surname}
                        onChange={this.handleChange}
                        className="form-control"
                        id="surname-owner"
                      />
                      <div className="text-danger">{this.state.errors.surname}</div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col pr-1 md-6">
                    <div className="form-group my-1">
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        value={this.state.input.email}
                        onChange={this.handleChange}
                        className="form-control"
                        id="email-owner"
                      />
                      <div className="text-danger">{this.state.errors.email}</div>
                    </div>
                  </div>
                  <div className="col pl-1 md-6">
                    <div className="form-group my-1">
                      <label>Fecha de nacimiento</label>
                      <input
                        type="Date"
                        name="birthday"
                        value={this.state.input.birthday}
                        onChange={this.handleChange}
                        className="form-control"
                        id="phone-owner"
                      />
                      <div className="text-danger">
                        {this.state.errors.birthday}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col pr-1 md-6">
                    <div className="form-group my-1">
                      <label>Tu contraseña</label>
                      <input
                        type="password"
                        name="old_password"
                        value={this.state.input.old_password}
                        placeholder="Ponga su contraseña para verificar los datos"
                        onChange={this.handleChange}
                        className="form-control"
                        id="old-password-owner"
                      />
                      <div className="text-danger">
                        {this.state.errors.old_password}
                      </div>
                    </div>
                  </div>
                  <div className="col pl-1 md-6">
                    <div className="form-group my-1">
                      <label>Nueva Contraseña</label>
                      <input
                        type="password"
                        name="password"
                        defaultValue={this.state.input.password}
                        placeholder="Rellene este campo sólo si quiere cambiar la contraseña"
                        onChange={this.handleChange}
                        className="form-control"
                        id="new-password-owner"
                      />
                      <div className="text-danger">
                        {this.state.errors.password}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center pb-5">
                  <input
                    type="submit"
                    value="Guardar cambios"
                    className="btn btn-primary"
                  />
                </div>
              </form>
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
            </div>
          </>
        );
      } else if (this.state.method === "google") {
        return (
          <>
            <div className="container-fluid bg-white">
              <form>
                <div className="row">
                  <div className="col pr-1 md-6">
                    <div className="form-group my-1">
                      <label>Email</label>
                      <input
                        type="email"
                        name="email"
                        value={this.state.input.email}
                        readOnly
                        className="form-control"
                        id="email-owner"
                      />
                    </div>
                  </div>
                  <div className="col pl-1 md-6">
                    <div className="form-group my-1">
                      <label>Fecha de nacimiento</label>
                      <input
                        type="Date"
                        name="birthday"
                        value={this.state.input.birthday}
                        readOnly
                        className="form-control"
                        id="phone-owner"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </>
        );
      }
    } else {
      return <Spinner />;
    }
  }
}