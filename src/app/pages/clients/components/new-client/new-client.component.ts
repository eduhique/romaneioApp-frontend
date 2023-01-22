/* eslint-disable dot-notation */
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { SelectItem } from 'primeng/api';

import { Client } from '@pages/clients/models/client';
import { ClientType } from '@pages/clients/models/client-type';

@Component({
  selector: 'romaneio-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.scss']
})
export class NewClientComponent {
  @Input()
  public action: string;

  @Input()
  public modal: boolean;

  public submitted: boolean;

  @Input()
  public client: Client;

  @Output()
  public closeModal: EventEmitter<void>;

  @Output()
  public sendClient: EventEmitter<Client>;

  public clientTypes: SelectItem[];

  constructor() {
    this.modal = false;
    this.submitted = false;
    this.action = '';
    this.client = {};

    this.closeModal = new EventEmitter<void>();
    this.sendClient = new EventEmitter<Client>();

    this.clientTypes = [
      { label: 'Varejo', value: ClientType.VAREJO },
      {
        label: 'Atacado',
        value: ClientType.ATACADO
      },
      { label: 'Outros', value: ClientType.OUTROS }
    ];
  }

  hiddenModal() {
    this.closeModal.emit();
  }

  submitClient() {
    this.submitted = true;
    if (this.isValid()) {
      this.client.name = this.client.name?.trim();
      this.client.district = this.client.district?.trim();

      this.sendClient.emit(this.client);
    }
  }

  isValid() {
    const name =
      this.client.name !== undefined && this.client.name?.trim().length > 0;
    const district =
      this.client.district !== undefined &&
      this.client.district?.trim().length > 0;
    const type = this.client.clientType !== undefined;

    return name && district && type;
  }
}
