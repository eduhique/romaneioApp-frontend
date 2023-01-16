import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUsersManagementComponent } from './edit-users-management.component';

describe('EditUsersManagementComponent', () => {
  let component: EditUsersManagementComponent;
  let fixture: ComponentFixture<EditUsersManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditUsersManagementComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(EditUsersManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
