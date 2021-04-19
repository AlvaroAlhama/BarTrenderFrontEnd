import React, { useEffect, useState, Component } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';



function BeerPieChart(props) {

  const [modal1, setModal1] = React.useState(false);
  const [modal2, setModal2] = React.useState(false);
  const { element } = props;



  const [appState, setAppState] = useState({
    stats: {},
  });

  useEffect(() => {
    var token = sessionStorage.getItem("token");
    console.log(token, 'token');
    const apiUrl = "https://main-backend-sprint-02.herokuapp.com/v1/stats/get";
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

  console.log(appState.stats, 'appState.stats');
  if (appState.stats.first != undefined) {
    var graph2 = {
      chartData: {
        labels: [appState.stats.first.name, appState.stats.second.name, appState.stats.third.name, 'Otros'],
        datasets: [
          {
            label: 'Busquedas',
            data: [
              appState.stats.first.percentage,
              appState.stats.second.percentage,
              appState.stats.third.percentage,
              appState.stats.other.percentage,
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
  } else {
    var graph2 = {
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


  return (
    <div className="chart">
      <br/>
      <h3>¿Qué se busca más?</h3>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <Pie
        data={graph2.chartData}
        options={{
          title: {
            display: false,
            text: '¿Qué se busca más?',
            fontSize: 25
          },
          legend: {
            display: true,
            position: 'right'
          }
        }}
      />

    </div>
  )
}


export default BeerPieChart;
