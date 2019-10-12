import { Subject } from 'rxjs';
import { Marca } from './../_model/marca';
import { HttpClient } from '@angular/common/http';
import { HOST } from './../_shared/var.constants';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  marcaCambios = new Subject<Marca[]>();
  mensajeCambio = new Subject<string>();
  
  url: string = `${HOST}/marcas`;
  
  constructor(private http:HttpClient) { }
  
  listar() {
    return this.http.get<Marca[]>(this.url);
  }
  
  listarProveedorInsumoPorId(id: number) {
    return this.http.get<Marca>(`${this.url}/${id}`);
  }
  
  registrar(marca: Marca) {
    return this.http.post(this.url,marca);
  }
  
  modificar(marca: Marca) {
    return this.http.put(this.url,marca);
  }
  
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
