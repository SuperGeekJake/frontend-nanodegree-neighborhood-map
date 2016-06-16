import {Observable} from 'rxjs/Observable';
import {Utilities as _} from '../utils';
import {FourSquare} from './foursquare';
import {Location} from './model';
import {MapComponent} from '../map';
import {jakeFavorites} from './favs';

export class ListComponent {
  constructor(
    private _frsq: FourSquare,
    private _map: MapComponent,
    private list$: KnockoutObservableArray<Location>,
    private loading$: KnockoutObservable<boolean>
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

  addToMap(i: number = 0) {
    if (i === this.list$().length) return;

    this.list$()[i].setMap(this._map);
    i++;

    // Recursive with timeout
    setTimeout(() => this.addToMap(i), 200);
  }

  private convertVenues(venueList: Array<FourSquareVenue>) {
    // Filter known bad results/duplicates
    venueList = this.filter(venueList);

    // Inject custom venues
    venueList = venueList.concat(jakeFavorites);

    // Loop through response results, creating "Location"s
    for (let i = 0; i < venueList.length; i++) {
      this.list$.push(new Location(venueList[i], this._map));
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
