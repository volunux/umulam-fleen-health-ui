import {Component, OnInit} from '@angular/core';
import {CountryService} from "../../service/country.service";
import {CountryView} from "../../view/country.view";
import {SearchResultView} from "../../../shared/view/search-result.view";
import {ErrorResponse} from "../../../base/response/error-response";

@Component({
  selector: 'app-country-entries',
  templateUrl: './country-entries.component.html',
  styleUrls: ['./country-entries.component.css']
})
export class CountryEntriesComponent implements OnInit {

  private entries: CountryView[] = [];

  public constructor(private countryService: CountryService) { }

  ngOnInit(): void {
    this.countryService.findCountries()
      .subscribe({
        next: (result: SearchResultView<CountryView>): void => {
          console.log(result);
        },
        error: (result: ErrorResponse): void => {
          console.log(result);
        },
        complete: (): void => {
          console.log('Done');
        }
      })
  }
}
