import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalEventsComponent } from './external-events.component';

describe('ExternalEventsComponent', () => {
  let component: ExternalEventsComponent;
  let fixture: ComponentFixture<ExternalEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExternalEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
