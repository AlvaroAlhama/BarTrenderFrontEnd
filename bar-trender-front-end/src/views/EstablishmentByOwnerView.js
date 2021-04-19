import EstablishmentByOwner from "../components/EstablishmentsByOwner";
import MainNavbar from "components/Navbars/MainNavbar";
import React, { useEffect, useState } from "react";
import withListLoading from "../components//withListLoading";
import List from "../components/MyEstablishmentList";

function EstablishmentByOwnerView(){

    const ListLoading = withListLoading(List);
    const [appState, setAppState] = useState({
        loading: false,
        establishments: {},
    });

    useEffect(() => {
        setAppState({loading:true});
        
        async function getEstablishmentsOwner(){
            var token = sessionStorage.getItem("token");
            await fetch("https://main-backend-sprint-02.herokuapp.com/v1/establishments/get_by_owner", {

                method:"GET",
                headers: {
                    "token": token
                }
            })
            .then(response => response.json())
            .then(establishments => {
                console.log(establishments, 'establishments');
                setAppState({loading:false, establishments: establishments});
            });
        }
        getEstablishmentsOwner()
    }, [setAppState]);

    
    document.body.style.backgroundColor="grey";

    
    return( 

        <>
            <MainNavbar/>
            <div>
               <ListLoading isLoading={appState.loading} establishments={appState.establishments}/>
            </div>
        </>

    );


}

export default EstablishmentByOwnerView;