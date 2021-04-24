import React from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import ModalSelectedDiscount from "./Modals/ModalSelectedDiscount.js";

import {
  Row,
  Col,
} from "reactstrap";

const ListDiscount = (props) => {
  const { discounts } = props;
  
  
  if (!discounts.results || discounts.results.length == 0) return <p>No hay descuentos para este establecimiento</p>;
  return (

    <ul className="ul-flex">
      <h2 className='list-head text-center'>Descuentos</h2>
      <Row className='list'>
        {discounts.results.map((discount) => {
          return (
            <>
                <div class="card h-100">
                  <div class="card-body card-img-top">
                    <p class="card-title text-dark  ">
                      {discount.name_text}
                      
                    </p>
                    <ModalSelectedDiscount element={discount}/>
                  </div>
                </div>
            </>
          );
        })}
      </Row>
    </ul>
  );
};
export default ListDiscount;
