import React from "react";
import { Modal, ModalBody } from "reactstrap";
import POSTCreateDiscount from "../ApiCreateDiscountForm";

function ModalDiscount() {
  const [modal1, setModal1] = React.useState(false);

  var token = sessionStorage.getItem("token");
  return (
    <>
      <i
        color="primary"
        className="mr-1"
        onClick={() => setModal1(true)}
        id="login-discounttip"
        className="fad fa-tags"
      ></i>
      <p className="d-lg-none d-xl-none">Nuevo descuento</p>
      <Modal isOpen={modal1} toggle={() => setModal1(false)}>
        <div className="modal-header justify-content-center">
          <button
            className="close"
            type="button"
            onClick={() => setModal1(false)}
          >
            <i className="now-ui-icons ui-1_simple-remove"></i>
          </button>
          <h4 className="title title-up">Nuevo descuento</h4>
        </div>
        <div class="container">
          <hr />
        </div>
        <ModalBody>
          <POSTCreateDiscount />
        </ModalBody>
      </Modal>
    </>
  );
}

export default ModalDiscount;
