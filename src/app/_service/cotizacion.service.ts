import { HttpClient } from '@angular/common/http';
import { HOST } from './../_shared/var.constants';
import { Injectable } from '@angular/core';
import { Cotizacion } from '../_model/cotizacion';

@Injectable({
  providedIn: 'root'
})
export class CotizacionService {

  url: string = `${HOST}/cotizacion`;

  constructor(private http:HttpClient ) { }

  listar(){
    return this.http.get<Cotizacion[]>(this.url);
  }

  listarPorEstado(){
    return this.http.get<Cotizacion[]>(this.url + '/state');
  }

  obtenerMax(){
    return this.http.get<Cotizacion>(this.url + '/max');
  }

  obtenerPorId(id: number){
    return this.http.get<Cotizacion>(`${this.url}/${id}`);
  }

  registrar(cotizacion:any){
    return this.http.post(this.url,cotizacion);
  }

  actualizar(cotizacion:any){
    return this.http.put(this.url,cotizacion);
  }

}
