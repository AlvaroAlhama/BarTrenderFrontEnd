import React, { useEffect, useState, Component } from 'react';

import bartrenderBlack from "./Images/bartrenderBlack.png";
import cruzcampo from "./Images/cruzcampo.png";
import heineken from "./Images/heineken.png";
import paulaner from "./Images/paulaner.jpg";

import dardos from "./Images/dardos.jpg";
import futbolin from "./Images/futbolin.png";



function DashboardTopImage(props) {

  const [modal1, setModal1] = React.useState(false);
  const [modal2, setModal2] = React.useState(false);
  const { element } = props;

  const [appState, setAppState] = useState({
    stats: {},
  });

  useEffect(() => {
    var token = sessionStorage.getItem("token");

    const apiUrl = "https://develop-backend-sprint-01.herokuapp.com/v1/stats/get";

    async function loadStats() {
      await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token,
        },

        body: JSON.stringify({ filter: props.filter })
      }).then(response => response.json())
        .then(stats => {
          setAppState({ stats: stats });
        });
    }
    loadStats()
  }, [setAppState]);


  var imgBest = bartrenderBlack
  var nameBest = "No hemos encontrado el elemento más buscado"
  if (appState.stats.first != undefined) {
    if (appState.stats.first.name != "None"){
      nameBest = appState.stats.first.name
      imgBest = appState.stats.first.photo_url
    }
  }
  

  return (
    <div>
      <h4 className='text-center'>{nameBest} </h4>
      <img src= {imgBest} alt="Bartrender Best" style={{width:'30em', height:'20em'}}></img>
    </div>
      
  )
}


export default DashboardTopImage;
