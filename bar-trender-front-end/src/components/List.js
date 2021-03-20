import React from 'react';

import ModalSelectedElement from "./ModalSelectedElement.js";

import {
  Row,
  Col,
} from "reactstrap";

const List = (props) => {
  const { repos } = props;
  if (!repos || repos.length === 0) return <p>No repos, sorry</p>;
  return (

    <ul className="ul-flex">
      <h2 className='list-head'>Available Public Repositories</h2>
      <Row className='list'>
        {repos.map((repo) => {
          return (
            <>
              <Col className="col-lg-3 col-md-3 mb-4" >
                <div class="card h-100">
                  <ModalSelectedElement element={repo} />
                  <div class="card-body card-img-top">
                    <p class="card-title">
                      {repo.name}
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
