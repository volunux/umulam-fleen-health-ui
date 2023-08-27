import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CountryView} from "../../view/country.view";
import {Observable} from "rxjs";
import {CountryService} from "../../service/country.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BaseUpdateComponent} from "../../../base/component/base-update/base-update.component";
import {UpdateCountryDto} from "../../dto/country.dto";

@Component({
  selector: 'app-country-update',
  templateUrl: './country-update.component.html',
  styleUrls: ['./country-update.component.css']
})
export class CountryUpdateComponent extends BaseUpdateComponent<CountryView, UpdateCountryDto> implements OnInit {

  public override entryView!: CountryView;

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

  protected override $updateEntry(id: string | number, dto: UpdateCountryDto): Observable<CountryView> {
    return this.countryService.updateCountry(id, dto);
  }

  public updateCountry(): void {
    this.updateEntry();
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
