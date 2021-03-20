import React from 'react';
import ModalSelectedElement from "../components/ModalSelectedElement.js";

// import  "../assets/css/FilterResults.css";

import {
  Button,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

const List = (props) => {
  const { repos } = props;
  if (!repos || repos.length === 0) return <p>No repos, sorry</p>;
  return (

    <ul className="ul-flex">
      <h2 className='list-head'>Available Public Repositories</h2>
      <Row  className='list'>
      {repos.map((repo) => {
              return (
                <>
                      {/* <Col className="" md="4">
                      <Col className="ml-auto mr-auto" md="2">
                      <span className='repo-text'>{repo.name} </span>
                      <span className='repo-description'>{repo.description}</span>
                      <br></br>
                      <span className='repo-html_url'>{repo.html_url}</span>
                      <ModalSelectedElement element={repo}/>
                      </Col> */}
                      {/* <Col className="" md="4"> */}
                      {/* <div class="col-lg-4 col-md-6 mb-4"> */}
                      <Col className="col-lg-3 col-md-3 mb-4" >
                        <div class="card h-100">
                        {/* <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""/></a> */}
                        <ModalSelectedElement element={repo}/>
                        <div class="card-body card-img-top">
                          <p class="card-title">
                          {repo.name}
                          </p>
                          {/* <h5>{repo.html_url}</h5>
                          <p class="card-text">{repo.description}</p> */}
                        </div>
                        {/* <div class="card-footer">
                          <small class="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
                        </div> */}
                      </div>
                      </Col>
                      
                    
                    {/* </Col> */}
                  
                {/* <li key={repo.id} className='list'>
                  <span className='repo-text'>{repo.name} </span>
                  <span className='repo-description'>{repo.description}</span>
                  <br></br>
                  <span className='repo-html_url'>{repo.html_url}</span>
                  
                  <ModalSelectedElement element={repo}/>
                </li> */}
                  </>
              );
            })}
            </Row>
      
    </ul>
    
  );
};
export default List;
