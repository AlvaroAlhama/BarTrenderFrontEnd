import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Spinner } from 'reactstrap';

function toFixed(num, fixed) {
  
  var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?'); //eslint-disable-line
  var res = num.toString().match(re)[0];
  return res
}

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
    const apiUrl = "https://main-backend-ppl.herokuapp.com/v1/stats/get";

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
  },[props.filter]);

  
  var graph2 
  if(props.filter === 'Bebida'){
    if (bebidaState.statsBebida.first !== undefined) {
      graph2 = {
        chartData: {
          labels: [bebidaState.statsBebida.first.name, bebidaState.statsBebida.second.name, bebidaState.statsBebida.third.name, 'Otros'],
          datasets: [
            {
              label: 'Busquedas',
              data: [
                toFixed(bebidaState.statsBebida.first.percentage,2),
                toFixed(bebidaState.statsBebida.second.percentage,2),
                toFixed(bebidaState.statsBebida.third.percentage,2),
                toFixed(bebidaState.statsBebida.other.percentage,2),
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
      return(
        <Spinner/>
      )
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
                toFixed(ocioState.statsOcio.first.percentage,2),
                toFixed(ocioState.statsOcio.second.percentage,2),
                toFixed(ocioState.statsOcio.third.percentage,2),
                toFixed(ocioState.statsOcio.other.percentage,2),
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
      return(
        <Spinner/>
      )
    }
  }


  return (
    <>
    {bebidaState.statsBebida === {} || ocioState.statsOcio === {} ? "" : 
    <div className="chart w-100">
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
          },
          scales: {
            x: {
                suggestedMin: 100,
                suggestedMax: 150
            }
          },
        }
      }
      />

    </div>
    }
    </>
  )
}


export default BeerPieChart;