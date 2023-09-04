import {Component} from '@angular/core';
import {AuthenticationService} from "./authentication/service/authentication.service";
import {BASE_PATH} from "./shared/constant/base-config";
import {Router} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public constructor(protected authenticationService: AuthenticationService,
                     protected router: Router) { }

  get isAuthenticated(): boolean {
    return this.authenticationService.isAuthenticationStatusCompleted();
  }

  public async logout(): Promise<void> {
    this.authenticationService.clearAuthTokens();
    await this.goHome();
  }

  protected async goHome(): Promise<void> {
    await this.getRouter().navigate([BASE_PATH]);
  }

  protected getRouter(): Router {
    return this.router;
  }

}
