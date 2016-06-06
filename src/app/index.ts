import {ReflectiveInjector} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {MapComponent} from './map';
import {FourSquare, LocationList} from './location';

var injector = ReflectiveInjector.resolveAndCreate([
  HTTP_PROVIDERS,
  MapComponent,
  FourSquare,
  LocationList
]);

class App {
  constructor(
    public map: MapComponent,
    public list: LocationList
  ) {
    ko.applyBindings(list);

    list.loading$.subscribe((val: boolean) => {
      if (val === false) list.addToMap(map);
    });

    // $(document).foundation();
  }
}

window.app = new App(
  injector.get(MapComponent),
  injector.get(LocationList)
);
