import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRomaneioComponent } from './new-romaneio.component';

describe('NewRomaneioComponent', () => {
  let component: NewRomaneioComponent;
  let fixture: ComponentFixture<NewRomaneioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewRomaneioComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NewRomaneioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
