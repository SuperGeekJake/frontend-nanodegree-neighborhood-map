import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Utilities as _} from '../utils';
import {Location} from './model';
import {FourSquare} from './foursquare';
import {jakeFavorites} from './favs';

@Injectable()
export class LocationList {
  list$: KnockoutObservableArray<Location> = ko.observableArray([]);
  loading$: KnockoutObservable<boolean> = ko.observable(true);
  filter$: KnockoutObservable<string> = ko.observable('');

  get$: KnockoutComputed<Location[]> = ko.pureComputed(() => {
    let filter = this.filter$();
    if (filter === '') return this.list$();

    let index = 0;
    return ko.utils.arrayFilter(this.list$(), (item: Location) => {
      let title = item.getTitle().toLowerCase();

      // Return item if filter is a substring of item
      if (title.indexOf(filter.toLowerCase()) > -1) {
        this.list$()[index].setVisible(true);
        index++;
        return true;
      } else {
        this.list$()[index].setVisible(false);
        index++;
        return false;
      }
    });
  });

  constructor(
    private _frsq: FourSquare
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
    if (i === this.list$().length) return;

    this.list$()[i].setMap(map);
    i++;

    // Recursive with timeout
    setTimeout(() => this.addToMap(map, i), 200);
  }

  private convertVenues(venueList: Array<any>) {
    // Filter known bad results/duplicates
    venueList = this.filter(venueList);

    // Inject custom venues
    venueList = venueList.concat(jakeFavorites);

    // Loop through response results, creating "Location"s
    for (let i = 0; i < venueList.length; i++) {
      this.list$.push(new Location({
        title: _.titleCase(venueList[i].name),
        position: new google.maps.LatLng(venueList[i].location.lat, venueList[i].location.lng),
        animation: google.maps.Animation.DROP
      }));
    }

    // Sort locations by title, ascending
    this.list$.sort(this.sort);

    // Set loading = false after handling response
    this.loading$(false);
  }

  /**
   * Sort list$ by title in ascending order
   * @param  {Location} left  [description]
   * @param  {Location} right [description]
   * @return {number}         [description]
   */
  private sort(left: Location, right: Location) {
    const leftTitle = left.getTitle().toLowerCase();
    const rightTitle = right.getTitle().toLowerCase();

    if (leftTitle < rightTitle) return -1;
    if (leftTitle > rightTitle) return 1;

    // No sort
    return 0;
  }

  private filter(list: Array<any>) {
    return list.filter((venue) => {
      switch(venue.name.toLowerCase()) {
        case 'soquel, california':
        case 'sunrise cafe':
        case 'star of siam':
        case 'tortilla flats':
        case 'tortilla flats restaurant':
        case 'taquiera la cabana':
        case 'ugly mug coffeehouse':
          return false;
      }

      return true;
    });
  }

  private handleError(error: any) {
    this.loading$(false);

    // TODO: Handle error, maybe re-request
    console.log(error);
  }

  private reset() {
    // Noop if list is empty
    if (this.list$().length === 0) return;

    // Loop through list, removing markers from map
    for (let i = 0; i < this.list$().length; i++) {
      this.list$()[i].setMap(null);
    }

    // Clear location list
    this.list$([]);
  }
}
