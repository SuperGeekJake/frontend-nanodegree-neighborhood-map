interface LocationOptions extends google.maps.MarkerOptions {
  id: string,
  name: string,
  phone: string,
  category: string
}

// Location data and marker
export class Location extends google.maps.Marker {
  // TODO: location - address, long./lat.

  constructor(options: LocationOptions) {
    super(options);

    // TODO: Handle Location specific options
  }

  click() {
    // open info window or dom based info
  }

  activate() {
    // Center map on marker
    // Run bounce animation once
    // Wait then, kill future animation loops
    // Open info window or dom based info
  }
}

export class LocationView {
  // templating and dom interactions
}

export class LocationList {
  list: Array<Location> = [];
  loading: boolean = true;

  constructor() {
    this.get();
  }

  get() {
    // Set to loading
    this.loading = true;

    // Call for list reset
    this.reset();

    // Make FourSquare API request - venue request for Soquel, CA
      // Client id: J5P3E1YAPPJFJF0ZXTQCXKIFJAFMBBDRONBH5FUKKXZ0C1PE
      // Client secret: C4HKGNBQYPKI1QPHGG3FFMS3MTUVZYEGARBT3WY0OXRWNWUI
    // Loop through response results, creating "Location"s
    // Set loading = false after handling response
  }

  reset() {
    // Noop if list is empty
    if (this.list.length === 0) return;

    // Loop through list, removing markers from map
    for (let i = 0; i < this.list.length; i++) {
      this.list[i].setMap(null);
    }

    // Clear location list
    this.list = [];
  }
}

export class LocationListView {
  list: KnockoutObservableArray<Location>;
  filter: KnockoutObservable<string> = ko.observable('');


  constructor(public locationList: LocationList) {
    // Wrap list in an observable array
    this.list = ko.observableArray(this.locationList.list);
  }
}
