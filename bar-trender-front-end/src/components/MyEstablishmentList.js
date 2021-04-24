import React from 'react';

import {
  Row,
  Col,
} from "reactstrap";

const MyEstablishmentList = (props) => {
  const { establishments } = props;
  


  if (!establishments || establishments.length === undefined) return <p>No establishments, sorry</p>;
  return (

    <ul className="ul-flex">
      <h2 className='list-head'>Mis Establecimientos</h2>
      <Row className='list'>
        {establishments.map((establishment) => {
          return (
            <>
              <Col className="col-lg-3 col-md-3 mb-4" >
                <div class="card h-100">
                  <div class="card-body card-img-top">
                    <p class="card-title">
                      {establishment.name_text}
                    </p>
                    <button type="buton" className= "btn btn-primary" onClick={() => window.location.href = "admin/establishment/"+establishment.id}>Ver Establecimiento</button>
                  </div>
                </div>
              </Col>
            </>
          );
        })}
      </Row>
    </ul>
  );
};
export default MyEstablishmentList;
