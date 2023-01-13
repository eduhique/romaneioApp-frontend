import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthorizationService } from '@core/services/authorization/authorization.service';
import { NavigationService } from '@core/services/navigation/navigation.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public username: string;
  public password: string;

  constructor(
    private authorizationService: AuthorizationService,
    private navigationService: NavigationService,
    private router: Router
  ) {
    this.username = '';
    this.password = '';
  }

  isValid(): boolean {
    return (
      this.username !== null &&
      this.password !== null &&
      this.username.length > 0 &&
      this.password.length > 0
    );
  }

  signIn(): void {
    if (this.isValid()) {
      this.navigationService.sendLoading(true);
      this.authorizationService.signIn(this.username, this.password).subscribe({
        next: () => {
          this.navigationService.sendLoading(false);
          this.router.navigate(['dashboard']);
        },
        error: () => {
          this.navigationService.sendLoading(false);
        }
      });
    }
  }

  handleKey(event: KeyboardEvent) {
    if (
      (event.code === 'Enter' || event.code === 'NumpadEnter') &&
      this.isValid()
    ) {
      this.signIn();
    }
  }

  ngOnInit(): void {
    this.authorizationService.isAuthenticated().subscribe(res => {
      if (typeof res === 'boolean' && res) this.router.navigate(['dashboard']);
    });
  }
}
