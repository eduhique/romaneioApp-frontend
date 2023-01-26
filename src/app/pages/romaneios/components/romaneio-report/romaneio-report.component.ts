/* eslint-disable dot-notation */
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';

import { Romaneio } from '@pages/romaneios/models/romaneio';
import { RomaneioReport } from '@pages/romaneios/models/romaneio-report';
import { RomaneiosService } from '@pages/romaneios/service/romaneios/romaneios.service';

@Component({
  selector: 'romaneio-romaneio-report',
  templateUrl: './romaneio-report.component.html',
  styleUrls: ['./romaneio-report.component.scss']
})
export class RomaneioReportComponent implements OnInit, OnChanges {
  public romaneioReport: RomaneioReport | undefined;

  @Input()
  public romaneio: Romaneio | undefined;

  public loading: boolean;

  constructor(private romaneioService: RomaneiosService) {
    this.loading = false;
  }

  ngOnInit(): void {
    this.getData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['romaneio'] &&
      changes['romaneio'].currentValue !== undefined &&
      Boolean(changes['romaneio'].currentValue)
    ) {
      this.getData();
    }
  }

  getData() {
    if (this.romaneio && this.romaneio.id) {
      this.loading = true;
      this.romaneioService.report(this.romaneio.id).subscribe(response => {
        this.romaneioReport = response;
        this.loading = false;
      });
    }
  }

  getTotals() {
    return this.romaneioReport ? Object.values(this.romaneioReport.totals) : [];
  }
}
