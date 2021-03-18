import React, { Component } from "react";
import { Col, Button, Form, FormGroup, Label, Input } from "reactstrap";

class POSTForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombre: "",
            filtros: {
                billar: "off",
                paulanner: "off",
                reina_mercedes: "off",
                pueblos: "off",
                ochentero: "off",
                arabe: "off",
            },
        };

        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTermChange(e) {
        this.setState({ [e.target.name]: e.target.value });
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

                <FormGroup>
                    <Input
                        defaultValue=""
                        placeholder="Regular"
                        type="text"
                        name="nombre"
                        onChange={this.handleTermChange}
                    ></Input>
                </FormGroup>

                <FormGroup check>

                    <Label check>
                        <Input type="checkbox"
                            placeholder="Billar"
                            onChange={this.handleTermChange}
                            onKeyDown={this.handleEnter}
                            name="billar"
                        />
                        <span className="form-check-sign"></span>
                        Billar
                    </Label>
                </FormGroup>
                <FormGroup check>

                    <Label check>
                        <Input type="checkbox"
                            placeholder="Paulanner"
                            onChange={this.handleTermChange}
                            onKeyDown={this.handleEnter}
                            name="paulanner"
                        />
                        <span className="form-check-sign"></span>
                    Paulanner
                </Label>
                </FormGroup>
                <FormGroup check>

                    <Label check>
                        <Input type="checkbox"
                            placeholder="reina_mercedes"
                            onChange={this.handleTermChange}
                            onKeyDown={this.handleEnter}
                            name="reina_mercedes"
                        />
                        <span className="form-check-sign"></span>
                        Reina Mercedes
                </Label>
                </FormGroup>
                <FormGroup check>

                    <Label check>
                        <Input type="checkbox"
                            placeholder="pueblos"
                            onChange={this.handleTermChange}
                            onKeyDown={this.handleEnter}
                            name="pueblos"
                        />
                        <span className="form-check-sign"></span>
                    Pueblos
                </Label>
                </FormGroup>
                <FormGroup check>

                    <Label check>
                        <Input type="checkbox"
                            placeholder="ochentero"
                            onChange={this.handleTermChange}
                            onKeyDown={this.handleEnter}
                            name="ochentero"
                        />
                        <span className="form-check-sign"></span>
                    Ochentero
                </Label>
                </FormGroup>
                <FormGroup check>

                    <Label check>
                        <Input type="checkbox"
                            placeholder="arabe"
                            onChange={this.handleTermChange}
                            onKeyDown={this.handleEnter}
                            name="arabe"
                        />
                        <span className="form-check-sign"></span>
                    Estilo arabe
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