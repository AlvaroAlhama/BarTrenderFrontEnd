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
    const url = 'http://localhost:8000/v1/establishments/1/discounts/2/getQR';
    const response = await fetch(url, {
      method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImNsaWVudDFAZ21haWwuY29tIiwicm9sIjoiY2xpZW50IiwiZXhwaXJlc0luIjoxNjE2MzU1MDU0fQ.eat0K9BvcdCJ-nD9N3QLqkFZ5mQi3bc6RgRzJjKFG78',

        }
    });
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