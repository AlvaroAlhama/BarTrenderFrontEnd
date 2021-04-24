import React, { createRef, useRef } from 'react';
import Select from 'react-select';
import { CustomInput, FormGroup, Label, Modal, ModalBody } from "reactstrap";
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
                tags: []
            },

            image_url: null,

            image: null,
            
            selected: [],

            tagsChange: [],

            otherTags: [],

            zone: {
                zona: []
            },

            sendFinal: {},

            modal1: false,
            errorsApiGet: {},
            errorsApiPut: {},
            errors: {},
            msg: null,
            form: createRef(),
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.getEstablishment = this.getEstablishment.bind(this);
        this.getTags = this.getTags.bind(this);       

    }

    async getTags() {
        var token = sessionStorage.getItem("token");

        const url = "https://develop-backend-sprint-01.herokuapp.com/v1/establishments/get_tags";
        const response = await fetch(url, {
            method: "GET",
            headers: {
                token: token,
                apiKey: "8dDc431125634ef43cD13c388e6eCf11",
            },
        });
        const data = await response.json();

        var otherTags = data.tags.map((tag) => {
            if (tag.type != 'Zona') {
                return { value: tag.name, label: tag.name }
            }
        });

        var arrayOther = otherTags.filter(function (dato) {
            return dato != undefined;
        })

        const tagZone = data.tags.map((tag) => {
            if (tag.type == 'Zona') {
                return tag.name
            }
        });

        var array = tagZone.filter(function (dato) {
            return dato != undefined
        })

        this.setState({
            otherTags: arrayOther,

            zone: {
                zona: array
            }
        })
    }


    async getEstablishment() {
        var token = sessionStorage.getItem("token");
        var query = window.location.pathname;
        var splited = query.split("/");
        var id_establishment = splited[3];

        const url = "https://develop-backend-sprint-01.herokuapp.com/v1/establishments/" + id_establishment + "/get";

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'token': token,
            }
        });

        if (response.ok) {
            const data = await response.json();
            const arr = [];

            for (let tag of data.establishment.tags)
                arr.push({ value: tag.name, label: tag.name })
            const tagsConcat = arr;

            this.setState({
                input: {
                    name_text: data.establishment.name_text,
                    phone_number: data.establishment.phone_number,
                    zone_enum: data.establishment.zone_enum,
                    street_text: data.establishment.street_text,
                    number_text: data.establishment.number_text,
                    locality_text: data.establishment.locality_text,
                    desc_text: data.establishment.desc_text,
                    tags: tagsConcat
                },
                selected: tagsConcat,
                image_url: data.establishment.photo_url
            });
        } else {
            const data = await response.json();
            this.setState({ errorsApiGet: data.errors });
        }
    }


    async handleUpdate(){
        var token = sessionStorage.getItem('token');
        var query = window.location.pathname;
        var splited = query.split("/");
        var id_establishment = splited[3];
        let inputs = this.state.input;
        let tagsBefore = [];

        for (let tag of this.state.selected)
            tagsBefore.push(tag.value)

        const urlUpdate = 'http://localhost:8000/v1/establishments/'+ id_establishment + '/update';


        //Form data con todos los atributos para enviar por Multipart (ahora mismo el image es obligatorio)
        //const imageUpload = new FormData(this.state.form.current);
        var imageUpload = new FormData();
        imageUpload.append('name_text', inputs.name_text);
        imageUpload.append('phone_number', inputs.phone_number.toString());
        imageUpload.append('street_text', inputs.street_text);
        imageUpload.append('number_text', inputs.number_text);
        imageUpload.append('locality_text', inputs.locality_text);
        imageUpload.append('tags', tagsBefore);
        imageUpload.append('zone_enum', inputs.zone_enum);

        if(inputs.desc_text)
            imageUpload.append('desc_text', inputs.desc_text);
        else
            imageUpload.append('desc_text', '');

        if(this.state.image)
        {
            imageUpload.append('image_name', this.state.image.name);
            
            const toBase64 = file => new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
            
            imageUpload.append('image', await toBase64(this.state.image));
        }
            
        var object = {};
        imageUpload.forEach(function(value, key){
            object[key] = value;
        });
        var json = JSON.stringify(object);
  
        const  update = await fetch(urlUpdate, {
            method: 'PUT',
            headers: {
                'token': token,
                'Content-type': 'application/json',
            },
            body: json,
        });

        if(update.ok){
            const data = await update.json();
            this.setState({
                msg: data.msg,
            })
            setTimeout(() => {
                this.setState({
                    msg: '',
                })
                this.getEstablishment();
            }, 2000)
        }else{
            const data = await update.json();
            this.setState({
                errorsApiPut: data
            })
        }
    }

    async handleChange(event) {
        if (event.target == undefined) {
            this.state.selected = event
        } else {
            await this.setState({
                input: {
                    ... this.state.input,
                    [event.target.name]: event.target.value,
                }
            })
        }
    }

    handleSubmit(event) {
        
        event.preventDefault()
        let inputs = this.state.input;
        let send = {};
        let tagsBefore = [];

        for (let tag of this.state.selected)
            tagsBefore.push(tag.value)

        if (this.validate()) {

        //Envio con JSON
            // send['name_text'] = inputs.name_text;
            // send['phone_number'] = inputs.phone_number.toString();
            // send['street_text'] = inputs.street_text;
            // send['number_text'] = inputs.number_text;
            // send['locality_text'] = inputs.locality_text;
            // send['image'] = imageUp;
            
            // if(inputs['desc_text'] == undefined){
            //     send['desc_text'] = '';
            // }else{
            //     send['desc_text'] = inputs.desc_text;
            // }
            // send['zone_enum'] = inputs.zone_enum;
            // send['tags'] = tagsBefore;
            // console.log(send, "lo que se va a enviar")

            // this.state.sendFinal = send;

            this.handleUpdate()
        
        }
    }

    validate() {
        let inputs = this.state.input;
        let selecteds = this.state.selected;
        let errors = {};
        let isValid = true;

        if (!inputs['name_text']) {
            isValid = false;
            errors['name_text'] = 'El nombre del establecimiento no puede estar vacío'
        }

        if (!inputs['phone_number']) {
            isValid = false;
            errors['phone_number'] = 'Debe proporcionar un número de teléfono'
        }

        if (inputs['phone_number']) {
            var pattern = new RegExp(/^\d{9}$/);
            if (!pattern.test(inputs['phone_number'])) {
                isValid = false;
                errors['phone_number'] = 'El télefono introducido no es válido'
            }
        }

        if (!inputs['street_text']) {
            isValid = false;
            errors['street_text'] = "Debe proporcionar una dirección"
        }

        if (!inputs['number_text']) {
            isValid = false;
            errors['number_text'] = 'Debe proporcionar un número de la dirección del establecimiento'
        }

        if (inputs['number_text']) {
            var pattern = new RegExp(/^\D*\d{1,3}([A-Z]{1,2})?$/);
            if (!pattern.test(inputs['number_text'])) {
                isValid = false;
                errors['number_text'] = 'El número de la dirección debe contener de 1 a 3 números con posibilidad de 2 letras'
            }
        }

        if (!inputs['locality_text']) {
            isValid = false;
            errors['locality_text'] = 'Debe proporcionar la localidad donde se encuentre el establecimiento'
        }

        if (selecteds.length === 0) {
            isValid = false;
            errors['tags_selected'] = 'Debe asignar algunas etiquetas que referencien a su establecimiento'
        }

        if (!inputs['zone_enum']) {
            isValid = false;
            errors['zone_enum'] = 'Debe asignar una zona próxima a su establecimiento'
        }

        this.setState({
            errors: errors
        });

        return isValid;

    }

    componentDidMount() {
        this.getEstablishment();
        this.getTags();
    }

    render() {

        return (
            <>
                <div>
                    <img src={this.state.image_url == null || {} ? '' : this.state.image_url}/>
                </div>
                <div class='row'>
                    <div class='col md-8'>
                        <div class='card'>
                            <div class='card-header'>
                                <div class='card-title ml-3 mt-3'>
                                    <h2>Detalles del Establecimiento</h2>
                                </div>
                            </div>
                            <div class='card-body'>
                                <form enctype="multipart/form-data" ref={this.state.form} id='establishment-form' onSubmit={(e)=>this.handleSubmit(e)}>
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
                                            <div class="text-danger">{this.state.errors.name_text}</div>
                                        </div>
                                        <div class='col pl-1 md-6'>
                                            <div class='form-group my-1'>
                                                <label>Teléfono</label>
                                                <input
                                                    type='tel'
                                                    name='phone_number'
                                                    value={this.state.input.phone_number}
                                                    onChange={this.handleChange}
                                                    class='form-control'
                                                    id='phone-number'
                                                />
                                            </div>
                                            <div class="text-danger">{this.state.errors.phone_number}</div>
                                        </div>
                                    </div>
                                    <div class='row'>
                                        <div class='col md-12'>
                                            <div class='form-group my-1'>
                                                <label>Dirección</label>
                                                <input
                                                    type='text'
                                                    name='street_text'
                                                    value={this.state.input.street_text}
                                                    onChange={this.handleChange}
                                                    class='form-control'
                                                    id='street'
                                                />
                                                <div class="text-danger">{this.state.errors.street_text}</div>
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
                                                <div class="text-danger">{this.state.errors.number_text}</div>
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
                                                <div class="text-danger">{this.state.errors.locality_text}</div>
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
                                                <select name='zone_enum' value={this.state.input.zone_enum} onChange={this.handleChange} class='form-control'>
                                                    {this.state.zone.zona.map((zona) => {
                                                        return (
                                                            <option value={zona}>{zona}</option>
                                                        )
                                                    }
                                                    )}
                                                </select>
                                                <div class="text-danger">{this.state.errors.zone_enum}</div>
                                            </div>
                                        </div>
                                        <div class='col'> 
                                            <FormGroup className='pt-2'>
                                                <Label for="establishmentImage">Imagen</Label>
                                                <CustomInput type="file" id="establishmentImage" name="image" label="Sube tu foto" onChange={(e) => this.setState({image: e.target.files[0]})} />
                                            </FormGroup>
                                        </div>
                                    </div>
                                    <div class='row'>
                                        <div class = 'col'>
                                        <div class='form-group my-1'>
                                                <label>Tags</label>
                                                {this.state.input.tags.length != 0 ? <Select name='tags-selected' defaultValue={this.state.input.tags} isMulti options={this.state.otherTags} onChange={this.handleChange}></Select> : ""}
                                                <div class="text-danger">{this.state.errors.tags_selected}</div>
                                            </div>
                                            </div>
                                    </div>
                                    <div class='pull-right'>
                                        <input
                                            type='submit'
                                            value='Guardar cambios'
                                            class='btn btn-info'
                                        />
                                    </div>
                                    <div class='container-fluid bg-danger'>
                                        <div class="text-white fw-bold text-center">{this.state.errorsApiPut == undefined ? "" : this.state.errorsApiPut.error}</div>
                                    </div>
                                    <div class='container-fluid bg-success'>
                                        <div class="text-white fw-bold text-center">{this.state.msg == undefined ? "" : this.state.msg}</div>
                                    </div>
                                </form>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => this.setState({ modal1: true })}
                                >
                                    Añadir Descuento
                                </button>
                                <Modal isOpen={this.state.modal1} toggle={() => this.setState({ modal1: false })}>
                                    <div className="modal-header justify-content-center">
                                        <button
                                            className="close"
                                            type="button"
                                            onClick={() => this.setState({ modal1: false })}
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
                                <div className="clearfix"></div>
                            </div>
                        </div>

                    </div>
                </div>
            </>
        )
    }
}