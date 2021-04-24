import React from "react";

// reactstrap components
import 'font-awesome/css/font-awesome.min.css';
import './LandingPageHeader.css';
import video from "../../assets/videos/Beer.gif";

// core components

function LandingPageHeader() {

  return (
    <>
    <header>
    <div class="overlay">
    <img className="beer" alt="" src={video}/> 
    </div>
    
   
      <div class="container d-flex h-100 text-center align-items-center">
        <div class="w-100 text-white">
          <h1 class="display-3">BarTrender</h1>
          <p class="lead mb-0">Tu busca tu gente, nosotros te buscamos los bares</p>
        </div>
      </div>
 
  </header>
    </>
  );
}

export default LandingPageHeader;
