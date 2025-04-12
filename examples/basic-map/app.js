/**
 * Google Maps Demo Application
 * 
 * This is a demonstration of how to use the GoogleMapsService
 * in a real web application.
 */

// Import the GoogleMapsService class
// Note: In a real application, you would import from your package
// For this demo, we're directly instantiating the service from the global scope
// where it will be available after the script tag loads

// Define the main application class
class MapDemoApp {
  constructor() {
    // DOM Elements
    this.mapElement = document.getElementById('map');
    this.addressInput = document.getElementById('address-input');
    this.searchButton = document.getElementById('search-button');
    this.getDirectionsButton = document.getElementById('get-directions');
    this.clearMapButton = document.getElementById('clear-map');
    this.currentLocationButton = document.getElementById('current-location');
    this.infoPanel = document.getElementById('info-panel');
    
    // Google Maps related properties
    this.googleMapsService = null;
    this.map = null;
    this.markers = [];
    this.directionsRenderer = null;
    this.autocomplete = null;
    this.origin = null;
    
    // Initialize the app
    this.init();
  }
  
  async init() {
    try {
      // Replace this with your actual API key
      const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';
      
      // Create an instance of GoogleMapsService
      this.googleMapsService = new GoogleMapsService({
        apiKey: apiKey,
        libraries: ['places']
      });
      
      // Load the Google Maps API
      await this.googleMapsService.loadApi();
      
      // Initialize the map with default options
      this.map = await this.googleMapsService.initMap(this.mapElement, {
        center: { lat: 37.7749, lng: -122.4194 }, // San Francisco as default
        zoom: 12,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true
      });
      
      // Set up the places autocomplete for the address input
      this.autocomplete = await this.googleMapsService.createAutocomplete(
        this.addressInput,
        { types: ['geocode', 'establishment'] }
      );
      
      // Add event listeners
      this.setupEventListeners();
      
      // Show success message
      this.showInfo('Map initialized successfully! Try searching for a location.');
    } catch (error) {
      console.error('Error initializing application:', error);
      this.showInfo(`Error: ${error.message}`, true);
    }
  }
  
