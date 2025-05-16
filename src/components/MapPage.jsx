import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon issue in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

function MapPage({ onBack }) {
  // San Francisco coordinates
  const position = [37.7749, -122.4194];

  useEffect(() => {
    document.title = 'Map - PWA Demo';
  }, []);
  
  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  return (
    <div className="map-page">
      <h1>Map Page</h1>
      <p>This is a simple map implementation using Leaflet</p>
      
      <div className="map-container">
        <MapContainer 
          center={position} 
          zoom={13} 
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
            <Popup>
              San Francisco <br /> A beautiful city.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
      
      <div className="navigation">
        <button 
          onClick={handleBackClick}
          className="back-button"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default MapPage;
