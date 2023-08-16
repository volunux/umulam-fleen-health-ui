import {Component, ContentChild, OnInit} from '@angular/core';
import {ShowErrorDirective} from "../../directive/show-error.directive";
import {FormErrorService} from "../../service/form-error.service";
import {isFalsy} from "../../util/shared-util";

@Component({
  selector: 'app-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.css']
})
export class FormGroupComponent implements OnInit {

  @ContentChild(ShowErrorDirective, { static: true }) errorDirective!: ShowErrorDirective;

  public constructor(private formErrorService: FormErrorService) { }

  get errorMessage(): string | null {
    const errors: [string, any][] = Object.entries(
      this.errorDirective?.ngControl?.control?.errors || {}
    );

    if (this.errorDirective?.ngControl?.dirty
        && this.errorDirective?.ngControl?.touched
        && errors.length > 0) {

      const passedControlLabel: string | undefined = this.errorDirective?.controlLabel;
      const formControlLabel: string = passedControlLabel ?? 'This field';
      return this.formErrorService.getErrorValidationMessage(formControlLabel, errors);
    }

    return null;
  }

  ngOnInit(): void {
    if (isFalsy(this.errorDirective)) {
      throw new Error(`${ShowErrorDirective.name} should be set as an attribute in the element`);
    }
  }

}
