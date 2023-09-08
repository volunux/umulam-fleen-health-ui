import {NgModule} from '@angular/core';
import {CapitalizePipe} from "./pipe/capitalize.pipe";
import {LocalStorageService} from "./service/local-storage.service";
import {SessionStorageService} from "./service/session-storage.service";
import {JwtService} from "./service/jwt.service";
import {LoggerService} from "./service/logger.service";
import {AuthGuard} from "./guard/auth.guard";
import {AuthenticationService} from "../authentication/service/authentication.service";


@NgModule({
  declarations: [
    CapitalizePipe
  ],
  providers: [
    AuthenticationService,
    LocalStorageService,
    SessionStorageService,
    JwtService,
    LoggerService,
    AuthGuard,
  ]
})
export class FleenHealthBaseModule { }
