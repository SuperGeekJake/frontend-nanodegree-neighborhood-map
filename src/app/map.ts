import {Injectable} from '@angular/core';
import {Marker} from './marker';

@Injectable()
export class MapComponent extends google.maps.Map {
  // markers: Array<Marker>;

  constructor() {
    super(document.getElementById('map'), {
      center: new google.maps.LatLng(36.988363, -121.9566037),
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.HYBRID,
      mapTypeControlOptions: {
        position: google.maps.ControlPosition.LEFT_BOTTOM
      }
    });

    // let that = this;
    // this.markers = [
    //   new Marker({
    //     title: 'Jake\'s House',
    //     description: 'My beloved home of the last 18 years nested in the nice suburbs of Soquel, California and within walking distance of the beach.',
    //     position: new google.maps.LatLng(36.989236, -121.941330),
    //     visible: true,
    //     map: that
    //   }),
    //   new Marker({
    //     title: 'Neighborhood Garden',
    //     description: '',
    //     position: new google.maps.LatLng(36.989015, -121.941241),
    //     visible: true,
    //     map: that
    //   }),
    //   new Marker({
    //     title: 'Community Garden',
    //     description: '',
    //     position: new google.maps.LatLng(36.989223, -121.942641),
    //     visible: true,
    //     map: that
    //   }),
    //   new Marker({
    //     title: 'Apt. Management Office',
    //     description: '',
    //     position: new google.maps.LatLng(36.989097, -121.942330),
    //     visible: true,
    //     map: that
    //   }),
    //   new Marker({
    //     title: 'Abandoned Building',
    //     description: '',
    //     position: new google.maps.LatLng(36.989864, -121.941957),
    //     visible: true,
    //     map: that
    //   }),
    //   new Marker({
    //     title: 'Unnamed Creek',
    //     description: '',
    //     position: new google.maps.LatLng(36.989183, -121.940962),
    //     visible: true,
    //     map: that
    //   })
    // ];
  }
}
