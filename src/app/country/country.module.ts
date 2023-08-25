import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CountryBaseComponent} from './component/country-base/country-base.component';
import {CountryEntriesComponent} from './component/country-entries/country-entries.component';
import {CountryAddComponent} from './component/country-add/country-add.component';
import {CountryUpdateComponent} from './component/country-update/country-update.component';
import {CountryDetailComponent} from './component/country-detail/country-detail.component';
import {CountryDeleteAllComponent} from './component/country-delete-all/country-delete-all.component';
import {CountryRoutingModule} from "./routing/country-routing.module";
import { CountryDashboardComponent } from './component/country-dashboard/country-dashboard.component';


@NgModule({
  declarations: [
    CountryBaseComponent,
    CountryEntriesComponent,
    CountryAddComponent,
    CountryUpdateComponent,
    CountryDetailComponent,
    CountryDeleteAllComponent,
    CountryDashboardComponent
  ],
  imports: [
    CommonModule,
    CountryRoutingModule
  ]
})
export class CountryModule { }
