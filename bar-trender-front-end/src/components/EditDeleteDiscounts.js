import React from 'react'
import { Modal, ModalBody, ModalFooter, Table } from 'reactstrap';
import moment from "moment";
import {
    Button,
    OverlayTrigger,
    Tooltip,
  } from "react-bootstrap";

export default class EditDeleteDiscounts extends React.Component{
    constructor(){
        super();

        this.state={
            data: [],
            establishments: {},
            input:{
                 name: '',
                 description: '',
                 totalCodes: '',
                 scannedCodes: '',
                 cost: '',
                 initialDate: '',
                 initialHour: '',
                 endDate: '',
                 endHour: ''

            },
            discount:{
                id: 0,
                name: '',
                description: '',
                totalCodes: '',
                scannedCodes: '',
                cost: '',
                initialDate: '',
                initialHour: '',
                endDate: '',
                endHour: ''

           },
            initialDate: '',
            sendFinal: {},
            modalUpdate: false,
            modalDelete: false,
            errors: {},
            msg: '',
            errorApiGet: {},
            errorApiUpdate: {},
            errorApiDelete: {}
        }

        this.handleChange = this.handleChange.bind(this);
    }
   
     async getDiscount() {
        var token = sessionStorage.getItem('token');
        var query = window.location.pathname;
        var splited = query.split("/");
        var id_establishment = splited[3];
        const urlGet = 'https://develop-backend-sprint-01.herokuapp.com/v1/establishments/' + id_establishment +'/get'
    
        const get = await fetch(urlGet, {
            method: 'GET',
            headers: {
                'token': token,
            }    
        });
        
        const data = await get.json();
        console.log(data)
        this.setState({
            data: data.discounts,
            establishments: data.establishment
        })
    }

