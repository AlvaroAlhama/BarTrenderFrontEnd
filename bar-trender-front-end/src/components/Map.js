/*global google*/
import React, { Component } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  DirectionsRenderer
} from "react-google-maps";
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
      }
    };

    this.mapDirection(this.props.location);
  }

  async mapDirection(location) {
    // Get latitude & longitude from address.
    console.log(location, 'location');
    Geocode.fromAddress(location).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        this.setState({
          coords: {
            lat: lat,
            lng: lng
          }
        });
        console.log(lat, lng, 'coordinates');
        const directionsService = new google.maps.DirectionsService();

        const destination = this.state.coords;
        // const origin = user_location;
        var user_location_lat = sessionStorage.getItem("user_location_lat");
        var user_location_lng = sessionStorage.getItem("user_location_lng");

        const origin = {
          lat: parseFloat(user_location_lat),
          lng: parseFloat(user_location_lng)
        };
        console.log(origin);
        console.log("---------");

        console.log(destination);


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
    const GoogleMapExample = withGoogleMap(props => (

      <GoogleMap
        defaultCenter={{ lat: -3.745, lng: -38.523 }}
        defaultZoom={13}
        center={this.state.coords}
        zoom={19}
      >
        <DirectionsRenderer
          directions={this.state.directions}
        />
      </GoogleMap>
    ));

    return (
      <div>

        <GoogleMapExample
          containerElement={<div style={{ height: `400px`, width: "100%" }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>


    );
  }
}

export default Map;