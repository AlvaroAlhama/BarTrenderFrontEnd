import React, { Component } from "react";
import { Col, Button, Form, FormGroup, Label, Input } from "reactstrap";
// import "./SearchBar.css";

class POSTForm extends Component {
constructor(props) {
    super(props);
        this.state = {
          filtro_a : "off",
          filtro_b : "off"
        };

    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTermChange(e) {
      this.setState({[e.target.name]: e.target.value});
    }

    handleSearch() {
        // this.props.searchEngine(this.state.term);
        alert('A form was submitted: ' + JSON.stringify(this.state));

        // fetch('https://your-node-server-here.com/api/endpoint', {
        //     method: 'POST',
        //     // We convert the React state to JSON and send it as the POST body
        //     body: JSON.stringify(this.state)
        //   }).then(function(response) {
        //     console.log(response)
        //     return response.json();
        //   });

    }

    handleEnter(e) {
        if (e.key === 13) {
        this.handleSearch();
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.handleSearch();
        
   }
   
   

render() {
    return (
    <Form className="searchbox" onSubmit={this.handleSubmit}>
        <FormGroup check>
        
        <Label check>
        <Input type="checkbox"
            placeholder="Filtro A"
            onChange={this.handleTermChange}
            onKeyDown={this.handleEnter}
            name="filtro_a"
            />
        <span className="form-check-sign"></span>
         Filtro a
        </Label>
        </FormGroup>
        <FormGroup check>
       
        <Label check>
        <Input type="checkbox"
            placeholder="Filtro B"
            onChange={this.handleTermChange}
            onKeyDown={this.handleEnter}
            name="filtro_b"
            />
        <span className="form-check-sign"></span>
         Filtro b
        </Label>
        </FormGroup>
        <FormGroup>
        <Col sm="2">
            <div className="">
            <Button
                onClick={this.handleSearch}
                className="btn"
            >
                Submit
            </Button>
            </div>
        </Col>
        </FormGroup>
    </Form>


    );
}
}

export default POSTForm;