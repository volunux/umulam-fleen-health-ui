import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "../base/guard/auth.guard";
import {MemberBaseComponent} from "./component/member-base/member-base.component";
import {MemberDashboardComponent} from "./component/member-dashboard/member-dashboard.component";
import {MemberDetailComponent} from "./component/member-detail/member-detail.component";
import {MemberUpdateComponent} from "./component/member-update/member-update.component";
import {
  MemberUpdateEmailPhoneComponent
} from "./component/member-update-email-phone/member-update-email-phone.component";
import {
  MemberUpdateProfilePhotoComponent
} from "./component/member-update-profile-photo/member-update-profile-photo.component";
import {MemberUpdatePasswordComponent} from "./component/member-update-password/member-update-password.component";

const routes: Routes = [
  { path: '',
    canActivate: [AuthGuard],
    component: MemberBaseComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: MemberDashboardComponent, title: 'Profile Dashboard' },
      { path: 'get-detail', component: MemberDetailComponent, title: 'Profile Detail' },
      { path: 'update-detail', component: MemberUpdateComponent, title: 'Profile Update' },
      { path: 'update-email-phone', component: MemberUpdateEmailPhoneComponent, title: 'Update Email & Phone' },
      { path: 'update-profile-photo', component: MemberUpdateProfilePhotoComponent, title: 'Update Profile Photo' },
      { path: 'update-password', component: MemberUpdatePasswordComponent, title: 'Update Password' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
