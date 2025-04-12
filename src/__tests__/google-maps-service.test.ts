import { GoogleMapsService } from '../geotype';

describe('GoogleMapsService', () => {
  let mapsService: GoogleMapsService;
  const mockApiKey = 'test-api-key';

  beforeEach(() => {
    mapsService = new GoogleMapsService({ apiKey: mockApiKey });
  });

  describe('initialization', () => {
    it('should create instance with API key', () => {
      expect(mapsService).toBeDefined();
      expect(mapsService['apiKey']).toBe(mockApiKey);
    });

    it('should load API successfully', async () => {
      const loadSpy = jest.spyOn(document.head, 'appendChild');
      await mapsService.loadApi();
      
      expect(loadSpy).toHaveBeenCalled();
      expect(document.createElement).toHaveBeenCalledWith('script');
    });
  });

  describe('map operations', () => {
    beforeEach(async () => {
      await mapsService.loadApi();
    });

    it('should initialize map with options', async () => {
      const mockElement = document.createElement('div');
      const options = {
        center: { lat: 40.7128, lng: -74.0060 },
        zoom: 12
      };

      await mapsService.initMap('map-container', options);
      
      expect(google.maps.Map).toHaveBeenCalledWith(
        expect.any(Object),
        expect.objectContaining(options)
      );
    });

    it('should create marker', () => {
      const markerOptions: google.maps.MarkerOptions = {
        position: { lat: 40.7128, lng: -74.0060 },
        title: 'Test Marker'
      };
      mapsService.createMarker(markerOptions);
      
      expect(google.maps.Marker).toHaveBeenCalledWith(
        expect.objectContaining(markerOptions)
      );
    });
  });

  describe('geocoding', () => {
    beforeEach(async () => {
      await mapsService.loadApi();
    });

    it('should geocode address', async () => {
      const mockResults = [{
        geometry: {
          location: { lat: 40.7128, lng: -74.0060 }
        }
      }];

      const mockGeocoder = {
        geocode: jest.fn().mockImplementation((request, callback) => {
          callback(mockResults, 'OK');
        })
      };

      (google.maps.Geocoder as jest.Mock).mockImplementation(() => mockGeocoder);

      const result = await mapsService.geocodeAddress('New York, NY');
      expect(result).toEqual(mockResults[0].geometry.location);
    });
  });

  describe('error handling', () => {
    it('should throw error when API fails to load', async () => {
      // Simulate script load error
      document.createElement = jest.fn().mockImplementation(() => ({
        setAttribute: jest.fn(),
        addEventListener: jest.fn().mockImplementation((event, handler) => {
          if (event === 'error') {
            handler(new Error('Failed to load'));
          }
        }),
        removeEventListener: jest.fn()
      }));

      await expect(mapsService.loadApi()).rejects.toThrow('Failed to load Google Maps API');
    });
  });
});
