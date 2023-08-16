import {Component, Input} from '@angular/core';
import {AbstractControl} from "@angular/forms";
import {validationErrorMessages} from "../../util/validation-messages";

@Component({
  selector: 'app-validation-error',
  templateUrl: './validation-error.component.html',
  styleUrls: ['./validation-error.component.css']
})
export class ValidationErrorComponent {

  @Input() control: AbstractControl | undefined | null;
  @Input('control-label') controlLabel: string = "This field";

  get errors(): any[] {
    console.log((<any>this.control).errors);
    if (this.control && this.control.invalid && (this.control.dirty || this.control.touched)) {
      return this.getValidationErrorMessages(this.control as AbstractControl, this.controlLabel);
    }
    return [];
  }

  private getValidationErrorMessages(control: AbstractControl, controlLabel: string): string[] {
    const errors: any[] = [];
    for (const errorKey in control.errors) {
      if (control.errors.hasOwnProperty(errorKey) && validationErrorMessages.hasOwnProperty(errorKey)) {
        errors.push(validationErrorMessages[errorKey](control, controlLabel));
      }
    }
    return [...errors];
  }

}
