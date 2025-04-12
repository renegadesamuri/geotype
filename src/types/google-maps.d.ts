/**
 * Type declarations for Google Maps JavaScript API
 * 
 * This provides TypeScript type definitions for the Google Maps API
 * when the @types/google.maps package is not installed.
 */

declare namespace google {
  namespace maps {
    class Map {
      constructor(mapDiv: Element | null, opts?: MapOptions);
      panTo(latLng: LatLng | LatLngLiteral): void;
      setZoom(zoom: number): void;
      getCenter(): LatLng;
      setCenter(latlng: LatLng | LatLngLiteral): void;
      getBounds(): LatLngBounds | null | undefined;
      getZoom(): number | undefined;
      setOptions(options: MapOptions): void;
      panBy(x: number, y: number): void;
      fitBounds(bounds: LatLngBounds | LatLngBoundsLiteral, padding?: number | Padding): void;
      addListener(eventName: string, handler: (...args: any[]) => void): MapsEventListener;
    }

    interface MapOptions {
      center?: LatLng | LatLngLiteral;
      clickableIcons?: boolean;
      controlSize?: number;
      disableDefaultUI?: boolean;
      disableDoubleClickZoom?: boolean;
      draggable?: boolean;
      draggableCursor?: string;
      draggingCursor?: string;
      fullscreenControl?: boolean;
      fullscreenControlOptions?: FullscreenControlOptions;
      gestureHandling?: 'cooperative' | 'greedy' | 'none' | 'auto';
      heading?: number;
      keyboardShortcuts?: boolean;
      mapId?: string;
      mapTypeControl?: boolean;
      mapTypeControlOptions?: MapTypeControlOptions;
      mapTypeId?: string | MapTypeId;
      maxZoom?: number;
      minZoom?: number;
      noClear?: boolean;
      panControl?: boolean;
      panControlOptions?: PanControlOptions;
      restriction?: MapRestriction;
      rotateControl?: boolean;
      rotateControlOptions?: RotateControlOptions;
      scaleControl?: boolean;
      scaleControlOptions?: ScaleControlOptions;
      scrollwheel?: boolean;
      streetView?: StreetViewPanorama;
      streetViewControl?: boolean;
      streetViewControlOptions?: StreetViewControlOptions;
      styles?: MapTypeStyle[];
      tilt?: number;
      zoom?: number;
      zoomControl?: boolean;
      zoomControlOptions?: ZoomControlOptions;
    }

    interface MapTypeStyle {
      elementType?: string;
      featureType?: string;
      stylers: MapTypeStyler[];
    }

    interface MapTypeStyler {
      [k: string]: string | number | boolean;
    }

    enum MapTypeId {
      HYBRID = 'hybrid',
      ROADMAP = 'roadmap',
      SATELLITE = 'satellite',
      TERRAIN = 'terrain'
    }

    interface FullscreenControlOptions {
      position?: ControlPosition;
    }

    interface MapTypeControlOptions {
      mapTypeIds?: (string | MapTypeId)[];
      position?: ControlPosition;
      style?: MapTypeControlStyle;
    }

    enum MapTypeControlStyle {
      DEFAULT = 0,
      DROPDOWN_MENU = 2,
      HORIZONTAL_BAR = 1,
    }

    interface PanControlOptions {
      position?: ControlPosition;
    }

    interface MapRestriction {
      latLngBounds: LatLngBounds | LatLngBoundsLiteral;
      strictBounds?: boolean;
    }

    interface RotateControlOptions {
      position?: ControlPosition;
    }

    interface ScaleControlOptions {
      style?: ScaleControlStyle;
    }

    enum ScaleControlStyle {
      DEFAULT = 0,
    }

    interface StreetViewControlOptions {
      position?: ControlPosition;
    }

    interface ZoomControlOptions {
      position?: ControlPosition;
    }

    enum ControlPosition {
      BOTTOM_CENTER = 11,
      BOTTOM_LEFT = 10,
      BOTTOM_RIGHT = 12,
      LEFT_BOTTOM = 6,
      LEFT_CENTER = 4,
      LEFT_TOP = 5,
      RIGHT_BOTTOM = 9,
      RIGHT_CENTER = 8,
      RIGHT_TOP = 7,
      TOP_CENTER = 2,
      TOP_LEFT = 1,
      TOP_RIGHT = 3,
    }

