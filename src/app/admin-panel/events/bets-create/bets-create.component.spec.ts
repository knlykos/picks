import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetsCreateComponent } from './bets-create.component';

describe('BetsCreateComponent', () => {
  let component: BetsCreateComponent;
  let fixture: ComponentFixture<BetsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
