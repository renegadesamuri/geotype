# Publishing Geotype

This document describes how to publish Geotype to npm and how users can install and use it.

## Publishing to npm

### First-time Setup

1. Create an npm account at https://www.npmjs.com/signup
2. Login to npm in your terminal:
   ```bash
   npm login
   ```
3. Verify you're logged in:
   ```bash
   npm whoami
   ```

### Before Publishing

1. Update version in package.json:
   ```bash
   npm version patch  # for bug fixes
   npm version minor  # for new features
   npm version major  # for breaking changes
   ```

2. Build the package:
   ```bash
   npm run build
   ```

3. Test the build:
   ```bash
   npm test
   ```

4. Review what will be published:
   ```bash
   npm run publish:dry
   ```

### Publishing

1. Publish to npm:
   ```bash
   npm run publish:public
   ```

2. Verify the package is published:
   - Visit https://www.npmjs.com/package/@geotype/maps
   - Try installing it in a new project

## Installation for Users

### npm
```bash
npm install @geotype/maps
```

### yarn
```bash
yarn add @geotype/maps
```

### CDN
```html
<script src="https://unpkg.com/@geotype/maps/dist/geotype.min.js"></script>
```

## Usage Examples

### TypeScript/JavaScript Module
```typescript
import { GoogleMapsService } from '@geotype/maps';

const maps = new GoogleMapsService({
  apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
});

await maps.loadApi();
const map = await maps.initMap('map-container', {
  center: { lat: 40.7128, lng: -74.0060 },
  zoom: 12
});
```

### Browser (via CDN)
```html
<script src="https://unpkg.com/@geotype/maps/dist/geotype.min.js"></script>
<script>
  const maps = new GoogleMapsService({
    apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
  });

  async function initMap() {
    await maps.loadApi();
    const map = await maps.initMap('map-container', {
      center: { lat: 40.7128, lng: -74.0060 },
      zoom: 12
    });
  }

  initMap();
</script>
```

### React
```typescript
import { GoogleMap } from '@geotype/maps/react';

function App() {
  return (
    <GoogleMap
      apiKey="YOUR_GOOGLE_MAPS_API_KEY"
      center={{ lat: 40.7128, lng: -74.0060 }}
      zoom={12}
    />
  );
}
```

## Version History

- 1.0.0: Initial release
  - Full TypeScript support
  - Comprehensive Google Maps API integration
  - React component
  - Browser and module support

## Support

For issues and feature requests, please visit:
https://github.com/geotype/maps/issues

## License

MIT License - see LICENSE file for details
