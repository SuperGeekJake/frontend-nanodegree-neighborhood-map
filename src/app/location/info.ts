class LocationInfo {
  private info: google.maps.InfoWindow = new google.maps.InfoWindow();
  set(location) {
    this.info.close();

    let content = '<div class="content">';
    content += `<h4>${location.getTitle()}</h4>`;
    content += '<p>'
    if (location.getCategory()) content += `${location.getCategory()}<br>`;
    if (location.getPhone()) content += `${location.getPhone()}<br>`;
    if (location.getAddress()) content += `${location.getAddress()}<br>`;
    content += '</p>';
    content += `<div>${(location.source === 'jake') ? 'Jake\'s Favorites' : 'Provided by FourSquare'}</div>`;
    content += '</div>';

    this.info.setContent(content);
    this.info.open(location.map, location);
  }

  unset() {
    this.info.close();
  }
}

export const locationInfo = new LocationInfo();
