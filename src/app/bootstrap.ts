import {ReflectiveInjector} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {Utilities as _} from './utils';
import {MapComponent} from './map';
import {FourSquare} from './location';
import {App} from './app';

window._ = _;

window.bootstrap = function bootstrap() {
  const injector = ReflectiveInjector.resolveAndCreate([
    HTTP_PROVIDERS,
    MapComponent,
    FourSquare
  ]);

  window.app = new App(
    injector.get(FourSquare),
    injector.get(MapComponent)
  );
}

window.googleError = function googleError() {
  $('#googleError').show();
};
