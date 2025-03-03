import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Search, Layers, Navigation, ZoomIn, ZoomOut } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface MapViewProps {
  center: [number, number];
  markers?: Array<{
    id: string;
    position: [number, number];
    title: string;
    description: string;
  }>;
}

const MapControls: React.FC = () => {
  const map = useMap();
  
  const handleZoomIn = () => {
    map.zoomIn();
  };
  
  const handleZoomOut = () => {
    map.zoomOut();
  };
  
  return (
    <div className="absolute top-4 right-4 z-[1000] flex flex-col space-y-2">
      <button 
        onClick={handleZoomIn}
        className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
      >
        <ZoomIn size={20} />
      </button>
      <button 
        onClick={handleZoomOut}
        className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
      >
        <ZoomOut size={20} />
      </button>
    </div>
  );
};

const MapView: React.FC<MapViewProps> = ({ 
  center = [31.255278975180, 34.80915054343513], 
  markers = [] 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLayer, setSelectedLayer] = useState('standard');
  const [showLayersMenu, setShowLayersMenu] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number]>(center);
  
  const defaultMarkers = [
    {
      id: '1',
      position: [31.255278975180, 34.80915054343513] as [number, number],
      title: 'Gas Leak Location',
      description: 'Main incident site'
    },
    {
      id: '2',
      position: [31.256278975180, 34.81015054343513] as [number, number],
      title: 'Evacuation Point',
      description: 'Primary evacuation area'
    }
  ];
  
  const allMarkers = [...defaultMarkers, ...(markers || [])];
  
  const mapLayers = [
    { id: 'standard', name: 'Standard', url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' },
    { id: 'satellite', name: 'Satellite', url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}' }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would geocode the address and move the map
    console.log('Searching for location:', searchQuery);
    // Mock moving to a slightly different location
    if (searchQuery.trim()) {
      const newLat = center[0] + (Math.random() * 0.01 - 0.005);
      const newLng = center[1] + (Math.random() * 0.01 - 0.005);
      setMapCenter([newLat, newLng]);
    }
  };

  const handleMyLocation = () => {
    // In a real app, this would use the browser's geolocation API
    console.log('Getting user location');
    // Mock moving to user location
    const userLat = center[0] + (Math.random() * 0.02 - 0.01);
    const userLng = center[1] + (Math.random() * 0.02 - 0.01);
    setMapCenter([userLat, userLng]);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full relative">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
        <h2 className="text-xl font-semibold">Map</h2>
        
        <div className="flex items-center space-x-3">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="absolute left-3 top-2.5 text-gray-400">
              <Search size={18} />
            </button>
          </form>
          
          <div className="relative">
            <button 
              className="px-3 py-2 border border-gray-300 rounded-lg flex items-center bg-white"
              onClick={() => setShowLayersMenu(!showLayersMenu)}
            >
              <Layers size={16} className="mr-2" />
              <span>Layers</span>
            </button>
            
            {showLayersMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                <div className="p-3 border-b border-gray-200">
                  <h3 className="font-semibold">Map Layers</h3>
                </div>
                <div className="p-3">
                  {mapLayers.map(layer => (
                    <div key={layer.id} className="flex items-center mb-2 last:mb-0">
                      <input
                        type="radio"
                        id={layer.id}
                        name="mapLayer"
                        checked={selectedLayer === layer.id}
                        onChange={() => {
                          setSelectedLayer(layer.id);
                          setShowLayersMenu(false);
                        }}
                        className="mr-2"
                      />
                      <label htmlFor={layer.id}>{layer.name}</label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <button 
            className="px-3 py-2 border border-gray-300 rounded-lg flex items-center bg-white"
            onClick={handleMyLocation}
          >
            <Navigation size={16} className="mr-2" />
            <span>My Location</span>
          </button>
        </div>
      </div>
      
      <div className="h-[500px]">
        <MapContainer 
          center={mapCenter} 
          zoom={15} 
          style={{ height: '100%', width: '100%' }}
          key={`${mapCenter[0]}-${mapCenter[1]}-${selectedLayer}`}
        >
          <TileLayer
            url={mapLayers.find(l => l.id === selectedLayer)?.url || mapLayers[0].url}
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {allMarkers.map(marker => (
            <Marker key={marker.id} position={marker.position}>
              <Popup>
                <div>
                  <h3 className="font-semibold">{marker.title}</h3>
                  <p>{marker.description}</p>
                </div>
              </Popup>
            </Marker>
          ))}
          
          <MapControls />
        </MapContainer>
      </div>
    </div>
  );
};

export default MapView;