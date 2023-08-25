import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {CountryAddComponent} from "../component/country-add/country-add.component";
import {CountryEntriesComponent} from "../component/country-entries/country-entries.component";
import {CountryUpdateComponent} from "../component/country-update/country-update.component";
import {CountryDetailComponent} from "../component/country-detail/country-detail.component";
import {CountryDeleteAllComponent} from "../component/country-delete-all/country-delete-all.component";
import {CountryBaseComponent} from "../component/country-base/country-base.component";

const routes: Routes = [
  { path: '', component: CountryBaseComponent, title: 'Country' },
  { path: "entries", component: CountryEntriesComponent, title: 'Entries Country' },
  { path: "add", component: CountryAddComponent, title: 'Add Country' },
  { path: "update/:id", component: CountryUpdateComponent, title: 'Country Update' },
  { path: "detail/:id", component: CountryDetailComponent, title: 'Country Detail' },
  { path: "delete-all", component: CountryDeleteAllComponent, title: 'Country Delete All' },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CountryRoutingModule { }
