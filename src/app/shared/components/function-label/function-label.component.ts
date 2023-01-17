import { Component, Input } from '@angular/core';

import { FunctionEnum } from '@pages/setup/models/function';

@Component({
  selector: 'romaneio-function-label',
  templateUrl: './function-label.component.html',
  styleUrls: ['./function-label.component.scss']
})
export class FunctionLabelComponent {
  @Input()
  public label!: FunctionEnum | string;

  getTag(): string {
    return this.label;
  }
}
