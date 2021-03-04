import React from 'react';
import logo from './logo.svg';
import './App.css';

export default class App extends React.Component {
  
  state = {
    loading: true,
    qr: null,
  };
  
  async componentDidMount()
  {
    const url = 'http://localhost:8000/main/test/';
    const response = await fetch(url);
    const data = await response.blob();
    this.setState({qr: URL.createObjectURL(data), loading: false})
  }

  render(){
    return (
      <div className="App">
          <img src={this.state.loading || this.state.qr != null ? this.state.qr : logo} alt="logo" />
      </div>
    );
  }
}