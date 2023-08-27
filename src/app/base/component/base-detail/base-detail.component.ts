import {ActivatedRoute, Router} from "@angular/router";
import {BaseUpdateComponent} from "../base-update/base-update.component";
import {Observable, of} from "rxjs";
import {ANY_EMPTY} from "../../../shared/constant/other-constant";

export abstract class BaseDetailComponent<T> extends BaseUpdateComponent<T, any> {

  protected constructor(router: Router,
                        route: ActivatedRoute) {
    super(router, route);
  }

  protected override initForm(): void { }

  protected override $updateEntry(id: string | number, dto: any): Observable<T> {
    return of(ANY_EMPTY);
  }

}
