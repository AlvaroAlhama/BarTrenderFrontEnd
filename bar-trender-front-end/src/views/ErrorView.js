import React from "react";
import DeviceIdentifier from 'react-device-identifier';

// reactstrap components
import {
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import MainNavbar from "../components/Navbars/MainNavbar.js";
import LandingPageHeader from "../components/Headers/LandingPageHeader.js";
import DefaultFooter from "../components/Footers/DefaultFooter.js";

// images
import image_left from '../assets/img/expositions/hU-kQ3Epxeq2dhaBpUgYfYaPhHEOKXnHXSeUqLjTygYBV05OHhUSZEWilh_Da9zkI1d_cgz91KIPevD_BBhBWhaKevognkx6Bv7-QwkQdRG9oznKG6wOae4avH8ksi6bkJBLWl4.png';
import image_left_2 from "../assets/img/expositions/Yn0xRl4G5E1eabgf9nyC9j6DVQVHd5DBNcPehVZwakLHYP-toRbW22a8kFesYK_taX0ZY_WviWVcT3bQ40tlKhaKSuAQAu6graIF.png";
import image_right from "../assets/img/expositions/TR9IDnSgMV79XktfRCxesUmLacTZJI9fb3Cv3-aMamIGyWdL_OagKWYcJJAPqgm62bjW9I6yHlMsOhowVROsAUiNui0CGo-qmPU-.png";
import employee_0 from "../assets/img/carlos.png";
import employee_2 from '../assets/img/victor.png';
import employee_3 from '../assets/img/enrique.png';
import employee_4 from '../assets/img/alvaro.png';
import employee_5 from '../assets/img/jose.png';
import employee_6 from '../assets/img/carlos-pardo.png';
import employee_7 from '../assets/img/alejandro.png';
import employee_8 from '../assets/img/xema.png';
import employee_9 from '../assets/img/miguel.png';
import employee_10 from '../assets/img/miguel-angel.png';
import employee_11 from '../assets/img/fran.png';

function ErrorView() {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
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