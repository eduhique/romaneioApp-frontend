import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductClientReportsListComponent } from './product-client-reports-list.component';

describe('ProductClientReportsListComponent', () => {
  let component: ProductClientReportsListComponent;
  let fixture: ComponentFixture<ProductClientReportsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductClientReportsListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductClientReportsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
