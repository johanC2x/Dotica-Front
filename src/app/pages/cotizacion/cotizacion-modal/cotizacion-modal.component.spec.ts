import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizacionModalComponent } from './cotizacion-modal.component';

describe('CotizacionModalComponent', () => {
  let component: CotizacionModalComponent;
  let fixture: ComponentFixture<CotizacionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CotizacionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CotizacionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
