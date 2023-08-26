import {Component, OnInit} from '@angular/core';
import {CountryService} from "../../service/country.service";
import {CountryView} from "../../view/country.view";
import {SearchResultView} from "../../../shared/view/search-result.view";
import {ErrorResponse} from "../../../base/response/error-response";
import {AbstractControl, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {enumTypeValidator, typeValidator} from "../../../shared/validator/validator";
import {capitalize, createBetweenDateObj, getPropsValueAsArray, propExists} from "../../../shared/util/helpers";
import {
  BETWEEN_DATE_SEARCH_KEY,
  BETWEEN_DATE_TYPE,
  DATE_TYPE,
  NO_INPUT_KEY
} from "../../../shared/constant/enum-constant";
import {AnyProp} from "../../../shared/type/base";
import {DEFAULT_PAGE_SIZE} from "../../../shared/constant/other-constant";

@Component({
  selector: 'app-country-entries',
  templateUrl: './country-entries.component.html',
  styleUrls: ['./country-entries.component.css']
})
export class CountryEntriesComponent implements OnInit {
  public currentPage: number = 0;
  public pageSize: number = DEFAULT_PAGE_SIZE;
  public isFirst: boolean | undefined;
  public isLast: boolean | undefined;
  public entries: CountryView[] = [];
  public searchFilter: AnyProp[] = [
    {key: NO_INPUT_KEY, label: ''},
    {key: BETWEEN_DATE_SEARCH_KEY, label: 'Between Date', type: BETWEEN_DATE_TYPE},
    {key: 'afterDate', label: 'After Date', type: DATE_TYPE},
    {key: 'beforeDate', label: 'Before Date', type: DATE_TYPE}
  ];
  public isSubmitting: boolean = false;
  public searchForm: FormGroup = new FormGroup<any>({});
  public searchParams: AnyProp = {};

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
    if (this.searchForm.valid) {
      const typeValue: string = ((<FormControl>this.searchType).value);
      const inputValue: string = this.searchInput?.value;
      let searchParams: AnyProp = { [typeValue]: inputValue };
      this.searchParams = searchParams;
      if (propExists(searchParams, BETWEEN_DATE_SEARCH_KEY)) {
        const twoDates: AnyProp = createBetweenDateObj(searchParams[BETWEEN_DATE_SEARCH_KEY]);
        this.searchParams = { ...searchParams, ...twoDates };
      }
      this.getEntries();
    }
  }

  private getEntries(): void {
    console.log("This are params");
    const params = this.prepareSearchParams();
    console.log(params);
    this.countryService.findCountries(params)
      .subscribe({
        next: (result: SearchResultView<CountryView>): void => {
          console.log(result);
          this.isFirst = result.isFirst;
          this.isLast = result.isLast;
          this.entries = result.values;
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
      this.getEntries();
    }
  }

  public previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getEntries();
    }
  }

  get searchType(): AbstractControl | null | undefined {
    return this.searchForm.get('searchType');
  }

  get searchInput(): AbstractControl | null | undefined {
    return this.searchForm.get('searchInput');
  }

  private getPaginationDetails(): AnyProp {
    return {
      pageNo: this.currentPage,
      pageSize: this.pageSize
    }
  }

  private prepareSearchParams(): AnyProp {
    return {
      ...(this.searchParams),
      ...(this.getPaginationDetails())
    }
  }

  protected readonly capitalize = capitalize;
}
