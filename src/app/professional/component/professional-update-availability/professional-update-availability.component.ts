import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {
  completeHourValidator,
  endTimeGreaterThanStartTimeValidator,
  enumTypeValidator,
  maxTimeValidator,
  minTimeValidator
} from "../../../shared/validator/validator";
import {checkForOverlappingPeriods, isFalsy, isObject, nonNull} from "../../../shared/util/helpers";
import {PeriodDto} from "../../dto/professional.dto";
import {DEFAULT_FORM_CONTROL_VALUE} from "../../../shared/constant/enum-constant";
import {BaseFormImplComponent} from "../../../base/component/base-form/base-form-impl.component";
import {ProfessionalService} from "../../service/professional.service";
import {AvailabilityDayOfTheWeek} from "../../enum/professional.enum";
import {ProfessionalAvailabilityView} from "../../view/professional-availability.view";
import {ErrorResponse} from "../../../base/response/error-response";
import {FleenHealthResponse} from "../../../shared/response/fleen-health.response";

@Component({
  selector: 'app-professional-update-availability',
  templateUrl: './professional-update-availability.component.html',
  styleUrls: ['./professional-update-availability.component.css']
})
export class ProfessionalUpdateAvailabilityComponent extends BaseFormImplComponent implements OnInit {
  private readonly AVAILABILITY_MIN_TIME: string = '08:00';
  private readonly AVAILABILITY_MAX_TIME: string = '18:00';
  public periods: PeriodDto[] | ProfessionalAvailabilityView[] | any[] = [];

  public constructor(protected professionalService: ProfessionalService,
                     protected override formBuilder: FormBuilder) {
    super();
  }

  public ngOnInit(): void {
    this.professionalService.getUpdateAvailabilityOrSchedule()
      .subscribe({
        next: (result: ProfessionalAvailabilityView[]): void => {
          this.periods = result;
          this.initForm();
        },
        error: (error: ErrorResponse): void => {
          this.handleError(error);
        }
    });
  }

  private initForm(): void {
    this.fleenHealthForm = this.formBuilder.group({
      dayOfTheWeek: [DEFAULT_FORM_CONTROL_VALUE, [
        Validators.required, enumTypeValidator(this.daysOfTheWeek)]
      ],
      startTime: [DEFAULT_FORM_CONTROL_VALUE, [
        Validators.required, minTimeValidator(this.AVAILABILITY_MIN_TIME)]
      ],
      endTime: [DEFAULT_FORM_CONTROL_VALUE, [
        Validators.required, maxTimeValidator(this.AVAILABILITY_MAX_TIME), ]
      ],
    }, {
      validators: [
        endTimeGreaterThanStartTimeValidator('startTime', 'endTime'),
        this.overlappingPeriodsValidator('dayOfTheWeek', 'startTime', 'endTime'),
        completeHourValidator('startTime', 'endTime')
      ]
    });
    this.formReady();
  }

  public updateAvailabilityOrSchedule(): void {
    if (isFalsy(this.isSubmitting) && isObject(this.periods) && Array.isArray(this.periods) && this.isPeriodsMoreThanOne()) {
      this.disableSubmittingAndResetErrorMessage();
      this.sortPeriods();

      this.professionalService.updateAvailabilityOrSchedule({ periods: this.periods })
        .subscribe({
          next: (result: FleenHealthResponse): void => {
            this.setStatusMessage(result.message);
          },
          error: (error: ErrorResponse): void => {
            this.handleError(error);
          },
          complete: (): void => {
            this.enableSubmitting();
            this.resetForm();
          }
      });
    }
  }


