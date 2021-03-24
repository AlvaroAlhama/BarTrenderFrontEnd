import MainNavbar from "components/Navbars/MainNavbar";
import React from "react";

import barTrender60 from "../assets/img/barTrender60.png";
import success_boy from "../assets/img/success_scan-min.png";

const EstablishmentQrScan = (props) => {
  const { establishments } = props;
  var token = sessionStorage.getItem("token");
  document.body.style.fontFamily = "Dosis";
  if (!token) {
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
              style={{ maxWidth: "15%" }}
            />
          </div>
          <div class="row justify-content-center mt-5">
            <h3>
              <a href="/index" className="text-decoration-none text-white">
                Volver a inicio
              </a>
            </h3>
          </div>
        </div>
      </>
    );
  } else {
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
          <div class="row justify-content-center mt-3">
            <img
              src={success_boy}
              className="img-fluid"
              style={{ maxWidth: "15%" }}
            />
          </div>
          <div class="row justify-content-center mt-5">
            <h3>
              <a href="/index" className="text-decoration-none text-white">
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
