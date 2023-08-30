import {Component, OnInit} from '@angular/core';
import {CountryService} from "../../service/country.service";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CountryView} from "../../view/country.view";
import {BaseAddComponent} from "../../../base/component/base-add/base-add.component";
import {AddCountryDto} from "../../dto/country.dto";
import {DEFAULT_FORM_CONTROL_VALUE} from "../../../shared/constant/enum-constant";
import {Observable} from "rxjs";

@Component({
  selector: 'app-country-add',
  templateUrl: './country-add.component.html',
  styleUrls: ['./country-add.component.css']
})
export class CountryAddComponent extends BaseAddComponent<AddCountryDto, CountryView> implements OnInit {

  public constructor(private countryService: CountryService,
                     formBuilder: FormBuilder,
                     router: Router) {
    super(router, formBuilder);
  }

  public ngOnInit(): void {
    this.initForm();
  }

  protected override initForm(): void {
    this.fleenHealthForm = this.formBuilder.group({
      title: [DEFAULT_FORM_CONTROL_VALUE,
        [Validators.required, Validators.minLength(1), Validators.maxLength(100)]
      ],
      code: [DEFAULT_FORM_CONTROL_VALUE,
        [Validators.required, Validators.minLength(2), Validators.maxLength(5)]
      ],
    });
    this.formReady();
  }

  public saveCountry(): void {
    this.saveEntry();
  }

  protected override $saveEntry(dto: AddCountryDto): Observable<CountryView> {
    return this.countryService.saveCountry(dto);
  }

  get title(): AbstractControl | null | undefined {
    return this.fleenHealthForm?.get('title');
  }

  get code(): AbstractControl | null | undefined {
    return this.fleenHealthForm?.get('code');
  }

  get addCountryForm(): FormGroup {
    return this.fleenHealthForm;
  }
}
