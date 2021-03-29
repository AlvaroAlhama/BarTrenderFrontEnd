import React, { useEffect, useState, Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';


  function BeerPieChart(props) {
    
    const [modal1, setModal1] = React.useState(false);
    const [modal2, setModal2] = React.useState(false);
    const { element } = props;
    const [appState, setAppState] = useState({
      stats: {},
    });
    
    {/*
      //Falla que no reconoce lo del body
   

     useEffect(() => {
      const apiUrl = "http://develop-backend-sprint-01.herokuapp.com/v1/stats/get";
      async function loadStats(){
        await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apiKey':'8dDc431125634ef43cD13c388e6eCf11',
            'token': '',
          },
         
          body: JSON.stringify({ tag: 'bebida' })
        }).then(response => response.json())
          .then(stats => {
            setAppState({ stats: stats });
          });} 
          loadStats()
    },[setAppState]);
  */}
  
    var GraphData = {
      chartData:{
        labels: ['Cruzcampo', 'Mahou', 'Paulaner', 'Otros'],
        datasets:[
          {
            label:'Busquedas',
            data:[
              217594,
              181045,
              153060,
              136519,
            ],
            backgroundColor:[
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
            ],
            
          }
        ]
      
    }
  };

  

    return (
      <div className="chart">
        <Pie
          data={GraphData}
          options={{
            title:{
              display:true,
              text:'¿Qué se busca más?',
              fontSize:25
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
        
      </div>
        )
  }


export default BeerPieChart;