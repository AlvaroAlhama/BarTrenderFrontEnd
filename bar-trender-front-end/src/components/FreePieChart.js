import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';



function BeerPieChart(props) {

  const [ocioState, setOcioState] = useState({
    statsOcio: {},
  });

  const [bebidaState, setBebidaState] = useState({
    statsBebida: {},
  });

  useEffect(() => {
    var token = sessionStorage.getItem("token");

    var send = {'filter': props.filter}
    const apiUrl = "https://develop-backend-sprint-01.herokuapp.com/v1/stats/get";

    async function loadStats() {
      await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token,
        },

        body: JSON.stringify( {filter: send.filter} )
      }).then(response => response.json())
        .then(stats => {
          if(props.filter === 'Bebida'){
            setBebidaState({ statsBebida: stats });
          }else if(props.filter === 'Ocio')
          setOcioState({ statsOcio: stats });
        });
    }
    loadStats()
  }, [setBebidaState, setOcioState]);

  
  var graph2
  if (bebidaState.statsBebida.first !== undefined) {
    graph2 = {
      chartData: {
        labels: [bebidaState.statsBebida.first.name, bebidaState.statsBebida.second.name, bebidaState.statsBebida.third.name, 'Otros'],
        datasets: [
          {
            label: 'Busquedas',
            data: [
              bebidaState.statsBebida.first.percentage,
              bebidaState.statsBebida.second.percentage,
              bebidaState.statsBebida.third.percentage,
              bebidaState.statsBebida.other.percentage,
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
 
  if(props.filter === 'Bebida'){
    if (bebidaState.statsBebida.first !== undefined) {
      graph2 = {
        chartData: {
          labels: [bebidaState.statsBebida.first.name, bebidaState.statsBebida.second.name, bebidaState.statsBebida.third.name, 'Otros'],
          datasets: [
            {
              label: 'Busquedas',
              data: [
                bebidaState.statsBebida.first.percentage,
                bebidaState.statsBebida.second.percentage,
                bebidaState.statsBebida.third.percentage,
                bebidaState.statsBebida.other.percentage,
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
  }else if(props.filter === 'Ocio') {
    if (ocioState.statsOcio.first !== undefined) {
      graph2 = {
        chartData: {
          labels: [ocioState.statsOcio.first.name, ocioState.statsOcio.second.name, ocioState.statsOcio.third.name, 'Otros'],
          datasets: [
            {
              label: 'Busquedas',
              data: [
                ocioState.statsOcio.first.percentage,
                ocioState.statsOcio.second.percentage,
                ocioState.statsOcio.third.percentage,
                ocioState.statsOcio.other.percentage,
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
  }


  return (
    <>
    {bebidaState.statsBebida === {} || ocioState.statsOcio === {} ? "" : 
    <div className="chart">
      <h3>¿Qué se busca más?</h3>
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
    }
    </>
  )
}


export default BeerPieChart;
