class Map extends google.maps.Map {
  markers: Array<google.maps.Marker>;

  constructor() {
    super(document.getElementById('map'), {
      center: new google.maps.LatLng(36.989316, -121.941820),
      zoom: 19,
      mapTypeId: google.maps.MapTypeId.HYBRID,
      mapTypeControlOptions: {
        position: google.maps.ControlPosition.LEFT_BOTTOM
      }
    });

    let that = this;
    this.markers = [
      new google.maps.Marker({
        title: 'Jake\'s House',
        position: new google.maps.LatLng(36.989236, -121.941330),
        visible: true,
        map: that
      }),
      new google.maps.Marker({
        title: 'Neighborhood Garden',
        position: new google.maps.LatLng(36.989015, -121.941241),
        visible: true,
        map: that
      }),
      new google.maps.Marker({
        title: 'Community Garden',
        position: new google.maps.LatLng(36.989223, -121.942641),
        visible: true,
        map: that
      }),
      new google.maps.Marker({
        title: 'Apt. Management Office',
        position: new google.maps.LatLng(36.989097, -121.942330),
        visible: true,
        map: that
      }),
      new google.maps.Marker({
        title: 'Abandoned Building',
        position: new google.maps.LatLng(36.989864, -121.941957),
        visible: true,
        map: that
      }),
      new google.maps.Marker({
        title: 'Unnamed Creek',
        position: new google.maps.LatLng(36.989183, -121.940962),
        visible: true,
        map: that
      })
    ];
  }
}

export const map = new Map();
