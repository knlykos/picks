import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchToolbarInputComponent } from './search-toolbar-input.component';

describe('SearchToolbarInputComponent', () => {
  let component: SearchToolbarInputComponent;
  let fixture: ComponentFixture<SearchToolbarInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchToolbarInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchToolbarInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