    interface Padding {
      bottom: number;
      left: number;
      right: number;
      top: number;
    }

    class LatLng {
      constructor(lat: number, lng: number, noWrap?: boolean);
      lat(): number;
      lng(): number;
      toJSON(): LatLngLiteral;
      toString(): string;
      toUrlValue(precision?: number): string;
      equals(other: LatLng): boolean;
    }

    interface LatLngLiteral {
      lat: number;
      lng: number;
    }

    class LatLngBounds {
      constructor(sw?: LatLng | LatLngLiteral, ne?: LatLng | LatLngLiteral);
      contains(latLng: LatLng | LatLngLiteral): boolean;
      equals(other: LatLngBounds | LatLngBoundsLiteral): boolean;
      extend(point: LatLng | LatLngLiteral): LatLngBounds;
      getCenter(): LatLng;
      getNorthEast(): LatLng;
      getSouthWest(): LatLng;
      intersects(other: LatLngBounds | LatLngBoundsLiteral): boolean;
      isEmpty(): boolean;
      toJSON(): LatLngBoundsLiteral;
      toSpan(): LatLng;
      toString(): string;
      toUrlValue(precision?: number): string;
      union(other: LatLngBounds | LatLngBoundsLiteral): LatLngBounds;
    }

    interface LatLngBoundsLiteral {
      east: number;
      north: number;
      south: number;
      west: number;
    }

    class Marker {
      constructor(opts?: MarkerOptions);
      getAnimation(): Animation;
      getClickable(): boolean;
      getCursor(): string | null;
      getDraggable(): boolean | null;
      getIcon(): string | Icon | Symbol | null;
      getLabel(): MarkerLabel | null;
      getMap(): Map | StreetViewPanorama | null;
      getOpacity(): number | null;
      getPosition(): LatLng | null;
      getShape(): MarkerShape | null;
      getTitle(): string | null;
      getVisible(): boolean;
      getZIndex(): number | null;
      setAnimation(animation: Animation | null): void;
      setClickable(flag: boolean): void;
      setCursor(cursor: string | null): void;
      setDraggable(flag: boolean | null): void;
      setIcon(icon: string | Icon | Symbol | null): void;
      setLabel(label: string | MarkerLabel | null): void;
      setMap(map: Map | StreetViewPanorama | null): void;
      setOpacity(opacity: number | null): void;
      setOptions(options: MarkerOptions): void;
      setPosition(latlng: LatLng | LatLngLiteral | null): void;
      setShape(shape: MarkerShape | null): void;
      setTitle(title: string | null): void;
      setVisible(visible: boolean): void;
      setZIndex(zIndex: number | null): void;
      addListener(eventName: string, handler: (...args: any[]) => void): MapsEventListener;
    }

    enum Animation {
      BOUNCE = 1,
      DROP = 2,
    }

    interface MarkerOptions {
      anchorPoint?: Point;
      animation?: Animation;
      clickable?: boolean;
      crossOnDrag?: boolean;
      cursor?: string;
      draggable?: boolean;
      icon?: string | Icon | Symbol;
      label?: string | MarkerLabel;
      map?: Map | StreetViewPanorama;
      opacity?: number;
      optimized?: boolean;
      position: LatLng | LatLngLiteral;
      shape?: MarkerShape;
      title?: string;
      visible?: boolean;
      zIndex?: number;
    }

    interface Icon {
      anchor?: Point;
      labelOrigin?: Point;
      origin?: Point;
      scaledSize?: Size;
      size?: Size;
      url: string;
    }

    interface MarkerLabel {
      color?: string;
      fontFamily?: string;
      fontSize?: string;
      fontWeight?: string;
      text: string;
    }

    interface MarkerShape {
      coords: number[];
      type: string;
    }

    class Point {
      constructor(x: number, y: number);
      x: number;
      y: number;
      equals(other: Point): boolean;
      toString(): string;
    }

