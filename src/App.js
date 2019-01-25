import React, {Component} from 'react'
import {TileLayer, Map, WMSTileLayer, Pane} from 'react-leaflet'
import styled from 'styled-components'
import 'leaflet/dist/leaflet.css';

import './App.css';

import * as THREE from 'three';

import * as CSS3D from 'three-css3drenderer'

import TrackballControls from 'three-trackballcontrols'


const MapContainer = styled(Map)`
    width: 100vw;
    height: 100vh`;

class App extends Component {

    constructor() {
        super();
        this.containerRef = React.createRef();
        this.osmRef = React.createRef();
        this.wmsRef = React.createRef();
    }

    componentDidMount() {
        const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
        camera.position.z = 3000;

        const scene = new THREE.Scene();

        const renderer = new CSS3D.CSS3DRenderer()
        renderer.setSize(window.innerWidth, window.innerHeight);
        this.containerRef.current.appendChild(renderer.domElement);

        const controls = new TrackballControls(camera, renderer.domElement);
        controls.rotateSpeed = 0.5;
        controls.minDistance = 500;
        controls.maxDistance = 6000;
        controls.addEventListener('change', () => {
            renderer.render(scene, camera)
        });

        renderer.render(scene, camera);

        function animate() {
            requestAnimationFrame(animate);
            controls.update();
        }

        animate();

        setTimeout(() => {
            const osm = new CSS3D.CSS3DObject(this.osmRef.current.leafletElement.getPane());
            osm.position.x = 0;
            osm.position.y = 0;
            osm.position.z = 0;
            scene.add(osm);

            const wms = new CSS3D.CSS3DObject(this.wmsRef.current.leafletElement.getPane());
            wms.position.x = 0;
            wms.position.y = 0;
            wms.position.z = 200;
            scene.add(wms);

            renderer.render(scene, camera);

        }, 2000);


    }


    render() {
        return (
            <div className="App">
                <MapContainer center={[62, 24]} zoom={7}>
                    <Pane>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                            ref={this.osmRef}
                        />
                    </Pane>
                    <Pane>
                        <WMSTileLayer
                            url="http://openwms.fmi.fi/geoserver/wms"
                            layers="Radar:suomi_rr_eureffin"
                            transparent='true'
                            format='image/png'
                            ref={this.wmsRef}
                        />
                    </Pane>
                </MapContainer>
                <div ref={this.containerRef} style={{
                    height: '100%',
                    width: '100%',
                    left: '0',
                    top: '0',
                    overflow: 'hidden',
                    position: 'fixed',
                    zIndex: 1000
                }}/>
            </div>

        );
    }
}

export default App;
