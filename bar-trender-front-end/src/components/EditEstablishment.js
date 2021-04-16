import React from 'react';
import Select from 'react-select';
import { Modal, ModalBody } from "reactstrap";
import POSTCreateDiscount from "../components/ApiCreateDiscountForm";

export default class EditEstablishment extends React.Component {
    constructor() {
        super();

        this.state = {

            input: {
                name_text: '',
                phone_number: '',
                zone_enum: '',
                desc_text: '',
                street_text: '',
                number_text: '',
                locality_text: '',
                image_ulr: '',
                tags:[]
            },

            selected: [],

            tagsChange: [],

            otherTags: [],
            
            zone: {
                zona:[]
            },
            
            sendFinal: {},

            modal1: false,
            errorsApiGet: {},
            errorsApiPut: {},
            errors: {},
            msg: null,

        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getTags()

        
    }

    async getTags() {
        var token = sessionStorage.getItem("token");
    
        const url = "http://develop-backend-sprint-01.herokuapp.com/v1/establishments/get_tags";
        const response = await fetch(url, {
          method: "GET",
          headers: {
            token: token,
            apiKey: "8dDc431125634ef43cD13c388e6eCf11",
          },
        });
        const data = await response.json();
        console.log(data)
        
        var otherTags = data.tags.map((tag) => {
            if(tag.type != 'Zona'){
                return {value: tag.name, label: tag.name}
            }
        });

        var arrayOther = otherTags.filter(function(dato){
            return dato != undefined;
        })

        console.log(arrayOther)

        const tagZone = data.tags.map((tag) =>{
            if(tag.type == 'Zona') {
                return tag.name
            }
        });

        var array = tagZone.filter(function(dato){
            return dato != undefined
        })

        this.setState({
            otherTags: arrayOther,

            zone: {
                zona: array
            }
        })

        console.log(this.state.otherTags, "Array de Otros tags")

        console.log(this.state.zone, "Array de Zona")
      }
       

    async getEstablishment(){
        var token = sessionStorage.getItem("token");
        var query = window.location.pathname;
        var splited = query.split("/");
        var id_establishment = splited[3];

        const url = "http://develop-backend-sprint-01.herokuapp.com/v1/establishments/" + id_establishment + "/get";

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'token': token,
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data.establishment.tags, "data tags")
            const arr = [];
            
            for(let tag of data.establishment.tags)
                arr.push({value: tag.name, label: tag.name})
            const tagsConcat = arr;
            
            console.log(tagsConcat)
            this.setState({
                input: {
                    name_text: data.establishment.name,
                    phone_number: data.establishment.phone,
                    zone_enum: data.establishment.zone,
                    street_text: data.establishment.street,
                    number_text: data.establishment.number,
                    locality_text: data.establishment.locality,
                    image_ulr: data.establishment.image,
                    desc_text: data.establishment.desc_text,
                    tags: tagsConcat
                },
                selected: tagsConcat
            });
            console.log(this.state, "estado")
        } else {
            const data = await response.json();
            this.setState({ errorsApiGet: data.errors });
        }
    }

    async handleChange(event) {
        console.log(event, "evento")
        if(event.target == undefined){
            this.state.selected = event
        }else{
            await this.setState({
                input: {
                    ... this.state.input,
                    [event.target.name]: event.target.value,
                }

            })
            
        }

        console.log(this.state,"Así va cambiando el steate")
        
    }

    handleSubmit(event) {
        event.preventDefault();
        let inputs = this.state.input;
        let send= {};
        let tagsBefore = [];
        
        for(let tag of this.state.selected)
            tagsBefore.push(tag.value)

        
        console.log(tagsBefore, "tags antes de enviar")

        send['name_text'] = inputs.name_text;
        send['phone'] = inputs.phone_number.toString();
        send['street_text'] = inputs.street_text;
        send['number_text'] = inputs.number_text;
        send['locality_text'] = inputs.locality_text;
        send['image_url'] = inputs.image_ulr;
        send['desc_text'] = inputs.desc_text;
        send['zone_enum'] = inputs.zone_enum;
        send['tags'] = tagsBefore;

        this.state.sendFinal = send;

        console.log(this.state.sendFinal)
    
    }
    
    componentDidMount(){
        this.getEstablishment();
        
    }


    render(){
        
        return (
            <>
            <div class='row'>
                <div class= 'col md-8'>
                    <div class='card'>
                        <div class='card-header'>
                            <div class='card-title ml-3 mt-3'>
                                <h2>Detalles del Establecimiento</h2>
                            </div>
                        </div>
                        <div class='card-body'>
                            <form id='establishment-form' onSubmit={this.handleSubmit}>
                                <div class='row'>
                                    <div class='col pr-1 md-6'>
                                        <div class='form-group my-1'>
                                            <label>Nombre del Establecimiento</label>
                                            <input
                                                type='text'
                                                name='name_text'
                                                value={this.state.input.name_text}
                                                onChange={this.handleChange}
                                                class='form-control'
                                                id='name-establishment'
                                            />
                                        </div>         
                                    </div>
                                    <div class='col pl-1 md-6'>
                                        <div class='form-group my-1'>
                                            <label>Teléfono</label>
                                            <input
                                                type='tel'
                                                name='phone_number'
                                                value= {this.state.input.phone_number}
                                                onChange={this.handleChange}
                                                class='form-control'
                                                id='phone-number'
                                            />
                                        </div>
                                    </div>                               
                                </div>
                                <div class='row'>
                                    <div class='col md-12'>
                                        <div class='form-group my-1'>
                                            <label>Dirección</label>
                                            <input
                                                type='text'
                                                name='street_text'
                                                value= {this.state.input.street_text}
                                                onChange={this.handleChange}
                                                class='form-control'
                                                id='street'
                                            />
                                        </div>
                                    </div>                                        
                                </div>
                                <div class='row'>
                                    <div class='col pr-1 md-6'>
                                        <div class='form-group my-1'>
                                            <label>Número</label>
                                            <input
                                                type='text'
                                                name='number_text'
                                                value={this.state.input.number_text}
                                                onChange={this.handleChange}
                                                class='form-control'
                                                id='number-street'
                                            />
                                        </div>
                                    </div>
                                    <div class='col pl-1 md-6'>
                                        <div class='form-group my-1'>
                                            <label>Localidad</label>
                                            <input
                                                type='text'
                                                name='locality_text'
                                                value={this.state.input.locality_text}
                                                onChange={this.handleChange}
                                                class='form-control'
                                                id='locality-establishment'
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div class='row'>
                                    <div class='col md-12'>
                                        <div class='form-group my-1'>
                                            <label>Imagen Url</label>
                                            <input
                                                type='text'
                                                name='image_ulr'
                                                value= {this.state.input.image_ulr}
                                                onChange={this.handleChange}
                                                class='form-control'
                                                id='image-url'
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div class='row'>
                                    <div class='col md-12'>
                                        <div class='form-group my-1'>
                                            <label>Descripción</label>
                                            <textarea
                                                name='desc_text'
                                                value={this.state.input.desc_text}
                                                onChange={this.handleChange}
                                                class='form-control'
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div class='row'>
                                    <div class='col'>
                                        <div class='form-group my-1'>
                                            <label>Zona</label>
                                            <select  name='zone_enum' value={this.state.input.zone_enum} onChange={this.handleChange} class='form-control'>
                                                {this.state.zone.zona.map((zona) => {
                                                        return(
                                                            <option value={zona}>{zona}</option>
                                                        )
                                                    }
                                                )}   
                                            </select>
                                        </div>
                                    </div>
                                    <div class='col'>
                                        <div class='form-group my-1'>
                                            <label>Tags</label>
                                            {this.state.input.tags.length != 0 ? <Select defaultValue={this.state.input.tags} isMulti options={this.state.otherTags} onChange={this.handleChange}></Select> : ""}
                                        </div>
                                    </div>
                                </div>
                                <div class='pull-right'>
                                    <input
                                        type='submit'
                                        value='Guardar cambios'
                                        class= 'btn btn-info'
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            
                    {/* <Button
                      className="btn-fill pull-right"
                      type="submit"
                      variant="info"
                    >
                      Editar Perfil
                    </Button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => this.setState({modal1: true})}
                    >
                      Añadir Descuento
                    </button>
                    <Modal isOpen={this.state.modal1} toggle={() => this.setState({modal1: false})}>
                      <div className="modal-header justify-content-center">
                        <button
                          className="close"
                          type="button"
                          onClick={() => this.setState({modal1: false})}
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
                    <div className="clearfix"></div> */}
                
          </>
        )
    }
}

