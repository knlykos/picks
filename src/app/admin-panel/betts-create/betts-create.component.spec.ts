import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BettsCreateComponent } from './betts-create.component';

describe('BettsCreateComponent', () => {
  let component: BettsCreateComponent;
  let fixture: ComponentFixture<BettsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BettsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BettsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
