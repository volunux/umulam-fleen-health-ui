import {Injectable} from '@angular/core';
import {RouterStateSnapshot, TitleStrategy} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class TemplatePageTitleStrategy extends TitleStrategy {

  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(snapshot: RouterStateSnapshot) {
    const title: string | undefined = this.buildTitle(snapshot);
    if (title !== undefined) {
      this.title.setTitle(`Fleen Health | ${title}`);
    }
  }
}