    class Size {
      constructor(width: number, height: number, widthUnit?: string, heightUnit?: string);
      height: number;
      width: number;
      equals(other: Size): boolean;
      toString(): string;
    }

    class Symbol {
      constructor(path: SymbolPath | string, options?: SymbolOptions);
    }

    interface SymbolOptions {
      anchor?: Point;
      fillColor?: string;
      fillOpacity?: number;
      labelOrigin?: Point;
      path?: SymbolPath | string;
      rotation?: number;
      scale?: number;
      strokeColor?: string;
      strokeOpacity?: number;
      strokeWeight?: number;
    }

    enum SymbolPath {
      BACKWARD_CLOSED_ARROW = 3,
      BACKWARD_OPEN_ARROW = 4,
      CIRCLE = 0,
      FORWARD_CLOSED_ARROW = 1,
      FORWARD_OPEN_ARROW = 2,
    }

    class MVCObject {
      addListener(eventName: string, handler: (...args: any[]) => void): MapsEventListener;
      bindTo(key: string, target: MVCObject, targetKey?: string, noNotify?: boolean): void;
      get(key: string): any;
      notify(key: string): void;
      set(key: string, value: any): void;
      setValues(values: { [key: string]: any }): void;
      unbind(key: string): void;
      unbindAll(): void;
    }

    class MapsEventListener {
      remove(): void;
    }

    class event {
      static addDomListener(element: object, eventName: string, handler: Function, capture?: boolean): MapsEventListener;
      static addDomListenerOnce(element: object, eventName: string, handler: Function, capture?: boolean): MapsEventListener;
      static addListener(instance: object, eventName: string, handler: Function): MapsEventListener;
      static addListenerOnce(instance: object, eventName: string, handler: Function): MapsEventListener;
      static clearInstanceListeners(instance: object): void;
      static clearListeners(instance: object, eventName: string): void;
      static hasListeners(instance: object, eventName: string): boolean;
      static removeListener(listener: MapsEventListener): void;
      static trigger(instance: any, eventName: string, ...args: any[]): void;
    }

    class Geocoder {
      constructor();
      geocode(request: GeocoderRequest, callback: (results: GeocoderResult[], status: GeocoderStatus) => void): void;
    }

    interface GeocoderRequest {
      address?: string;
      bounds?: LatLngBounds | LatLngBoundsLiteral;
      componentRestrictions?: GeocoderComponentRestrictions;
      location?: LatLng | LatLngLiteral;
      placeId?: string;
      region?: string;
    }

    interface GeocoderComponentRestrictions {
      administrativeArea?: string;
      country?: string | string[];
      locality?: string;
      postalCode?: string;
      route?: string;
    }

    interface GeocoderResult {
      address_components: GeocoderAddressComponent[];
      formatted_address: string;
      geometry: GeocoderGeometry;
      partial_match: boolean;
      place_id: string;
      plus_code?: GeocoderPlusCode;
      postcode_localities?: string[];
      types: string[];
    }

    interface GeocoderAddressComponent {
      long_name: string;
      short_name: string;
      types: string[];
    }

    interface GeocoderGeometry {
      bounds?: LatLngBounds;
      location: LatLng;
      location_type: GeocoderLocationType;
      viewport: LatLngBounds;
    }

    interface GeocoderPlusCode {
      compound_code: string;
      global_code: string;
    }

    enum GeocoderLocationType {
      APPROXIMATE = 'APPROXIMATE',
      GEOMETRIC_CENTER = 'GEOMETRIC_CENTER',
      RANGE_INTERPOLATED = 'RANGE_INTERPOLATED',
      ROOFTOP = 'ROOFTOP',
    }

    enum GeocoderStatus {
      ERROR = 'ERROR',
      INVALID_REQUEST = 'INVALID_REQUEST',
      OK = 'OK',
      OVER_QUERY_LIMIT = 'OVER_QUERY_LIMIT',
      REQUEST_DENIED = 'REQUEST_DENIED',
      UNKNOWN_ERROR = 'UNKNOWN_ERROR',
      ZERO_RESULTS = 'ZERO_RESULTS',
    }

