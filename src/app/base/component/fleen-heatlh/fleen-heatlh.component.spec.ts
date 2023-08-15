import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FleenHeatlhComponent } from './fleen-heatlh.component';

describe('FleenHeatlhComponent', () => {
  let component: FleenHeatlhComponent;
  let fixture: ComponentFixture<FleenHeatlhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FleenHeatlhComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FleenHeatlhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
