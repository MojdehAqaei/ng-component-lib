import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterLink, RouterModule} from '@angular/router';
import {distinctUntilChanged, filter} from 'rxjs/operators';
import {CommonModule} from "@angular/common";
import {ClBreadcrumb} from "@sadad/component-lib/src/models";


@Component({
  selector: 'cl-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './breadcrumb.component.html',
})
export class ClBreadcrumbComponent implements OnInit {

  public breadcrumbs: ClBreadcrumb[] = [];

  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this._router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd),
      distinctUntilChanged(),
    ).subscribe(() => {
      this.breadcrumbs = this.buildBreadCrumb(this._activatedRoute.root);
    })
  }

  buildBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: ClBreadcrumb[] = []): ClBreadcrumb[] {
    const children: ActivatedRoute[] = route.children;
    if (children.length === 0) {
      return breadcrumbs;
    }


    children.forEach(child => {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const breadcrumb: ClBreadcrumb = {
        label: child.snapshot.data['breadcrumb'], url: url
      };
      if (breadcrumb.label !== '') {
        breadcrumbs.push(breadcrumb);
      }

      this.buildBreadCrumb(child, url, breadcrumbs);
    });

    return breadcrumbs;
  }
}
