/**
 * Google Maps Service for JavaScript/TypeScript applications
 * 
 * A flexible, reusable integration for Google Maps API that can be easily
 * incorporated into any JavaScript/TypeScript project.
 */

// Types for Google Maps API
export interface GoogleMapsConfig {
  apiKey: string;
  version?: string;
  libraries?: string[];
  language?: string;
  region?: string;
  callback?: string;
}

export interface GeocodingResult {
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  placeId?: string;
  formattedAddress?: string;
  addressComponents?: Array<{
    longName: string;
    shortName: string;
    types: string[];
  }>;
}

export interface MapOptions {
  center: { lat: number; lng: number };
  zoom: number;
  mapTypeId?: string;
  styles?: any[];
  disableDefaultUI?: boolean;
  [key: string]: any; // For other Google Maps options
}

// Main Google Maps Service class
export class GoogleMapsService {
  private apiKey: string;
  private mapInstance?: google.maps.Map;
  private isLoaded: boolean = false;
  private loadCallbacks: Array<() => void> = [];
  private options: GoogleMapsConfig;
  private markers: google.maps.Marker[] = [];

  /**
   * Creates a new GoogleMapsService instance
   * 
   * @param config Configuration for Google Maps API
   */
  constructor(config: GoogleMapsConfig) {
    this.apiKey = config.apiKey;
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
      (window as any)[this.options.callback] = () => {
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
  public loadApi(): Promise<void> {
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
      const existingScript = document.querySelector(`script[src*="maps.googleapis.com/maps/api/js"]`);
      if (existingScript) {
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
  public async initMap(element: HTMLElement | string, options: MapOptions): Promise<google.maps.Map> {
    if (!this.isLoaded) {
      await this.loadApi();
    }
    
    const mapElement = typeof element === 'string' 
      ? document.getElementById(element) 
      : element;
      
    if (!mapElement) {
      throw new Error(`Map element not found: ${element}`);
    }
    
    const mapOptions = {
      ...options,
      center: new google.maps.LatLng(options.center.lat, options.center.lng)
    };
    
    this.mapInstance = new google.maps.Map(mapElement, mapOptions);
    return this.mapInstance;
  }

  /**
   * Get the current map instance
   * 
   * @returns The current Google Maps instance or null if not initialized
   */
  public getMap(): google.maps.Map | undefined {
    return this.mapInstance;
  }

  /**
   * Creates a marker on the map
   * @param options Marker options including position and title
   * @returns The created marker instance
   */
  public createMarker(options: google.maps.MarkerOptions): google.maps.Marker {
    if (!this.mapInstance) {
      throw new Error('Map must be initialized before creating markers');
    }

    const marker = new google.maps.Marker({
      ...options,
      map: this.mapInstance
    });

    this.markers.push(marker);
    return marker;
  }

  /**
   * Removes a marker from the map
   * @param marker The marker to remove
   */
  public removeMarker(marker: google.maps.Marker): void {
    marker.setMap(null);
    this.markers = this.markers.filter(m => m !== marker);
  }

  /**
   * Removes all markers from the map
   */
  public clearMarkers(): void {
    this.markers.forEach(marker => marker.setMap(null));
    this.markers = [];
  }
  /**
   * Geocode an address to coordinates
   * 
   * @param address Address to geocode
   * @returns Promise resolving to geocoding results
   */
  public async geocodeAddress(address: string): Promise<GeocodingResult[]> {
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
  public async reverseGeocode(lat: number, lng: number): Promise<GeocodingResult[]> {
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
  public async addMarker(options: google.maps.MarkerOptions): Promise<google.maps.Marker> {
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
  public async getDirections(
    origin: string | google.maps.LatLng | google.maps.Place,
    destination: string | google.maps.LatLng | google.maps.Place,
    options: Partial<google.maps.DirectionsRequest> = {}
  ): Promise<google.maps.DirectionsResult> {
    await this.ensureApiLoaded();
    
    const directionsService = new google.maps.DirectionsService();
    
    const request: google.maps.DirectionsRequest = {
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
  public async displayDirections(
    directions: google.maps.DirectionsResult,
    options: Partial<google.maps.DirectionsRendererOptions> = {}
  ): Promise<google.maps.DirectionsRenderer> {
    await this.ensureApiLoaded();
    
    if (!this.mapInstance && options.map === undefined) {
      throw new Error('No map instance available. Initialize a map first or provide a map in options.');
    }
    
    const rendererOptions: google.maps.DirectionsRendererOptions = {
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
  public async createAutocomplete(
    inputElement: HTMLInputElement | string,
    options: google.maps.places.AutocompleteOptions = {}
  ): Promise<google.maps.places.Autocomplete> {
    await this.ensureApiLoaded();
    
    const element = typeof inputElement === 'string'
      ? document.getElementById(inputElement) as HTMLInputElement
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
  public async getPlaceDetails(
    placeId: string,
    fields: string[] = ['address_components', 'geometry', 'name', 'formatted_address']
  ): Promise<google.maps.places.PlaceResult> {
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
  private async ensureApiLoaded(): Promise<void> {
    if (!this.isLoaded) {
      await this.loadApi();
    }
  }
}
