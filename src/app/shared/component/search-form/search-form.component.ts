import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AnyProp} from "../../type/base";
import {AbstractControl, FormBuilder, FormGroup} from "@angular/forms";
import {enumTypeValidator, typeValidator} from "../../validator/validator";
import {createBetweenDateObj, getPropsValueAsArray, isFalsy, propExists} from "../../util/helpers";
import {BETWEEN_DATE_SEARCH_KEY} from "../../constant/enum-constant";
import {SearchDto} from "../../interface/base";
import {SearchFilter, SearchParamDto} from "../../type/authentication";
import {BaseFormComponent} from "../../../base/component/base-form/base-form.component";

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent extends BaseFormComponent implements OnInit {

  public searchParams: AnyProp = {};
  public searchForm: FormGroup = new FormGroup<any>({});
  @Input('is-submitting') public override isSubmitting: boolean = false;
  @Input('search-filter') public searchFilter: SearchFilter[] = [];
  @Output() public searchSubmitted: EventEmitter<SearchDto> = new EventEmitter<SearchDto>();

  public constructor(private formBuilder: FormBuilder) {
    super();
  }

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.searchForm = this.formBuilder.group({
      searchType: ['', [enumTypeValidator(getPropsValueAsArray(this.searchFilter, 'key'))] ],
      searchInput: ['', [] ],
    }, {
      validators: [typeValidator(['searchType', 'searchInput'], this.searchFilter)]
    });
  }

  public search(): void {
    if (this.searchForm.valid && isFalsy(this.isSubmitting)) {
      this.disableSubmitting();
      const { type, value } = this.searchFormValue;
      this.searchParams = {[type]: value};
      this.checkBetweenDateParam();
      this.searchSubmitted.emit({ ...(this.searchParams) });
    }
  }

  get searchType(): AbstractControl | null | undefined {
    return this.searchForm.get('searchType');
  }

  get searchInput(): AbstractControl | null | undefined {
    return this.searchForm.get('searchInput');
  }

  get searchFormValue(): SearchParamDto {
    const type: string = this.searchType?.value;
    const value: string = this.searchInput?.value;
    return { type, value };
  }

  public checkBetweenDateParam(): void {
    if (propExists(this.searchParams, BETWEEN_DATE_SEARCH_KEY)) {
      const twoDates: AnyProp = createBetweenDateObj(this.searchParams[BETWEEN_DATE_SEARCH_KEY]);
      this.searchParams = { ...(this.searchParams), ...twoDates };
    }
  }
}
