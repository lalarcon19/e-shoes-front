import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorProductsComponent } from './monitor-products.component';

describe('MonitorProductsComponent', () => {
  let component: MonitorProductsComponent;
  let fixture: ComponentFixture<MonitorProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitorProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonitorProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
