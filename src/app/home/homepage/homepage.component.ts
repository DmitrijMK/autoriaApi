import { Component, OnInit } from '@angular/core';
import { AutoriaService } from '../../shared/services/autoria.service';
import { CarAdvert } from '../../shared/models/car-advert';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  cars: CarAdvert[];

  constructor(private _http: AutoriaService) {
  }

  ngOnInit() {
    this._http.data$.subscribe(data => this.cars = data);
  }
}
