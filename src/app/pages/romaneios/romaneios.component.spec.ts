import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RomaneiosComponent } from './romaneios.component';

describe('RomaneiosComponent', () => {
  let component: RomaneiosComponent;
  let fixture: ComponentFixture<RomaneiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RomaneiosComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(RomaneiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
