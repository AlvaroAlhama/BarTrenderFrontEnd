import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';

class BeerChart extends Component{
  constructor(props){
    super(props);
    this.state =this.props.data;
   
  }


  

  render(){

       var graph2 = {
      chartData:{
        labels: ['Billar', 'Pista de Baile', 'Futbolin', 'Otros'],
        datasets:[
          {
            label:'Busquedas',
            data:[
              111455,
              23444,
              13060,
              331,
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
        
        <Bar
          data={graph2.chartData}
          options={{
            title:{
              display:this.props.displayTitle,
              text:'Usuarios por tipo de cerveza',
              fontSize:25
            },
            legend:{
              display:false
              
            }
          }}
        />

        {/*<Line
          data={this.state.chartData}
          options={{
            title:{
              display:this.props.displayTitle,
              text:'Largest Cities In '+this.props.location,
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
        />

        <Pie
          data={this.state.chartData}
          options={{
            title:{
              display:this.props.displayTitle,
              text:'Largest Cities In '+this.props.location,
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
        />
        */}
      </div>
        )
  }
}

export default BeerChart;