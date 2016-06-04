import {Injectable} from '@angular/core';
import {Marker} from './marker';
import {MapComponent} from './map';

@Injectable()
export class ListComponent {
  filter: KnockoutObservable<string> = ko.observable('');
  items: KnockoutObservableArray<Marker> = ko.observableArray(this.map.markers);

  constructor(public map: MapComponent) {}

  getItems = ko.pureComputed(() => {
    let filter = this.filter();
    if (filter === '') return this.items();

    let index = 0;
    return ko.utils.arrayFilter(this.items(), (item) => {
      console.log('Running filter!');
      let title = item.getTitle().toLowerCase();

      // Return item if filter is a substring of item
      if (title.indexOf(filter.toLowerCase()) > -1) {
        this.map.markers[index].setVisible(true);
        index++;
        return true;
      } else {
        this.map.markers[index].setVisible(false);
        index++;
        return false;
      }
    });
  });
}
