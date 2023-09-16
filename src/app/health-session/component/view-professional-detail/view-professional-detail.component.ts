import {Component, OnInit} from '@angular/core';
import {BaseDetailComponent} from "../../../base/component/base-detail/base-detail.component";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {HealthSessionService} from "../../service/health-session.service";
import {ProfessionalView} from "../../../professional/view/professional.view";

@Component({
  selector: 'app-view-professional-detail',
  templateUrl: './view-professional-detail.component.html',
  styleUrls: ['./view-professional-detail.component.css']
})
export class ViewProfessionalDetailComponent  extends BaseDetailComponent<ProfessionalView> implements OnInit {

  public override entryView!: ProfessionalView;
  protected override formBuilder;

  public constructor(private healthSessionService: HealthSessionService,
                     router: Router,
                     route: ActivatedRoute) {
    super(router, route);
  }

  public ngOnInit(): void {
    this.initEntry();
  }

  protected override getServiceEntry(id: number | string): Observable<ProfessionalView> {
    return this.healthSessionService.viewProfessionalDetail(id);
  }

  get professionalView(): ProfessionalView {
    return this.entryView;
  }
}
