import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
  standalone: true,
  imports: [CommonModule, ButtonModule, RippleModule],
  templateUrl: './internal-error.component.html',
  styleUrls: ['./internal-error.component.scss']
})
export class InternalErrorComponent {
  constructor(private router: Router) {}

  home(): Promise<boolean> {
    return this.router.navigate(['/']);
  }
}