    class DirectionsService {
      constructor();
      route(request: DirectionsRequest, callback: (result: DirectionsResult, status: DirectionsStatus) => void): void;
    }

    interface DirectionsRequest {
      avoidFerries?: boolean;
      avoidHighways?: boolean;
      avoidTolls?: boolean;
      destination: string | LatLng | LatLngLiteral | Place;
      drivingOptions?: DrivingOptions;
      optimizeWaypoints?: boolean;
      origin: string | LatLng | LatLngLiteral | Place;
      provideRouteAlternatives?: boolean;
      region?: string;
      transitOptions?: TransitOptions;
      travelMode: TravelMode;
      unitSystem?: UnitSystem;
      waypoints?: DirectionsWaypoint[];
    }

    interface Place {
      location: LatLng | LatLngLiteral;
      placeId: string;
      query: string;
    }

    interface DrivingOptions {
      departureTime: Date;
      trafficModel?: TrafficModel;
    }

    enum TrafficModel {
      BEST_GUESS = 'bestguess',
      OPTIMISTIC = 'optimistic',
      PESSIMISTIC = 'pessimistic',
    }

    interface TransitOptions {
      arrivalTime?: Date;
      departureTime?: Date;
      modes?: TransitMode[];
      routingPreference?: TransitRoutePreference;
    }

    enum TransitMode {
      BUS = 'BUS',
      RAIL = 'RAIL',
      SUBWAY = 'SUBWAY',
      TRAIN = 'TRAIN',
      TRAM = 'TRAM',
    }

    enum TransitRoutePreference {
      FEWER_TRANSFERS = 'FEWER_TRANSFERS',
      LESS_WALKING = 'LESS_WALKING',
    }

    enum TravelMode {
      BICYCLING = 'BICYCLING',
      DRIVING = 'DRIVING',
      TRANSIT = 'TRANSIT',
      WALKING = 'WALKING',
    }

    enum UnitSystem {
      IMPERIAL = 0,
      METRIC = 1,
    }

    interface DirectionsWaypoint {
      location: LatLng | LatLngLiteral | string;
      stopover?: boolean;
    }

    interface DirectionsResult {
      geocoded_waypoints: DirectionsGeocodedWaypoint[];
      routes: DirectionsRoute[];
    }

    interface DirectionsGeocodedWaypoint {
      geocoder_status: GeocoderStatus;
      partial_match: boolean;
      place_id: string;
      types: string[];
    }

    interface DirectionsRoute {
      bounds: LatLngBounds;
      copyrights: string;
      fare?: TransitFare;
      legs: DirectionsLeg[];
      overview_path: LatLng[];
      overview_polyline: string;
      warnings: string[];
      waypoint_order: number[];
    }

    interface TransitFare {
      currency: string;
      text: string;
      value: number;
    }

    interface DirectionsLeg {
      arrival_time: Time;
      departure_time: Time;
      distance: Distance;
      duration: Duration;
      duration_in_traffic: Duration;
      end_address: string;
      end_location: LatLng;
      start_address: string;
      start_location: LatLng;
      steps: DirectionsStep[];
      via_waypoints: LatLng[];
    }

    interface Time {
      text: string;
      time_zone: string;
      value: Date;
    }

    interface Distance {
      text: string;
      value: number;
    }

    interface Duration {
      text: string;
      value: number;
    }

    interface DirectionsStep {
      distance: Distance;
      duration: Duration;
      end_location: LatLng;
      instructions: string;
      path: LatLng[];
      start_location: LatLng;
      steps: DirectionsStep[];
      transit: TransitDetails;
      travel_mode: TravelMode;
    }

    interface TransitDetails {
      arrival_stop: TransitStop;
      arrival_time: Time;
      departure_stop: TransitStop;
      departure_time: Time;
      headsign: string;
      headway: number;
      line: TransitLine;
      num_stops: number;
    }

    interface TransitStop {
      location: LatLng;
      name: string;
    }

    interface TransitLine {
      agencies: TransitAgency[];
      color: string;
      icon: string;
      name: string;
      short_name: string;
      text_color: string;
      url: string;
      vehicle: TransitVehicle;
    }

