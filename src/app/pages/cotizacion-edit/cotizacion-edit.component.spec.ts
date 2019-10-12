import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CotizacionEditComponent } from './cotizacion-edit.component';

describe('CotizacionEditComponent', () => {
  let component: CotizacionEditComponent;
  let fixture: ComponentFixture<CotizacionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CotizacionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CotizacionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
