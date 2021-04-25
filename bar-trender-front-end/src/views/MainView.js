// import React from "react";
import React from 'react';

// reactstrap components

// core components
import MainNavbar from "../components/Navbars/MainNavbar.js";
import LandingPageHeader from "../components/Headers/LandingPageHeader.js";
import LegalAgeHeader from 'components/Headers/LegalAgeHeader.js';

function LandingPage() {
  
  var legalAge = sessionStorage.getItem("legalAge");
  // Consuming REST GET
  if(!legalAge){
    return(
      <>
      <LegalAgeHeader/>
      </>
    );
  }
  return (
    <>
      <MainNavbar />
      <div className="wrapper">
        <LandingPageHeader />
       
        </div>       
       

    </>
  );
}

export default LandingPage;
