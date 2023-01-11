/* eslint-disable @typescript-eslint/no-explicit-any */
import { Location } from '@angular/common';
import { Injectable, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  ActivatedRoute,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';
import { BehaviorSubject, filter, map, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService implements OnDestroy {
  private history: string[];
  private subscriptions: Subscription[];
  private _loading: BehaviorSubject<boolean>;

  constructor(
    private router: Router,
    private titleService: Title,
    private location: Location
  ) {
    this.history = [];
    this.subscriptions = [];

    this._loading = new BehaviorSubject<boolean>(false);

    this.subscriptions.push(
      this.router.events.subscribe(event => {
        switch (true) {
          case event instanceof NavigationStart: {
            this.sendLoading(true);
            break;
          }
          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof NavigationError: {
            this.sendLoading(false);
            break;
          }
          default: {
            break;
          }
        }
      })
    );

    this.subscriptions.push(
      this.router.events
        .pipe(
          filter((event: any) => event instanceof NavigationEnd),
          map((event: NavigationEnd) => {
            let flag = true;
            let route: ActivatedRoute = this.router.routerState.root;
            let routeTitle = '';
            while (flag) {
              if (route.firstChild) route = route.firstChild;
              else flag = false;
            }
            const { title } = route.snapshot.data;
            if (title && typeof title === 'string') {
              routeTitle = title;
            }
            return { routeTitle, urlAfterRedirects: event.urlAfterRedirects };
          })
        )
        .subscribe(({ routeTitle, urlAfterRedirects }) => {
          if (routeTitle) {
            this.titleService.setTitle(`${routeTitle} - Romaneio App`);
          }
          this.history.push(urlAfterRedirects);
        })
    );
  }

  get loading(): Observable<boolean> {
    return this._loading.asObservable();
  }

  sendLoading(value: boolean): void {
    this._loading.next(value);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  back(): Promise<boolean> | void {
    this.history.pop();
    if (this.history.length > 0) {
      this.location.back();
    } else {
      return this.router.navigate(['/']);
    }
  }
}
