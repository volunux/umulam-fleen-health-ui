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

  periods: any[] = [];

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

        startTimeCtrl.setErrors(value);
        return value;
      }
      return null;
    }
  };

  public addToPeriods() {
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
