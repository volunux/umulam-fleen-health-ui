import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AuthenticationService} from "../../service/authentication.service";
import {SignUpBaseComponent} from "./sign-up-base";
import {isTruthy} from "../../../shared/util/helpers";

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
          next: (value): void => {
            console.log("Success");
            console.log(value);
          },
          error: (error): void => {
            console.log(error);
          }
      });
    }
  }

}
