import React, { Component } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyD3iyCKwQGF0wXBZKOuKhdMIZivUEtMe4s");

const containerStyle = {
  width: '400px',
  height: '400px'
};


class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coords: {
        lat: -3.745,
        lng: -38.523
      }
    };


    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
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
      },
      (error) => {
        console.error(error);
      }
    );
    //   this.setState({ error: data.error, modalFail: true, loading: false });
    // }
  }

  render() {
    
    return (
      <LoadScript
        googleMapsApiKey="AIzaSyD3iyCKwQGF0wXBZKOuKhdMIZivUEtMe4s"
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={this.state.coords}
          zoom={19}
        >
          { /* Child components, such as markers, info windows, etc. */}
          <></>
        </GoogleMap>
      </LoadScript>
    )
  }
}
export default Map;
