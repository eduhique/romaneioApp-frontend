import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimitiveTypeManagementComponent } from './primitive-type-management.component';

describe('PrimitiveTypeManagementComponent', () => {
  let component: PrimitiveTypeManagementComponent;
  let fixture: ComponentFixture<PrimitiveTypeManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrimitiveTypeManagementComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PrimitiveTypeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
