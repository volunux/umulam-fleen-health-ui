import {Component, ContentChild} from '@angular/core';
import {ShowErrorDirective} from "../../directive/show-error.directive";
import {FormErrorService} from "../../service/form-error.service";

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.css']
})
export class FormFieldComponent {

  @ContentChild(ShowErrorDirective, { static: true }) errorDirective!: ShowErrorDirective;

  public constructor(private formErrorService: FormErrorService) {
  }

  get errorMessage(): string | null {
    const errors = Object.entries(
      this.errorDirective?.ngControl?.control?.errors || {}
    );

    if (!this.errorDirective?.ngControl?.dirty && !this.errorDirective?.ngControl?.touched) return '';
    if (!errors.length) { return null;
    }

    const passedControlName = this.errorDirective?.controlName;
    const formControlName = passedControlName ?? 'This field';
    return this.formErrorService.getErrorValidationMessage(formControlName, errors);
  }

  ngOnInit() {
    if (!this.errorDirective) {
      throw new Error('Without showError directive this is a useless component!');
    }
  }


}
