import React from "react";
import Moment from "react-moment";
import moment from "moment";
import "moment/locale/es"


class DELETEDiscount extends React.Component{
    constructor(){
        super();
        

        this.state = {
            msg: {},
            errors: {},
            initialDate: null,
            endDate:null,
        }


        // this.convertTimeStampToDate = this.convertTimeStampToDate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

 
    // convertTimeStampToDate(){
    //     const inititalDate = this.props.discount.initialDate;
    //     const endDate = this.props.discount.endDate;
    //     console.log(inititalDate)

    //     var fulldate = new Date(inititalDate);
    //     var converted_date = moment(fulldate).format("");

    //     this.setState({inititalDate: converted_date});
    // }

    async handleDelete(){

        const scannedCodes = this.props.discount.scannedCodes;
        const endDate = this.props.discount.endDate;

        const today = new Date();
        const todayTS = moment.utc(`${today}`).unix();
        
        if(this.validate()){
            const discount = this.props.discount;
            console.log(discount)
            var idDiscount = discount.id;
            var token = sessionStorage.getItem("token");
            var query = window.location.pathname;
            var splited = query.split("/");
            var idEstablishment = splited[2];
            const url = "https://develop-backend-sprint-01.herokuapp.com/v1/establishments/"+idEstablishment+"/discounts/"+idDiscount+"/delete";
        
            const request = await fetch(url, {
                method: "DELETE",
                headers: {
                    "token": token,
                    "Content-type": "application/json"
                }
            });

            if(request.ok){
                var response = await request.json();
                this.setState({msg: response.msg});
            }else{
                var response = await request.json();
                this.setState({errors: response.error});
            }
        }
    }


    validate(){
        const scannedCodes = this.props.discount.scannedCodes;
        const endDate = this.props.discount.endDate;

        const today = new Date();
        const todayTS = moment.utc(`${today}`).unix();

        let errors = {};

        let isValid = true;

        if(scannedCodes > 0 ){
            isValid = false;
            
            errors["errorCodes"] = "No se puede eliminar porque hay descuentos escaneados";
        }
        if(endDate != undefined){
            if(todayTS > endDate){
                isValid = false;

                errors["errorDate"] = "No se puede eliminar porque este descuento ya ha finalizado";
            }
        }

        this.setState({errors:errors});
        return isValid;
    }

    render() {
        return (
            <>
                <div class="ml-2">
                    <div className="row">
                        <h5 class="my-auto">Nombre del descuento: </h5>
                        <p class="ml-2 my-auto">{this.props.discount.name}</p>
                    </div>
                    <div className="row">
                        <h5 class="my-auto">Descripción: </h5>
                        <p class="ml-2 my-auto">{this.props.discount.description}</p>
                    </div>
                    <div className="row">
                        <h5 class="my-auto">Coste: </h5>
                        <p class="ml-2 my-auto">{this.props.discount.cost}</p>
                    </div>
                    <div className="row">
                        <h5 class="my-auto">Códigos totales: </h5>
                        <p class="ml-2 my-auto">{this.props.discount.totalCodes}</p>
                    </div>
                    <div className="row">
                        <h5 class="my-auto">Códigos escaneados: </h5>
                        <p class="ml-2 my-auto">{this.props.discount.scannedCodes}</p>
                    </div>
                    <div className="row">
                        <h5 class="my-auto">Fecha de inicio: </h5>
                        <p class="ml-2 my-auto"><Moment unix format="D-M-Y HH:mm" locale="es">{this.props.discount.initialDate}</Moment></p>
                    </div>
                    <div className="row">
                        <h5 class="my-auto">Fecha fin: </h5>
                        <p class="ml-2 my-auto"><Moment unix format="D-M-Y HH:mm" locale="es">{this.props.discount.endDate}</Moment></p>
                    </div>
                </div>
                <div class="mt-2 mb-4 text-center">
                    <h6>¿Seguro que quieres eliminar este descuento?</h6>
                    <div>
                        <button type="button" className="btn btn-danger" onClick={()=>this.handleDelete()}>Elminar</button>
                    </div>
                </div>
            </>
        )
    }
}

export default DELETEDiscount;