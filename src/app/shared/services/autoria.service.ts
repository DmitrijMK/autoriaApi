import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CarAdvert } from '../models/car-advert';

@Injectable({
  providedIn: 'root'
})
export class AutoriaService {
  private _dataSource$ = new Subject<CarAdvert[]>();
  data$ = this._dataSource$.asObservable();

  private url = `https://developers.ria.com/auto/`;
  private apiKey = `?api_key=qbK7a6k10DyP9f65sLk5pJPla0u15ZAQV655Ya0t`;

  constructor(private _http: HttpClient) {
  }

  getSearchQuery(category_id = '1', type = 'search', id = '1'): string {
    const params = new URLSearchParams();
    if (type === 'search') {
      params.set('category_id', `${category_id}`);
      params.set('marka_id[1]', '84');
      params.set('model_id[1]', '0');
      params.set('price_ot', '1000');
      params.set('price_do', '60000');
      params.set('countpage', '20');
    } else {
      params.set('auto_id', `${id}`);
    }

    return `${this.url + type + this.apiKey + '&' + params}`;
  }

  getNext(res) {
    this._dataSource$.next(res);
  }

  getIdHref(res) {
    return (res['result'].search_result.ids).map(id => this.getSearchQuery('1', 'info', id));
  }

  getData(value: string) {
    return this._http.get(this.getSearchQuery(value))
      .pipe(switchMap(res => forkJoin(this.getIdHref(res).map(item => this._http.get(item)))));
  }
}
