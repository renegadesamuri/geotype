import React, { useEffect, useRef, useState } from 'react';
import { GoogleMapsService, GoogleMapsConfig } from '../../src/google-maps-service';

// Define types for component props
interface GoogleMapProps {
  apiKey: string;
  center?: { lat: number; lng: number };
  zoom?: number;
  width?: string;
  height?: string;
  onMapLoad?: (map: google.maps.Map) => void;
}

// Define types for the component state
interface MapState {
  isLoading: boolean;
  error: string | null;
  map: google.maps.Map | null;
}

/**
 * A React component that renders a Google Map using the GoogleMapsService
 */
const GoogleMap: React.FC<GoogleMapProps> = ({
  apiKey,
  center = { lat: 37.7749, lng: -122.4194 }, // Default: San Francisco
  zoom = 12,
  width = '100%',
  height = '400px',
  onMapLoad
}) => {
  // Create refs for the map container and service
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapsServiceRef = useRef<GoogleMapsService | null>(null);
  
  // Set up component state
  const [mapState, setMapState] = useState<MapState>({
    isLoading: true,
    error: null,
    map: null
  });

  // Initialize the map on component mount
  useEffect(() => {
    // Skip if API key is not provided
    if (!apiKey) {
      setMapState({
        isLoading: false,
        error: 'Google Maps API key is required',
        map: null
      });
      return;
    }

    // Skip if map container is not available
    if (!mapContainerRef.current) {
      return;
    }

    // Define an async function to initialize the map
    const initializeMap = async () => {
      try {
        // Configure the Google Maps service
        const config: GoogleMapsConfig = {
          apiKey,
          libraries: ['places', 'geometry'],
          language: 'en'
        };

        // Create the Google Maps service if it doesn't exist
        if (!mapsServiceRef.current) {
          mapsServiceRef.current = new GoogleMapsService(config);
        }

        // Load the Google Maps API
        await mapsServiceRef.current.loadApi();

        // Initialize the map
        const map = await mapsServiceRef.current.initMap(mapContainerRef.current, {
          center,
          zoom,
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
          zoomControl: true
        });

        // Update state with the map instance
        setMapState({
          isLoading: false,
          error: null,
          map
        });

        // Call the onMapLoad callback if provided
        if (onMapLoad) {
          onMapLoad(map);
        }
      } catch (error) {
        // Handle any errors during initialization
        setMapState({
          isLoading: false,
          error: error instanceof Error ? error.message : 'Failed to load Google Maps',
          map: null
        });
      }
    };

    // Call the initialization function
    initializeMap();

    // Clean up function
    return () => {
      // Any cleanup needed when the component unmounts
      // (Google Maps API doesn't require explicit cleanup)
    };
  }, [apiKey, center, zoom, onMapLoad]);

  // Update the map when center or zoom changes
  useEffect(() => {
    if (mapState.map) {
      mapState.map.setCenter(center);
      mapState.map.setZoom(zoom);
    }
  }, [center, zoom, mapState.map]);

  // Render the component
  return (
    <div>
      {mapState.error && (
        <div style={{ color: 'red', marginBottom: '10px' }}>
          Error: {mapState.error}
        </div>
      )}
      
      <div 
        ref={mapContainerRef} 
        style={{ 
          width, 
          height,
          backgroundColor: '#f0f0f0',
          border: '1px solid #ddd',
          borderRadius: '4px'
        }}
      >
        {mapState.isLoading && (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            height: '100%',
            color: '#666'
          }}>
            Loading Google Map...
          </div>
        )}
      </div>
    </div>
  );
};

export default GoogleMap;
