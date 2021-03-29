import React, { useEffect, useState, Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';


  function BeerPieChart(props) {
    
    const [modal1, setModal1] = React.useState(false);
    const [modal2, setModal2] = React.useState(false);
    const { element } = props;
    const [appState, setAppState] = useState({
      stats: {},
    });
    
    constructor() {
      super();
  
      this.state = {
  
        input: {},
  
        errors: {},
  
        modalFail: false,
        
        modalSuccess: false,
  
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleLogin = this.handleLogin.bind(this);
      this.getDiscountResult = this.getDiscountResult.bind(this);
    }
  
     handleLogin(() => {
      
      let errors = {};
      var url = "http://localhost:8000/v1/authentication/login";
      // Call to the api with the credentials given by the user
      const response = await fetch(url, {
        method: "POST",
        headers: { apiKey: "8dDc431125634ef43cD13c388e6eCf11" },
        body: JSON.stringify(this.state.input),
      });
      if (response.ok) {
        var r = await response.json();
        var token = r.token;
        sessionStorage.setItem("token", token);
        this.getDiscountResult();
      } else {
        const data = await response.blob();
        this.setState({ loading: false });
        errors["email"] = "Email o contraseña incorrecta.";
      }
      this.setState({
        errors: errors,
      });
    })
  
  
      
   

     useEffect(() => {
      var token = sessionStorage.getItem("token");
      const apiUrl = "http://develop-backend-sprint-01.herokuapp.com/v1/stats/get";
      async function loadStats(){
        await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
           
            'token': "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImNsaWVudDFAZ21haWwuY29tIiwicm9sIjoiY2xpZW50IiwiZXhwaXJlc0luIjoxNjE2MzQ0Nzk2fQ.jh4OzXcxV-C9XTlkkWfl99_-4MViTHyjjJHgwKnYg_o",
          },
         
          body: JSON.stringify({ filter : 'Bebidas' })
        }).then(response => response.json())
          .then(stats => {
            setAppState({ stats: stats });
          });} 
          loadStats()
    },[setAppState]);
  

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