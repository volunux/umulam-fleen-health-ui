import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AuthenticationService} from "../../service/authentication.service";
import {SignUpBaseComponent} from "./sign-up-base";

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

}
