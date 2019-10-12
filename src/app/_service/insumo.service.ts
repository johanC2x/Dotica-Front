import { HttpClient } from '@angular/common/http';
import { HOST } from './../_shared/var.constants';
import { Subject } from 'rxjs';
import { Insumo } from './../_model/insumo';
import { Injectable } from '@angular/core';
import { ProductoListaInsumo } from '../_model/productoListaInsumo';

@Injectable({
  providedIn: 'root'
})
export class InsumoService {

  insumoCambio = new Subject<Insumo[]>();
  mensajeCambio = new Subject<string>();
  
  url: string = `${HOST}/insumos`;
  
  constructor(private http:HttpClient) { }
  
  listar() {
    return this.http.get<Insumo[]>(this.url);
  }
  
  listarPorId(id: number) {
    return this.http.get<Insumo>(`${this.url}/${id}`);
  }
  
  registrar(insumo: Insumo) {
    return this.http.post(this.url,insumo);
  }
  
  modificar(insumo: Insumo) {
    return this.http.put(this.url,insumo);
  }
  
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listarInsumoPorConsulta(idProducto: number){
    return this.http.get<ProductoListaInsumo[]>(`${HOST}/productoinsumos/${idProducto}`);
  }


}
