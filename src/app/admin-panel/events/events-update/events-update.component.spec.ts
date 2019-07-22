import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsUpdateComponent } from './events-update.component';

describe('EventsUpdateComponent', () => {
  let component: EventsUpdateComponent;
  let fixture: ComponentFixture<EventsUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
