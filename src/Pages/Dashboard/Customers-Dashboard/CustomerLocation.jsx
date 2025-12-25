import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const CustomerLocation = ({ setLocation }) => {
  const [marker, setMarker] = useState(null);
  if (marker !== null) {
    setLocation(marker);
  }

  // Detect user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setMarker({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      });
    }
  }, []);

  const MapClick = () => {
    useMapEvents({
      click(e) {
        setMarker({ lat: e.latlng.lat, lng: e.latlng.lng });
      },
    });
    return null;
  };

  function Recenter({ marker }) {
    const map = useMap();
    useEffect(() => {
      if (marker) {
        map.setView(marker, map.getZoom());
      }
    }, [marker]);
    return null;
  }

  return (
    <div className="border-2 border-primary shadow-xl">
      <MapContainer
        center={marker || [23.8103, 90.4125]}
        zoom={20}
        style={{ height: "400px", width: "100%" }}
        zoomControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {marker && <Marker position={marker} />}
        <MapClick />
        {marker && <Recenter marker={marker} />}
      </MapContainer>
    </div>
  );
};

export default CustomerLocation;
