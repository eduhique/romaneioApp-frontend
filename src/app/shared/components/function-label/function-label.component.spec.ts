import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionLabelComponent } from './function-label.component';

describe('FunctionLabelComponent', () => {
  let component: FunctionLabelComponent;
  let fixture: ComponentFixture<FunctionLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FunctionLabelComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FunctionLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
