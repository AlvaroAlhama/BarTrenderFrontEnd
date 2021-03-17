import React from "react";

// reactstrap components
// import {
// } from "reactstrap";

//css
import  "./css/FilterResults.css"

// core components
import IndexNavbar from "../components/Navbars/IndexNavbar.js";
import IndexHeader from "../components/Headers/IndexHeader.js";
import DarkFooter from "../components/Footers/DarkFooter.js";

// sections for this page
import Images from "./index-sections/Images.js";
import BasicElements from "./index-sections/BasicElements.js";
import Navbars from "./index-sections/Navbars.js";
import Tabs from "./index-sections/Tabs.js";
import Pagination from "./index-sections/Pagination.js";
import Notifications from "./index-sections/Notifications.js";
import Typography from "./index-sections/Typography.js";
import Javascript from "./index-sections/Javascript.js";
import Carousel from "./index-sections/Carousel.js";
import NucleoIcons from "./index-sections/NucleoIcons.js";
import CompleteExamples from "./index-sections/CompleteExamples.js";
import SignUp from "./index-sections/SignUp.js";
import Examples from "./index-sections/Examples.js";
import Download from "./index-sections/Download.js";

function FilterResults() {
  React.useEffect(() => {
    document.body.classList.add("index-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("index-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  return (
    <>
      
      <div className="wrapper">
        <div className="main">

        <IndexNavbar /> 
          {
            //Navbar ejemplo
          }
         
          
          <div class="container">  {/*style={StyleLeft}*/}
          <div class="row" >
          <div class="col-lg-3">
            <h3 class="my-4">Establecimientos en "Terraza y Stella Artois"</h3>
            <div class="list-group">
              <a href="#" class="my-4">Futbol</a>
              <a href="#" class="my-4">Hockey</a>
              <a href="#" class="my-4">Paulaner</a>
            </div>
          </div>
          {
            //Imagen 1
          }
           {
            // <div class="container" style={StyleRight}></div>
           }
            



            <div class="col-lg-4 col-md-6 mb-4">
            <div class="card h-100">
              <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""/></a>
              <div class="card-body">
                <h4 class="card-title">
                  <a href="#">Teteria Andauni</a>
                </h4>
                <h5>Hay descuento en paulaner</h5>
                <p class="card-text">C/ Adan y Eva,3 Castilleja de la cuesta, Sevilla</p>
              </div>
              <div class="list-group">
                <a href="#" class="my-4">Tetería, postres</a>
              </div>
            </div>
          </div>


            <div class="col-lg-4 col-md-6 mb-4">
            <div class="card h-100">
              <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""/></a>
              <div class="card-body">
                <h4 class="card-title">
                  <a href="#">Betis Sport Bar</a>
                </h4>
                <p class="card-text">Av. Italia s/n</p>
                <a href="#" class="my-4">Futbol, Ambiente</a>
              </div>
            </div>
          </div>



          <div class="col-lg-4 col-md-6 mb-4">
            <div class="card h-100">
              <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""/></a>
              <div class="card-body">
                <h4 class="card-title">
                  <a href="#">Café L'Epoque</a>
                </h4> 
                <p class="card-text">Av Padre García Tejero, S/N, Sevilla</p>
              </div>
              <a href="#" class="my-4">Tapas</a>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 mb-4">
            <div class="card h-100">
              <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""/></a>
              <div class="card-body">
                <h4 class="card-title">
                  <a href="#">Item Two</a>
                </h4>
                <h5>$24.99</h5>
                <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur! Lorem ipsum dolor sit amet.</p>
              </div>
              <div class="card-footer">
                <small class="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
              </div>
            </div>
          </div>

            {//</div>
            }
          </div>
          </div>
        </div>
        <DarkFooter />
      </div>
    </>
    
  );
}

export default FilterResults;