import React from "react";

// reactstrap components
import 'font-awesome/css/font-awesome.min.css';
import './LandingPageHeader.css';
import video from "../../assets/videos/Beer.gif";

// core components

function LegalAgeHeader() {

  return (
    <>
    <header>
    <div class="overlay">
    <img className="beer" alt="" src={video}/> 
    </div>
    
   
      <div class="container d-flex h-100 text-center align-items-center">
        <div class="w-100 text-white">
          <h1 class="display-3">Para hacer uso de esta aplicación necesita ser mayor de 18 años</h1>
        </div>
      </div>
 
  </header>
    </>
  );
}

export default LegalAgeHeader;