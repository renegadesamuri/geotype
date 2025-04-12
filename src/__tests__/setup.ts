// Mock the google maps API
const mockGoogleMaps = {
  maps: {
    Map: jest.fn().mockImplementation(() => ({})),
    Marker: jest.fn().mockImplementation(() => ({
      setMap: jest.fn()
    })),
    LatLng: jest.fn().mockImplementation((lat, lng) => ({ lat, lng })),
    Geocoder: jest.fn(),
    places: {
      AutocompleteService: jest.fn(),
      PlacesService: jest.fn()
    },
    MapTypeId: {
      ROADMAP: 'roadmap',
      SATELLITE: 'satellite',
      HYBRID: 'hybrid',
      TERRAIN: 'terrain'
    }
  }
};

// Add google maps to global scope
(global as any).google = mockGoogleMaps;

// Mock script loading
global.document.createElement = jest.fn().mockImplementation((tagName) => {
  if (tagName === 'script') {
    return {
      setAttribute: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn()
    };
  }
  return {};
});

// Mock document.head
Object.defineProperty(document, 'head', {
  value: {
    appendChild: jest.fn(),
    removeChild: jest.fn()
  },
  writable: false
});

// Clear all mocks after each test
afterEach(() => {
  jest.clearAllMocks();
});
