import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AuthenticationService} from "../../service/authentication.service";
import {SignUpBaseComponent} from "./sign-up-base-component";
import {equalsIgnoreCase, isTruthy} from "../../../shared/util/helpers";
import {FORM_VALIDATION_ERROR_TYPE} from "../../../shared/constant/other-constant";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent extends SignUpBaseComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService) {
    super();
  }

  ngOnInit() {
    this.initForm();
  }

  override getAuthenticationService(): AuthenticationService {
    return this.authenticationService;
  }

  override getFormBuilder(): FormBuilder {
    return this.formBuilder;
  }

  public signUp(): void {
    if (isTruthy(this.signUpForm)) {
      this.authenticationService.signUp(this.signUpForm.value)
        .subscribe({
          next: (result): void => {
            console.log("Success");
            console.log(result);
          },
          error: (result): void => {
            const { error } = result;
            const { type } = error;
            if (isTruthy(type) && equalsIgnoreCase(type, FORM_VALIDATION_ERROR_TYPE)) {
              this.setErrorsFromApiResponse(error.fields);
              return;
            }
            this.errorMessage = error.message;
          }
      });
    }
  }

}
