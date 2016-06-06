// Location data and marker
export class Location extends google.maps.Marker {
  // TODO: location - address, long./lat.

  constructor(options: LocationOptions) {
    super(options);

    // TODO: Handle Location specific options
  }

  onClick() {
    // open info window or dom based info
    console.log(`Location ${this.title} was clicked.`);
  }

  activate() {
    // Center map on marker

    // Run bounce animation once
    // Wait then, kill future animation loops
    this.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(() => this.setAnimation(null), 700);

    // Open info window or dom based info
  }
}
