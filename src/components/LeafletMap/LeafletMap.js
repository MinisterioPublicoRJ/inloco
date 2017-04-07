import React from 'react';
import Leaflet from 'leaflet'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'

require('./leafletMap.scss');

Leaflet.Icon.Default.imagePath = '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/'

export default class LeafletMap extends React.Component {
    state = {
        lat: -22.90767,
        lng: -43.16927,
        zoom: 13,
    };

    render(){
        const position = [this.state.lat, this.state.lng]
        return (
            <div className="module-leafletMap">
                <Map center={position} zoom={this.state.zoom}>
                    <TileLayer attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'/>
                    <Marker position={position}>
                        <Popup>
                            <span>Hello world</span>
                        </Popup>
                    </Marker>
                </Map>
            </div>
        );
    }
}
