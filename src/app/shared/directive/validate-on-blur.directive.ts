import {Directive, HostListener, Input} from '@angular/core';
import {NgControl} from "@angular/forms";
import {Observable} from "rxjs";
import {isTruthy} from "../util/helpers";

@Directive({
  selector: '[appValidateOnBlur]'
})
export abstract class ValidateOnBlurDirective {

  @Input() appValidateOnBlur!: NgControl | any;

3

  validateOnBlur(): void {
    const inputValue = this.appValidateOnBlur.value;
    console.log("I got here");
    console.log(this.appValidateOnBlur);

    this.entityExists(inputValue).subscribe(response => {
      if (isTruthy(response) && response.exists) {
        console.log("Did I got here");
        this.appValidateOnBlur.control?.setErrors({ exists: true });
      } else {
        this.appValidateOnBlur.control?.setErrors(null);
      }

      this.appValidateOnBlur.control?.markAsTouched();
      this.appValidateOnBlur.control?.updateValueAndValidity();
      console.log(this.appValidateOnBlur.control?.errors);
    });
  }

  abstract entityExists(value: string): Observable<any>;

}
