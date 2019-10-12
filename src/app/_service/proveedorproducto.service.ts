import { HttpClient } from '@angular/common/http';
import { HOST } from './../_shared/var.constants';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Proveedorproducto } from '../_model/proveedorproducto';

@Injectable({
  providedIn: 'root'
})
export class ProveedorproductoService {

  proveedorProductoCambios = new Subject<Proveedorproducto[]>();
  mensajeCambio = new Subject<string>();
  
  url: string = `${HOST}/proveedorProductos`;
  
  constructor(private http:HttpClient) { }
  
  listar() {
    return this.http.get<Proveedorproducto[]>(this.url);
  }
  
  listarProveedorProductoPorId(id: number) {
    return this.http.get<Proveedorproducto>(`${this.url}/${id}`);
  }
  
  registrar(proveedorproducto: Proveedorproducto) {
    return this.http.post(this.url, proveedorproducto);
  }
  
  modificar(proveedorproducto: Proveedorproducto) {
    return this.http.put(this.url, proveedorproducto);
  }
  
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
