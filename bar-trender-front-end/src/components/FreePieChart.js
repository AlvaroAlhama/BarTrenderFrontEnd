import React, { useEffect, useState, Component } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';



function BeerPieChart(props) {

  const [modal1, setModal1] = React.useState(false);
  const [modal2, setModal2] = React.useState(false);
  const { element } = props;

  const [ocioState, setOcioState] = useState({
    statsOcio: {},
  });

  const [bebidaState, setBebidaState] = useState({
    statsBebida: {},
  });

  useEffect(() => {
    var token = sessionStorage.getItem("token");

    var send = { 'filter': props.filter }
    const apiUrl = "https://develop-backend-sprint-01.herokuapp.com/v1/stats/get";

    async function loadStats() {
      await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token,
        },

        body: JSON.stringify({ filter: send.filter })
      }).then(response => response.json())
        .then(stats => {
          if (props.filter == 'Bebida') {
            setBebidaState({ statsBebida: stats });
          } else if (props.filter == 'Ocio')
            setOcioState({ statsOcio: stats });
        });
    }
    loadStats()
  }, [setBebidaState, setOcioState]);



  if (bebidaState.statsBebida.first != undefined) {
    var graph2 = {
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

  if (props.filter == 'Bebida') {
    if (bebidaState.statsBebida.first != undefined) {
      var graph2 = {
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
  } else if (props.filter == 'Ocio') {
    if (ocioState.statsOcio.first != undefined) {
      var graph2 = {
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
  }

  const option = {
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          var dataset = data.datasets[tooltipItem.datasetIndex];
          var meta = dataset._meta[Object.keys(dataset._meta)[0]];
          var total = meta.total;
          var currentValue = dataset.data[tooltipItem.index];
          var percentage = parseFloat((currentValue / total * 100).toFixed(1));
          var currentValue = currentValue.toFixed(2);

          return currentValue + ' (' + percentage + '%)';
        },
        title: function (tooltipItem, data) {
          return data.labels[tooltipItem[0].index];
        }
      }
    },
    title: {
      display: false,
      text: '¿Qué se busca más?',
      fontSize: 25
    },
    legend: {
      display: true,
      position: 'right'
    }

  }

  return (
    <>
      {bebidaState.statsBebida == {} || ocioState.statsOcio == {} ? "" :
        <div className="chart w-100 p-3 ">
          <br />
          <h3 className='text-center'>¿Qué se busca más?</h3>

          <Pie
            data={graph2.chartData}
            options={option}
          />

        </div>
      }
    </>
  )
}


export default BeerPieChart;
