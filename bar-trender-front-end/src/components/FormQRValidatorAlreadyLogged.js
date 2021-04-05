
import React from "react";
import { Modal, ModalBody } from "reactstrap";

import "../assets/css/EstablishmentQrScan.css"
import fail_boy from "../assets/img/fail-scan.png";
import barTrender60 from "../assets/img/barTrender60.png";
import success_boy from "../assets/img/success_scan-min.png";

class FormQRValidatorAlreadyLogged extends React.Component {

  constructor() {
    super();

    this.state = {

      input: {},

      errors: {},

      modalFail: false,
      
      modalSuccess: false,

    };
    this.getDiscountResult = this.getDiscountResult.bind(this);
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
      this.setState({modalSuccess:true})
    }else{
      const data = await response.json();
      this.setState({error: data.error, modalFail: true})

      
    }

  }

  render() {
    return (
      <>
        
        <div class = "row justify-content-center">
          <button className="btn btn-primary" onClick = {this.getDiscountResult}>Valida el descuento</button>
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

export default FormQRValidatorAlreadyLogged;

