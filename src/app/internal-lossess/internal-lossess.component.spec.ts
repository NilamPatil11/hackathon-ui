import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalLossessComponent } from './internal-lossess.component';

describe('InternalLossessComponent', () => {
  let component: InternalLossessComponent;
  let fixture: ComponentFixture<InternalLossessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalLossessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalLossessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
