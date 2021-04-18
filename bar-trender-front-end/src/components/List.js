import React from 'react';

import ModalSelectedElement from "./Modals/ModalSelectedElement.js";

import {
  Row,
  Col,
} from "reactstrap";

const List = (props) => {
  const { establishments } = props;
  
  // console.log(establishments.establishments,"list");

  if (!establishments || establishments.length == undefined) return <p>No establishments, sorry</p>;
  return (

    <ul className="ul-flex">
      <h2 className='list-head'>Establecimientos</h2>
      <Row className='list'>
        {establishments.map((establishment) => {
          console.log(establishment);
          return (
            <>
              <Col className="col-lg-3 col-md-3 mb-4" >
                <div class="card h-100">
                  <ModalSelectedElement element={establishment} />
                  <div class="card-body card-img-top">
                    {/* <p class="card-title">
                      {establishment.name}
                    </p> */}
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
export default List;
