import React from 'react';

import ModalSelectedElement from "./Modals/ModalSelectedElement.js";

import {
  Col,
} from "reactstrap";

const List = (props) => {
  const { establishments } = props;
  
 

  if (!establishments || establishments.length === 0 ) return <h3 className="text-center text-danger">No existe ningún establecimiento con los filtros introducidos.</h3>;
  return (

    <ul className="ul-flex">
      <h2 className='list-head text-center'>Establecimientos</h2>
      
      <div className='list' style={{display: 'flex', flexFlow: 'row wrap'}}>
        {establishments.map((establishment) => {
         
          return (
            <>
              <Col lg="4" md="6" xs="12" className="mb-4" >              
                  <ModalSelectedElement element={establishment} />
              </Col>
            </>
          );
        })}
      </div>
    </ul>
  );
};
export default List;
