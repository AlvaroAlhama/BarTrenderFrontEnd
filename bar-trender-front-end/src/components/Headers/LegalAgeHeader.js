import React from "react";

// reactstrap components
import 'font-awesome/css/font-awesome.min.css';
import './LandingPageHeader.css';
import video from "../../assets/videos/Beer.gif"

// core components

function LegalAgeHeader() {
    var legalAge = "";

    function setLegalAge(){
      legalAge = "+18";
      sessionStorage.setItem("legalAge",legalAge);
      window.location.reload();
    }

    function setIllegalAge(){
      legalAge = "-18";
      sessionStorage.setItem("legalAge",legalAge);
      window.location.reload();
    }

  return (
    <>
    <header style={{background: "url("+video+") no-repeat center center fixed", WebkitBackgroundSize: "cover", MozBackgroundSize: "cover", OBackgroundSize: "cover", backgroundSize:"cover"}}>

      <div className="container d-flex h-100 text-center align-items-center">
        <div className="w-100 text-white">
          
          <h1 className="display-3" style={{fontSize:"35px"}}>Para hacer uso de esta aplicación necesita ser mayor de 18 años!</h1>
          <button type="button" className="mx-5 btn btn-primary" onClick={() => setLegalAge() }>Soy mayor de edad</button>

          <button type="button" className="mx-5 btn btn-primary" onClick={() => setIllegalAge()}>Soy menor de edad</button>
        </div>
      </div>
 
  </header>
    </>
  );
}

export default LegalAgeHeader;