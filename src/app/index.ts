import {map} from './map';
import {list} from './list';

class App {
  constructor(public map, public list) {
    $(document).foundation();

    ko.applyBindings(list);
  }
}

// Initialize application
new App(
  map,
  list
);
