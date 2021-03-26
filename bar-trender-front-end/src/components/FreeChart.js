import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';

class BeerChart extends Component{
  constructor(props){
    super(props);
    this.state =this.props.data;
  }

  render(){
    return (
      <div className="chart">
        <Bar
          data={this.state.chartData}
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