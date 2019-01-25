import React, {Component} from 'react'
import {TileLayer, Map, WMSTileLayer} from 'react-leaflet'
import styled from 'styled-components'
import 'leaflet/dist/leaflet.css';

import './App.css';

const MapContainer = styled(Map)`
    width: 100vw;
    height: 100vh`;

class App extends Component {



  render() {
    return (
      <div className="App">
          <MapContainer center={[62, 24]} zoom={7}>
          <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
          <WMSTileLayer
              url="http://openwms.fmi.fi/geoserver/wms"
              layers="Radar:suomi_rr_eureffin"
              transparent='true'
              format={'image/png'}/>
          </MapContainer>
      </div>
    );
  }
}

export default App;
