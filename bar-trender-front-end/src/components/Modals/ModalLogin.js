import React from "react";
import {Modal, ModalBody } from "reactstrap";
import POSTLoginForm from "../ApiLoginForm";
import GoogleLogin from 'react-google-login';
import moment from "moment";

function ModalLogin() {
  const [modal1, setModal1] = React.useState(false);
  const [errorLoginGoogle, setErrorLoginGoogle] = React.useState(undefined)
  const [errorBackend, setErrorBackend] = React.useState(undefined)
  const errorLink = 'https://aboutme.google.com/'
  const host = 'https://develop-backend-sprint-01.herokuapp.com/v1'

  function reportWindowSize() {
    const { innerWidth: width } = window;
    if(width < 750 && document.getElementById("logout-tooltip")!=null ){
      document.getElementById("logout-tooltip").classList.remove("mt-1");
      document.getElementById("logout-tooltip").classList.add("my-auto");
    }
    if(width > 750 && document.getElementById("logout-tooltip")!=null ){
      document.getElementById("logout-tooltip").classList.remove("my-auto");
      document.getElementById("logout-tooltip").classList.add("mt-1");
    }
  }
  reportWindowSize();
  window.addEventListener('resize', reportWindowSize);
  var token = sessionStorage.getItem("token");

  async function getResponse(response)
  {
    if(response.ok)
    {

      var r = await response.json();
      var token = r.token;
      var rol = r.rol;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("rol", rol);
      window.location.href = "/index";
    }
    else
    {
      const data = await response.json();
      setErrorBackend(data.error);
      setErrorLoginGoogle(undefined)
    }
  }

  const loginConClienteExito = (response) => {

    let user_info = {
      "token": response.tokenObj.id_token,
      "access_token": response.tokenObj.access_token,
      "google_id": response.profileObj.googleId,
      "email": response.profileObj.email,
      "birthday": undefined,
    }
    
    fetch('https://people.googleapis.com/v1/people/'+ user_info.google_id + '?personFields=birthdays&access_token=' + user_info.access_token, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((data) => {
      
      const birthday = data.birthdays !== undefined ? data.birthdays[0].date : undefined
      
      if(birthday)
      {        
        birthday.month -= 1

        user_info.birthday = moment.utc(birthday).unix();

        // Check If exist
        fetch(host + '/authentication/google', {
            method: 'POST',
            headers: {
              'apiKey': "8dDc431125634ef43cD13c388e6eCf11",
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              'user':user_info,
              'rol': 'client'
            })
         })
         .then((response) => {
            getResponse(response)
         })
      }
      else
      {
        setErrorLoginGoogle("No se ha podido acceder a tu fecha de nacimiento. Comprueba que es pública desde tu cuenta de Google.")
        setErrorBackend(undefined)
      }
    })
  }

  const loginConOwnerExito = (response) => {
    
    let user_info = {
      "token": response.tokenObj.id_token,
      "access_token": response.tokenObj.access_token,
      "google_id": response.profileObj.googleId,
      "email": response.profileObj.email,
      "phone": undefined,
    }
    
    fetch('https://people.googleapis.com/v1/people/'+ user_info.google_id + '?personFields=phoneNumbers&access_token=' + user_info.access_token, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((data) => {

      const phone = data.phoneNumbers !== undefined ? data.phoneNumbers[0].value : undefined
      
      if(phone)
      {
        user_info.phone = Number(parseInt(phone.replace(/ /g, ''), 10))

        // Check If exist
        fetch(host + '/authentication/google', {
            method: 'POST',
            headers: {
              'apiKey': "8dDc431125634ef43cD13c388e6eCf11",
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              'user':user_info,
              'rol': 'owner'
            })
         })
         .then((response) => {
            getResponse(response)
        })
      }
      else
      {
        setErrorLoginGoogle("No se ha podido acceder a tu teléfono. Comprueba que es pública desde tu cuenta de Google")
        setErrorBackend(undefined)
      }
    })
  }

  if (!token) {
    return (
      <>
        <i
          onClick={() => setModal1(true)}
          id="login-tooltip"
          className="fal fa-user text-white w-100 fa-lg mt-1"
        >
          <p className="d-lg-none d-xl-none my-auto text-white ml-2" style={{fontFamily:"Roboto", fontSize:"11.4272px", fontWeight:"400"}}>Inicio de Sesión</p>
        </i>
        
        <Modal isOpen={modal1} toggle={() => setModal1(false)}>
          <div className="modal-header justify-content-center">
            <button
              className="close"
              type="button"
              onClick={() => setModal1(false)}
            >
              <i className="now-ui-icons ui-1_simple-remove"></i>
            </button>
            <h4 className="title title-up">Inicio de Sesión</h4>
          </div>
          <div class="container">
            <hr />
          </div>
          <ModalBody>
            <POSTLoginForm />

            <br></br>

            <div className="App">
              <GoogleLogin
                clientId="660796874273-0tb6t8b3tbd63rfii5amcgo4mc45jejr.apps.googleusercontent.com"
                buttonText="INICIAR SESIÓN COMO CLIENTE"
                onSuccess={loginConClienteExito}
              />
            </div>

            <br></br>

            <div className="App">
              <GoogleLogin
                clientId="660796874273-0tb6t8b3tbd63rfii5amcgo4mc45jejr.apps.googleusercontent.com"
                buttonText="INICIAR SESIÓN COMO PROPIETARIO"
                onSuccess={loginConOwnerExito}
              />
            </div>

            <br></br>

            <p style={{color: 'red', textAlign: 'center'}}>{errorLoginGoogle == undefined ? "" : errorLoginGoogle} <a style={{color: 'blue'}} href={errorLoginGoogle == undefined ? "" : errorLink}>{errorLoginGoogle == undefined ? "" : errorLink }</a></p>
            <p style={{color: 'red', textAlign: 'center'}}>{errorBackend == undefined ? "" : errorBackend}</p>

          </ModalBody>
        </Modal>
      </>
    );
  } else {
    return (
      <>
        <i
          id="logout-tooltip"
          onClick={() => {
            sessionStorage.clear();
            window.location.href = "/index";
          }}
          className="fal fa-power-off text-white w-100 fa-lg mt-1"
          
        >
          <p className="d-lg-none d-xl-none my-auto text-white ml-2" style={{fontFamily:"Roboto", fontSize:"11.4272px", fontWeight:"400"}}>Cerrar Sesión</p>
        </i>
        
      </>
    );
  }
}

export default ModalLogin;