  /**
   * Custom validator for checking overlapping periods within a form group.
   *
   * This validator checks if the specified period (dayOfTheWeek, startTime, endTime) in the form group
   * overlaps with any existing periods in the 'periods' array.
   *
   * @param dayOfTheWeekFieldName The name of the form control containing the day of the week.
   * @param startTimeFieldName The name of the form control containing the start time.
   * @param endTimeFieldName The name of the form control containing the end time.
   *
   * @returns A validation error object if there is an overlap, otherwise, null.
   *
   * @example
   * // Example usage within a form group:
   * const formGroup = new FormGroup({
   *   dayOfTheWeek: new FormControl('Monday'),
   *   startTime: new FormControl('08:00 AM'),
   *   endTime: new FormControl('09:00 AM')
   * });
   *
   * const validator = overlappingPeriodsValidator('dayOfTheWeek', 'startTime', 'endTime');
   * const validationResult = validator(formGroup);
   *
   * if (validationResult) {
   *   console.log('Validation Error:', validationResult); // Result: { overlappingPeriods: true }
   * }
   */
  private overlappingPeriodsValidator(dayOfTheWeekFieldName: string, startTimeFieldName: string, endTimeFieldName: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const dayOfTheWeekCtrl: AbstractControl | any = formGroup.get(dayOfTheWeekFieldName);
      const startTimeCtrl: AbstractControl | any = formGroup.get(startTimeFieldName);
      const endTimeCtrl: AbstractControl | any = formGroup.get(endTimeFieldName);

      if (nonNull(dayOfTheWeekCtrl) && nonNull(startTimeCtrl) && nonNull(endTimeCtrl)) {
        const dayOfTheWeek: string = dayOfTheWeekCtrl.value;
        const startTime: string = startTimeCtrl.value;
        const endTime: string = endTimeCtrl.value;
        const newPeriod: PeriodDto = { dayOfTheWeek, startTime, endTime };

        const hasOverlap: boolean = checkForOverlappingPeriods((<PeriodDto[]>this.periods), newPeriod);
        let errors: ValidationErrors = { ...(startTimeCtrl.errors) };
        if (hasOverlap) {
          errors = { ...errors, overlappingPeriods: true }
        }

        startTimeCtrl.setErrors(Object.keys(errors).length > 0 ? errors : null);
      }
      return null;
    }
  }


  /**
   * Add a new period to the 'periods' array if the form data is valid and does not overlap with existing periods.
   *
   * This method is called when the user attempts to add a new period to the schedule. It first checks if the form data
   * (dayOfTheWeek, startTime, endTime) is valid and then checks for overlapping periods within the 'periods' array.
   * If there is no overlap, the new period is added to the 'periods' array, and the form is reset.
   *
   * @example
   * // Example usage:
   * addToPeriods();
   * // This method is typically called in response to user interaction, such as clicking an "Add" button.
   */
  public addToPeriods(): void {
    if (this.timeForm.valid && nonNull(this.dayOfTheWeek) && nonNull(this.startTime) && nonNull(this.endTime)) {
      const dayOfTheWeek: string = this.dayOfTheWeek?.value;
      const startTime: string = this.startTime?.value;
      const endTime: string = this.endTime?.value;
      const newPeriod: PeriodDto = { dayOfTheWeek, startTime, endTime };

      const hasOverlap: boolean = checkForOverlappingPeriods((<PeriodDto[]>this.periods), newPeriod);
      if (isFalsy(hasOverlap)) {
        this.periods.push(newPeriod);
        this.timeForm.reset();
      }
    }
  }

  public resetFormAndPeriod(): void {
    this.periods = [];
    this.resetForm();
  }

  private resetForm(): void {
    this.timeForm.reset();
  }

  public removePeriod(index: number): void {
    if (index >= 0 && index < this.periods.length) {
      this.periods.splice(index, 1);
    }
  }

  public isPeriodsMoreThanOne(): boolean {
    return isObject(this.periods)
      && Array.isArray(this.periods)
      && this.periods.length > 0
  }


  /**
   * Sorts the list of periods based on the day of the week and start time.
   * This method is intended to arrange periods in ascending order by day of the week
   * and, for periods on the same day, by their start times.
   *
   * By calling this method, you can ensure that your list of periods is organized
   * in a clear and easy-to-read manner, facilitating better user experience and
   * management of healthcare professional availability.
   *
   * Usage:
   * - Call this method whenever you need to update or display the sorted list of periods.
   * - It sorts the periods array in-place, so there's no need to assign the result to
   *   a new variable; your original array will be sorted directly.
   *
   * Example:
   * ```typescript
   * // Sort the periods array before displaying it in the UI.
   * this.sortPeriods();
   * ```
   *
   * @remarks
   * - This method assumes that you have an array of periods, each having a `dayOfTheWeek`
   *   property representing the day and a `startTime` property representing the start time.
   * - Make sure that your array contains valid period objects to ensure accurate sorting.
   *
   * @see PeriodDto
   */
  private sortPeriods(): void {
    this.periods.sort((a, b): number | any => {
      if (a.dayOfTheWeek < b.dayOfTheWeek) {
        return -1;
      } else if (a.dayOfTheWeek > b.dayOfTheWeek) {
        return 1;
      } else {
        return a.startTime.localeCompare(b.startTime);
      }
    });
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

  get dayOfTheWeek(): AbstractControl | null | undefined {
    return this.timeForm?.get('dayOfTheWeek');
  }

  get daysOfTheWeek(): string[] {
    return Object.values(AvailabilityDayOfTheWeek);
  }


  /**
   * Handles the change event when the day of the week is selected in the form.
   * This method is intended to ensure real-time validation updates for the start time
   * and end time controls based on the selected day.
   *
   * When the day of the week changes, this method programmatically marks the start time
   * and end time controls as "touched," which triggers validation checks immediately.
   * This behavior addresses a situation where validation errors from a previous day may
   * persist until the user interacts with the input fields.
   *
   * Additionally, this method calls `updateValueAndValidity` on the start time and end time
   * controls to ensure that validation updates are executed promptly. This is particularly
   * useful in scenarios where asynchronous operations or complex component interactions
   * might affect the timing of validation.
   *
   * By marking the controls as "touched" and calling `updateValueAndValidity` upon day selection
   * changes, it ensures that validation updates in real-time as the user selects different days,
   * providing a smoother and more responsive user experience.
   *
   * Usage:
   * - Bind this method to the change event of the dayOfWeek control in your form template.
   * - Ensure that the dayOfWeek control is a dropdown or input field where users can select
   *   the day of the week.
   * - When the user selects a different day, this method will be triggered, and it will
   *   mark the start time and end time controls as "touched," triggering validation checks and
   *   explicitly updating the validation status.
   *
   * Example:
   * ```html
   * <select formControlName="dayOfWeek" (change)="onDayOfWeekChange()">
   *   <!-- Dropdown options for selecting the day of the week -->
   * </select>
   * ```
   *
   * @remarks
   * - This method assumes that you are using Angular Reactive Forms to manage your form controls.
   * - Make sure to adjust this method and your form structure to match your specific implementation.
   * - By marking controls as "touched" upon day selection changes and explicitly calling
   *   `updateValueAndValidity`, validation errors will be updated immediately for a smoother user
   *   experience, especially in scenarios involving complex interactions.
   *
   * @see FormGroup
   * @see FormBuilder
   * @see AbstractControl
   */
  public onDayOfWeekChange(): void {
    if (this.startTime?.dirty) {
      this.startTime?.markAsTouched();
      this.startTime?.updateValueAndValidity();
    }
    if (this.endTime?.dirty) {
      this.endTime?.markAsTouched();
      this.endTime?.updateValueAndValidity();
    }
  }

}