    interface TransitAgency {
      name: string;
      phone: string;
      url: string;
    }

    interface TransitVehicle {
      icon: string;
      local_icon: string;
      name: string;
      type: VehicleType;
    }

    enum VehicleType {
      BUS = 'BUS',
      CABLE_CAR = 'CABLE_CAR',
      COMMUTER_TRAIN = 'COMMUTER_TRAIN',
      FERRY = 'FERRY',
      FUNICULAR = 'FUNICULAR',
      GONDOLA_LIFT = 'GONDOLA_LIFT',
      HEAVY_RAIL = 'HEAVY_RAIL',
      HIGH_SPEED_TRAIN = 'HIGH_SPEED_TRAIN',
      INTERCITY_BUS = 'INTERCITY_BUS',
      METRO_RAIL = 'METRO_RAIL',
      MONORAIL = 'MONORAIL',
      OTHER = 'OTHER',
      RAIL = 'RAIL',
      SHARE_TAXI = 'SHARE_TAXI',
      SUBWAY = 'SUBWAY',
      TRAM = 'TRAM',
      TROLLEYBUS = 'TROLLEYBUS',
    }

    enum DirectionsStatus {
      INVALID_REQUEST = 'INVALID_REQUEST',
      MAX_WAYPOINTS_EXCEEDED = 'MAX_WAYPOINTS_EXCEEDED',
      NOT_FOUND = 'NOT_FOUND',
      OK = 'OK',
      OVER_QUERY_LIMIT = 'OVER_QUERY_LIMIT',
      REQUEST_DENIED = 'REQUEST_DENIED',
      UNKNOWN_ERROR = 'UNKNOWN_ERROR',
      ZERO_RESULTS = 'ZERO_RESULTS',
    }

    class DirectionsRenderer extends MVCObject {
      constructor(opts?: DirectionsRendererOptions);
      getDirections(): DirectionsResult;
      getMap(): Map;
      getPanel(): Element;
      getRouteIndex(): number;
      setDirections(directions: DirectionsResult): void;
      setMap(map: Map | null): void;
      setOptions(options: DirectionsRendererOptions): void;
      setPanel(panel: Element | null): void;
      setRouteIndex(routeIndex: number): void;
    }

    interface DirectionsRendererOptions {
      directions?: DirectionsResult;
      draggable?: boolean;
      hideRouteList?: boolean;
      infoWindow?: InfoWindow;
      map?: Map;
      markerOptions?: MarkerOptions;
      panel?: Element;
      polylineOptions?: PolylineOptions;
      preserveViewport?: boolean;
      routeIndex?: number;
      suppressBicyclingLayer?: boolean;
      suppressInfoWindows?: boolean;
      suppressMarkers?: boolean;
      suppressPolylines?: boolean;
    }

    class InfoWindow extends MVCObject {
      constructor(opts?: InfoWindowOptions);
      close(): void;
      getContent(): string | Element;
      getPosition(): LatLng;
      getZIndex(): number;
      open(options?: InfoWindowOpenOptions): void;
      setContent(content: string | Element | null): void;
      setOptions(options: InfoWindowOptions): void;
      setPosition(position: LatLng | LatLngLiteral | null): void;
      setZIndex(zIndex: number): void;
    }

    interface InfoWindowOptions {
      ariaLabel?: string;
      content?: string | Element;
      disableAutoPan?: boolean;
      maxWidth?: number;
      minWidth?: number;
      pixelOffset?: Size;
      position?: LatLng | LatLngLiteral;
      zIndex?: number;
    }

    interface InfoWindowOpenOptions {
      anchor?: MVCObject;
      map?: Map | StreetViewPanorama;
      shouldFocus?: boolean;
    }

    interface PolylineOptions {
      clickable?: boolean;
      draggable?: boolean;
      editable?: boolean;
      geodesic?: boolean;
      icons?: IconSequence[];
      map?: Map;
      path?: LatLng[] | LatLngLiteral[];
      strokeColor?: string;
      strokeOpacity?: number;
      strokeWeight?: number;
      visible?: boolean;
      zIndex?: number;
    }

