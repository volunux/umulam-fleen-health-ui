import {Component, OnInit} from '@angular/core';
import {CountryService} from "../../service/country.service";
import {CountryView} from "../../view/country.view";
import {
  BETWEEN_DATE_SEARCH_KEY,
  BETWEEN_DATE_TYPE,
  DATE_TYPE,
  NO_INPUT_KEY
} from "../../../shared/constant/enum-constant";
import {AnyProp} from "../../../shared/type/base";
import {ActivatedRoute, Router} from "@angular/router";
import {BaseEntriesComponent} from "../../../shared/component/base-entries/base-entries.component";
import {SearchResultView} from "../../../shared/view/search-result.view";
import {Observable} from "rxjs";
import {SearchFilter} from "../../../shared/type/authentication";

@Component({
  selector: 'app-country-entries',
  templateUrl: './country-entries.component.html',
  styleUrls: ['./country-entries.component.css']
})
export class CountryEntriesComponent extends BaseEntriesComponent<CountryView> implements OnInit {

  public override entries: CountryView[] = [];
  public override searchFilter: SearchFilter[] = [
    {key: NO_INPUT_KEY, label: ''},
    {key: BETWEEN_DATE_SEARCH_KEY, label: 'Between Date', type: BETWEEN_DATE_TYPE},
    {key: 'afterDate', label: 'After Date', type: DATE_TYPE},
    {key: 'beforeDate', label: 'Before Date', type: DATE_TYPE}
  ];

  public constructor(private countryService: CountryService,
                     router: Router,
                     route: ActivatedRoute) {
    super(router, route);
  }

  ngOnInit(): void { }

  override findEntries(params: AnyProp): Observable<SearchResultView<CountryView>> {
    return this.countryService.findCountries(params);
  }


}
