import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AutoriaService } from '../../services/autoria.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  search: FormControl = new FormControl('');

  constructor(private _http: AutoriaService) {
  }

  ngOnInit() {
    this.search.valueChanges
      .pipe(switchMap(value => this._http.getData(value)), debounceTime(500), distinctUntilChanged())
      .subscribe(res => this._http.getNext(res));
  }
}
