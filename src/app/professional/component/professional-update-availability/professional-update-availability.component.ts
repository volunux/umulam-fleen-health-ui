import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {
  completeHourValidator,
  endTimeGreaterThanStartTimeValidator, enumTypeValidator,
  maxTimeValidator,
  minTimeValidator
} from "../../../shared/validator/validator";
import {checkForOverlappingPeriods, isFalsy, nonNull} from "../../../shared/util/helpers";
import {PeriodDto} from "../../dto/professional.dto";
import {DAYS_OF_WEEK, DEFAULT_FORM_CONTROL_VALUE} from "../../../shared/constant/enum-constant";

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
      dayOfWeek: [DEFAULT_FORM_CONTROL_VALUE, [
        Validators.required, enumTypeValidator(DAYS_OF_WEEK)]
      ],
      startTime: ['', [Validators.required, minTimeValidator('08:00')]],
      endTime: ['', [Validators.required, maxTimeValidator('18:00'), completeHourValidator]],
    }, { validators: [endTimeGreaterThanStartTimeValidator, this.overlappingPeriodsValidator] });

  }

  private overlappingPeriodsValidator(dayOfWeekFieldName: string, startTimeFieldName: string, endTimeFieldName: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const dayOfWeekCtrl: AbstractControl | any = formGroup.get(dayOfWeekFieldName);
      const startTimeCtrl: AbstractControl | any = formGroup.get(startTimeFieldName);
      const endTimeCtrl: AbstractControl | any = formGroup.get(endTimeFieldName);

      if (nonNull(dayOfWeekCtrl) && nonNull(startTimeCtrl) && nonNull(endTimeCtrl)) {
        const dayOfWeek: string = dayOfWeekCtrl.value;
        const startTime: string = startTimeCtrl.value;
        const endTime: string = endTimeCtrl.value;

        const newPeriod: PeriodDto = { dayOfWeek, startTime, endTime };
        const hasOverlap: boolean = checkForOverlappingPeriods(this.periods, newPeriod);

        return hasOverlap ? { overlappingPeriods: true } : null;
      }

      return null;
    }
  };

  addToPeriods() {
    if (this.timeForm.valid && nonNull(this.dayOfWeek) && nonNull(this.startTime) && nonNull(this.endTime)) {
      const dayOfWeek = this.dayOfWeek?.value;
      const startTime = this.startTime?.value;
      const endTime = this.endTime?.value;
      const newPeriod: PeriodDto = { dayOfWeek, startTime, endTime };

      const hasOverlap: boolean = checkForOverlappingPeriods(this.periods, newPeriod);

      if (isFalsy(hasOverlap)) {
        this.periods.push(newPeriod);
        this.timeForm.reset();
      }
    }
    console.log(this.periods);
  }

  public resetForm(): void {
    this.periods = [];
    this.timeForm.reset();
  }

  public onTimeInput(event: any) {
    this.timeForm.controls['startTime'].setErrors(null);
    this.timeForm.controls['endTime'].setErrors(null);
  }

  get startTime(): AbstractControl | null | undefined {
    return this.timeForm?.get('startTime');
  }

  get endTime(): AbstractControl | null | undefined {
    return this.timeForm?.get('endTime');
  }

  get dayOfWeek(): AbstractControl | null | undefined {
    return this.timeForm?.get('dayOfWeek');
  }

  get daysOfTheWeek(): string[] {
    return DAYS_OF_WEEK;
  }

}
