import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CountryService} from "../../service/country.service";
import {CountryView} from "../../view/country.view";
import {BaseDetailComponent} from "../../../base/component/base-detail/base-detail.component";
import {Observable} from "rxjs";

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.css']
})
export class CountryDetailComponent extends BaseDetailComponent<CountryView> implements OnInit {

  public override entryView!: CountryView;

  public constructor(private countryService: CountryService,
                     router: Router,
                     route: ActivatedRoute) {
    super(router, route);
  }

  public ngOnInit(): void {
    this.initEntry();
  }

  protected override getServiceEntry(id: number | string): Observable<CountryView> {
    return this.countryService.findCountry(id);
  }

  get countryView(): CountryView {
    return this.entryView;
  }
}
