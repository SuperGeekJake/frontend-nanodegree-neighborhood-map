import {ReflectiveInjector} from '@angular/core';
import {MapComponent} from './map';
import {ListComponent} from './list';

class App {
  constructor(
    public map: MapComponent,
    public list: ListComponent
  ) {
    $(document).foundation();

    ko.applyBindings(list);
  }
}

interface Window { app: App; }

var injector = ReflectiveInjector.resolveAndCreate([MapComponent, ListComponent]);
window.app = new App(
  injector.get(MapComponent),
  injector.get(ListComponent)
);
