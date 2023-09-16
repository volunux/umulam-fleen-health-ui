import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProfessionalAvailabilitySessionsComponent } from './view-professional-availability-sessions.component';

describe('ViewProfessionalAvailabilitySessionsComponent', () => {
  let component: ViewProfessionalAvailabilitySessionsComponent;
  let fixture: ComponentFixture<ViewProfessionalAvailabilitySessionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewProfessionalAvailabilitySessionsComponent]
    });
    fixture = TestBed.createComponent(ViewProfessionalAvailabilitySessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