    interface IconSequence {
      fixedRotation?: boolean;
      icon?: Symbol;
      offset?: string;
      repeat?: string;
    }

    class StreetViewPanorama extends MVCObject {
      constructor(container: Element, opts?: StreetViewPanoramaOptions);
    }

    interface StreetViewPanoramaOptions {
      addressControl?: boolean;
      addressControlOptions?: StreetViewAddressControlOptions;
      clickToGo?: boolean;
      disableDefaultUI?: boolean;
      disableDoubleClickZoom?: boolean;
      enableCloseButton?: boolean;
      fullscreenControl?: boolean;
      fullscreenControlOptions?: FullscreenControlOptions;
      imageDateControl?: boolean;
      linksControl?: boolean;
      motionTracking?: boolean;
      motionTrackingControl?: boolean;
      motionTrackingControlOptions?: MotionTrackingControlOptions;
      panControl?: boolean;
      panControlOptions?: PanControlOptions;
      pano?: string;
      position?: LatLng | LatLngLiteral;
      pov?: StreetViewPov;
      scrollwheel?: boolean;
      showRoadLabels?: boolean;
      visible?: boolean;
      zoom?: number;
      zoomControl?: boolean;
      zoomControlOptions?: ZoomControlOptions;
    }

    interface StreetViewAddressControlOptions {
      position?: ControlPosition;
    }

    interface MotionTrackingControlOptions {
      position?: ControlPosition;
    }

    interface StreetViewPov {
      heading: number;
      pitch: number;
    }

    namespace places {
      class Autocomplete extends MVCObject {
        constructor(inputField: HTMLInputElement, opts?: AutocompleteOptions);
        getBounds(): LatLngBounds | undefined;
        getPlace(): PlaceResult;
        setBounds(bounds: LatLngBounds | LatLngBoundsLiteral | null): void;
        setComponentRestrictions(restrictions: ComponentRestrictions | null): void;
        setOptions(options: AutocompleteOptions): void;
        setTypes(types: string[] | null): void;
      }

      interface AutocompleteOptions {
        bounds?: LatLngBounds | LatLngBoundsLiteral;
        componentRestrictions?: ComponentRestrictions;
        fields?: string[];
        placeIdOnly?: boolean;
        strictBounds?: boolean;
        types?: string[];
      }

      interface ComponentRestrictions {
        country: string | string[];
      }

      interface PlaceResult {
        address_components?: GeocoderAddressComponent[];
        adr_address?: string;
        aspects?: PlaceAspectRating[];
        business_status?: string;
        formatted_address?: string;
        formatted_phone_number?: string;
        geometry?: PlaceGeometry;
        html_attributions?: string[];
        icon?: string;
        international_phone_number?: string;
        name?: string;
        opening_hours?: OpeningHours;
        photos?: PlacePhoto[];
        place_id?: string;
        plus_code?: PlusCode;
        price_level?: number;
        rating?: number;
        reviews?: PlaceReview[];
        types?: string[];
        url?: string;
        user_ratings_total?: number;
        utc_offset?: number;
        vicinity?: string;
        website?: string;
      }

      interface PlaceAspectRating {
        rating: number;
        type: string;
      }

      interface PlaceGeometry {
        location?: LatLng;
        viewport?: LatLngBounds;
      }

      interface OpeningHours {
        isOpen(date?: Date): boolean;
        periods: OpeningPeriod[];
        weekday_text: string[];
      }

      interface OpeningPeriod {
        close: OpeningHoursTime;
        open: OpeningHoursTime;
      }

      interface OpeningHoursTime {
        day: number;
        hours: number;
        minutes: number;
        nextDate: Date;
        time: string;
      }

      interface PlacePhoto {
        getUrl(opts: PhotoOptions): string;
        height: number;
        html_attributions: string[];
        width: number;
      }

      interface PhotoOptions {
        maxHeight?: number;
        maxWidth?: number;
      }

      interface PlusCode {
        compound_code: string;
        global_code: string;
      }

      interface PlaceReview {
        author_name: string;
        author_url: string;
        language: string;
        profile_photo_url: string;
        rating: number;
        relative_time_description: string;
        text: string;
        time: number;
      }

