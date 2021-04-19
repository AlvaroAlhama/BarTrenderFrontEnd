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
    console.log(token, 'token');
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

  //Añadir todas las cervezas posibles junto a las imagenes en la carpeta. Esto no es definitivo

  var imgBest = bartrenderBlack
  var nameBest = "No hemos encontrado el elemento más buscado"
  if (appState.stats.first != undefined) {
     nameBest = appState.stats.first.name
    if (nameBest == "Cruzcampo"){
     imgBest = cruzcampo
    }else if(nameBest == "Heineken"){
     imgBest = heineken
    }
    else if(nameBest == "Paulaner"){
      imgBest = paulaner
     }
    else if(nameBest == "Dardos"){
      imgBest = dardos
    }else if(nameBest == "Futbolin"){
        imgBest = futbolin
    }
  
}

  return (
    <div>
      <h4>{nameBest} </h4>
      <img src= {imgBest} alt="Bartrender Best"></img>
    </div>
      
  )
}


export default DashboardTopImage;
