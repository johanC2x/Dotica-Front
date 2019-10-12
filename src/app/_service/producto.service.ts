import { HttpClient } from '@angular/common/http';
import { HOST } from './../_shared/var.constants';
import { Injectable } from '@angular/core';
import { ProductoListaInsumo } from '../_model/productoListaInsumo';
import { Producto } from '../_model/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {


  url: string = `${HOST}/productos`;

  constructor(private http:HttpClient ) { }

  listar(){
    return this.http.get<Producto[]>(`${this.url}`);
  }

  obtenerPorId(id: string){
    return this.http.get<Producto>(`${this.url}/${id}`);
  }

  registrar(productoDTO:ProductoListaInsumo){
    return this.http.post(this.url,productoDTO);
  }

  buscar(filtroProducto:any){
    return this.http.post<Producto[]>(`${this.url}/buscar`,filtroProducto);
  }

}
