import React from "react";

export default class EstablishmentByOwner extends React.Component{
        
    state = {
        establishments: {},
        error: null,
    };

    

    async componentDidMount(){
        var token = sessionStorage.getItem("token");

        const url = "https://localhost:8000/v1/establishments/get_by_owner"
        const response = await fetch(url, {
            method: "GET",
                headers:{
                    "token": token
                }
        });
        console.log(response);
        const data = await response.json();
        console.log(data);
        this.setState({establishments: data});
        console.log(this.state.establishments)
    
    }

    render(){
        return (
            <div>
               {this.state.establishments.map((establishment) => {
                   return(
                       <p> {establishment.name_text}</p>
                   )
               })}
            </div>
        )
    }

}