  setupEventListeners() {
    // Search button click
    this.searchButton.addEventListener('click', () => this.searchLocation());
    
    // Address input enter key
    this.addressInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.searchLocation();
    });
    
    // Get directions button
    this.getDirectionsButton.addEventListener('click', () => this.getDirections());
    
    // Clear map button
    this.clearMapButton.addEventListener('click', () => this.clearMap());
    
    // Current location button
    this.currentLocationButton.addEventListener('click', () => this.getCurrentLocation());
    
    // Autocomplete place changed
    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete.getPlace();
      if (place.geometry) {
        this.handlePlaceSelection(place);
      }
    });
  }
  
  async searchLocation() {
    const address = this.addressInput.value.trim();
    if (!address) {
      this.showInfo('Please enter an address or location', true);
      return;
    }
    
    try {
      this.showInfo('Searching for location...');
      
      // Geocode the address
      const results = await this.googleMapsService.geocodeAddress(address);
      
      if (results.length === 0) {
        this.showInfo('No results found for that address', true);
        return;
      }
      
      // Get the first result
      const result = results[0];
      
      // Clear any existing markers
      this.clearMarkers();
      
      // Add a marker at the location
      const marker = await this.googleMapsService.addMarker({
        position: result.location,
        map: this.map,
        animation: google.maps.Animation.DROP,
        title: result.formattedAddress || address
      });
      
      // Store the marker
      this.markers.push(marker);
      
      // Set as origin for potential directions
      this.origin = result.location;
      
      // Center and zoom the map
      this.map.setCenter(result.location);
      this.map.setZoom(15);
      
      // Show info
      this.showInfo(`Location found: ${result.formattedAddress || address}`);
      
      // Add click event to marker
      marker.addListener('click', () => {
        this.showInfo(`Selected: ${result.formattedAddress || address}`);
      });
    } catch (error) {
      console.error('Error searching for location:', error);
      this.showInfo(`Error: ${error.message}`, true);
    }
  }
  
  async handlePlaceSelection(place) {
    try {
      // Clear any existing markers
      this.clearMarkers();
      
      const location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };
      
      // Add a marker at the place
      const marker = await this.googleMapsService.addMarker({
        position: location,
        map: this.map,
        animation: google.maps.Animation.DROP,
        title: place.name
      });
      
      // Store the marker
      this.markers.push(marker);
      
      // Set as origin for potential directions
      this.origin = location;
      
      // Center and zoom the map
      this.map.setCenter(location);
      this.map.setZoom(15);
      
      // Show info
      this.showInfo(`Selected place: ${place.name}`);
      
      // Add click event to marker
      marker.addListener('click', () => {
        this.showInfo(`Selected: ${place.name}`);
      });
    } catch (error) {
      console.error('Error handling place selection:', error);
      this.showInfo(`Error: ${error.message}`, true);
    }
  }
  
  async getDirections() {
    if (!this.origin) {
      this.showInfo('Please search for a starting location first', true);
      return;
    }
    
    // Prompt user for destination
    const destination = prompt('Enter a destination address:');
    if (!destination) return;
    
    try {
      this.showInfo('Getting directions...');
      
      // Get directions
      const directions = await this.googleMapsService.getDirections(
        this.origin,
        destination,
        { travelMode: google.maps.TravelMode.DRIVING }
      );
      
      // Clear any existing directions
      if (this.directionsRenderer) {
        this.directionsRenderer.setMap(null);
      }
      
      // Display the route on the map
      this.directionsRenderer = await this.googleMapsService.displayDirections(
        directions,
        { suppressMarkers: false }
      );
      
      // Show route information
      const route = directions.routes[0];
      const leg = route.legs[0];
      this.showInfo(`
        <strong>Directions from ${leg.start_address} to ${leg.end_address}</strong><br>
        Distance: ${leg.distance.text}<br>
        Duration: ${leg.duration.text}<br>
        <em>The route is displayed on the map</em>
      `);
    } catch (error) {
      console.error('Error getting directions:', error);
      this.showInfo(`Error: ${error.message}`, true);
    }
  }
  
  clearMap() {
    // Clear markers
    this.clearMarkers();
    
    // Clear directions
    if (this.directionsRenderer) {
      this.directionsRenderer.setMap(null);
      this.directionsRenderer = null;
    }
    
    // Reset origin
    this.origin = null;
    
    // Clear address input
    this.addressInput.value = '';
    
    // Show info
    this.showInfo('Map cleared.');
  }
  
  clearMarkers() {
    // Remove all markers from the map
    this.markers.forEach(marker => marker.setMap(null));
    this.markers = [];
  }
  
  async getCurrentLocation() {
    if (!navigator.geolocation) {
      this.showInfo('Geolocation is not supported by your browser', true);
      return;
    }
    
    try {
      this.showInfo('Getting your current location...');
      
      // Get current position
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        });
      });
      
      const currentLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      
      // Clear existing markers
      this.clearMarkers();
      
      // Add marker at current location
      const marker = await this.googleMapsService.addMarker({
        position: currentLocation,
        map: this.map,
        animation: google.maps.Animation.DROP,
        title: 'Your Location'
      });
      
      // Store the marker
      this.markers.push(marker);
      
      // Set as origin for potential directions
      this.origin = currentLocation;
      
      // Center and zoom the map
      this.map.setCenter(currentLocation);
      this.map.setZoom(15);
      
      // Try to get address at this location
      try {
        const results = await this.googleMapsService.reverseGeocode(
          currentLocation.lat,
          currentLocation.lng
        );
        
        if (results.length > 0) {
          const address = results[0].formattedAddress;
          this.showInfo(`Your location: ${address}`);
          this.addressInput.value = address;
        } else {
          this.showInfo('Your current location has been found.');
        }
      } catch (error) {
        console.warn('Could not reverse geocode location:', error);
        this.showInfo('Your current location has been found.');
      }
    } catch (error) {
      console.error('Error getting current location:', error);
      this.showInfo(`Error: ${error.message}`, true);
    }
  }
  
  showInfo(message, isError = false) {
    this.infoPanel.style.display = 'block';
    this.infoPanel.innerHTML = message;
    this.infoPanel.style.backgroundColor = isError ? '#ffebee' : 'white';
    this.infoPanel.style.color = isError ? '#d32f2f' : 'black';
  }
}

