import {MapComponent} from '../map';
import {Utilities as _} from '../utils';
import {locationInfo} from './info';

// Location data and marker
export class Location extends google.maps.Marker {
  private category: string = null;
  private address: string = null;
  private content: string = null;
  private phone: string = null;
  private source: string;

  constructor(
    venue: FourSquareVenue,
    public map: google.maps.Map
  ) {
    super({
      title: _.titleCase(venue.name),
      position: new google.maps.LatLng(venue.location.lat, venue.location.lng),
      animation: google.maps.Animation.DROP,
      icon: {
        path: 'M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z',
        fillColor: (venue.jake) ? '#f44336' : '#2d5be3',
        fillOpacity: 1,
        scale: 1,
        strokeWeight: 1
      }
    });

    this.setCategory(venue.categories);
    this.setAddress(venue.location.address);
    this.setPhone(venue.contact.phone);
    this.setSource(venue.jake);

    this.addListener('click', () => this.onClick());
  }

  private onClick() {
    // Run bounce animation once
    // Wait then, kill future animation loops
    locationInfo.unset();
    this.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(() => {
      this.setAnimation(null);

      // Open info window or dom based info
      locationInfo.set(this);
    }, 700);
  }

  setCategory(categories) {
    let categoryName = 'Not Available';

    categories.forEach((category) => {
      if (category.primary) categoryName = category.name;
    });

    this.category = categoryName;
  }

  getCategory() {
    return this.category;
  }

  setAddress(address: string = null) {
    this.address = address;
  }

  getAddress() {
    return this.address;
  }

  setPhone(phone: string = null) {
    this.phone = phone;
  }

  getPhone() {
    return this.phone;
  }

  setSource(jake: boolean = false) {
    this.source = (jake) ? 'jake' : 'foursquare';
  }

  getSource() {
    return this.source;
  }

  onSelect() {
    // Close menu
    $('#offCanvas').foundation('close');

    // Center map on marker
    this.map.panTo(this.getPosition());
    this.onClick();
  }

  activate() {
    this.setMap(this.map);
  }

  deactivate() {
    this.setMap(null);
  }
}
