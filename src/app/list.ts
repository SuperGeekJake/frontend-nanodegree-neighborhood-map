import {map} from './map';

class List {
  filter: KnockoutObservable<string> = ko.observable('');
  items: KnockoutObservableArray<google.maps.Marker> = ko.observableArray(map.markers);

  getItems = ko.pureComputed(() => {
    let filter = this.filter();
    if (filter === '') return this.items();

    let index = 0;
    return ko.utils.arrayFilter(this.items(), (item) => {
      let title = item.getTitle().toLowerCase();

      // Return item if filter is a substring of item
      if (title.indexOf(filter.toLowerCase()) > -1) {
        map.markers[index].setVisible(true);
        index++;
        return true;
      } else {
        map.markers[index].setVisible(false);
        index++;
        return false;
      }
    });
  });
}
export const list = new List();
