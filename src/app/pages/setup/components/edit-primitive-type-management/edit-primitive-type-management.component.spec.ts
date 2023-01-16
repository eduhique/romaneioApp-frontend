import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPrimitiveTypeManagementComponent } from './edit-primitive-type-management.component';

describe('EditPrimitiveTypeManagementComponent', () => {
  let component: EditPrimitiveTypeManagementComponent;
  let fixture: ComponentFixture<EditPrimitiveTypeManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditPrimitiveTypeManagementComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(EditPrimitiveTypeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
