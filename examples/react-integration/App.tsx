import React, { useState, useCallback } from 'react';
import GoogleMap from './GoogleMap';
import { GoogleMapsService } from '../../src/google-maps-service';

// Example styles
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    marginBottom: '20px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '20px',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '15px',
    marginBottom: '20px',
    padding: '15px',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '5px',
  },
  label: {
    fontSize: '14px',
    fontWeight: 'bold',
  },
  input: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '14px',
  },
  buttonRow: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px',
  },
  button: {
    padding: '10px 15px',
    backgroundColor: '#4285F4',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  clearButton: {
    backgroundColor: '#757575',
  },
  mapContainer: {
    marginBottom: '20px',
  },
  infoPanel: {
    marginTop: '20px',
    padding: '15px',
    backgroundColor: '#e3f2fd',
    borderRadius: '4px',
    fontSize: '14px',
    lineHeight: '1.5',
  },
  code: {
    display: 'block',
    padding: '15px',
    backgroundColor: '#f8f9fa',
    border: '1px solid #ddd',
    borderRadius: '4px',
    overflowX: 'auto' as const,
    fontSize: '14px',
    lineHeight: '1.4',
    fontFamily: 'monospace',
    margin: '20px 0',
  },
};

/**
 * Example React application that uses our GoogleMap component
 */
const App: React.FC = () => {
  // Replace with your actual API key
  const API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY';

  // State for the map location
  const [location, setLocation] = useState({
    center: { lat: 37.7749, lng: -122.4194 }, // San Francisco
    zoom: 12,
  });

  // State for the search input
  const [searchInput, setSearchInput] = useState('');

  // State for the map service and markers
  const [mapService, setMapService] = useState<GoogleMapsService | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [infoText, setInfoText] = useState<string>('');

  // Handle map load event
  const handleMapLoad = useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance);
    
    // Create a maps service instance
    const service = new GoogleMapsService({
      apiKey: API_KEY,
    });
    
    setMapService(service);
    setInfoText('Map loaded successfully! Try searching for a location.');
  }, [API_KEY]);

  // Handle search
  const handleSearch = useCallback(async () => {
    if (!mapService || !map || !searchInput.trim()) {
      setInfoText('Please enter a location to search for.');
      return;
    }

    try {
      setInfoText('Searching...');
      
      // Geocode the address
      const results = await mapService.geocodeAddress(searchInput);
      
      if (results.length === 0) {
        setInfoText('No results found for that location.');
        return;
      }
      
      // Get the first result
      const result = results[0];
      
      // Update the map location
      setLocation({
        center: result.location,
        zoom: 15,
      });
      
      setInfoText(`Found: ${result.formattedAddress}`);
    } catch (error) {
      setInfoText(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }, [mapService, map, searchInput]);

  // Add a marker at the current map center
  const handleAddMarker = useCallback(async () => {
    if (!mapService || !map) {
      setInfoText('Map is not ready yet.');
      return;
    }

    try {
      // Add a marker at the current center
      const marker = await mapService.addMarker({
        position: location.center,
        map,
        animation: google.maps.Animation.DROP,
        title: 'Marker at ' + location.center.lat + ', ' + location.center.lng,
      });
      
      // Add a click event to the marker
      marker.addListener('click', () => {
        setInfoText(`Marker clicked at ${location.center.lat.toFixed(6)}, ${location.center.lng.toFixed(6)}`);
      });
      
      // Add to markers array
      setMarkers((prev) => [...prev, marker]);
      
      setInfoText('Marker added!');
    } catch (error) {
      setInfoText(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }, [mapService, map, location.center]);

  // Clear all markers
  const handleClearMarkers = useCallback(() => {
    if (markers.length === 0) {
      setInfoText('No markers to clear.');
      return;
    }

    // Remove all markers from the map
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    
    // Clear markers array
    setMarkers([]);
    
    setInfoText('All markers cleared.');
  }, [markers]);

  // Reset the map view
  const handleResetView = useCallback(() => {
    setLocation({
      center: { lat: 37.7749, lng: -122.4194 }, // San Francisco
      zoom: 12,
    });
    
    setInfoText('Map view reset to San Francisco.');
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Google Maps React Integration</h1>
        <p style={styles.subtitle}>
          This example demonstrates how to use the GoogleMapsService in a React application.
        </p>
      </div>

      <div style={styles.controls}>
        <div style={styles.inputGroup}>
          <label style={styles.label} htmlFor="search">Search for a location:</label>
          <input
            id="search"
            style={styles.input}
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Enter a location (e.g., Eiffel Tower, Paris)"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
        </div>

        <div style={styles.buttonRow}>
          <button style={styles.button} onClick={handleSearch}>
            Search
          </button>
          <button style={styles.button} onClick={handleAddMarker}>
            Add Marker
          </button>
          <button
            style={{ ...styles.button, ...styles.clearButton }}
            onClick={handleClearMarkers}
          >
            Clear Markers
          </button>
          <button
            style={{ ...styles.button, ...styles.clearButton }}
            onClick={handleResetView}
          >
            Reset View
          </button>
        </div>
      </div>

      <div style={styles.mapContainer}>
        <GoogleMap
          apiKey={API_KEY}
          center={location.center}
          zoom={location.zoom}
          height="500px"
          onMapLoad={handleMapLoad}
        />
      </div>

      {infoText && (
        <div style={styles.infoPanel}>
          <strong>Status:</strong> {infoText}
        </div>
      )}
      
      <div>
        <h2>How to use the GoogleMap component in React</h2>
        
        <p>First, import the component:</p>
        <pre style={styles.code}>
{`import GoogleMap from './GoogleMap';
import { GoogleMapsService } from 'google-maps-ts-service';`}
        </pre>
        
        <p>Then, include it in your JSX:</p>
        <pre style={styles.code}>
{`<GoogleMap
  apiKey="YOUR_GOOGLE_MAPS_API_KEY"
  center={{ lat: 37.7749, lng: -122.4194 }}
  zoom={12}
  height="500px"
  onMapLoad={handleMapLoad}
/>`}
        </pre>
        
        <p>Handle map events:</p>
        <pre style={styles.code}>
{`const handleMapLoad = (mapInstance) => {
  // Store the map instance
  setMap(mapInstance);
  
  // Create a service instance
  const service = new GoogleMapsService({
    apiKey: "YOUR_GOOGLE_MAPS_API_KEY",
  });
  
  // Store the service
  setMapService(service);
};`}
        </pre>
      </div>
    </div>
  );
};

export default App;
