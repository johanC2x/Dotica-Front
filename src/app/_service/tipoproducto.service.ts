import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HOST } from './../_shared/var.constants';
import { Injectable } from '@angular/core';
import { Tipoproducto } from '../_model/tipoproducto';

@Injectable({
  providedIn: 'root'
})
export class TipoproductoService {

  tipoProductoCambios = new Subject<Tipoproducto[]>();
  mensajeCambio = new Subject<string>();
  
  url: string = `${HOST}/tipoProductos`;
  
  constructor(private http:HttpClient) { }
  
  listar() {
    return this.http.get<Tipoproducto[]>(this.url);
  }
  
  listarTipoProductoPorId(id: number) {
    return this.http.get<Tipoproducto>(`${this.url}/${id}`);
  }
  
  registrar(tipoproducto: Tipoproducto) {
    return this.http.post(this.url, tipoproducto);
  }
  
  modificar(tipoproducto: Tipoproducto) {
    return this.http.put(this.url, tipoproducto);
  }
  
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }


}
