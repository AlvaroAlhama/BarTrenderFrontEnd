import React from 'react';

import ModalSelectedElement from "./Modals/ModalSelectedElement.js";

import {
  Row,
  Col,
} from "reactstrap";

const List = (props) => {
  const { establishments } = props;
  if (!establishments.establishments || establishments.establishments.length == undefined) return <p>No repos, sorry</p>;
  return (

    <ul className="ul-flex">
      <h2 className='list-head'>Establecimientos</h2>
      <Row className='list'>
        {establishments.establishments.map((establishment) => {
          return (
            <>
              <Col className="col-lg-3 col-md-3 mb-4" >
                <div class="card h-100">
                  <ModalSelectedElement element={establishment} />
                  <div class="card-body card-img-top">
                    <p class="card-title">
                      {establishment.name_text}
                    </p>
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
