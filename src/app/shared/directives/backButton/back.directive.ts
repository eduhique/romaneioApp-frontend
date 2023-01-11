import { Directive, HostListener } from '@angular/core';

import { NavigationService } from '@core/services/navigation/navigation.service';

@Directive({
  selector: '[romaneioBack]'
})
export class BackDirective {
  constructor(private navigation: NavigationService) {}

  @HostListener('click')
  onClick(): Promise<boolean> | void {
    return this.navigation.back();
  }
}
