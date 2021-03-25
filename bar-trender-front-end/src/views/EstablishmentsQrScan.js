import MainNavbar from "components/Navbars/MainNavbar";
import React, { useEffect, useState } from "react";

import "./css/EstablishmentQrScan.css"
import barTrender60 from "../assets/img/barTrender60.png";
import success_boy from "../assets/img/success_scan-min.png";
import fail_boy from "../assets/img/fail-scan.png";

function EstablishmentQrScan(){

var token = sessionStorage.getItem("token");
document.body.style.fontFamily = "Dosis";
const [appState, setAppState] = useState({
  loading: false,
  error:null
});

useEffect(() => {
setAppState({ loading: true });
const url = "https://develop-backend-sprint-01.herokuapp.com/v1/establishments/1/discounts/1/scan?client_id=1&redirect_url=www.google.es"
fetch (url, {
  method:"GET",
  headers:{
    "content-type": "application/json",
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Im93bmVyMUBnbWFpbC5jb20iLCJyb2wiOiJvd25lciIsImV4cGlyZXNJbiI6MTYxNjY3ODg4NX0.xAyBKGUQAk_jMrrcxIVNo2VHfXZkeMV6L2TfIqr_inQ",
  }
  }).then(response => response.json())
    .then(data => {
      setAppState({loading: false, error: data.error})
    });
}, [setAppState]);

if (appState.error != null) {
  document.body.style.backgroundColor = "#c21313";
  return (
    <>
      <div class="container mt-5 pt-5">
        <div class="row justify-content-center">
          <img src={barTrender60} class="img-fluid" />
          <h1 class="my-auto text-white ml-3">BARTRENDER</h1>
        </div>
        <div class="row justify-content-center mt-5">
          <h1 className="text-white text-center font-weight-bold">
            ¡OOPS! HA OCURRIDO EL SIGUIENTE PROBLEMA
          </h1>
        </div>
        <div class="row justify-content-center   mt-3">
          <h2 class="my-auto text-white justify-content-center">{appState.error}</h2>
          <img
            src={fail_boy}
            className="img-fluid"
            style={{ 
              width: "100%",
              maxWidth: "18.75em" }}
          />
        </div>
        <div class="row justify-content-center mt-5">
          <h3 id="index-button-fail">
            <a href="/index" className="text-white m-4">
              Volver a inicio
            </a>
          </h3>
        </div>
      </div>
    </>
  );

} else {
  document.body.style.backgroundColor = "#24a327";
  return (
    <>
      <div class="container mt-5 pt-5">
        <div class="row justify-content-center">
          <img src={barTrender60} class="img-fluid" />
          <h1 class="my-auto text-white ml-3">BARTRENDER</h1>
        </div>
        <div class="row justify-content-center mt-5">
          <h1 className="text-white text-center font-weight-bold">
            ¡DESCUENTO APLICADO CON ÉXITO!
          </h1>
        </div>

        <div class="row justify-content-center mt-3">
          <img
            src={success_boy}
            className="img-fluid"
            style={{ 
              width:"100%",
              maxWidth: "12.5em" }}
          />
        </div>
        <div class="row justify-content-center mt-5">
          <h3 id="index-button-success">
            <a href="/index" className="text-white m-4">
              Volver a inicio
            </a>
          </h3>
        </div>
      </div>
    </>
  );
  
  }
};
export default EstablishmentQrScan;
