import {MapComponent} from '../map';
import {Utilities as _} from '../utils';

// Location data and marker
export class Location extends google.maps.Marker {
  private info: google.maps.InfoWindow;
  private category: string = null;
  private address: string = null;
  private content: string = null;
  private phone: string = null;

  constructor(
    venue: FourSquareVenue,
    private map: MapComponent
  ) {
    super({
      title: _.titleCase(venue.name),
      position: new google.maps.LatLng(venue.location.lat, venue.location.lng),
      animation: google.maps.Animation.DROP
    });

    this.setCategory(venue.categories);
    this.setAddress(venue.location.address);
    this.setPhone(venue.contact.phone);
    this.setContent();

    this.info = new google.maps.InfoWindow({
      content: this.getContent()
    });

    this.addListener('click', () => this.onClick());
  }

  private onClick() {
    this.info.open(this.map, this);
  }

  setContent() {
    let template = '<div class="content">';
    template += `<h4>${this.getTitle()}</h4>`;

    if (this.getCategory()) template += `<div>${this.getCategory()}</div>`;
    if (this.getPhone()) template += `<div>${this.getPhone()}</div>`;
    if (this.getAddress()) template += `<p>${this.getAddress()}</p>`;
    template += '</div>';

    this.content = template;
  }

  getContent() {
    return this.content;
  }

  // FIX: Always returns "Not Available"
  setCategory(categories) {
    let categoryName = 'Not Available';

    if (categories.length > 0) return this.category;

    for (let i = 0; i < categories.length; i++) {
      if (categories[i].primary) {
        categoryName = categories[i].name;
      }
    }

    this.category;
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

  onSelect() {
    // Center map on marker
    this.map.panTo(this.getPosition());

    // Run bounce animation once
    // Wait then, kill future animation loops
    this.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(() => {
      this.setAnimation(null);

      // Open info window or dom based info
      this.onClick();
    }, 700);
  }

  activate() {
    this.setMap(this.map);
  }

  deactivate() {
    this.setMap(null);
  }

  closeInfo() {
    this.info.close();
  }
}
