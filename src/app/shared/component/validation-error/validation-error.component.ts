import {Component, Input} from '@angular/core';
import {AbstractControl} from "@angular/forms";
import {validationErrorMessages} from "../../util/validation-messages";
import {AnyProp} from "../../type/base";

@Component({
  selector: 'app-validation-error',
  templateUrl: './validation-error.component.html',
  styleUrls: ['./validation-error.component.css']
})
export class ValidationErrorComponent {

  @Input({ required: true }) public control: AbstractControl | undefined | null;
  @Input({ alias: 'control-label', required: true }) public controlLabel: string = "This field";
  @Input({ alias: 'control-options', required: false }) public controlOptions: AnyProp = {};

  get errors(): any[] {
    if (this.control && this.control.invalid && (this.control.dirty || this.control.touched)) {
      return this.getValidationErrorMessages(this.control as AbstractControl, this.controlLabel, this.controlOptions);
    }
    return [];
  }

  private getValidationErrorMessages(control: AbstractControl, controlLabel: string, controlOptions: any): string[] {
    const errors: any[] = [];
    for (const errorKey in control.errors) {
      if (control.errors.hasOwnProperty(errorKey) && validationErrorMessages.hasOwnProperty(errorKey)) {
        errors.push(validationErrorMessages[errorKey](control, controlLabel, controlOptions));
      }
    }
    return [...errors];
  }

}
