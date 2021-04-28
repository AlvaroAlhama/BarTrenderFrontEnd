import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import moment from "moment";
import { Link } from "react-router-dom";

function PremiumBarChart(props) {

      const tsInitialDate = moment.utc(`${props.initialDate}`).unix();
      const tsEndDate = moment.utc(`${props.endDate}`).unix();
      const tsEndDateplus1 = tsEndDate+86400;
      
  const [appState, setAppState] = useState({
    stats: {},
  });

  useEffect(() => {
    var token = sessionStorage.getItem("token");
  
    const apiUrl = "https://develop-backend-sprint-01.herokuapp.com/v1/stats/getPremium";
    async function loadStats() {
      await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token,
        },

        body: JSON.stringify({  initial_date: tsInitialDate, end_date: tsEndDateplus1, zone: props.zone, filter:props.filter })
      }).then(response => response.json())
        .then(stats => {
          setAppState({ stats: stats });
        });
    }
    loadStats()
  }, [setAppState]);

  var graph2
  if (appState.stats.first !== undefined) {
    graph2 = {
      chartData: {
        labels: [appState.stats.first.name, appState.stats.second.name, appState.stats.third.name,appState.stats.fourth.name,appState.stats.fifth.name,appState.stats.sixth.name,appState.stats.seventh.name,appState.stats.eighth.name,appState.stats.ninth.name,'Otros'],
        datasets: [
          {
            label: 'Porcentajes',
            data: [
              appState.stats.first.percentage,
              appState.stats.second.percentage,
              appState.stats.third.percentage,
              appState.stats.fourth.percentage,
              appState.stats.fifth.percentage,
              appState.stats.sixth.percentage,
              appState.stats.seventh.percentage,
              appState.stats.eighth.percentage,
              appState.stats.ninth.percentage,
              appState.stats.other.percentage,
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
            ],

          }
        ]

      }
    };
  } 
  else {
    graph2 = {
      chartData: {
        labels: ['Billar', 'Futbolin', 'Futbol en television', 'Otros'],
        datasets: [
          {
            label: 'Busquedas',
            data: [
              10,
              20,
              30,
              40,
            ],
           
            
            
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
            ],

          }
        ]

      }
    };
  }
      if (props.filter !== "Bebida" && props.filter !== "Ocio" && props.filter !== "Instalacion"){
        return(
       <h3>Para comenzar introduzca algún filtro</h3>
        )
      }
      else if (props.initialDate === "" || props.endDate === ""){
        return(
       <h3 class="text-danger">Para mostrar el contenido se debe introducir una fecha inicial y una fecha final </h3>
        )
      }
      else if (props.zone === ""){
        return(
       <h3 class="text-danger">Para mostrar el contenido se debe introducir una zona</h3>
        )
      }
      else if(appState.stats.error === "A017: El usuario que está logeado no es premium"){
        return(
        <div>
          <h3>Para acceder a esta funcionalidad debe ser un usuario premium</h3> 
          <Link to="/admin/upgrade" className="btn btn-primary">Comprar Suscripción Premium</Link>
        </div>
        )
      }
      else {
  return (
    <div className="chart">
      <br/>
      
      <h3> {props.filter}  con mayor preferencia de los Usuarios en tu zona</h3>
      <div  style={{
                      height: "300px",
                    }} >
      <Pie
        data={graph2.chartData}
        options={{
          maintainAspectRatio: false,
          title: {
            display: true,
            text: 'Busquedas(%)',
            fontSize: 25
          },
          legend: {
            display: false,
            position: 'bottom'
          }
        }}
      />
      </div>

      <hr></hr>
        <p>Datos obtenidos de la api de Bartrender</p>
    </div>
    
  )
}

}
export default PremiumBarChart;
