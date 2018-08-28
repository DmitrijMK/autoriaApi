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

  getCategoriesUrl() {
    return `https://developers.ria.com/auto/categories/${this.apiKey}`;
  }

  getCategories() {
    return this._http.get(this.getCategoriesUrl());
  }

  getMarksUrl(category) {
    return `https://developers.ria.com/auto/categories/${category}/marks${this.apiKey}`;
  }

  getMarks(category) {
    return this._http.get(this.getMarksUrl(category));
  }

  getSearchQuery(value): string {
    const params = new URLSearchParams();
    params.set('category_id', `${value['categories']}`);
    params.set('marka_id', `${value['marks']}`);
    params.set('model_id', '0');
    params.set('price_ot', '1000');
    params.set('price_do', '9990000');
    params.set('countpage', '10');

    return `${this.url + 'search' + this.apiKey + '&' + params}`;
  }

  getIdSearch(id) {
    const params = new URLSearchParams();
    params.set('auto_id', `${id}`);

    return `${this.url + 'info' + this.apiKey + '&' + params}`;

  }

  getNext(res) {
    this._dataSource$.next(res);
    console.log(res);
  }

  getIdHref(res) {
    return (res['result'].search_result.ids).map(id => this.getIdSearch(id));
  }

  getData(value: string) {
    return this._http.get(this.getSearchQuery(value))
      .pipe(switchMap(res => forkJoin(this.getIdHref(res).map(item => this._http.get(item)))));
  }
}
