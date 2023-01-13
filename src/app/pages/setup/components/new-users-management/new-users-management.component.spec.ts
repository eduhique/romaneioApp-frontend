import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUsersManagementComponent } from './new-users-management.component';

describe('NewUsersManagementComponent', () => {
  let component: NewUsersManagementComponent;
  let fixture: ComponentFixture<NewUsersManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewUsersManagementComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NewUsersManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
