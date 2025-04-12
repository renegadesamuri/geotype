# Geotype

🗺️ A modern, TypeScript-first Google Maps integration for JavaScript applications.

[![npm version](https://badge.fury.io/js/%40renegadesamuri%2Fgeotype.svg)](https://badge.fury.io/js/%40renegadesamuri%2Fgeotype)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C/%3E-TypeScript-blue.svg)](https://www.typescriptlang.org/)

## Features

- **TypeScript Support**: Full type definitions for better development experience
- **Modular Design**: Use only what you need
- **Promise-based API**: Modern async/await pattern for all asynchronous operations
- **Comprehensive Coverage**: Support for core Google Maps services:
  - Map initialization and configuration
  - Geocoding (address to coordinates)
  - Reverse geocoding (coordinates to address)
  - Markers and info windows
  - Directions and routes
  - Places API integration (autocomplete, place details)
  - Current location support

## Installation

```bash
npm install google-maps-ts-service
```

Or if you're using yarn:

```bash
yarn add google-maps-ts-service
```

## Quick Start

### Basic Usage

```typescript
import { GoogleMapsService } from '@renegadesamuri/geotype';

// Create a new instance with your API key
const mapsService = new GoogleMapsService({
  apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
});

// Load the Google Maps API
await mapsService.loadApi();

// Initialize a map
const map = await mapsService.initMap(document.getElementById('map'), {
  center: { lat: 37.7749, lng: -122.4194 }, // San Francisco
  zoom: 12
});

// Add a marker
const marker = await mapsService.addMarker({
  position: { lat: 37.7749, lng: -122.4194 },
  title: 'San Francisco'
});

// Geocode an address
const results = await mapsService.geocodeAddress('1600 Amphitheatre Parkway, Mountain View, CA');
console.log(results[0].location); // { lat: 37.4224764, lng: -122.0842499 }
```

### With TypeScript

```typescript
import { GoogleMapsService, GoogleMapsConfig, MapOptions } from '@renegadesamuri/geotype';

// Configure with TypeScript types
const config: GoogleMapsConfig = {
  apiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
  libraries: ['places'],
  language: 'en'
};

const mapsService = new GoogleMapsService(config);
await mapsService.loadApi();

// Strongly typed options
const mapOptions: MapOptions = {
  center: { lat: 51.5074, lng: -0.1278 }, // London
  zoom: 10,
  mapTypeId: google.maps.MapTypeId.ROADMAP
};

const map = await mapsService.initMap('map', mapOptions);
```

## Examples

### Creating a Map

```typescript
// Load API and create a map
await mapsService.loadApi();
const map = await mapsService.initMap('map-container', {
  center: { lat: 40.7128, lng: -74.0060 }, // New York
  zoom: 12,
  mapTypeId: google.maps.MapTypeId.ROADMAP,
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: true,
  scaleControl: true,
  streetViewControl: true,
  rotateControl: true,
  fullscreenControl: true
});
```

### Geocoding

```typescript
// Convert address to coordinates
const geocodeResults = await mapsService.geocodeAddress('Eiffel Tower, Paris, France');

if (geocodeResults.length > 0) {
  const location = geocodeResults[0].location;
  console.log(`Latitude: ${location.lat}, Longitude: ${location.lng}`);
  
  // You can also access:
  console.log(`Formatted address: ${geocodeResults[0].formattedAddress}`);
  console.log(`Place ID: ${geocodeResults[0].placeId}`);
}
```

### Reverse Geocoding

```typescript
// Convert coordinates to address
const reverseResults = await mapsService.reverseGeocode(48.8584, 2.2945);

if (reverseResults.length > 0) {
  console.log(`Address: ${reverseResults[0].formattedAddress}`);
}
```

### Adding Markers

```typescript
// Add a marker to the map
const marker = await mapsService.addMarker({
  position: { lat: 48.8584, lng: 2.2945 },
  map: map, // your map instance
  title: 'Eiffel Tower',
  animation: google.maps.Animation.DROP,
  draggable: true
});

// Add a click event to the marker
marker.addListener('click', () => {
  console.log('Marker clicked!');
});
```

### Getting Directions

```typescript
// Calculate route between two points
const directionsResult = await mapsService.getDirections(
  'Times Square, New York, NY',
  'Empire State Building, New York, NY',
  {
    travelMode: google.maps.TravelMode.WALKING
  }
);

// Display the route on the map
const directionsRenderer = await mapsService.displayDirections(
  directionsResult,
  {
    map: map,
    suppressMarkers: false,
    polylineOptions: {
      strokeColor: '#4285F4',
      strokeWeight: 5
    }
  }
);

// Access route information
const route = directionsResult.routes[0];
const leg = route.legs[0];
console.log(`Distance: ${leg.distance.text}`);
console.log(`Duration: ${leg.duration.text}`);
```

### Places Autocomplete

```typescript
// Create an autocomplete input
const autocomplete = await mapsService.createAutocomplete(
  document.getElementById('search-input'),
  {
    types: ['geocode', 'establishment'],
    componentRestrictions: { country: 'us' }
  }
);

// Handle place selection
autocomplete.addListener('place_changed', () => {
  const place = autocomplete.getPlace();
  if (place.geometry) {
    map.setCenter(place.geometry.location);
    map.setZoom(15);
    
    // Add a marker at the selected place
    mapsService.addMarker({
      position: place.geometry.location,
      map: map,
      title: place.name
    });
  }
});
```

### Getting Current Location

```typescript
try {
  // Get current position from browser
  const position = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    });
  });
  
  const location = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  };
  
  // Center map and add marker
  map.setCenter(location);
  map.setZoom(15);
  
  const marker = await mapsService.addMarker({
    position: location,
    map: map,
    title: 'Your Location'
  });
  
  // Optionally reverse geocode to get address
  const address = await mapsService.reverseGeocode(location.lat, location.lng);
  console.log(`You are at: ${address[0].formattedAddress}`);
} catch (error) {
  console.error('Error getting current location:', error);
}
```

## API Reference

### GoogleMapsService

Main class for Google Maps integration.

#### Constructor

```typescript
constructor(config: GoogleMapsConfig)
```

- `config`: Configuration object for Google Maps API
  - `apiKey` (string, required): Your Google Maps API key
  - `version` (string, optional): API version, defaults to 'weekly'
  - `libraries` (string[], optional): Libraries to load, defaults to ['places']
  - `language` (string, optional): Language code, defaults to 'en'
  - `region` (string, optional): Region code
  - `callback` (string, optional): Callback function name, defaults to 'initMap'

#### Methods

- `loadApi()`: Loads the Google Maps API script
- `initMap(element, options)`: Initializes a map on the specified element
- `getMap()`: Gets the current map instance
- `geocodeAddress(address)`: Geocodes an address to coordinates
- `reverseGeocode(lat, lng)`: Reverse geocodes coordinates to an address
- `addMarker(options)`: Adds a marker to the map
- `getDirections(origin, destination, options)`: Calculates directions between two points
- `displayDirections(directions, options)`: Displays directions on the map
- `createAutocomplete(inputElement, options)`: Creates an autocomplete instance for an input element
- `getPlaceDetails(placeId, fields)`: Gets details about a place

## Browser Support

The service is compatible with all modern browsers that support Google Maps JavaScript API v3:

- Chrome
- Firefox
- Safari
- Edge
- Opera

## Using Without npm

You can also use this service directly in a browser without npm:

1. Copy the `src/google-maps-service.ts` file and rename it to `.js` (or transpile it)
2. Include it in your HTML:
   ```html
   <script src="path/to/google-maps-service.js"></script>
   ```
3. Create an instance:
   ```html
   <script>
     const mapsService = new GoogleMapsService({
       apiKey: 'YOUR_API_KEY'
     });
     
     // Use the service...
   </script>
   ```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
