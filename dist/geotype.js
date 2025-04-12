"use strict";
/**
 * Google Maps Service for JavaScript/TypeScript applications
 *
 * A flexible, reusable integration for Google Maps API that can be easily
 * incorporated into any JavaScript/TypeScript project.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleMapsService = void 0;
// Main Google Maps Service class
class GoogleMapsService {
    /**
     * Creates a new GoogleMapsService instance
     *
     * @param config Configuration for Google Maps API
     */
    constructor(config) {
        this.isLoaded = false;
        this.loadCallbacks = [];
        this.markers = [];
        this.apiKey = config.apiKey;
        this.options = Object.assign({ version: config.version || 'weekly', libraries: config.libraries || ['places'], language: config.language || 'en', region: config.region, callback: config.callback || 'initMap' }, config);
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
            var _a;
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
            const libraries = (_a = this.options.libraries) === null || _a === void 0 ? void 0 : _a.join(',');
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
    initMap(element, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isLoaded) {
                yield this.loadApi();
            }
            const mapElement = typeof element === 'string'
                ? document.getElementById(element)
                : element;
            if (!mapElement) {
                throw new Error(`Map element not found: ${element}`);
            }
            const mapOptions = Object.assign(Object.assign({}, options), { center: new google.maps.LatLng(options.center.lat, options.center.lng) });
            this.mapInstance = new google.maps.Map(mapElement, mapOptions);
            return this.mapInstance;
        });
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
     * Creates a marker on the map
     * @param options Marker options including position and title
     * @returns The created marker instance
     */
    createMarker(options) {
        if (!this.mapInstance) {
            throw new Error('Map must be initialized before creating markers');
        }
        const marker = new google.maps.Marker(Object.assign(Object.assign({}, options), { map: this.mapInstance }));
        this.markers.push(marker);
        return marker;
    }
    /**
     * Removes a marker from the map
     * @param marker The marker to remove
     */
    removeMarker(marker) {
        marker.setMap(null);
        this.markers = this.markers.filter(m => m !== marker);
    }
    /**
     * Removes all markers from the map
     */
    clearMarkers() {
        this.markers.forEach(marker => marker.setMap(null));
        this.markers = [];
    }
    /**
     * Geocode an address to coordinates
     *
     * @param address Address to geocode
     * @returns Promise resolving to geocoding results
     */
    geocodeAddress(address) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureApiLoaded();
            return new Promise((resolve, reject) => {
                const geocoder = new google.maps.Geocoder();
                geocoder.geocode({ address }, (results, status) => {
                    if (status === google.maps.GeocoderStatus.OK && results && results.length > 0) {
                        const mappedResults = results.map(result => {
                            var _a;
                            return ({
                                address,
                                location: {
                                    lat: result.geometry.location.lat(),
                                    lng: result.geometry.location.lng()
                                },
                                placeId: result.place_id,
                                formattedAddress: result.formatted_address,
                                addressComponents: (_a = result.address_components) === null || _a === void 0 ? void 0 : _a.map(component => ({
                                    longName: component.long_name,
                                    shortName: component.short_name,
                                    types: component.types
                                }))
                            });
                        });
                        resolve(mappedResults);
                    }
                    else {
                        reject(new Error(`Geocoding failed: ${status}`));
                    }
                });
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
    reverseGeocode(lat, lng) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureApiLoaded();
            return new Promise((resolve, reject) => {
                const geocoder = new google.maps.Geocoder();
                const latlng = { lat, lng };
                geocoder.geocode({ location: latlng }, (results, status) => {
                    if (status === google.maps.GeocoderStatus.OK && results && results.length > 0) {
                        const mappedResults = results.map(result => {
                            var _a;
                            return ({
                                address: result.formatted_address,
                                location: {
                                    lat,
                                    lng
                                },
                                placeId: result.place_id,
                                formattedAddress: result.formatted_address,
                                addressComponents: (_a = result.address_components) === null || _a === void 0 ? void 0 : _a.map(component => ({
                                    longName: component.long_name,
                                    shortName: component.short_name,
                                    types: component.types
                                }))
                            });
                        });
                        resolve(mappedResults);
                    }
                    else {
                        reject(new Error(`Reverse geocoding failed: ${status}`));
                    }
                });
            });
        });
    }
    /**
     * Add a marker to the map
     *
     * @param options Marker options
     * @returns The created marker
     */
    addMarker(options) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureApiLoaded();
            if (!this.mapInstance && options.map === undefined) {
                throw new Error('No map instance available. Initialize a map first or provide a map in options.');
            }
            const markerOptions = Object.assign(Object.assign({}, options), { map: options.map || this.mapInstance });
            return new google.maps.Marker(markerOptions);
        });
    }
    /**
     * Calculate route between two points
     *
     * @param origin Starting point
     * @param destination Ending point
     * @param options Directions request options
     * @returns Promise resolving to directions result
     */
    getDirections(origin_1, destination_1) {
        return __awaiter(this, arguments, void 0, function* (origin, destination, options = {}) {
            yield this.ensureApiLoaded();
            const directionsService = new google.maps.DirectionsService();
            const request = Object.assign({ origin,
                destination, travelMode: google.maps.TravelMode.DRIVING }, options);
            return new Promise((resolve, reject) => {
                directionsService.route(request, (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK) {
                        resolve(result);
                    }
                    else {
                        reject(new Error(`Directions request failed: ${status}`));
                    }
                });
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
    displayDirections(directions_1) {
        return __awaiter(this, arguments, void 0, function* (directions, options = {}) {
            yield this.ensureApiLoaded();
            if (!this.mapInstance && options.map === undefined) {
                throw new Error('No map instance available. Initialize a map first or provide a map in options.');
            }
            const rendererOptions = Object.assign({ map: options.map || this.mapInstance }, options);
            const directionsRenderer = new google.maps.DirectionsRenderer(rendererOptions);
            directionsRenderer.setDirections(directions);
            return directionsRenderer;
        });
    }
    /**
     * Create an autocomplete instance for address input
     *
     * @param inputElement Input element or ID
     * @param options Autocomplete options
     * @returns The autocomplete instance
     */
    createAutocomplete(inputElement_1) {
        return __awaiter(this, arguments, void 0, function* (inputElement, options = {}) {
            yield this.ensureApiLoaded();
            const element = typeof inputElement === 'string'
                ? document.getElementById(inputElement)
                : inputElement;
            if (!element) {
                throw new Error(`Input element not found: ${inputElement}`);
            }
            return new google.maps.places.Autocomplete(element, options);
        });
    }
    /**
     * Get details about a place
     *
     * @param placeId The ID of the place
     * @param fields Fields to retrieve
     * @returns Promise resolving to place details
     */
    getPlaceDetails(placeId_1) {
        return __awaiter(this, arguments, void 0, function* (placeId, fields = ['address_components', 'geometry', 'name', 'formatted_address']) {
            yield this.ensureApiLoaded();
            const placesService = new google.maps.places.PlacesService(this.mapInstance || document.createElement('div'));
            return new Promise((resolve, reject) => {
                placesService.getDetails({ placeId, fields }, (result, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK && result) {
                        resolve(result);
                    }
                    else {
                        reject(new Error(`Place details request failed: ${status}`));
                    }
                });
            });
        });
    }
    // Helper to ensure API is loaded before operations
    ensureApiLoaded() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isLoaded) {
                yield this.loadApi();
            }
        });
    }
}
exports.GoogleMapsService = GoogleMapsService;
//# sourceMappingURL=geotype.js.map