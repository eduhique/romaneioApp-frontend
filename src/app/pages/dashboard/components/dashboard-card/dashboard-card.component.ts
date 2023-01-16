import { Component, Input } from '@angular/core';

@Component({
  selector: 'romaneio-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss']
})
export class DashboardCardComponent {
  @Input()
  public icon: string;

  @Input()
  public title: string;

  @Input()
  public subtitle: string;

  @Input()
  public disabled: boolean;

  @Input()
  public link: string;

  constructor() {
    this.icon = '';
    this.title = '';
    this.subtitle = '';
    this.disabled = true;
    this.link = '';
  }
}
