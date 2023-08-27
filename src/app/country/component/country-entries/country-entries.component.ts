import {Component, OnInit} from '@angular/core';
import {CountryService} from "../../service/country.service";
import {CountryView} from "../../view/country.view";
import {AnyProp} from "../../../shared/type/base";
import {ActivatedRoute, Router} from "@angular/router";
import {BaseEntriesComponent} from "../../../base/component/base-entries/base-entries.component";
import {SearchResultView} from "../../../shared/view/search-result.view";
import {Observable} from "rxjs";
import {DeleteIdsDto} from "../../../shared/type/other";
import {DeleteResponse} from "../../../shared/response/delete.response";
import {SEARCH_FILTER_BETWEEN_DATE} from "../../../shared/constant/search-filter";
import {SearchFilter} from "../../../shared/type/search";
import {Location} from "@angular/common";

@Component({
  selector: 'app-country-entries',
  templateUrl: './country-entries.component.html',
  styleUrls: ['./country-entries.component.css']
})
export class CountryEntriesComponent extends BaseEntriesComponent<CountryView> implements OnInit {

  public override entries: CountryView[] = [];
  public override searchFilter: SearchFilter[] = SEARCH_FILTER_BETWEEN_DATE;

  public constructor(protected countryService: CountryService,
                     router: Router,
                     route: ActivatedRoute, location: Location) {
    super(router, route, location);
  }

  ngOnInit(): void {
    this.startComponent();
  }

  override findEntries(params: AnyProp): Observable<SearchResultView<CountryView>> {
    return this.countryService.findCountries(params);
  }

  override deleteEntries(dto: DeleteIdsDto): Observable<DeleteResponse> {
    return this.countryService.deleteCountries(dto);
  }
}
