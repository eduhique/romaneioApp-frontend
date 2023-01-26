/* eslint-disable dot-notation */
import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';

import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

import { PaginatorParams } from '@core/models/paginator-params';

import { defaultParams, paramGenerate } from '@shared/utils/helper';

import { Romaneio } from '@pages/romaneios/models/romaneio';
import { RomaneiosService } from '@pages/romaneios/service/romaneios/romaneios.service';

@Component({
  selector: 'romaneio-romaneio-list',
  templateUrl: './romaneio-list.component.html',
  styleUrls: ['./romaneio-list.component.scss']
})
export class RomaneioListComponent implements OnInit, OnChanges {
  @ViewChild('table')
  table!: Table;

  @Input()
  public modal: boolean;

  @Input()
  public selectedRomaneio: Romaneio | undefined;

  @Output()
  public closeModal: EventEmitter<void>;

  @Output()
  public romaneioSelection: EventEmitter<Romaneio>;

  public searchParam: string;
  public lastSearchParam: string;

  public romaneios: Romaneio[];

  public isLoading: boolean;
  public qtdRegistros: number;

  private lastLazyLoad!: LazyLoadEvent;
  private pageParams: PaginatorParams;

  constructor(
    private romaneiosService: RomaneiosService,
    private messageService: MessageService
  ) {
    this.modal = false;

    this.isLoading = false;
    this.qtdRegistros = 0;

    this.closeModal = new EventEmitter<void>();

    this.romaneioSelection = new EventEmitter<Romaneio>();

    this.searchParam = '';
    this.lastSearchParam = '';

    this.romaneios = [];

    this.pageParams = defaultParams();
    this.pageParams.order = 'active';
  }

  ngOnInit(): void {
    this.pageParams = defaultParams();
    this.pageParams.order = 'active';
    this.getData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['modal'] &&
      changes['modal'].currentValue !== undefined &&
      Boolean(changes['modal'].currentValue)
    ) {
      this.searchParam = '';
      this.lastSearchParam = '';
      this.pageParams = defaultParams();
      this.pageParams.order = 'active';
      this.getData();
    }
  }

  hiddenModal() {
    this.closeModal.emit();
  }

  getSelectionLabel() {
    return this.selectedRomaneio &&
      this.selectedRomaneio.id &&
      this.selectedRomaneio.name
      ? `${this.selectedRomaneio.id} - ${this.selectedRomaneio.name}`
      : '';
  }

  search() {
    if (this.searchParam && this.searchParam !== this.lastSearchParam) {
      this.pageParams.filter = { name: this.searchParam };
      this.lastSearchParam = this.searchParam;
      this.getData();
    }
  }

  isCleanable() {
    return !(
      this.pageParams.filter !== undefined &&
      this.pageParams.filter['name'] !== undefined
    );
  }

  clear() {
    if (!this.isCleanable()) {
      this.pageParams.filter = {};
      this.searchParam = '';
      this.lastSearchParam = '';
      this.getData();
    }
  }

  onChange(event: LazyLoadEvent): void {
    if (this.lastLazyLoad) {
      if (
        event.first !== undefined &&
        event.rows !== undefined &&
        event.first !== this.lastLazyLoad.first
      ) {
        this.pageParams.page = event.first / event.rows;
      }
      if (event.rows !== this.lastLazyLoad.rows) {
        this.table.first = this.pageParams.page = event.first = 0;
        this.pageParams.size = event.rows;
      }
      if (
        event.sortField !== this.lastLazyLoad.sortField ||
        event.sortOrder !== this.lastLazyLoad.sortOrder
      ) {
        this.pageParams.order = event.sortField;

        if (event.sortOrder === 1) {
          this.pageParams.direction = 'asc';
        }
        if (event.sortOrder === -1) {
          this.pageParams.direction = 'desc';
        }
      }
      this.getData();
    }
    this.lastLazyLoad = event;
  }

  handleKey(event: KeyboardEvent) {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      this.search();
    }
  }

  onSelect() {
    this.romaneioSelection.emit(this.selectedRomaneio);
  }

  private getData(): void {
    this.isLoading = true;
    this.romaneiosService.getAll(paramGenerate(this.pageParams)).subscribe({
      next: response => {
        this.romaneios = response.data;
        this.qtdRegistros = response.totalElements;

        if (
          this.table &&
          this.pageParams.page !== undefined &&
          this.pageParams.size !== undefined
        ) {
          this.table.first = this.pageParams.page * this.pageParams.size;
        }

        if (
          this.lastLazyLoad &&
          this.pageParams.page !== undefined &&
          this.pageParams.size !== undefined
        ) {
          this.lastLazyLoad.first = this.pageParams.page * this.pageParams.size;
        }
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.handleNotification(
          'error',
          `${error.status} - ${error.statusText}`,
          error.message
        );
        this.isLoading = false;
      }
    });
  }

  private handleNotification(
    type: 'success' | 'info' | 'warn' | 'error',
    title: string,
    detail: string | undefined
  ): void {
    this.messageService.add({ severity: type, summary: title, detail });
  }
}
