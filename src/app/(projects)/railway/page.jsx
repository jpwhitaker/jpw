"use client";
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import './styles.css'

import { MapContainer, TileLayer, useMap, Marker, Popup, SVGOverlay } from 'react-leaflet'
// import Rail from './rail.svg'

export default function Railway() {
  const bounds = [
    [21.4389, -158.0001],
    [[21.4489, -158.0081]],
  ]

  return (
    <MapContainer className='full-height-map' center={[21.4389, -158.0001]} zoom={12} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[21.4389, 158.0001]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <SVGOverlay attributes={{ stroke: 'red' }} bounds={bounds}>
        <image
          href="/rail.svg"
          x="0" y="0"
          width="100%"
          height="100%"
        />
        <circle r="5" cx="10" cy="10" fill="red" />


      </SVGOverlay>
    </MapContainer>
  );
};
