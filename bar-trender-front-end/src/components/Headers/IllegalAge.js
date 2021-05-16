import React from "react";

// reactstrap components
import 'font-awesome/css/font-awesome.min.css';
import './LandingPageHeader.css';
import video from "../../assets/videos/Beer.gif";

// core components

function LegalAgeHeader() {

  return (
    <>
    <header style={{background: "url("+video+") no-repeat center center fixed", WebkitBackgroundSize: "cover", MozBackgroundSize: "cover", OBackgroundSize: "cover", backgroundSize:"cover"}}>
      <div className="container d-flex h-100 text-center align-items-center">
        <div className="w-100 text-white">
          <h1 className="display-3"  style={{fontSize:"35px"}}>Para hacer uso de esta aplicación necesita ser mayor de 18 años</h1>
        </div>
      </div>
 
  </header>
    </>
  );
}

export default LegalAgeHeader;