# Integrating Geotype in Your Project

## Installation

Choose one of these methods to install Geotype:

```bash
# Using npm
npm install @renegadesamuri/geotype

# Using yarn
yarn add @renegadesamuri/geotype

# Using pnpm
pnpm add @renegadesamuri/geotype
```

## Usage Examples

### 1. Basic JavaScript Integration

```html
<!DOCTYPE html>
<html>
<head>
    <title>Basic Map Example</title>
    <style>
        #map { height: 400px; width: 100%; }
    </style>
</head>
<body>
    <div id="map"></div>
    <script type="module">
        import { GoogleMapsService } from '@yourusername/geotype';

        // Initialize the service
        const mapsService = new GoogleMapsService({
            apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
        });

        // Create a map
        async function initMap() {
            await mapsService.loadApi();
            const map = await mapsService.initMap('map', {
                center: { lat: 40.7128, lng: -74.0060 }, // New York
                zoom: 12
            });

            // Add a marker
            mapsService.createMarker({
                position: { lat: 40.7128, lng: -74.0060 },
                title: 'New York'
            });
        }

        initMap();
    </script>
</body>
</html>
```

### 2. TypeScript Integration

```typescript
import { GoogleMapsService } from '@yourusername/geotype';

class MapController {
    private mapsService: GoogleMapsService;

    constructor(apiKey: string) {
        this.mapsService = new GoogleMapsService({ apiKey });
    }

    async initialize(elementId: string) {
        await this.mapsService.loadApi();
        
        const map = await this.mapsService.initMap(elementId, {
            center: { lat: 40.7128, lng: -74.0060 },
            zoom: 12
        });

        return map;
    }

    async addMarker(location: { lat: number; lng: number }, title?: string) {
        return this.mapsService.createMarker({
            position: location,
            title
        });
    }

    async geocodeAddress(address: string) {
        const location = await this.mapsService.geocodeAddress(address);
        return location;
    }
}

// Usage
const controller = new MapController('YOUR_GOOGLE_MAPS_API_KEY');
await controller.initialize('map-container');
```

### 3. React Integration

```tsx
import React, { useEffect, useRef } from 'react';
import { GoogleMapsService } from '@yourusername/geotype';

interface MapProps {
    apiKey: string;
    center: { lat: number; lng: number };
    zoom?: number;
}

const MapComponent: React.FC<MapProps> = ({ apiKey, center, zoom = 12 }) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const serviceRef = useRef<GoogleMapsService>();

    useEffect(() => {
        const initMap = async () => {
            if (!mapRef.current) return;

            serviceRef.current = new GoogleMapsService({ apiKey });
            await serviceRef.current.loadApi();
            
            const map = await serviceRef.current.initMap(mapRef.current, {
                center,
                zoom
            });
        };

        initMap();
    }, [apiKey, center, zoom]);

    return <div ref={mapRef} style={{ height: '400px', width: '100%' }} />;
};

// Usage
function App() {
    return (
        <MapComponent 
            apiKey="YOUR_GOOGLE_MAPS_API_KEY"
            center={{ lat: 40.7128, lng: -74.0060 }}
        />
    );
}
```

### 4. Vue.js Integration

```vue
<template>
    <div ref="mapElement" style="height: 400px; width: 100%"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { GoogleMapsService } from '@yourusername/geotype';

export default defineComponent({
    props: {
        apiKey: {
            type: String,
            required: true
        },
        center: {
            type: Object,
            default: () => ({ lat: 40.7128, lng: -74.0060 })
        },
        zoom: {
            type: Number,
            default: 12
        }
    },
    setup(props) {
        const mapElement = ref<HTMLElement | null>(null);
        const mapsService = new GoogleMapsService({ apiKey: props.apiKey });

        onMounted(async () => {
            if (!mapElement.value) return;

            await mapsService.loadApi();
            const map = await mapsService.initMap(mapElement.value, {
                center: props.center,
                zoom: props.zoom
            });
        });

        return {
            mapElement
        };
    }
});
</script>
```

## Advanced Features

### Geocoding

```typescript
const mapsService = new GoogleMapsService({ apiKey: 'YOUR_API_KEY' });
await mapsService.loadApi();

// Convert address to coordinates
const location = await mapsService.geocodeAddress('1600 Amphitheatre Parkway, Mountain View, CA');
console.log(location); // { lat: 37.4224764, lng: -122.0842499 }
```

### Custom Markers

```typescript
const marker = mapsService.createMarker({
    position: { lat: 40.7128, lng: -74.0060 },
    title: 'Custom Marker',
    icon: {
        url: 'path/to/custom-icon.png',
        scaledSize: { width: 32, height: 32 }
    },
    draggable: true
});
```

## Tips

1. Always store your API key securely (environment variables)
2. Initialize the service once and reuse the instance
3. Use TypeScript for better type safety and autocompletion
4. Handle loading and error states appropriately
5. Consider implementing retry logic for API loading

## Common Issues

1. **API Key not working**: Ensure you have enabled the Maps JavaScript API in your Google Cloud Console
2. **Map not showing**: Check if the container element has a defined height
3. **TypeScript errors**: Make sure you have the correct type definitions installed

Need more help? Check our [GitHub issues](https://github.com/yourusername/geotype/issues) or create a new one!
