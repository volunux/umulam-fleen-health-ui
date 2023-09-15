import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {
  completeHourValidator,
  endTimeGreaterThanStartTimeValidator,
  maxTimeValidator,
  minTimeValidator
} from "../../../shared/validator/validator";
import {checkForOverlappingPeriods} from "../../../shared/util/helpers";

@Component({
  selector: 'app-professional-update-availability',
  templateUrl: './professional-update-availability.component.html',
  styleUrls: ['./professional-update-availability.component.css']
})
export class ProfessionalUpdateAvailabilityComponent {

  timeForm: FormGroup;
  periods: any[] = [];
  public constructor(protected fb: FormBuilder) {
    this.timeForm = this.fb.group({
      dayOfWeek: ['Monday', [Validators.required]],
      startTime: ['', [Validators.required, minTimeValidator('08:00')]],
      endTime: ['', [Validators.required, maxTimeValidator('18:00'), completeHourValidator]],
    }, { validators: [endTimeGreaterThanStartTimeValidator, this.overlappingPeriodsValidator] });
  }

  overlappingPeriodsValidator() {
    const dayOfWeek = this.timeForm.controls['dayOfWeek'].value;
    const startTime = this.timeForm.controls['startTime'].value;
    const endTime = this.timeForm.controls['endTime'].value;

    if (dayOfWeek && startTime && endTime) {
      const newPeriod = { dayOfWeek, startTime, endTime };
      const hasOverlap = checkForOverlappingPeriods(this.periods, newPeriod);

      return hasOverlap ? { overlappingPeriods: true } : null;
    }

    return null;
  };

  addToPeriods() {
    if (this.timeForm.valid) {
      const dayOfWeek = this.timeForm.controls['dayOfWeek'].value;
      const startTime = this.timeForm.controls['startTime'].value;
      const endTime = this.timeForm.controls['endTime'].value;
      const newPeriod = { dayOfWeek, startTime, endTime };

      const hasOverlap = checkForOverlappingPeriods(this.periods, newPeriod);

      if (hasOverlap) {
        console.log('Overlapping periods are not allowed.');
      } else {
        this.periods.push(newPeriod);
        this.timeForm.reset();
      }
    }
  }

  resetForm() {
    this.periods = []; // Clear the periods array
    this.timeForm.reset(); // Reset the form
  }

  onTimeInput(event: any) {
    this.timeForm.controls['startTime'].setErrors(null);
    this.timeForm.controls['endTime'].setErrors(null);
  }

}
