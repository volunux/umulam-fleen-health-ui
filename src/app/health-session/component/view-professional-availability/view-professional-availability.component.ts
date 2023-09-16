import {Component, OnInit} from '@angular/core';
import {BaseDetailComponent} from "../../../base/component/base-detail/base-detail.component";
import {ProfessionalCheckAvailabilityResponse} from "../../response/professional-check-availability.response";
import {HealthSessionService} from "../../service/health-session.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-view-professional-availability',
  templateUrl: './view-professional-availability.component.html',
  styleUrls: ['./view-professional-availability.component.css']
})
export class ViewProfessionalAvailabilityComponent extends BaseDetailComponent<ProfessionalCheckAvailabilityResponse> implements OnInit  {

  public override entryView!: ProfessionalCheckAvailabilityResponse;
  protected override formBuilder;

  public constructor(private healthSessionService: HealthSessionService,
                     router: Router,
                     route: ActivatedRoute) {
    super(router, route);
  }

  public ngOnInit(): void {
    this.initEntry();
  }

  protected override getServiceEntry(id: number | string): Observable<ProfessionalCheckAvailabilityResponse> {
    return this.healthSessionService.viewProfessionalAvailability(id);
  }

  get professionalCheckAvailabilityView(): ProfessionalCheckAvailabilityResponse {
    return this.entryView;
  }
}
