import React from "react";
import bg from '../../assets/img/principalDefDef-min.jpeg';

// reactstrap components
import 'font-awesome/css/font-awesome.min.css';
import './LandingPageHeader.css';
import video from "../../assets/videos/Beer.mp4";

// core components

function LandingPageHeader() {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    // if (window.innerWidth > 991) {
    //   const updateScroll = () => {
    //     let windowScrollTop = window.pageYOffset / 3;
    //     pageHeader.current.style.transform =
    //       "translate3d(0," + windowScrollTop + "px,0)";
    //   };
    //   window.addEventListener("scroll", updateScroll);
    //   return function cleanup() {
    //     window.removeEventListener("scroll", updateScroll);
    //   };  
    // }
  }); 
  return (
    <>
    <header>
    <div class="overlay"></div>
    <video controls autoPlay loop muted id="myVideo">
     <source src={video} type="video/mp4" /> 
    </video>  
    
    <div class="container h-100">
      <div class="d-flex h-100 text-center align-items-center">
        <div class="w-100 text-white">
          <h1 class="display-3">BarTrender</h1>
          <p class="lead mb-0">Tu busca tu gente, nosotros te buscamos los bares</p>
        </div>
      </div>
    </div>
  </header>
    </>
  );
}

export default LandingPageHeader;
