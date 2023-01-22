import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RomaneioReportComponent } from './romaneio-report.component';

describe('RomaneioReportComponent', () => {
  let component: RomaneioReportComponent;
  let fixture: ComponentFixture<RomaneioReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RomaneioReportComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(RomaneioReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
