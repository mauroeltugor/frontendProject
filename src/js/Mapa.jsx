import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

function Mapa({ posts }) {
  const defaultCenter = [4.5236039, -75.7090892];

  // Define el icono personalizado con la URL
  const customMarkerIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/6387/6387972.png', 
    iconSize: [35, 35], 
    iconAnchor: [16, 32], 
    popupAnchor: [0, -32] 
  });

  return (
    <div style={{ height: '400px', padding: '30px' }}>
      <MapContainer center={defaultCenter} zoom={12} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://%7Bs%7D.tile.openstreetmap.org/%7Bz%7D/%7Bx%7D/%7By%7D.png"
          attribution='© OpenStreetMap contributors'
        />
        {posts && posts.map((post) => (
          <Marker key={post._id} position={[post.latitud, post.longitud]} icon={customMarkerIcon}>
            <Popup>
              <div>
                <strong>Parqueadero:</strong> {post.title}
                <br />
                <strong>Dirección:</strong> {post.content}
              </div>
              <Link to='/ReservaYReservas'>
                <Button>Puestos</Button>
              </Link>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Mapa;