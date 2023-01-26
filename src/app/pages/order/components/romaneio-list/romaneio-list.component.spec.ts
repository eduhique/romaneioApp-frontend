import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RomaneioListComponent } from './romaneio-list.component';

describe('RomaneioListComponent', () => {
  let component: RomaneioListComponent;
  let fixture: ComponentFixture<RomaneioListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RomaneioListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(RomaneioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
