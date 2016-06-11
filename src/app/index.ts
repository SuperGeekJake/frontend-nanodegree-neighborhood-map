import {ReflectiveInjector} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {MapComponent} from './map';
import {FourSquare, Location, ListComponent} from './location';
import {Utilities as _} from './utils';

var injector = ReflectiveInjector.resolveAndCreate([
  HTTP_PROVIDERS,
  MapComponent,
  FourSquare
]);

class App {
  private _list: ListComponent;
  public list$: KnockoutObservableArray<Location> = ko.observableArray([]);
  public listLoading$: KnockoutObservable<boolean> = ko.observable(true);
  public listFilter$: KnockoutObservable<string> = ko.observable('');
  public filteredList$: KnockoutComputed<Location[]> = ko.pureComputed(() => {
    let filter = this.listFilter$();
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
    private _frsq: FourSquare,
    private _map: MapComponent
  ) {
    this._list = new ListComponent(
      this._frsq,
      this._map,
      this.list$,
      this.listLoading$
    );
    ko.applyBindings(this);

    this.listLoading$.subscribe((val: boolean) => {
      if (val === false) this._list.addToMap();
    });

    $(document).foundation();
  }
}

window._ = _;
window.app = new App(
  injector.get(FourSquare),
  injector.get(MapComponent)
);
