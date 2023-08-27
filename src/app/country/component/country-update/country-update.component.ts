import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CountryView} from "../../view/country.view";
import {Observable} from "rxjs";
import {CountryService} from "../../service/country.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BaseUpdateComponent} from "../../../base/component/base-update/base-update.component";
import {isFalsy, isTruthy} from "../../../shared/util/helpers";

@Component({
  selector: 'app-country-update',
  templateUrl: './country-update.component.html',
  styleUrls: ['./country-update.component.css']
})
export class CountryUpdateComponent extends BaseUpdateComponent<CountryView> implements OnInit {

  public constructor(private countryService: CountryService,
                     protected formBuilder: FormBuilder,
                     router: Router,
                     route: ActivatedRoute) {
    super(router, route);
  }

  ngOnInit(): void {
    this.initEntry();
  }

  protected override initForm(): void {
    this.fleenHealthForm = this.formBuilder.group({
      title: [this.entryView?.title,
        [Validators.required, Validators.minLength(1), Validators.maxLength(100)]
      ],
      code: [this.entryView?.code,
        [Validators.required, Validators.minLength(2), Validators.maxLength(5)]
      ],
    });
  }

  protected override getServiceEntry(id: number | string): Observable<CountryView> {
    return this.countryService.findCountry(id);
  }

  public updateCountry(): void {
    if (isTruthy(this.updateCountryForm) && this.updateCountryForm.valid && isFalsy(this.isSubmitting)) {
      this.disableSubmitting();
      this.countryService.updateCountry(this.entryId, this.updateCountryForm.value)
        .subscribe({
          error: (result: any): void => {
            this.handleError(result);
          },
          complete: async (): Promise<void> => {
            this.enableSubmitting();
            await this.goToEntries();
          }
      });
    }
  }

  get title(): AbstractControl | null | undefined {
    return this.fleenHealthForm?.get('title');
  }

  get code(): AbstractControl | null | undefined {
    return this.fleenHealthForm?.get('code');
  }

  get updateCountryForm(): FormGroup {
    return this.fleenHealthForm;
  }

}
