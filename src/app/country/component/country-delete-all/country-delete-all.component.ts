import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {DeleteResponse} from "../../../shared/response/delete.response";
import {
  BaseEntriesDeleteAllComponent
} from "../../../base/component/base-entries-delete-all/base-entries-delete-all.component";
import {CountryService} from "../../service/country.service";
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {CountAllResponse} from "../../../shared/response/count-all.response";

@Component({
  selector: 'app-country-delete-all',
  templateUrl: './country-delete-all.component.html',
  styleUrls: ['./country-delete-all.component.css']
})
export class CountryDeleteAllComponent extends BaseEntriesDeleteAllComponent implements OnInit {

  public constructor(private countryService: CountryService,
                     protected formBuilder: FormBuilder,
                     private router: Router) {
    super();
  }

  public ngOnInit(): void {
    this.countAll();
  }

  protected override serviceCountAll(): Observable<CountAllResponse> {
    return this.countryService.countAllCountries();
  }

  protected override serviceDeleteAll(): Observable<DeleteResponse> {
    return this.countryService.deleteAllCountries();
  }

  override getRouter(): Router {
    return this.router;
  }

}
