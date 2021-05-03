import React from 'react';

import './App.css';
const url_dev = process.env.REACT_APP_URL_DEV;


export default class App extends React.Component {
  
  state = {
    loading: true,
    qr: undefined,
    error: undefined,
  };
  

  async componentDidMount()
  {
    var token = sessionStorage.getItem("token");
    const id_establishment = this.props.idEstablishment;
    const id_discount = this.props.idDiscount;
    
    if(!token){
      this.setState({error: "Necesitas haber iniciado sesión para poder ver el descuento"})
    }else{
      const url = url_dev+'establishments/'+id_establishment+'/discounts/'+id_discount+'/getQR?custom_host=bartrender-sprint-03.netlify.app';
   

      const response = await fetch(url, {
        method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'token': token,
            'apiKey':'8dDc431125634ef43cD13c388e6eCf11'
          }
      });
      if(response.status === 200){
        const data = await response.blob();
        this.setState({qr: URL.createObjectURL(data), loading: false});
      }else{
        const data = await response.json();
        this.setState({loading: false, error: data.error});
      }
    }
  }
  
  render(){
    return (
      <div className="App">
          <img src={this.state.loading || this.state.qr !== undefined ? this.state.qr : undefined} alt="" />
          <p>{this.state.error !== undefined ? this.state.error: undefined}</p>
      </div>
    );
  }
}
