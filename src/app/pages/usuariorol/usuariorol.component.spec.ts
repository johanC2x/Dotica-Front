import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariorolComponent } from './usuariorol.component';

describe('UsuariorolComponent', () => {
  let component: UsuariorolComponent;
  let fixture: ComponentFixture<UsuariorolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuariorolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariorolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