// Create our services in a reusable way that can be easily referenced in the browser or imported in other files

/**
 * Google Maps Service for JavaScript/TypeScript applications
 * 
 * A flexible, reusable integration for Google Maps API that can be easily
 * incorporated into any JavaScript/TypeScript project.
 */

// GoogleMapsService class definition
class GoogleMapsService {
  constructor(config) {
    this.apiKey = config.apiKey;
    this.mapInstance = null;
    this.isLoaded = false;
    this.loadCallbacks = [];
    this.options = {
      version: config.version || 'weekly',
      libraries: config.libraries || ['places'],
      language: config.language || 'en',
      region: config.region,
      callback: config.callback || 'initMap',
      ...config
    };
    
    // Define global callback function if needed
    if (this.options.callback && typeof window !== 'undefined') {
      window[this.options.callback] = () => {
        this.isLoaded = true;
        this.loadCallbacks.forEach(callback => callback());
        this.loadCallbacks = [];
      };
    }
  }

  /**
   * Load the Google Maps API script
   * 
   * @returns Promise that resolves when the API is loaded
   */
  loadApi() {
    return new Promise((resolve, reject) => {
      if (typeof window === 'undefined') {
        reject(new Error('Google Maps can only be loaded in browser environment'));
        return;
      }

      if (this.isLoaded) {
        resolve();
        return;
      }

      // Add callback to be executed when API loads
      this.loadCallbacks.push(() => resolve());

      // Check if script is already being loaded
      if (document.querySelector(`script[src*="maps.googleapis.com/maps/api/js"]`)) {
        return;
      }

      // Create script element
      const script = document.createElement('script');
      const libraries = this.options.libraries?.join(',');
      
      script.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&v=${this.options.version}${libraries ? `&libraries=${libraries}` : ''}${this.options.language ? `&language=${this.options.language}` : ''}${this.options.region ? `&region=${this.options.region}` : ''}${this.options.callback ? `&callback=${this.options.callback}` : ''}`;
      script.async = true;
      script.defer = true;
      
      script.onerror = () => {
        reject(new Error('Google Maps script failed to load'));
      };
      
      document.head.appendChild(script);
      
      // If no callback was provided, resolve when script loads
      if (!this.options.callback) {
        script.onload = () => {
          this.isLoaded = true;
          resolve();
        };
      }
    });
  }

  /**
   * Initialize a map on a specified HTML element
   * 
   * @param element HTML element or ID of element to render map on
   * @param options Map initialization options
   * @returns The map instance
   */
  async initMap(element, options) {
    await this.ensureApiLoaded();
    
    const mapElement = typeof element === 'string' 
      ? document.getElementById(element) 
      : element;
      
    if (!mapElement) {
      throw new Error(`Map element not found: ${element}`);
    }
    
    this.mapInstance = new google.maps.Map(mapElement, options);
    return this.mapInstance;
  }

  /**
   * Get the current map instance
   * 
   * @returns The current Google Maps instance or null if not initialized
   */
  getMap() {
    return this.mapInstance;
  }

  /**
   * Geocode an address to coordinates
   * 
   * @param address Address to geocode
   * @returns Promise resolving to geocoding results
   */
  async geocodeAddress(address) {
    await this.ensureApiLoaded();
    
    return new Promise((resolve, reject) => {
      const geocoder = new google.maps.Geocoder();
      
      geocoder.geocode({ address }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results && results.length > 0) {
          const mappedResults = results.map(result => ({
            address,
            location: {
              lat: result.geometry.location.lat(),
              lng: result.geometry.location.lng()
            },
            placeId: result.place_id,
            formattedAddress: result.formatted_address,
            addressComponents: result.address_components?.map(component => ({
              longName: component.long_name,
              shortName: component.short_name,
              types: component.types
            }))
          }));
          
          resolve(mappedResults);
        } else {
          reject(new Error(`Geocoding failed: ${status}`));
        }
      });
    });
  }

  /**
   * Reverse geocode coordinates to an address
   * 
   * @param lat Latitude
   * @param lng Longitude
   * @returns Promise resolving to geocoding results
   */
  async reverseGeocode(lat, lng) {
    await this.ensureApiLoaded();
    
    return new Promise((resolve, reject) => {
      const geocoder = new google.maps.Geocoder();
      const latlng = { lat, lng };
      
      geocoder.geocode({ location: latlng }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results && results.length > 0) {
          const mappedResults = results.map(result => ({
            address: result.formatted_address,
            location: {
              lat,
              lng
            },
            placeId: result.place_id,
            formattedAddress: result.formatted_address,
            addressComponents: result.address_components?.map(component => ({
              longName: component.long_name,
              shortName: component.short_name,
              types: component.types
            }))
          }));
          
          resolve(mappedResults);
        } else {
          reject(new Error(`Reverse geocoding failed: ${status}`));
        }
      });
    });
  }

  /**
   * Add a marker to the map
   * 
   * @param options Marker options
   * @returns The created marker
   */
  async addMarker(options) {
    await this.ensureApiLoaded();
    
    if (!this.mapInstance && options.map === undefined) {
      throw new Error('No map instance available. Initialize a map first or provide a map in options.');
    }
    
    const markerOptions = {
      ...options,
      map: options.map || this.mapInstance
    };
    
    return new google.maps.Marker(markerOptions);
  }

  /**
   * Calculate route between two points
   * 
   * @param origin Starting point
   * @param destination Ending point
   * @param options Directions request options
   * @returns Promise resolving to directions result
   */
  async getDirections(origin, destination, options = {}) {
    await this.ensureApiLoaded();
    
    const directionsService = new google.maps.DirectionsService();
    
    const request = {
      origin,
      destination,
      travelMode: google.maps.TravelMode.DRIVING,
      ...options
    };
    
    return new Promise((resolve, reject) => {
      directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          resolve(result);
        } else {
          reject(new Error(`Directions request failed: ${status}`));
        }
      });
    });
  }

  /**
   * Display a route on the map
   * 
   * @param directions Directions result
   * @param options Renderer options
   * @returns The directions renderer
   */
  async displayDirections(directions, options = {}) {
    await this.ensureApiLoaded();
    
    if (!this.mapInstance && options.map === undefined) {
      throw new Error('No map instance available. Initialize a map first or provide a map in options.');
    }
    
    const rendererOptions = {
      map: options.map || this.mapInstance,
      ...options
    };
    
    const directionsRenderer = new google.maps.DirectionsRenderer(rendererOptions);
    directionsRenderer.setDirections(directions);
    
    return directionsRenderer;
  }

  /**
   * Create an autocomplete instance for address input
   * 
   * @param inputElement Input element or ID
   * @param options Autocomplete options
   * @returns The autocomplete instance
   */
  async createAutocomplete(inputElement, options = {}) {
    await this.ensureApiLoaded();
    
    const element = typeof inputElement === 'string'
      ? document.getElementById(inputElement)
      : inputElement;
      
    if (!element) {
      throw new Error(`Input element not found: ${inputElement}`);
    }
    
    return new google.maps.places.Autocomplete(element, options);
  }

  /**
   * Get details about a place
   * 
   * @param placeId The ID of the place
   * @param fields Fields to retrieve
   * @returns Promise resolving to place details
   */
  async getPlaceDetails(placeId, fields = ['address_components', 'geometry', 'name', 'formatted_address']) {
    await this.ensureApiLoaded();
    
    const placesService = new google.maps.places.PlacesService(
      this.mapInstance || document.createElement('div')
    );
    
    return new Promise((resolve, reject) => {
      placesService.getDetails({ placeId, fields }, (result, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && result) {
          resolve(result);
        } else {
          reject(new Error(`Place details request failed: ${status}`));
        }
      });
    });
  }

  // Helper to ensure API is loaded before operations
  async ensureApiLoaded() {
    if (!this.isLoaded) {
      await this.loadApi();
    }
  }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new MapDemoApp();
});
