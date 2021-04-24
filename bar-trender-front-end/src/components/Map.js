/*global google*/
import React, { Component } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  DirectionsRenderer
} from "react-google-maps";
import {
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyD3iyCKwQGF0wXBZKOuKhdMIZivUEtMe4s");


class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      directions: null,
      coords: {
        lat: -3.745,
        lng: -38.523
      },
      directions_active: false
    };

    this.mapDirection(this.props.location);
  }

  async mapDirection(location) {
    // Get latitude & longitude from address.
    Geocode.fromAddress(location).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        this.setState({
          coords: {
            lat: lat,
            lng: lng
          }
        });
        const directionsService = new google.maps.DirectionsService();

        const destination = this.state.coords;
        // const origin = user_location;
        var user_location_lat = sessionStorage.getItem("user_location_lat");
        var user_location_lng = sessionStorage.getItem("user_location_lng");

        const origin = {
          lat: parseFloat(user_location_lat),
          lng: parseFloat(user_location_lng)
        };
        


        directionsService.route(
          {
            origin: origin,
            destination: destination,
            travelMode: google.maps.TravelMode.DRIVING,
            // waypoints: [
            //   {
            //     location: new google.maps.LatLng(6.4698, 3.5852)
            //   },
            //   {
            //     location: new google.maps.LatLng(6.6018, 3.3515)
            //   }
            // ]
          },
          (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
              console.log(result)
              this.setState({
                directions: result
              });
            } else {
              console.error(`error fetching directions ${result}`);
            }
          }
        );
      },
      (error) => {
        console.error(error);
      }
    );
    //   this.setState({ error: data.error, modalFail: true, loading: false });
    // }
  }

  render() {
    if (this.state.directions != null) {
      

    }

    const GoogleMapExample = this.state.directions_active ?
      withGoogleMap(props => (
        <GoogleMap
          defaultCenter={{ lat: -3.745, lng: -38.523 }}
          defaultZoom={13}
          center={this.state.coords}
          zoom={19}
        >
          <DirectionsRenderer
            directions={this.state.directions}
          />
        </GoogleMap>))
      : withGoogleMap(props => (
        <GoogleMap
          defaultCenter={{ lat: -3.745, lng: -38.523 }}
          defaultZoom={13}
          center={this.state.coords}
          zoom={19}
        >

        </GoogleMap>));

    return (
      <div>
        <OverlayTrigger overlay={<Tooltip id="tooltip-506045838">Si has permitido el acceso a tu ubicación se mostrará la ruta al establecimiento</Tooltip>}>
          <Button color="default" color="primary" type="button"
            onClick={() => {
              this.setState(
                {
                  directions_active: !this.state.directions_active,
                  directions: this.state.directions
                }
              )
            }}
          >
            Mostrar ruta
        </Button>
        </OverlayTrigger>
        {(this.state.directions_active) ? 
        <p>
          Distancia: {(this.state.directions != null) ? this.state.directions.routes[0].legs[0].distance.text + " - " : 'None' + " - "}
          Duración: {(this.state.directions != null) ? this.state.directions.routes[0].legs[0].duration.text + " - " : 'None' + " - "}
          {/* Modo de transporte: {(this.state.directions != null) ? this.state.directions.routes[0].legs[0].steps[0].travel_mode + " - " : 'None'} */}
        </p>
          : ""}


        <GoogleMapExample
          containerElement={<div style={{ height: `400px`, width: "100%" }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>


    );
  }
}

export default Map;