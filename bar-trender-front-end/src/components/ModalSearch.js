import React from "react";


// reactstrap components
import {
  Button,
  Modal,
  ModalBody,

} from "reactstrap";

// core components
import POSTForm from "./ApiFormSubmit";

function ModalSearch() {

  const [modal1, setModal1] = React.useState(false);
  return (
    
    <>
      <Button
        color="primary"
        className="mr-1"
        onClick={() => setModal1(true)}
      >
       Filtros
        </Button>
      <Modal isOpen={modal1} toggle={() => setModal1(false)}>
        <div className="modal-header justify-content-center">
          <button
            className="close"
            type="button"
            onClick={() => setModal1(false)}
          >
            <i className="now-ui-icons ui-1_simple-remove"></i>
          </button>
          <h4 className="title title-up">Filtros</h4>
        </div>
        <ModalBody>
          <POSTForm />
         
        </ModalBody>
        <div className="modal-footer">
          
          <Button
            color="danger"
            type="button"
            onClick={() => setModal1(false)}
          >
            Close
                    </Button>
        </div>
      </Modal>
    </>
  
  );
}

export default ModalSearch;

