import {Component, OnInit} from '@angular/core';
import {CountryService} from "../../service/country.service";
import {CountryView} from "../../view/country.view";
import {SearchResultView} from "../../../shared/view/search-result.view";
import {ErrorResponse} from "../../../base/response/error-response";
import {AbstractControl, FormBuilder, FormGroup} from "@angular/forms";
import {enumTypeValidator, typeValidator} from "../../../shared/validator/validator";
import {capitalize, getPropsValueAsArray} from "../../../shared/util/helpers";
import {BETWEEN_DATE_TYPE, DATE_TYPE, NO_INPUT_KEY} from "../../../shared/constant/enum-constant";
import {AnyProp} from "../../../shared/type/base";

@Component({
  selector: 'app-country-entries',
  templateUrl: './country-entries.component.html',
  styleUrls: ['./country-entries.component.css']
})
export class CountryEntriesComponent implements OnInit {
  public currentPage: number = 1;
  public pageSize: number = 10;
  public isFirst: boolean | undefined;
  public isLast: boolean | undefined;
  public entries: CountryView[] = [];
  public searchFilter: AnyProp[] = [
    {key: NO_INPUT_KEY, label: ''},
    {key: 'betweenDate', label: 'Between Date', type: BETWEEN_DATE_TYPE},
    {key: 'afterDate', label: 'After Date', type: DATE_TYPE},
    {key: 'beforeDate', label: 'Before Date', type: DATE_TYPE}
  ];
  public isSubmitting = false;
  public searchForm: FormGroup = new FormGroup<any>({});

  public constructor(private countryService: CountryService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchType: ['',
        [enumTypeValidator(getPropsValueAsArray(this.searchFilter, 'key'))]
      ],
      searchInput: ['',
        []
      ],
    }, {
      validators: [typeValidator(['searchType', 'searchInput'], this.searchFilter)]
    });
  }

  public search(): void {
    console.log(this.searchForm.value);
    console.log(this.searchForm.errors);
  }

  private initEntries(): void {
    this.countryService.findCountries()
      .subscribe({
        next: (result: SearchResultView<CountryView>): void => {
          console.log(result);
          this.isFirst = result.isFirst;
          this.isLast = result.isLast;
          this.entries = result.values;
          console.log(this.entries);
        },
        error: (result: ErrorResponse): void => {
          console.log(result);
        },
        complete: (): void => {
          console.log('Done');
        }
    });
  }

  public nextPage(): void {
    if (this.entries && !this.isLast) {
      this.currentPage++;
      this.initEntries();
    }
  }

  public previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.initEntries();
    }
  }

  get searchType(): AbstractControl | null | undefined {
    return this.searchForm.get('searchFilter');
  }

  get searchInput(): AbstractControl | null | undefined {
    return this.searchForm.get('searchInput');
  }

  protected readonly capitalize = capitalize;
}
