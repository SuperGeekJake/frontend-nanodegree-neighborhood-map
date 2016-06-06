import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Location} from './model';
import {FourSquare} from './foursquare';
import {MapComponent} from '../map';

// const customLocations = [
//   {
//     title: '',
//
//   }
// ];

@Injectable()
export class LocationList {
  private list: Array<Location> = [];
  loading$: KnockoutObservable<boolean> = ko.observable(true);
  filter$: KnockoutObservable<string> = ko.observable('');
  list$: KnockoutObservableArray<Location> = ko.observableArray([]);
  get$: KnockoutComputed<Location[]> = ko.pureComputed(() => {
    let filter = this.filter$();
    if (filter === '') return this.list$();

    let index = 0;
    return ko.utils.arrayFilter(this.list$(), (item: Location) => {
      let title = item.getTitle().toLowerCase();

      // Return item if filter is a substring of item
      if (title.indexOf(filter.toLowerCase()) > -1) {
        this.list[index].setVisible(true);
        index++;
        return true;
      } else {
        this.list[index].setVisible(false);
        index++;
        return false;
      }
    });
  });

  constructor(
    private _frsq: FourSquare,
    private _map: MapComponent
  ) {
    this.get();
  }

  get() {
    // Set to loading
    this.loading$(true);

    // Call for list reset
    this.reset();

    // Make FourSquare API request - venue request for Soquel, CA
      // Client id: J5P3E1YAPPJFJF0ZXTQCXKIFJAFMBBDRONBH5FUKKXZ0C1PE
      // Client secret: C4HKGNBQYPKI1QPHGG3FFMS3MTUVZYEGARBT3WY0OXRWNWUI
    this._frsq.getVenues()
      .subscribe(
        list => this.convertVenues(list),
        error => this.handleError(error)
      );
  }

  addToMap(map, i: number = 0) {
    if (i === this.list.length) return;

    this.list[i].setMap(map);
    console.log(`Location "${this.list[i].getTitle()}" added to map as marker.`);
    i++;

    // Recursive with timeout
    setTimeout(() => this.addToMap(map, i), 200);
  }

  private convertVenues(venueList: Array<any>) {
    // Loop through response results, creating "Location"s
    for (let i = 0; i < venueList.length; i++) {
      this.list.push(new Location({
        title: venueList[i].name,
        position: new google.maps.LatLng(venueList[i].location.lat, venueList[i].location.lng),
        animation: google.maps.Animation.DROP
      }));
    }

    // Set loading = false after handling response
    this.list$(this.list);
    this.loading$(false);
  }

  private handleError(error: any) {
    this.loading$(false);

    // TODO: Handle error, maybe re-request
    console.log(error);
  }

  private reset() {
    // Noop if list is empty
    if (this.list.length === 0) return;

    // Loop through list, removing markers from map
    for (let i = 0; i < this.list$().length; i++) {
      this.list[i].setMap(null);
    }

    // Clear location list
    this.list$([]);
    this.list = [];
  }
}
