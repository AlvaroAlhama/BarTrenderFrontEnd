/*eslint-disable*/
import React from "react";
import bg from '../../assets/img/principalDefDef-min.png';
// reactstrap components
import { Container } from "reactstrap";
// core components

function IndexHeader() {
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

export default IndexHeader;
