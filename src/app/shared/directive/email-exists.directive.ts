import {Directive, HostListener, Input, OnInit} from '@angular/core';
import {ValidateOnBlurDirective} from "./validate-on-blur.directive";
import {catchError, debounceTime, map, Observable, of, switchMap} from "rxjs";
import {AuthenticationService} from "../../authentication/service/authentication.service";
import {isFalsy} from "../util/helpers";
import {NgControl} from "@angular/forms";

@Directive({
  selector: '[appEmailExists]'
})
export class EmailExistsDirective extends ValidateOnBlurDirective implements OnInit {

  @Input() appEmailExists!: NgControl | any;

  constructor(private service: AuthenticationService) {
    super();
  }

  ngOnInit() {
    console.log(this.service);
    console.log(this.appValidateOnBlur);
    if (this.appEmailExists) {
      this.appValidateOnBlur = this.appEmailExists;
    }
  }

  override entityExists(emailAddress: string): Observable<any> {
    return of(emailAddress).pipe(
      debounceTime(3000),
      map(value => value.trim()),
      map(value => isFalsy(value) ? null : value),
      switchMap(value => {
        if (isFalsy(value)) {
          return of(null);
        }
        return this.service.isEmailExists(emailAddress).pipe(
          map(response => (response.exists ? { exists: true } : null)),
          catchError(() => of(null))
        );
      })
    );
  }

}
