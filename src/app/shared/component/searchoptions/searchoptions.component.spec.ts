import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchoptionsComponent } from './searchoptions.component';

describe('SearchoptionsComponent', () => {
  let component: SearchoptionsComponent;
  let fixture: ComponentFixture<SearchoptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchoptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchoptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
