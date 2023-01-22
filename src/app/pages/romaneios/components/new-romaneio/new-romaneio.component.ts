import { Component, EventEmitter, Input, Output } from '@angular/core';

import { SelectItem } from 'primeng/api';

import { Romaneio } from '@pages/romaneios/models/romaneio';
import { RomaneioStatus } from '@pages/romaneios/models/romaneio-status';

@Component({
  selector: 'romaneio-new-romaneio',
  templateUrl: './new-romaneio.component.html',
  styleUrls: ['./new-romaneio.component.scss']
})
export class NewRomaneioComponent {
  @Input()
  public action: string;

  @Input()
  public modal: boolean;

  public submitted: boolean;

  @Input()
  public romaneio: Romaneio;

  @Output()
  public closeModal: EventEmitter<void>;

  @Output()
  public sendRomaneio: EventEmitter<Romaneio>;

  public types: SelectItem[];

  constructor() {
    this.modal = false;
    this.submitted = false;
    this.action = '';
    this.romaneio = {};

    this.closeModal = new EventEmitter<void>();
    this.sendRomaneio = new EventEmitter<Romaneio>();

    this.types = [{ label: 'Criado', value: RomaneioStatus.CRIADO }];
  }

  hiddenModal() {
    this.closeModal.emit();
  }

  submitRomaneio() {
    this.submitted = true;
    if (this.isValid()) {
      this.romaneio.name = this.romaneio.name?.trim();

      this.sendRomaneio.emit(this.romaneio);
    }
  }

  isValid() {
    return (
      this.romaneio.name !== undefined && this.romaneio.name?.trim().length > 0
    );
  }
}
