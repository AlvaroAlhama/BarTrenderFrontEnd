import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';

class BeerPieChart extends Component{
  constructor(props){
    super(props);
    this.state = {
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
    }
  }

  static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'right',
    location:'City'
  }

  render(){
    return (
      <div className="chart">
        <Pie
          data={this.state.chartData}
          options={{
            title:{
              display:this.props.displayTitle,
              text:'¿Qué se busca más?',
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
        />
        
      </div>
        )
  }
}

export default BeerPieChart;