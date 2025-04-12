# Geotype Quick Start Guide 🗺️

## 1. Get Started in 5 Minutes

### Install the Package
```bash
npm install @renegadesamuri/geotype
```

### Add a Map Container
```html
<div id="map" style="height: 400px; width: 100%;"></div>
```

### Initialize the Map
```javascript
import { GoogleMapsService } from '@yourusername/geotype';

// Create the service
const maps = new GoogleMapsService({
    apiKey: 'YOUR_GOOGLE_MAPS_API_KEY' // Get this from Google Cloud Console
});

// Initialize map
async function showMap() {
    await maps.loadApi();
    const map = await maps.initMap('map', {
        center: { lat: 40.7128, lng: -74.0060 }, // New York City
        zoom: 12
    });
}

showMap();
```

That's it! You now have a working Google Map! 🎉

## 2. Common Tasks

### Add a Marker
```javascript
maps.createMarker({
    position: { lat: 40.7128, lng: -74.0060 },
    title: 'Hello World!'
});
```

### Search for a Location
```javascript
const coords = await maps.geocodeAddress('Times Square, New York');
console.log(coords); // { lat: 40.7580, lng: -73.9855 }
```

## 3. Need Help?

- 📚 Full documentation: See INTEGRATION.md
- 🐛 Found a bug? [Report it on GitHub](https://github.com/renegadesamuri/geotype/issues)
- 💡 Have questions? [Start a discussion](https://github.com/renegadesamuri/geotype/discussions)

## 4. Getting Your API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the "Maps JavaScript API"
4. Create credentials (API key)
5. Copy the API key into your code

Remember to restrict your API key in production!
