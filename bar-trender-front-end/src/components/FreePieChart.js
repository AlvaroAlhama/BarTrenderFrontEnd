import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';

class BeerPieChart extends Component{
  constructor(props){
    super(props);
    this.state = 
      this.props.data;
    
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