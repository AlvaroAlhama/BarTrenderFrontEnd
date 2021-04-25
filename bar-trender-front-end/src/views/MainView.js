// import React from "react";
import React from 'react';

// reactstrap components

// core components
import MainNavbar from "../components/Navbars/MainNavbar.js";
import LandingPageHeader from "../components/Headers/LandingPageHeader.js";

function LandingPage() {

  // Consuming REST GET
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
