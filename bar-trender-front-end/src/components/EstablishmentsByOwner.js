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
       
        const data = await response.json();
       
        this.setState({establishments: data});
       
    
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