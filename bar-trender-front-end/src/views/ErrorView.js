import React from "react";
import DeviceIdentifier from 'react-device-identifier';


// core components
import MainNavbar from "../components/Navbars/MainNavbar.js";
import LandingPageHeader from "../components/Headers/LandingPageHeader.js";
import DefaultFooter from "../components/Footers/DefaultFooter.js";




function ErrorView() {
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("landing-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);
  return (
    <>
    <DeviceIdentifier isDesktop={true} isTablet={true} isMobile={true}>
      <MainNavbar />
      <div className="wrapper">
        <LandingPageHeader />
        
        <div className="main">
            <div align="center">
                <h1> Hubo un error, disculpen las molestias</h1>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg117puWPc1HEl5zdUouTXQvse8pQPxyGc_A&usqp=CAU" alt="OOPS"></img>
            </div>
        </div>
         
       
        <DefaultFooter />
      </div>
      </DeviceIdentifier>
    </>
  );
}


export default ErrorView;

