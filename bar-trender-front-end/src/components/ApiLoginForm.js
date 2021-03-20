import React from 'react';


class POSTLoginForm extends React.Component {

  constructor() {
    super();

    this.state = {
      login: {
        email: "client1@email.com",
        password: "holamundo."
      },
      input: {},
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    alert("A form was submitted: " + JSON.stringify(this.state));


    // this.props.searchEngine(this.state.term);
    /* fetch('https://127.0.0.1:8000/authentication/login/', {
         method: 'POST',
        // We convert the React state to JSON and send it as the POST body
        body: JSON.stringify(this.state.login)
       }).then(function(response) {
         console.log(response)
         console.log("SE HA LOGUEADO DE LOCOS")
         return response.json();
       });*/


  }

  handleChange(event) {
    let input = this.state.input;
    input[event.target.name] = event.target.value;
    this.setState({
      input
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.validate()) {
      console.log(this.state);
      let input = {};
      input["email"] = "";
      input["password"] = "";
      this.setState({ input: input });
      const response = fetch("http://127.0.0.1/authentication/login",
        {
          method: 'POST',
          body: JSON.stringify(this.state.login),
          headers: {
            'X-Api-Key': 'apikeytest',
            'Content-Type': 'application/json'
            // Other possible headers
          }
        }
      );
      // This log can be deleted
      console.log(response);
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
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(input["email"])) {
        isValid = false;
        errors["email"] = "Escriba una dirección de correo electrónico correcta.";
      }
    }
    if (!input["password"]) {
      isValid = false;
      errors["password"] = "Escriba una contraseña.";
    }

    this.setState({
      errors: errors
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

              id="email" />

            <div className="text-danger">{this.state.errors.email}</div>

          </div>


          <div class="form-group my-4">
            <input


              name="password"

              type="password"


              value={this.state.input.password}


              onChange={this.handleChange}

              placeholder="Contraseña"

              class="form-control" />




            <div className="text-danger align-center">{this.state.errors.password}</div>

          </div>


          <div class="text-center">
            <input type="submit" value="Iniciar sesión" class="btn btn-primary" />
          </div>


        </form>

      </div>

    );

  }

}

export default POSTLoginForm;

