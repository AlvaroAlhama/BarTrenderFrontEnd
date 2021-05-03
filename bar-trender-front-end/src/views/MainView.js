// import React from "react";
import React from 'react';

// reactstrap components

// core components
import MainNavbar from "../components/Navbars/MainNavbar.js";
import LandingPageHeader from "../components/Headers/LandingPageHeader.js";
import LegalAgeHeader from 'components/Headers/LegalAgeHeader.js';
import IllegalAge from 'components/Headers/IllegalAge';

function LandingPage() {
  
  var legalAge = sessionStorage.getItem("legalAge");
  console.log(legalAge);
  // Consuming REST GET
  if(!legalAge){
    return(
      <>
      <LegalAgeHeader/>
      </>
    );
  }else{
    if(legalAge == "+18"){
  return (
    <>
      <MainNavbar />
      <div className="wrapper">
        <LandingPageHeader />
       
        </div>       
       

    </>
  );
  }else{if(legalAge == "-18"){
    return(
    <>
    <IllegalAge/>
    </>
  );}}
}}

export default LandingPage;
