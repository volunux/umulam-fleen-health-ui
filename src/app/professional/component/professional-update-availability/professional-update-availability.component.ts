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
        Validators.required, maxTimeValidator(this.AVAILABILITY_MAX_TIME), completeHourValidator('starTime')]
      ],
    }, {
      validators: [
        endTimeGreaterThanStartTimeValidator('startTime', 'endTime'),
        this.overlappingPeriodsValidator('dayOfTheWeek', 'startTime', 'endTime')
      ]
    });
    this.formReady();
  }

  public updateAvailabilityOrSchedule(): void {
    if (isFalsy(this.isSubmitting) && isObject(this.periods) && Array.isArray(this.periods)) {
      this.disableSubmitting();
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

      console.log(startTimeCtrl.errors);

      if (nonNull(dayOfTheWeekCtrl) && nonNull(startTimeCtrl) && nonNull(endTimeCtrl)) {
        const dayOfTheWeek: string = dayOfTheWeekCtrl.value;
        const startTime: string = startTimeCtrl.value;
        const endTime: string = endTimeCtrl.value;

        const newPeriod: PeriodDto = { dayOfTheWeek, startTime, endTime };
        const hasOverlap: boolean = checkForOverlappingPeriods((<PeriodDto[]>this.periods), newPeriod);
        const errors: ValidationErrors = { ...(startTimeCtrl.errors) };
        if (hasOverlap) {
          errors['overlappingPeriods'] = true;
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

}
