import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInUpBaseComponent } from './sign-in-up-base.component';

describe('SignInUpBaseComponent', () => {
  let component: SignInUpBaseComponent;
  let fixture: ComponentFixture<SignInUpBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignInUpBaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignInUpBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
