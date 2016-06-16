import {Injectable} from '@angular/core';
import {Http, Response, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/observable/throw';

@Injectable()
export class FourSquare {
  constructor(private http: Http) {}

  getVenues(): Observable<any> {
    let venuesUrl = 'https://api.foursquare.com/v2/venues/search';
    let params = new URLSearchParams();
    params.set('client_id', 'J5P3E1YAPPJFJF0ZXTQCXKIFJAFMBBDRONBH5FUKKXZ0C1PE');
    params.set('client_secret', 'C4HKGNBQYPKI1QPHGG3FFMS3MTUVZYEGARBT3WY0OXRWNWUI');
    params.set('v', '20160605');
    params.set('near', 'Soquel, CA');
    params.set('limit', '20');

    return this.http
      .get(venuesUrl, { search: params })
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.response.venues || {};
  }

  private handleError(error: any) {
    return Observable.throw(error);
  }
}
