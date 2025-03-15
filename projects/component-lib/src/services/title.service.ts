import {Injectable} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {filter, map, mergeMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClTitleService {

  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private _title: Title) {
  }

  init(appTitle: string, separator: string) {
    this._router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this._activatedRoute),
      map((route) => {
        while (route.firstChild) {
          route = route.firstChild;
        };

        return route;
      }),
      filter((route) => route.outlet === 'primary'),
      mergeMap((route) => route.data),
    ).subscribe((event) => this._title.setTitle(appTitle + (event['title'] ? separator + event['title'] : '')));
  }
}
