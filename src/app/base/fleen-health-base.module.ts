import {NgModule} from '@angular/core';
import {LocalStorageService} from "./service/local-storage.service";
import {SessionStorageService} from "./service/session-storage.service";
import {JwtService} from "./service/jwt.service";
import {LoggerService} from "./service/logger.service";
import {AuthGuard} from "./guard/auth.guard";
import {AuthenticationService} from "../authentication/service/authentication.service";


@NgModule({
  declarations: [

  ],
  providers: [
    AuthenticationService,
    LocalStorageService,
    SessionStorageService,
    JwtService,
    LoggerService,
    AuthGuard,
  ],
})
export class FleenHealthBaseModule { }
