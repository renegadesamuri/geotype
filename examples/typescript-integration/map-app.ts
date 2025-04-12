/**
 * TypeScript Example of Google Maps Integration
 * 
 * This example demonstrates how to use the GoogleMapsService
 * in a TypeScript application with proper typing.
 */

import { GoogleMapsService, GoogleMapsConfig, MapOptions, GeocodingResult } from '../../src/google-maps-service';

// TypeScript interfaces for our application
interface MapApplicationConfig {
  mapElementId: string;
  searchInputId: string;
  searchButtonId: string;
  apiKey: string;
  defaultLocation: {
    lat: number;
    lng: number;
  };
  defaultZoom: number;
}

class TypeScriptMapApp {
  private googleMapsService: GoogleMapsService;
  private map: google.maps.Map | null = null;
  private markers: google.maps.Marker[] = [];
  private config: MapApplicationConfig;
  
  // DOM Elements
  private mapElement: HTMLElement | null = null;
  private searchInput: HTMLInputElement | null = null;
  private searchButton: HTMLElement | null = null;
  
  constructor(config: MapApplicationConfig) {
    this.config = config;
    
    // Initialize Google Maps Service
    const mapsConfig: GoogleMapsConfig = {
      apiKey: config.apiKey,
      libraries: ['places', 'geometry'],
      language: 'en'
    };
    
    this.googleMapsService = new GoogleMapsService(mapsConfig);
  }
  
  /**
   * Initialize the application
   */
  public async initialize(): Promise<void> {
    try {
      // Get DOM elements
      this.mapElement = document.getElementById(this.config.mapElementId);
      this.searchInput = document.getElementById(this.config.searchInputId) as HTMLInputElement;
      this.searchButton = document.getElementById(this.config.searchButtonId);
      
      if (!this.mapElement) {
        throw new Error(`Map element with ID ${this.config.mapElementId} not found`);
      }
      
      if (!this.searchInput) {
        throw new Error(`Search input with ID ${this.config.searchInputId} not found`);
      }
      
      if (!this.searchButton) {
        throw new Error(`Search button with ID ${this.config.searchButtonId} not found`);
      }
      
      // Load the Google Maps API
      await this.googleMapsService.loadApi();
      
      // Initialize map
      await this.initMap();
      
      // Set up event listeners
      this.setupEventListeners();
      
      console.log('TypeScript Map Application initialized successfully');
    } catch (error) {
      console.error('Error initializing application:', error);
      throw error;
    }
  }
  
  /**
   * Initialize the Google Map
   */
  private async initMap(): Promise<void> {
    if (!this.mapElement) return;
    
    const mapOptions: MapOptions = {
      center: this.config.defaultLocation,
      zoom: this.config.defaultZoom,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: true,
      zoomControl: true,
      streetViewControl: true
    };
    
    this.map = await this.googleMapsService.initMap(this.mapElement, mapOptions);
  }
  
  /**
   * Set up event listeners for the application
   */
  private setupEventListeners(): void {
    // Search button click
    this.searchButton?.addEventListener('click', () => this.searchLocation());
    
    // Enter key in search input
    this.searchInput?.addEventListener('keypress', (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        this.searchLocation();
      }
    });
  }
  
  /**
   * Search for a location based on user input
   */
  private async searchLocation(): Promise<void> {
    if (!this.searchInput) return;
    
    const searchValue = this.searchInput.value.trim();
    if (!searchValue) {
      alert('Please enter a location to search for');
      return;
    }
    
    try {
      // Geocode the address
      const results: GeocodingResult[] = await this.googleMapsService.geocodeAddress(searchValue);
      
      if (results.length === 0) {
        alert('No results found for the provided location');
        return;
      }
      
      // Get the first result
      const location = results[0].location;
      
      // Clear existing markers
      this.clearMarkers();
      
      // Add a marker at the found location
      const marker = await this.googleMapsService.addMarker({
        position: location,
        map: this.map,
        title: results[0].formattedAddress || searchValue,
        animation: google.maps.Animation.DROP
      });
      
      // Add the marker to our collection
      this.markers.push(marker);
      
      // Center the map on the location
      if (this.map) {
        this.map.setCenter(location);
        this.map.setZoom(15);
      }
      
      console.log('Location found:', results[0]);
    } catch (error) {
      console.error('Error searching for location:', error);
      alert(`Error searching for location: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  /**
   * Clear all markers from the map
   */
  private clearMarkers(): void {
    this.markers.forEach(marker => {
      marker.setMap(null);
    });
    this.markers = [];
  }
}

// Usage example (would be used in actual application code)
/*
document.addEventListener('DOMContentLoaded', async () => {
  const app = new TypeScriptMapApp({
    mapElementId: 'map',
    searchInputId: 'search-input',
    searchButtonId: 'search-button',
    apiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
    defaultLocation: { lat: 40.7128, lng: -74.0060 }, // New York
    defaultZoom: 12
  });
  
  try {
    await app.initialize();
  } catch (error) {
    console.error('Failed to initialize application:', error);
  }
});
*/

export default TypeScriptMapApp;
