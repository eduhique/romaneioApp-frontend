import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPrimitiveTypeManagementComponent } from './new-primitive-type-management.component';

describe('NewPrimitiveTypeManagementComponent', () => {
  let component: NewPrimitiveTypeManagementComponent;
  let fixture: ComponentFixture<NewPrimitiveTypeManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewPrimitiveTypeManagementComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NewPrimitiveTypeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
