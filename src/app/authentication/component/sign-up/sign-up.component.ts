import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SignUpDto} from "../../dto/sign-up-dto";
import {profileTypeValidator} from "../../validator/sign-up-validator";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public signUpForm: FormGroup = new FormGroup<any>({});
  private signUpDto: SignUpDto | undefined = new SignUpDto();

  constructor(private formBuilder: FormBuilder) {

  }

  initForm(): void {
    this.signUpForm = this.formBuilder.group({
      profile_type: [this.signUpDto?.profile_type,
        [Validators.required, profileTypeValidator(['PROFESSIONAL', 'USER'])]
      ],
      first_name: [this.signUpDto?.first_name,
        [Validators.required, Validators.minLength(2), Validators.maxLength(100)]
      ],
      last_name: [this.signUpDto?.last_name,
        [Validators.required, Validators.minLength(2), Validators.maxLength(100)]
      ],
      date_of_birth: [this.signUpDto?.date_of_birth,
        [Validators.required]
      ],
      email_address: [this.signUpDto?.email_address,
        [Validators.email, Validators.required, Validators.minLength(4), Validators.maxLength(150)]
      ],
      phone_number: [this.signUpDto?.phone_number,
        [Validators.required, Validators.minLength(4), Validators.maxLength(15)]
      ],
      gender: [this.signUpDto?.gender,
        [Validators.required]
      ],
      password: [this.signUpDto?.password,
        [Validators.required, Validators.minLength(8), Validators.maxLength(24)]
      ],
      confirm_password: [this.signUpDto?.confirm_password,
        [Validators.required, Validators.minLength(8), Validators.maxLength(24)]
      ],
      verification_type: [this.signUpDto?.verification_type,
        [Validators.required]
      ]
    });
  }

  ngOnInit() {
    this.initForm();
  }

  get profileType(): AbstractControl | null | undefined {
    return this.signUpForm?.get('profile_type');
  }

  get firstName(): AbstractControl | null | undefined {
    return this.signUpForm?.get('first_name');
  }

  get lastName(): AbstractControl | null | undefined {
    return this.signUpForm?.get('last_name');
  }

  get dateOfBirth(): AbstractControl | null | undefined {
    return this.signUpForm?.get('date_of_birth');
  }

  get emailAddress(): AbstractControl | null | undefined {
    return this.signUpForm?.get('email_address');
  }

  get phoneNumber(): AbstractControl | null | undefined {
    return this.signUpForm?.get('phone_number');
  }

  get gender(): AbstractControl | null | undefined {
    return this.signUpForm?.get('gender');
  }

  get password(): AbstractControl | null | undefined {
    return this.signUpForm?.get('password');
  }

  get confirmPassword(): AbstractControl | null | undefined {
    return this.signUpForm?.get('confirm_password');
  }

  get verificationType(): AbstractControl | null | undefined {
    return this.signUpForm?.get('verification_type');
  }

}
