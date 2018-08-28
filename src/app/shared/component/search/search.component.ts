import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AutoriaService } from '../../services/autoria.service';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  categories;
  marks;

  searchForm = this.fb.group({
    // search: [''],
    categories: [],
    marks: [],
  });

  constructor(private _http: AutoriaService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this._http.getCategories().pipe(res => this.categories = res);

    this.searchForm.valueChanges
      .pipe(switchMap(value => {
        this.getMarks(value.categories);

        return this._http.getData(value);
      }))
      .subscribe(res => this._http.getNext(res));
  }

  getMarks(category) {
    this._http.getMarks(category).pipe(res => this.marks = res);
  }
}
