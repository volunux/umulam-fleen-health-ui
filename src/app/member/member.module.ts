import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MemberRoutingModule} from './member-routing.module';
import {MemberDetailComponent} from './component/member-detail/member-detail.component';
import {MemberUpdateComponent} from './component/member-update/member-update.component';
import {
  MemberUpdateProfilePhotoComponent
} from './component/member-update-profile-photo/member-update-profile-photo.component';
import {MemberUpdatePasswordComponent} from './component/member-update-password/member-update-password.component';
import {MemberService} from "./service/member.service";
import {MemberBaseComponent} from './component/member-base/member-base.component';
import {MemberDashboardComponent} from './component/member-dashboard/member-dashboard.component';


@NgModule({
  declarations: [
    MemberDetailComponent,
    MemberUpdateComponent,
    MemberUpdateProfilePhotoComponent,
    MemberUpdatePasswordComponent,
    MemberBaseComponent,
    MemberDashboardComponent
  ],
  imports: [
    CommonModule,
    MemberRoutingModule
  ],
  providers: [
    MemberService
  ]
})
export class MemberModule { }
