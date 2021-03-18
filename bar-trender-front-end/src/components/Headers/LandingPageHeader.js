import React from "react";
import bg from '../../assets/img/principalDefDef-min.jpeg';

// reactstrap components
import { Button, Container } from "reactstrap";
import 'font-awesome/css/font-awesome.min.css';

// core components

function LandingPageHeader() {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };  
    }
  }); 
  return (
    <>

      <div className="page-header page-header-medium">
        <div
          className="page-header-image"
          style={{
            backgroundImage: `url(${bg})`,
          }}
          ref={pageHeader}
        ></div>
         
      </div>
    </>
  );
}

export default LandingPageHeader;
