import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthorizationService } from '@core/services/authorization/authorization.service';
import { NavigationService } from '@core/services/navigation/navigation.service';

import { RomaneiosService } from '@pages/romaneios/service/romaneios/romaneios.service';

@Component({
  selector: 'romaneio-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public loading: boolean;
  public authenticated: boolean;
  private subscriptions: Subscription[];

  constructor(
    private navigationService: NavigationService,
    private authorizationService: AuthorizationService,
    private romaneioService: RomaneiosService
  ) {
    this.loading = false;
    this.authenticated = false;
    this.subscriptions = [];
  }

  ngOnInit() {
    this.subscriptions.push(
      this.navigationService.loading.subscribe(
        isLoading => (this.loading = isLoading)
      )
    );
    this.subscriptions.push(
      this.authorizationService.auth.subscribe(
        isAuthenticated => (this.authenticated = isAuthenticated)
      )
    );

    this.romaneioService.findActive().subscribe({
      error: () => localStorage.removeItem('romaneio')
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
