import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {
  completeHourValidator,
  endTimeGreaterThanStartTimeValidator,
  enumTypeValidator,
  maxTimeValidator,
  minTimeValidator
} from "../../../shared/validator/validator";
import {checkForOverlappingPeriods, isFalsy, nonNull} from "../../../shared/util/helpers";
import {PeriodDto} from "../../dto/professional.dto";
import {DAYS_OF_WEEK, DEFAULT_FORM_CONTROL_VALUE} from "../../../shared/constant/enum-constant";
import {AnyProp} from "../../../shared/type/base";
import {BaseFormImplComponent} from "../../../base/component/base-form/base-form-impl.component";

@Component({
  selector: 'app-professional-update-availability',
  templateUrl: './professional-update-availability.component.html',
  styleUrls: ['./professional-update-availability.component.css']
})
export class ProfessionalUpdateAvailabilityComponent extends BaseFormImplComponent implements OnInit {
  private readonly AVAILABILITY_MIN_TIME: string = '08:00';
  private readonly AVAILABILITY_MAX_TIME: string = '18:00';
  public periods: PeriodDto[] = [];

  public constructor(protected override formBuilder: FormBuilder) {
    super();
  }

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.fleenHealthForm = this.formBuilder.group({
      dayOfWeek: [DEFAULT_FORM_CONTROL_VALUE, [
        Validators.required, enumTypeValidator(DAYS_OF_WEEK)]
      ],
      startTime: [DEFAULT_FORM_CONTROL_VALUE, [
        Validators.required, minTimeValidator(this.AVAILABILITY_MIN_TIME)]
      ],
      endTime: [DEFAULT_FORM_CONTROL_VALUE, [
        Validators.required, maxTimeValidator(this.AVAILABILITY_MAX_TIME), completeHourValidator('starTime')]
      ],
    }, {
      validators: [
        endTimeGreaterThanStartTimeValidator('startTime', 'endTime'),
        this.overlappingPeriodsValidator('dayOfWeek', 'startTime', 'endTime')
      ]
    });
  }


  /**
   * Custom validator for checking overlapping periods within a form group.
   *
   * This validator checks if the specified period (dayOfWeek, startTime, endTime) in the form group
   * overlaps with any existing periods in the 'periods' array.
   *
   * @param dayOfWeekFieldName The name of the form control containing the day of the week.
   * @param startTimeFieldName The name of the form control containing the start time.
   * @param endTimeFieldName The name of the form control containing the end time.
   *
   * @returns A validation error object if there is an overlap, otherwise, null.
   *
   * @example
   * // Example usage within a form group:
   * const formGroup = new FormGroup({
   *   dayOfWeek: new FormControl('Monday'),
   *   startTime: new FormControl('08:00 AM'),
   *   endTime: new FormControl('09:00 AM')
   * });
   *
   * const validator = overlappingPeriodsValidator('dayOfWeek', 'startTime', 'endTime');
   * const validationResult = validator(formGroup);
   *
   * if (validationResult) {
   *   console.log('Validation Error:', validationResult); // Result: { overlappingPeriods: true }
   * }
   */
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

        const value: AnyProp | null = hasOverlap
          ? { overlappingPeriods: true }
          : null;

        dayOfWeekCtrl.setErrors(value);
        return value;
      }
      return null;
    }
  };


  /**
   * Add a new period to the 'periods' array if the form data is valid and does not overlap with existing periods.
   *
   * This method is called when the user attempts to add a new period to the schedule. It first checks if the form data
   * (dayOfWeek, startTime, endTime) is valid and then checks for overlapping periods within the 'periods' array.
   * If there is no overlap, the new period is added to the 'periods' array, and the form is reset.
   *
   * @example
   * // Example usage:
   * addToPeriods();
   * // This method is typically called in response to user interaction, such as clicking an "Add" button.
   */
  public addToPeriods(): void {
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
  }

  public resetFormAndPeriod(): void {
    this.periods = [];
    this.timeForm.reset();
  }

  public removePeriod(index: number) {
    if (index >= 0 && index < this.periods.length) {
      this.periods.splice(index, 1);
    }
  }


  public onTimeInput(event: any) {
    if (nonNull(this.startTime)) {
      this.startTime?.setErrors(null);
    }
    if (nonNull(this.endTime)) {
      this.endTime?.setErrors(null);
    }
  }

  get timeForm(): FormGroup {
    return this.fleenHealthForm;
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
