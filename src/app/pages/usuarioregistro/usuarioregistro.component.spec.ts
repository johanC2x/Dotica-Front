import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioregistroComponent } from './usuarioregistro.component';

describe('UsuarioregistroComponent', () => {
  let component: UsuarioregistroComponent;
  let fixture: ComponentFixture<UsuarioregistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioregistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioregistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