    async handleUpdate(){
        var token = sessionStorage.getItem('token');
        var query = window.location.pathname;
        var splited = query.split("/");
        var id_establishment = splited[3];
        var id_discount = this.state.discount.id;
        console.log(id_discount);

        const urlUpdate = 'https://develop-backend-sprint-01.herokuapp.com/v1/establishments/' +id_establishment +'/discounts/' +id_discount +'/update';
    
        const response = await fetch(urlUpdate, {
            method: 'PUT',
            headers: {
                token: token,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(this.state.sendFinal)
        });

        if(response.ok){
            const data = await response.json();
            this.setState({
                msg: data.msg,
            })
            setTimeout(() => {
                this.setState({
                    modalUpdate: false,
                    msg: '',
                })
                this.getDiscount();
            }, 2000)
        }else{
            const data = await response.json();
            this.setState({
                errorsApiPut: data
            })
        }

    }

    async handleDelete(){

        if(this.validateDelete()){
            var token = sessionStorage.getItem('token');
            var query = window.location.pathname;
            var splited = query.split("/");
            var id_establishment = splited[3];
            var id_discount = this.state.discount.id;
        
            const urlDelete = 'https://develop-backend-sprint-01.herokuapp.com/v1/establishments/' + id_establishment + '/discounts/' + id_discount + '/delete';
            
            const deleteRequest = await fetch(urlDelete, {
                method: 'DELETE',
                headers: {
                    'token': token,
                    'Content-type': 'application/json'
                }
            });
            
            if(deleteRequest.ok){
                const data = await deleteRequest.json();
                this.setState({
                    msg: data.msg
                })
                setTimeout(() => {
                    this.setState({
                        modalDelete: false,
                        msg: '',
                    })
                    this.getDiscount();
                }, 2000)
            }else{
                const data = await deleteRequest.json();
                this.setState({
                    errorsApiDelete: data
                })
            }
        }
    }

    async handleChange(event){
        await this.setState({
            input: {
                ...this.state.input,
                [event.target.name] : event.target.value

            }
        })
        console.log(this.state.input)
    }
    
    selectDiscount(discount){
        const initDate = new Date(discount.initialDate * 1000).toISOString().slice(0, 10)
        const initHour = new Date(discount.initialDate * 1000).toISOString().slice(11, 16)
        
        if(discount.endDate != null){
            const endDate = new Date(discount.endDate * 1000).toISOString().slice(0, 10)
            const endHour = new Date(discount.endDate * 1000).toISOString().slice(11, 16)

            this.setState({
                discount:{
                     id: discount.id,
                     name: discount.name,
                     description: discount.description,
                     totalCodes: discount.totalCodes,
                     scannedCodes: discount.scannedCodes,
                     cost: discount.cost,
                     initialDate: initDate,
                     initialHour: initHour,
                     endDate: endDate,
                     endHour: endHour
                },

                input: {
                     name: discount.name,
                     description: discount.description,
                     totalCodes: discount.totalCodes,
                     scannedCodes: discount.scannedCodes,
                     cost: discount.cost,
                     initialDate: initDate,
                     initialHour: initHour,
                     endDate: endDate,
                     endHour: endHour
                },
                initialDate: discount.initialDate,
                errors: {},
                msg: '',
                errorApiGet: {},
                errorApiUpdate: {},
                errorApiDelete: {}
            });
            console.log(this.state, "DEBE DE TENER EL DESCUENTO UN ENDDATE")
        }else{

            this.setState({
                discount: {
                    id: discount.id,
                    name: discount.name,
                    description: discount.description,
                    totalCodes: discount.totalCodes,
                    scannedCodes: discount.scannedCodes,
                    cost: discount.cost,
                    initialDate: initDate,
                    initialHour: initHour,
                    endDate: '',
                    initHour: ''
                },

                input: {
                    name: discount.name,
                    description: discount.description,
                    totalCodes: discount.totalCodes,
                    scannedCodes: discount.scannedCodes,
                    cost: discount.cost,
                    initialDate: initDate,
                    initialHour: initHour,
                    endDate: '',
                    endHour: ''
                },
                initialDate: discount.initialDate,
                errors: {},
                msg: '',
                errorApiGet: {},
                errorApiUpdate: {},
                errorApiDelete: {}
            });
            console.log(this.state, "NO DEBE DE TENER EL DESCUENTO UN ENDDATE")
        };
    };

    handleSubmit(){
        let inputs = this.state.input;
        let send = {}
        var today = new Date()
        var todayTS = moment.utc(today).unix()
        console.log(inputs)
        console.log(todayTS)

        if(this.validate()){
            const initialDateTS = moment.utc(`${inputs.initialDate} ${inputs.initialHour}`).unix()
            console.log(initialDateTS)
            if(inputs.endDate != '' && inputs.endHour != ''){
                const endDateTs = moment.utc(`${inputs.endDate} ${inputs.endHour}`).unix()
                if(todayTS > initialDateTS){
                
                    send['name'] = inputs.name;
                    send['description'] = inputs.description;
                    send['cost'] = parseFloat(inputs.cost);
                    send['totalCodes'] = parseInt(inputs.totalCodes);
                    send['scannedCodes'] = parseInt(inputs.scannedCodes);
                    send['initialDate'] = this.state.initialDate;
                    send['endDate'] = endDateTs;

                    this.state.sendFinal = send;
                    console.log(this.state.sendFinal, "Envio con Hora de back y endDate")

                    this.handleUpdate()
                }else{
                    send['name'] = inputs.name;
                    send['description'] = inputs.description;
                    send['cost'] = parseFloat(inputs.cost);
                    send['totalCodes'] = parseInt(inputs.totalCodes);
                    send['scannedCodes'] = parseInt(inputs.scannedCodes);
                    send['initialDate'] = initialDateTS;
                    send['endDate'] = endDateTs;
                    
                    this.state.sendFinal = send;
                    console.log(this.state.sendFinal, "Envio con hora nueva y endate")
                    this.handleUpdate()

                }
            }else{
                if(todayTS > initialDateTS){
                
                    send['name'] = inputs.name;
                    send['description'] = inputs.description;
                    send['cost'] = parseFloat(inputs.cost);
                    send['totalCodes'] = parseInt(inputs.totalCodes);
                    send['scannedCodes'] = parseInt(inputs.scannedCodes);
                    send['initialDate'] = this.state.initialDate;

                    this.state.sendFinal = send;
                    console.log(this.state.sendFinal, "Envio con hora back y sin eD")

                    this.handleUpdate()
                }else{
                    send['name'] = inputs.name;
                    send['description'] = inputs.description;
                    send['cost'] = parseFloat(inputs.cost);
                    send['totalCodes'] = parseInt(inputs.totalCodes);
                    send['scannedCodes'] = parseInt(inputs.scannedCodes);
                    send['initialDate'] = initialDateTS;
                    
                    this.state.sendFinal = send;
                    console.log(this.state.sendFinal, "Envio con hora nueva y sin eD")
                    this.handleUpdate()
                }
            }
        }
    }

    validateDelete(){
        let isValid = true;
        var today = new Date();
        let errors = {};

        const scannedCodes = this.state.discount.scannedCodes;
        const endDate = this.state.discount.endDate;

        if(scannedCodes > 0){
            isValid = false;
            errors['errorCodes'] = 'No se puede eliminar porque hay descuentos escaneados'
        }

        if(endDate != ''){
            if(today > endDate){
                isValid = false;
                errors['errorDate'] = 'No se puede eliminar porque el descuento ya ha finalizado'
            }
        }
        this.setState({
            errors: errors
        });
        return isValid;
    }

    

    validate(){
        let inputs = this.state.input;
        let discount = this.state.discount;
        let errors = {};
        let isValid = true;
        var today = new Date()

        if(!inputs['initialDate'] || !inputs['initialHour']){
            isValid = false;
            errors['initialDate'] = 'Debe proporcionar una fecha y hora de inicio'
            this.setState({
                errors: errors
            });
    
            return isValid;
        }else{
            var initialDateFull = new Date(inputs['initialDate'].concat(" ", inputs['initialHour']))
        }
        
        if(inputs['endDate'] && inputs['endHour']){
            var endDateFull = new Date(inputs['endDate'].concat(" ", inputs['endHour']))
        }

        if (!inputs['name']) {  
            isValid = false;
      
            errors['name'] = 'Escriba un nombre del descuento.';
        }

        if (!inputs['cost'] || inputs['cost'] <= 0) {
            isValid = false;
        
            errors['cost'] = 'Escriba un precio para el descuento.';
        }

        if (!inputs['description']) {
            isValid = false;
        
            errors['description'] = 'Escriba una descripción para el descuento';
        }

        if (!inputs['totalCodes'] || inputs['totalcodes'] <= 0) {
            isValid = false;
        
            errors['totalCodes'] = 'Escriba un número total de códigos.';
        }

        if(inputs['totalCodes'] < inputs['scannedCodes']){
            isValid = false;
            errors['totalCodes'] = 'El número total de códigos no puede ser menor que los escaneados'
        }
        
        if(today > initialDateFull){
            if(inputs['name'] != discount.name){
                isValid = false;
                errors['name'] = 'Una vez empezado el descuento no se puede modificar el nombre';
            }
            if(inputs['description'] != discount.description){
                isValid = false;
                errors['description'] = 'Una vez empezado el descuento no se puede modificar la descripción';
            }

            if(inputs['cost'] != discount.cost){
                isValid = false;
                errors['cost'] = 'Una vez empezado el descuento no se puede modificar la descripción';
            }

            if(inputs['initialDate'].concat(" ", inputs['initialHour']) != discount.initialDate.concat(" ", discount.initialHour)){
                isValid = false;
                errors['initialDate'] = 'Una vez empezado el descuento no se puede modificar la fecha inicial';
            }

            if(inputs['scannedCodes'] != discount.scannedCodes){
                isValid = false;
                errors['scannedCodes'] = 'Una vez empezado el descuento no se puede modificar el número de descuentos escaneados';
            }

            if(endDateFull != undefined){
                if(endDateFull < initialDateFull){
                    isValid = false;
                    errors['endDate'] = 'La fecha final no puede ser menor que la fecha inicial'
                }

                if(endDateFull < today){
                    isValid = false;
                    errors['endDate'] = 'La fecha final debe ser mayor que la fecha actual'
                }
            }
        }

        if(initialDateFull > today){
            if(endDateFull != undefined){
                if(endDateFull < initialDateFull){
                    isValid = false;
                    errors['endDate'] = 'La fecha final no puede ser menor que la fecha incial'
                }
                if(endDateFull < today){
                    isValid = false;
                    errors['endDate'] = 'La fecha final debe ser mayor que la fecha actual'
                }
            }
        }


        this.setState({
            errors: errors
        });

        return isValid;


    }

    componentDidMount(){
        this.getDiscount();
    }

    render(){
        return(
            <>
                <Table responsive>
                    <thead>
                        <tr class='text-center'>
                            <th>Nombre</th>
                            <th>Códigos totales</th>
                            <th>Códigos escaneados</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data == [] ? "" : this.state.data.map(discount => {
                            return (
                                <tr class='text-center'>
                                    <td>{discount.name}</td>
                                    <td>{discount.totalCodes}</td>
                                    <td>{discount.scannedCodes}</td>
                                    <td>
                                        {/* <button className='btn btn-primary' onClick={()=>{this.selectDiscount(discount); this.setState({modalUpdate:true})}}>Editar</button> */}
                                        <OverlayTrigger overlay={<Tooltip id="tooltip-506045838">Editar descuento</Tooltip>}>
                                            <Button
                                                className="btn-simple btn-link p-1"
                                                type="button"
                                                variant="info"
                                                onClick={() => {this.selectDiscount(discount); this.setState({modalUpdate:true})}}
                                                >
                                            <i className="fas fa-edit"></i>
                                            </Button>
                                        </OverlayTrigger>

                                        <OverlayTrigger overlay={<Tooltip id="tooltip-488980961">Eliminar descuento</Tooltip>}>
                                            <Button
                                                className="btn-simple btn-link p-1"
                                                type="button"
                                                variant="danger"
                                                onClick={() => {this.selectDiscount(discount); this.setState({modalDelete:true})}}
                                                >
                                            <i className="fas fa-times"></i>
                                            </Button>
                                        </OverlayTrigger>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                {this.state.input == '' ? '' :
                <>
                <Modal isOpen={this.state.modalUpdate} toggle={() => this.setState({modalUpdate: false})}>
                    <div className="modal-header justify-content-center">
                        <button
                            className="close"
                            type="button"
                             onClick={() => this.setState({modalUpdate: false})}
                        >
                            <i className="now-ui-icons ui-1_simple-remove"></i>
                        </button> 
                        <h4 id ="title_discount" className="title title-up">Editar Descuento</h4>    
                    </div>
                    <ModalBody>
                        <div class='form-group'>
                            <label>Nombre</label>
                            <input
                                class='form-control'
                                type= 'text'
                                name= 'name'
                                value= {this.state.input.name}
                                onChange={this.handleChange}
                            />
                            <div className="text-danger pl-3">
                                {this.state.errors.name}
                            </div>
                            <label>Descripción</label>
                            <input
                                class='form-control'
                                type= 'text'
                                name= 'description'
                                value= {this.state.input.description}
                                onChange={this.handleChange}
                            />
                            <div className="text-danger pl-3">
                                {this.state.errors.description}
                            </div>
                            <label>Códigos Totales</label>
                            <input
                                class='form-control'
                                type= 'number'
                                name= 'totalCodes'
                                value= {this.state.input.totalCodes}
                                onChange={this.handleChange}
                            />
                            <div className="text-danger pl-3">
                                {this.state.errors.totalCodes}
                            </div>
                            <label>Códigos Escaneados</label>
                            <input
                                class='form-control'
                                type= 'number'
                                name= 'scannedCodes'
                                readOnly
                                value= {this.state.input.scannedCodes}
                                onChange={this.handleChange}
                            />
                            <div className="text-danger pl-3">
                                {this.state.errors.scannedCodes}
                            </div>
                            <label>Coste</label>
                            <input
                                class='form-control'
                                type= 'number'
                                name= 'cost'
                                value= {this.state.input.cost}
                                onChange={this.handleChange}
                            />
                            <div className="text-danger pl-3">
                                {this.state.errors.cost}
                            </div>
                            <div class='row'>
                                <div class='col'>
                                    <label>Fecha de Inicio</label>
                                    <input
                                        class='form-control'
                                        type= 'date'
                                        name= 'initialDate'
                                        value= {this.state.input.initialDate}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div class= 'col'>
                                <label>Hora de Inicio</label>
                                    <input
                                        class='form-control'
                                        type= 'time'
                                        name= 'initialHour'
                                        value= {this.state.input.initialHour}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="text-danger pl-3">
                                    {this.state.errors.initialDate}
                                </div>
                            </div>
                            <div class='row'>
                                <div class='col'>
                                    <label>Fecha de Fin</label>
                                    <input
                                        class='form-control'
                                        type= 'date'
                                        name= 'endDate'
                                        value= {this.state.input.endDate}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div class= 'col'>
                                <label>Hora de Fin</label>
                                    <input
                                        class='form-control'
                                        type= 'time'
                                        name= 'endHour'
                                        value= {this.state.input.endHour}
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="text-danger pl-3">
                                    {this.state.errors.endDate}
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className='btn btn-primary' onClick={() => this.handleSubmit()}>Guardar cambios</button>
                        <button className='btn btn-danger' onClick={() => this.setState({modalUpdate:false})}>Cancelar</button>
                        <div class='container-fluid bg-danger'>
                            <div class="text-white fw-bold text-center">{this.state.errorsApiPut == undefined ? "" : this.state.errorsApiPut.error}</div>
                        </div>
                        <div class='container-fluid bg-success'>
                            <div class="text-white fw-bold text-center">{this.state.msg == undefined ? "" : this.state.msg}</div>
                        </div>
                    </ModalFooter>

                </Modal>

                <Modal isOpen={this.state.modalDelete} toggle={() => this.setState({modalDelete: false})}>
                    
                    <div className="modal-header justify-content-center">
                        <button
                            className="close"
                            type="button"
                            onClick={() => this.setState({modalDelete: false})}
                        >
                            <i className="now-ui-icons ui-1_simple-remove"></i>
                        </button> 
                        <h4 id ="title_discount" className="title title-up">Eliminar Descuento</h4>    
                    </div>
                    
                    <ModalBody>
                        ¿Seguro que deseas eliminar el descuento: <b>{this.state.input && this.state.input.name}</b> ?
                    </ModalBody>
                    <ModalFooter>
                        <div class='row w-100 justify-content-center'>
                            <div class = 'text-center'>
                                <button className='btn btn-danger' onClick={()=>this.handleDelete()}>Sí</button>
                                {'    '}
                                <button className='btn btn-secondary' onClick={()=>this.setState({modalDelete: false})}>No</button>
                            </div>
                        </div>
                        <div class='mt-2 mb-4 text-center'>
                            <p class='text-danger'>{this.state.errors.errorCodes}</p>
                            <p class='text-danger'>{this.state.errors.errorDate}</p>
                        </div>
                        <div class='container-fluid bg-danger'>
                            <div class="text-white fw-bold text-center">{this.state.errorsApiDelete== undefined ? "" : this.state.errorsApiDelete.error}</div>
                        </div>
                        <div class='container-fluid bg-success'>
                            <div class="text-white fw-bold text-center">{this.state.msg == undefined ? "" : this.state.msg}</div>
                        </div>
                    </ModalFooter>
                </Modal>
                </>
                }
                </>
                )
    }
}