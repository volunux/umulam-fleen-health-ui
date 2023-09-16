import {Component, OnInit} from '@angular/core';
import {BaseEntriesComponent} from "../../../base/component/base-entries/base-entries.component";
import {ProfessionalView} from "../../../professional/view/professional.view";
import {SearchFilter} from "../../../shared/type/search";
import {SEARCH_FILTER_VIEW_PROFESSIONALS} from "../../../shared/constant/search-filter";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {HealthSessionService} from "../../service/health-session.service";
import {AnyProp} from "../../../shared/type/base";
import {Observable, of} from "rxjs";
import {SearchResultView} from "../../../shared/view/search-result.view";
import {DeleteIdsDto} from "../../../shared/type/other";
import {DeleteResponse} from "../../../shared/response/delete.response";
import {ANY_EMPTY} from "../../../shared/constant/other-constant";
import {isTruthy} from "../../../shared/util/helpers";

@Component({
  selector: 'app-view-professionals',
  templateUrl: './view-professionals.component.html',
  styleUrls: ['./view-professionals.component.css']
})
export class ViewProfessionalsComponent extends BaseEntriesComponent<ProfessionalView> implements OnInit {

  public override entries: ProfessionalView[] = [];
  public override searchFilter: SearchFilter[] = SEARCH_FILTER_VIEW_PROFESSIONALS;

  public constructor(protected healthSessionService: HealthSessionService,
                     router: Router,
                     route: ActivatedRoute, location: Location) {
    super(router, route, location);
  }

  public ngOnInit(): void {
    this.startComponent();
  }

  override findEntries(params: AnyProp): Observable<SearchResultView<ProfessionalView>> {
    return this.healthSessionService.viewProfessionals(params);
  }

  override deleteEntries(dto: DeleteIdsDto): Observable<DeleteResponse> {
    return of(ANY_EMPTY);
  }

  get professionals(): ProfessionalView[] {
    return this.entries;
  }

  public override async viewDetail(id: number | string | undefined): Promise<void> {
    if (isTruthy(id)) {
      await this.router.navigate(['..', 'view-professional-detail', id], {relativeTo: this.route});
    }
  }

}
