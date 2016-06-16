import {Injectable} from '@angular/core';

@Injectable()
export class MapComponent {
  public map: google.maps.Map;
  constructor() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: new google.maps.LatLng(36.988363, -121.9566037),
      zoom: 19,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControlOptions: {
        position: google.maps.ControlPosition.LEFT_BOTTOM
      },
      styles: [
        {stylers: [{ visibility: 'simplified' }]},
        {elementType: 'labels', stylers: [{ visibility: 'off' }]}
      ]
    });
  }
}
