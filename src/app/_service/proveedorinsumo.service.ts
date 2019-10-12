import { Proveedorinsumo } from 'src/app/_model/proveedorinsumo';
import { Subject } from 'rxjs';
import { HOST } from './../_shared/var.constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ProveedorinsumoService {

  proveedorInsumosCambio = new Subject<Proveedorinsumo[]>();
  mensajeCambio = new Subject<string>();
  
  url: string = `${HOST}/proveedorInsumos`;
  
  constructor(private http:HttpClient) { }
  
  listar() {
    return this.http.get<Proveedorinsumo[]>(this.url);
  }
  
  listarProveedorInsumoPorId(id: number) {
    return this.http.get<Proveedorinsumo>(`${this.url}/${id}`);
  }
  
  registrar(proveedorinsumo: Proveedorinsumo) {
    return this.http.post(this.url,proveedorinsumo);
  }
  
  modificar(proveedorinsumo: Proveedorinsumo) {
    return this.http.put(this.url,proveedorinsumo);
  }
  
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  
}