      class PlacesService {
        constructor(attrContainer: HTMLDivElement | Map);
        findPlaceFromPhoneNumber(request: FindPlaceFromPhoneNumberRequest, callback: (results: PlaceResult[], status: PlacesServiceStatus) => void): void;
        findPlaceFromQuery(request: FindPlaceFromQueryRequest, callback: (results: PlaceResult[], status: PlacesServiceStatus) => void): void;
        getDetails(request: PlaceDetailsRequest, callback: (result: PlaceResult, status: PlacesServiceStatus) => void): void;
        nearbySearch(request: PlaceSearchRequest, callback: (results: PlaceResult[], status: PlacesServiceStatus, pagination: PlaceSearchPagination) => void): void;
        textSearch(request: TextSearchRequest, callback: (results: PlaceResult[], status: PlacesServiceStatus, pagination: PlaceSearchPagination) => void): void;
      }

      interface FindPlaceFromPhoneNumberRequest {
        fields: string[];
        locationBias?: LocationBias;
        phoneNumber: string;
      }

      interface FindPlaceFromQueryRequest {
        fields: string[];
        locationBias?: LocationBias;
        query: string;
      }

      type LocationBias = LatLng | LatLngLiteral | LatLngBounds | LatLngBoundsLiteral | Circle | CircleLiteral | string;

      interface PlaceDetailsRequest {
        fields?: string[];
        placeId: string;
        sessionToken?: AutocompleteSessionToken;
      }

      interface PlaceSearchRequest {
        bounds?: LatLngBounds | LatLngBoundsLiteral;
        keyword?: string;
        location?: LatLng | LatLngLiteral;
        maxPriceLevel?: number;
        minPriceLevel?: number;
        name?: string;
        openNow?: boolean;
        radius?: number;
        rankBy?: RankBy;
        type?: string;
      }

      enum RankBy {
        DISTANCE = 1,
        PROMINENCE = 0,
      }

      interface TextSearchRequest {
        bounds?: LatLngBounds | LatLngBoundsLiteral;
        location?: LatLng | LatLngLiteral;
        query: string;
        radius?: number;
        type?: string;
      }

      interface PlaceSearchPagination {
        hasNextPage: boolean;
        nextPage(): void;
      }

      interface Circle extends MVCObject {
        getBounds(): LatLngBounds;
        getCenter(): LatLng;
        getDraggable(): boolean;
        getEditable(): boolean;
        getMap(): Map;
        getRadius(): number;
        getVisible(): boolean;
        setCenter(center: LatLng | LatLngLiteral): void;
        setDraggable(draggable: boolean): void;
        setEditable(editable: boolean): void;
        setMap(map: Map | null): void;
        setOptions(options: CircleOptions): void;
        setRadius(radius: number): void;
        setVisible(visible: boolean): void;
      }

      interface CircleOptions {
        center?: LatLng | LatLngLiteral;
        clickable?: boolean;
        draggable?: boolean;
        editable?: boolean;
        fillColor?: string;
        fillOpacity?: number;
        map?: Map;
        radius?: number;
        strokeColor?: string;
        strokeOpacity?: number;
        strokePosition?: StrokePosition;
        strokeWeight?: number;
        visible?: boolean;
        zIndex?: number;
      }

      interface CircleLiteral {
        center: LatLng | LatLngLiteral;
        radius: number;
      }

      enum StrokePosition {
        CENTER = 0,
        INSIDE = 1,
        OUTSIDE = 2,
      }

      enum PlacesServiceStatus {
        INVALID_REQUEST = 'INVALID_REQUEST',
        NOT_FOUND = 'NOT_FOUND',
        OK = 'OK',
        OVER_QUERY_LIMIT = 'OVER_QUERY_LIMIT',
        REQUEST_DENIED = 'REQUEST_DENIED',
        UNKNOWN_ERROR = 'UNKNOWN_ERROR',
        ZERO_RESULTS = 'ZERO_RESULTS',
      }

      class AutocompleteSessionToken {
        constructor();
      }
    }
  }
}
