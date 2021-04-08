import React, { useEffect, useState, Component } from 'react';

import PremiumBarChart from "./PremiumBarChart.js"

  import {
    Card,
  } from "react-bootstrap";
  

  function ShowPremiumStats(props) {
    const [modal1, setModal1] = React.useState(false);
    const [modal2, setModal2] = React.useState(false);
    const { element } = props;


  return(
        
    <Card  style={{width:"80%", height:"60%"}}>
    <Card.Body>
    
    <PremiumBarChart filter = {props.filter} zone = {props.zone}/>
    </Card.Body>
    <Card.Footer>
      <hr></hr>
      <div className="stats">
        <i className="now-ui-icons loader_refresh spin"></i>
        Datos obtenidos de la api de Bartrender
      </div>
    </Card.Footer>
  </Card>



  )
  }
  export default ShowPremiumStats