import React, { useEffect, useState} from 'react';

import bartrenderBlack from "./Images/bartrenderBlack.png";


function DashboardTopImage(props) {

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
  },[setAppState, props]);


  var imgBest = bartrenderBlack
  var nameBest = "No hemos encontrado el elemento más buscado"

  if (appState.stats.first !== undefined) {
    if (appState.stats.first.name !== "None"){
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
