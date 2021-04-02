import React from "react";

class POSTCreateDiscount extends React.Component {
  constructor() {
    super();

    this.state = {
      input: {},

      errors: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogin = this.handleCreate.bind(this);
  }

  async handleCreate() {
    let errors = {};
    console.log("FUNCIONA DE LOCOS");
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

      input["name"] = "";

      input["description"] = "";
      
      input["cost"] = "";

      input["totalCodes"] = "";
      
      input["initialDate"] = "";

      input["endDate"] = "";

      this.handleCreate(event);

    }

  }

  validate() {
    let input = this.state.input;

    var today = new Date();

    let errors = {};

    let isValid = true;

    if (!input["name"]) {
      isValid = false;

      errors["name"] = "Escriba un nombre del descuento.";
    }
    
    if (!input["descripcion"]) {
      isValid = false;

      errors["descripcion"] = "Escriba una descripción para el descuento";
    }

    
    if (!input["cost"] || input["cost"] <= 0) {
      isValid = false;

      errors["cost"] = "Escriba un precio para el descuento.";
    }

    if (!input["totalCodes"] || input["totalcodes"] <= 0 ) {
      isValid = false;

      errors["totalCodes"] = "Escriba un número total de códigos.";
    }

    if (!input["initialDate"]) {
      isValid = false;

      errors["initialDate"] = "Introduzca una fecha para el inicio del desucento.";
    }

    if (!input["endDate"]) {
      isValid = false;

      errors["endDate"] = "Introduzca una fecha para el fin del desucento.";
    }
    if (input["initialDate"] && input["endDate"]){
      var initialDate = new Date(input["initialDate"]);
      var endDate = new Date(input["endDate"]);
      if(initialDate<=today){
        isValid = false;
        errors["initialDate"] = "Introduzca una fecha de inicio posterior al día actual.";
      }
      if(endDate<=initialDate){
        isValid = false;
        errors["endDate"] = "Introduzca una fecha de fin posterior a la fecha de inicio.";
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
        <form onSubmit={this.handleSubmit}>
          <div class="form-group my-1">
            <input
              type="text"
              name="name"
              value={this.state.input.name}
              onChange={this.handleChange}
              class="form-control"
              placeholder="Nombre del descuento"
              id="name"
            />

            <div className="text-danger">{this.state.errors.name}</div>
          </div>
          <div class="form-group my-1">
            <input
              type="text"
              name="descripcion"
              value={this.state.input.descripcion}
              onChange={this.handleChange}
              class="form-control"
              placeholder="Descripción del descuento"
              id="name"
            />

            <div className="text-danger">{this.state.errors.descripcion}</div>
          </div>
          <div class="form-group my-1">
            <input
              type="number"
              step="0.01"
              name="cost"
              value={this.state.input.cost}
              onChange={this.handleChange}
              class="form-control"
              placeholder="Precio del descuento"
              id="cost"
            />

            <div className="text-danger">{this.state.errors.cost}</div>
          </div>
          <div class="form-group my-1">
            <input
              type="number"
              name="totalCodes"
              value={this.state.input.totalCodes}
              onChange={this.handleChange}
              class="form-control"
              placeholder="Número total de códigos"
              id="totalCodes"
            />

            <div className="text-danger">{this.state.errors.totalCodes}</div>
          </div>
          
          <div class="form-group my-1">
            <input
              type="date"
              name="initialDate"
              value={this.state.input.initialDate}
              onChange={this.handleChange}
              class="form-control"
              placeholder="Fecha de inicio del descuento"
              id="initialDate"
            />

            <div className="text-danger">{this.state.errors.initialDate}</div>
          </div>
          <div class="form-group my-1">
            <input
              type="date"
              name="endDate"
              value={this.state.input.endDate}
              onChange={this.handleChange}
              class="form-control"
              placeholder="Fecha de fin del descuento"
              id="endDate"
            />
            <div className="text-danger">{this.state.errors.endDate}</div>
          </div>
          <div class="text-center">
            <input
              type="submit"
              value="Crear descuento"
              class="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default POSTCreateDiscount;
