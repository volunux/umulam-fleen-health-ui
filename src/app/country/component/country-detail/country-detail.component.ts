import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {CountryService} from "../../service/country.service";
import {CountryView} from "../../view/country.view";
import {ErrorResponse} from "../../../base/response/error-response";

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.css']
})
export class CountryDetailComponent implements OnInit {

  public countryView!: CountryView;

  public constructor(private countryService: CountryService,
                     private router: Router,
                     private route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.route.paramMap.subscribe(async (params: ParamMap): Promise<void> => {
      const id: number | string | null | any = params?.get('id');
      if (isNaN(id)) {
        await this.goToEntries();
        return;
      }
      this.getCountry(id);
    });
  }

  protected getCountry(id: number | string): void {
    this.countryService.findCountry(id)
      .subscribe({
        next: (result: CountryView): void => {
          this.countryView = result;
        },
        error: async (error: ErrorResponse): Promise<void> => {
          console.log('Errors');
          console.log(error);
          await this.goToEntries(error.message)
          return;
        }
    });
  }

  protected async goToEntries(errorMessage?: string): Promise<void> {
    const currentUrlSegments: string[] = this.router.url.split('/');
    currentUrlSegments.pop();
    currentUrlSegments.pop();

    console.log('Message is :: ' + errorMessage);

    const newRoute: string = [...currentUrlSegments, 'entries'].join('/');
    await this.router.navigate([newRoute], { state: { error: errorMessage ? errorMessage : '' } })
      .then((m: boolean) => m);
  }
}
