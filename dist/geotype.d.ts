/**
 * Google Maps Service for JavaScript/TypeScript applications
 *
 * A flexible, reusable integration for Google Maps API that can be easily
 * incorporated into any JavaScript/TypeScript project.
 */
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
    center: {
        lat: number;
        lng: number;
    };
    zoom: number;
    mapTypeId?: string;
    styles?: any[];
    disableDefaultUI?: boolean;
    [key: string]: any;
}
export declare class GoogleMapsService {
    private apiKey;
    private mapInstance?;
    private isLoaded;
    private loadCallbacks;
    private options;
    private markers;
    /**
     * Creates a new GoogleMapsService instance
     *
     * @param config Configuration for Google Maps API
     */
    constructor(config: GoogleMapsConfig);
    /**
     * Load the Google Maps API script
     *
     * @returns Promise that resolves when the API is loaded
     */
    loadApi(): Promise<void>;
    /**
     * Initialize a map on a specified HTML element
     *
     * @param element HTML element or ID of element to render map on
     * @param options Map initialization options
     * @returns The map instance
     */
    initMap(element: HTMLElement | string, options: MapOptions): Promise<google.maps.Map>;
    /**
     * Get the current map instance
     *
     * @returns The current Google Maps instance or null if not initialized
     */
    getMap(): google.maps.Map | undefined;
    /**
     * Creates a marker on the map
     * @param options Marker options including position and title
     * @returns The created marker instance
     */
    createMarker(options: google.maps.MarkerOptions): google.maps.Marker;
    /**
     * Removes a marker from the map
     * @param marker The marker to remove
     */
    removeMarker(marker: google.maps.Marker): void;
    /**
     * Removes all markers from the map
     */
    clearMarkers(): void;
    /**
     * Geocode an address to coordinates
     *
     * @param address Address to geocode
     * @returns Promise resolving to geocoding results
     */
    geocodeAddress(address: string): Promise<GeocodingResult[]>;
    /**
     * Reverse geocode coordinates to an address
     *
     * @param lat Latitude
     * @param lng Longitude
     * @returns Promise resolving to geocoding results
     */
    reverseGeocode(lat: number, lng: number): Promise<GeocodingResult[]>;
    /**
     * Add a marker to the map
     *
     * @param options Marker options
     * @returns The created marker
     */
    addMarker(options: google.maps.MarkerOptions): Promise<google.maps.Marker>;
    /**
     * Calculate route between two points
     *
     * @param origin Starting point
     * @param destination Ending point
     * @param options Directions request options
     * @returns Promise resolving to directions result
     */
    getDirections(origin: string | google.maps.LatLng | google.maps.Place, destination: string | google.maps.LatLng | google.maps.Place, options?: Partial<google.maps.DirectionsRequest>): Promise<google.maps.DirectionsResult>;
    /**
     * Display a route on the map
     *
     * @param directions Directions result
     * @param options Renderer options
     * @returns The directions renderer
     */
    displayDirections(directions: google.maps.DirectionsResult, options?: Partial<google.maps.DirectionsRendererOptions>): Promise<google.maps.DirectionsRenderer>;
    /**
     * Create an autocomplete instance for address input
     *
     * @param inputElement Input element or ID
     * @param options Autocomplete options
     * @returns The autocomplete instance
     */
    createAutocomplete(inputElement: HTMLInputElement | string, options?: google.maps.places.AutocompleteOptions): Promise<google.maps.places.Autocomplete>;
    /**
     * Get details about a place
     *
     * @param placeId The ID of the place
     * @param fields Fields to retrieve
     * @returns Promise resolving to place details
     */
    getPlaceDetails(placeId: string, fields?: string[]): Promise<google.maps.places.PlaceResult>;
    private ensureApiLoaded;
}
//# sourceMappingURL=geotype.d.ts.map