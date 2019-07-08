import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetsUpdateComponent } from './bets-update.component';

describe('BetsUpdateComponent', () => {
  let component: BetsUpdateComponent;
  let fixture: ComponentFixture<BetsUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetsUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
